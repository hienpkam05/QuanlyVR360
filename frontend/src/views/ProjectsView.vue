<script setup>
import { onMounted, reactive, ref } from 'vue';

import { createProject, listProjects } from '../api/projectsApi';

const projects = ref([]);
const loading = ref(false);
const errorMessage = ref('');
const form = reactive({
  name: '',
  description: '',
});

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

async function loadProject() {
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await listProjects();
    projects.value = normalizeResults(response.data);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not load project list.';
  } finally {
    loading.value = false;
  }
}

async function submitProject() {
  if (!form.name.trim()) {
    errorMessage.value = 'Vui long import name project.';
    return;
  }
  await createProject({
    name: form.name,
    description: form.description,
    is_active: true,
  });
  form.name = '';
  form.description = '';
  await loadProject();
}

onMounted(loadProject);
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Quan ly</p>
        <h1>Project VR360</h1>
      </div>
      <button class="secondary-button" type="button" @click="loadProject">Refresh</button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <section class="panel">
      <h2>Create new project</h2>
      <form class="inline-form" @submit.prevent="submitProject">
        <input v-model="form.name" placeholder="Ten project" />
        <input v-model="form.description" placeholder="Description ngan" />
        <button class="primary-button" type="submit">Create project</button>
      </form>
    </section>

    <section class="panel">
      <h2>Project list</h2>
      <p v-if="loading" class="muted">Loading...</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ten</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Ngay tao</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ project.name }}</td>
              <td>{{ project.slug }}</td>
              <td>{{ project.is_active ? 'Active' : 'Inactive' }}</td>
              <td>{{ project.created_at }}</td>
            </tr>
            <tr v-if="!projects.length && !loading">
              <td colspan="5">No project yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>
