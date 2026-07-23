<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import PanoramaViewer from '../components/PanoramaViewer.vue';
import { apiBaseURL } from '../api/http';
import { listProjectLocations } from '../api/locationsApi';
import { listPublishedTours } from '../api/publishedToursApi';
import { listProjects } from '../api/projectsApi';
import { getPublicTour } from '../api/publicApi';
import { getVersion, listVersions } from '../api/toursApi';
import { useAuthStore } from '../stores/authStore';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const projects = ref([]);
const locations = ref([]);
const versions = ref([]);
const publishedTours = ref([]);
const selectedProjectId = ref('');
const selectedLocationId = ref('');
const selectedVersionId = ref('');
const version = ref(null);
const scenes = ref([]);
const panoramaRef = ref(null);
const activeSceneId = ref('');
const sidebarOpen = ref(false);
const thumbsOpen = ref(true);
const errorMessage = ref('');
const selectedPointHotspot = ref(null);
const isTransitioning = ref(false);
const transitionMessage = ref('');
const backgroundAudioPlaying = ref(false);
const backgroundAudioBlocked = ref(false);
const sceneAudioBlocked = ref(false);
const selectedInfoHotspot = ref(null);
const viewState = reactive({ lon: 0, lat: 0, fov: 75 });
let hotspotAudioPlayer = null;
let backgroundAudioPlayer = null;
let sceneAudioPlayer = null;

const activeScene = computed(() => scenes.value.find((scene) => scene.id === activeSceneId.value) || null);
const isPublicViewerMode = computed(() => !auth.isAuthenticated || auth.isGuest);
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
      preview_image:
        ['info', 'info_area'].includes(hotspot.type)
          ? resolveUrl(hotspot.info?.image_url || hotspot.image_url || '') || resolveSceneImage(targetScene || scene)
          : resolveSceneImage(targetScene || scene),
      audio_url: resolveUrl(hotspot.audio_url || hotspot.audio || ''),
      info: {
        title: hotspot.info?.title || hotspot.info_title || hotspot.label || '',
        description: hotspot.info?.description || hotspot.info_description || hotspot.description || '',
        image_url: resolveUrl(hotspot.info?.image_url || hotspot.info_image_url || hotspot.image_url || ''),
        video_url: resolveUrl(hotspot.info?.video_url || hotspot.info_video_url || hotspot.video_url || ''),
        youtube_url: hotspot.info?.youtube_url || hotspot.info_youtube_url || hotspot.youtube_url || '',
      },
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
  return resolveUrl(scene.optimized_file || scene.original_file || scene.image_url || scene.preview_file || scene.thumbnail || scene.thumb || scene.panorama || '');
}

function youtubeEmbedUrl(url) {
  if (!url) return '';
  const value = String(url).trim();
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/i,
    /youtu\.be\/([^?&]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i,
    /youtube\.com\/shorts\/([^?&/]+)/i,
  ];
  const match = patterns.map((pattern) => value.match(pattern)).find(Boolean);
  return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : '';
}

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function preloadImage(url) {
  if (!url) return Promise.resolve();
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = url;
  });
}

function disposeAudio(player) {
  if (!player) return;
  try {
    player.pause();
    player.currentTime = 0;
    player.removeAttribute('src');
    player.load();
  } catch {
    // Audio cleanup should never block changing tour/scene.
  }
}

function stopHotspotAudio() {
  disposeAudio(hotspotAudioPlayer);
  hotspotAudioPlayer = null;
}

function stopSceneAudio() {
  disposeAudio(sceneAudioPlayer);
  sceneAudioPlayer = null;
  sceneAudioBlocked.value = false;
}

function stopBackgroundAudio() {
  disposeAudio(backgroundAudioPlayer);
  backgroundAudioPlayer = null;
  backgroundAudioPlaying.value = false;
  backgroundAudioBlocked.value = false;
}

function stopTourAudio() {
  stopHotspotAudio();
  stopSceneAudio();
  stopBackgroundAudio();
}

