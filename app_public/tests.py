from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from app_analytics.models import TourVisit
from app_locations.models import Location
from app_projects.models import Project
from app_publishing.models import PublishConfig, WhitelistDomain
from app_tours.models import TourVersion


class PublicViewerAPITests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secret123",
        )
        self.project = Project.objects.create(name="VR360")
        self.location = Location.objects.create(project=self.project, name="Lobby")
        self.version = TourVersion.objects.create(
            location=self.location,
            label="published",
            data={"scenes": [{"id": "scene-1", "name": "Scene 1"}]},
            status=TourVersion.Status.PUBLISHED,
            created_by=self.user,
        )
        self.config = PublishConfig.objects.create(
            location=self.location,
            published_version=self.version,
            is_active=True,
            published_by=self.user,
        )
        WhitelistDomain.objects.create(
            publish_config=self.config,
            domain="viewer.example.com",
            label="Viewer",
        )

    def test_public_tour_allows_whitelisted_domain(self):
        response = self.client.get(
            f"/api/public/tour/{self.config.public_token}/",
            HTTP_ORIGIN="https://viewer.example.com",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["location"]["id"], self.location.pk)
        self.assertEqual(response.data["version"]["id"], self.version.pk)
        self.assertEqual(response["Access-Control-Allow-Origin"], "https://viewer.example.com")

    def test_public_tour_blocks_unlisted_domain(self):
        response = self.client.get(
            f"/api/public/tour/{self.config.public_token}/",
            HTTP_ORIGIN="https://evil.example.com",
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_track_visit_creates_tour_visit(self):
        response = self.client.post(
            f"/api/public/tour/{self.config.public_token}/track-visit/",
            {"city": "Ha Noi"},
            format="json",
            HTTP_ORIGIN="https://viewer.example.com",
            HTTP_USER_AGENT="Mozilla/5.0 Chrome/120.0",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        visit = TourVisit.objects.get(publish_config=self.config)
        self.assertEqual(visit.city, "Ha Noi")
        self.assertEqual(visit.referrer_domain, "viewer.example.com")
