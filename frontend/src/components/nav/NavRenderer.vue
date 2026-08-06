<script setup>
import { computed, markRaw } from 'vue';

import { NAV_STYLES, normalizeNavStyle } from '@/common/vr360/tourDataMapper.js';
import NavDefault from './NavDefault.vue';
import NavPreviewExpand from './NavPreviewExpand.vue';

const props = defineProps({
  hotspot: { type: Object, required: true },
});

const navRendererMap = {
  [NAV_STYLES.default]: markRaw(NavDefault),
  [NAV_STYLES.previewExpand]: markRaw(NavPreviewExpand),
};

const renderer = computed(() => navRendererMap[normalizeNavStyle(props.hotspot.navStyle)]);
</script>

<template>
  <component
    :is="renderer"
    :thumbnail="hotspot.preview_image"
    :scene-name="hotspot.target_scene_name"
  />
</template>
