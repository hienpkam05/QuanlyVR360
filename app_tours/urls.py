from django.urls import path

from .views import (
    HotspotAudioUploadView,
    HotspotInfoImageUploadView,
    LocationTourVersionViewSet,
    TourVersionCompareView,
    TourVersionImportView,
    TourVersionViewSet,
)


location_versions = LocationTourVersionViewSet.as_view({"get": "list", "post": "create"})
version_detail = TourVersionViewSet.as_view({"get": "retrieve", "patch": "partial_update", "delete": "destroy"})
version_export = TourVersionViewSet.as_view({"get": "export"})
version_preview = TourVersionViewSet.as_view({"get": "preview"})

urlpatterns = [
    path("locations/<int:location_id>/versions/", location_versions, name="tour-version-list"),
    path("locations/<int:location_id>/versions/import/", TourVersionImportView.as_view(), name="tour-version-import"),
    path("locations/<int:location_id>/versions/compare/", TourVersionCompareView.as_view(), name="tour-version-compare"),
    path("locations/<int:location_id>/versions/<int:pk>/", version_detail, name="tour-version-detail"),
    path("locations/<int:location_id>/versions/<int:pk>/hotspot-audio/", HotspotAudioUploadView.as_view(), name="hotspot-audio-upload"),
    path("locations/<int:location_id>/versions/<int:pk>/hotspot-info-image/", HotspotInfoImageUploadView.as_view(), name="hotspot-info-image-upload"),
    path("locations/<int:location_id>/versions/<int:pk>/export/", version_export, name="tour-version-export"),
    path("locations/<int:location_id>/versions/<int:pk>/preview/", version_preview, name="tour-version-preview"),
]
