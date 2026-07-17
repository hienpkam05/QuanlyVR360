import { http } from './http';

export function listVersions(locationId, params = {}) {
  return http.get(`/api/locations/${locationId}/versions/`, { params });
}

export function createVersion(locationId, payload) {
  return http.post(`/api/locations/${locationId}/versions/`, payload);
}

export function getVersion(locationId, versionId) {
  return http.get(`/api/locations/${locationId}/versions/${versionId}/`);
}

export function updateVersion(locationId, versionId, payload) {
  return http.patch(`/api/locations/${locationId}/versions/${versionId}/`, payload);
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
