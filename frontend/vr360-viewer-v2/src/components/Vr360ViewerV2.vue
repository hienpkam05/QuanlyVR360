<script setup>
import Vr360ViewerLayoutV2 from '../layout/Vr360ViewerLayoutV2.vue';

defineProps({
  facade: { type: Object, required: true },
});

const emit = defineEmits(['adapter-error', 'command-result']);
</script>

<template>
  <div class="vr360-v2-viewer">
    <Vr360ViewerLayoutV2
      :facade="facade"
      @adapter-error="emit('adapter-error', $event)"
      @command-result="emit('command-result', $event)"
    >
      <template #viewer="slotProps">
        <slot name="viewer" v-bind="slotProps" />
      </template>
    </Vr360ViewerLayoutV2>
  </div>
</template>
