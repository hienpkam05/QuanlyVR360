<script setup>
defineProps({
  title: { type: String, default: 'VR360 Virtual Tour' },
  subtitle: { type: String, default: 'Khám phá không gian 360°' },
  brand: { type: String, default: '' },
  starting: { type: Boolean, default: false },
});

const emit = defineEmits(['start']);
</script>

<template>
  <section class="viewer-intro" :class="{ 'is-starting': starting }" aria-labelledby="viewer-intro-title">
    <div class="viewer-intro-card">
      <p v-if="brand" class="viewer-intro-brand">{{ brand }}</p>
      <h1 id="viewer-intro-title">{{ title }}</h1>
      <p class="viewer-intro-subtitle">{{ subtitle }}</p>
      <button class="viewer-intro-start" type="button" :disabled="starting" @click="emit('start')">
        <span>{{ starting ? 'Đang mở hành trình' : 'Bắt đầu khám phá' }}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </button>
    </div>
  </section>
</template>
