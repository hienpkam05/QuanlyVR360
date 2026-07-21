<script setup>
import { computed, reactive, ref } from "vue";

import PanoramaViewer from "../components/PanoramaViewer.vue";
import { apiBaseURL } from "../api/http";
import { getPublicTour, trackPublicVisit } from "../api/publicApi";

const form = reactive({
  token: "",
  origin: window.location.origin,
});

const tour = ref(null);
const scenes = ref([]);
const activeSceneId = ref("");
const selectedInfoHotspot = ref(null);
const errorMessage = ref("");
const tracked = ref(false);
const viewState = reactive({ lon: 0, lat: 0, fov: 75 });

const activeScene = computed(
  () => scenes.value.find((scene) => scene.id === activeSceneId.value) || null,
);
const activeInitialView = computed(
  () => activeScene.value?.view || { lon: 0, lat: 0, fov: 75 },
);
const sceneImage = computed(() => resolveSceneImage(activeScene.value));
const pointHotspotLogoUrl = computed(() =>
  resolveUrl(tour.value?.version?.hotspot_point_logo || ""),
);
const displayHotspots = computed(() => {
  const scene = activeScene.value;
  if (!scene) return [];
  return (scene.hotspots || []).map((hotspot) => {
    const targetScene = scenes.value.find(
      (item) => item.id === hotspot.target_scene_id,
    );
    return {
      ...hotspot,
      preview_image: ["info", "info_area"].includes(hotspot.type)
        ? resolveUrl(hotspot.info?.image_url || hotspot.image_url || "") ||
          resolveSceneImage(targetScene || scene)
        : resolveSceneImage(targetScene || scene),
      audio_url: resolveUrl(hotspot.audio_url || hotspot.audio || ""),
      info: {
        title: hotspot.info?.title || hotspot.info_title || hotspot.label || "",
        description:
          hotspot.info?.description ||
          hotspot.info_description ||
          hotspot.description ||
          "",
        image_url: resolveUrl(
          hotspot.info?.image_url ||
            hotspot.info_image_url ||
            hotspot.image_url ||
            "",
        ),
      },
    };
  });
});

function resolveUrl(url) {
  if (!url) return "";
  if (url.startsWith("blob:") || url.startsWith("data:") || url.startsWith("http")) {
    return url;
  }
  return `${apiBaseURL}${url.startsWith("/") ? url : `/${url}`}`;
}

function resolveSceneImage(scene) {
  if (!scene) return "";
  return resolveUrl(
    scene.image_url ||
      scene.original_file ||
      scene.thumbnail ||
      scene.thumb ||
      scene.panorama ||
      "",
  );
}

function normalizeScene(scene, index = 0) {
  return {
    id: String(scene.id || scene.key || scene.scene_key || `scene-${index + 1}`),
    name: scene.name || scene.title || `Scene ${index + 1}`,
    group: scene.group || "Default",
    description: scene.description || scene.info || "",
    image_url: scene.image_url || "",
    original_file: scene.original_file || "",
    thumbnail: scene.thumbnail || scene.thumb || scene.original_file || scene.image_url || "",
    view: {
      lon: Number(scene.view?.lon ?? scene.initialView?.lon ?? scene.lon ?? 0),
      lat: Number(scene.view?.lat ?? scene.initialView?.lat ?? scene.lat ?? 0),
      fov: Number(scene.view?.fov ?? scene.initialView?.fov ?? scene.fov ?? 75),
    },
    hotspots: (scene.hotspots || []).map((hotspot, hotspotIndex) => ({
      id: String(hotspot.id || `hotspot-${index + 1}-${hotspotIndex + 1}`),
      label: hotspot.label || hotspot.title || `Hotspot ${hotspotIndex + 1}`,
      type: ["nav", "point", "info", "info_area"].includes(hotspot.type)
        ? hotspot.type
        : hotspot.type === "navigate"
          ? "nav"
          : "point",
      target_scene_id: String(
        hotspot.target_scene_id || hotspot.target || hotspot.scene_id || "",
      ),
      lon: Number(hotspot.lon ?? 0),
      lat: Number(hotspot.lat ?? 0),
      x: Number(hotspot.x ?? 50),
      y: Number(hotspot.y ?? 50),
      audio_url: hotspot.audio_url || hotspot.audio || "",
      area_points: Array.isArray(hotspot.area_points)
        ? hotspot.area_points.map((point) => ({
            lon: Number(point.lon ?? 0),
            lat: Number(point.lat ?? 0),
            x: Number(point.x ?? 50),
            y: Number(point.y ?? 50),
          }))
        : [],
      info: {
        title: hotspot.info?.title || hotspot.info_title || "",
        description:
          hotspot.info?.description ||
          hotspot.info_description ||
          hotspot.description ||
          "",
        image_url:
          hotspot.info?.image_url ||
          hotspot.info_image_url ||
          hotspot.image_url ||
          "",
      },
      glow: hotspot.glow ?? hotspot.style?.glow ?? true,
    })),
  };
}

