from datetime import timedelta

from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from app_analytics.models import TourVisit
from app_dashboard.models import ActivityLog
from app_locations.models import Location
from app_publishing.models import PublishConfig
from app_tours.models import TourVersion

from .filters import ProjectFilter
from .models import Project
from .serializers import ProjectSerializer, ProjectThumbnailSerializer


class ProjectViewSet(ModelViewSet):
    """Quản lý dự án VR360; DELETE sử dụng xóa mềm."""

    queryset = Project.objects.select_related("created_by").prefetch_related("locations")
    serializer_class = ProjectSerializer
    filterset_class = ProjectFilter
    search_fields = ("name", "description", "slug")
    ordering_fields = ("name", "created_at", "updated_at")

    def _log_activity(self, action, project, description):
        ActivityLog.objects.create(
            actor=self.request.user,
            action=action,
            entity_type="project",
            entity_id=str(project.pk),
            description=description,
            metadata={"project_id": project.pk, "project_name": project.name},
        )

    def perform_create(self, serializer):
        project = serializer.save(created_by=self.request.user)
        self._log_activity("project_created", project, f"Tạo dự án '{project.name}'.")

    def perform_update(self, serializer):
        project = serializer.save()
        self._log_activity("project_updated", project, f"Cập nhật dự án '{project.name}'.")

    def perform_destroy(self, instance):
        project_id, project_name = instance.pk, instance.name
        instance.delete()
        ActivityLog.objects.create(
            actor=self.request.user,
            action="project_deleted",
            entity_type="project",
            entity_id=str(project_id),
            description=f"Xóa mềm dự án '{project_name}'.",
            metadata={"project_id": project_id, "project_name": project_name},
        )

    @action(
        detail=True,methods=["post"],
        url_path="upload-thumbnail",
        parser_classes=[MultiPartParser, FormParser],
    )
    def upload_thumbnail(self, request, pk=None):
        project = self.get_object()
        serializer = ProjectThumbnailSerializer(project, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self._log_activity("project_thumbnail_uploaded", project, f"Cập nhật thumbnail dự án '{project.name}'.")
        return Response(ProjectSerializer(project, context=self.get_serializer_context()).data)

    @action(detail=True, methods=["get"])
    def dashboard(self, request, pk=None):
        project = self.get_object()
        visits = TourVisit.objects.filter(publish_config__location__project=project)
        since = timezone.localdate() - timedelta(days=29)
        recent_visits = visits.filter(visited_at__date__gte=since)

        payload = {
            "project": ProjectSerializer(project, context=self.get_serializer_context()).data,
            "statistics": {
                "locations_total": Location.objects.filter(project=project).count(),
                "locations_active": Location.objects.filter(project=project, is_active=True).count(),
                "tour_versions_total": TourVersion.objects.filter(location__project=project).count(),
                "published_locations": PublishConfig.objects.filter(
                    location__project=project, is_active=True
                ).count(),
                "visits_total": visits.count(),
                "visits_last_30_days": recent_visits.count(),
                "unique_visitors_last_30_days": recent_visits.values("visitor_hash").distinct().count(),
            },
            "recent_locations": [
                {
                    "id": location.id,
                    "name": location.name,
                    "slug": location.slug,
                    "thumbnail": request.build_absolute_uri(location.thumbnail.url)
                    if location.thumbnail else None,
                    "is_active": location.is_active,
                    "updated_at": location.updated_at,
                }
                for location in Location.objects.filter(project=project).order_by("-updated_at")[:5]
            ],
        }
        return Response(payload)
