<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import PanoramaViewer from '../components/PanoramaViewer.vue';
import { apiBaseURL } from '../api/http';
import { listProjectLocations } from '../api/locationsApi';
import { listPublishedTours } from '../api/publishedToursApi';
import { listProjects } from '../api/projectsApi';
import { getPublicTour } from '../api/publicApi';
import { getVersion, listVersions } from '../api/toursApi';

const route = useRoute();
const router = useRouter();
const projects = ref([]);
const locations = ref([]);
const versions = ref([]);
const selectedProjectId = ref('');
const selectedLocationId = ref('');
const selectedVersionId = ref('');
const version = ref(null);
const scenes = ref([]);
const activeSceneId = ref('');
const sidebarOpen = ref(false);
const thumbsOpen = ref(true);
const errorMessage = ref('');
const selectedPointHotspot = ref(null);
const backgroundAudioPlaying = ref(false);
const backgroundAudioBlocked = ref(false);
const viewState = reactive({ lon: 0, lat: 0, fov: 75 });
let hotspotAudioPlayer = null;
let backgroundAudioPlayer = null;

const activeScene = computed(() => scenes.value.find((scene) => scene.id === activeSceneId.value) || null);
const activeSceneIndex = computed(() => scenes.value.findIndex((scene) => scene.id === activeSceneId.value));
const activeInitialView = computed(() => activeScene.value?.view || activeScene.value?.initialView || { lon: 0, lat: 0, fov: 75 });
const sceneImage = computed(() => resolveSceneImage(activeScene.value));
const backgroundAudioUrl = computed(() => resolveUrl(version.value?.background_audio || ''));
const pointHotspotLogoUrl = computed(() => resolveUrl(version.value?.hotspot_point_logo || ''));
const displayHotspots = computed(() => {
  const scene = activeScene.value;
  if (!scene) return [];
  return (scene.hotspots || []).map((hotspot) => {
    const targetScene = scenes.value.find((item) => item.id === hotspot.target_scene_id);
    return {
      ...hotspot,
      preview_image: resolveSceneImage(targetScene || scene),
      audio_url: resolveUrl(hotspot.audio_url || hotspot.audio || ''),
    };
  });
});

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function resolveUrl(url) {
  if (!url) return '';
  if (url.startsWith('blob:') || url.startsWith('data:') || url.startsWith('http')) return url;
  return `${apiBaseURL}${url.startsWith('/') ? url : `/${url}`}`;
}

function resolveSceneImage(scene) {
  if (!scene) return '';
  return resolveUrl(scene.image_url || scene.original_file || scene.thumbnail || scene.thumb || scene.panorama || '');
}

function normalizeScene(scene, index = 0) {
  return {
    id: String(scene.id || scene.key || scene.scene_key || `scene-${index + 1}`),
    name: scene.name || scene.title || `Scene ${index + 1}`,
    group: scene.group || 'Default',
    description: scene.description || scene.info || '',
    image_url: scene.image_url || '',
    original_file: scene.original_file || '',
    thumbnail: scene.thumbnail || scene.thumb || scene.original_file || scene.image_url || '',
    view: {
      lon: Number(scene.view?.lon ?? scene.initialView?.lon ?? scene.lon ?? 0),
      lat: Number(scene.view?.lat ?? scene.initialView?.lat ?? scene.lat ?? 0),
      fov: Number(scene.view?.fov ?? scene.initialView?.fov ?? scene.fov ?? 75),
    },
    hotspots: (scene.hotspots || []).map((hotspot, hotspotIndex) => ({
      id: String(hotspot.id || `hotspot-${index + 1}-${hotspotIndex + 1}`),
      label: hotspot.label || hotspot.title || `Hotspot ${hotspotIndex + 1}`,
      type: ['nav', 'point'].includes(hotspot.type) ? hotspot.type : hotspot.type === 'navigate' ? 'nav' : 'point',
      target_scene_id: String(hotspot.target_scene_id || hotspot.target || hotspot.scene_id || ''),
      lon: Number(hotspot.lon ?? 0),
      lat: Number(hotspot.lat ?? 0),
      x: Number(hotspot.x ?? 50),
      y: Number(hotspot.y ?? 50),
      audio_url: hotspot.audio_url || hotspot.audio || '',
    })),
  };
}

function normalizeTourData(data) {
  const source = data?.TOUR_DATA || data?.tour_data || data?.data || data || {};
  const sceneList = source.scenes || source.SCENES || [];
  return Array.isArray(sceneList) ? sceneList.map(normalizeScene) : [];
}

