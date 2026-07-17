<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const auth = useAuthStore();

const username = ref('admin');
const password = ref('123456');
const loading = ref(false);
const errorMessage = ref('');

async function submit() {
  loading.value = true;
  errorMessage.value = '';
  try {
    await auth.login(username.value, password.value);
    router.push('/');
  } catch (error) {
    const data = error.response?.data;
    errorMessage.value =
      data?.detail ||
      data?.non_field_errors?.join(' ') ||
      (typeof data === 'string' ? data : '') ||
      'Could not connect to backend or CORS was blocked.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth-card">
    <div>
      <p class="eyebrow">VR360 Admin</p>
      <h1>Login system</h1>
      <p class="muted">Use an admin or company staff account created in the backend.</p>
    </div>

    <form class="form" @submit.prevent="submit">
      <label>
        Username
        <input v-model="username" autocomplete="username" />
      </label>
      <label>
        Password
        <input v-model="password" type="password" autocomplete="current-password" />
      </label>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button class="primary-button" type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </section>
</template>
