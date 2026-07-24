from copy import deepcopy
from uuid import uuid4

from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from django.utils.text import slugify
from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from app_dashboard.models import ActivityLog
from app_locations.models import Location

from .filters import TourVersionFilter
from .models import TourVersion
from .serializers import (
    TourVersionCompareSerializer,
    TourVersionImportSerializer,
    TourVersionListSerializer,
    TourVersionSerializer,
)


def inherit_version_files_and_assets(source_version, target_version):
    if not source_version:
        return

    update_fields = []
    if source_version.thumbnail and not target_version.thumbnail:
        target_version.thumbnail = source_version.thumbnail.name
        update_fields.append("thumbnail")
    if source_version.background_audio and not target_version.background_audio:
        target_version.background_audio = source_version.background_audio.name
        update_fields.append("background_audio")
    if source_version.hotspot_point_logo and not target_version.hotspot_point_logo:
        target_version.hotspot_point_logo = source_version.hotspot_point_logo.name
        update_fields.append("hotspot_point_logo")
    if update_fields:
        target_version.save(update_fields=[*update_fields, "updated_at"])

    from app_media.models import SceneAsset

    scene_asset_id_map = {}
    source_assets = SceneAsset.objects.filter(tour_version=source_version)
    for source_asset in source_assets:
        target_asset = SceneAsset.objects.create(
            tour_version=target_version,
            scene_key=source_asset.scene_key,
            original_file=source_asset.original_file.name,
            optimized_file=source_asset.optimized_file.name if source_asset.optimized_file else "",
            preview_file=source_asset.preview_file.name if source_asset.preview_file else "",
            thumbnail_file=source_asset.thumbnail_file.name if source_asset.thumbnail_file else "",
            original_width=source_asset.original_width,
            original_height=source_asset.original_height,
            file_size=source_asset.file_size,
            checksum_sha256=source_asset.checksum_sha256,
            mime_type=source_asset.mime_type,
            tile_base_path=source_asset.tile_base_path,
            max_zoom_level=source_asset.max_zoom_level,
            tile_size=source_asset.tile_size,
            processing_status=source_asset.processing_status,
            error_message=source_asset.error_message,
            processed_at=source_asset.processed_at,
        )
        scene_asset_id_map[source_asset.pk] = target_asset.pk

    if scene_asset_id_map:
        data = deepcopy(target_version.data)
        for scene in data.get("scenes", []):
            old_asset_id = scene.get("scene_asset_id")
            try:
                old_asset_id = int(old_asset_id)
            except (TypeError, ValueError):
                old_asset_id = None
            if old_asset_id in scene_asset_id_map:
                scene["scene_asset_id"] = scene_asset_id_map[old_asset_id]
        target_version.data = data
        target_version.save(update_fields=["data", "updated_at"])


def log_version_activity(request, action, version, description):
    ActivityLog.objects.create(
        actor=request.user,
        action=action,
        entity_type="tour_version",
        entity_id=str(version.pk),
        description=description,
        metadata={
            "project_id": version.location.project_id,
            "location_id": version.location_id,
            "version_id": version.pk,
            "version_number": version.version_number,
        },
    )


class LocationTourVersionViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, GenericViewSet):
    serializer_class = TourVersionSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    filterset_class = TourVersionFilter
    search_fields = ("label", "changelog")
    ordering_fields = ("version_number", "created_at", "updated_at")

    def get_location(self):
        return get_object_or_404(Location.objects.select_related("project"), pk=self.kwargs["location_id"])

    def get_queryset(self):
        return (
            TourVersion.objects.filter(location=self.get_location())
            .select_related("location", "location__project", "created_by")
            .prefetch_related("scene_assets")
        )

    def get_serializer_class(self):
        return TourVersionListSerializer if self.action == "list" else TourVersionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["location"] = self.get_location()
        return context

    def perform_create(self, serializer):
        version = serializer.save(location=self.get_location(), created_by=self.request.user)
        inherit_version_files_and_assets(getattr(version, "_source_version_obj", None), version)
        log_version_activity(
            self.request,
            "tour_version_created",
            version,
            f"Created draft tour version v{version.version_number}.",
        )


