from django.urls import path

from .views import (
    PublishConfigView,
    PublishRegenerateTokenView,
    PublishedTourListView,
    WhitelistDomainDetailView,
    WhitelistDomainListCreateView,
)

urlpatterns = [
    path("published-tours/", PublishedTourListView.as_view(), name="published-tour-list"),
    path("locations/<int:location_id>/publish/", PublishConfigView.as_view(), name="location-publish"),
    path(
        "locations/<int:location_id>/publish/regenerate-token/",
        PublishRegenerateTokenView.as_view(),
        name="location-publish-regenerate-token",
    ),
    path(
        "locations/<int:location_id>/publish/domains/",
        WhitelistDomainListCreateView.as_view(),
        name="location-publish-domain-list",
    ),
    path(
        "locations/<int:location_id>/publish/domains/<int:domain_id>/",
        WhitelistDomainDetailView.as_view(),
        name="location-publish-domain-detail",
    ),
]
