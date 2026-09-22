import axios from 'axios';

export const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const http = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshRequest = null;

function clearAuthStorage() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth:expired'));
}

http.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
    delete config.headers['content-type'];
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh_token');

    if (error.response?.status === 401 && refreshToken && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        refreshRequest ||= axios.post(`${apiBaseURL}/api/auth/refresh/`, {
          refresh: refreshToken,
        });
        const response = await refreshRequest;
        localStorage.setItem('access_token', response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return http(originalRequest);
      } catch (refreshError) {
        clearAuthStorage();
        return Promise.reject(refreshError);
      } finally {
        refreshRequest = null;
      }
    }

    if (error.response?.status === 401 && !refreshToken) {
      clearAuthStorage();
    }

    return Promise.reject(error);
  },
);