function normalizeTourScenes(data) {
  const source = data?.TOUR_DATA || data?.tour_data || data?.data || data || {};
  const sceneList = source.scenes || source.SCENES || [];
  return Array.isArray(sceneList) ? sceneList.map(normalizeScene) : [];
}

async function loadTour() {
  errorMessage.value = "";
  tracked.value = false;
  selectedInfoHotspot.value = null;
  try {
    const response = await getPublicTour(form.token, form.origin);
    tour.value = response.data;
    scenes.value = normalizeTourScenes(response.data.data || response.data);
    activeSceneId.value = scenes.value[0]?.id || "";
    await trackVisit();
  } catch (error) {
    tour.value = null;
    scenes.value = [];
    activeSceneId.value = "";
    errorMessage.value =
      error.response?.data?.detail || "Could not load public tour.";
  }
}

async function trackVisit() {
  if (!form.token || tracked.value) return;
  try {
    await trackPublicVisit(
      form.token,
      { country_code: "VN", city: "Ha Noi" },
      form.origin,
    );
    tracked.value = true;
  } catch {
    // Tracking should not block the viewer.
  }
}

function goToScene(sceneId) {
  if (!sceneId) return;
  activeSceneId.value = sceneId;
  selectedInfoHotspot.value = null;
}

function getNextSceneId() {
  if (!scenes.value.length) return "";
  const index = scenes.value.findIndex((scene) => scene.id === activeSceneId.value);
  return scenes.value[(index + 1) % scenes.value.length]?.id || "";
}

function onHotspotClick(hotspot) {
  selectedInfoHotspot.value = null;
  if (["info", "info_area"].includes(hotspot.type)) {
    selectedInfoHotspot.value = hotspot;
    return;
  }

  const targetId = hotspot.target_scene_id;
  if (targetId && scenes.value.some((scene) => scene.id === targetId)) {
    goToScene(targetId);
    return;
  }

  if (["nav", "point"].includes(hotspot.type)) {
    goToScene(getNextSceneId());
  }
}

function updateViewState(value) {
  viewState.lon = value.lon;
  viewState.lat = value.lat;
  viewState.fov = value.fov;
}
</script>

<template>
  <section class="public-tour-viewer">
    <header class="public-viewer-topbar">
      <div>
        <p class="eyebrow">Public</p>
        <h1>Public VR360 Viewer</h1>
      </div>
      <form class="public-viewer-loader" @submit.prevent="loadTour">
        <input v-model="form.token" placeholder="public_token" />
        <input v-model="form.origin" placeholder="Origin" />
        <button class="primary-button" type="submit">Load Tour</button>
      </form>
    </header>

    <p v-if="errorMessage" class="viewer-error">{{ errorMessage }}</p>

    <div class="public-viewer-stage">
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

      <div class="viewer-scene-badge">
        {{ activeScene?.name || "No scene" }}
      </div>

      <div v-if="scenes.length" class="viewer-thumbs public-viewer-thumbs">
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

      <div class="view-meter public-view-meter">
        <span>LON {{ viewState.lon }}°</span>
        <span>LAT {{ viewState.lat }}°</span>
        <span>FOV {{ viewState.fov }}°</span>
      </div>

      <div
        v-if="selectedInfoHotspot"
        class="viewer-info-modal-backdrop"
        @click.self="selectedInfoHotspot = null"
      >
        <article class="viewer-info-modal">
          <button class="viewer-info-close" type="button" @click="selectedInfoHotspot = null">×</button>
          <span
            v-if="selectedInfoHotspot.info?.image_url"
            class="viewer-info-image"
            :style="{ backgroundImage: `url(${selectedInfoHotspot.info.image_url})` }"
          ></span>
          <small>{{ selectedInfoHotspot.type === "info_area" ? "INFO AREA" : "INFO HOTSPOT" }}</small>
          <h2>{{ selectedInfoHotspot.info?.title || selectedInfoHotspot.label || "Information" }}</h2>
          <p>
            {{
              selectedInfoHotspot.info?.description ||
              selectedInfoHotspot.description ||
              "No information has been added for this hotspot yet."
            }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
