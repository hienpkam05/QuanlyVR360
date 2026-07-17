from rest_framework import serializers

from app_tours.models import TourVersion

from .models import PublishConfig, WhitelistDomain


class WhitelistDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhitelistDomain
        fields = ("id", "publish_config", "domain", "label", "is_active", "created_at")
        read_only_fields = ("publish_config", "created_at")

    def validate_domain(self, value):
        instance = WhitelistDomain(domain=value)
        instance.clean()
        return instance.domain

    def validate(self, attrs):
        publish_config = self.context.get("publish_config") or getattr(self.instance, "publish_config", None)
        domain = attrs.get("domain", getattr(self.instance, "domain", None))
        if publish_config and domain:
            queryset = WhitelistDomain.objects.filter(publish_config=publish_config, domain=domain)
            if self.instance:
                queryset = queryset.exclude(pk=self.instance.pk)
            if queryset.exists():
                raise serializers.ValidationError({"domain": "Domain nay da nam trong whitelist."})
        return attrs


class PublishConfigSerializer(serializers.ModelSerializer):
    whitelist_domains = WhitelistDomainSerializer(many=True, read_only=True)
    public_url = serializers.SerializerMethodField()

    class Meta:
        model = PublishConfig
        fields = (
            "id", "location", "public_token", "public_url", "published_version", "is_active",
            "published_at", "published_by", "updated_at", "whitelist_domains",
        )
        read_only_fields = (
            "location", "public_token", "public_url", "published_by", "published_at",
            "updated_at", "whitelist_domains",
        )

    def get_public_url(self, obj):
        request = self.context.get("request")
        path = f"/vr360/{obj.public_token}/"
        return request.build_absolute_uri(path) if request else path

    def validate(self, attrs):
        location = self.instance.location if self.instance else self.context.get("location")
        version = attrs.get("published_version")
        is_active = attrs.get("is_active", getattr(self.instance, "is_active", False))
        effective_version = version or getattr(self.instance, "published_version", None)
        if is_active and effective_version is None:
            raise serializers.ValidationError({"published_version": "Phải chọn version để publish."})
        if version and location and version.location_id != location.id:
            raise serializers.ValidationError({"published_version": "Version không thuộc địa điểm này."})
        if version and version.status == TourVersion.Status.ARCHIVED:
            raise serializers.ValidationError({"published_version": "Không thể publish version đã archived."})
        return attrs


class PublishCreateSerializer(PublishConfigSerializer):
    class Meta(PublishConfigSerializer.Meta):
        read_only_fields = (
            "location", "public_token", "public_url", "published_by", "published_at",
            "updated_at", "whitelist_domains",
        )


class PublishActionSerializer(serializers.Serializer):
    published_version = serializers.IntegerField(required=False, min_value=1)
    version_id = serializers.IntegerField(required=False, min_value=1, write_only=True)
    is_active = serializers.BooleanField(required=False)

    def validate(self, attrs):
        location = self.context["location"]
        require_version = self.context.get("require_version", False)
        version_id = attrs.get("published_version") or attrs.get("version_id")

        if require_version and not version_id:
            raise serializers.ValidationError({"published_version": "Phai chon version de publish."})

        if not version_id:
            return attrs

        try:
            version = TourVersion.objects.get(pk=version_id, location=location)
        except TourVersion.DoesNotExist as exc:
            raise serializers.ValidationError(
                {"published_version": "Version khong ton tai hoac khong thuoc dia diem nay."}
            ) from exc

        attrs["published_version_obj"] = version
        return attrs


class PublishedTourCardSerializer(serializers.ModelSerializer):
    public_url = serializers.SerializerMethodField()
    project_id = serializers.IntegerField(source="location.project_id", read_only=True)
    project_name = serializers.CharField(source="location.project.name", read_only=True)
    location_id = serializers.IntegerField(source="location.id", read_only=True)
    location_name = serializers.CharField(source="location.name", read_only=True)
    location_slug = serializers.CharField(source="location.slug", read_only=True)
    location_description = serializers.CharField(source="location.description", read_only=True)
    location_thumbnail = serializers.SerializerMethodField()
    version_id = serializers.IntegerField(source="published_version.id", read_only=True)
    version_number = serializers.IntegerField(source="published_version.version_number", read_only=True)
    version_label = serializers.CharField(source="published_version.label", read_only=True)
    tour_thumbnail = serializers.SerializerMethodField()
    scene_count = serializers.SerializerMethodField()

    class Meta:
        model = PublishConfig
        fields = (
            "id",
            "public_token",
            "public_url",
            "project_id",
            "project_name",
            "location_id",
            "location_name",
            "location_slug",
            "location_description",
            "location_thumbnail",
            "version_id",
            "version_number",
            "version_label",
            "tour_thumbnail",
            "scene_count",
            "published_at",
        )

    def absolute_media_url(self, value):
        if not value:
            return ""
        request = self.context.get("request")
        url = value.url if hasattr(value, "url") else str(value)
        if url.startswith("http://") or url.startswith("https://"):
            return url
        return request.build_absolute_uri(url) if request else url

    def get_location_thumbnail(self, obj):
        return self.absolute_media_url(obj.location.thumbnail)

    def get_public_url(self, obj):
        request = self.context.get("request")
        path = f"/vr360/{obj.public_token}/"
        return request.build_absolute_uri(path) if request else path

    def get_tour_thumbnail(self, obj):
        version = obj.published_version
        if version.thumbnail:
            return self.absolute_media_url(version.thumbnail)
        data = version.data or {}
        first_scene = next((scene for scene in data.get("scenes", []) if isinstance(scene, dict)), None)
        if not first_scene:
            return self.get_location_thumbnail(obj)
        thumbnail = (
            first_scene.get("thumbnail")
            or first_scene.get("original_file")
            or first_scene.get("image_url")
            or self.get_location_thumbnail(obj)
        )
        return self.absolute_media_url(thumbnail)

    def get_scene_count(self, obj):
        data = obj.published_version.data or {}
        return len(data.get("scenes", []))
