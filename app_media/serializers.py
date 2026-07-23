from rest_framework import serializers

from .models import SceneAsset


class SceneAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = SceneAsset
        fields = (
            "id",
            "tour_version",
            "scene_key",
            "original_file",
            "optimized_file",
            "preview_file",
            "thumbnail_file",
            "original_width",
            "original_height",
            "file_size",
            "checksum_sha256",
            "mime_type",
            "tile_base_path",
            "max_zoom_level",
            "tile_size",
            "processing_status",
            "celery_task_id",
            "retry_count",
            "error_message",
            "created_at",
            "processing_started_at",
            "processed_at",
            "updated_at",
        )
        read_only_fields = (
            "optimized_file",
            "preview_file",
            "thumbnail_file",
            "original_width",
            "original_height",
            "file_size",
            "checksum_sha256",
            "mime_type",
            "tile_base_path",
            "processing_status",
            "celery_task_id",
            "retry_count",
            "error_message",
            "created_at",
            "processing_started_at",
            "processed_at",
            "updated_at",
        )

    def validate(self, attrs):
        tour_version = attrs.get("tour_version") or getattr(self.instance, "tour_version", None)
        if tour_version and tour_version.status == "published":
            raise serializers.ValidationError("Published tour versions cannot receive scene uploads.")
        return attrs


class SceneProcessingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = SceneAsset
        fields = (
            "id",
            "scene_key",
            "processing_status",
            "retry_count",
            "error_message",
            "processing_started_at",
            "processed_at",
        )
        read_only_fields = fields


class SceneAssetUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SceneAsset
        fields = ("tour_version", "scene_key", "original_file", "max_zoom_level", "tile_size")

    def validate(self, attrs):
        tour_version = attrs["tour_version"]
        scene_key = attrs["scene_key"]
        if tour_version.status == "published":
            raise serializers.ValidationError("Published tour versions cannot receive scene uploads.")
        scene_ids = {str(scene["id"]) for scene in tour_version.data.get("scenes", [])}
        if scene_key not in scene_ids:
            raise serializers.ValidationError({"scene_key": "scene_key does not exist in the tour data."})
        return attrs
