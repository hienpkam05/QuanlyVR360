import axios from 'axios';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

function defaultEmbedOrigin() {
  if (typeof window === 'undefined') return '';
  const isEmbedded = window.self !== window.top;
  if (isEmbedded && document.referrer) {
    return document.referrer;
  }
  return window.location.origin;
}

export function getPublicTour(publicToken, origin = defaultEmbedOrigin()) {
  return axios.get(`${apiBaseURL}/api/public/tour/${publicToken}/`, {
    params: { embed_origin: origin },
  });
}

export function trackPublicVisit(publicToken, payload = {}, origin = defaultEmbedOrigin()) {
  return axios.post(`${apiBaseURL}/api/public/tour/${publicToken}/track-visit/`, {
    ...payload,
    embed_origin: origin,
  });
}
