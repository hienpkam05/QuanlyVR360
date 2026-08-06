<script setup>
import { computed, watch } from 'vue';
import { formatDuration } from '../../common/audio/utils.js';
import AudioControls from './AudioControls.vue';
import AudioProgress from './AudioProgress.vue';

const props = defineProps({ session: { type: Object, required: true } });
const emit = defineEmits(['toggle', 'open', 'seek']);
const isVisible = computed(() => Boolean(props.session?.url && props.session.status === 'playing'));
const sourceLabel = computed(() => props.session.sourceType === 'poi' ? 'POI narration' : 'Tour narration');
watch(isVisible, (visible) => {
  if (visible && import.meta.env?.DEV) console.debug('[BottomNav] Open Mini Player');
});
</script>

<template>
  <Transition name="viewer-audio-mini">
    <section v-if="isVisible" class="viewer-audio-mini-player" aria-label="Now playing audio">
      <button type="button" class="viewer-audio-mini-art" aria-label="Open audio controls" @click="emit('open')">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h3l4 3V7l-4 3H4z" /><path d="M15 9.5a4 4 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10" /></svg>
      </button>
      <button type="button" class="viewer-audio-mini-copy" @click="emit('open')">
        <span class="viewer-audio-mini-eyebrow">Playing · {{ sourceLabel }}</span>
        <strong>{{ session.title || (session.sourceType === 'poi' ? 'Audio POI' : 'Tour narration') }}</strong>
        <small>{{ formatDuration(session.currentTime) }} / {{ formatDuration(session.duration) }}</small>
      </button>
      <AudioControls :playing="true" @toggle="emit('toggle')" />
      <AudioProgress class="viewer-audio-mini-progress" compact :current-time="session.currentTime" :duration="session.duration" @seek="emit('seek', $event)" />
    </section>
  </Transition>
</template>
