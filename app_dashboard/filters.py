import django_filters

from .models import ActivityLog


class ActivityLogFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method="filter_search")
    actor = django_filters.NumberFilter(field_name="actor_id")
    action = django_filters.CharFilter(field_name="action", lookup_expr="iexact")
    entity_type = django_filters.CharFilter(field_name="entity_type", lookup_expr="iexact")
    entity_id = django_filters.CharFilter(field_name="entity_id", lookup_expr="iexact")
    created_after = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    created_before = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        model = ActivityLog
        fields = ["actor", "action", "entity_type", "entity_id"]

    def filter_search(self, queryset, name, value):
        return queryset.filter(description__icontains=value) | queryset.filter(action__icontains=value)
