<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import ViewerAdapterYt from '../adapters/ViewerAdapterYt.js';
import YtControlBar from '../components/YtControlBar.vue';
import YtSceneListPanel from '../components/YtSceneListPanel.vue';
import YtSceneTitlePill from '../components/YtSceneTitlePill.vue';
import '../styles/vr360-yt.css';

// Shell owns adapter + presentation state. Scene switching + audio + view
// remain owned by the core through the facade.
const props = defineProps({
  facade: { type: Object, required: true },
  hostRef: { type: Object, default: null }, // ref to the .tour-viewer-page host — Teleport target
  tourTitle: { type: String, default: '' },
  autoHideMs: { type: Number, default: 3000 },
});
const emit = defineEmits(['command-result', 'adapter-error']);

const adapter = shallowRef(null);
const sceneState = shallowRef({
  scenes: [], currentScene: null, currentSceneId: '', currentSceneIndex: -1,
  totalScenes: 0, isFirstScene: false, isLastScene: false,
});
const audioState = shallowRef({ available: false });
const autorotateState = shallowRef({ available: false, enabled: null });
const viewMode = shallowRef(null);
const fullscreen = shallowRef(false);
const poiHidden = shallowRef(false);
const introState = shallowRef({ available: false, interactive: true });
const errorState = shallowRef(null);
const sceneListOpen = ref(false);
const idle = ref(false);
const teleportTarget = ref(null);

let unsubscribers = [];
let idleTimer = 0;

const capabilities = computed(() => adapter.value?.capabilities || {});

// Kiosk auto-advance: cộng dồn góc yaw (lon) qua các view-change event.
// Khi vượt 360° VÀ đang bật autorotate → chuyển cảnh tiếp theo (loop về scene
// đầu nếu đang ở cảnh cuối). Reset khi:
//   - Đổi cảnh (bất kỳ lý do gì)
//   - Tắt autorotate
//   - Vừa mới trigger advance (tránh double-fire trong cùng scene)
let cumulativeYaw = 0;
let lastYaw = null;
let advanceScheduled = false;
const AUTO_ADVANCE_THRESHOLD = 360;

function resetYawAccumulator() {
  cumulativeYaw = 0;
  lastYaw = null;
  advanceScheduled = false;
}

function normalizeDelta(prev, curr) {
  // lon wrap: 359° → 1° should be delta ~2°, not -358°.
  let d = curr - prev;
  if (d > 180) d -= 360;
  else if (d < -180) d += 360;
  return d;
}

function onAutoAdvanceViewChange(view) {
  if (advanceScheduled) return;
  if (!autorotateState.value.enabled) return;
  const yaw = Number(view?.lon);
  if (!Number.isFinite(yaw)) return;
  if (lastYaw === null) { lastYaw = yaw; return; }
  const delta = normalizeDelta(lastYaw, yaw);
  lastYaw = yaw;
  cumulativeYaw += Math.abs(delta);
  if (cumulativeYaw < AUTO_ADVANCE_THRESHOLD) return;
  advanceScheduled = true;
  triggerAutoAdvance();
}

function triggerAutoAdvance() {
  if (!adapter.value) return;
  const state = adapter.value.getSceneState();
  if (!state.totalScenes || state.totalScenes < 2) return;
  // Ở cảnh cuối → quay về cảnh đầu (loop kiosk mode).
  if (state.isLastScene) {
    const firstScene = state.scenes[0];
    if (firstScene?.id) adapter.value.goToScene(firstScene.id);
  } else {
    adapter.value.nextScene();
  }
}
const isIntroComplete = computed(() => {
  const state = introState.value;
  if (!state.available) return true;
  return state.completed === true || state.interactive === true;
});
const isReady = computed(() => Boolean(adapter.value) && isIntroComplete.value);
const currentSceneName = computed(() => sceneState.value.currentScene?.name || sceneState.value.currentScene?.title || '');

function syncState() {
  if (!adapter.value) return;
  sceneState.value = adapter.value.getSceneState();
  audioState.value = adapter.value.getAudioState();
  autorotateState.value = adapter.value.getAutorotateState();
  viewMode.value = adapter.value.getViewMode();
  fullscreen.value = adapter.value.isFullscreen() === true;
  introState.value = adapter.value.getIntroState();
  const poi = adapter.value.getPoiState();
  poiHidden.value = poi.hidden === true;
}

function scheduleIdle() {
  if (idleTimer) window.clearTimeout(idleTimer);
  idle.value = false;
  idleTimer = window.setTimeout(() => { idle.value = true; }, props.autoHideMs);
}

function onActivity() { scheduleIdle(); }
function onSurfaceLeave() { idle.value = true; if (idleTimer) window.clearTimeout(idleTimer); idleTimer = 0; }

