from rest_framework import serializers

from .models import TourVersion


class TourVersionListSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source="created_by.username", read_only=True)
    scene_assets_count = serializers.IntegerField(source="scene_assets.count", read_only=True)

    class Meta:
        model = TourVersion
        fields = (
            "id", "location", "version_number", "label", "thumbnail", "status", "changelog",
            "created_by", "created_by_name", "scene_assets_count", "created_at", "updated_at",
        )
        read_only_fields = fields


class TourVersionSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source="created_by.username", read_only=True)

    class Meta:
        model = TourVersion
        fields = (
            "id", "location", "version_number", "label", "data", "thumbnail", "status",
            "changelog", "created_by", "created_by_name", "created_at", "updated_at",
        )
        read_only_fields = ("location", "version_number", "status", "created_by", "created_at", "updated_at")

    def validate(self, attrs):
        if self.instance and self.instance.status == TourVersion.Status.PUBLISHED:
            raise serializers.ValidationError("Published tour versions cannot be edited. Archive or create a new draft first.")
        return attrs


class TourVersionImportSerializer(serializers.Serializer):
    label = serializers.CharField(max_length=100, required=False, allow_blank=True)
    changelog = serializers.CharField(required=False, allow_blank=True)
    data = serializers.JSONField()

    def validate_data(self, value):
        field = TourVersion._meta.get_field("data")
        for validator in field.validators:
            validator(value)
        return value


class TourVersionCompareSerializer(serializers.Serializer):
    from_version = serializers.IntegerField(source="from", min_value=1)
    to_version = serializers.IntegerField(source="to", min_value=1)

    def validate(self, attrs):
        if attrs["from"] == attrs["to"]:
            raise serializers.ValidationError("Hai version dùng để so sánh phải khác nhau.")
        return attrs