function applyTourPayload(payload) {
  version.value = payload.version || payload;
  scenes.value = normalizeTourData(payload.data || payload);
  activeSceneId.value = scenes.value[0]?.id || '';
}

async function tryPlayBackgroundAudio() {
  if (!backgroundAudioUrl.value) return;
  if (!backgroundAudioPlayer || backgroundAudioPlayer.src !== backgroundAudioUrl.value) {
    backgroundAudioPlayer?.pause();
    backgroundAudioPlayer = new Audio(backgroundAudioUrl.value);
    backgroundAudioPlayer.loop = true;
    backgroundAudioPlayer.volume = 0.55;
  }
  try {
    await backgroundAudioPlayer.play();
    backgroundAudioPlaying.value = true;
    backgroundAudioBlocked.value = false;
  } catch {
    backgroundAudioPlaying.value = false;
    backgroundAudioBlocked.value = true;
  }
}

function toggleBackgroundAudio() {
  if (!backgroundAudioUrl.value) return;
  if (backgroundAudioPlayer && !backgroundAudioPlayer.paused) {
    backgroundAudioPlayer.pause();
    backgroundAudioPlaying.value = false;
    backgroundAudioBlocked.value = false;
    return;
  }
  tryPlayBackgroundAudio();
}

function onViewerFirstInteraction(event) {
  if (event?.target?.closest?.('.viewer-background-audio')) return;
  if (backgroundAudioBlocked.value && backgroundAudioUrl.value) {
    tryPlayBackgroundAudio();
  }
}

function uniqueBy(items, keyGetter) {
  const map = new Map();
  items.forEach((item) => {
    const key = keyGetter(item);
    if (key && !map.has(key)) map.set(key, item);
  });
  return Array.from(map.values());
}

async function loadProject() {
  const response = await listProjects();
  projects.value = normalizeResults(response.data);
  const queryProject = Number(route.query.project || 0);
  if (queryProject && projects.value.some((project) => project.id === queryProject)) {
    selectedProjectId.value = queryProject;
  }
  if (!selectedProjectId.value && projects.value.length) selectedProjectId.value = projects.value[0].id;
}

async function loadLocation() {
  if (!selectedProjectId.value) return;
  const response = await listProjectLocations(selectedProjectId.value);
  locations.value = normalizeResults(response.data);
  const queryLocation = Number(route.query.location || 0);
  if (queryLocation && locations.value.some((location) => location.id === queryLocation)) {
    selectedLocationId.value = queryLocation;
  }
  if (!selectedLocationId.value && locations.value.length) selectedLocationId.value = locations.value[0].id;
}

async function loadVersionsForLocation() {
  if (!selectedLocationId.value) return;
  const response = await listVersions(selectedLocationId.value);
  versions.value = normalizeResults(response.data);
  const queryVersion = Number(route.query.version || 0);
  if (queryVersion && versions.value.some((item) => item.id === queryVersion)) {
    selectedVersionId.value = queryVersion;
    return;
  }
  const published = versions.value.find((item) => item.status === 'published');
  selectedVersionId.value = published?.id || versions.value[0]?.id || '';
}

async function loadVersionDetail() {
  if (!selectedLocationId.value || !selectedVersionId.value) return;
  errorMessage.value = '';
  try {
    const response = await getVersion(selectedLocationId.value, selectedVersionId.value);
    applyTourPayload(response.data);
    await tryPlayBackgroundAudio();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not load version.';
  }
}

async function loadPublishedTourByToken(publicToken) {
  if (!publicToken) return false;
  const response = await getPublicTour(publicToken);
  applyTourPayload(response.data);
  await tryPlayBackgroundAudio();
  return true;
}

