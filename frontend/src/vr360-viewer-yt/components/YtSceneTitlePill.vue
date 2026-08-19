<script setup>
defineProps({
  tourTitle: { type: String, default: '' },
  sceneName: { type: String, default: '' },
  sceneIndex: { type: Number, default: -1 },
  totalScenes: { type: Number, default: 0 },
});
</script>

<template>
  <div class="yt-title-pill yt-fadeable" role="status" aria-live="polite">
    <!-- <span class="yt-title-pill__tag">VR 360°</span> -->
    <span class="yt-title-pill__name">{{ sceneName || tourTitle || 'VR360' }}</span>
    <!-- <span v-if="totalScenes > 1 && sceneIndex >= 0" class="yt-title-pill__meta">
      {{ sceneIndex + 1 }} / {{ totalScenes }}
    </span> -->
  </div>
</template>
