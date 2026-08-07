<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch,
} from "vue";

import PanoramaViewer from "../components/PanoramaViewer.vue";
import ScenesSidebar from "../components/ScenesSidebar.vue";
import ViewerPill from "../components/ViewerPill.vue";
import ViewerTopBar from "../components/ViewerTopBar.vue";
import AudioManager from "../common/audio/AudioManager.js";
import { AUDIO_SCOPE } from "../common/audio/constants.js";
import { createAudioStore } from "../common/audio/AudioStore.js";
import { createAudioService } from "../common/audio/audioService.js";
import { createPoiAudioController } from "../common/controllers/PoiAudioController.js";
import { createTourAudioController } from "../common/controllers/TourAudioController.js";
import { createFullscreenController } from "../common/controllers/fullscreen.js";
import { createViewerIntroController, INTRO_PHASE } from "../common/controllers/ViewerIntroController.js";
import { createViewModeManager, VIEW_MODE } from "../common/controllers/viewModeManager.js";
import {
  normalizeTour,
  runtimeHotspotForViewer,
} from "../common/mapper/normalizeTour.js";
import { youtubeEmbedUrl } from "../common/utils/media.js";
import { dispatchPointInteraction } from '../common/registry/pointPluginRegistry.js';
import InfoPoiPopup from '../components/popups/InfoPoiPopup.vue';
import ImageViewerPopup from '../components/popups/ImageViewerPopup.vue';
import VideoPoiPopup from '../components/popups/VideoPoiPopup.vue';
import "../assets/viewer.css";

const props = defineProps({
  tour: { type: Object, default: null },
  options: { type: Object, default: () => ({}) },
});
const emit = defineEmits([
  "ready",
  "scene-change",
  "hotspot-click",
  "load-progress",
  "load-complete",
  "error",
  "back",
  "audio:loaded",
  "audio:play",
  "audio:pause",
  "audio:stop",
  "audio:ended",
  "audio:error",
]);

const root = ref(null);
const panorama = ref(null);
const runtimeTour = ref(normalizeTour({}, props.options));
const activeSceneId = ref("");
const activeBottomPanel = ref(null);
const visitedSceneIds = ref(new Set());
const poiHidden = ref(false);
const activePointPopup = ref(null);
const isTransitioning = ref(false);
const errorMessage = ref("");
const viewState = ref({ lon: 0, lat: 0, fov: 75 });
const autoRotate = ref(props.options.autoRotate ?? true);
const hasEmittedReady = ref(false);
const isFullscreen = ref(false);
const introState = ref({ overlayOpacity: 0 });
const introPhase = ref(INTRO_PHASE.INTRO_ANIMATING);
const introPlayed = ref(false);
const hasCompletedInitialIntro = ref(false);
let navigationGeneration = 0;
let stopFullscreenSync = () => {};
function handleAudioEvent(event) {
  emit(event.type, event);
  if (import.meta.env?.DEV) console.debug('[Audio Viewer]', event.type, event.scope || '', event.source || '');
}

const audioManager = new AudioManager({ onEvent: handleAudioEvent });
const audioStore = createAudioStore(audioManager);
const audioService = createAudioService(audioManager, audioStore);
const poiAudioController = createPoiAudioController({ manager: audioManager });
const tourAudioController = createTourAudioController({ manager: audioManager });

const fullscreen = createFullscreenController(() => root.value);
const intro = createViewerIntroController(props.options.introAnimation);
const viewModeManager = createViewModeManager();
const activeViewMode = ref(VIEW_MODE.NORMAL);
const isViewModeSheetOpen = computed(() => activeBottomPanel.value === 'view');
const isMobileViewport = ref(false);
let mobileViewportQuery;

const scenes = computed(() => runtimeTour.value.scenes);
const hasMultipleScenes = computed(() => scenes.value.length > 1);
const activeScene = computed(
  () => scenes.value.find((scene) => scene.id === activeSceneId.value) || null,
);
const activeSceneIndex = computed(() =>
  scenes.value.findIndex((scene) => scene.id === activeSceneId.value),
);
const activeSceneImageUrl = computed(() => activeScene.value?.imageSources?.[0] || '');
const activeSceneFallbackImageUrls = computed(() => activeScene.value?.imageSources?.slice(1) || []);
const isFirstScene = computed(() => activeSceneIndex.value <= 0);
const isLastScene = computed(() => activeSceneIndex.value < 0 || activeSceneIndex.value >= scenes.value.length - 1);
const introInitialView = computed(() => intro.getInitialFrame(activeScene.value?.initialView || {}));
const viewerUIReady = computed(() => hasCompletedInitialIntro.value);
const displayHotspots = computed(() =>
  (activeScene.value?.hotspots || []).map((hotspot) =>
    runtimeHotspotForViewer(hotspot, scenes.value, activeScene.value),
  ),
);
const visibleHotspots = computed(() => (poiHidden.value ? [] : displayHotspots.value));
const pointHotspotLogo = computed(() => runtimeTour.value.pointHotspotLogo);
const activeAudioPoiId = computed(() => (
  audioStore.state.activeSession.sourceType === 'poi'
  && audioStore.state.activeSession.status === 'playing'
    ? audioStore.state.activeSession.sourceId
    : ''
));
let layoutUpdateCount = 0;

