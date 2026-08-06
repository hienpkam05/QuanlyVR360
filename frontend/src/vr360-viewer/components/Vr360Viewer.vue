<script setup>
import { ref } from 'vue';
import Vr360ViewerLayout from '../layout/Vr360ViewerLayout.vue';

defineProps({
  tour: { type: Object, default: null },
  options: { type: Object, default: () => ({}) },
});

defineEmits(['ready', 'scene-change', 'hotspot-click', 'load-progress', 'load-complete', 'error', 'back']);

const layout = ref(null);

defineExpose({
  goToScene: (...args) => layout.value?.goToScene?.(...args),
  nextScene: () => layout.value?.nextScene?.(),
  previousScene: () => layout.value?.previousScene?.(),
  getView: () => layout.value?.getView?.(),
  setView: (...args) => layout.value?.setView?.(...args),
  resetView: () => layout.value?.resetView?.(),
  toggleAutorotate: (...args) => layout.value?.toggleAutorotate?.(...args),
  enterFullscreen: () => layout.value?.enterFullscreen?.(),
  exitFullscreen: () => layout.value?.exitFullscreen?.(),
  dispose: () => layout.value?.dispose?.(),
});
</script>

<template>
  <Vr360ViewerLayout ref="layout" :tour="tour" :options="options" @ready="$emit('ready', $event)" @scene-change="$emit('scene-change', $event)" @hotspot-click="$emit('hotspot-click', $event)" @load-progress="$emit('load-progress', $event)" @load-complete="$emit('load-complete', $event)" @error="$emit('error', $event)" @back="$emit('back')" />
</template>
