from django.contrib.auth.models import Group
from django.db.models.signals import post_migrate
from django.dispatch import receiver

from .roles import COMPANY_STAFF_GROUP, GUEST_GROUP


@receiver(post_migrate)
def create_default_role_groups(sender, app_config, **kwargs):
    """Tạo các group cần thiết sau khi migrate, nếu chúng chưa tồn tại."""
    if app_config.name != "app_auth":
        return
    Group.objects.get_or_create(name=COMPANY_STAFF_GROUP)
    Group.objects.get_or_create(name=GUEST_GROUP)