function error(phase, cause) {
  errorMessage.value = cause?.message || String(cause || "Viewer error.");
  emit("error", { phase, cause, message: errorMessage.value });
}

function markSceneVisited(sceneId) {
  if (!sceneId || visitedSceneIds.value.has(sceneId)) return;
  visitedSceneIds.value = new Set(visitedSceneIds.value).add(sceneId);
}

function preloadTourAudio() {
  const tourAudio = runtimeTour.value.narration;
  return tourAudioController.preload(tourAudio, runtimeTour.value.title).catch(() => {});
}

async function playTourAudio() {
  const narration = runtimeTour.value.narration;
  if (!narration?.enabled || !narration.autoplay || !narration.url) return;
  await tourAudioController.play(narration, runtimeTour.value.title);
}

async function applyTour(payload) {
  audioManager.stop();
  emit("load-progress", { phase: "normalize" });
  runtimeTour.value = normalizeTour(payload || {}, props.options);
  activeSceneId.value = runtimeTour.value.initialSceneId;
  viewModeManager.setNormalFov(activeScene.value?.initialView?.fov);
  if (!hasCompletedInitialIntro.value) {
    panorama.value?.resetProjectionIntro?.();
    introPlayed.value = false;
    introPhase.value = INTRO_PHASE.INTRO_ANIMATING;
    introState.value = { overlayOpacity: intro.config.overlayOpacity };
  }
  visitedSceneIds.value = new Set();
  activePointPopup.value = null;
  await nextTick();
  preloadTourAudio();
  await playTourAudio();
  if (!hasEmittedReady.value) {
    hasEmittedReady.value = true;
    emit("ready", { tour: runtimeTour.value });
  }
  emit("load-complete", { scope: "tour", tour: runtimeTour.value });
}

async function goToScene(sceneId, options = {}) {
  const target = scenes.value.find((scene) => scene.id === sceneId);
  if (
    !target ||
    isTransitioning.value ||
    (target.id === activeSceneId.value && !options.force)
  )
    return;
  const generation = ++navigationGeneration;
  const previousSceneId = activeSceneId.value;
  isTransitioning.value = true;
  activePointPopup.value = null;
  if (activeBottomPanel.value === 'view') activeBottomPanel.value = null;
  try {
    emit("load-progress", { phase: "scene", sceneId: target.id });
    audioManager.stop(AUDIO_SCOPE.POI);
    await panorama.value?.preloadTexture?.(target.imageSources?.[0]);
    if (generation !== navigationGeneration) return;
    markSceneVisited(previousSceneId);
    activeSceneId.value = target.id;
    viewModeManager.setNormalFov(target.initialView?.fov);
    await nextTick();
    await panorama.value?.animateToView?.(
      {
        ...(options.targetView || target.initialView),
        fov: viewModeManager.getTargetFov(),
      },
      target.transition?.rotation === false
        ? 0
        : Math.max(
            120,
            Number(target.transition?.speed)
              ? 1200 / Number(target.transition.speed)
              : 180,
          ),
    );
    if (generation !== navigationGeneration) return;
    emit("scene-change", {
      previousSceneId,
      sceneId: target.id,
      source: options.source || "api",
    });
    emit("load-complete", { scope: "scene", scene: target });
  } catch (cause) {
    error("scene-change", cause);
  } finally {
    isTransitioning.value = false;
  }
}

function nextScene() {
  if (!hasMultipleScenes.value || isLastScene.value) return;
  goToScene(scenes.value[activeSceneIndex.value + 1].id, { source: "next" });
}

function previousScene() {
  if (!hasMultipleScenes.value || isFirstScene.value) return;
  goToScene(scenes.value[activeSceneIndex.value - 1].id, { source: "previous" });
}

