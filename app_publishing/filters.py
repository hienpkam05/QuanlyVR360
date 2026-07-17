import django_filters

from .models import PublishConfig, WhitelistDomain


class PublishConfigFilter(django_filters.FilterSet):
    location = django_filters.NumberFilter(field_name="location_id")
    location_slug = django_filters.CharFilter(field_name="location__slug", lookup_expr="iexact")
    project = django_filters.NumberFilter(field_name="location__project_id")
    project_slug = django_filters.CharFilter(field_name="location__project__slug", lookup_expr="iexact")
    public_token = django_filters.CharFilter(field_name="public_token", lookup_expr="iexact")
    published_version = django_filters.NumberFilter(field_name="published_version_id")
    is_active = django_filters.BooleanFilter()
    published_by = django_filters.NumberFilter(field_name="published_by_id")
    published_after = django_filters.DateTimeFilter(field_name="published_at", lookup_expr="gte")
    published_before = django_filters.DateTimeFilter(field_name="published_at", lookup_expr="lte")

    class Meta:
        model = PublishConfig
        fields = ["location", "project", "public_token", "published_version", "is_active", "published_by"]


class WhitelistDomainFilter(django_filters.FilterSet):
    publish_config = django_filters.NumberFilter(field_name="publish_config_id")
    domain = django_filters.CharFilter(field_name="domain", lookup_expr="icontains")
    label = django_filters.CharFilter(field_name="label", lookup_expr="icontains")
    is_active = django_filters.BooleanFilter()
    created_after = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    created_before = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        model = WhitelistDomain
        fields = ["publish_config", "domain", "is_active"]
