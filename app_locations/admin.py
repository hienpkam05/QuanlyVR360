from django.contrib import admin

from .models import Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ("id","name", "project", "slug", "order", "is_active", "updated_at")
    list_filter = ("is_active", "project")
    search_fields = ("name", "slug", "project__name")
    readonly_fields = ("created_at", "updated_at")
    autocomplete_fields = ("project",)