function onHotspotClick(hotspot, event) {
  if (!viewerUIReady.value) return;
  emit("hotspot-click", { hotspot, event });
  dispatchPointInteraction(hotspot, {
    playAudio: (point) => {
      poiAudioController.play(point);
    },
    navigate: (point) => {
      if (!point.target_scene_id) return;
      goToScene(point.target_scene_id, { targetView: point.target_view, source: 'hotspot' });
    },
    openPopup: (kind, point) => { activePointPopup.value = { kind, point }; },
  });
}

function completeOnboarding() {
  if (introPhase.value !== INTRO_PHASE.WAITING_FOR_FIRST_INTERACTION) return;
  intro.unlock();
}

let onboardingPointer = null;
function onOnboardingPointerDown(event) {
  if (introPhase.value !== INTRO_PHASE.WAITING_FOR_FIRST_INTERACTION) return;
  onboardingPointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
}

function onOnboardingPointerMove(event) {
  if (introPhase.value !== INTRO_PHASE.WAITING_FOR_FIRST_INTERACTION || !onboardingPointer || event.pointerId !== onboardingPointer.id) return;
  if (Math.hypot(event.clientX - onboardingPointer.x, event.clientY - onboardingPointer.y) < 6) return;
  onboardingPointer = null;
  completeOnboarding();
}

function onOnboardingPointerEnd(event) {
  if (event.pointerId === onboardingPointer?.id) onboardingPointer = null;
}

function onInteraction() {
  if (introPhase.value === INTRO_PHASE.WAITING_FOR_FIRST_INTERACTION) return;
  if (!viewerUIReady.value) return;
}

function onOnboardingWheel(event) {
  if (introPhase.value === INTRO_PHASE.WAITING_FOR_FIRST_INTERACTION) {
    event.preventDefault();
    completeOnboarding();
    return;
  }
  onInteraction();
}

function blockIntroKeyboard(event) {
  if (viewerUIReady.value) return;
  event.preventDefault();
  event.stopPropagation();
}

function startIntro() {
  if (hasCompletedInitialIntro.value || introPlayed.value || !activeScene.value) return;
  introPlayed.value = true;
  introPhase.value = INTRO_PHASE.INTRO_ANIMATING;
  introState.value = { overlayOpacity: intro.config.overlayOpacity };
  intro.start({
    view: activeScene.value.initialView,
    onFrame: ({ progress, fov, lon, lat, overlayOpacity }) => {
      introState.value = { overlayOpacity };
      panorama.value?.setIntroState?.({
        fov,
        lon,
        lat,
        progress,
      });
    },
    onWelcome: () => {
      introPhase.value = INTRO_PHASE.WAITING_FOR_FIRST_INTERACTION;
      introState.value = { overlayOpacity: 0 };
    },
    onUnlock: () => {
      introPhase.value = INTRO_PHASE.INTERACTIVE;
      introState.value = { overlayOpacity: 0 };
      hasCompletedInitialIntro.value = true;
    },
  });
}

function onPanoramaTextureReady() {
  startIntro();
}

function toggleAutorotate(force) {
  autoRotate.value = typeof force === "boolean" ? force : !autoRotate.value;
  return autoRotate.value;
}

function resetView() {
  return panorama.value?.animateToView?.(
    activeScene.value?.initialView || {},
    180,
  );
}

function setViewMode(mode) {
  if (!viewerUIReady.value || !Object.values(VIEW_MODE).includes(mode)) return Promise.resolve();
  const currentView = panorama.value?.getView?.();
  if (!currentView) return Promise.resolve();
  activeViewMode.value = viewModeManager.select(mode);
  return panorama.value?.animateToView?.({
    lon: currentView.lon,
    lat: currentView.lat,
    fov: viewModeManager.getTargetFov(),
  }, 400);
}

function openViewModeSheet() {
  if (!viewerUIReady.value) return;
  activeBottomPanel.value = 'view';
}

function closeViewModeSheet() {
  if (activeBottomPanel.value === 'view') activeBottomPanel.value = null;
}

function togglePoi() {
  poiHidden.value = !poiHidden.value;
}

function selectViewMode(mode) {
  setViewMode(mode);
  closeViewModeSheet();
}

function updateMobileViewport(event) {
  isMobileViewport.value = event.matches;
  if (!event.matches) closeViewModeSheet();
}

let viewModeSheetTouchStartY = null;
function onViewModeSheetTouchStart(event) {
  viewModeSheetTouchStartY = event.touches[0]?.clientY ?? null;
}

