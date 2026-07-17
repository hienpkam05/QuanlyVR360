from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.test import APITestCase

from app_auth.roles import COMPANY_STAFF_GROUP, GUEST_GROUP
from .models import Project


User = get_user_model()


class ProjectApiTests(APITestCase):
    def setUp(self):
        self.employee = User.objects.create_user(username="employee", password="Password!123")
        self.employee.groups.add(Group.objects.get(name=COMPANY_STAFF_GROUP))
        self.guest = User.objects.create_user(username="guest", password="Password!123")
        self.guest.groups.add(Group.objects.get(name=GUEST_GROUP))

    def test_employee_can_create_update_view_dashboard_and_soft_delete_project(self):
        self.client.force_authenticate(self.employee)
        create_response = self.client.post(
            "/api/projects/",
            {"name": "Khu du lịch Mẫu", "description": "Dự án VR360"},
            format="json",
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        project_id = create_response.data["id"]
        self.assertEqual(create_response.data["created_by"], self.employee.id)

        update_response = self.client.patch(
            f"/api/projects/{project_id}/", {"name": "Tên mới"}, format="json"
        )
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data["name"], "Tên mới")

        dashboard_response = self.client.get(f"/api/projects/{project_id}/dashboard/")
        self.assertEqual(dashboard_response.status_code, status.HTTP_200_OK)
        self.assertEqual(dashboard_response.data["statistics"]["locations_total"], 0)

        delete_response = self.client.delete(f"/api/projects/{project_id}/")
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Project.objects.filter(pk=project_id).exists())
        self.assertTrue(Project.all_objects.get(pk=project_id).is_deleted)

    def test_guest_can_read_but_cannot_create(self):
        Project.objects.create(name="Dự án xem thử")
        self.client.force_authenticate(self.guest)

        list_response = self.client.get("/api/projects/")
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)

        create_response = self.client.post("/api/projects/", {"name": "Không được tạo"}, format="json")
        self.assertEqual(create_response.status_code, status.HTTP_403_FORBIDDEN)
