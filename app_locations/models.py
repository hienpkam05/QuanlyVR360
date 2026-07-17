from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify

from app_projects.models import Project
from backend.models import SoftDeleteModel


class Location(SoftDeleteModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="locations")
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=275, blank=True)
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to="locations/thumbnails/", blank=True, null=True)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True,
        validators=[MinValueValidator(-90), MaxValueValidator(90)],
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True,
        validators=[MinValueValidator(-180), MaxValueValidator(180)],
    )
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "created_at"]
        constraints = [models.UniqueConstraint(
            fields=["project", "slug"], 
            condition=models.Q(is_deleted=False),
            name="unique_active_location_slug_per_project"
        )]
        indexes = [models.Index(fields=["project", "is_active"])]

    def __str__(self):
        return f"{self.project.name} / {self.name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name) or "location"
            slug, counter = base_slug, 2
            queryset = Location.objects.filter(project_id=self.project_id)
            while queryset.filter(slug=slug).exclude(pk=self.pk).exists():
                slug, counter = f"{base_slug}-{counter}", counter + 1
            self.slug = slug
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        if self.is_deleted:
            return 0, {}
        self.versions.all().delete()
        self.publish_configs.all().delete()
        return super().delete(using=using, keep_parents=keep_parents)
