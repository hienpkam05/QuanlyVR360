<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import ViewerAdapter from '../adapters/ViewerAdapter.js';
import ViewerBottomNav from '../components/ViewerBottomNav.vue';
import ViewerSceneListPanel from '../components/ViewerSceneListPanel.vue';

const props = defineProps({
  facade: { type: Object, required: true },
});

const emit = defineEmits(['adapter-error', 'command-result']);

const adapter = shallowRef(null);
const sceneState = shallowRef({
  scenes: [], currentScene: null, currentSceneId: '', currentSceneIndex: -1,
  totalScenes: 0, isFirstScene: false, isLastScene: false,
});
const audioState = shallowRef({ available: false });
const autorotateState = shallowRef({ available: false, enabled: null });
const viewMode = shallowRef(null);
const fullscreen = shallowRef(false);
const introState = shallowRef({ available: false, interactive: true });
const isLoading = shallowRef(false);
const errorState = shallowRef(null);
const viewerHost = ref(null);
const fullscreenSurface = ref(null);
// The only UI state owned by V2. Scene data and switching stay with the core,
// and this flag is never reset on scene-change so the list survives navigation.
const sceneListOpen = shallowRef(false);
// The core sidebar distinguishes current and visited scenes. Visited IDs are
// session-only V2 presentation state, updated solely from confirmed core events.
const visitedSceneIds = ref(new Set());
let unsubscribers = [];

const capabilities = computed(() => adapter.value?.capabilities || {});
const currentSceneLabel = computed(() => {
  const state = sceneState.value;
  if (!state.totalScenes) return '';
  return `${state.currentSceneIndex + 1} / ${state.totalScenes}`;
});
// Intro gating. The Bottom Navigation must stay unmounted while the core Intro
// is still running, and only appear once the core reports the Intro finished.
// State comes from the core through the Adapter, never from a timer.
const isIntroComplete = computed(() => {
  const state = introState.value;
  if (!state.available) return true;
  return state.completed === true || state.interactive === true;
});
const isNavVisible = computed(() => Boolean(adapter.value) && isIntroComplete.value);
// Scene list availability mirrors the core scene data reported by the Adapter.
const hasSceneList = computed(
  () => Boolean(capabilities.value.scene) && (sceneState.value.scenes?.length || 0) > 1,
);
const isSceneListVisible = computed(
  () => isNavVisible.value && hasSceneList.value && sceneListOpen.value,
);

function toggleSceneList() {
  sceneListOpen.value = !sceneListOpen.value;
}

function markSceneVisited(sceneId) {
  if (!sceneId || visitedSceneIds.value.has(sceneId)) return;
  visitedSceneIds.value = new Set(visitedSceneIds.value).add(sceneId);
}

function markCurrentSceneVisited() {
  markSceneVisited(sceneState.value.currentSceneId);
}

// Scene switching stays owned by the core. The open state is intentionally left
// untouched so the list survives the scene transition.
function selectScene(sceneId) {
  if (!adapter.value || !sceneId) return;
  try {
    const result = adapter.value.goToScene(sceneId);
    if (result?.then) {
      result
        .then((resolved) => handleCommandResult({ name: 'go-to-scene', result: resolved }))
        .catch((error) => handleCommandResult({ name: 'go-to-scene', error }));
      return;
    }
    handleCommandResult({ name: 'go-to-scene', result });
  } catch (error) {
    handleCommandResult({ name: 'go-to-scene', error });
  }
}

function syncState() {
  if (!adapter.value) return;
  sceneState.value = adapter.value.getSceneState();
  audioState.value = adapter.value.getAudioState();
  autorotateState.value = adapter.value.getAutorotateState();
  viewMode.value = adapter.value.getViewMode();
  fullscreen.value = adapter.value.isFullscreen() === true;
  introState.value = adapter.value.getIntroState();
}

function clearSubscriptions() {
  for (const unsubscribe of unsubscribers.splice(0)) unsubscribe();
}

