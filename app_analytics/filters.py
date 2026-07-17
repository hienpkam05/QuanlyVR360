import django_filters

from .models import DailyStat, TourVisit


class TourVisitFilter(django_filters.FilterSet):
    publish_config = django_filters.NumberFilter(field_name="publish_config_id")
    country_code = django_filters.CharFilter(field_name="country_code", lookup_expr="iexact")
    city = django_filters.CharFilter(field_name="city", lookup_expr="icontains")
    device_type = django_filters.ChoiceFilter(choices=TourVisit.DeviceType.choices)
    browser = django_filters.CharFilter(field_name="browser", lookup_expr="icontains")
    os = django_filters.CharFilter(field_name="os", lookup_expr="icontains")
    referrer_domain = django_filters.CharFilter(field_name="referrer_domain", lookup_expr="icontains")
    visited_after = django_filters.DateTimeFilter(field_name="visited_at", lookup_expr="gte")
    visited_before = django_filters.DateTimeFilter(field_name="visited_at", lookup_expr="lte")

    class Meta:
        model = TourVisit
        fields = ["publish_config", "country_code", "device_type", "referrer_domain"]


class DailyStatFilter(django_filters.FilterSet):
    publish_config = django_filters.NumberFilter(field_name="publish_config_id")
    date = django_filters.DateFilter()
    date_after = django_filters.DateFilter(field_name="date", lookup_expr="gte")
    date_before = django_filters.DateFilter(field_name="date", lookup_expr="lte")
    total_visits_min = django_filters.NumberFilter(field_name="total_visits", lookup_expr="gte")
    total_visits_max = django_filters.NumberFilter(field_name="total_visits", lookup_expr="lte")
    unique_visitors_min = django_filters.NumberFilter(field_name="unique_visitors", lookup_expr="gte")
    unique_visitors_max = django_filters.NumberFilter(field_name="unique_visitors", lookup_expr="lte")

    class Meta:
        model = DailyStat
        fields = ["publish_config", "date"]
