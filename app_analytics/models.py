from django.db import models

from app_publishing.models import PublishConfig
from backend.models import SoftDeleteModel


class TourVisit(SoftDeleteModel):
    class DeviceType(models.TextChoices):
        MOBILE = "mobile", "Mobile"
        TABLET = "tablet", "Tablet"
        DESKTOP = "desktop", "Desktop"
        OTHER = "other", "Other"

    publish_config = models.ForeignKey(
        PublishConfig, on_delete=models.CASCADE, related_name="visits"
    )
    visitor_hash = models.CharField(max_length=64, db_index=True)
    country_code = models.CharField(max_length=2, blank=True)
    city = models.CharField(max_length=100, blank=True)
    device_type = models.CharField(
        max_length=10, choices=DeviceType.choices, default=DeviceType.OTHER
    )
    browser = models.CharField(max_length=50, blank=True)
    os = models.CharField(max_length=50, blank=True)
    referrer_domain = models.CharField(max_length=255, blank=True)
    visited_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=["publish_config", "visited_at"]),
            models.Index(fields=["publish_config", "country_code"]),
            models.Index(fields=["publish_config", "device_type"]),
            models.Index(fields=["publish_config", "referrer_domain"]),
        ]


class DailyStat(SoftDeleteModel):
    publish_config = models.ForeignKey(
        PublishConfig, on_delete=models.CASCADE, related_name="daily_stats"
    )
    date = models.DateField()
    total_visits = models.PositiveIntegerField(default=0)
    unique_visitors = models.PositiveIntegerField(default=0)
    country_breakdown = models.JSONField(default=dict, blank=True)
    device_breakdown = models.JSONField(default=dict, blank=True)
    referrer_breakdown = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["-date"]
        constraints = [models.UniqueConstraint(
            fields=["publish_config", "date"], condition=models.Q(is_deleted=False),
            name="unique_active_daily_stat_per_publish_config"
        )]

    def __str__(self):
        return f"{self.publish_config.location.name} - {self.date}"
