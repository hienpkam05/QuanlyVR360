from django.urls import path

from .views import (
    LocationStatsCountryView,
    LocationStatsDeviceView,
    LocationStatsReferrerView,
    LocationStatsSummaryView,
    LocationStatsTimeseriesView,
)

urlpatterns = [
    path("locations/<int:location_id>/stats/summary/", LocationStatsSummaryView.as_view(), name="location-stats-summary"),
    path(
        "locations/<int:location_id>/stats/timeseries/",
        LocationStatsTimeseriesView.as_view(),
        name="location-stats-timeseries",
    ),
    path(
        "locations/<int:location_id>/stats/by-country/",
        LocationStatsCountryView.as_view(),
        name="location-stats-by-country",
    ),
    path(
        "locations/<int:location_id>/stats/by-device/",
        LocationStatsDeviceView.as_view(),
        name="location-stats-by-device",
    ),
    path(
        "locations/<int:location_id>/stats/by-referrer/",
        LocationStatsReferrerView.as_view(),
        name="location-stats-by-referrer",
    ),
]
