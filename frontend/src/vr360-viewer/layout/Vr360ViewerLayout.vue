<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

import PanoramaViewer from '../components/PanoramaViewer.vue';
import { createAudioController } from '../common/controllers/audioController.js';
import { createFullscreenController } from '../common/controllers/fullscreen.js';
import { normalizeTour, runtimeHotspotForViewer } from '../common/mapper/normalizeTour.js';
import { youtubeEmbedUrl } from '../common/utils/media.js';
import '../assets/viewer.css';

const props = defineProps({
  tour: { type: Object, default: null },
  options: { type: Object, default: () => ({}) },
});
const emit = defineEmits(['ready', 'scene-change', 'hotspot-click', 'load-progress', 'load-complete', 'error', 'back']);

const root = ref(null);
const panorama = ref(null);
const runtimeTour = ref(normalizeTour({}, props.options));
const activeSceneId = ref('');
const sidebarOpen = ref(false);
const thumbsOpen = ref(true);
const selectedInfoHotspot = ref(null);
const isTransitioning = ref(false);
const transitionMessage = ref('');
const errorMessage = ref('');
const viewState = ref({ lon: 0, lat: 0, fov: 75 });
const autoRotate = ref(props.options.autoRotate ?? true);
const backgroundAudioPlaying = ref(false);
const backgroundAudioBlocked = ref(false);
const sceneAudioBlocked = ref(false);
const hasEmittedReady = ref(false);
const audio = createAudioController();
const fullscreen = createFullscreenController(() => root.value);

const scenes = computed(() => runtimeTour.value.scenes);
const activeScene = computed(() => scenes.value.find((scene) => scene.id === activeSceneId.value) || null);
const activeSceneIndex = computed(() => scenes.value.findIndex((scene) => scene.id === activeSceneId.value));
const displayHotspots = computed(() => (activeScene.value?.hotspots || []).map((hotspot) => runtimeHotspotForViewer(hotspot, scenes.value, activeScene.value)));
const pointHotspotLogo = computed(() => runtimeTour.value.pointHotspotLogo);

function error(phase, cause) {
  errorMessage.value = cause?.message || String(cause || 'Viewer error.');
  emit('error', { phase, cause, message: errorMessage.value });
}

async function playSceneAudio() {
  const result = await audio.playScene(activeScene.value?.narration.url || '');
  sceneAudioBlocked.value = result.blocked;
}

async function playBackgroundAudio() {
  const result = await audio.playBackground(runtimeTour.value.backgroundMusic.url);
  backgroundAudioPlaying.value = result.playing;
  backgroundAudioBlocked.value = result.blocked;
}

async function applyTour(payload) {
  audio.stopAll();
  emit('load-progress', { phase: 'normalize' });
  runtimeTour.value = normalizeTour(payload || {}, props.options);
  activeSceneId.value = runtimeTour.value.initialSceneId;
  selectedInfoHotspot.value = null;
  await nextTick();
  await playSceneAudio();
  await playBackgroundAudio();
  if (!hasEmittedReady.value) {
    hasEmittedReady.value = true;
    emit('ready', { tour: runtimeTour.value });
  }
  emit('load-complete', { scope: 'tour', tour: runtimeTour.value });
}

async function goToScene(sceneId, options = {}) {
  const target = scenes.value.find((scene) => scene.id === sceneId);
  if (!target || isTransitioning.value || (target.id === activeSceneId.value && !options.force)) return;
  const previousSceneId = activeSceneId.value;
  isTransitioning.value = true;
  transitionMessage.value = target.name;
  selectedInfoHotspot.value = null;
  try {
    emit('load-progress', { phase: 'scene', sceneId: target.id });
    activeSceneId.value = target.id;
    sidebarOpen.value = false;
    await nextTick();
    await panorama.value?.animateToView?.(options.targetView || target.initialView, 180);
    await playSceneAudio();
    emit('scene-change', { previousSceneId, sceneId: target.id, source: options.source || 'api' });
    emit('load-complete', { scope: 'scene', scene: target });
  } catch (cause) {
    error('scene-change', cause);
  } finally {
    window.setTimeout(() => { isTransitioning.value = false; transitionMessage.value = ''; }, 80);
  }
}

function nextScene() {
  if (!scenes.value.length) return;
  goToScene(scenes.value[(activeSceneIndex.value + 1) % scenes.value.length].id, { source: 'next' });
}

function previousScene() {
  if (!scenes.value.length) return;
  goToScene(scenes.value[(activeSceneIndex.value - 1 + scenes.value.length) % scenes.value.length].id, { source: 'previous' });
}

function onHotspotClick(hotspot, event) {
  emit('hotspot-click', { hotspot, event });
  if (['info', 'info_area'].includes(hotspot.type)) {
    selectedInfoHotspot.value = hotspot;
    audio.playHotspot(hotspot.audio_url);
    return;
  }
  audio.playHotspot(hotspot.audio_url);
  if (hotspot.target_scene_id) goToScene(hotspot.target_scene_id, { targetView: hotspot.target_view, source: 'hotspot' });
  else if (['nav', 'point'].includes(hotspot.type) && scenes.value.length > 1) nextScene();
}

function onInteraction() {
  if (backgroundAudioBlocked.value) playBackgroundAudio();
  if (sceneAudioBlocked.value) playSceneAudio();
}

function toggleAutorotate(force) {
  autoRotate.value = typeof force === 'boolean' ? force : !autoRotate.value;
  return autoRotate.value;
}

