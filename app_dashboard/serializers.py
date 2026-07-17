from rest_framework import serializers

from .models import ActivityLog


class ActivityLogSerializer(serializers.ModelSerializer):
    actor_name = serializers.CharField(source="actor.username", read_only=True)

    class Meta:
        model = ActivityLog
        fields = (
            "id", "actor", "actor_name", "action", "entity_type", "entity_id",
            "description", "metadata", "created_at",
        )
        read_only_fields = fields


class DashboardOverviewSerializer(serializers.Serializer):
    projects_count = serializers.IntegerField(read_only=True)
    locations_count = serializers.IntegerField(read_only=True)
    published_locations = serializers.IntegerField(read_only=True)
    tour_versions_count = serializers.IntegerField(read_only=True)
    total_visits = serializers.IntegerField(read_only=True)
    unique_visitors = serializers.IntegerField(read_only=True)


class TopLocationSerializer(serializers.Serializer):
    location_id = serializers.IntegerField(read_only=True)
    location_name = serializers.CharField(read_only=True)
    project_id = serializers.IntegerField(read_only=True)
    project_name = serializers.CharField(read_only=True)
    total_visits = serializers.IntegerField(read_only=True)
    unique_visitors = serializers.IntegerField(read_only=True)


class DashboardDateRangeSerializer(serializers.Serializer):
    date_from = serializers.DateField(required=False)
    date_to = serializers.DateField(required=False)
    limit = serializers.IntegerField(min_value=1, max_value=100, default=10)

    def to_internal_value(self, data):
        mutable = data.copy()
        if "from" in mutable and "date_from" not in mutable:
            mutable["date_from"] = mutable["from"]
        if "to" in mutable and "date_to" not in mutable:
            mutable["date_to"] = mutable["to"]
        return super().to_internal_value(mutable)

    def validate(self, attrs):
        if attrs.get("date_from") and attrs.get("date_to") and attrs["date_from"] > attrs["date_to"]:
            raise serializers.ValidationError("Ngay bat dau khong duoc lon hon ngay ket thuc.")
        return attrs


class RecentActivityQuerySerializer(serializers.Serializer):
    limit = serializers.IntegerField(min_value=1, max_value=100, default=20)
