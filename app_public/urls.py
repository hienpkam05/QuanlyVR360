from django.urls import path

from .views import PublicTileView, PublicTourView, PublicTrackVisitView

urlpatterns = [
    path("public/tour/<str:public_token>/", PublicTourView.as_view(), name="public-tour"),
    path(
        "public/tour/<str:public_token>/tiles/<str:scene_key>/<int:z>/<int:x>/<int:y>.jpg",
        PublicTileView.as_view(),
        name="public-tour-tile",
    ),
    path(
        "public/tour/<str:public_token>/track-visit/",
        PublicTrackVisitView.as_view(),
        name="public-tour-track-visit",
    ),
]
