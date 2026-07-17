import shutil
from pathlib import Path

from django.conf import settings
from django.db import models

from app_tours.models import TourVersion
from backend.models import SoftDeleteModel


class SceneAsset(SoftDeleteModel):
    class ProcessingStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        PROCESSING = "processing", "Processing"
        DONE = "done", "Done"
        FAILED = "failed", "Failed"

    tour_version = models.ForeignKey(TourVersion, on_delete=models.CASCADE, related_name="scene_assets")
    scene_key = models.CharField(max_length=100)
    original_file = models.ImageField(upload_to="scenes/originals/")
    original_width = models.PositiveIntegerField(null=True, blank=True)
    original_height = models.PositiveIntegerField(null=True, blank=True)
    file_size = models.PositiveBigIntegerField(null=True, blank=True)
    checksum_sha256 = models.CharField(max_length=64, blank=True, db_index=True)
    mime_type = models.CharField(max_length=100, blank=True)
    tile_base_path = models.CharField(max_length=500, blank=True)
    max_zoom_level = models.PositiveSmallIntegerField(default=3)
    tile_size = models.PositiveSmallIntegerField(default=512)
    processing_status = models.CharField(
        max_length=20, choices=ProcessingStatus.choices, default=ProcessingStatus.PENDING
    )
    celery_task_id = models.CharField(max_length=255, blank=True, db_index=True)
    retry_count = models.PositiveSmallIntegerField(default=0)
    error_message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    processing_started_at = models.DateTimeField(null=True, blank=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=["tour_version", "scene_key"], condition=models.Q(is_deleted=False),
            name="unique_active_scene_key_per_tour_version"
        )]

    def __str__(self):
        return f"{self.tour_version} / scene:{self.scene_key}"

    def delete(self, using=None, keep_parents=False):
        original_file_name = self.original_file.name if self.original_file else ""
        tile_base_path = self.tile_base_path

        deleted = super().delete(using=using, keep_parents=keep_parents)

        if original_file_name:
            self.original_file.storage.delete(original_file_name)

        if tile_base_path:
            media_root = Path(settings.MEDIA_ROOT).resolve()
            tile_path = (media_root / tile_base_path).resolve()
            if tile_path.is_dir() and media_root in tile_path.parents:
                shutil.rmtree(tile_path, ignore_errors=True)

        return deleted
