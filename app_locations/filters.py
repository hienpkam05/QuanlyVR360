import django_filters

from .models import Location


class LocationFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method="filter_search")
    project = django_filters.NumberFilter(field_name="project_id")
    project_slug = django_filters.CharFilter(field_name="project__slug", lookup_expr="iexact")
    name = django_filters.CharFilter(field_name="name", lookup_expr="icontains")
    slug = django_filters.CharFilter(field_name="slug", lookup_expr="iexact")
    is_active = django_filters.BooleanFilter()
    has_coordinates = django_filters.BooleanFilter(method="filter_has_coordinates")
    order_min = django_filters.NumberFilter(field_name="order", lookup_expr="gte")
    order_max = django_filters.NumberFilter(field_name="order", lookup_expr="lte")
    created_after = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    created_before = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        model = Location
        fields = ["project", "project_slug", "slug", "is_active"]

    def filter_search(self, queryset, name, value):
        return queryset.filter(name__icontains=value) | queryset.filter(description__icontains=value)

    def filter_has_coordinates(self, queryset, name, value):
        if value:
            return queryset.filter(latitude__isnull=False, longitude__isnull=False)
        return queryset.filter(latitude__isnull=True) | queryset.filter(longitude__isnull=True)
