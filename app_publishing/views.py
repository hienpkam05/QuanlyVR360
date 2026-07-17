from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from app_dashboard.models import ActivityLog
from app_locations.models import Location
from app_tours.models import TourVersion

from .filters import WhitelistDomainFilter
from .models import PublishConfig, WhitelistDomain
from .serializers import (
    PublishActionSerializer,
    PublishConfigSerializer,
    PublishedTourCardSerializer,
    WhitelistDomainSerializer,
)


def log_publish_activity(request, action, location, description, extra=None):
    metadata = {
        "project_id": location.project_id,
        "location_id": location.pk,
        "location_name": location.name,
    }
    if extra:
        metadata.update(extra)
    ActivityLog.objects.create(
        actor=request.user,
        action=action,
        entity_type="publish_config",
        entity_id=str(location.pk),
        description=description,
        metadata=metadata,
    )


def set_published_version(config, version):
    old_version = config.published_version
    if old_version and old_version.pk != version.pk and old_version.status != TourVersion.Status.ARCHIVED:
        old_version.status = TourVersion.Status.ARCHIVED
        old_version.save(update_fields=["status", "updated_at"])

    if version.status != TourVersion.Status.PUBLISHED:
        version.status = TourVersion.Status.PUBLISHED
        version.save(update_fields=["status", "updated_at"])

    config.published_version = version