function normalizeScene(scene, index = 0) {
  return {
    id: String(scene.id || scene.key || scene.scene_key || `scene-${index + 1}`),
    name: scene.name || scene.title || `Scene ${index + 1}`,
    group: scene.group || 'Default',
    description: scene.description || scene.info || '',
    audio_url: scene.audio_url || scene.audio || scene.entry_audio_url || scene.narration_audio || '',
    image_url: scene.image_url || '',
    optimized_file: scene.optimized_file || '',
    preview_file: scene.preview_file || '',
    original_file: scene.original_file || '',
    thumbnail: scene.thumbnail || scene.thumb || scene.thumbnail_file || scene.preview_file || scene.optimized_file || scene.original_file || scene.image_url || '',
    thumbnail_file: scene.thumbnail_file || '',
    view: {
      lon: Number(scene.view?.lon ?? scene.initialView?.lon ?? scene.lon ?? 0),
      lat: Number(scene.view?.lat ?? scene.initialView?.lat ?? scene.lat ?? 0),
      fov: Number(scene.view?.fov ?? scene.initialView?.fov ?? scene.fov ?? 75),
    },
    hotspots: (scene.hotspots || []).map((hotspot, hotspotIndex) => ({
      id: String(hotspot.id || `hotspot-${index + 1}-${hotspotIndex + 1}`),
      label: hotspot.label || hotspot.title || `Hotspot ${hotspotIndex + 1}`,
      type: ['nav', 'point', 'info', 'info_area'].includes(hotspot.type) ? hotspot.type : hotspot.type === 'navigate' ? 'nav' : 'point',
      target_scene_id: String(hotspot.target_scene_id || hotspot.target || hotspot.scene_id || ''),
      lon: Number(hotspot.lon ?? 0),
      lat: Number(hotspot.lat ?? 0),
      x: Number(hotspot.x ?? 50),
      y: Number(hotspot.y ?? 50),
      audio_url: hotspot.audio_url || hotspot.audio || '',
      area_points: Array.isArray(hotspot.area_points)
        ? hotspot.area_points.map((point) => ({
          lon: Number(point.lon ?? 0),
          lat: Number(point.lat ?? 0),
          x: Number(point.x ?? 50),
          y: Number(point.y ?? 50),
        }))
        : [],
      info: {
        title: hotspot.info?.title || hotspot.info_title || '',
        description: hotspot.info?.description || hotspot.info_description || hotspot.description || '',
        image_url: hotspot.info?.image_url || hotspot.info_image_url || hotspot.image_url || '',
        video_url: hotspot.info?.video_url || hotspot.info_video_url || hotspot.video_url || '',
        youtube_url: hotspot.info?.youtube_url || hotspot.info_youtube_url || hotspot.youtube_url || '',
      },
      glow: hotspot.glow ?? hotspot.style?.glow ?? true,
    })),
  };
}

function normalizeTourData(data) {
  const source = data?.TOUR_DATA || data?.tour_data || data?.data || data || {};
  const sceneList = source.scenes || source.SCENES || [];
  return Array.isArray(sceneList) ? sceneList.map(normalizeScene) : [];
}

function applyTourPayload(payload) {
  stopTourAudio();
  version.value = payload.version || payload;
  scenes.value = normalizeTourData(payload.data || payload);
  activeSceneId.value = scenes.value[0]?.id || '';
  selectedInfoHotspot.value = null;
}

function getSceneAudioUrl(scene) {
  if (!scene) return '';
  const sceneAudio = scene.audio_url || scene.audio || scene.entry_audio_url || scene.narration_audio || '';
  if (sceneAudio) return resolveUrl(sceneAudio);
  const firstHotspotAudio = (scene.hotspots || []).find((hotspot) => hotspot.audio_url || hotspot.audio);
  return firstHotspotAudio ? resolveUrl(firstHotspotAudio.audio_url || firstHotspotAudio.audio) : '';
}