function resetView() { return panorama.value?.animateToView?.(activeScene.value?.initialView || {}, 180); }
function getView() { return panorama.value?.getView?.() || viewState.value; }
function setView(view, options = {}) { return options.animate ? panorama.value?.animateToView?.(view, options.duration) : panorama.value?.setView?.(view); }
function enterFullscreen() { return fullscreen.enterFullscreen(); }
function exitFullscreen() { return fullscreen.exitFullscreen(); }
function dispose() { audio.dispose(); panorama.value?.dispose?.(); }

watch(() => props.tour, (payload) => applyTour(payload).catch((cause) => error('tour-load', cause)), { immediate: true, deep: false });
onBeforeUnmount(dispose);

defineExpose({ goToScene, nextScene, previousScene, getView, setView, resetView, toggleAutorotate, enterFullscreen, exitFullscreen, dispose });
</script>

<template>
  <section ref="root" class="tour-viewer-page" @pointerdown.capture="onInteraction">
    <header v-if="options.showTopbar !== false" class="viewer-topbar">
      <button class="viewer-icon-button" type="button" @click="$emit('back')">←</button>
      <button class="viewer-icon-button" type="button" @click="sidebarOpen = true">☰</button>
      <div class="viewer-brand">{{ options.brand || 'VR360 TOUR VIEWER' }}</div>
      <slot name="topbar" />
    </header>
    <div class="viewer-scene-badge">{{ activeScene?.name || 'Chưa có scene' }}</div>
    <p v-if="errorMessage" class="viewer-error">{{ errorMessage }}</p>
    <PanoramaViewer ref="panorama" class="tour-panorama" :image-url="activeScene?.imageSources?.[0] || ''" :fallback-image-urls="activeScene?.imageSources?.slice(1) || []" :hotspots="displayHotspots" :initial-view="activeScene?.initialView" :point-hotspot-logo="pointHotspotLogo" :auto-rotate="autoRotate" :auto-rotate-delay="options.autoRotateDelay ?? 3000" :auto-rotate-speed="options.autoRotateSpeed ?? 3" hotspot-display-mode="viewer" @hotspot-click="onHotspotClick" @view-change="viewState = $event" />
    <div class="viewer-transition-overlay" :class="{ active: isTransitioning }"><div class="viewer-transition-card"><span></span><strong>{{ transitionMessage || 'Loading scene' }}</strong></div></div>
    <button v-if="runtimeTour.backgroundMusic.url" class="viewer-background-audio" type="button" @click.stop="backgroundAudioPlaying = audio.toggleBackground()"><span>{{ backgroundAudioPlaying ? '♪' : '▶' }}</span><small>{{ backgroundAudioBlocked ? 'Click to play audio' : 'Music' }}</small></button>
    <div v-if="selectedInfoHotspot" class="viewer-info-modal-backdrop" @click.self="selectedInfoHotspot = null"><article class="viewer-info-modal"><button class="viewer-info-close" type="button" @click="selectedInfoHotspot = null">×</button><div v-if="youtubeEmbedUrl(selectedInfoHotspot.info?.youtube_url)" class="viewer-info-media"><iframe :src="youtubeEmbedUrl(selectedInfoHotspot.info.youtube_url)" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><video v-else-if="selectedInfoHotspot.info?.video_url" class="viewer-info-video" :src="selectedInfoHotspot.info.video_url" controls playsinline></video><span v-else-if="selectedInfoHotspot.info?.image_url" class="viewer-info-image" :style="{ backgroundImage: `url(${selectedInfoHotspot.info.image_url})` }"></span><small>INFO HOTSPOT</small><h2>{{ selectedInfoHotspot.info?.title || selectedInfoHotspot.label }}</h2><p>{{ selectedInfoHotspot.info?.description }}</p></article></div>
    <aside class="viewer-sidebar" :class="{ open: sidebarOpen }"><div class="viewer-sidebar-header"><strong>{{ runtimeTour.title || 'Tour scenes' }}</strong><button type="button" @click="sidebarOpen = false">×</button></div><div class="viewer-sidebar-body"><button v-for="scene in scenes" :key="scene.id" class="viewer-nav-item" :class="{ active: scene.id === activeSceneId }" type="button" @click="goToScene(scene.id, { source: 'gallery' })"><span class="viewer-nav-thumb" :style="scene.thumbnailSource ? { backgroundImage: `url(${scene.thumbnailSource})` } : {}"></span><span><strong>{{ scene.name }}</strong><small>{{ scene.group }}</small></span></button></div></aside>
    <div class="viewer-left-toolbar"><button type="button" title="Scenes" @click="sidebarOpen = true">☰</button><button type="button" title="Thumbnails" @click="thumbsOpen = !thumbsOpen">▦</button><button type="button" title="Fullscreen" @click="enterFullscreen">⛶</button></div>
    <div class="viewer-bottom-bar"><button type="button" @click="previousScene">‹</button><button type="button" @click="nextScene">›</button><span>LON {{ viewState.lon }}°</span><span>LAT {{ viewState.lat }}°</span><span>FOV {{ viewState.fov }}°</span></div>
    <div class="viewer-thumbs" :class="{ show: thumbsOpen && scenes.length }"><button v-for="scene in scenes" :key="scene.id" class="viewer-thumb-item" :class="{ active: scene.id === activeSceneId }" type="button" @click="goToScene(scene.id, { source: 'thumbnail' })"><span :style="scene.thumbnailSource ? { backgroundImage: `url(${scene.thumbnailSource})` } : {}"></span><small>{{ scene.name }}</small></button></div>
  </section>
</template>
