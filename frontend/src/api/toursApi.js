import { http } from './http';

export function listVersions(locationId, params = {}) {
  return http.get(`/api/locations/${locationId}/versions/`, { params });
}

function isUploadFile(value) {
  return value instanceof File || value instanceof Blob;
}

function buildVersionPayload(payload) {
  const hasAudioFile = isUploadFile(payload?.background_audio_file);
  const hasLogoFile = isUploadFile(payload?.hotspot_point_logo_file);
  if (!hasAudioFile && !hasLogoFile) return payload;

  const formData = new FormData();
  if (payload.label !== undefined) formData.append('label', payload.label);
  if (payload.changelog !== undefined) formData.append('changelog', payload.changelog);
  if (payload.data !== undefined) formData.append('data', JSON.stringify(payload.data));
  if (payload.thumbnail) formData.append('thumbnail', payload.thumbnail);
  if (hasAudioFile) formData.append('background_audio', payload.background_audio_file);
  if (hasLogoFile) formData.append('hotspot_point_logo', payload.hotspot_point_logo_file);
  return formData;
}

export function createVersion(locationId, payload) {
  return http.post(`/api/locations/${locationId}/versions/`, buildVersionPayload(payload));
}

export function getVersion(locationId, versionId) {
  return http.get(`/api/locations/${locationId}/versions/${versionId}/`);
}

export function updateVersion(locationId, versionId, payload) {
  return http.patch(`/api/locations/${locationId}/versions/${versionId}/`, buildVersionPayload(payload));
}

export function uploadHotspotAudio(locationId, versionId, { hotspotId, audioFile }) {
  const formData = new FormData();
  formData.append('hotspot_id', hotspotId);
  formData.append('audio', audioFile);
  return http.post(`/api/locations/${locationId}/versions/${versionId}/hotspot-audio/`, formData);
}

export function uploadHotspotInfoImage(locationId, versionId, { hotspotId, imageFile }) {
  const formData = new FormData();
  formData.append('hotspot_id', hotspotId);
  formData.append('image', imageFile);
  return http.post(`/api/locations/${locationId}/versions/${versionId}/hotspot-info-image/`, formData);
}

export function deleteVersion(locationId, versionId) {
  return http.delete(`/api/locations/${locationId}/versions/${versionId}/`);
}

export function previewVersion(locationId, versionId) {
  return http.get(`/api/locations/${locationId}/versions/${versionId}/preview/`);
}

export function exportVersion(locationId, versionId) {
  return http.get(`/api/locations/${locationId}/versions/${versionId}/export/`);
}

export function importVersion(locationId, payload) {
  return http.post(`/api/locations/${locationId}/versions/import/`, payload);
}
