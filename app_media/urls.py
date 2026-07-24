from django.urls import path

from .views import SceneAssetDeleteView, SceneStatusView, SceneUploadView


urlpatterns = [
    path("media/scenes/upload/", SceneUploadView.as_view(), name="scene-upload"),
    path("media/scenes/<int:scene_asset_id>/status/", SceneStatusView.as_view(), name="scene-status"),
    path("media/scenes/<int:scene_asset_id>/", SceneAssetDeleteView.as_view(), name="scene-delete"),
]
