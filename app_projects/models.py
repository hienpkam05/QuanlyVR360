from django.conf import settings
from django.db import models
from django.utils.text import slugify

from backend.models import SoftDeleteModel


class Project(SoftDeleteModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=275, blank=True)
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to="projects/thumbnails/", blank=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name="created_projects",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [models.UniqueConstraint(
            fields=["slug"], condition=models.Q(is_deleted=False), name="unique_active_project_slug"
        )]
        indexes = [models.Index(fields=["is_active"])]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name) or "project"
            slug, counter = base_slug, 2
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug, counter = f"{base_slug}-{counter}", counter + 1
            self.slug = slug
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        if self.is_deleted:
            return 0, {}
        self.locations.all().delete()
        return super().delete(using=using, keep_parents=keep_parents)
