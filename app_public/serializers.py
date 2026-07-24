from rest_framework import serializers

from app_media.serializers import SceneProcessingStatusSerializer


class PublicTourSerializer(serializers.Serializer):
    location_id = serializers.IntegerField(read_only=True)
    location_name = serializers.CharField(read_only=True)
    version_number = serializers.IntegerField(read_only=True)
    data = serializers.JSONField(read_only=True)
    scene_assets = SceneProcessingStatusSerializer(many=True, read_only=True)
