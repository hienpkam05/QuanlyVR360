from django.urls import path

from .views import DashboardOverviewView, DashboardRecentActivityView, DashboardTopLocationsView

urlpatterns = [
    path("dashboard/overview/", DashboardOverviewView.as_view(), name="dashboard-overview"),
    path("dashboard/top-locations/", DashboardTopLocationsView.as_view(), name="dashboard-top-locations"),
    path("dashboard/recent-activity/", DashboardRecentActivityView.as_view(), name="dashboard-recent-activity"),
]
