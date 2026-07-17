from rest_framework.permissions import SAFE_METHODS, BasePermission

from .roles import ROLE_ADMIN, ROLE_COMPANY_STAFF, ROLE_GUEST, get_user_role


class RoleBasedPermission(BasePermission):
    """Quyền mặc định cho các API nội bộ.

    - Admin (Django superuser): toàn quyền.
    - Nhân viên công ty: toàn quyền API, nhưng không tự có quyền Django Admin.
    - Khách: chỉ các phương thức đọc GET, HEAD và OPTIONS.
    """

    message = "Tài khoản của bạn không có quyền thực hiện thao tác này."

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        role = get_user_role(user)
        if role in (ROLE_ADMIN, ROLE_COMPANY_STAFF):
            return True
        if role == ROLE_GUEST and request.method in SAFE_METHODS:
            return True
        return False
