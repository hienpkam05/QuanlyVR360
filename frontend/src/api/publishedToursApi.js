import axios from 'axios';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export function listPublishedTours(params = {}) {
  return axios.get(`${apiBaseURL}/api/published-tours/`, { params });
}
