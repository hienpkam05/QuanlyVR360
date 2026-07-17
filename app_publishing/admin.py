from django.contrib import admin

from .models import PublishConfig, WhitelistDomain


class WhitelistDomainInline(admin.TabularInline):
    model = WhitelistDomain
    extra = 0


@admin.register(PublishConfig)
class PublishConfigAdmin(admin.ModelAdmin):
    list_display = ("location", "published_version", "is_active", "published_by", "published_at")
    list_filter = ("is_active", "published_at")
    search_fields = ("location__name", "public_token")
    readonly_fields = ("public_token", "published_at", "updated_at")
    autocomplete_fields = ("location", "published_version", "published_by")
    inlines = (WhitelistDomainInline,)


@admin.register(WhitelistDomain)
class WhitelistDomainAdmin(admin.ModelAdmin):
    list_display = ("domain", "publish_config", "label", "is_active", "created_at")
    list_filter = ("is_active", "created_at")
    search_fields = ("domain", "label", "publish_config__location__name")
    autocomplete_fields = ("publish_config",)
