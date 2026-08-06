<script setup>
defineProps({ value: { type: Number, default: 1 } });
defineEmits(['change']);
</script>

<template>
  <label class="viewer-audio-rate">
    <span>Speed</span>
    <select :value="value" aria-label="Playback speed" @change="$emit('change', Number($event.target.value))">
      <option :value="0.75">0.75×</option>
      <option :value="1">1×</option>
      <option :value="1.25">1.25×</option>
      <option :value="1.5">1.5×</option>
      <option :value="2">2×</option>
    </select>
  </label>
</template>
