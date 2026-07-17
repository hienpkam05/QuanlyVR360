import { http } from './http';

export function listProjectLocations(projectId, params = {}) {
  return http.get(`/api/projects/${projectId}/locations/`, { params });
}

export function createLocation(projectId, payload) {
  return http.post(`/api/projects/${projectId}/locations/`, payload);
}

export function getLocation(locationId) {
  return http.get(`/api/locations/${locationId}/`);
}

export function updateLocation(locationId, payload) {
  return http.patch(`/api/locations/${locationId}/`, payload);
}

export function deleteLocation(locationId) {
  return http.delete(`/api/locations/${locationId}/`);
}

export function reorderLocations(projectId, locations) {
  return http.patch(`/api/projects/${projectId}/locations/reorder/`, { locations });
}

export function uploadLocationThumbnail(locationId, file) {
  const formData = new FormData();
  formData.append('thumbnail', file);
  return http.post(`/api/locations/${locationId}/upload-thumbnail/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
