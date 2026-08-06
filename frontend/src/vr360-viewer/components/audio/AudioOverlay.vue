<script setup>
import AudioMiniPlayer from './AudioMiniPlayer.vue';
import AudioBottomSheet from './AudioBottomSheet.vue';

const props = defineProps({
  audioStore: { type: Object, required: true },
  audioService: { type: Object, required: true },
  tour: { type: Object, default: () => ({}) },
  open: Boolean,
});

const emit = defineEmits(['open', 'close', 'play-tour']);
</script>

<template>
  <AudioMiniPlayer
    v-if="!open"
    :session="audioStore.state.activeSession"
    @toggle="audioService.toggle"
    @open="emit('open')"
    @seek="audioService.seek"
  />
  <div
    v-if="open"
    class="viewer-audio-backdrop"
    aria-hidden="true"
    @click="emit('close')"
  ></div>
  <AudioBottomSheet
    v-if="open"
    class="viewer-audio-panel-layer"
    :session="audioStore.state.activeSession"
    :tour="tour"
    :open="open"
    @close="emit('close')"
    @toggle="audioService.toggle"
    @play-tour="emit('play-tour')"
    @seek="audioService.seek"
    @volume="audioService.setVolume"
    @toggle-mute="audioStore.state.activeSession.muted ? audioService.unmute() : audioService.mute()"
  />
</template>