class TourVersionViewSet(ModelViewSet):
    serializer_class = TourVersionSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    filterset_class = TourVersionFilter
    search_fields = ("label", "changelog")
    ordering_fields = ("version_number", "created_at", "updated_at")

    def get_location(self):
        return get_object_or_404(Location.objects.select_related("project"), pk=self.kwargs["location_id"])

    def get_queryset(self):
        return (
            TourVersion.objects.filter(location=self.get_location())
            .select_related("location", "location__project", "created_by")
            .prefetch_related("scene_assets")
        )

    def perform_update(self, serializer):
        version = serializer.save()
        log_version_activity(
            self.request,
            "tour_version_updated",
            version,
            f"Updated draft tour version v{version.version_number}.",
        )

    def destroy(self, request, *args, **kwargs):
        version = self.get_object()
        if version.status != TourVersion.Status.DRAFT:
            return Response(
                {"detail": "Only draft tour versions can be deleted."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        self.perform_destroy(version)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        version_number = instance.version_number
        instance.delete()
        log_version_activity(
            self.request,
            "tour_version_deleted",
            instance,
            f"Soft-deleted draft tour version v{version_number}.",
        )

    @action(detail=True, methods=["get"])
    def export(self, request, location_id=None, pk=None):
        version = self.get_object()
        payload = {
            "label": version.label,
            "changelog": version.changelog,
            "data": version.data,
        }
        response = Response(payload)
        response["Content-Disposition"] = f'attachment; filename="tour-v{version.version_number}.json"'
        return response

    @action(detail=True, methods=["get"])
    def preview(self, request, location_id=None, pk=None):
        version = self.get_object()
        from app_media.models import SceneAsset

        resolved_data = deepcopy(version.data)
        assets = {
            asset.scene_key: asset
            for asset in SceneAsset.objects.filter(tour_version=version)
        }
        for scene in resolved_data.get("scenes", []):
            asset = assets.get(str(scene.get("id")))
            if asset:
                scene["tile_base_path"] = asset.tile_base_path
                scene["max_zoom_level"] = asset.max_zoom_level
                scene["tile_size"] = asset.tile_size
                scene["processing_status"] = asset.processing_status

        return Response(
            {
                "version": TourVersionListSerializer(version, context=self.get_serializer_context()).data,
                "data": resolved_data,
            }
        )


class TourVersionImportView(APIView):
    def post(self, request, location_id):
        location = get_object_or_404(Location.objects.select_related("project"), pk=location_id)
        payload = request.data
        if "data" not in payload and "scenes" in payload:
            payload = {"data": payload}

        serializer = TourVersionImportSerializer(data=payload)
        serializer.is_valid(raise_exception=True)
        version = TourVersion.objects.create(
            location=location,
            label=serializer.validated_data.get("label", ""),
            changelog=serializer.validated_data.get("changelog", ""),
            data=serializer.validated_data["data"],
            created_by=request.user,
        )
        log_version_activity(
            request,
            "tour_version_imported",
            version,
            f"Imported draft tour version v{version.version_number}.",
        )
        return Response(TourVersionSerializer(version, context={"request": request}).data, status=status.HTTP_201_CREATED)


class HotspotAudioUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, location_id, pk):
        version = get_object_or_404(TourVersion.objects.select_related("location"), pk=pk, location_id=location_id)
        if version.status == TourVersion.Status.PUBLISHED:
            return Response(
                {"detail": "Published tour versions cannot be edited. Archive or create a new draft first."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        audio_file = request.FILES.get("audio")
        hotspot_id = request.data.get("hotspot_id") or "hotspot"
        if not audio_file:
            return Response({"audio": "Audio file is required."}, status=status.HTTP_400_BAD_REQUEST)

        safe_hotspot = slugify(str(hotspot_id)) or "hotspot"
        safe_name = slugify(str(audio_file.name).rsplit(".", 1)[0]) or "audio"
        extension = str(audio_file.name).rsplit(".", 1)[-1].lower() if "." in str(audio_file.name) else "mp3"
        path = default_storage.save(
            f"tours/hotspot_audio/v{version.pk}/{safe_hotspot}/{safe_name}-{uuid4().hex[:8]}.{extension}",
            audio_file,
        )
        url = default_storage.url(path)
        return Response(
            {
                "audio_url": request.build_absolute_uri(url),
                "audio_path": url,
            },
            status=status.HTTP_201_CREATED,
        )


class HotspotInfoImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, location_id, pk):
        version = get_object_or_404(TourVersion.objects.select_related("location"), pk=pk, location_id=location_id)
        if version.status == TourVersion.Status.PUBLISHED:
            return Response(
                {"detail": "Published tour versions cannot be edited. Archive or create a new draft first."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        image_file = request.FILES.get("image")
        hotspot_id = request.data.get("hotspot_id") or "hotspot"
        if not image_file:
            return Response({"image": "Image file is required."}, status=status.HTTP_400_BAD_REQUEST)

        content_type = image_file.content_type or ""
        if content_type and not content_type.startswith("image/"):
            return Response({"image": "Only image files are allowed."}, status=status.HTTP_400_BAD_REQUEST)

        safe_hotspot = slugify(str(hotspot_id)) or "hotspot"
        safe_name = slugify(str(image_file.name).rsplit(".", 1)[0]) or "image"
        extension = str(image_file.name).rsplit(".", 1)[-1].lower() if "." in str(image_file.name) else "jpg"
        path = default_storage.save(
            f"tours/hotspot_info/v{version.pk}/{safe_hotspot}/{safe_name}-{uuid4().hex[:8]}.{extension}",
            image_file,
        )
        url = default_storage.url(path)
        return Response(
            {
                "image_url": request.build_absolute_uri(url),
                "image_path": url,
            },
            status=status.HTTP_201_CREATED,
        )


class HotspotInfoVideoUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, location_id, pk):
        version = get_object_or_404(TourVersion.objects.select_related("location"), pk=pk, location_id=location_id)
        if version.status == TourVersion.Status.PUBLISHED:
            return Response(
                {"detail": "Published tour versions cannot be edited. Archive or create a new draft first."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        video_file = request.FILES.get("video")
        hotspot_id = request.data.get("hotspot_id") or "hotspot"
        if not video_file:
            return Response({"video": "Video file is required."}, status=status.HTTP_400_BAD_REQUEST)

        content_type = video_file.content_type or ""
        if content_type and not content_type.startswith("video/"):
            return Response({"video": "Only video files are allowed."}, status=status.HTTP_400_BAD_REQUEST)

        safe_hotspot = slugify(str(hotspot_id)) or "hotspot"
        safe_name = slugify(str(video_file.name).rsplit(".", 1)[0]) or "video"
        extension = str(video_file.name).rsplit(".", 1)[-1].lower() if "." in str(video_file.name) else "mp4"
        path = default_storage.save(
            f"tours/hotspot_info_video/v{version.pk}/{safe_hotspot}/{safe_name}-{uuid4().hex[:8]}.{extension}",
            video_file,
        )
        url = default_storage.url(path)
        return Response(
            {
                "video_url": request.build_absolute_uri(url),
                "video_path": url,
            },
            status=status.HTTP_201_CREATED,
        )


class TourVersionCompareView(APIView):
    def get(self, request, location_id):
        location = get_object_or_404(Location.objects.select_related("project"), pk=location_id)
        serializer = TourVersionCompareSerializer(
            data={"from_version": request.query_params.get("from"), "to_version": request.query_params.get("to")}
        )
        serializer.is_valid(raise_exception=True)
        from_id, to_id = serializer.validated_data["from"], serializer.validated_data["to"]
        versions = {
            version.pk: version
            for version in TourVersion.objects.filter(location=location, pk__in=[from_id, to_id]).select_related("created_by")
        }
        if set(versions) != {from_id, to_id}:
            raise ValidationError("Both versions must belong to the selected location.")

        from_version, to_version = versions[from_id], versions[to_id]
        from_scenes = {str(scene["id"]): scene for scene in from_version.data.get("scenes", [])}
        to_scenes = {str(scene["id"]): scene for scene in to_version.data.get("scenes", [])}
        changed_metadata = {}
        for field in ("label", "changelog", "status"):
            old_value, new_value = getattr(from_version, field), getattr(to_version, field)
            if old_value != new_value:
                changed_metadata[field] = {"from": old_value, "to": new_value}

        return Response(
            {
                "from": TourVersionListSerializer(from_version, context={"request": request}).data,
                "to": TourVersionListSerializer(to_version, context={"request": request}).data,
                "changes": {
                    "metadata": changed_metadata,
                    "scenes_added": sorted(set(to_scenes) - set(from_scenes)),
                    "scenes_removed": sorted(set(from_scenes) - set(to_scenes)),
                    "scenes_modified": sorted(
                        scene_id
                        for scene_id in set(from_scenes) & set(to_scenes)
                        if from_scenes[scene_id] != to_scenes[scene_id]
                    ),
                },
            }
        )