async function tryPlayBackgroundAudio() {
  if (!backgroundAudioUrl.value) {
    stopBackgroundAudio();
    return;
  }
  if (!backgroundAudioPlayer || backgroundAudioPlayer.src !== backgroundAudioUrl.value) {
    stopBackgroundAudio();
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
  if (sceneAudioBlocked.value) {
    playActiveSceneAudio();
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

async function loadPublishedCatalog() {
  if (publishedTours.value.length) return publishedTours.value;
  const response = await listPublishedTours();
  publishedTours.value = normalizeResults(response.data);
  return publishedTours.value;
}

function syncPublishedDropdowns(matchedTour = null) {
  const tours = publishedTours.value;
  projects.value = uniqueBy(
    tours.map((tour) => ({
      id: tour.project_id,
      name: tour.project_name,
    })),
    (item) => item.id,
  );

  if (matchedTour) selectedProjectId.value = matchedTour.project_id;
  if (!selectedProjectId.value && projects.value.length) selectedProjectId.value = projects.value[0].id;

  locations.value = uniqueBy(
    tours
      .filter((tour) => Number(tour.project_id) === Number(selectedProjectId.value))
      .map((tour) => ({
        id: tour.location_id,
        name: tour.location_name,
      })),
    (item) => item.id,
  );

  if (matchedTour) selectedLocationId.value = matchedTour.location_id;
  if (!locations.value.some((location) => Number(location.id) === Number(selectedLocationId.value))) {
    selectedLocationId.value = locations.value[0]?.id || '';
  }

  versions.value = tours
    .filter((tour) => Number(tour.location_id) === Number(selectedLocationId.value))
    .map((tour) => ({
      id: tour.version_id,
      version_number: tour.version_number,
      label: tour.version_label,
      status: 'published',
      public_token: tour.public_token,
    }));

  if (matchedTour) selectedVersionId.value = matchedTour.version_id;
  if (!versions.value.some((item) => Number(item.id) === Number(selectedVersionId.value))) {
    selectedVersionId.value = versions.value[0]?.id || '';
  }
}

async function loadSelectedPublishedTour() {
  await loadPublishedCatalog();
  syncPublishedDropdowns();
  const matchedTour = publishedTours.value.find((tour) => (
    Number(tour.project_id) === Number(selectedProjectId.value)
    && Number(tour.location_id) === Number(selectedLocationId.value)
    && Number(tour.version_id) === Number(selectedVersionId.value)
  )) || publishedTours.value.find((tour) => Number(tour.version_id) === Number(selectedVersionId.value));

  if (!matchedTour) {
    errorMessage.value = 'No published tour selected.';
    scenes.value = [];
    return;
  }

  syncPublishedDropdowns(matchedTour);
  await loadPublishedTourByToken(matchedTour.public_token);
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
  if (isPublicViewerMode.value) {
    await loadSelectedPublishedTour();
    return;
  }
  errorMessage.value = '';
  stopTourAudio();
  try {
    const response = await getVersion(selectedLocationId.value, selectedVersionId.value);
    applyTourPayload(response.data);
    await playActiveSceneAudio();
    await tryPlayBackgroundAudio();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not load version.';
  }
}

async function loadPublishedTourByToken(publicToken) {
  if (!publicToken) return false;
  stopTourAudio();
  const response = await getPublicTour(publicToken);
  applyTourPayload(response.data);
  await playActiveSceneAudio();
  await tryPlayBackgroundAudio();
  return true;
}

async function loadPublishedFallback() {
  const tours = await loadPublishedCatalog();
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

  syncPublishedDropdowns(matchedTour);

  await loadPublishedTourByToken(matchedTour.public_token);
}

async function changeProject() {
  stopTourAudio();
  selectedPointHotspot.value = null;
  selectedInfoHotspot.value = null;
  if (isPublicViewerMode.value) {
    selectedLocationId.value = '';
    selectedVersionId.value = '';
    scenes.value = [];
    syncPublishedDropdowns();
    await loadSelectedPublishedTour();
    return;
  }
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
  stopTourAudio();
  selectedPointHotspot.value = null;
  selectedInfoHotspot.value = null;
  if (isPublicViewerMode.value) {
    selectedVersionId.value = '';
    scenes.value = [];
    syncPublishedDropdowns();
    await loadSelectedPublishedTour();
    return;
  }
  selectedVersionId.value = '';
  versions.value = [];
  scenes.value = [];
  await loadVersionsForLocation();
  await loadVersionDetail();
}

async function playActiveSceneAudio() {
  stopSceneAudio();
  const audioUrl = getSceneAudioUrl(activeScene.value);
  if (!audioUrl) {
    sceneAudioBlocked.value = false;
    return;
  }
  sceneAudioPlayer = new Audio(audioUrl);
  try {
    await sceneAudioPlayer.play();
    sceneAudioBlocked.value = false;
  } catch {
    sceneAudioBlocked.value = true;
  }
}

async function goToScene(sceneId, options = {}) {
  if (!sceneId || isTransitioning.value) return;
  const targetScene = scenes.value.find((scene) => scene.id === sceneId);
  if (!targetScene) return;
  const isSameScene = sceneId === activeSceneId.value;
  if (isSameScene && !options.force) return;

  isTransitioning.value = true;
  transitionMessage.value = targetScene.name || 'Loading scene';
  selectedPointHotspot.value = null;
  selectedInfoHotspot.value = null;
  stopHotspotAudio();
  stopSceneAudio();

  const targetImageUrl = resolveSceneImage(targetScene);
  const entryView = options.targetView || targetScene.view || targetScene.initialView || { lon: 0, lat: 0, fov: 75 };

  try {
    await preloadImage(targetImageUrl);
    activeSceneId.value = sceneId;
    sidebarOpen.value = false;
    await nextTick();
    await panoramaRef.value?.animateToView?.(entryView, 180);
    await playActiveSceneAudio();
  } finally {
    await sleep(80);
    isTransitioning.value = false;
    transitionMessage.value = '';
  }
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
  stopHotspotAudio();
  hotspotAudioPlayer = new Audio(audioUrl);
  hotspotAudioPlayer.play().catch(() => {
    // Some browsers reject overlapping/autoplay audio promises even when another tour audio is playing.
    // Keep viewer clean; the next user interaction can play audio again.
  });
}

async function onHotspotClick(hotspot) {
  if (isTransitioning.value) return;
  errorMessage.value = '';
  selectedPointHotspot.value = null;
  selectedInfoHotspot.value = null;

  if (['info', 'info_area'].includes(hotspot.type)) {
    selectedInfoHotspot.value = hotspot;
    playHotspotAudio(hotspot);
    return;
  }

  playHotspotAudio(hotspot);
  const targetId = hotspot.target_scene_id;
  if (targetId && scenes.value.some((scene) => scene.id === targetId)) {
    await goToScene(targetId, {
      hotspot,
      targetView: hotspot.target_view || hotspot.view,
    });
    return;
  }

  if (!['nav', 'point'].includes(hotspot.type)) return;

  const fallbackSceneId = getNextSceneId();
  if (fallbackSceneId) {
    await goToScene(fallbackSceneId, { hotspot });
  }
}

function updateViewState(value) {
  viewState.lon = value.lon;
  viewState.lat = value.lat;
  viewState.fov = value.fov;
}

async function boot() {
  errorMessage.value = '';
  const hasPublicToken = Boolean(route.query.token || route.query.public_token);
  const hasPrivateSelection = Boolean(route.query.project || route.query.location || route.query.version);

  if (isPublicViewerMode.value) {
    try {
      await loadPublishedFallback();
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = error.response?.data?.detail
        || error.message
        || 'Could not load published tour data.';
    }
    return;
  }

  if (hasPublicToken) {
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

  if (!hasPublicToken || hasPrivateSelection) {
    try {
      await loadProject();
      await loadLocation();
      await loadVersionsForLocation();
      await loadVersionDetail();

      if (scenes.value.length || projects.value.length) return;
    } catch (error) {
      errorMessage.value = error.response?.data?.detail || 'Could not load private tour data.';
    }
  }

  if (!hasPrivateSelection) {
    try {
      await loadPublishedFallback();
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = error.response?.data?.detail
        || error.message
        || 'Could not load published tour data.';
    }
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

onBeforeUnmount(stopTourAudio);
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
      ref="panoramaRef"
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

    <div class="viewer-transition-overlay" :class="{ active: isTransitioning }">
      <div class="viewer-transition-card">
        <span></span>
        <strong>{{ transitionMessage || 'Loading scene' }}</strong>
      </div>
    </div>

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

    <div
      v-if="selectedInfoHotspot"
      class="viewer-info-modal-backdrop"
      @click.self="selectedInfoHotspot = null"
    >
      <article class="viewer-info-modal">
        <button class="viewer-info-close" type="button" @click="selectedInfoHotspot = null">×</button>
        <div v-if="youtubeEmbedUrl(selectedInfoHotspot.info?.youtube_url)" class="viewer-info-media">
          <iframe
            :src="youtubeEmbedUrl(selectedInfoHotspot.info.youtube_url)"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <video
          v-else-if="selectedInfoHotspot.info?.video_url"
          class="viewer-info-video"
          :src="selectedInfoHotspot.info.video_url"
          controls
          playsinline
        ></video>
        <span
          v-else-if="selectedInfoHotspot.info?.image_url"
          class="viewer-info-image"
          :style="{ backgroundImage: `url(${selectedInfoHotspot.info.image_url})` }"
        ></span>
        <small>INFO HOTSPOT</small>
        <h2>{{ selectedInfoHotspot.info?.title || selectedInfoHotspot.label || 'Information' }}</h2>
        <p>
          {{
            selectedInfoHotspot.info?.description ||
            selectedInfoHotspot.description ||
            'No information has been added for this hotspot yet.'
          }}
        </p>
      </article>
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
