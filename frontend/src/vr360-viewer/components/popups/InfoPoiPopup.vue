<script setup>
defineProps({ point: { type: Object, required: true } });
const emit = defineEmits(['close']);
</script>

<template>
  <div class="poi-popup-backdrop" @click.self="emit('close')">
    <article class="poi-popup poi-info-popup" role="dialog" aria-modal="true" aria-labelledby="poi-info-title">
      <button class="poi-popup-close" type="button" aria-label="Đóng" @click="emit('close')">×</button>
      <span class="poi-popup-eyebrow">INFORMATION</span>
      <h2 id="poi-info-title">{{ point.content?.title || point.label }}</h2>
      <p v-if="point.content?.description">{{ point.content.description }}</p>
      <img v-if="point.media?.imageUrl" class="poi-info-image" :src="point.media.imageUrl" alt="" />
    </article>
  </div>
</template>
