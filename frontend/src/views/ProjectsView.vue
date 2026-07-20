<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { createLocation, deleteLocation, listProjectLocations, updateLocation } from '../api/locationsApi';
import { createProject, deleteProject, listProjects, updateProject } from '../api/projectsApi';
import { createVersion, deleteVersion, listVersions } from '../api/toursApi';

const router = useRouter();

const projects = ref([]);
const locations = ref([]);
const versions = ref([]);
const selectedProjectId = ref('');
const selectedLocationId = ref('');
const loading = ref(false);
const loadingLocations = ref(false);
const loadingVersions = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const editModal = ref(null);
const versionModal = ref(false);
let messageTimer = null;

const projectForm = reactive({
  name: '',
  description: '',
});

const locationForm = reactive({
  name: '',
  description: '',
});

const versionForm = reactive({
  label: '',
  background_audio_file: null,
  hotspot_point_logo_file: null,
});

const editForm = reactive({
  id: '',
  type: '',
  name: '',
  description: '',
  is_active: true,
});

const selectedProject = computed(() => projects.value.find((project) => project.id === selectedProjectId.value) || null);
const selectedLocation = computed(() => locations.value.find((location) => location.id === selectedLocationId.value) || null);

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function extractApiError(error, fallback) {
  const data = error.response?.data;
  if (!data) return error.message || fallback;
  if (typeof data === 'string') return data.slice(0, 240) || fallback;
  if (data.detail) return data.detail;
  if (data.non_field_errors?.length) return data.non_field_errors[0];
  const firstKey = Object.keys(data)[0];
  const firstValue = firstKey ? data[firstKey] : null;
  if (Array.isArray(firstValue)) return `${firstKey}: ${firstValue[0]}`;
  if (typeof firstValue === 'string') return `${firstKey}: ${firstValue}`;
  return fallback;
}

function versionLabel(version) {
  const label = version.label ? ` - ${version.label}` : '';
  return `v${version.version_number}${label}`;
}

function scheduleMessageAutoDismiss() {
  clearTimeout(messageTimer);
  if (!errorMessage.value && !successMessage.value) return;
  const currentError = errorMessage.value;
  const currentSuccess = successMessage.value;
  messageTimer = setTimeout(() => {
    if (errorMessage.value === currentError) errorMessage.value = '';
    if (successMessage.value === currentSuccess) successMessage.value = '';
  }, 5000);
}

