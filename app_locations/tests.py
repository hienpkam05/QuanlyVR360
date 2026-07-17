from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.test import APITestCase

from app_auth.roles import COMPANY_STAFF_GROUP, GUEST_GROUP
from app_projects.models import Project

from .models import Location


User = get_user_model()


class LocationApiTests(APITestCase):
    def setUp(self):
        self.project = Project.objects.create(name="Project A")
        self.employee = User.objects.create_user(username="employee", password="Password!123")
        self.employee.groups.add(Group.objects.get(name=COMPANY_STAFF_GROUP))
        self.guest = User.objects.create_user(username="guest", password="Password!123")
        self.guest.groups.add(Group.objects.get(name=GUEST_GROUP))

    def test_employee_can_manage_locations_and_reorder(self):
        self.client.force_authenticate(self.employee)
        create_response = self.client.post(
            f"/api/projects/{self.project.id}/locations/",
            {"name": "Sảnh chính", "latitude": "10.762622", "longitude": "106.660172", "order": 0},
            format="json",
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        first_id = create_response.data["id"]
        self.assertEqual(create_response.data["project"], self.project.id)

        second = Location.objects.create(project=self.project, name="Khu vườn", order=1)
        update_response = self.client.patch(
            f"/api/locations/{first_id}/", {"description": "Khu đón khách"}, format="json"
        )
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)

        reorder_response = self.client.patch(
            f"/api/projects/{self.project.id}/locations/reorder/",
            {"locations": [{"id": first_id, "order": 1}, {"id": second.id, "order": 0}]},
            format="json",
        )
        self.assertEqual(reorder_response.status_code, status.HTTP_200_OK)
        self.assertEqual(reorder_response.data[0]["id"], second.id)

        delete_response = self.client.delete(f"/api/locations/{first_id}/")
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Location.objects.filter(pk=first_id).exists())
        self.assertTrue(Location.all_objects.get(pk=first_id).is_deleted)

    def test_guest_can_list_locations_but_cannot_create(self):
        Location.objects.create(project=self.project, name="Chỉ xem")
        self.client.force_authenticate(self.guest)

        list_response = self.client.get(f"/api/projects/{self.project.id}/locations/")
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)

        create_response = self.client.post(
            f"/api/projects/{self.project.id}/locations/", {"name": "Không được tạo"}, format="json"
        )
        self.assertEqual(create_response.status_code, status.HTTP_403_FORBIDDEN)
