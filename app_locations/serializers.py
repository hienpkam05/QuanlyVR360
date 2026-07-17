from rest_framework import serializers

from .models import Location


class LocationSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source="project.name", read_only=True)
    versions_count = serializers.IntegerField(source="versions.count", read_only=True)

    class Meta:
        model = Location
        fields = (
            "id", "project", "project_name", "name", "slug", "description", "thumbnail",
            "latitude", "longitude", "order", "is_active", "versions_count",
            "created_at", "updated_at",
        )
        read_only_fields = ("project", "slug", "created_at", "updated_at")


class LocationThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("thumbnail",)

    def validate_thumbnail(self, value):
        if not value.content_type.startswith("image/"):
            raise serializers.ValidationError("Thumbnail must be an image file.")
        return value


class LocationReorderItemSerializer(serializers.Serializer):
    id = serializers.IntegerField(min_value=1)
    order = serializers.IntegerField(min_value=0)


class LocationReorderSerializer(serializers.Serializer):
    locations = LocationReorderItemSerializer(many=True, allow_empty=False)

    def validate_locations(self, value):
        ids = [item["id"] for item in value]
        if len(ids) != len(set(ids)):
            raise serializers.ValidationError("Danh sách địa điểm bị trùng id.")
        orders = [item["order"] for item in value]
        if len(orders) != len(set(orders)):
            raise serializers.ValidationError("Display order values must be unique.")
        return value
