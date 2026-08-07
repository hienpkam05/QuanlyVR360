<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import AudioHoverControls from './audio/AudioHoverControls.vue';
import { VIEW_MODE } from '../common/controllers/viewModeManager.js';

const props = defineProps({
  sceneName: { type: String, default: '' },
  sceneIndex: { type: Number, default: -1 },
  sceneCount: { type: Number, default: 0 },
  hasMultipleScenes: { type: Boolean, default: false },
  isFirstScene: { type: Boolean, default: false },
  isLastScene: { type: Boolean, default: false },
  isTransitioning: { type: Boolean, default: false },
  audioSession: { type: Object, default: () => ({}) },
  audioService: { type: Object, default: null },
  audioTour: { type: Object, default: () => ({}) },
  activeViewMode: { type: String, default: VIEW_MODE.NORMAL },
});

const emit = defineEmits(['home', 'info', 'prev', 'next', 'view-mode-change']);

const collapsed = ref(false);
const infoOpen = ref(false);

const VIEW_MODE_ORDER = [VIEW_MODE.NORMAL, VIEW_MODE.FIT_EYES, VIEW_MODE.MEGA_VIEW];
const VIEW_MODE_LABEL = {
  [VIEW_MODE.NORMAL]: 'Normal',
  [VIEW_MODE.FIT_EYES]: 'Fit Eyes',
  [VIEW_MODE.MEGA_VIEW]: 'Mega View',
};

const currentViewModeLabel = computed(() => VIEW_MODE_LABEL[props.activeViewMode] || 'Normal');

function toggleCollapse() {
  collapsed.value = !collapsed.value;
  if (collapsed.value) infoOpen.value = false;
}

function toggleInfo() {
  infoOpen.value = !infoOpen.value;
  emit('info', { open: infoOpen.value });
}

function cycleViewMode() {
  const idx = VIEW_MODE_ORDER.indexOf(props.activeViewMode);
  const next = VIEW_MODE_ORDER[(idx + 1) % VIEW_MODE_ORDER.length];
  emit('view-mode-change', next);
}

onBeforeUnmount(() => {});
</script>

<template>
  <div class="viewer-pill" :class="{ 'is-collapsed': collapsed }">
    <button
      type="button"
      class="viewer-pill-btn viewer-pill-arrow"
      :aria-label="collapsed ? 'Mở rộng' : 'Thu gọn'"
      :aria-expanded="!collapsed"
      :title="collapsed ? 'Mở rộng' : 'Thu gọn'"
      @click="toggleCollapse"
    >
      <span v-if="!collapsed" class="viewer-pill-arrow-label">Ẩn</span>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </button>
    <div class="viewer-pill-cluster">
      <button
        type="button"
        class="viewer-pill-btn viewer-pill-home"
        aria-label="Về góc nhìn mặc định"
        title="Về mặc định"
        @click="emit('home')"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
        </svg>
      </button>
      <button
        type="button"
        class="viewer-pill-btn viewer-pill-view-mode"
        :aria-label="`Chế độ xem: ${currentViewModeLabel}`"
        :title="`Chế độ xem: ${currentViewModeLabel} (bấm để đổi)`"
        :data-mode="activeViewMode"
        @click="cycleViewMode"
      >
        <svg
          v-if="activeViewMode === VIEW_MODE.NORMAL"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        <svg
          v-else-if="activeViewMode === VIEW_MODE.FIT_EYES"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>
      <AudioHoverControls
        v-if="audioService"
        class="viewer-pill-audio"
        :session="audioSession"
        :audio-service="audioService"
        :tour="audioTour"
      />
      <!-- <button
        type="button"
        class="viewer-pill-btn viewer-pill-info"
        :aria-pressed="infoOpen"
        aria-label="Thông tin cảnh hiện tại"
        title="Thông tin"
        @click="toggleInfo"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </button> -->
      <button
        v-if="hasMultipleScenes"
        type="button"
        class="viewer-pill-btn"
        aria-label="Cảnh trước"
        title="Cảnh trước"
        :disabled="isFirstScene || isTransitioning"
        @click="emit('prev')"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        v-if="hasMultipleScenes"
        type="button"
        class="viewer-pill-btn"
        aria-label="Cảnh tiếp theo"
        title="Cảnh tiếp theo"
        :disabled="isLastScene || isTransitioning"
        @click="emit('next')"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
    <transition name="viewer-pill-info-pop">
      <div v-if="infoOpen && !collapsed" class="viewer-pill-info-popup" role="status">
        <strong>{{ sceneName || 'Cảnh' }}</strong>
        <span v-if="sceneCount > 1 && sceneIndex >= 0">Cảnh {{ sceneIndex + 1 }} / {{ sceneCount }}</span>
        <span class="viewer-pill-info-view-mode">Chế độ: {{ currentViewModeLabel }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.viewer-pill {
  position: absolute;
  right: 10px;
  bottom: calc(24px + env(safe-area-inset-bottom));
  height: 35px;
  background: rgba(218, 218, 218, 0.59);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  gap: 2px;
  z-index: 50;
  pointer-events: auto;
  transition: max-width 260ms cubic-bezier(0.22, 0.61, 0.36, 1), padding 260ms ease;
  max-width: 360px;
  overflow: visible;
}

.viewer-pill.is-collapsed {
  max-width: 34px;
  padding: 0 4px;
}

.viewer-pill-cluster {
  display: flex;
  align-items: center;
  gap: 2px;
  overflow: visible;
  transition: opacity 200ms ease, max-width 260ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1);
  max-width: 300px;
}

