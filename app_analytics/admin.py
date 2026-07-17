from django.contrib import admin

from .models import DailyStat, TourVisit


@admin.register(TourVisit)
class TourVisitAdmin(admin.ModelAdmin):
    list_display = ("publish_config", "visitor_hash", "country_code", "device_type", "visited_at")
    list_filter = ("device_type", "country_code", "visited_at")
    search_fields = ("visitor_hash", "city", "browser", "os", "referrer_domain")
    readonly_fields = ("visited_at",)
    autocomplete_fields = ("publish_config",)
    date_hierarchy = "visited_at"


@admin.register(DailyStat)
class DailyStatAdmin(admin.ModelAdmin):
    list_display = ("publish_config", "date", "total_visits", "unique_visitors")
    list_filter = ("date",)
    search_fields = ("publish_config__location__name",)
    autocomplete_fields = ("publish_config",)
    date_hierarchy = "date"