function subscribeAdapter() {
  const stateEvents = [
    'ready', 'scene-change', 'view-change', 'view-mode-change', 'load-progress', 'load-complete',
    'audio-state-change', 'audio-timeupdate', 'audio-volumechange',
    'autorotate-change', 'fullscreen-change', 'intro-start',
    'intro-phase-change', 'intro-complete',
  ];
  for (const eventName of stateEvents) {
    unsubscribers.push(adapter.value.on(eventName, syncState));
  }
  // scene-change is published by the core only after its transition succeeds.
  // It is therefore the source of truth for visited locations.
  unsubscribers.push(adapter.value.on('scene-change', (payload) => {
    markSceneVisited(payload?.sceneId);
  }));
  // The initial location becomes visited only once the Intro is interactive.
  unsubscribers.push(adapter.value.on('intro-complete', markCurrentSceneVisited));
  unsubscribers.push(adapter.value.on('ready', () => {
    if (!adapter.value?.getIntroState().available) markCurrentSceneVisited();
  }));
  unsubscribers.push(adapter.value.on('load-progress', () => { isLoading.value = true; }));
  unsubscribers.push(adapter.value.on('load-complete', () => { isLoading.value = false; }));
  unsubscribers.push(adapter.value.on('error', (error) => {
    isLoading.value = false;
    errorState.value = error;
    emit('adapter-error', error);
  }));
}

function connectFacade(facade) {
  clearSubscriptions();
  adapter.value?.disconnect();
  adapter.value = new ViewerAdapter(facade);
  visitedSceneIds.value = new Set();
  adapter.value.connect();
  subscribeAdapter();
  syncState();
  if (!introState.value.available || introState.value.interactive) markCurrentSceneVisited();
}

function handleCommandResult(result) {
  syncState();
  if (result?.error) errorState.value = result.error;
  emit('command-result', result);
}

// The existing core fullscreen controller uses `.tour-viewer-page` as its
// target. Teleporting V2 overlays into that DOM node keeps them inside the
// browser fullscreen subtree without introducing another fullscreen API/state.
function syncFullscreenSurface() {
  fullscreenSurface.value = viewerHost.value?.querySelector('.tour-viewer-page') || null;
}

watch(
  () => props.facade,
  (facade) => {
    if (!facade) return;
    try {
      connectFacade(facade);
    } catch (error) {
      emit('adapter-error', error);
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  clearSubscriptions();
  adapter.value?.destroy();
  adapter.value = null;
});

// Vue mounts slotted owner components before this shell. Reconnecting here lets
// a facade backed by an owner ref subscribe after that public ref is populated.
onMounted(() => {
  if (!adapter.value) return;
  adapter.value.disconnect();
  adapter.value.connect();
  syncState();
  nextTick(syncFullscreenSurface);
  if (!introState.value.available || introState.value.interactive) markCurrentSceneVisited();
});
</script>

<template>
  <section
    class="vr360-v2-layout"
    data-vr360-v2-active="true"
    aria-label="Trình xem thực tế ảo 360 độ"
  >
    <div ref="viewerHost" class="vr360-v2-viewer-host">
      <slot name="viewer" :adapter="adapter" :capabilities="capabilities" />
      <p v-if="isLoading" class="vr360-v2-viewer-loading" aria-live="polite">Đang tải cảnh…</p>
      <p v-if="errorState" class="vr360-v2-viewer-error" role="alert">{{ errorState.message || 'Không thể tải cảnh.' }}</p>
      <Teleport v-if="fullscreenSurface" :to="fullscreenSurface">
        <ViewerSceneListPanel
          v-if="isSceneListVisible"
          :scenes="sceneState.scenes"
          :current-scene-id="sceneState.currentSceneId || ''"
          :visited-scene-ids="visitedSceneIds"
          :disabled="introState.available && !introState.interactive"
          @select-scene="selectScene"
        />
        <ViewerBottomNav
          v-if="isNavVisible"
          :adapter="adapter"
          :scene-state="sceneState"
          :audio-state="audioState"
          :autorotate-state="autorotateState"
          :view-mode="viewMode"
          :available-view-modes="adapter?.getAvailableViewModes() || []"
          :fullscreen="fullscreen"
          :capabilities="capabilities"
          :disabled="introState.available && !introState.interactive"
          :scene-list-open="sceneListOpen"
          @command-result="handleCommandResult"
          @toggle-scene-list="toggleSceneList"
        />
      </Teleport>
    </div>
  </section>
</template>
