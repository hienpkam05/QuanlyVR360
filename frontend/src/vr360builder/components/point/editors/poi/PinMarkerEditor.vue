<script setup>
defineProps({ hotspot: { type: Object, required: true } });
const emit = defineEmits(['update']);
</script>

<template>
  <div>
    <div class="vb-prop-row">
      <label class="vb-prop-label">Chiều cao đường ghim (px)</label>
      <input class="vb-prop-input vb-prop-input-mono" type="number" min="10" step="4" :value="hotspot.chieu_cao_duong_ghim || 54" @input="emit('update', 'chieu_cao_duong_ghim', +$event.target.value)" />
    </div>
  </div>
</template>