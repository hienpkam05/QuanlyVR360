from datetime import timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from app_locations.models import Location
from app_projects.models import Project
from app_publishing.models import PublishConfig
from app_tours.models import TourVersion

from .models import TourVisit


class LocationStatsAPITests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secret123",
        )
        self.client.force_authenticate(self.user)
        self.project = Project.objects.create(name="VR360")
        self.location = Location.objects.create(project=self.project, name="Lobby")
        self.version = TourVersion.objects.create(
            location=self.location,
            label="published",
            data={"scenes": [{"id": "scene-1"}]},
            status=TourVersion.Status.PUBLISHED,
            created_by=self.user,
        )
        self.config = PublishConfig.objects.create(
            location=self.location,
            published_version=self.version,
            is_active=True,
            published_by=self.user,
        )
        self.today = timezone.localdate()
        self.yesterday = self.today - timedelta(days=1)
        self.create_visit("visitor-1", self.yesterday, country_code="VN", device_type="mobile", referrer_domain="a.com")
        self.create_visit("visitor-1", self.today, country_code="VN", device_type="mobile", referrer_domain="a.com")
        self.create_visit("visitor-2", self.today, country_code="US", device_type="desktop", referrer_domain="b.com")

    def create_visit(self, visitor_hash, date, **kwargs):
        visit = TourVisit.objects.create(
            publish_config=self.config,
            visitor_hash=visitor_hash,
            **kwargs,
        )
        visit.visited_at = timezone.make_aware(timezone.datetime.combine(date, timezone.datetime.min.time()))
        visit.save(update_fields=["visited_at"])
        return visit

    def test_summary_counts_total_and_unique_visitors(self):
        response = self.client.get(
            f"/api/locations/{self.location.pk}/stats/summary/",
            {"from": self.yesterday.isoformat(), "to": self.today.isoformat()},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["total_visits"], 3)
        self.assertEqual(response.data["unique_visitors"], 2)

    def test_timeseries_fills_day_buckets(self):
        response = self.client.get(
            f"/api/locations/{self.location.pk}/stats/timeseries/",
            {"from": self.yesterday.isoformat(), "to": self.today.isoformat(), "granularity": "day"},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["granularity"], "day")
        self.assertEqual([item["total_visits"] for item in response.data["results"]], [1, 2])

    def test_breakdowns(self):
        country_response = self.client.get(f"/api/locations/{self.location.pk}/stats/by-country/")
        device_response = self.client.get(f"/api/locations/{self.location.pk}/stats/by-device/")
        referrer_response = self.client.get(f"/api/locations/{self.location.pk}/stats/by-referrer/")

        self.assertEqual(country_response.status_code, status.HTTP_200_OK)
        self.assertEqual(device_response.status_code, status.HTTP_200_OK)
        self.assertEqual(referrer_response.status_code, status.HTTP_200_OK)
        self.assertEqual(country_response.data["results"][0]["key"], "VN")
        self.assertEqual(country_response.data["results"][0]["count"], 2)
        self.assertEqual(device_response.data["results"][0]["key"], "mobile")
        self.assertEqual(referrer_response.data["results"][0]["key"], "a.com")
