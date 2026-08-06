<script setup>
defineProps({ playing: { type: Boolean, default: false }, disabled: { type: Boolean, default: false } });
defineEmits(['toggle']);
</script>

<template>
  <button class="viewer-audio-control" type="button" :disabled="disabled" :aria-label="playing ? 'Pause audio' : 'Play audio'" @click="$emit('toggle')">
    <svg v-if="playing" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14M17 5v14" /></svg>
    <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z" /></svg>
  </button>
</template>
