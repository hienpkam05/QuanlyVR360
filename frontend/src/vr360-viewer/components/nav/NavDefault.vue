<script setup>
import navArrowImg from '../../assets/hotspotelement.png';

defineProps({
  thumbnail: { type: String, default: '' },
  sceneName: { type: String, default: '' },
});
</script>

<template>
  <span class="viewer-nav-default" aria-hidden="true">
    <span class="viewer-nav-default-arrow">
      <img :src="navArrowImg" alt="" draggable="false" />
    </span>
  </span>
  <span v-if="thumbnail" class="viewer-nav-default-preview" aria-hidden="true">
    <img :src="thumbnail" alt="" draggable="false" crossorigin="anonymous" />
    <span v-if="sceneName" class="viewer-nav-default-preview-name">{{ sceneName }}</span>
  </span>
</template>
