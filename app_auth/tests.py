from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase

from .permissions import RoleBasedPermission
from .roles import COMPANY_STAFF_GROUP, GUEST_GROUP


User = get_user_model()


class AuthApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="nhanvien",
            password="MatKhauCu!123",
            email="nhanvien@example.com",
        )

    def login(self):
        response = self.client.post(
            "/api/auth/login/",
            {"username": "nhanvien", "password": "MatKhauCu!123"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        return response.data

    def test_login_refresh_and_me(self):
        tokens = self.login()
        refresh_response = self.client.post("/api/auth/refresh/", {"refresh": tokens["refresh"]}, format="json")
        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", refresh_response.data)

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")
        me_response = self.client.get("/api/auth/me/")
        self.assertEqual(me_response.status_code, status.HTTP_200_OK)
        self.assertEqual(me_response.data["username"], self.user.username)

    def test_logout_blacklists_refresh_token(self):
        tokens = self.login()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")
        logout_response = self.client.post("/api/auth/logout/", {"refresh": tokens["refresh"]}, format="json")
        self.assertEqual(logout_response.status_code, status.HTTP_205_RESET_CONTENT)

        refresh_response = self.client.post("/api/auth/refresh/", {"refresh": tokens["refresh"]}, format="json")
        self.assertEqual(refresh_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_change_password(self):
        tokens = self.login()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")
        response = self.client.post(
            "/api/auth/change-password/",
            {
                "old_password": "MatKhauCu!123",
                "new_password": "MatKhauMoi!123",
                "confirm_password": "MatKhauMoi!123",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("MatKhauMoi!123"))

    def test_roles_have_expected_api_permissions(self):
        permission = RoleBasedPermission()
        factory = APIRequestFactory()

        employee = User.objects.create_user(username="employee", password="Password!123")
        employee.groups.add(Group.objects.get(name=COMPANY_STAFF_GROUP))
        employee.is_staff = False
        employee.save(update_fields=["is_staff"])

        guest = User.objects.create_user(username="guest", password="Password!123")
        guest.groups.add(Group.objects.get(name=GUEST_GROUP))

        employee_post = factory.post("/api/projects/", {}, format="json")
        employee_post.user = employee
        self.assertTrue(permission.has_permission(employee_post, None))
        self.assertFalse(employee.is_staff)

        guest_get = factory.get("/api/projects/")
        guest_get.user = guest
        self.assertTrue(permission.has_permission(guest_get, None))

        guest_post = factory.post("/api/projects/", {}, format="json")
        guest_post.user = guest
        self.assertFalse(permission.has_permission(guest_post, None))
