<script setup>
import { computed, ref } from 'vue';

const props = defineProps({ point: { type: Object, required: true } });
const emit = defineEmits(['close']);
const index = ref(0);
const zoom = ref(1);
const images = computed(() => {
  const values = props.point.media?.images?.length ? props.point.media.images : [props.point.media?.imageUrl].filter(Boolean);
  return values;
});
const current = computed(() => images.value[index.value] || '');
const title = computed(() => props.point.content?.title || props.point.label || '');
function move(delta) { index.value = (index.value + delta + images.value.length) % images.value.length; zoom.value = 1; }
</script>

<template>
  <div class="poi-popup-backdrop poi-image-backdrop" @click.self="emit('close')">
    <img
      class="poi-image-main"
      :src="current"
      :alt="title || 'Hình ảnh'"
      :style="zoom > 1 ? { transform: `scale(${zoom})` } : undefined"
      @wheel.prevent="zoom = Math.min(4, Math.max(1, zoom - $event.deltaY * 0.001))"
    />
    <button class="poi-image-close" type="button" aria-label="Đóng" @click="emit('close')">×</button>
    <button v-if="images.length > 1" class="poi-image-prev" type="button" aria-label="Ảnh trước" @click="move(-1)">‹</button>
    <button v-if="images.length > 1" class="poi-image-next" type="button" aria-label="Ảnh tiếp" @click="move(1)">›</button>
    <span v-if="images.length > 1" class="poi-image-counter">{{ index + 1 }} / {{ images.length }}</span>
  </div>
</template>
