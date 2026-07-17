import axios from 'axios';

export const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const http = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh_token');

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axios.post(`${apiBaseURL}/api/auth/refresh/`, {
        refresh: refreshToken,
      });
      localStorage.setItem('access_token', response.data.access);
      originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
      return http(originalRequest);
    }

    return Promise.reject(error);
  },
);
