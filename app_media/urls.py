from django.urls import path

from .views import SceneAssetDeleteView, SceneStatusView, SceneUploadView, TileServeView


urlpatterns = [
    path("media/scenes/upload/", SceneUploadView.as_view(), name="scene-upload"),
    path("media/scenes/<int:scene_asset_id>/status/", SceneStatusView.as_view(), name="scene-status"),
    path("media/scenes/<int:scene_asset_id>/", SceneAssetDeleteView.as_view(), name="scene-delete"),
    path(
        "media/tiles/<int:location_id>/<int:version>/<str:scene_key>/<int:z>/<int:x>/<int:y>.jpg",
        TileServeView.as_view(),
        name="tile-serve",
    ),
]
