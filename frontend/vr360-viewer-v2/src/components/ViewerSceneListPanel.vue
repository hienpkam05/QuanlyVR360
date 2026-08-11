<script setup>
import { nextTick, ref, watch } from 'vue';

const props = defineProps({
  scenes: { type: Array, default: () => [] },
  currentSceneId: { type: String, default: '' },
  visitedSceneIds: { type: Object, default: () => new Set() },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['select-scene']);
const list = ref(null);

function select(sceneId) {
  if (props.disabled || !sceneId) return;
  emit('select-scene', sceneId);
}

watch(
  () => props.currentSceneId,
  async () => {
    await nextTick();
    list.value?.querySelector('[aria-current="true"]')?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    });
  },
  { immediate: true },
);
</script>

<template>
  <!-- Presentation only. Scene data and scene switching stay owned by the core
   viewer and are reached through the Adapter/Facade boundary. -->
  <aside class="vr360-v2-scene-panel" role="dialog" aria-label="Danh sách hình ảnh">
    <header class="vr360-v2-scene-panel__header">
      <h2 class="vr360-v2-scene-panel__title">Scenes</h2>
      <span class="vr360-v2-scene-panel__accent" aria-hidden="true"></span>
    </header>
    <ul ref="list" class="vr360-v2-scene-panel__list">
      <li v-for="(scene, index) in scenes" :key="scene.id">
        <button
          class="vr360-v2-scene-panel__item"
          :class="{ 'is-current': scene.id === currentSceneId }"
          type="button"
          :aria-current="scene.id === currentSceneId ? 'true' : undefined"
          :aria-label="`Cảnh ${index + 1}: ${scene.name || ''}${scene.id === currentSceneId ? ', hiện tại' : ''}${visitedSceneIds?.has?.(scene.id) ? ', đã ghé thăm' : ''}`"
          :title="scene.name || ''"
          :disabled="disabled"
          @click="select(scene.id)"
        >
          <span
            class="vr360-v2-scene-panel__thumb"
            :style="scene.thumbnailSource ? { backgroundImage: `url(${scene.thumbnailSource})` } : {}"
            aria-hidden="true"
          ></span>
          <span class="vr360-v2-scene-panel__name">{{ scene.name }}</span>
          <!-- The core visual checked state denotes a visited scene, while the
           active class independently denotes the current scene. -->
          <span
            v-if="visitedSceneIds?.has?.(scene.id)"
            class="vr360-v2-scene-panel__check"
            aria-hidden="true"
          >✓</span>
        </button>
      </li>
    </ul>
  </aside>
</template>
