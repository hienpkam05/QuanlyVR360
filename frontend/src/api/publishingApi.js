import { http } from './http';

export function getPublishConfig(locationId) {
  return http.get(`/api/locations/${locationId}/publish/`);
}

export function publishLocation(locationId, payload) {
  return http.post(`/api/locations/${locationId}/publish/`, payload);
}

export function updatePublishConfig(locationId, payload) {
  return http.patch(`/api/locations/${locationId}/publish/`, payload);
}

export function regenerateToken(locationId) {
  return http.post(`/api/locations/${locationId}/publish/regenerate-token/`);
}

export function unpublishLocation(locationId) {
  return http.delete(`/api/locations/${locationId}/publish/`);
}

export function listDomains(locationId) {
  return http.get(`/api/locations/${locationId}/publish/domains/`);
}

export function createDomain(locationId, payload) {
  return http.post(`/api/locations/${locationId}/publish/domains/`, payload);
}

export function updateDomain(locationId, domainId, payload) {
  return http.patch(`/api/locations/${locationId}/publish/domains/${domainId}/`, payload);
}

export function deleteDomain(locationId, domainId) {
  return http.delete(`/api/locations/${locationId}/publish/domains/${domainId}/`);
}
