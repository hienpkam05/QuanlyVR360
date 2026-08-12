<script setup>
import { computed, ref } from 'vue';
import ViewerNavButton from './ViewerNavButton.vue';

const props = defineProps({
  adapter: { type: Object, required: true },
  audioState: { type: Object, default: () => ({ available: false }) },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['command-result']);
const panelOpen = ref(false);

const hasProgress = computed(() => Number(props.audioState.duration) > 0);
const progress = computed(() => {
  const duration = Number(props.audioState.duration);
  const currentTime = Number(props.audioState.currentTime);
  return duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
});
const statusLabel = computed(() => {
  if (!props.audioState.available) return 'Âm thanh không khả dụng';
  if (props.audioState.muted) return 'Âm thanh đã tắt tiếng';
  if (props.audioState.playing) return 'Âm thanh đang phát';
  if (props.audioState.paused) return 'Âm thanh đang tạm dừng';
  return 'Bật âm thanh';
});

function run(command, name, value) {
  try {
    const result = props.adapter[command](value);
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

function seek(event) {
  if (!hasProgress.value) return;
  run('seekAudio', 'seek-audio', Number(event.target.value));
}

function closeAfterFocusLeaves(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) panelOpen.value = false;
}
</script>

<template>
  <div
    class="vr360-v2-audio-control"
    :class="{ 'is-open': panelOpen }"
    @mouseenter="panelOpen = true"
    @mouseleave="panelOpen = false"
    @focusin="panelOpen = true"
    @focusout="closeAfterFocusLeaves"
  >
    <ViewerNavButton
      :label="audioState.playing ? 'Tạm dừng âm thanh' : 'Bật âm thanh'"
      :title="statusLabel"
      :active="audioState.playing"
      :disabled="disabled"
      @activate="run('toggleAudio', 'toggle-audio')"
    >
      <span class="vr360-v2-audio-icon" :class="{ 'is-playing': audioState.playing, 'is-muted': audioState.muted }" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 10h4l5-4v12l-5-4H4z" />
          <path class="vr360-v2-audio-wave vr360-v2-audio-wave--one" d="M16 9c1.2 1.6 1.2 4.4 0 6" />
          <path class="vr360-v2-audio-wave vr360-v2-audio-wave--two" d="M18.5 6.5c2.6 3.1 2.6 7.9 0 11" />
          <path v-if="audioState.muted" d="m16 9 5 6m0-6-5 6" />
        </svg>
      </span>
    </ViewerNavButton>

    <div v-if="hasProgress" class="vr360-v2-audio-panel" role="group" aria-label="Tiến trình âm thanh">
      <span class="vr360-v2-audio-panel__label">{{ statusLabel }}</span>
      <input
        class="vr360-v2-audio-panel__progress"
        type="range"
        min="0"
        :max="audioState.duration"
        :value="audioState.currentTime || 0"
        :aria-label="`Tiến trình âm thanh: ${Math.round(progress)}%`"
        :disabled="disabled"
        @input="seek"
      >
    </div>
  </div>
</template>
