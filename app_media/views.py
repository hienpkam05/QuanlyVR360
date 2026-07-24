import hashlib
from io import BytesIO
from pathlib import Path

from django.conf import settings
from django.core.files.base import ContentFile
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from PIL import Image, ImageOps
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from app_dashboard.models import ActivityLog

from .models import SceneAsset
from .serializers import SceneAssetSerializer, SceneAssetUploadSerializer, SceneProcessingStatusSerializer
from .tasks import generate_scene_tiles


def resized_webp_content(source_image, max_width, quality=90):
    image = ImageOps.exif_transpose(source_image).convert("RGB")
    if image.width > max_width:
        ratio = max_width / image.width
        target_size = (max_width, max(1, round(image.height * ratio)))
        image = image.resize(target_size, Image.Resampling.LANCZOS)
    output = BytesIO()
    image.save(output, "WEBP", quality=quality, method=6)
    return ContentFile(output.getvalue())


def create_optimized_scene_images(asset):
    stem = Path(asset.original_file.name).stem
    with Image.open(asset.original_file) as source:
        asset.optimized_file.save(
            f"{stem}_optimized.webp",
            resized_webp_content(source, max_width=8192, quality=90),
            save=False,
        )
        source.seek(0)
        asset.preview_file.save(
            f"{stem}_preview.webp",
            resized_webp_content(source, max_width=2560, quality=82),
            save=False,
        )
        source.seek(0)
        asset.thumbnail_file.save(
            f"{stem}_thumb.webp",
            resized_webp_content(source, max_width=640, quality=70),
            save=False,
        )


def calculate_file_checksum(uploaded_file):
    checksum = hashlib.sha256()
    for chunk in uploaded_file.chunks():
        checksum.update(chunk)
    uploaded_file.seek(0)
    return checksum.hexdigest()


def find_reusable_scene_asset(checksum, excluded_asset=None):
    if not checksum:
        return None
    queryset = (
        SceneAsset.objects.filter(
            checksum_sha256=checksum,
        )
        .exclude(original_file="")
        .order_by("-updated_at")
    )
    if excluded_asset:
        queryset = queryset.exclude(pk=excluded_asset.pk)
    return queryset.first()


def create_reusable_scene_asset(validated, source_asset, uploaded_file):
    return SceneAsset.objects.create(
        tour_version=validated["tour_version"],
        scene_key=validated["scene_key"],
        original_file=source_asset.original_file.name,
        optimized_file=source_asset.optimized_file.name if source_asset.optimized_file else "",
        preview_file=source_asset.preview_file.name if source_asset.preview_file else "",
        thumbnail_file=source_asset.thumbnail_file.name if source_asset.thumbnail_file else "",
        original_width=source_asset.original_width,
        original_height=source_asset.original_height,
        file_size=source_asset.file_size or uploaded_file.size,
        checksum_sha256=source_asset.checksum_sha256,
        mime_type=source_asset.mime_type or uploaded_file.content_type or "",
        tile_base_path=source_asset.tile_base_path,
        max_zoom_level=source_asset.max_zoom_level,
        tile_size=source_asset.tile_size,
        processing_status=source_asset.processing_status,
        error_message=source_asset.error_message,
        processing_started_at=source_asset.processing_started_at,
        processed_at=source_asset.processed_at,
    )


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
        validated = serializer.validated_data
        uploaded_file = request.FILES["original_file"]
        checksum = calculate_file_checksum(uploaded_file)
        with Image.open(uploaded_file) as image:
            width, height = image.size
        uploaded_file.seek(0)

        existing_asset = SceneAsset.objects.filter(
            tour_version=validated["tour_version"],
            scene_key=validated["scene_key"],
        ).first()

        if existing_asset and existing_asset.checksum_sha256 == checksum and existing_asset.original_file:
            log_scene_activity(
                request,
                "scene_asset_reused",
                existing_asset,
                f"Kept existing source image for scene '{existing_asset.scene_key}'.",
            )
            return Response(
                SceneAssetSerializer(existing_asset, context={"request": request}).data,
                status=status.HTTP_200_OK,
            )

        reusable_asset = find_reusable_scene_asset(checksum, existing_asset)
        if reusable_asset:
            if existing_asset:
                existing_asset.delete()
            asset = create_reusable_scene_asset(validated, reusable_asset, uploaded_file)
            asset = SceneAsset.objects.select_related("tour_version__location__project").get(pk=asset.pk)
            log_scene_activity(
                request,
                "scene_asset_reused",
                asset,
                f"Reused existing source image for scene '{asset.scene_key}'.",
            )
            return Response(SceneAssetSerializer(asset, context={"request": request}).data, status=status.HTTP_201_CREATED)

        if existing_asset:
            existing_asset.delete()
        asset = serializer.save()

        create_optimized_scene_images(asset)

        asset.original_width = width
        asset.original_height = height
        asset.file_size = uploaded_file.size
        asset.checksum_sha256 = checksum
        asset.mime_type = uploaded_file.content_type or ""
        asset.save(update_fields=[
            "optimized_file", "preview_file", "thumbnail_file",
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
        asset.delete()
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
