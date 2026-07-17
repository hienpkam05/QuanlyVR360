<script setup>
import { onMounted, reactive, ref } from 'vue';

import { listProjectLocations, createLocation, deleteLocation, updateLocation } from '../api/locationsApi';
import { listProjects } from '../api/projectsApi';

const projects = ref([]);
const locations = ref([]);
const selectedProjectId = ref('');
const loading = ref(false);
const saving = ref(false);
const errorMessage = ref('');
const form = reactive({
  id: null,
  name: '',
  description: '',
  latitude: '',
  longitude: '',
  order: 0,
  is_active: true,
});

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function formatApiError(error) {
  const data = error.response?.data;
  if (!data) return error.message || 'Co loi xay ra.';
  if (typeof data === 'string') return data;
  if (data.detail) return data.detail;
  return Object.entries(data)
    .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
    .join(' | ');
}

async function loadProject() {
  const response = await listProjects();
  projects.value = normalizeResults(response.data);
  if (!selectedProjectId.value && projects.value.length) {
    selectedProjectId.value = projects.value[0].id;
  }
}

async function loadLocation() {
  if (!selectedProjectId.value) return;
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await listProjectLocations(selectedProjectId.value);
    locations.value = normalizeResults(response.data);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not load location list.';
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  Object.assign(form, {
    id: null,
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    order: locations.value.length + 1,
    is_active: true,
  });
}

function editLocation(location) {
  Object.assign(form, {
    id: location.id,
    name: location.name,
    description: location.description || '',
    latitude: location.latitude || '',
    longitude: location.longitude || '',
    order: location.order || 0,
    is_active: location.is_active,
  });
}

async function submitLocation() {
  if (!selectedProjectId.value) {
    errorMessage.value = 'Vui long select project truoc khi create location.';
    return;
  }
  saving.value = true;
  errorMessage.value = '';
  const payload = {
    name: form.name,
    description: form.description,
    latitude: form.latitude || null,
    longitude: form.longitude || null,
    order: Number(form.order || 0),
    is_active: form.is_active,
  };
  try {
    if (form.id) {
      await updateLocation(form.id, payload);
    } else {
      await createLocation(selectedProjectId.value, payload);
    }
    resetForm();
    await loadLocation();
  } catch (error) {
    errorMessage.value = formatApiError(error);
  } finally {
    saving.value = false;
  }
}

async function removeLocation(location) {
  if (!window.confirm(`Delete location "${location.name}"?`)) return;
  await deleteLocation(location.id);
  await loadLocation();
}

async function boot() {
  await loadProject();
  resetForm();
  await loadLocation();
}

onMounted(boot);
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Quan ly</p>
        <h1>Location</h1>
      </div>
      <button class="secondary-button" type="button" @click="loadLocation">Refresh</button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <section class="panel">
      <h2>Select project</h2>
      <div class="inline-form">
        <select v-model="selectedProjectId" @change="loadLocation">
          <option value="">Select project</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.name }}
          </option>
        </select>
      </div>
    </section>

    <section class="panel">
      <h2>{{ form.id ? 'Update location' : 'Create new location' }}</h2>
      <form class="grid-form" @submit.prevent="submitLocation">
        <input v-model="form.name" placeholder="Ten location" required />
        <input v-model="form.description" placeholder="Description" />
        <input v-model.number="form.latitude" type="number" step="any" placeholder="Latitude" />
        <input v-model.number="form.longitude" type="number" step="any" placeholder="Longitude" />
        <input v-model.number="form.order" type="number" min="0" placeholder="Thu tu" />
        <label class="checkbox-row">
          <input v-model="form.is_active" type="checkbox" />
          Active
        </label>
        <button class="primary-button" type="submit" :disabled="saving">
          {{ saving ? 'Saving...' : form.id ? 'Save' : 'Create' }}
        </button>
        <button class="secondary-button" type="button" @click="resetForm">Lam moi</button>
      </form>
    </section>

    <section class="panel">
      <h2>Location list</h2>
      <p v-if="loading" class="muted">Loading...</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ten</th>
              <th>Slug</th>
              <th>Thu tu</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="location in locations" :key="location.id">
              <td>{{ location.id }}</td>
              <td>{{ location.name }}</td>
              <td>{{ location.slug }}</td>
              <td>{{ location.order }}</td>
              <td>{{ location.is_active ? 'Active' : 'Inactive' }}</td>
              <td class="actions-cell">
                <button class="secondary-button" type="button" @click="editLocation(location)">Edit</button>
                <button class="danger-button" type="button" @click="removeLocation(location)">Delete</button>
              </td>
            </tr>
            <tr v-if="!locations.length && !loading">
              <td colspan="6">Chua co location.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>
