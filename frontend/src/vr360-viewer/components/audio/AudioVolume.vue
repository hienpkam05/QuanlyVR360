<script setup>
import { computed } from 'vue';

const props = defineProps({ value: { type: Number, default: 1 }, muted: { type: Boolean, default: false } });
defineEmits(['input', 'toggle-mute']);
const volumePercent = computed(() => `${Math.max(0, Math.min(1, Number(props.value) || 0)) * 100}%`);
</script>

<template>
  <div class="viewer-audio-volume-control">
    <button type="button" class="viewer-audio-volume-icon" :aria-label="muted ? 'Unmute audio' : 'Mute audio'" @click="$emit('toggle-mute')">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h3l4 3V7l-4 3H4z" /><path v-if="!muted" d="M15 9.5a4 4 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10" /><path v-else d="m16 9 5 6M21 9l-5 6" /></svg>
    </button>
    <input type="range" min="0" max="1" step="0.01" :value="value" aria-label="Volume" :style="{ '--audio-volume': volumePercent }" @input="$emit('input', Number($event.target.value))" />
  </div>
</template>
