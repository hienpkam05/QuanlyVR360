<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
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
const hasViewModes = computed(() => Boolean(
  props.capabilities.viewMode && props.availableViewModes.length,
));
const currentViewModeIndex = computed(() => props.availableViewModes.indexOf(props.viewMode));
// Mobile-only presentation state. It never changes any viewer/Core state.
const rightNavExpanded = ref(false);
const mobileQuery = typeof window === 'undefined'
  ? null
  : window.matchMedia('(max-width: 768px)');
const isMobile = ref(mobileQuery?.matches ?? false);

function syncMobileState(event) {
  isMobile.value = typeof event?.matches === 'boolean'
    ? event.matches
    : Boolean(mobileQuery?.matches);
}

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

function cycleViewMode() {
  if (!hasViewModes.value || props.disabled) return;
  const nextIndex = (currentViewModeIndex.value + 1) % props.availableViewModes.length;
  run('setViewMode', 'set-view-mode', props.availableViewModes[nextIndex]);
}

function toggleRightNav() {
  rightNavExpanded.value = !rightNavExpanded.value;
}

onMounted(() => {
  mobileQuery?.addEventListener?.('change', syncMobileState);
  syncMobileState();
});

onBeforeUnmount(() => {
  mobileQuery?.removeEventListener?.('change', syncMobileState);
});

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

    <ViewerNavGroup
      class="vr360-v2-nav-group--right"
      :class="{ 'is-expanded': rightNavExpanded, 'is-mobile': isMobile }"
      label="Điều khiển hiển thị"
    >
      <div class="vr360-v2-nav-group__actions">
        <ViewerNavButton
          v-if="hasViewModes"
          class="vr360-v2-nav-control--view-mode"
          :label="`Eyes Mode: ${viewMode || 'không xác định'}`"
          :title="`Eyes Mode: ${viewMode || 'không xác định'} (bấm để đổi)`"
          :active="currentViewModeIndex > 0"
          :disabled="disabled"
          @activate="cycleViewMode"
        >
          <!-- The icon mirrors the Core View Mode state; all variants use the
           * same inline SVG/stroke system as the other Bottom Nav controls. -->
          <svg v-if="viewMode === 'fit-eyes'" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1.5 12s3.8-6.5 10.5-6.5S22.5 12 22.5 12 18.7 18.5 12 18.5 1.5 12 1.5 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg v-else-if="viewMode === 'mega-view'" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M21 15v6h-6" />
            <path d="m3 3 5 5M21 3l-5 5M3 21l5-5M21 21l-5-5" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
          </svg>
        </ViewerNavButton>

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
      </div>

      <ViewerNavButton
        v-if="isMobile"
        class="vr360-v2-nav-control--toggle-right"
        :label="rightNavExpanded ? 'Thu gọn điều khiển' : 'Mở rộng điều khiển'"
        :title="rightNavExpanded ? 'Thu gọn điều khiển' : 'Mở rộng điều khiển'"
        :active="rightNavExpanded"
        :expanded="rightNavExpanded"
        :disabled="disabled"
        @activate="toggleRightNav"
      >
        <svg v-if="rightNavExpanded" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg>
      </ViewerNavButton>
    </ViewerNavGroup>
  </div>
</template>
