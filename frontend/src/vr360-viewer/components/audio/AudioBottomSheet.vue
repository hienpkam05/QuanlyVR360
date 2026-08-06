<script setup>
import { computed, watch } from 'vue';
import AudioControls from './AudioControls.vue';
import AudioProgress from './AudioProgress.vue';
import AudioVolume from './AudioVolume.vue';

const props = defineProps({
  session: { type: Object, required: true },
  open: Boolean,
  tour: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['close', 'toggle', 'seek', 'volume', 'toggle-mute', 'play-tour']);
const hasActiveSession = computed(() => Boolean(props.session?.url));
const canStartTour = computed(() => Boolean(props.tour?.enabled && props.tour?.url));
const title = computed(() => hasActiveSession.value
  ? (props.session.title || (props.session.sourceType === 'poi' ? 'Audio POI' : 'Tour narration'))
  : (props.tour?.title || 'Tour narration'));
const subtitle = computed(() => {
  if (hasActiveSession.value && props.session.sourceType === 'poi') return 'Thuyết minh điểm tham quan';
  if (hasActiveSession.value) return 'Thuyết minh tour';
  return canStartTour.value ? 'Sẵn sàng phát' : 'Chưa có thuyết minh tour';
});
const isPlaying = computed(() => props.session?.status === 'playing');
watch(() => props.open, (open) => {
  if (open && import.meta.env?.DEV) console.debug('[BottomNav] Open Bottom Sheet');
});

function toggle() {
  if (import.meta.env?.DEV) console.debug('[BottomNav] Bottom Sheet command', hasActiveSession.value ? 'toggle' : 'play-tour');
  if (hasActiveSession.value) emit('toggle');
  else if (canStartTour.value) emit('play-tour');
}
</script>

<template>
  <section v-if="open" class="viewer-audio-sheet" role="dialog" aria-modal="true" aria-labelledby="viewer-audio-title">
    <div class="viewer-audio-sheet-handle" aria-hidden="true"></div>
    <header class="viewer-audio-sheet-header">
      <span class="viewer-audio-sheet-kicker">Âm thanh</span>
      <button type="button" class="viewer-audio-sheet-close" aria-label="Đóng điều khiển âm thanh" @click="emit('close')">×</button>
    </header>

    <div class="viewer-audio-sheet-now">
      <span class="viewer-audio-sheet-art" :class="{ playing: isPlaying }" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 10v4h3l4 3V7l-4 3H4z" /><path d="M15 9.5a4 4 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10" /></svg></span>
      <div>
        <h2 id="viewer-audio-title">{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>
    </div>

    <AudioProgress :current-time="session.currentTime" :duration="session.duration" :class="{ disabled: !hasActiveSession }" @seek="emit('seek', $event)" />

    <div class="viewer-audio-sheet-primary">
      <AudioControls :playing="isPlaying" :disabled="!hasActiveSession && !canStartTour" @toggle="toggle" />
      <span>{{ isPlaying ? 'Đang phát' : hasActiveSession ? 'Đã tạm dừng' : canStartTour ? 'Bắt đầu thuyết minh' : 'Chưa có audio' }}</span>
    </div>

    <div v-if="hasActiveSession" class="viewer-audio-sheet-settings">
      <AudioVolume :value="session.volume" :muted="session.muted" @input="emit('volume', $event)" @toggle-mute="emit('toggle-mute')" />
    </div>
  </section>
</template>
