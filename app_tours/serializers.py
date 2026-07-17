import json

from django.http import QueryDict
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import TourVersion


class TourVersionListSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source="created_by.username", read_only=True)
    scene_assets_count = serializers.IntegerField(source="scene_assets.count", read_only=True)

    class Meta:
        model = TourVersion
        fields = (
            "id", "location", "version_number", "label", "thumbnail", "background_audio",
            "hotspot_point_logo", "status", "changelog",
            "created_by", "created_by_name", "scene_assets_count", "created_at", "updated_at",
        )
        read_only_fields = fields


class TourVersionSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source="created_by.username", read_only=True)

    class Meta:
        model = TourVersion
        fields = (
            "id", "location", "version_number", "label", "data", "thumbnail",
            "background_audio", "hotspot_point_logo", "status", "changelog",
            "created_by", "created_by_name", "created_at", "updated_at",
        )
        read_only_fields = ("location", "version_number", "status", "created_by", "created_at", "updated_at")

    def to_internal_value(self, data):
        if isinstance(data, QueryDict):
            data = {key: data.get(key) for key in data.keys()}
        elif hasattr(data, "copy"):
            data = data.copy()

        raw_data = data.get("data") if hasattr(data, "get") else None
        if isinstance(raw_data, str):
            try:
                data["data"] = json.loads(raw_data)
            except json.JSONDecodeError as exc:
                raise ValidationError({"data": "Tour data must be valid JSON."}) from exc

        return super().to_internal_value(data)

    def validate_data(self, value):
        if isinstance(value, str):
            try:
                value = json.loads(value)
            except json.JSONDecodeError as exc:
                raise serializers.ValidationError("Tour data must be valid JSON.") from exc
        field = TourVersion._meta.get_field("data")
        for validator in field.validators:
            validator(value)
        return value

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
