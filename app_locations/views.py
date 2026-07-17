from django.db import transaction
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from app_dashboard.models import ActivityLog
from app_projects.models import Project

from .filters import LocationFilter
from .models import Location
from .serializers import (
    LocationReorderSerializer,
    LocationSerializer,
    LocationThumbnailSerializer,
)


class LocationActivityMixin:
    def log_activity(self, action, location, description):
        ActivityLog.objects.create(
            actor=self.request.user,
            action=action,
            entity_type="location",
            entity_id=str(location.pk),
            description=description,
            metadata={
                "project_id": location.project_id,
                "location_id": location.pk,
                "location_name": location.name,
            },
        )


class ProjectLocationViewSet(
    LocationActivityMixin, mixins.ListModelMixin, mixins.CreateModelMixin, GenericViewSet
):
    """List and create locations inside one project."""

    serializer_class = LocationSerializer

    def get_project(self):
        return get_object_or_404(Project.objects.all(), pk=self.kwargs["project_id"])

    def get_queryset(self):
        return (
            Location.objects.filter(project=self.get_project())
            .select_related("project")
            .prefetch_related("versions")
        )

    def perform_create(self, serializer):
        location = serializer.save(project=self.get_project())
        self.log_activity("location_created", location, f"Created location '{location.name}'.")


class LocationViewSet(LocationActivityMixin, ModelViewSet):
    """Read, update, soft-delete and upload thumbnail for a location."""

    queryset = Location.objects.select_related("project").prefetch_related("versions")
    serializer_class = LocationSerializer
    filterset_class = LocationFilter
    search_fields = ("name", "description", "slug")
    ordering_fields = ("order", "name", "created_at", "updated_at")

    def perform_update(self, serializer):
        location = serializer.save()
        self.log_activity("location_updated", location, f"Updated location '{location.name}'.")

    def perform_destroy(self, instance):
        location_id, location_name, project_id = instance.pk, instance.name, instance.project_id
        instance.delete()
        ActivityLog.objects.create(
            actor=self.request.user,
            action="location_deleted",
            entity_type="location",
            entity_id=str(location_id),
            description=f"Soft-deleted location '{location_name}'.",
            metadata={"project_id": project_id, "location_id": location_id, "location_name": location_name},
        )

    @action(
        detail=True,
        methods=["post"],
        url_path="upload-thumbnail",
        parser_classes=[MultiPartParser, FormParser],
    )
    def upload_thumbnail(self, request, pk=None):
        location = self.get_object()
        serializer = LocationThumbnailSerializer(location, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self.log_activity("location_thumbnail_uploaded", location, f"Updated thumbnail for '{location.name}'.")
        return Response(LocationSerializer(location, context=self.get_serializer_context()).data)


class ProjectLocationReorderView(APIView):
    """Update display order for every active location in a project."""

    def patch(self, request, project_id):
        project = get_object_or_404(Project.objects.all(), pk=project_id)
        serializer = LocationReorderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        items = serializer.validated_data["locations"]
        submitted_ids = {item["id"] for item in items}

        with transaction.atomic():
            locations = list(Location.objects.select_for_update().filter(project=project))
            location_ids = {location.id for location in locations}
            if submitted_ids != location_ids:
                return Response(
                    {"locations": "The payload must include every active location in this project."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            orders = {item["id"]: item["order"] for item in items}
            for location in locations:
                location.order = orders[location.id]
                location.updated_at = timezone.now()
            Location.objects.bulk_update(locations, ["order", "updated_at"])

        ActivityLog.objects.create(
            actor=request.user,
            action="locations_reordered",
            entity_type="project",
            entity_id=str(project.pk),
            description=f"Reordered locations for project '{project.name}'.",
            metadata={"project_id": project.pk, "location_ids": sorted(location_ids)},
        )
        ordered_locations = Location.objects.filter(project=project).select_related("project").order_by("order", "created_at")
        return Response(LocationSerializer(ordered_locations, many=True, context={"request": request}).data)
