<script setup>
defineProps({
  title: { type: String, required: true },
  open: { type: Boolean, default: true },
  badge: { type: String, default: '' },
  badgeClass: { type: String, default: '' },
});
const emit = defineEmits(['toggle']);
</script>

<template>
  <div class="vb-acc-item">
    <div class="vb-acc-header" @click="emit('toggle')">
      <svg class="vb-acc-chevron" :class="{ open }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
      <slot name="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </slot>
      <span>{{ title }}</span>
      <span v-if="badge" class="vb-acc-badge" :class="badgeClass">{{ badge }}</span>
    </div>
    <Transition name="acc">
      <div v-show="open" class="vb-acc-body">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.acc-enter-active { transition: all 0.2s ease; overflow: hidden; }
.acc-leave-active { transition: all 0.15s ease; overflow: hidden; }
.acc-enter-from, .acc-leave-to { opacity: 0; max-height: 0; }
.acc-enter-to, .acc-leave-from { opacity: 1; max-height: 600px; }
</style>