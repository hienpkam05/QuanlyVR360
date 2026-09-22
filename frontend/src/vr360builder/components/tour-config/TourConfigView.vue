<script setup>
import BaseAccordion from '../common/BaseAccordion.vue';

const props = defineProps({
  tourAudio: { type: Object, required: true },
  tourAudioPreviewSrc: { type: String, default: '' },
  scenes: { type: Array, required: true },
  tourTransition: { type: Object, required: true },
});

const emit = defineEmits([
  'pick-tour-audio',
  'clear-tour-audio',
  'update:tourAudio',
  'update:scene',
  'update:tourTransition',
]);

function updateAudio(key, value) {
  emit('update:tourAudio', key, value);
}
function updateScene(index, key, value) {
  emit('update:scene', index, key, value);
}
function updateTransition(key, value) {
  emit('update:tourTransition', key, value);
}
</script>

<template>
  <div class="vb-tour-config">
    <div class="vb-tc-header">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
      <h2>Cấu hình tour</h2>
      <p class="vb-tc-subtitle">Cấu hình hành vi chung của toàn bộ tour</p>
    </div>

    <div class="vb-tc-scroll">
      <!-- AUDIO TOUR -->
      <BaseAccordion title="Audio Tour" :open="true">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </template>
        <div class="vb-prop-row">
          <button class="vb-prop-btn vb-prop-btn-accent" @click="emit('pick-tour-audio')">
            {{ tourAudioPreviewSrc ? 'Thay file âm thanh' : 'Chọn file âm thanh' }}
          </button>
          <span v-if="tourAudio._fileName" class="vb-prop-filename">{{ tourAudio._fileName }}</span>
        </div>
        <div class="vb-prop-row">
          <label class="vb-prop-label">URL audio đã host</label>
          <input
            class="vb-prop-input vb-prop-input-mono"
            placeholder="https://.../tour-audio.mp3"
            :value="tourAudio.file"
            @input="updateAudio('file', $event.target.value.trim())"
          />
        </div>
        <div v-if="tourAudioPreviewSrc" class="vb-prop-row">
          <audio class="vb-audio-player" controls :src="tourAudioPreviewSrc"></audio>
        </div>
        <div class="vb-prop-row">
          <label class="vb-prop-label vb-hover-toggle-label">
            <input type="checkbox" :checked="tourAudio.enabled" :disabled="!tourAudioPreviewSrc" @change="updateAudio('enabled', $event.target.checked)" />
            Bật Tour Audio
          </label>
        </div>
        <div class="vb-prop-row-inline">
          <div class="vb-prop-row" style="flex:1">
            <label class="vb-prop-label">Âm lượng</label>
            <input class="vb-prop-input vb-prop-input-mono" type="number" min="0" max="1" step="0.1" :value="tourAudio.volume" @input="updateAudio('volume', +$event.target.value)" />
          </div>
          <div class="vb-prop-row" style="flex:1">
            <label class="vb-prop-label">Ngôn ngữ</label>
            <input class="vb-prop-input" placeholder="vi" :value="tourAudio.language" @input="updateAudio('language', $event.target.value.trim())" />
          </div>
        </div>
        <div class="vb-prop-row-inline">
          <div class="vb-prop-row" style="flex:1">
            <label class="vb-prop-label vb-hover-toggle-label">
              <input type="checkbox" :checked="tourAudio.loop" @change="updateAudio('loop', $event.target.checked)" />
              Lặp lại
            </label>
          </div>
          <div class="vb-prop-row" style="flex:1">
            <label class="vb-prop-label vb-hover-toggle-label">
              <input type="checkbox" :checked="tourAudio.autoplay" @change="updateAudio('autoplay', $event.target.checked)" />
              Tự động phát
            </label>
          </div>
        </div>
        <div class="vb-prop-row">
          <label class="vb-prop-label">Mô tả</label>
          <input class="vb-prop-input" placeholder="Mô tả audio (tuỳ chọn)" :value="tourAudio.description" @input="updateAudio('description', $event.target.value.trim())" />
        </div>
        <div v-if="tourAudioPreviewSrc" class="vb-prop-row">
          <button class="vb-prop-btn vb-prop-btn-danger" @click="emit('clear-tour-audio')">Xoá cấu hình audio</button>
        </div>
      </BaseAccordion>

      <!-- AUTO TOUR -->
      <BaseAccordion title="Auto Tour" :open="true">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </template>
        <p class="vb-tc-section-desc">Chọn các cảnh tham gia Auto Tour và thời gian hiển thị mỗi cảnh.</p>
        <div v-if="scenes.length === 0" class="vb-tc-empty">Chưa có cảnh nào.</div>
        <div v-else class="vb-tc-scene-list">
          <div
            v-for="(scene, idx) in scenes"
            :key="scene.id"
            class="vb-tc-scene-row"
            :class="{ active: scene.autoTour === 1 }"
          >
            <label class="vb-tc-scene-check">
              <input
                type="checkbox"
                :checked="scene.autoTour === 1"
                @change="updateScene(idx, 'autoTour', $event.target.checked ? 1 : 0)"
              />
            </label>
            <div class="vb-tc-scene-thumb">
              <img :src="scene.thumb || scene.image" :alt="scene.name" />
            </div>
            <div class="vb-tc-scene-info">
              <span class="vb-tc-scene-name">{{ scene.name || 'Cảnh ' + (idx + 1) }}</span>
              <span v-if="scene.group" class="vb-tc-scene-group">{{ scene.group }}</span>
            </div>
            <div v-if="scene.autoTour === 1" class="vb-tc-scene-duration">
              <input
                class="vb-prop-input vb-prop-input-mono"
                type="number"
                min="1"
                step="1"
                :value="scene.autoTourDuration ?? 20"
                @change="updateScene(idx, 'autoTourDuration', +$event.target.value)"
              />
              <span class="vb-tc-duration-unit">giây</span>
            </div>
          </div>
        </div>
      </BaseAccordion>

      <!-- TRANSITION -->
      <BaseAccordion title="Hiệu ứng chuyển cảnh" :open="true">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 014-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 01-4 4H3" />
          </svg>
        </template>
        <p class="vb-tc-section-desc">Cấu hình hiệu ứng khi chuyển giữa các cảnh.</p>
        <div class="vb-prop-row">
          <label class="vb-prop-label vb-hover-toggle-label">
            <input type="checkbox" :checked="tourTransition.enabled !== false" @change="updateTransition('enabled', $event.target.checked)" />
            Bật hiệu ứng
          </label>
        </div>
        <template v-if="tourTransition.enabled !== false">
          <div class="vb-prop-row">
            <label class="vb-prop-label">Kiểu hiệu ứng</label>
            <select class="vb-prop-input" :value="tourTransition.effect || 'fade'" @change="updateTransition('effect', $event.target.value)">
              <option value="fade">Mờ dần (Fade)</option>
              <option value="black">Tối màn hình</option>
              <option value="white">Sáng màn hình</option>
            </select>
          </div>
          <div class="vb-prop-row">
            <label class="vb-prop-label">Thời lượng (ms)</label>
            <input class="vb-prop-input vb-prop-input-mono" type="number" min="200" step="100" :value="tourTransition.duration ?? 1200" @change="updateTransition('duration', +$event.target.value)" />
          </div>
          <div class="vb-prop-row">
            <label class="vb-prop-label vb-hover-toggle-label">
              <input type="checkbox" :checked="tourTransition.rotation !== false" @change="updateTransition('rotation', $event.target.checked)" />
              Xoay camera khi chuyển
            </label>
          </div>
          <div v-if="tourTransition.rotation !== false" class="vb-prop-row" style="margin-bottom:0">
            <label class="vb-prop-label">Tốc độ xoay (vòng/phút)</label>
            <input class="vb-prop-input vb-prop-input-mono" type="number" min="1" step="1" :value="tourTransition.speed ?? 10" @change="updateTransition('speed', +$event.target.value)" />
          </div>
        </template>
      </BaseAccordion>
    </div>
  </div>
