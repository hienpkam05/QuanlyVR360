from django.db.models import Count
from rest_framework.response import Response
from rest_framework.views import APIView

from app_analytics.models import TourVisit
from app_locations.models import Location
from app_projects.models import Project
from app_publishing.models import PublishConfig
from app_tours.models import TourVersion

from .models import ActivityLog
from .serializers import (
    ActivityLogSerializer,
    DashboardDateRangeSerializer,
    DashboardOverviewSerializer,
    RecentActivityQuerySerializer,
    TopLocationSerializer,
)


def filter_visits_by_date(queryset, date_from=None, date_to=None):
    if date_from:
        queryset = queryset.filter(visited_at__date__gte=date_from)
    if date_to:
        queryset = queryset.filter(visited_at__date__lte=date_to)
    return queryset


class DashboardOverviewView(APIView):
    def get(self, request):
        visits = TourVisit.objects.all()
        payload = {
            "projects_count": Project.objects.count(),
            "locations_count": Location.objects.count(),
            "published_locations": PublishConfig.objects.filter(is_active=True).count(),
            "tour_versions_count": TourVersion.objects.count(),
            "total_visits": visits.count(),
            "unique_visitors": visits.values("visitor_hash").distinct().count(),
        }
        return Response(DashboardOverviewSerializer(payload).data)


class DashboardTopLocationsView(APIView):
    def get(self, request):
        serializer = DashboardDateRangeSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        attrs = serializer.validated_data
        visits = filter_visits_by_date(
            TourVisit.objects.select_related("publish_config__location__project"),
            attrs.get("date_from"),
            attrs.get("date_to"),
        )
        rows = (
            visits.values(
                "publish_config__location_id",
                "publish_config__location__name",
                "publish_config__location__project_id",
                "publish_config__location__project__name",
            )
            .annotate(total_visits=Count("id"), unique_visitors=Count("visitor_hash", distinct=True))
            .order_by("-total_visits", "publish_config__location__name")[: attrs["limit"]]
        )
        payload = [
            {
                "location_id": row["publish_config__location_id"],
                "location_name": row["publish_config__location__name"],
                "project_id": row["publish_config__location__project_id"],
                "project_name": row["publish_config__location__project__name"],
                "total_visits": row["total_visits"],
                "unique_visitors": row["unique_visitors"],
            }
            for row in rows
        ]
        return Response(
            {
                "from": attrs.get("date_from"),
                "to": attrs.get("date_to"),
                "limit": attrs["limit"],
                "results": TopLocationSerializer(payload, many=True).data,
            }
        )


class DashboardRecentActivityView(APIView):
    def get(self, request):
        serializer = RecentActivityQuerySerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        limit = serializer.validated_data["limit"]
        activities = ActivityLog.objects.select_related("actor").order_by("-created_at")[:limit]
        return Response(
            {
                "limit": limit,
                "results": ActivityLogSerializer(activities, many=True).data,
            }
        )