async function loadProjects() {
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

async function selectProject(project) {
  selectedProjectId.value = project.id;
  selectedLocationId.value = '';
  locations.value = [];
  versions.value = [];
  await loadLocations(project.id);
}

async function loadLocations(projectId = selectedProjectId.value) {
  if (!projectId) return;
  loadingLocations.value = true;
  errorMessage.value = '';
  try {
    const response = await listProjectLocations(projectId);
    locations.value = normalizeResults(response.data);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not load locations.';
  } finally {
    loadingLocations.value = false;
  }
}

async function selectLocation(location) {
  selectedLocationId.value = location.id;
  versions.value = [];
  await loadVersionsForLocation(location.id);
}

async function loadVersionsForLocation(locationId = selectedLocationId.value) {
  if (!locationId) return;
  loadingVersions.value = true;
  errorMessage.value = '';
  try {
    const response = await listVersions(locationId);
    versions.value = normalizeResults(response.data);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not load versions.';
  } finally {
    loadingVersions.value = false;
  }
}

async function submitProject() {
  if (!projectForm.name.trim()) {
    errorMessage.value = 'Project name is required.';
    return;
  }
  errorMessage.value = '';
  successMessage.value = '';
  const response = await createProject({
    name: projectForm.name.trim(),
    description: projectForm.description.trim(),
    is_active: true,
  });
  projectForm.name = '';
  projectForm.description = '';
  successMessage.value = 'Project created.';
  await loadProjects();
  const project = projects.value.find((item) => item.id === response.data.id);
  if (project) await selectProject(project);
}

async function submitLocation() {
  if (!selectedProjectId.value) {
    errorMessage.value = 'Select a project first.';
    return;
  }
  if (!locationForm.name.trim()) {
    errorMessage.value = 'Location name is required.';
    return;
  }
  errorMessage.value = '';
  successMessage.value = '';
  const response = await createLocation(selectedProjectId.value, {
    name: locationForm.name.trim(),
    description: locationForm.description.trim(),
    is_active: true,
  });
  locationForm.name = '';
  locationForm.description = '';
  successMessage.value = 'Location created.';
  await loadLocations();
  const location = locations.value.find((item) => item.id === response.data.id);
  if (location) await selectLocation(location);
}

function openProjectEdit(project) {
  editModal.value = 'project';
  editForm.id = project.id;
  editForm.type = 'project';
  editForm.name = project.name || '';
  editForm.description = project.description || '';
  editForm.is_active = Boolean(project.is_active);
}

function openLocationEdit(location) {
  editModal.value = 'location';
  editForm.id = location.id;
  editForm.type = 'location';
  editForm.name = location.name || '';
  editForm.description = location.description || '';
  editForm.is_active = Boolean(location.is_active);
}

function closeEditModal() {
  editModal.value = null;
  editForm.id = '';
  editForm.type = '';
  editForm.name = '';
  editForm.description = '';
  editForm.is_active = true;
}

async function submitEdit() {
  if (!editForm.name.trim()) {
    errorMessage.value = 'Name is required.';
    return;
  }
  errorMessage.value = '';
  successMessage.value = '';
  const payload = {
    name: editForm.name.trim(),
    description: editForm.description.trim(),
    is_active: editForm.is_active,
  };
  try {
    if (editForm.type === 'project') {
      await updateProject(editForm.id, payload);
      successMessage.value = 'Project updated.';
      await loadProjects();
      if (selectedProjectId.value === editForm.id) await loadLocations();
    } else if (editForm.type === 'location') {
      await updateLocation(editForm.id, payload);
      successMessage.value = 'Location updated.';
      await loadLocations();
      if (selectedLocationId.value === editForm.id) await loadVersionsForLocation();
    }
    closeEditModal();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not update.';
  }
}

async function removeProject(project) {
  const ok = window.confirm(`Soft delete project "${project.name}"?`);
  if (!ok) return;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await deleteProject(project.id);
    successMessage.value = 'Project deleted.';
    if (selectedProjectId.value === project.id) {
      selectedProjectId.value = '';
      selectedLocationId.value = '';
      locations.value = [];
      versions.value = [];
    }
    await loadProjects();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not delete project.';
  }
}

async function removeLocation(location) {
  const ok = window.confirm(`Soft delete location "${location.name}"?`);
  if (!ok) return;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await deleteLocation(location.id);
    successMessage.value = 'Location deleted.';
    if (selectedLocationId.value === location.id) {
      selectedLocationId.value = '';
      versions.value = [];
    }
    await loadLocations();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not delete location.';
  }
}

async function removeVersion(version) {
  const ok = window.confirm(`Soft delete ${versionLabel(version)}? Only draft versions can be deleted.`);
  if (!ok) return;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await deleteVersion(selectedLocationId.value, version.id);
    successMessage.value = 'Version deleted.';
    await loadVersionsForLocation();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not delete version.';
  }
}

function openVersionModal() {
  if (!selectedLocationId.value) {
    errorMessage.value = 'Select a location first.';
    return;
  }
  versionForm.label = '';
  versionForm.background_audio_file = null;
  versionForm.hotspot_point_logo_file = null;
  versionModal.value = true;
}

function closeVersionModal() {
  versionModal.value = false;
  versionForm.label = '';
  versionForm.background_audio_file = null;
  versionForm.hotspot_point_logo_file = null;
}

function onVersionAudioChange(event) {
  versionForm.background_audio_file = event.target.files?.[0] || null;
}

