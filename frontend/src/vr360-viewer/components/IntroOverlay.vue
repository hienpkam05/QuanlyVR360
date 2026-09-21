<script setup>
defineProps({
  title: { type: String, default: 'VR360 Virtual Tour' },
  subtitle: { type: String, default: 'Khám phá không gian 360°' },
  brand: { type: String, default: '' },
  starting: { type: Boolean, default: false },
  ready: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
});

const emit = defineEmits(['start']);
</script>

<template>
  <section class="viewer-intro" :class="{ 'is-starting': starting }" aria-labelledby="viewer-intro-title">
    <div class="viewer-intro-card">
      <p v-if="brand" class="viewer-intro-brand">{{ brand }}</p>
      <h1 id="viewer-intro-title">{{ title }}</h1>
      <p class="viewer-intro-subtitle">{{ subtitle }}</p>
      <button class="viewer-intro-start" type="button" :disabled="starting || !ready" @click="emit('start')">
        <span class="viewer-intro-start-label-full">{{ starting ? 'Đang mở hành trình' : error ? 'Không thể tải panorama' : ready ? 'Bắt đầu khám phá' : 'Đang tải...' }}</span>
        <span class="viewer-intro-start-label-short">{{ starting ? 'Đang mở' : error ? 'Lỗi tải' : ready ? 'Khám phá' : 'Đang tải...' }}</span>
        <svg v-if="ready || starting" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </button>
    </div>
  </section>
</template>
