from django.urls import path

from .views import LocationViewSet, ProjectLocationReorderView, ProjectLocationViewSet


project_locations = ProjectLocationViewSet.as_view({"get": "list", "post": "create"})
location_detail = LocationViewSet.as_view({"get": "retrieve", "patch": "partial_update", "delete": "destroy"})
location_upload_thumbnail = LocationViewSet.as_view({"post": "upload_thumbnail"})

urlpatterns = [
    path("projects/<int:project_id>/locations/", project_locations, name="project-location-list"),
    path("projects/<int:project_id>/locations/reorder/", ProjectLocationReorderView.as_view(), name="project-location-reorder"),
    path("locations/<int:pk>/", location_detail, name="location-detail"),
    path("locations/<int:pk>/upload-thumbnail/", location_upload_thumbnail, name="location-upload-thumbnail"),
]
