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
    optimized_file = models.ImageField(upload_to="scenes/optimized/", blank=True, null=True)
    preview_file = models.ImageField(upload_to="scenes/previews/", blank=True, null=True)
    thumbnail_file = models.ImageField(upload_to="scenes/thumbnails/", blank=True, null=True)
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

    def _file_is_still_used(self, field_name, file_name):
        if not file_name:
            return False
        return SceneAsset.objects.filter(**{field_name: file_name}).exclude(pk=self.pk).exists()

    def _delete_file_if_unused(self, field_name, file_field, file_name):
        if not file_name or self._file_is_still_used(field_name, file_name):
            return
        try:
            file_field.storage.delete(file_name)
        except OSError:
            # On Windows/dev, browser or image tooling can lock the file for a moment.
            # Keep the DB delete successful; orphan cleanup can remove the file later.
            pass

    def _tile_path_is_still_used(self, tile_base_path):
        if not tile_base_path:
            return False
        return SceneAsset.objects.filter(tile_base_path=tile_base_path).exclude(pk=self.pk).exists()

    def delete(self, using=None, keep_parents=False):
        original_file_name = self.original_file.name if self.original_file else ""
        optimized_file_name = self.optimized_file.name if self.optimized_file else ""
        preview_file_name = self.preview_file.name if self.preview_file else ""
        thumbnail_file_name = self.thumbnail_file.name if self.thumbnail_file else ""
        tile_base_path = self.tile_base_path

        deleted = super().delete(using=using, keep_parents=keep_parents)

        self._delete_file_if_unused("original_file", self.original_file, original_file_name)
        self._delete_file_if_unused("optimized_file", self.optimized_file, optimized_file_name)
        self._delete_file_if_unused("preview_file", self.preview_file, preview_file_name)
        self._delete_file_if_unused("thumbnail_file", self.thumbnail_file, thumbnail_file_name)

        if tile_base_path and not self._tile_path_is_still_used(tile_base_path):
            media_root = Path(settings.MEDIA_ROOT).resolve()
            tile_path = (media_root / tile_base_path).resolve()
            if tile_path.is_dir() and media_root in tile_path.parents:
                shutil.rmtree(tile_path, ignore_errors=True)

        return deleted
