from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from app_locations.models import Location
from app_projects.models import Project
from app_tours.models import TourVersion

from .models import PublishConfig, WhitelistDomain


class PublishingAPITests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secret123",
        )
        self.client.force_authenticate(self.user)
        self.project = Project.objects.create(name="VR360")
        self.location = Location.objects.create(project=self.project, name="Lobby")
        self.version_1 = TourVersion.objects.create(
            location=self.location,
            label="v1",
            data={"scenes": [{"id": "scene-1"}]},
            created_by=self.user,
        )
        self.version_2 = TourVersion.objects.create(
            location=self.location,
            label="v2",
            data={"scenes": [{"id": "scene-1"}]},
            created_by=self.user,
        )

    def test_get_publish_config_when_empty(self):
        response = self.client.get(f"/api/locations/{self.location.pk}/publish/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["is_published"], False)
        self.assertIsNone(response.data["publish_config"])

    def test_publish_location(self):
        response = self.client.post(
            f"/api/locations/{self.location.pk}/publish/",
            {"published_version": self.version_1.pk},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        config = PublishConfig.objects.get(location=self.location)
        self.assertTrue(config.is_active)
        self.assertEqual(config.published_version_id, self.version_1.pk)
        self.version_1.refresh_from_db()
        self.assertEqual(self.version_1.status, TourVersion.Status.PUBLISHED)

    def test_patch_publish_rolls_back_to_an_archived_version(self):
        PublishConfig.objects.create(
            location=self.location,
            published_version=self.version_2,
            is_active=True,
            published_by=self.user,
        )
        self.version_1.status = TourVersion.Status.ARCHIVED
        self.version_1.save(update_fields=["status", "updated_at"])

        response = self.client.patch(
            f"/api/locations/{self.location.pk}/publish/",
            {"version_id": self.version_1.pk},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.version_1.refresh_from_db()
        self.version_2.refresh_from_db()
        self.assertEqual(self.version_1.status, TourVersion.Status.PUBLISHED)
        self.assertEqual(self.version_2.status, TourVersion.Status.ARCHIVED)

    def test_manage_whitelist_domain(self):
        config = PublishConfig.objects.create(
            location=self.location,
            published_version=self.version_1,
            is_active=True,
            published_by=self.user,
        )

        create_response = self.client.post(
            f"/api/locations/{self.location.pk}/publish/domains/",
            {"domain": "https://Example.com", "label": "Main site"},
            format="json",
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        domain = WhitelistDomain.objects.get(publish_config=config)
        self.assertEqual(domain.domain, "example.com")

        patch_response = self.client.patch(
            f"/api/locations/{self.location.pk}/publish/domains/{domain.pk}/",
            {"is_active": False},
            format="json",
        )
        self.assertEqual(patch_response.status_code, status.HTTP_200_OK)
        domain.refresh_from_db()
        self.assertFalse(domain.is_active)

        delete_response = self.client.delete(
            f"/api/locations/{self.location.pk}/publish/domains/{domain.pk}/"
        )
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(WhitelistDomain.objects.filter(pk=domain.pk).exists())
