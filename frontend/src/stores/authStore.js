import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { http } from '../api/http';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('access_token') || '');
  const refreshToken = ref(localStorage.getItem('refresh_token') || '');
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const sessionChecked = ref(false);

  const isAuthenticated = computed(() => Boolean(accessToken.value));
  const role = computed(() => user.value?.role || '');
  const isGuest = computed(() => role.value === 'guest');

  function syncTokensFromStorage() {
    accessToken.value = localStorage.getItem('access_token') || '';
    refreshToken.value = localStorage.getItem('refresh_token') || '';
  }

  async function login(username, password) {
    const response = await http.post('/api/auth/login/', { username, password });
    accessToken.value = response.data.access;
    refreshToken.value = response.data.refresh;
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    await fetchMe();
  }

  async function fetchMe() {
    const response = await http.get('/api/auth/me/');
    syncTokensFromStorage();
    user.value = response.data;
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  async function ensureSession() {
    syncTokensFromStorage();
    if (!accessToken.value && !refreshToken.value) {
      logout();
      sessionChecked.value = true;
      return false;
    }

    try {
      await fetchMe();
      sessionChecked.value = true;
      return true;
    } catch {
      logout();
      sessionChecked.value = true;
      return false;
    }
  }

  function logout() {
    accessToken.value = '';
    refreshToken.value = '';
    user.value = null;
    sessionChecked.value = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  window.addEventListener('auth:expired', logout);

  return {
    accessToken,
    refreshToken,
    user,
    sessionChecked,
    isAuthenticated,
    role,
    isGuest,
    login,
    fetchMe,
    ensureSession,
    logout,
  };
});