function onViewModeSheetTouchEnd(event) {
  const endY = event.changedTouches[0]?.clientY;
  if (viewModeSheetTouchStartY !== null && Number.isFinite(endY) && endY - viewModeSheetTouchStartY > 72) closeViewModeSheet();
  viewModeSheetTouchStartY = null;
}
function getView() {
  return panorama.value?.getView?.() || viewState.value;
}
function setView(view, options = {}) {
  return options.animate
    ? panorama.value?.animateToView?.(view, options.duration)
    : panorama.value?.setView?.(view);
}
function enterFullscreen() {
  return fullscreen.enterFullscreen();
}
function exitFullscreen() {
  return fullscreen.exitFullscreen();
}
function toggleFullscreen() {
  return fullscreen.isFullscreen() ? exitFullscreen() : enterFullscreen();
}
function dispose() {
  navigationGeneration += 1;
  intro.cancel();
  onboardingPointer = null;
  mobileViewportQuery?.removeEventListener?.('change', updateMobileViewport);
  window.removeEventListener("keydown", blockIntroKeyboard, true);
  stopFullscreenSync();
  stopFullscreenSync = () => {};
  audioManager.dispose();
  audioStore.dispose();
  panorama.value?.dispose?.();
}

watch(
  () => props.tour,
  (payload) => applyTour(payload).catch((cause) => error("tour-load", cause)),
  { immediate: true, deep: false },
);
onMounted(() => {
  window.addEventListener("keydown", blockIntroKeyboard, true);
  mobileViewportQuery = window.matchMedia('(max-width: 768px)');
  updateMobileViewport(mobileViewportQuery);
  mobileViewportQuery.addEventListener?.('change', updateMobileViewport);
  stopFullscreenSync = fullscreen.subscribe((active) => {
    isFullscreen.value = active;
  });
});
onBeforeUnmount(dispose);
onUpdated(() => {
  layoutUpdateCount += 1;
  if (import.meta.env?.DEV) console.debug('[Viewer Render] ViewerLayout updated()', layoutUpdateCount);
});

defineExpose({
  goToScene,
  nextScene,
  previousScene,
  getView,
  setView,
  resetView,
  toggleAutorotate,
  enterFullscreen,
  exitFullscreen,
  dispose,
});
</script>