</template>

<style scoped>
.vb-tour-config {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--vb-bg-0);
}
.vb-tc-header {
  padding: 24px 32px 16px;
  border-bottom: 1px solid var(--vb-border);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.vb-tc-header svg {
  color: var(--vb-accent);
  flex-shrink: 0;
}
.vb-tc-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vb-text);
}
.vb-tc-subtitle {
  width: 100%;
  margin: 0;
  font-size: 12px;
  color: var(--vb-text-muted);
}
.vb-tc-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 16px 32px 32px;
  max-width: 640px;
}
.vb-tc-section-desc {
  margin: 0 0 10px;
  font-size: 12px;
  color: var(--vb-text-muted);
}
.vb-tc-empty {
  padding: 16px;
  text-align: center;
  color: var(--vb-text-dim);
  font-size: 12px;
}

/* Auto Tour scene list */
.vb-tc-scene-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.vb-tc-scene-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--vb-bg-2);
  transition: background 0.15s;
}
.vb-tc-scene-row:hover {
  background: var(--vb-bg-3);
}
.vb-tc-scene-row.active {
  background: var(--vb-primary-dim);
}
.vb-tc-scene-check {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.vb-tc-scene-check input {
  width: 15px;
  height: 15px;
  cursor: pointer;
  accent-color: var(--vb-primary);
}
.vb-tc-scene-thumb {
  width: 44px;
  height: 28px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--vb-bg-4);
}
.vb-tc-scene-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.vb-tc-scene-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.vb-tc-scene-name {
  font-size: 12px;
  color: var(--vb-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vb-tc-scene-group {
  font-size: 10px;
  color: var(--vb-text-dim);
}
.vb-tc-scene-duration {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.vb-tc-scene-duration .vb-prop-input {
  width: 60px;
  text-align: center;
  padding: 4px 6px;
  font-size: 12px;
}
.vb-tc-duration-unit {
  font-size: 11px;
  color: var(--vb-text-dim);
}
</style>
