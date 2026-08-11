<script setup>
defineProps({
  label: { type: String, required: true },
  title: { type: String, default: '' },
  active: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  expanded: { type: Boolean, default: null },
});

const emit = defineEmits(['activate']);
</script>

<template>
  <button
    class="vr360-v2-nav-button"
    :class="{ 'is-active': active }"
    type="button"
    :aria-label="label"
    :aria-pressed="active || undefined"
    :aria-expanded="expanded === null ? undefined : expanded"
    :title="title || label"
    :disabled="disabled"
    @click="emit('activate')"
  >
    <slot />
  </button>
</template>
