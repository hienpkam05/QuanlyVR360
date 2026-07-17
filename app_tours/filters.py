import django_filters

from .models import TourVersion


class TourVersionFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method="filter_search")
    location = django_filters.NumberFilter(field_name="location_id")
    location_slug = django_filters.CharFilter(field_name="location__slug", lookup_expr="iexact")
    project = django_filters.NumberFilter(field_name="location__project_id")
    project_slug = django_filters.CharFilter(field_name="location__project__slug", lookup_expr="iexact")
    status = django_filters.ChoiceFilter(choices=TourVersion.Status.choices)
    version_number = django_filters.NumberFilter()
    version_min = django_filters.NumberFilter(field_name="version_number", lookup_expr="gte")
    version_max = django_filters.NumberFilter(field_name="version_number", lookup_expr="lte")
    created_by = django_filters.NumberFilter(field_name="created_by_id")
    created_after = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    created_before = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        model = TourVersion
        fields = ["location", "project", "status", "version_number", "created_by"]

    def filter_search(self, queryset, name, value):
        return queryset.filter(label__icontains=value) | queryset.filter(changelog__icontains=value)
