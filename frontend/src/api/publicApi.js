import axios from 'axios';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export function getPublicTour(publicToken, origin = window.location.origin) {
  return axios.get(`${apiBaseURL}/api/public/tour/${publicToken}/`, {
    headers: { Origin: origin },
  });
}

export function trackPublicVisit(publicToken, payload = {}, origin = window.location.origin) {
  return axios.post(`${apiBaseURL}/api/public/tour/${publicToken}/track-visit/`, payload, {
    headers: { Origin: origin },
  });
}
