"""Tên role dùng chung trong hệ thống."""

COMPANY_STAFF_GROUP = "company_staff"
GUEST_GROUP = "guest"

ROLE_ADMIN = "admin"
ROLE_COMPANY_STAFF = "company_staff"
ROLE_GUEST = "guest"


def get_user_role(user):
    """Trả về role có quyền cao nhất của user, hoặc None nếu chưa được phân role."""
    if not user or not user.is_authenticated:
        return None
    if user.is_superuser:
        return ROLE_ADMIN
    if user.groups.filter(name=COMPANY_STAFF_GROUP).exists():
        return ROLE_COMPANY_STAFF
    if user.groups.filter(name=GUEST_GROUP).exists():
        return ROLE_GUEST
    return None