<template>
  <section
    ref="root"
    class="tour-viewer-page"
    @pointerdown.capture="onOnboardingPointerDown"
    @pointermove.capture="onOnboardingPointerMove"
    @pointerup.capture="onOnboardingPointerEnd"
    @pointercancel.capture="onOnboardingPointerEnd"
    @pointerdown="onInteraction"
    @wheel.capture="onOnboardingWheel"
    @contextmenu.capture="!viewerUIReady && $event.preventDefault()"
  >
    <div class="viewer-shell">
      <main class="viewer-stage">
        <PanoramaViewer
          ref="panorama"
          v-memo="[activeSceneId, activeSceneImageUrl, activeSceneFallbackImageUrls, visibleHotspots, activeAudioPoiId, introInitialView, activeScene?.transition, pointHotspotLogo, viewerUIReady, autoRotate]"
          class="tour-panorama"
          :image-url="activeSceneImageUrl"
          :fallback-image-urls="activeSceneFallbackImageUrls"
          :hotspots="visibleHotspots"
          :active-audio-poi-id="activeAudioPoiId"
          :initial-view="introInitialView"
          :transition="activeScene?.transition"
          :max-pixel-ratio="options.maxPixelRatio ?? 2"
          :point-hotspot-logo="pointHotspotLogo"
          :auto-rotate="viewerUIReady ? autoRotate : false"
          :auto-rotate-delay="options.autoRotateDelay ?? 3000"
          :auto-rotate-speed="options.autoRotateSpeed ?? 3"
          :interactive="viewerUIReady"
          hotspot-display-mode="viewer"
          @hotspot-click="onHotspotClick"
          @texture-ready="onPanoramaTextureReady"
          @view-change="viewState = $event"
        />
      </main>

      <div class="viewer-overlay" aria-hidden="true"></div>
      <div
        v-if="introPhase === INTRO_PHASE.INTRO_ANIMATING"
        class="viewer-intro-overlay"
        :style="{ opacity: introState.overlayOpacity }"
        aria-hidden="true"
      ></div>
      <div
        v-if="introPhase === INTRO_PHASE.WAITING_FOR_FIRST_INTERACTION"
        class="viewer-intro-welcome"
        role="status"
        aria-live="polite"
      >
        <span class="viewer-intro-welcome-arrow" aria-hidden="true">↑</span>
        <strong>Kéo lên để khám phá</strong>
      </div>
      <div class="viewer-transition-layer">
        <div
          class="viewer-transition-overlay"
          :class="{ active: isTransitioning }"
        >
          <div class="viewer-transition-card">
            <span></span>
          </div>
        </div>
      </div>

      <div v-if="viewerUIReady" class="viewer-hud viewer-presentation-enter">
        <ViewerTopBar
          v-if="options.showTopbar === true"
          :tour-title="runtimeTour.title"
          :scene-title="activeScene?.name || ''"
          :scene-index="activeSceneIndex"
          :scene-count="scenes.length"
          :brand="options.brand || ''"
          :breadcrumb="
            options.breadcrumb || runtimeTour.metadata?.source?.breadcrumb || []
          "
          :loading="isTransitioning"
          :error="Boolean(errorMessage)"
          @back="$emit('back')"
          ><slot name="topbar"
        /></ViewerTopBar>
      </div>
      <ViewerPill
        v-if="viewerUIReady"
        :scene-name="activeScene?.name || ''"
        :scene-index="activeSceneIndex"
        :scene-count="scenes.length"
        :has-multiple-scenes="hasMultipleScenes"
        :is-first-scene="isFirstScene"
        :is-last-scene="isLastScene"
        :is-transitioning="isTransitioning"
        :audio-session="audioStore.state.activeSession"
        :audio-service="audioService"
        @home="resetView"
        @prev="previousScene"
        @next="nextScene"
      />
      <ScenesSidebar
        v-if="viewerUIReady && scenes.length"
        :scenes="scenes"
        :active-scene-id="activeSceneId"
        :visited-scene-ids="visitedSceneIds"
        :auto-rotate="autoRotate"
        :is-fullscreen="isFullscreen"
        :poi-hidden="poiHidden"
        @select-scene="goToScene($event, { source: 'sidebar' })"
        @toggle-autorotate="toggleAutorotate()"
        @toggle-fullscreen="toggleFullscreen()"
        @toggle-poi="togglePoi"
      />
      <div class="viewer-modal-layer">
        <div
          v-if="viewerUIReady && isMobileViewport && isViewModeSheetOpen"
          class="viewer-view-mode-backdrop"
          @click.self="closeViewModeSheet"
        >
          <section
            class="viewer-view-mode-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="viewer-view-mode-title"
            @touchstart="onViewModeSheetTouchStart"
            @touchend="onViewModeSheetTouchEnd"
          >
            <div class="viewer-view-mode-sheet-handle" aria-hidden="true"></div>
            <h2 id="viewer-view-mode-title">View Mode</h2>
            <p>Choose the viewing experience that feels most comfortable.</p>
            <button class="viewer-view-mode-card" :class="{ active: activeViewMode === VIEW_MODE.NORMAL }" type="button" @click="selectViewMode(VIEW_MODE.NORMAL)">
              <span class="viewer-view-mode-icon" aria-hidden="true">◌</span><span><strong>Normal</strong><small>Balanced immersive panorama.</small></span><b v-if="activeViewMode === VIEW_MODE.NORMAL" aria-label="Selected">✓</b>
            </button>
            <button class="viewer-view-mode-card" :class="{ active: activeViewMode === VIEW_MODE.FIT_EYES }" type="button" @click="selectViewMode(VIEW_MODE.FIT_EYES)">
              <span class="viewer-view-mode-icon" aria-hidden="true">&#128065;</span><span><strong>Fit Eyes</strong><small>Natural perspective similar to human vision.</small></span><b v-if="activeViewMode === VIEW_MODE.FIT_EYES" aria-label="Selected">✓</b>
            </button>
            <button class="viewer-view-mode-card" :class="{ active: activeViewMode === VIEW_MODE.MEGA_VIEW }" type="button" @click="selectViewMode(VIEW_MODE.MEGA_VIEW)">
              <span class="viewer-view-mode-icon" aria-hidden="true">↗</span><span><strong>Mega View</strong><small>Wide cinematic viewing.</small></span><b v-if="activeViewMode === VIEW_MODE.MEGA_VIEW" aria-label="Selected">✓</b>
            </button>
          </section>
        </div>
        <InfoPoiPopup v-if="viewerUIReady && activePointPopup?.kind === 'info'" :point="activePointPopup.point" @close="activePointPopup = null" />
        <ImageViewerPopup v-if="viewerUIReady && activePointPopup?.kind === 'image'" :point="activePointPopup.point" @close="activePointPopup = null" />
        <VideoPoiPopup v-if="viewerUIReady && activePointPopup?.kind === 'video'" :point="activePointPopup.point" @close="activePointPopup = null" />
      </div>
      <div class="viewer-notification-layer" aria-live="polite">
        <p v-if="errorMessage" class="viewer-error">{{ errorMessage }}</p>
      </div>
    </div>
  </section>
</template>