async function loadPublishedFallback() {
  const response = await listPublishedTours();
  const tours = normalizeResults(response.data);
  const queryProject = Number(route.query.project || 0);
  const queryLocation = Number(route.query.location || 0);
  const queryVersion = Number(route.query.version || 0);
  const queryToken = String(route.query.token || route.query.public_token || '');

  const matchedTour = queryToken
    ? tours.find((tour) => tour.public_token === queryToken)
    : tours.find((tour) => (
      (!queryProject || Number(tour.project_id) === queryProject)
      && (!queryLocation || Number(tour.location_id) === queryLocation)
      && (!queryVersion || Number(tour.version_id) === queryVersion)
    ));

  if (!matchedTour) {
    throw new Error('No published tour matches this URL.');
  }

  projects.value = uniqueBy(tours.map((tour) => ({
    id: tour.project_id,
    name: tour.project_name,
  })), (item) => item.id);
  selectedProjectId.value = matchedTour.project_id;

  locations.value = uniqueBy(
    tours
      .filter((tour) => Number(tour.project_id) === Number(selectedProjectId.value))
      .map((tour) => ({
        id: tour.location_id,
        name: tour.location_name,
      })),
    (item) => item.id,
  );
  selectedLocationId.value = matchedTour.location_id;

  versions.value = tours
    .filter((tour) => Number(tour.location_id) === Number(selectedLocationId.value))
    .map((tour) => ({
      id: tour.version_id,
      version_number: tour.version_number,
      label: tour.version_label,
      status: 'published',
      public_token: tour.public_token,
    }));
  selectedVersionId.value = matchedTour.version_id;

  await loadPublishedTourByToken(matchedTour.public_token);
}

async function changeProject() {
  selectedLocationId.value = '';
  selectedVersionId.value = '';
  locations.value = [];
  versions.value = [];
  scenes.value = [];
  await loadLocation();
  await loadVersionsForLocation();
  await loadVersionDetail();
}

async function changeLocation() {
  selectedVersionId.value = '';
  versions.value = [];
  scenes.value = [];
  await loadVersionsForLocation();
  await loadVersionDetail();
}

function goToScene(sceneId) {
  activeSceneId.value = sceneId;
  sidebarOpen.value = false;
  selectedPointHotspot.value = null;
}

function goNext() {
  if (!scenes.value.length) return;
  const nextIndex = (activeSceneIndex.value + 1) % scenes.value.length;
  goToScene(scenes.value[nextIndex].id);
}

function goPrev() {
  if (!scenes.value.length) return;
  const prevIndex = (activeSceneIndex.value - 1 + scenes.value.length) % scenes.value.length;
  goToScene(scenes.value[prevIndex].id);
}

function getNextSceneId() {
  if (scenes.value.length <= 1) return '';
  const currentIndex = activeSceneIndex.value >= 0 ? activeSceneIndex.value : 0;
  return scenes.value[(currentIndex + 1) % scenes.value.length]?.id || '';
}

function playHotspotAudio(hotspot) {
  const audioUrl = resolveUrl(hotspot.audio_url || hotspot.audio || '');
  if (!audioUrl) return;
  hotspotAudioPlayer?.pause();
  hotspotAudioPlayer = new Audio(audioUrl);
  hotspotAudioPlayer.play().catch(() => {
    errorMessage.value = 'Could not play hotspot audio.';
  });
}

function onHotspotClick(hotspot) {
  selectedPointHotspot.value = null;
  playHotspotAudio(hotspot);
  const targetId = hotspot.target_scene_id;
  if (targetId && scenes.value.some((scene) => scene.id === targetId)) {
    goToScene(targetId);
    return;
  }

  if (!['nav', 'point'].includes(hotspot.type)) return;

  const fallbackSceneId = getNextSceneId();
  if (fallbackSceneId) {
    goToScene(fallbackSceneId);
  }
}

function updateViewState(value) {
  viewState.lon = value.lon;
  viewState.lat = value.lat;
  viewState.fov = value.fov;
}

async function boot() {
  errorMessage.value = '';

  if (route.query.token || route.query.public_token || route.query.project || route.query.location || route.query.version) {
    try {
      await loadPublishedFallback();
      errorMessage.value = '';
      if (scenes.value.length) return;
    } catch (error) {
      errorMessage.value = error.response?.data?.detail
        || error.message
        || 'Could not load published tour data.';
    }
  }

  try {
    await loadProject();
    await loadLocation();
    await loadVersionsForLocation();
    await loadVersionDetail();

    if (scenes.value.length) return;
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not load private tour data.';
  }

  try {
    await loadPublishedFallback();
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = error.response?.data?.detail
      || error.message
      || 'Could not load published tour data.';
  }
}

function goBack() {
  if (window.history.length > 1) {
    router.back();
    return;
  }
  router.push('/');
}

onMounted(boot);

onBeforeUnmount(() => {
  hotspotAudioPlayer?.pause();
  hotspotAudioPlayer = null;
  backgroundAudioPlayer?.pause();
  backgroundAudioPlayer = null;
});
</script>

