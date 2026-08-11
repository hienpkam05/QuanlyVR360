<script setup>
import { computed, ref } from 'vue';
import ViewerNavButton from './ViewerNavButton.vue';
import ViewerNavGroup from './ViewerNavGroup.vue';
import ViewerAudioControl from './ViewerAudioControl.vue';

const props = defineProps({
  adapter: { type: Object, default: null },
  sceneState: { type: Object, default: () => ({}) },
  audioState: { type: Object, default: () => ({ available: false }) },
  autorotateState: { type: Object, default: () => ({ available: false }) },
  viewMode: { type: String, default: null },
  availableViewModes: { type: Array, default: () => [] },
  fullscreen: { type: Boolean, default: false },
  capabilities: { type: Object, default: () => ({}) },
  disabled: { type: Boolean, default: false },
  sceneListOpen: { type: Boolean, default: false },
});

const emit = defineEmits(['command-result', 'toggle-scene-list']);

const scenes = computed(() => (Array.isArray(props.sceneState.scenes) ? props.sceneState.scenes : []));
const canNavigate = computed(() => Boolean(props.capabilities.scene && props.sceneState.totalScenes > 1));
const hasSceneList = computed(() => Boolean(props.capabilities.scene && scenes.value.length > 1));
const viewModeMenuOpen = ref(false);
const hasViewModes = computed(() => Boolean(
  props.capabilities.viewMode && props.availableViewModes.length,
));

const viewModeLabels = Object.freeze({
  normal: 'Normal',
  'fit-eyes': 'Fit Eyes',
  'mega-view': 'Mega View',
});

const currentViewModeLabel = computed(() => viewModeLabels[props.viewMode] || 'Chế độ xem');

function run(command, name, value) {
  if (!props.adapter || typeof props.adapter[command] !== 'function') return;
  try {
    const result = value === undefined
      ? props.adapter[command]()
      : props.adapter[command](value);
    if (result?.then) {
      result.then((resolved) => emit('command-result', { name, result: resolved }))
        .catch((error) => emit('command-result', { name, error }));
      return;
    }
    emit('command-result', { name, result });
  } catch (error) {
    emit('command-result', { name, error });
  }
}

function toggleViewModeMenu() {
  if (!hasViewModes.value || props.disabled) return;
  viewModeMenuOpen.value = !viewModeMenuOpen.value;
}

function selectViewMode(mode) {
  if (!mode || props.disabled) return;
  viewModeMenuOpen.value = false;
  run('setViewMode', 'set-view-mode', mode);
}

</script>

<template>
  <!-- Player-style overlay: two lightweight clusters instead of one large bar.
   The wrapper never captures pointer events, so panorama drag/pinch keeps
   working everywhere except on the buttons themselves. -->
  <div class="vr360-v2-bottom-nav" aria-label="Điều khiển VR360">
    <ViewerNavGroup class="vr360-v2-nav-group--left" label="Điều hướng cảnh">
      <ViewerNavButton
        v-if="canNavigate"
        label="Chuyển cảnh trước"
        title="Cảnh trước"
        :disabled="disabled || sceneState.isFirstScene"
        @activate="run('previousScene', 'previous-scene')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg>
      </ViewerNavButton>

      <ViewerNavButton
        v-if="hasSceneList"
        label="Mở danh sách hình ảnh"
        title="Danh sách hình ảnh"
        :active="sceneListOpen"
        :expanded="sceneListOpen"
        :disabled="disabled"
        @activate="emit('toggle-scene-list')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2.5" /><path d="M3.5 15l4.2-4 3.4 3.2 3-2.6 6.4 5.4" /></svg>
      </ViewerNavButton>

      <ViewerNavButton
        v-if="canNavigate"
        label="Chuyển cảnh tiếp theo"
        title="Cảnh tiếp theo"
        :disabled="disabled || sceneState.isLastScene"
        @activate="run('nextScene', 'next-scene')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg>
      </ViewerNavButton>
    </ViewerNavGroup>

    <ViewerNavGroup class="vr360-v2-nav-group--right" label="Điều khiển hiển thị">
      <div v-if="hasViewModes" class="vr360-v2-view-mode-control" @keydown.escape="viewModeMenuOpen = false">
        <ViewerNavButton
          class="vr360-v2-nav-control--view-mode"
          :label="`Chế độ xem: ${currentViewModeLabel}`"
          :title="`Chế độ xem: ${currentViewModeLabel}`"
          :active="viewModeMenuOpen || viewMode !== 'normal'"
          :expanded="viewModeMenuOpen"
          :disabled="disabled"
          @activate="toggleViewModeMenu"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1.5 12s3.8-6.5 10.5-6.5S22.5 12 22.5 12 18.7 18.5 12 18.5 1.5 12 1.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>
        </ViewerNavButton>
        <div v-if="viewModeMenuOpen" class="vr360-v2-view-mode-menu" role="menu" aria-label="Chọn chế độ xem">
          <button
            v-for="mode in availableViewModes"
            :key="mode"
            class="vr360-v2-view-mode-menu__item"
            :class="{ 'is-current': mode === viewMode }"
            type="button"
            role="menuitemradio"
            :aria-checked="mode === viewMode"
            :disabled="disabled"
            @click="selectViewMode(mode)"
          >
            <span>{{ viewModeLabels[mode] || mode }}</span>
            <span v-if="mode === viewMode" aria-hidden="true">✓</span>
          </button>
        </div>
      </div>

      <ViewerNavButton
        v-if="capabilities.autorotate"
        label="Bật hoặc tắt xoay tự động"
        title="Xoay tự động"
        :active="autorotateState.enabled"
        :disabled="disabled"
        @activate="run('toggleAutorotate', 'toggle-autorotate')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 8a8 8 0 1 0 1 7" /><path d="M19 4v4h-4" /><path d="m12 8 3 4-3 4" /></svg>
      </ViewerNavButton>

      <ViewerNavButton
        v-if="capabilities.view"
        label="Về góc nhìn mặc định"
        title="Góc nhìn mặc định"
        :disabled="disabled"
        @activate="run('resetView', 'reset-view')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-7 9 7" /><path d="M5.5 10v9h4.2v-5h4.6v5h4.2v-9" /></svg>
      </ViewerNavButton>

      <ViewerAudioControl
        v-if="capabilities.audio"
        class="vr360-v2-nav-control--audio"
        :adapter="adapter"
        :audio-state="audioState"
        :disabled="disabled"
        @command-result="emit('command-result', $event)"
      />

      <ViewerNavButton
        v-if="capabilities.fullscreen"
        class="vr360-v2-nav-control--fullscreen"
        :label="fullscreen ? 'Thoát toàn màn hình' : 'Chế độ toàn màn hình'"
        :title="fullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'"
        :active="fullscreen"
        :disabled="disabled"
        @activate="run('toggleFullscreen', 'toggle-fullscreen')"
      >
        <svg v-if="fullscreen" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /></svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" /></svg>
      </ViewerNavButton>
    </ViewerNavGroup>
  </div>
</template>
