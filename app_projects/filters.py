import django_filters

from .models import Project


class ProjectFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method="filter_search")
    name = django_filters.CharFilter(field_name="name", lookup_expr="icontains")
    slug = django_filters.CharFilter(field_name="slug", lookup_expr="iexact")
    is_active = django_filters.BooleanFilter()
    created_by = django_filters.NumberFilter(field_name="created_by_id")
    created_after = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    created_before = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        model = Project
        fields = ["slug", "is_active", "created_by"]

    def filter_search(self, queryset, name, value):
        return queryset.filter(name__icontains=value) | queryset.filter(description__icontains=value)
