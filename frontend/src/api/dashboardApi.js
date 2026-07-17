import { http } from './http';

export function getDashboardOverview() {
  return http.get('/api/dashboard/overview/');
}

export function getTopLocations(params = {}) {
  return http.get('/api/dashboard/top-locations/', { params });
}

export function getRecentActivity(params = { limit: 10 }) {
  return http.get('/api/dashboard/recent-activity/', { params });
}
