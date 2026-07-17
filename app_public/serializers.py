from rest_framework import serializers

from app_media.serializers import SceneProcessingStatusSerializer


class PublicTourSerializer(serializers.Serializer):
    location_id = serializers.IntegerField(read_only=True)
    location_name = serializers.CharField(read_only=True)
    version_number = serializers.IntegerField(read_only=True)
    data = serializers.JSONField(read_only=True)
    scene_assets = SceneProcessingStatusSerializer(many=True, read_only=True)


class PublicTileQuerySerializer(serializers.Serializer):
    scene_key = serializers.CharField(max_length=100)
    zoom = serializers.IntegerField(min_value=0)
    x = serializers.IntegerField(min_value=0)
    y = serializers.IntegerField(min_value=0)
