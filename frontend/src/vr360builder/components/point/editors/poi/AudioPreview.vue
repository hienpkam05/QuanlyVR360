<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({ src: { type: String, default: '' } });
const audio = ref(null);
const playing = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const progress = computed(() => duration.value ? (currentTime.value / duration.value) * 100 : 0);
const formatTime = (value) => {
  const seconds = Math.max(0, Math.floor(Number(value) || 0));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};
function syncMetadata() { duration.value = Number.isFinite(audio.value?.duration) ? audio.value.duration : 0; }
function syncTime() { currentTime.value = audio.value?.currentTime || 0; }
async function toggle() {
  if (!audio.value) return;
  if (audio.value.paused) await audio.value.play(); else audio.value.pause();
}
function seek(event) { if (audio.value) audio.value.currentTime = Number(event.target.value); }
function reset() { playing.value = false; currentTime.value = 0; duration.value = 0; }
watch(() => props.src, reset);
onBeforeUnmount(() => audio.value?.pause());
</script>

<template>
  <div v-if="src" class="vb-audio-preview">
    <audio ref="audio" :src="src" preload="metadata" @loadedmetadata="syncMetadata" @timeupdate="syncTime" @play="playing = true" @pause="playing = false" @ended="playing = false" />
    <button type="button" class="vb-audio-preview-play" :aria-label="playing ? 'Tạm dừng' : 'Phát audio'" @click="toggle">{{ playing ? 'Ⅱ' : '▶' }}</button>
    <div class="vb-audio-preview-track"><input type="range" min="0" :max="duration || 0" step="0.1" :value="currentTime" :style="{ '--audio-progress': `${progress}%` }" @input="seek" /><small>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</small></div>
    <span class="vb-audio-preview-label">Preview</span>
  </div>
</template>
