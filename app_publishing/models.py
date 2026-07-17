import secrets
from urllib.parse import urlsplit

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from app_locations.models import Location
from app_tours.models import TourVersion
from backend.models import SoftDeleteModel


class PublishConfig(SoftDeleteModel):
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, related_name="publish_configs"
    )
    public_token = models.CharField(max_length=64, unique=True, editable=False)
    published_version = models.ForeignKey(
        TourVersion, on_delete=models.SET_NULL, null=True, blank=True, related_name="publish_configs"
    )
    is_active = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    published_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="published_tours",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=["location"], condition=models.Q(is_deleted=False),
            name="unique_active_publish_config_per_location",
        )]

    def __str__(self):
        return f"Publish config: {self.location.name}"

    def clean(self):
        errors = {}
        if self.is_active and not self.published_version_id:
            errors["published_version"] = "Phải chọn version trước khi kích hoạt publish."
        if (self.published_version_id and self.location_id
                and self.published_version.location_id != self.location_id):
            errors["published_version"] = "Version được publish phải thuộc đúng địa điểm."
        if self.published_version_id and self.published_version.is_deleted:
            errors["published_version"] = "Không thể publish một version đã bị xóa."
        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        if not self.public_token:
            token = secrets.token_urlsafe(24)
            while PublishConfig.objects.filter(public_token=token).exists():
                token = secrets.token_urlsafe(24)
            self.public_token = token
        if self.is_active and self.published_version_id and not self.published_at:
            self.published_at = timezone.now()
        self.full_clean()
        super().save(*args, **kwargs)

    def regenerate_token(self):
        self.public_token = ""
        self.save(update_fields=["public_token", "updated_at"])

    def public_url(self, base_url):
        return f"{base_url.rstrip('/')}/vr360/{self.public_token}/"

    def delete(self, using=None, keep_parents=False):
        if self.is_deleted:
            return 0, {}
        self.whitelist_domains.all().delete()
        self.visits.all().delete()
        self.daily_stats.all().delete()
        return super().delete(using=using, keep_parents=keep_parents)


class WhitelistDomain(SoftDeleteModel):
    publish_config = models.ForeignKey(
        PublishConfig, on_delete=models.CASCADE, related_name="whitelist_domains"
    )
    domain = models.CharField(max_length=255)
    label = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=["publish_config", "domain"], condition=models.Q(is_deleted=False),
            name="unique_active_domain_per_publish_config"
        )]

    def __str__(self):
        return self.domain

    def clean(self):
        raw = self.domain.strip().lower()
        parsed = urlsplit(raw if "://" in raw else f"//{raw}")
        if parsed.path not in ("", "/") or parsed.query or parsed.fragment:
            raise ValidationError({"domain": "Domain không được chứa path, query hoặc fragment."})
        if not parsed.hostname:
            raise ValidationError({"domain": "Domain không hợp lệ."})
        self.domain = parsed.hostname.encode("idna").decode("ascii")
        if parsed.port:
            self.domain = f"{self.domain}:{parsed.port}"

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
