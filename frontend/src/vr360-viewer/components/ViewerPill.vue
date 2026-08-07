<script setup>
import { onBeforeUnmount, ref } from 'vue';
import AudioHoverControls from './audio/AudioHoverControls.vue';

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
});

const emit = defineEmits(['home', 'info', 'prev', 'next']);

const collapsed = ref(false);
const infoOpen = ref(false);

function toggleCollapse() {
  collapsed.value = !collapsed.value;
  if (collapsed.value) infoOpen.value = false;
}

function toggleInfo() {
  infoOpen.value = !infoOpen.value;
  emit('info', { open: infoOpen.value });
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
      title="Thu gọn / Mở rộng"
      @click="toggleCollapse"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
    <div class="viewer-pill-cluster">
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
      <AudioHoverControls
        v-if="audioService"
        class="viewer-pill-audio"
        :session="audioSession"
        :audio-service="audioService"
      />
      <button
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
  max-width: 320px;
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
  overflow: hidden;
  transition: opacity 200ms ease, max-width 260ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1);
  max-width: 260px;
}

.viewer-pill.is-collapsed .viewer-pill-cluster {
  opacity: 0;
  max-width: 0;
  transform: translateX(-8px);
  pointer-events: none;
}

.viewer-pill-btn {
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
  color: #999;
  opacity: 0.5;
  cursor: not-allowed;
}

.viewer-pill-btn svg {
  width: 14px;
  height: 14px;
}

.viewer-pill-arrow svg {
  transform: rotate(180deg);
  transition: transform 240ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.viewer-pill.is-collapsed .viewer-pill-arrow svg {
  transform: rotate(0deg);
}

.viewer-pill-audio :deep(.viewer-audio-hover-trigger) {
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

.viewer-pill-audio :deep(.viewer-audio-hover-trigger svg) {
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
