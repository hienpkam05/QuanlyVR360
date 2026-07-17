from django.contrib import admin

from .models import SceneAsset


@admin.register(SceneAsset)
class SceneAssetAdmin(admin.ModelAdmin):
    list_display = (
        "scene_key", "tour_version", "processing_status", "tile_size",
        "retry_count", "created_at",
    )
    list_filter = ("processing_status", "created_at")
    search_fields = ("scene_key", "checksum_sha256", "celery_task_id", "tour_version__location__name")
    readonly_fields = ("created_at", "updated_at", "processing_started_at", "processed_at")
    autocomplete_fields = ("tour_version",)