class PublishConfigView(APIView):
    def get_location(self, location_id):
        return get_object_or_404(Location.objects.select_related("project"), pk=location_id)

    def get_config(self, location):
        return (
            PublishConfig.objects.filter(location=location)
            .select_related("location", "published_version", "published_by")
            .prefetch_related("whitelist_domains")
            .first()
        )

    def build_response(self, request, config):
        return {
            "is_published": bool(config and config.is_active),
            "publish_config": PublishConfigSerializer(config, context={"request": request}).data if config else None,
        }

    def get(self, request, location_id):
        location = self.get_location(location_id)
        config = self.get_config(location)
        return Response(self.build_response(request, config))

    def post(self, request, location_id):
        location = self.get_location(location_id)
        serializer = PublishActionSerializer(
            data=request.data,
            context={"location": location, "require_version": True},
        )
        serializer.is_valid(raise_exception=True)
        version = serializer.validated_data["published_version_obj"]

        with transaction.atomic():
            config = PublishConfig.objects.select_for_update().filter(location=location).first()
            if config is None:
                config = PublishConfig(location=location)
            set_published_version(config, version)
            config.is_active = serializer.validated_data.get("is_active", True)
            config.published_by = request.user
            config.save()

        log_publish_activity(
            request,
            "location_published",
            location,
            f"Published location '{location.name}' with version v{version.version_number}.",
            {"publish_config_id": config.pk, "version_id": version.pk},
        )
        return Response(PublishConfigSerializer(config, context={"request": request}).data, status=status.HTTP_201_CREATED)

    def patch(self, request, location_id):
        location = self.get_location(location_id)
        config = self.get_config(location)
        if config is None:
            return Response({"detail": "Location has not been published yet."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PublishActionSerializer(data=request.data, context={"location": location})
        serializer.is_valid(raise_exception=True)
        if not serializer.validated_data:
            return Response({"detail": "No publish fields were provided."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            config = PublishConfig.objects.select_for_update().get(pk=config.pk)
            version = serializer.validated_data.get("published_version_obj")
            if version is not None:
                set_published_version(config, version)
            if "is_active" in serializer.validated_data:
                config.is_active = serializer.validated_data["is_active"]
            config.published_by = request.user
            config.save()

        log_publish_activity(
            request,
            "location_publish_updated",
            location,
            f"Updated publish config for location '{location.name}'.",
            {
                "publish_config_id": config.pk,
                "version_id": config.published_version_id,
                "is_active": config.is_active,
            },
        )
        return Response(PublishConfigSerializer(config, context={"request": request}).data)

    def delete(self, request, location_id):
        location = self.get_location(location_id)
        config = self.get_config(location)
        if config is None:
            return Response(status=status.HTTP_204_NO_CONTENT)

        version = config.published_version
        if version and version.status != TourVersion.Status.ARCHIVED:
            version.status = TourVersion.Status.ARCHIVED
            version.save(update_fields=["status", "updated_at"])

        config.delete()
        log_publish_activity(
            request,
            "location_unpublished",
            location,
            f"Unpublished location '{location.name}'.",
            {"publish_config_id": config.pk, "version_id": getattr(version, "pk", None)},
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class PublishRegenerateTokenView(APIView):
    def post(self, request, location_id):
        location = get_object_or_404(Location.objects.select_related("project"), pk=location_id)
        config = get_object_or_404(
            PublishConfig.objects.select_related("location", "published_version", "published_by"),
            location=location,
        )
        old_token = config.public_token
        config.regenerate_token()
        log_publish_activity(
            request,
            "publish_token_regenerated",
            location,
            f"Regenerated public token for location '{location.name}'.",
            {"publish_config_id": config.pk, "old_token": old_token, "new_token": config.public_token},
        )
        return Response(PublishConfigSerializer(config, context={"request": request}).data)


class PublishedTourListView(generics.ListAPIView):
    serializer_class = PublishedTourCardSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    search_fields = (
        "location__name",
        "location__description",
        "location__project__name",
        "published_version__label",
    )
    ordering_fields = ("published_at", "updated_at", "location__name")
    ordering = ("-published_at",)

    def get_queryset(self):
        return (
            PublishConfig.objects.filter(is_active=True, published_version__isnull=False)
            .select_related("location", "location__project", "published_version")
            .order_by("-published_at")
        )


class WhitelistDomainListCreateView(generics.ListCreateAPIView):
    serializer_class = WhitelistDomainSerializer
    filterset_class = WhitelistDomainFilter
    search_fields = ("domain", "label")
    ordering_fields = ("domain", "created_at")

    def get_location(self):
        return get_object_or_404(Location.objects.select_related("project"), pk=self.kwargs["location_id"])

    def get_publish_config(self):
        return PublishConfig.objects.filter(location=self.get_location()).first()

    def get_queryset(self):
        publish_config = self.get_publish_config()
        if publish_config is None:
            return WhitelistDomain.objects.none()
        return WhitelistDomain.objects.filter(publish_config=publish_config).select_related("publish_config")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["publish_config"] = self.get_publish_config()
        return context

    def perform_create(self, serializer):
        location = self.get_location()
        publish_config = self.get_publish_config()
        if publish_config is None:
            raise ValidationError({"detail": "Location has not been published yet."})
        domain = serializer.save(publish_config=publish_config)
        log_publish_activity(
            self.request,
            "publish_domain_created",
            location,
            f"Added whitelist domain '{domain.domain}' for location '{location.name}'.",
            {"publish_config_id": publish_config.pk, "domain_id": domain.pk},
        )


class WhitelistDomainDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WhitelistDomainSerializer
    lookup_url_kwarg = "domain_id"

    def get_location(self):
        return get_object_or_404(Location.objects.select_related("project"), pk=self.kwargs["location_id"])

    def get_publish_config(self):
        return get_object_or_404(PublishConfig.objects.all(), location=self.get_location())

    def get_queryset(self):
        return WhitelistDomain.objects.filter(publish_config=self.get_publish_config()).select_related("publish_config")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["publish_config"] = self.get_publish_config()
        return context

    def perform_update(self, serializer):
        domain = serializer.save()
        location = self.get_location()
        log_publish_activity(
            self.request,
            "publish_domain_updated",
            location,
            f"Updated whitelist domain '{domain.domain}' for location '{location.name}'.",
            {"publish_config_id": domain.publish_config_id, "domain_id": domain.pk},
        )

    def perform_destroy(self, instance):
        location = self.get_location()
        domain_id, domain_name, publish_config_id = instance.pk, instance.domain, instance.publish_config_id
        instance.delete()
        log_publish_activity(
            self.request,
            "publish_domain_deleted",
            location,
            f"Deleted whitelist domain '{domain_name}' for location '{location.name}'.",
            {"publish_config_id": publish_config_id, "domain_id": domain_id},
        )