<template>
  <section class="tour-viewer-page" @pointerdown.capture="onViewerFirstInteraction">
    <div class="viewer-topbar">
      <button class="viewer-icon-button" type="button" @click="goBack">←</button>
      <button class="viewer-icon-button" type="button" @click="sidebarOpen = true">☰</button>
      <div class="viewer-brand">VR360 TOUR VIEWER</div>
      <div class="viewer-selects">
        <select v-model="selectedProjectId" @change="changeProject">
          <option value="">Project</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>
        <select v-model="selectedLocationId" @change="changeLocation">
          <option value="">Location</option>
          <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
        </select>
        <select v-model="selectedVersionId" @change="loadVersionDetail">
          <option value="">Version</option>
          <option v-for="item in versions" :key="item.id" :value="item.id">v{{ item.version_number }} - {{ item.status }}</option>
        </select>
      </div>
    </div>

    <div class="viewer-scene-badge">{{ activeScene?.name || 'Chua co scene' }}</div>
    <p v-if="errorMessage" class="viewer-error">{{ errorMessage }}</p>

    <PanoramaViewer
      class="tour-panorama"
      :image-url="sceneImage"
      :hotspots="displayHotspots"
      :initial-view="activeInitialView"
      :point-hotspot-logo="pointHotspotLogoUrl"
      auto-rotate
      :auto-rotate-delay="3000"
      :auto-rotate-speed="3"
      hotspot-display-mode="viewer"
      @hotspot-click="onHotspotClick"
      @view-change="updateViewState"
    />

    <button
      v-if="backgroundAudioUrl"
      class="viewer-background-audio"
      type="button"
      :title="backgroundAudioBlocked ? 'Click to play background audio' : 'Toggle background audio'"
      @click.stop="toggleBackgroundAudio"
    >
      <span>{{ backgroundAudioPlaying ? '♪' : '▶' }}</span>
      <small>{{ backgroundAudioBlocked ? 'Click to play audio' : 'Music' }}</small>
    </button>

    <div v-if="selectedPointHotspot" class="viewer-point-card">
      <button class="viewer-point-close" type="button" @click="selectedPointHotspot = null">×</button>
      <span
        v-if="selectedPointHotspot.preview_image"
        class="viewer-point-card-image"
        :style="{ backgroundImage: `url(${selectedPointHotspot.preview_image})` }"
      ></span>
      <div>
        <small>POINT</small>
        <strong>{{ selectedPointHotspot.label || 'Hotspot' }}</strong>
        <p>{{ activeScene?.description || 'Point info trong tour 360.' }}</p>
      </div>
    </div>

    <aside class="viewer-sidebar" :class="{ open: sidebarOpen }">
      <div class="viewer-sidebar-header">
        <strong>{{ version?.label || 'Tour scenes' }}</strong>
        <button type="button" @click="sidebarOpen = false">×</button>
      </div>
      <div class="viewer-sidebar-body">
        <div v-for="scene in scenes" :key="scene.id" class="viewer-nav-item" :class="{ active: scene.id === activeSceneId }" @click="goToScene(scene.id)">
          <span class="viewer-nav-thumb" :style="resolveSceneImage(scene) ? { backgroundImage: `url(${resolveSceneImage(scene)})` } : {}"></span>
          <span>
            <strong>{{ scene.name }}</strong>
            <small>{{ scene.group }}</small>
          </span>
        </div>
      </div>
    </aside>

    <div class="viewer-left-toolbar">
      <button type="button" title="Scenes" @click="sidebarOpen = true">☰</button>
      <button type="button" title="Thumbnails" @click="thumbsOpen = !thumbsOpen">▦</button>
      <button type="button" title="Fullscreen" @click="document.documentElement.requestFullscreen?.()">⛶</button>
    </div>

    <div class="viewer-bottom-bar">
      <button type="button" @click="goPrev">‹</button>
      <button type="button" @click="goNext">›</button>
      <span>LON {{ viewState.lon }}°</span>
      <span>LAT {{ viewState.lat }}°</span>
      <span>FOV {{ viewState.fov }}°</span>
    </div>

    <div class="viewer-thumbs" :class="{ show: thumbsOpen && scenes.length }">
      <button
        v-for="scene in scenes"
        :key="scene.id"
        class="viewer-thumb-item"
        :class="{ active: scene.id === activeSceneId }"
        type="button"
        @click="goToScene(scene.id)"
      >
        <span :style="resolveSceneImage(scene) ? { backgroundImage: `url(${resolveSceneImage(scene)})` } : {}"></span>
        <small>{{ scene.name }}</small>
      </button>
    </div>
  </section>
</template>
