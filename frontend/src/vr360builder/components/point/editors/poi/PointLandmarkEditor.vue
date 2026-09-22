<script setup>
defineProps({ hotspot: { type: Object, required: true }, scenes: { type: Array, default: () => [] } });
const emit = defineEmits(['update']);
</script>
<template>
  <div>
    <div class="vb-prop-row"><label class="vb-prop-label">Tên địa danh</label><input class="vb-prop-input" :value="hotspot.label" @input="emit('update', 'label', $event.target.value)" /></div>
    <div class="vb-prop-row"><label class="vb-prop-label">Chuyển cảnh tới</label><select class="vb-prop-input" :value="hotspot.target || ''" @change="emit('update', 'target', $event.target.value)"><option value="">Chọn cảnh...</option><option v-for="scene in scenes" :key="scene.id" :value="scene.id">{{ scene.name }}</option></select></div>
    <div class="vb-prop-row-inline"><div class="vb-prop-row"><label class="vb-prop-label">LON</label><input class="vb-prop-input vb-prop-input-mono" type="number" step="0.1" :value="hotspot.lon" @input="emit('update', 'lon', +$event.target.value)" /></div><div class="vb-prop-row"><label class="vb-prop-label">LAT</label><input class="vb-prop-input vb-prop-input-mono" type="number" step="0.1" :value="hotspot.lat" @input="emit('update', 'lat', +$event.target.value)" /></div></div>
  </div>
</template>
