from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source="created_by.username", read_only=True)
    locations_count = serializers.IntegerField(source="locations.count", read_only=True)

    class Meta:
        model = Project
        fields = (
            "id", "name", "slug", "description", "thumbnail", "created_by",
            "created_by_name", "locations_count", "is_active", "created_at", "updated_at",
        )
        read_only_fields = ("slug", "created_by", "created_at", "updated_at")


class ProjectThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ("thumbnail",)

    def validate_thumbnail(self, value):
        if not value.content_type.startswith("image/"):
            raise serializers.ValidationError("Thumbnail phải là tệp hình ảnh.")
        return value
