import { http } from './http';

export function getStatsSummary(locationId, params = {}) {
  return http.get(`/api/locations/${locationId}/stats/summary/`, { params });
}

export function getStatsTimeseries(locationId, params = {}) {
  return http.get(`/api/locations/${locationId}/stats/timeseries/`, { params });
}

export function getStatsByCountry(locationId, params = {}) {
  return http.get(`/api/locations/${locationId}/stats/by-country/`, { params });
}

export function getStatsByDevice(locationId, params = {}) {
  return http.get(`/api/locations/${locationId}/stats/by-device/`, { params });
}

export function getStatsByReferrer(locationId, params = {}) {
  return http.get(`/api/locations/${locationId}/stats/by-referrer/`, { params });
}
