<script setup>
defineProps({
  active: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['click']);
function handleClick(event) {
  if (import.meta.env?.DEV) console.debug('[BottomNav] Audio Click');
  emit('click', event);
}
</script>

<template>
  <button
    class="viewer-audio-button"
    type="button"
    aria-label="Open audio controls"
    title="Audio"
    :aria-pressed="active"
    :disabled="disabled"
    @click="handleClick"
  >
    <svg class="viewer-audio-button-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h3l4 3V7l-4 3H4z" /><path d="M15 9.5a4 4 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10" /></svg>
  </button>
</template>