function onVersionLogoChange(event) {
  versionForm.hotspot_point_logo_file = event.target.files?.[0] || null;
}

async function submitVersion() {
  if (!selectedLocationId.value) {
    errorMessage.value = 'Select a location first.';
    return;
  }
  errorMessage.value = '';
  successMessage.value = '';
  try {
    const label = versionForm.label.trim() || `${selectedLocation.value?.name || 'Tour'} draft`;
    await createVersion(selectedLocationId.value, {
      label,
      changelog: 'Created from Projects flow.',
      data: {
        title: label,
        scenes: [],
      },
      background_audio_file: versionForm.background_audio_file,
      hotspot_point_logo_file: versionForm.hotspot_point_logo_file,
    });
    closeVersionModal();
    successMessage.value = 'Version created.';
    await loadVersionsForLocation();
  } catch (error) {
    errorMessage.value = extractApiError(error, 'Could not create version.');
  }
}

function openViewer(version) {
  router.push({
    path: '/viewer',
    query: {
      project: selectedProjectId.value,
      location: selectedLocationId.value,
      version: version.id,
    },
  });
}

function openBuilder(version = null) {
  if (version?.status === 'published') {
    errorMessage.value = 'Published versions cannot be edited. Open an archived or draft version.';
    return;
  }
  router.push({
    path: '/builder',
    query: {
      project: selectedProjectId.value || undefined,
      location: selectedLocationId.value || undefined,
      version: version?.id || undefined,
    },
  });
}

watch([errorMessage, successMessage], scheduleMessageAutoDismiss);

onMounted(loadProjects);

onBeforeUnmount(() => {
  clearTimeout(messageTimer);
});
</script>

