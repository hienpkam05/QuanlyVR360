from django.urls import path

from .views import PublicSceneImageView, PublicTourView, PublicTrackVisitView

urlpatterns = [
    path("public/tour/<str:public_token>/", PublicTourView.as_view(), name="public-tour"),
    path(
        "public/tour/<str:public_token>/images/<str:scene_key>/<str:variant>/",
        PublicSceneImageView.as_view(),
        name="public-scene-image",
    ),
    path(
        "public/tour/<str:public_token>/track-visit/",
        PublicTrackVisitView.as_view(),
        name="public-tour-track-visit",
    ),
]
