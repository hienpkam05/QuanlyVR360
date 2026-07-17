import math
from pathlib import Path

from celery import shared_task
from django.conf import settings
from django.utils import timezone
from PIL import Image

from .models import SceneAsset


@shared_task(bind=True)
def generate_scene_tiles(self, scene_asset_id):
    """Create a JPEG tile pyramid at {tile_base_path}/{z}/{x}/{y}.jpg."""
    asset = SceneAsset.all_objects.select_related("tour_version__location").get(pk=scene_asset_id)
    if asset.is_deleted:
        return {"status": "deleted"}

    asset.processing_status = SceneAsset.ProcessingStatus.PROCESSING
    asset.processing_started_at = timezone.now()
    asset.error_message = ""
    asset.save(update_fields=["processing_status", "processing_started_at", "error_message", "updated_at"])

    try:
        location_id = asset.tour_version.location_id
        version_number = asset.tour_version.version_number
        base_path = Path("tiles") / str(location_id) / str(version_number) / str(asset.scene_key)
        output_root = Path(settings.MEDIA_ROOT) / base_path
        output_root.mkdir(parents=True, exist_ok=True)

        with Image.open(asset.original_file.path) as source:
            image = source.convert("RGB")
            for zoom in range(asset.max_zoom_level + 1):
                scale = 2 ** (asset.max_zoom_level - zoom)
                width = max(1, math.ceil(image.width / scale))
                height = max(1, math.ceil(image.height / scale))
                level_image = image.resize((width, height), Image.Resampling.LANCZOS)
                columns = math.ceil(width / asset.tile_size)
                rows = math.ceil(height / asset.tile_size)
                for x in range(columns):
                    for y in range(rows):
                        left, top = x * asset.tile_size, y * asset.tile_size
                        tile = level_image.crop((left, top, min(left + asset.tile_size, width), min(top + asset.tile_size, height)))
                        tile_dir = output_root / str(zoom) / str(x)
                        tile_dir.mkdir(parents=True, exist_ok=True)
                        tile.save(tile_dir / f"{y}.jpg", "JPEG", quality=90, optimize=True)

        asset.refresh_from_db()
        if asset.is_deleted:
            return {"status": "deleted"}
        asset.tile_base_path = base_path.as_posix()
        asset.processing_status = SceneAsset.ProcessingStatus.DONE
        asset.processed_at = timezone.now()
        asset.save(update_fields=["tile_base_path", "processing_status", "processed_at", "updated_at"])
        return {"status": "done", "scene_asset_id": asset.pk}
    except Exception as exc:
        SceneAsset.all_objects.filter(pk=scene_asset_id).update(
            processing_status=SceneAsset.ProcessingStatus.FAILED,
            error_message=str(exc)[:2000],
            processed_at=timezone.now(),
        )
        raise
