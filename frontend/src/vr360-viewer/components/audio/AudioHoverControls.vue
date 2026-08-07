<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { formatDuration } from '../../common/audio/utils.js';

const props = defineProps({
  session: { type: Object, required: true },
  audioService: { type: Object, required: true },
});

const hovered = ref(false);
let hideTimer = null;

const isPlaying = computed(() => props.session.status === 'playing');
const hasAudio = computed(() => Boolean(props.session.url));
const progressPercent = computed(() => {
  const d = Number(props.session.duration);
  const t = Number(props.session.currentTime);
  return d > 0 ? Math.min(100, Math.max(0, (t / d) * 100)) : 0;
});
const volumeValue = computed(() => (props.session.muted ? 0 : (props.session.volume ?? 1)));

function onEnter() {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
  hovered.value = true;
}

function onLeave() {
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => { hovered.value = false; hideTimer = null; }, 250);
}

function onProgressClick(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  const duration = Number(props.session.duration) || 0;
  props.audioService.seek(ratio * duration);
}

function onVolumeInput(event) {
  props.audioService.setVolume(Number(event.target.value));
}

function togglePlay() {
  props.audioService.toggle();
}

onBeforeUnmount(() => { if (hideTimer) clearTimeout(hideTimer); });
</script>

<template>
  <div class="viewer-audio-hover" @mouseenter="onEnter" @mouseleave="onLeave">
    <button
      type="button"
      class="viewer-audio-hover-trigger"
      :aria-pressed="isPlaying"
      :disabled="!hasAudio"
      :aria-label="isPlaying ? 'Pause audio' : hasAudio ? 'Play audio' : 'Audio not available'"
      title="Audio"
      @click="hasAudio && togglePlay()"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
        <path v-if="isPlaying" d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path v-else d="M23 9l-6 6M17 9l6 6" />
      </svg>
    </button>
    <transition name="viewer-audio-hover">
      <div v-if="hovered && hasAudio" class="viewer-audio-hover-panel" role="group" aria-label="Audio controls">
        <button
          type="button"
          class="viewer-audio-hover-play"
          :aria-label="isPlaying ? 'Pause' : 'Play'"
          @click="togglePlay"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path v-if="isPlaying" d="M6 4h4v16H6zM14 4h4v16h-4z" />
            <path v-else d="M8 5v14l11-7z" />
          </svg>
        </button>
        <div class="viewer-audio-hover-time">
          <div
            class="viewer-audio-hover-progress"
            role="slider"
            :aria-valuemin="0"
            :aria-valuemax="session.duration || 0"
            :aria-valuenow="session.currentTime || 0"
            @click="onProgressClick"
          >
            <div class="viewer-audio-hover-progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <span>{{ formatDuration(session.currentTime) }} / {{ formatDuration(session.duration) }}</span>
        </div>
        <label class="viewer-audio-hover-volume-wrap" :title="`Volume ${Math.round(volumeValue * 100)}%`">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <input
            type="range"
            class="viewer-audio-hover-volume"
            min="0"
            max="1"
            step="0.05"
            :value="volumeValue"
            aria-label="Volume"
            @input="onVolumeInput"
          />
        </label>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.viewer-audio-hover {
  position: relative;
  display: inline-flex;
}

.viewer-audio-hover-trigger {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 0;
  background: transparent;
  color: #333;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 140ms ease, color 140ms ease;
}

.viewer-audio-hover-trigger:hover:not(:disabled),
.viewer-audio-hover-trigger[aria-pressed="true"] {
  background: rgba(0, 0, 0, 0.05);
  color: #D5001C;
}

.viewer-audio-hover-trigger:disabled {
  color: #999;
  opacity: 0.5;
  cursor: not-allowed;
}

.viewer-audio-hover-trigger svg {
  width: 20px;
  height: 20px;
}

.viewer-audio-hover-panel {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
  display: flex;
  align-items: center;
  gap: 12px;
  color: #333;
  white-space: nowrap;
}

.viewer-audio-hover-play {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 0;
  background: #D5001C;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 120ms ease;
}

.viewer-audio-hover-play:active {
  transform: scale(0.94);
}

.viewer-audio-hover-play svg {
  width: 16px;
  height: 16px;
}

.viewer-audio-hover-time {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 160px;
}

.viewer-audio-hover-progress {
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.viewer-audio-hover-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #D5001C;
  border-radius: 2px;
  transition: width 100ms linear;
}

.viewer-audio-hover-time span {
  font-size: 11px;
  color: #555;
  font-variant-numeric: tabular-nums;
  text-align: center;
  letter-spacing: 0.02em;
}

.viewer-audio-hover-volume-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #333;
}

.viewer-audio-hover-volume-wrap svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.viewer-audio-hover-volume {
  width: 80px;
  height: 4px;
  accent-color: #D5001C;
  cursor: pointer;
}

.viewer-audio-hover-enter-active,
.viewer-audio-hover-leave-active {
  transition: opacity 160ms ease, transform 200ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
.viewer-audio-hover-enter-from,
.viewer-audio-hover-leave-to {
  opacity: 0;
  transform: translate(-50%, 6px);
}
</style>
