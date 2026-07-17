from rest_framework import serializers

from .models import DailyStat, TourVisit


class TourVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourVisit
        fields = (
            "id", "publish_config", "visitor_hash", "country_code", "city", "device_type",
            "browser", "os", "referrer_domain", "visited_at",
        )
        read_only_fields = fields


class TrackVisitSerializer(serializers.Serializer):
    # Thông tin nhận diện được suy ra ở server từ request; client không được tự khai báo.
    pass


class DailyStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyStat
        fields = (
            "id", "publish_config", "date", "total_visits", "unique_visitors",
            "country_breakdown", "device_breakdown", "referrer_breakdown",
        )
        read_only_fields = fields


class StatsQuerySerializer(serializers.Serializer):
    date_from = serializers.DateField(required=False)
    date_to = serializers.DateField(required=False)

    def to_internal_value(self, data):
        mutable = data.copy()
        if "from" in mutable and "date_from" not in mutable:
            mutable["date_from"] = mutable["from"]
        if "to" in mutable and "date_to" not in mutable:
            mutable["date_to"] = mutable["to"]
        return super().to_internal_value(mutable)

    def validate(self, attrs):
        if attrs.get("date_from") and attrs.get("date_to") and attrs["date_from"] > attrs["date_to"]:
            raise serializers.ValidationError("Ngày bắt đầu không được lớn hơn ngày kết thúc.")
        return attrs


class TimeseriesQuerySerializer(StatsQuerySerializer):
    granularity = serializers.ChoiceField(choices=("day", "week", "month", "year"), default="day")


class StatsSummarySerializer(serializers.Serializer):
    total_visits = serializers.IntegerField(read_only=True)
    unique_visitors = serializers.IntegerField(read_only=True)


class StatsBreakdownSerializer(serializers.Serializer):
    key = serializers.CharField(read_only=True)
    count = serializers.IntegerField(read_only=True)
