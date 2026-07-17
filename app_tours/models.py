from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models, transaction

from app_locations.models import Location
from backend.models import SoftDeleteModel


def validate_tour_data(value):
    if not isinstance(value, dict):
        raise ValidationError("Dữ liệu tour phải là một JSON object.")
    scenes = value.get("scenes")
    if not isinstance(scenes, list):
        raise ValidationError("Dữ liệu tour phải có danh sách scenes.")
    scene_keys = []
    for scene in scenes:
        if not isinstance(scene, dict) or not scene.get("id"):
            raise ValidationError("Mỗi scene phải là object và có id.")
        scene_keys.append(str(scene["id"]))
    if len(scene_keys) != len(set(scene_keys)):
        raise ValidationError("Các scene không được trùng id.")


class TourVersion(SoftDeleteModel):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        ARCHIVED = "archived", "Archived"

    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="versions")
    version_number = models.PositiveIntegerField(editable=False)
    label = models.CharField(max_length=100, blank=True)
    data = models.JSONField(validators=[validate_tour_data])
    thumbnail = models.ImageField(upload_to="tours/thumbnails/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    changelog = models.TextField(blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="created_tour_versions",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-version_number"]
        constraints = [models.UniqueConstraint(
            fields=["location", "version_number"], name="unique_tour_version_per_location"
        )]
        indexes = [models.Index(fields=["location", "status"])]

    def __str__(self):
        return f"{self.location.name} - v{self.version_number}"

    def save(self, *args, **kwargs):
        if self.version_number:
            return super().save(*args, **kwargs)
        with transaction.atomic():
            Location.objects.select_for_update().get(pk=self.location_id)
            last_number = (TourVersion.all_objects.filter(location_id=self.location_id)
                           .order_by("-version_number")
                           .values_list("version_number", flat=True).first())
            self.version_number = (last_number or 0) + 1
            return super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        if self.is_deleted:
            return 0, {}
        self.scene_assets.all().delete()
        return super().delete(using=using, keep_parents=keep_parents)
