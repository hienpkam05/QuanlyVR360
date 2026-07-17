from django.apps import AppConfig


class AuthConfig(AppConfig):
    name = 'app_auth'

    def ready(self):
        from . import signals  # noqa: F401
