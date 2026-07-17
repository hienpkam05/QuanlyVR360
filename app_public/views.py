import hashlib
from copy import deepcopy
from pathlib import Path
from urllib.parse import urlsplit

from django.conf import settings
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from app_analytics.models import TourVisit
from app_media.models import SceneAsset
from app_publishing.models import PublishConfig


def normalize_domain(value):
    if not value:
        return ""
    parsed = urlsplit(value if "://" in value else f"//{value}")
    if not parsed.hostname:
        return ""
    domain = parsed.hostname.encode("idna").decode("ascii").lower()
    if parsed.port:
        domain = f"{domain}:{parsed.port}"
    return domain


def request_domain(request):
    origin = request.headers.get("Origin")
    referer = request.headers.get("Referer")
    return normalize_domain(origin or referer)


def request_origin(request):
    origin = request.headers.get("Origin")
    if origin:
        return origin.rstrip("/")
    referer = request.headers.get("Referer")
    if not referer:
        return ""
    parsed = urlsplit(referer)
    if not parsed.scheme or not parsed.netloc:
        return ""
    return f"{parsed.scheme}://{parsed.netloc}"


def client_ip(request):
    forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "")


def device_type(user_agent):
    user_agent = user_agent.lower()
    if any(marker in user_agent for marker in ("ipad", "tablet")):
        return TourVisit.DeviceType.TABLET
    if any(marker in user_agent for marker in ("mobile", "android", "iphone")):
        return TourVisit.DeviceType.MOBILE
    if user_agent:
        return TourVisit.DeviceType.DESKTOP
    return TourVisit.DeviceType.OTHER


def normalized_device_type(value, user_agent):
    if value in TourVisit.DeviceType.values:
        return value
    return device_type(user_agent)


def browser_name(user_agent):
    lower = user_agent.lower()
    if "edg/" in lower:
        return "Edge"
    if "chrome/" in lower:
        return "Chrome"
    if "firefox/" in lower:
        return "Firefox"
    if "safari/" in lower:
        return "Safari"
    return ""


def os_name(user_agent):
    lower = user_agent.lower()
    if "windows" in lower:
        return "Windows"
    if "android" in lower:
        return "Android"
    if "iphone" in lower or "ipad" in lower:
        return "iOS"
    if "mac os" in lower or "macintosh" in lower:
        return "macOS"
    if "linux" in lower:
        return "Linux"
    return ""


class PublicAccessMixin:
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_publish_config(self, public_token):
        return get_object_or_404(
            PublishConfig.objects.select_related(
                "location",
                "location__project",
                "published_version",
            ).prefetch_related("whitelist_domains"),
            public_token=public_token,
            is_active=True,
            published_version__isnull=False,
        )

    def allowed_domains(self, config):
        return {
            domain.domain
            for domain in config.whitelist_domains.all()
            if domain.is_active and not domain.is_deleted
        }

    def check_public_access(self, request, config):
        domains = self.allowed_domains(config)
        domain = request_domain(request)
        return bool(domain and domain in domains)

    def add_public_headers(self, response, request, config):
        domains = sorted(self.allowed_domains(config))
        origin = request_origin(request)
        origin_domain = normalize_domain(origin)

        frame_ancestors = " ".join(domains) if domains else "'none'"
        response["Content-Security-Policy"] = f"frame-ancestors {frame_ancestors}"

        if origin and origin_domain in domains:
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "false"
            response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type"
            response["Vary"] = "Origin"
        return response

    def forbidden_response(self):
        return Response(
            {"detail": "Domain is not allowed to access this published tour."},
            status=status.HTTP_403_FORBIDDEN,
        )


class PublicTourView(PublicAccessMixin, APIView):
    def get(self, request, public_token):
        config = self.get_publish_config(public_token)
        if not self.check_public_access(request, config):
            return self.forbidden_response()

        version = config.published_version
        resolved_data = deepcopy(version.data)
        assets = {
            asset.scene_key: asset
            for asset in SceneAsset.objects.filter(
                tour_version=version,
                processing_status=SceneAsset.ProcessingStatus.DONE,
            )
        }
        for scene in resolved_data.get("scenes", []):
            scene_key = str(scene.get("id"))
            asset = assets.get(scene_key)
            if asset:
                scene["tile_url"] = request.build_absolute_uri(
                    f"/api/public/tour/{public_token}/tiles/{scene_key}/"
                    f"{{z}}/{{x}}/{{y}}.jpg"
                )
                scene["max_zoom_level"] = asset.max_zoom_level
                scene["tile_size"] = asset.tile_size

        response = Response(
            {
                "location": {
                    "id": config.location_id,
                    "name": config.location.name,
                    "slug": config.location.slug,
                    "project_id": config.location.project_id,
                },
                "version": {
                    "id": version.id,
                    "version_number": version.version_number,
                    "label": version.label,
                    "published_at": config.published_at,
                },
                "data": resolved_data,
            }
        )
        return self.add_public_headers(response, request, config)

    def options(self, request, public_token):
        config = self.get_publish_config(public_token)
        response = Response(status=status.HTTP_204_NO_CONTENT)
        return self.add_public_headers(response, request, config)


class PublicTileView(PublicAccessMixin, APIView):
    def get(self, request, public_token, scene_key, z, x, y):
        config = self.get_publish_config(public_token)
        if not self.check_public_access(request, config):
            return self.forbidden_response()

        asset = get_object_or_404(
            SceneAsset.objects.select_related("tour_version"),
            tour_version=config.published_version,
            scene_key=scene_key,
            processing_status=SceneAsset.ProcessingStatus.DONE,
        )
        tile_file = Path(settings.MEDIA_ROOT) / asset.tile_base_path / str(z) / str(x) / f"{y}.jpg"
        if not tile_file.is_file():
            raise Http404("Tile not found.")
        response = FileResponse(tile_file.open("rb"), content_type="image/jpeg")
        return self.add_public_headers(response, request, config)

    def options(self, request, public_token, scene_key, z, x, y):
        config = self.get_publish_config(public_token)
        response = Response(status=status.HTTP_204_NO_CONTENT)
        return self.add_public_headers(response, request, config)


class PublicTrackVisitView(PublicAccessMixin, APIView):
    def post(self, request, public_token):
        config = self.get_publish_config(public_token)
        if not self.check_public_access(request, config):
            return self.forbidden_response()

        user_agent = request.headers.get("User-Agent", "")
        visitor_seed = "|".join(
            [
                config.public_token,
                client_ip(request),
                user_agent,
                request.headers.get("Accept-Language", ""),
            ]
        )
        visit = TourVisit.objects.create(
            publish_config=config,
            visitor_hash=hashlib.sha256(visitor_seed.encode("utf-8")).hexdigest(),
            country_code=str(request.data.get("country_code", ""))[:2].upper(),
            city=str(request.data.get("city", ""))[:100],
            device_type=normalized_device_type(request.data.get("device_type"), user_agent),
            browser=str(request.data.get("browser") or browser_name(user_agent))[:50],
            os=str(request.data.get("os") or os_name(user_agent))[:50],
            referrer_domain=request_domain(request),
        )
        response = Response({"id": visit.pk, "tracked": True}, status=status.HTTP_201_CREATED)
        return self.add_public_headers(response, request, config)

    def options(self, request, public_token):
        config = self.get_publish_config(public_token)
        response = Response(status=status.HTTP_204_NO_CONTENT)
        return self.add_public_headers(response, request, config)