function subscribeSurface(el) {
  if (!el) return () => {};
  el.addEventListener('pointermove', onActivity, { passive: true });
  el.addEventListener('pointerdown', onActivity, { passive: true });
  el.addEventListener('touchstart', onActivity, { passive: true });
  el.addEventListener('keydown', onActivity);
  el.addEventListener('mouseleave', onSurfaceLeave);
  return () => {
    el.removeEventListener('pointermove', onActivity);
    el.removeEventListener('pointerdown', onActivity);
    el.removeEventListener('touchstart', onActivity);
    el.removeEventListener('keydown', onActivity);
    el.removeEventListener('mouseleave', onSurfaceLeave);
  };
}

function clearSubscriptions() {
  for (const unsub of unsubscribers.splice(0)) unsub();
}

function connectFacade(facade) {
  clearSubscriptions();
  adapter.value?.disconnect();
  adapter.value = new ViewerAdapterYt(facade);
  adapter.value.connect();
  resetYawAccumulator();
  const stateEvents = [
    'ready', 'scene-change', 'view-change', 'view-mode-change', 'load-progress', 'load-complete',
    'audio-state-change', 'audio-timeupdate', 'audio-volumechange',
    'autorotate-change', 'fullscreen-change', 'intro-start',
    'intro-phase-change', 'intro-complete', 'poi-visibility-change',
  ];
  for (const eventName of stateEvents) {
    unsubscribers.push(adapter.value.on(eventName, syncState));
  }
  // Auto-advance sau 1 vòng khi autorotate ON.
  unsubscribers.push(adapter.value.on('view-change', onAutoAdvanceViewChange));
  // Reset accumulator khi đổi cảnh (bất kỳ nguồn nào).
  unsubscribers.push(adapter.value.on('scene-change', resetYawAccumulator));
  // Reset khi autorotate toggle — tránh cộng dồn góc từ session xoay tay.
  unsubscribers.push(adapter.value.on('autorotate-change', resetYawAccumulator));
  unsubscribers.push(adapter.value.on('error', (error) => {
    errorState.value = error;
    emit('adapter-error', error);
  }));
  syncState();
}

function selectScene(sceneId) {
  if (!adapter.value || !sceneId) return;
  try {
    const result = adapter.value.goToScene(sceneId);
    if (result?.then) {
      result
        .then((resolved) => emit('command-result', { name: 'go-to-scene', result: resolved }))
        .catch((error) => emit('command-result', { name: 'go-to-scene', error }));
    } else {
      emit('command-result', { name: 'go-to-scene', result });
    }
  } catch (error) {
    emit('command-result', { name: 'go-to-scene', error });
  }
}

function handleCommandResult(result) {
  syncState();
  emit('command-result', result);
}

function toggleSceneList() { sceneListOpen.value = !sceneListOpen.value; }
function closeSceneList() { sceneListOpen.value = false; }

// Resolve teleport target from either the injected hostRef (Vr360ViewerYt wrapper)
// or fallback to querying the DOM once the core is mounted.
async function resolveTarget() {
  await nextTick();
  const host = props.hostRef?.value || props.hostRef;
  const el = host?.$el || host;
  if (el?.classList?.contains('tour-viewer-page')) {
    teleportTarget.value = el;
    return;
  }
  teleportTarget.value = document.querySelector('.tour-viewer-page');
}

let stopSurfaceSubscription = () => {};
watch(teleportTarget, (el) => {
  stopSurfaceSubscription();
  stopSurfaceSubscription = el ? subscribeSurface(el) : () => {};
  if (el) scheduleIdle();
});

watch(
  () => props.facade,
  (facade) => {
    if (!facade) return;
    try { connectFacade(facade); }
    catch (error) { emit('adapter-error', error); }
    resolveTarget();
  },
  { immediate: true },
);

onMounted(() => { resolveTarget(); });
onBeforeUnmount(() => {
  clearSubscriptions();
  adapter.value?.destroy();
  adapter.value = null;
  stopSurfaceSubscription();
  if (idleTimer) window.clearTimeout(idleTimer);
});
</script>

<template>
  <Teleport v-if="teleportTarget && isReady" :to="teleportTarget">
    <div
      class="yt-hud"
      :data-idle="idle ? 'true' : 'false'"
      aria-label="Trình xem VR360 Youtube-style"
    >
      <YtSceneTitlePill
        :tour-title="tourTitle"
        :scene-name="currentSceneName"
        :scene-index="sceneState.currentSceneIndex"
        :total-scenes="sceneState.totalScenes"
      />

      <YtSceneListPanel
        :scenes="sceneState.scenes"
        :current-scene-id="sceneState.currentSceneId || ''"
        :open="sceneListOpen"
        :disabled="introState.available && !introState.interactive"
        @select-scene="selectScene"
        @close="closeSceneList"
      />

      <YtControlBar
        :adapter="adapter"
        :capabilities="capabilities"
        :scene-state="sceneState"
        :audio-state="audioState"
        :autorotate-state="autorotateState"
        :poi-hidden="poiHidden"
        :view-mode="viewMode"
        :available-view-modes="adapter?.getAvailableViewModes() || []"
        :fullscreen="fullscreen"
        :scene-list-open="sceneListOpen"
        :disabled="introState.available && !introState.interactive"
        @command-result="handleCommandResult"
        @toggle-scene-list="toggleSceneList"
      />
    </div>
  </Teleport>
</template>
