import hashlib
import shutil
from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from PIL import Image
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from app_dashboard.models import ActivityLog

from .models import SceneAsset
from .serializers import SceneAssetSerializer, SceneAssetUploadSerializer, SceneProcessingStatusSerializer
from .tasks import generate_scene_tiles


def log_scene_activity(request, action, asset, description):
    ActivityLog.objects.create(
        actor=request.user,
        action=action,
        entity_type="scene_asset",
        entity_id=str(asset.pk),
        description=description,
        metadata={
            "project_id": asset.tour_version.location.project_id,
            "location_id": asset.tour_version.location_id,
            "tour_version_id": asset.tour_version_id,
            "scene_asset_id": asset.pk,
            "scene_key": asset.scene_key,
        },
    )


class SceneUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = SceneAssetUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        asset = serializer.save()
        uploaded_file = request.FILES["original_file"]
        checksum = hashlib.sha256()
        for chunk in uploaded_file.chunks():
            checksum.update(chunk)
        uploaded_file.seek(0)
        with Image.open(asset.original_file) as image:
            width, height = image.size

        asset.original_width = width
        asset.original_height = height
        asset.file_size = uploaded_file.size
        asset.checksum_sha256 = checksum.hexdigest()
        asset.mime_type = uploaded_file.content_type or ""
        asset.save(update_fields=[
            "original_width", "original_height", "file_size", "checksum_sha256", "mime_type", "updated_at"
        ])

        try:
            task = generate_scene_tiles.delay(asset.pk)
        except Exception as exc:
            asset.processing_status = SceneAsset.ProcessingStatus.FAILED
            asset.error_message = f"Could not queue tile generation: {exc}"[:2000]
            asset.save(update_fields=["processing_status", "error_message", "updated_at"])
            return Response(
                {
                    "detail": "Scene uploaded but tile processing could not be queued.",
                    "asset": SceneAssetSerializer(asset, context={"request": request}).data,
                },
                status=status.HTTP_201_CREATED,
            )

        asset.celery_task_id = task.id
        asset.save(update_fields=["celery_task_id", "updated_at"])
        asset = SceneAsset.objects.select_related("tour_version__location__project").get(pk=asset.pk)
        log_scene_activity(request, "scene_asset_uploaded", asset, f"Uploaded source image for scene '{asset.scene_key}'.")
        return Response(SceneAssetSerializer(asset, context={"request": request}).data, status=status.HTTP_201_CREATED)


class SceneStatusView(APIView):
    def get(self, request, scene_asset_id):
        asset = get_object_or_404(SceneAsset.objects.select_related("tour_version"), pk=scene_asset_id)
        return Response(SceneProcessingStatusSerializer(asset).data)


class SceneAssetDeleteView(APIView):
    def delete(self, request, scene_asset_id):
        asset = get_object_or_404(SceneAsset.objects.select_related("tour_version__location__project"), pk=scene_asset_id)
        tile_path = asset.tile_base_path
        asset.delete()
        if tile_path:
            shutil.rmtree(Path(settings.MEDIA_ROOT) / tile_path, ignore_errors=True)
        log_scene_activity(request, "scene_asset_deleted", asset, f"Soft-deleted scene asset '{asset.scene_key}'.")
        return Response(status=status.HTTP_204_NO_CONTENT)


class TileServeView(APIView):
    def get(self, request, location_id, version, scene_key, z, x, y):
        asset = get_object_or_404(
            SceneAsset.objects.select_related("tour_version"),
            tour_version__location_id=location_id,
            tour_version__version_number=version,
            scene_key=scene_key,
            processing_status=SceneAsset.ProcessingStatus.DONE,
        )
        tile_file = Path(settings.MEDIA_ROOT) / asset.tile_base_path / str(z) / str(x) / f"{y}.jpg"
        if not tile_file.is_file():
            raise Http404("Tile not found.")
        return FileResponse(tile_file.open("rb"), content_type="image/jpeg")
