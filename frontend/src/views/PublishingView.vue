<script setup>
import { onMounted, reactive, ref } from "vue";

import { listProjectLocations } from "../api/locationsApi";
import {
  createDomain,
  deleteDomain,
  getPublishConfig,
  listDomains,
  publishLocation,
  regenerateToken,
  unpublishLocation,
  updateDomain,
  updatePublishConfig,
} from "../api/publishingApi";
import { listProjects } from "../api/projectsApi";
import { listVersions } from "../api/toursApi";

const projects = ref([]);
const locations = ref([]);
const versions = ref([]);
const domains = ref([]);
const publishState = ref(null);
const selectedProjectId = ref("");
const selectedLocationId = ref("");
const selectedVersionId = ref("");
const errorMessage = ref("");
const domainForm = reactive({
  domain: "localhost:5173",
  label: "Local fronnamed",
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
  if (!selectedProjectId.value && projects.value.length)
    selectedProjectId.value = projects.value[0].id;
}

async function loadLocation() {
  if (!selectedProjectId.value) return;
  const response = await listProjectLocations(selectedProjectId.value);
  locations.value = normalizeResults(response.data);
  if (!selectedLocationId.value && locations.value.length)
    selectedLocationId.value = locations.value[0].id;
}

async function loadVersions() {
  if (!selectedLocationId.value) return;
  const response = await listVersions(selectedLocationId.value);
  versions.value = normalizeResults(response.data);
  selectedVersionId.value = versions.value[0]?.id || "";
}

async function loadPublish() {
  if (!selectedLocationId.value) return;
  const response = await getPublishConfig(selectedLocationId.value);
  publishState.value = response.data;
  const domainsResponse = await listDomains(selectedLocationId.value);
  domains.value = normalizeResults(domainsResponse.data);
}

async function reloadAll() {
  await loadVersions();
  await loadPublish();
}

async function changeProject() {
  selectedLocationId.value = "";
  await loadLocation();
  await reloadAll();
}

async function publish() {
  errorMessage.value = "";
  try {
    await publishLocation(selectedLocationId.value, {
      published_version: selectedVersionId.value,
      is_active: true,
    });
    await loadPublish();
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || "Publish none thimage cong.";
  }
}

async function toggleActive() {
  const current = publishState.value?.publish_config;
  if (!current) return;
  await updatePublishConfig(selectedLocationId.value, {
    is_active: !current.is_active,
  });
  await loadPublish();
}

async function renewToken() {
  await regenerateToken(selectedLocationId.value);
  await loadPublish();
}

async function unpublish() {
  if (!window.confirm("Cancel publish location nay?")) return;
  await unpublishLocation(selectedLocationId.value);
  await loadPublish();
}

async function addDomain() {
  await createDomain(selectedLocationId.value, {
    domain: domainForm.domain,
    label: domainForm.label,
    is_active: true,
  });
  await loadPublish();
}

async function toggleDomain(domain) {
  await updateDomain(selectedLocationId.value, domain.id, {
    is_active: !domain.is_active,
  });
  await loadPublish();
}

async function removeDomain(domain) {
  if (!window.confirm(`Delete domain ${domain.domain}?`)) return;
  await deleteDomain(selectedLocationId.value, domain.id);
  await loadPublish();
}

async function boot() {
  await loadProject();
  await loadLocation();
  await reloadAll();
}

onMounted(boot);
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Publish</p>
        <h1>Cấu hình tour public</h1>
      </div>
      <button class="secondary-button" type="button" @click="reloadAll">
        Refresh
      </button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <section class="panel selector-grid publish-selector-grid">
      <label>
        Project
        <select v-model="selectedProjectId" @change="changeProject">
          <option
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>
      </label>
      <label>
        Location
        <select v-model="selectedLocationId" @change="reloadAll">
          <option
            v-for="location in locations"
            :key="location.id"
            :value="location.id"
          >
            {{ location.name }}
          </option>
        </select>
      </label>
      <label>
        Version
        <select v-model="selectedVersionId">
          <option
            v-for="version in versions"
            :key="version.id"
            :value="version.id"
          >
            v{{ version.version_number }} - {{ version.status }}
          </option>
        </select>
      </label>
      <button
        class="primary-button publish-button"
        type="button"
        @click="publish"
      >
        Publish
      </button>
    </section>

    <section class="two-column">
      <div class="panel">
        <h2>Cấu hình export ban</h2>
        <pre class="json-preview">{{
          publishState || "Chưa có cấu hình publish."
        }}</pre>
        <div class="actions-row publish-config-actions">
          <button class="secondary-button" type="button" @click="toggleActive">
            Bật/tắt active
          </button>
          <button class="secondary-button" type="button" @click="renewToken">
            Regenerate token
          </button>
          <button class="danger-button" type="button" @click="unpublish">
            Cancel publish
          </button>
        </div>
      </div>

      <div class="panel">
        <h2>Domain cho phép</h2>
        <form class="form" @submit.prevent="addDomain">
          <input v-model="domainForm.domain" placeholder="localhost:5173" />
          <input v-model="domainForm.label" placeholder="Label" />
          <button class="primary-button" type="submit">Add domain</button>
        </form>
        <ul class="activity-list">
          <li v-for="domain in domains" :key="domain.id">
            <strong>{{ domain.domain }}</strong>
            <span
              >{{ domain.label }} -
              {{ domain.is_active ? "Active" : "Inactive" }}</span
            >
            <div class="actions-row">
              <button
                class="secondary-button"
                type="button"
                @click="toggleDomain(domain)"
              >
                Bật/tắt
              </button>
              <button
                class="danger-button"
                type="button"
                @click="removeDomain(domain)"
              >
                Delete
              </button>
            </div>
          </li>
          <li v-if="!domains.length" class="muted">
            Chưa có domain whitelist.
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>
