from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from app_auth.roles import COMPANY_STAFF_GROUP, GUEST_GROUP
from app_locations.models import Location
from app_projects.models import Project
from app_publishing.models import PublishConfig
from app_tours.models import TourVersion


class TourModelTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(name="Du lịch Hà Nội")
        self.location = Location.objects.create(project=self.project, name="Đình Tốt Động")

    def test_project_slug_and_version_number_are_generated(self):
        duplicate = Project.objects.create(name="Du lịch Hà Nội")
        first = TourVersion.objects.create(location=self.location, data={"scenes": []})
        second = TourVersion.objects.create(location=self.location, data={"scenes": []})

        self.assertEqual(duplicate.slug, "du-lich-ha-noi-2")
        self.assertEqual((first.version_number, second.version_number), (1, 2))

    def test_publish_rejects_version_from_another_location(self):
        other = Location.objects.create(project=self.project, name="Địa điểm khác")
        version = TourVersion.objects.create(location=other, data={"scenes": []})

        with self.assertRaises(ValidationError):
            PublishConfig.objects.create(
                location=self.location, published_version=version, is_active=True
            )

    def test_delete_is_soft_and_cascades_to_children(self):
        version = TourVersion.objects.create(location=self.location, data={"scenes": []})

        self.project.delete()

        self.assertFalse(Project.objects.filter(pk=self.project.pk).exists())
        self.assertTrue(Project.all_objects.filter(pk=self.project.pk, is_deleted=True).exists())
        self.assertFalse(Location.objects.filter(pk=self.location.pk).exists())
        self.assertTrue(Location.all_objects.filter(pk=self.location.pk, is_deleted=True).exists())
        self.assertFalse(TourVersion.objects.filter(pk=version.pk).exists())
        self.assertTrue(TourVersion.all_objects.filter(pk=version.pk, is_deleted=True).exists())

    def test_queryset_delete_is_also_soft(self):
        project_id = self.project.pk

        Project.objects.filter(pk=project_id).delete()

        self.assertTrue(Project.all_objects.filter(pk=project_id, is_deleted=True).exists())


User = get_user_model()


class TourVersionApiTests(APITestCase):
    def setUp(self):
        self.project = Project.objects.create(name="Project A")
        self.location = Location.objects.create(project=self.project, name="Main hall")
        self.employee = User.objects.create_user(username="employee", password="Password!123")
        self.employee.groups.add(Group.objects.get(name=COMPANY_STAFF_GROUP))
        self.guest = User.objects.create_user(username="guest", password="Password!123")
        self.guest.groups.add(Group.objects.get(name=GUEST_GROUP))

    def create_version(self, label="First version", scenes=None):
        self.client.force_authenticate(self.employee)
        return self.client.post(
            f"/api/locations/{self.location.id}/versions/",
            {"label": label, "data": {"scenes": scenes or []}},
            format="json",
        )

    def test_employee_can_create_update_export_import_compare_and_delete_draft(self):
        first_response = self.create_version(scenes=[{"id": "scene-1", "title": "Old"}])
        self.assertEqual(first_response.status_code, status.HTTP_201_CREATED)
        first_id = first_response.data["id"]
        self.assertEqual(first_response.data["version_number"], 1)

        update_response = self.client.patch(
            f"/api/locations/{self.location.id}/versions/{first_id}/",
            {"label": "Updated version"},
            format="json",
        )
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)

        export_response = self.client.get(f"/api/locations/{self.location.id}/versions/{first_id}/export/")
        self.assertEqual(export_response.status_code, status.HTTP_200_OK)
        self.assertEqual(export_response.data["data"]["scenes"][0]["id"], "scene-1")

        import_response = self.client.post(
            f"/api/locations/{self.location.id}/versions/import/",
            {"label": "Imported", "data": {"scenes": [{"id": "scene-2"}]}},
            format="json",
        )
        self.assertEqual(import_response.status_code, status.HTTP_201_CREATED)
        second_id = import_response.data["id"]
        self.assertEqual(import_response.data["version_number"], 2)

        compare_response = self.client.get(
            f"/api/locations/{self.location.id}/versions/compare/?from={first_id}&to={second_id}"
        )
        self.assertEqual(compare_response.status_code, status.HTTP_200_OK)
        self.assertEqual(compare_response.data["changes"]["scenes_added"], ["scene-2"])
        self.assertEqual(compare_response.data["changes"]["scenes_removed"], ["scene-1"])

        delete_response = self.client.delete(f"/api/locations/{self.location.id}/versions/{first_id}/")
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertTrue(TourVersion.all_objects.get(pk=first_id).is_deleted)

    def test_published_version_cannot_be_updated_or_deleted_and_guest_is_read_only(self):
        version = TourVersion.objects.create(
            location=self.location,
            data={"scenes": []},
            status=TourVersion.Status.PUBLISHED,
        )
        self.client.force_authenticate(self.employee)
        patch_response = self.client.patch(
            f"/api/locations/{self.location.id}/versions/{version.id}/", {"label": "No"}, format="json"
        )
        self.assertEqual(patch_response.status_code, status.HTTP_400_BAD_REQUEST)
        delete_response = self.client.delete(f"/api/locations/{self.location.id}/versions/{version.id}/")
        self.assertEqual(delete_response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.force_authenticate(self.guest)
        list_response = self.client.get(f"/api/locations/{self.location.id}/versions/")
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        create_response = self.client.post(
            f"/api/locations/{self.location.id}/versions/", {"data": {"scenes": []}}, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_403_FORBIDDEN)
