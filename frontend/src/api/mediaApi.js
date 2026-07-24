import { http } from './http';

export function uploadSceneAsset({ tourVersion, sceneKey, originalFile }) {
  const formData = new FormData();
  formData.append('tour_version', tourVersion);
  formData.append('scene_key', sceneKey);
  formData.append('original_file', originalFile);
  return http.post('/api/media/scenes/upload/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function getSceneStatus(sceneAssetId) {
  return http.get(`/api/media/scenes/${sceneAssetId}/status/`);
}

export function deleteSceneAsset(sceneAssetId) {
  return http.delete(`/api/media/scenes/${sceneAssetId}/`);
}
