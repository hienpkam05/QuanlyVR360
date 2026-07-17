from datetime import timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from app_analytics.models import TourVisit
from app_locations.models import Location
from app_projects.models import Project
from app_publishing.models import PublishConfig
from app_tours.models import TourVersion

from .models import ActivityLog


class DashboardAPITests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secret123",
        )
        self.client.force_authenticate(self.user)
        self.project = Project.objects.create(name="VR360")
        self.location_1 = Location.objects.create(project=self.project, name="Lobby")
        self.location_2 = Location.objects.create(project=self.project, name="Garden")
        self.version_1 = self.create_version(self.location_1)
        self.version_2 = self.create_version(self.location_2)
        self.config_1 = PublishConfig.objects.create(
            location=self.location_1,
            published_version=self.version_1,
            is_active=True,
            published_by=self.user,
        )
        self.config_2 = PublishConfig.objects.create(
            location=self.location_2,
            published_version=self.version_2,
            is_active=True,
            published_by=self.user,
        )
        self.today = timezone.localdate()
        self.create_visit(self.config_1, "visitor-1", self.today)
        self.create_visit(self.config_1, "visitor-2", self.today)
        self.create_visit(self.config_2, "visitor-3", self.today - timedelta(days=3))
        ActivityLog.objects.create(
            actor=self.user,
            action="location_published",
            entity_type="publish_config",
            entity_id=str(self.location_1.pk),
            description="Published lobby.",
        )

    def create_version(self, location):
        return TourVersion.objects.create(
            location=location,
            label="published",
            data={"scenes": [{"id": "scene-1"}]},
            status=TourVersion.Status.PUBLISHED,
            created_by=self.user,
        )

    def create_visit(self, config, visitor_hash, date):
        visit = TourVisit.objects.create(publish_config=config, visitor_hash=visitor_hash)
        visit.visited_at = timezone.make_aware(timezone.datetime.combine(date, timezone.datetime.min.time()))
        visit.save(update_fields=["visited_at"])
        return visit

    def test_overview(self):
        response = self.client.get("/api/dashboard/overview/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["projects_count"], 1)
        self.assertEqual(response.data["locations_count"], 2)
        self.assertEqual(response.data["published_locations"], 2)
        self.assertEqual(response.data["total_visits"], 3)
        self.assertEqual(response.data["unique_visitors"], 3)

    def test_top_locations(self):
        response = self.client.get("/api/dashboard/top-locations/", {"limit": 1})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["limit"], 1)
        self.assertEqual(response.data["results"][0]["location_id"], self.location_1.pk)
        self.assertEqual(response.data["results"][0]["total_visits"], 2)

    def test_recent_activity(self):
        response = self.client.get("/api/dashboard/recent-activity/", {"limit": 5})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["results"][0]["action"], "location_published")
        self.assertEqual(response.data["results"][0]["actor_name"], "admin")
