import { http } from './http';

export function listProjects(params = {}) {
  return http.get('/api/projects/', { params });
}

export function createProject(payload) {
  return http.post('/api/projects/', payload);
}

export function updateProject(projectId, payload) {
  return http.patch(`/api/projects/${projectId}/`, payload);
}

export function deleteProject(projectId) {
  return http.delete(`/api/projects/${projectId}/`);
}
