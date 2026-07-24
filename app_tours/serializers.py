import json
from copy import deepcopy

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
    source_version_id = serializers.IntegerField(write_only=True, required=False, allow_null=True, min_value=1)

    class Meta:
        model = TourVersion
        fields = (
            "id", "location", "version_number", "label", "data", "thumbnail",
            "background_audio", "hotspot_point_logo", "status", "changelog",
            "created_by", "created_by_name", "created_at", "updated_at",
            "source_version_id",
        )
        read_only_fields = ("location", "version_number", "status", "created_by", "created_at", "updated_at")
        extra_kwargs = {"data": {"required": False}}

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
        source_version_id = attrs.get("source_version_id")
        if source_version_id:
            location = self.context.get("location") or getattr(self.instance, "location", None)
            queryset = TourVersion.objects.all()
            if location:
                queryset = queryset.filter(location=location)
            try:
                attrs["source_version_obj"] = queryset.get(pk=source_version_id)
            except TourVersion.DoesNotExist as exc:
                raise serializers.ValidationError(
                    {"source_version_id": "Source version does not exist or does not belong to this location."}
                ) from exc
        if not self.instance and "data" not in attrs and not attrs.get("source_version_obj"):
            raise serializers.ValidationError({"data": "Tour data is required unless source_version_id is provided."})
        return attrs

    def create(self, validated_data):
        source_version = validated_data.pop("source_version_obj", None)
        validated_data.pop("source_version_id", None)
        if source_version and "data" not in validated_data:
            validated_data["data"] = deepcopy(source_version.data)
        instance = super().create(validated_data)
        instance._source_version_obj = source_version
        return instance


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
