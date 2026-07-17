from datetime import timedelta

from django.db.models import Count
from django.db.models.functions import TruncDate, TruncMonth, TruncWeek, TruncYear
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from app_locations.models import Location
from app_publishing.models import PublishConfig

from .models import TourVisit
from .serializers import StatsQuerySerializer, TimeseriesQuerySerializer


def date_range(start_date, end_date):
    current = start_date
    while current <= end_date:
        yield current
        current += timedelta(days=1)


class LocationStatsMixin:
    def get_location(self, location_id):
        return get_object_or_404(Location.objects.select_related("project"), pk=location_id)

    def get_query_serializer(self, request, serializer_class=StatsQuerySerializer):
        serializer = serializer_class(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        return serializer

    def get_visits(self, location, date_from=None, date_to=None):
        publish_configs = PublishConfig.objects.filter(location=location)
        queryset = TourVisit.objects.filter(publish_config__in=publish_configs)
        if date_from:
            queryset = queryset.filter(visited_at__date__gte=date_from)
        if date_to:
            queryset = queryset.filter(visited_at__date__lte=date_to)
        return queryset

    def breakdown(self, visits, field_name):
        return [
            {
                "key": item[field_name] or "unknown",
                "count": item["count"],
                "unique_visitors": item["unique_visitors"],
            }
            for item in visits.values(field_name)
            .annotate(count=Count("id"), unique_visitors=Count("visitor_hash", distinct=True))
            .order_by("-count", field_name)
        ]


class LocationStatsSummaryView(LocationStatsMixin, APIView):
    def get(self, request, location_id):
        location = self.get_location(location_id)
        serializer = self.get_query_serializer(request)
        visits = self.get_visits(location, **serializer.validated_data)

        return Response(
            {
                "location_id": location.pk,
                "total_visits": visits.count(),
                "unique_visitors": visits.values("visitor_hash").distinct().count(),
                "from": serializer.validated_data.get("date_from"),
                "to": serializer.validated_data.get("date_to"),
            }
        )


class LocationStatsTimeseriesView(LocationStatsMixin, APIView):
    trunc_map = {
        "day": TruncDate,
        "week": TruncWeek,
        "month": TruncMonth,
        "year": TruncYear,
    }

    def get_default_range(self, attrs):
        date_to = attrs.get("date_to") or timezone.localdate()
        date_from = attrs.get("date_from") or (date_to - timedelta(days=29))
        return date_from, date_to

    def get(self, request, location_id):
        location = self.get_location(location_id)
        serializer = self.get_query_serializer(request, TimeseriesQuerySerializer)
        attrs = serializer.validated_data
        granularity = attrs.get("granularity", "day")
        date_from, date_to = self.get_default_range(attrs)
        visits = self.get_visits(location, date_from=date_from, date_to=date_to)

        trunc = self.trunc_map[granularity]
        rows = (
            visits.annotate(period=trunc("visited_at"))
            .values("period")
            .annotate(total_visits=Count("id"), unique_visitors=Count("visitor_hash", distinct=True))
            .order_by("period")
        )

        if granularity == "day":
            by_period = {row["period"]: row for row in rows}
            data = [
                {
                    "period": day,
                    "total_visits": by_period.get(day, {}).get("total_visits", 0),
                    "unique_visitors": by_period.get(day, {}).get("unique_visitors", 0),
                }
                for day in date_range(date_from, date_to)
            ]
        else:
            data = [
                {
                    "period": row["period"].date() if hasattr(row["period"], "date") else row["period"],
                    "total_visits": row["total_visits"],
                    "unique_visitors": row["unique_visitors"],
                }
                for row in rows
            ]

        return Response(
            {
                "location_id": location.pk,
                "granularity": granularity,
                "from": date_from,
                "to": date_to,
                "results": data,
            }
        )


class LocationStatsCountryView(LocationStatsMixin, APIView):
    def get(self, request, location_id):
        location = self.get_location(location_id)
        serializer = self.get_query_serializer(request)
        visits = self.get_visits(location, **serializer.validated_data)
        return Response({"location_id": location.pk, "results": self.breakdown(visits, "country_code")})


class LocationStatsDeviceView(LocationStatsMixin, APIView):
    def get(self, request, location_id):
        location = self.get_location(location_id)
        serializer = self.get_query_serializer(request)
        visits = self.get_visits(location, **serializer.validated_data)
        return Response({"location_id": location.pk, "results": self.breakdown(visits, "device_type")})


class LocationStatsReferrerView(LocationStatsMixin, APIView):
    def get(self, request, location_id):
        location = self.get_location(location_id)
        serializer = self.get_query_serializer(request)
        visits = self.get_visits(location, **serializer.validated_data)
        return Response({"location_id": location.pk, "results": self.breakdown(visits, "referrer_domain")})