<template>
  <section class="page projects-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Management</p>
        <h1>Projects</h1>
        <p class="muted">Choose a project, then a location, then open a tour version in VR360 Viewer.</p>
      </div>
      <button class="secondary-button" type="button" @click="loadProjects">Refresh</button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <section class="panel project-quick-create">
      <form class="inline-form" @submit.prevent="submitProject">
        <input v-model="projectForm.name" placeholder="New project name" />
        <input v-model="projectForm.description" placeholder="Short description" />
        <button class="primary-button" type="submit">Create project</button>
      </form>
    </section>

    <section class="project-flow">
      <div class="panel project-flow-column">
        <div class="panel-title-row">
          <h2>1. Projects</h2>
          <span class="muted">{{ projects.length }}</span>
        </div>
        <p v-if="loading" class="muted">Loading projects...</p>
        <article
          v-for="project in projects"
          :key="project.id"
          class="flow-card"
          :class="{ active: project.id === selectedProjectId }"
          role="button"
          tabindex="0"
          @click="selectProject(project)"
          @keydown.enter.prevent="selectProject(project)"
          @keydown.space.prevent="selectProject(project)"
        >
          <strong>{{ project.name }}</strong>
          <span>{{ project.description || 'No description' }}</span>
          <small>{{ project.locations_count || 0 }} locations · {{ project.is_active ? 'Active' : 'Inactive' }}</small>
          <div class="actions-row">
            <button class="secondary-button compact-button" type="button" @click.stop="openProjectEdit(project)">Edit</button>
            <button class="danger-button compact-button" type="button" @click.stop="removeProject(project)">Delete</button>
          </div>
        </article>
        <p v-if="!projects.length && !loading" class="muted">No project yet.</p>
      </div>

      <div class="panel project-flow-column">
        <div class="panel-title-row">
          <h2>2. Locations</h2>
          <span class="muted">{{ locations.length }}</span>
        </div>

        <form v-if="selectedProject" class="mini-create-form" @submit.prevent="submitLocation">
          <input v-model="locationForm.name" placeholder="New location name" />
          <button class="secondary-button" type="submit">Create</button>
        </form>

        <p v-if="!selectedProject" class="muted">Select a project to see its locations.</p>
        <p v-else-if="loadingLocations" class="muted">Loading locations...</p>
        <article
          v-for="location in locations"
          :key="location.id"
          class="flow-card"
          :class="{ active: location.id === selectedLocationId }"
          role="button"
          tabindex="0"
          @click="selectLocation(location)"
          @keydown.enter.prevent="selectLocation(location)"
          @keydown.space.prevent="selectLocation(location)"
        >
          <strong>{{ location.name }}</strong>
          <span>{{ location.description || selectedProject?.name }}</span>
          <small>{{ location.is_active ? 'Active' : 'Inactive' }}</small>
          <div class="actions-row">
            <button class="secondary-button compact-button" type="button" @click.stop="openLocationEdit(location)">Edit</button>
            <button class="danger-button compact-button" type="button" @click.stop="removeLocation(location)">Delete</button>
          </div>
        </article>
        <p v-if="selectedProject && !locations.length && !loadingLocations" class="muted">No location yet.</p>
      </div>

      <div class="panel project-flow-column">
        <div class="panel-title-row">
          <h2>3. Versions</h2>
          <span class="muted">{{ versions.length }}</span>
        </div>
        <button v-if="selectedLocation" class="secondary-button" type="button" @click="openVersionModal">
          + Create version
        </button>
        <p v-if="!selectedLocation" class="muted">Select a location to see versions.</p>
        <p v-else-if="loadingVersions" class="muted">Loading versions...</p>
        <article
          v-for="version in versions"
          :key="version.id"
          class="flow-card version-card"
        >
          <strong>{{ versionLabel(version) }}</strong>
          <span>{{ version.changelog || selectedLocation?.name }}</span>
          <small>{{ version.status }} · {{ version.scene_assets_count || 0 }} assets</small>
          <div class="actions-row">
            <button class="primary-button" type="button" @click="openViewer(version)">View</button>
            <button
              class="secondary-button"
              type="button"
              :disabled="version.status === 'published'"
              @click="openBuilder(version)"
            >
              Edit
            </button>
            <button class="danger-button" type="button" @click="removeVersion(version)">Delete</button>
          </div>
        </article>
        <div v-if="selectedLocation && !versions.length && !loadingVersions" class="empty-flow-card">
          <p class="muted">No version yet.</p>
        </div>
      </div>
    </section>

    <div v-if="versionModal" class="builder-modal-backdrop" @click.self="closeVersionModal">
      <div class="builder-modal builder-modal-small">
        <div class="builder-modal-header">
          <h2>Create version</h2>
          <button type="button" @click="closeVersionModal">×</button>
        </div>
        <form class="form" @submit.prevent="submitVersion">
          <label>
            Version label
            <input v-model="versionForm.label" placeholder="Leave empty to auto-name" />
          </label>
          <label>
            Background audio
            <input type="file" accept="audio/*" @change="onVersionAudioChange" />
          </label>
          <label>
            Point hotspot logo
            <input type="file" accept="image/*" @change="onVersionLogoChange" />
          </label>
          <p class="muted">Logo nay se dung cho hotspot loai point trong viewer.</p>
          <div class="actions-row">
            <button class="primary-button" type="submit">Create version</button>
            <button class="secondary-button" type="button" @click="closeVersionModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="editModal" class="builder-modal-backdrop">
      <div class="builder-modal builder-modal-small">
        <div class="builder-modal-header">
          <h2>Edit {{ editModal }}</h2>
          <button type="button" @click="closeEditModal">×</button>
        </div>
        <form class="form" @submit.prevent="submitEdit">
          <label>
            Name
            <input v-model="editForm.name" />
          </label>
          <label>
            Description
            <textarea v-model="editForm.description" rows="4"></textarea>
          </label>
          <label class="checkbox-row">
            <input v-model="editForm.is_active" type="checkbox" />
            Active
          </label>
          <div class="actions-row">
            <button class="primary-button" type="submit">Save</button>
            <button class="secondary-button" type="button" @click="closeEditModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
