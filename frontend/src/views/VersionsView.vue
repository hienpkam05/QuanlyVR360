<script setup>
import { onMounted, reactive, ref } from 'vue';

import { listProjectLocations } from '../api/locationsApi';
import { listProjects } from '../api/projectsApi';
import { createVersion, deleteVersion, exportVersion, listVersions, previewVersion, updateVersion } from '../api/toursApi';

const projects = ref([]);
const locations = ref([]);
const versions = ref([]);
const preview = ref(null);
const selectedProjectId = ref('');
const selectedLocationId = ref('');
const errorMessage = ref('');
const form = reactive({
  id: null,
  label: '',
  changelog: '',
  dataText: '{\n  "scenes": [\n    {"id": "scene-1", "name": "Scene 1", "hotspots": []}\n  ]\n}',
});

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

async function loadProject() {
  const response = await listProjects();
  projects.value = normalizeResults(response.data);
  if (!selectedProjectId.value && projects.value.length) selectedProjectId.value = projects.value[0].id;
}

async function loadLocation() {
  if (!selectedProjectId.value) return;
  const response = await listProjectLocations(selectedProjectId.value);
  locations.value = normalizeResults(response.data);
  if (!selectedLocationId.value && locations.value.length) selectedLocationId.value = locations.value[0].id;
}

async function loadVersions() {
  if (!selectedLocationId.value) return;
  const response = await listVersions(selectedLocationId.value);
  versions.value = normalizeResults(response.data);
}

function editVersion(version) {
  form.id = version.id;
  form.label = version.label || '';
  form.changelog = version.changelog || '';
  form.dataText = JSON.stringify(version.data || { scenes: [] }, null, 2);
}

function resetForm() {
  form.id = null;
  form.label = '';
  form.changelog = '';
  form.dataText = '{\n  "scenes": [\n    {"id": "scene-1", "name": "Scene 1", "hotspots": []}\n  ]\n}';
}

async function submitVersion() {
  errorMessage.value = '';
  try {
    const payload = {
      label: form.label,
      changelog: form.changelog,
      data: JSON.parse(form.dataText),
    };
    if (form.id) {
      await updateVersion(selectedLocationId.value, form.id, payload);
    } else {
      await createVersion(selectedLocationId.value, payload);
    }
    resetForm();
    await loadVersions();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || error.message || 'Could not save version.';
  }
}

async function showPreview(version) {
  const response = await previewVersion(selectedLocationId.value, version.id);
  preview.value = response.data;
}

async function copyExport(version) {
  const response = await exportVersion(selectedLocationId.value, version.id);
  await navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
  window.alert('Da copy JSON export vao clipboard.');
}

async function removeVersion(version) {
  if (!window.confirm(`Delete version v${version.version_number}?`)) return;
  await deleteVersion(selectedLocationId.value, version.id);
  await loadVersions();
}

async function changeProject() {
  selectedLocationId.value = '';
  await loadLocation();
  await loadVersions();
}

async function boot() {
  await loadProject();
  await loadLocation();
  await loadVersions();
}

onMounted(boot);
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Tour editor data</p>
        <h1>Version tour</h1>
      </div>
      <button class="secondary-button" type="button" @click="loadVersions">Refresh</button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <section class="panel selector-grid">
      <label>
        Project
        <select v-model="selectedProjectId" @change="changeProject">
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>
      </label>
      <label>
        Location
        <select v-model="selectedLocationId" @change="loadVersions">
          <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
        </select>
      </label>
    </section>

    <section class="panel">
      <h2>{{ form.id ? 'Edit draft version' : 'Create draft version' }}</h2>
      <form class="form" @submit.prevent="submitVersion">
        <input v-model="form.label" placeholder="Label" />
        <input v-model="form.changelog" placeholder="Changelog" />
        <textarea v-model="form.dataText" rows="10" spellcheck="false"></textarea>
        <div class="actions-row">
          <button class="primary-button" type="submit">{{ form.id ? 'Save version' : 'Create version' }}</button>
          <button class="secondary-button" type="button" @click="resetForm">Lam moi</button>
        </div>
      </form>
    </section>

    <section class="two-column">
      <div class="panel">
        <h2>Version list</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Version</th>
                <th>Label</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="version in versions" :key="version.id">
                <td>v{{ version.version_number }}</td>
                <td>{{ version.label }}</td>
                <td>{{ version.status }}</td>
                <td class="actions-cell">
                  <button class="secondary-button" type="button" @click="showPreview(version)">Preview</button>
                  <button class="secondary-button" type="button" @click="copyExport(version)">Export</button>
                  <button class="secondary-button" type="button" @click="editVersion(version)">Edit</button>
                  <button class="danger-button" type="button" @click="removeVersion(version)">Delete</button>
                </td>
              </tr>
              <tr v-if="!versions.length">
                <td colspan="4">Chua co version.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel">
        <h2>Preview data</h2>
        <pre class="json-preview">{{ preview || 'Choose Preview to view resolved tile data.' }}</pre>
      </div>
    </section>
  </section>
</template>
