from django.contrib import admin

from .models import TourVersion


@admin.register(TourVersion)
class TourVersionAdmin(admin.ModelAdmin):
    list_display = ("id","location", "version_number", "label", "status", "created_by", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("location__name", "label", "changelog")
    readonly_fields = ("version_number", "created_at", "updated_at")
    autocomplete_fields = ("location", "created_by")