.viewer-pill.is-collapsed .viewer-pill-cluster {
  opacity: 0;
  max-width: 0;
  transform: translateX(-8px);
  pointer-events: none;
}

.viewer-pill-btn {
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 0;
  background: transparent;
  color: #222;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0;
  flex-shrink: 0;
  transition: background 140ms ease, color 140ms ease;
}

.viewer-pill-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.08);
  color: #D5001C;
}

.viewer-pill-btn[aria-pressed="true"] {
  color: #D5001C;
}

.viewer-pill-btn:disabled {
  color: rgba(34, 34, 34, 0.35);
  opacity: 1;
  cursor: not-allowed;
}

.viewer-pill-btn:disabled:hover {
  background: transparent;
  color: rgba(34, 34, 34, 0.35);
}

.viewer-pill-btn svg {
  display: block;
  width: 14px;
  height: 14px;
}

.viewer-pill-arrow {
  width: auto;
  min-width: 26px;
  padding: 0 6px;
  gap: 3px;
  border-radius: 13px;
}

.viewer-pill-arrow-label {
  font-size: 10px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: 0.2px;
  color: inherit;
}

.viewer-pill-arrow svg {
  width: 10px;
  height: 10px;
  transform: rotate(0deg);
  transition: transform 240ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.viewer-pill.is-collapsed .viewer-pill-arrow {
  padding: 0;
  width: 26px;
}

.viewer-pill.is-collapsed .viewer-pill-arrow svg {
  transform: rotate(180deg);
  width: 14px;
  height: 14px;
}

.viewer-pill-view-mode[data-mode="fit-eyes"],
.viewer-pill-view-mode[data-mode="mega-view"] {
  color: #D5001C;
}

.viewer-pill-audio {
  --viewer-audio-control-size: 26px;
  --viewer-audio-icon-size: 14px;
  align-items: center;
  display: inline-flex;
  flex: 0 0 26px;
  height: 26px;
  justify-content: center;
  width: 26px;
}

.viewer-pill-audio :deep(.viewer-audio-hover) {
  align-items: center;
  display: inline-flex;
  height: 26px;
  justify-content: center;
  width: 26px;
}

.viewer-pill-audio :deep(.viewer-audio-hover-trigger) {
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #222;
}

.viewer-pill-audio :deep(.viewer-audio-hover-trigger:hover:not(:disabled)),
.viewer-pill-audio :deep(.viewer-audio-hover-trigger[aria-pressed="true"]) {
  background: rgba(0, 0, 0, 0.08);
  color: #D5001C;
}

.viewer-pill-audio :deep(.viewer-audio-icon) {
  width: 14px;
  height: 14px;
}

.viewer-pill-info-popup {
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0;
  min-width: 160px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
  color: #222;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: right;
  white-space: nowrap;
  z-index: 2;
}

.viewer-pill-info-popup strong {
  font-weight: 600;
}

.viewer-pill-info-popup span {
  color: #666;
  font-size: 11px;
}

.viewer-pill-info-view-mode {
  color: #D5001C !important;
  font-weight: 500;
}

.viewer-pill-info-pop-enter-active,
.viewer-pill-info-pop-leave-active {
  transition: opacity 160ms ease, transform 200ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
.viewer-pill-info-pop-enter-from,
.viewer-pill-info-pop-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
