<script setup>
import { computed } from 'vue';
import { formatDuration } from '../../common/audio/utils.js';

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  compact: { type: Boolean, default: false },
});

const emit = defineEmits(['seek']);
const progress = computed(() => props.duration > 0 ? Math.min(100, (props.currentTime / props.duration) * 100) : 0);
function onInput(event) { emit('seek', Number(event.target.value)); }
</script>

<template>
  <div class="viewer-audio-progress" :class="{ compact }">
    <input
      type="range"
      min="0"
      :max="duration || 0"
      step="0.1"
      :value="currentTime"
      :disabled="!duration"
      aria-label="Audio progress"
      :style="{ '--audio-progress': `${progress}%` }"
      @input="onInput"
    />
    <div v-if="!compact" class="viewer-audio-progress-time">
      <span>{{ formatDuration(currentTime) }}</span>
      <span>{{ formatDuration(duration) }}</span>
    </div>
  </div>
</template>
