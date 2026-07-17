import django_filters

from .models import SceneAsset


class SceneAssetFilter(django_filters.FilterSet):
    scene_key = django_filters.CharFilter(field_name="scene_key", lookup_expr="icontains")
    tour_version = django_filters.NumberFilter(field_name="tour_version_id")
    location = django_filters.NumberFilter(field_name="tour_version__location_id")
    project = django_filters.NumberFilter(field_name="tour_version__location__project_id")
    processing_status = django_filters.ChoiceFilter(choices=SceneAsset.ProcessingStatus.choices)
    checksum_sha256 = django_filters.CharFilter(field_name="checksum_sha256", lookup_expr="iexact")
    mime_type = django_filters.CharFilter(field_name="mime_type", lookup_expr="icontains")
    has_error = django_filters.BooleanFilter(method="filter_has_error")
    created_after = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    created_before = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="lte")
    processed_after = django_filters.DateTimeFilter(field_name="processed_at", lookup_expr="gte")
    processed_before = django_filters.DateTimeFilter(field_name="processed_at", lookup_expr="lte")

    class Meta:
        model = SceneAsset
        fields = ["tour_version", "location", "project", "processing_status", "checksum_sha256"]

    def filter_has_error(self, queryset, name, value):
        if value:
            return queryset.exclude(error_message="")
        return queryset.filter(error_message="")
