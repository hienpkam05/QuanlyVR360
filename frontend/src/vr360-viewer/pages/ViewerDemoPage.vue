<script setup>
import { ref } from 'vue';

import fixture from '../assets/demo-tour.json';
import Vr360Viewer from '../components/Vr360Viewer.vue';

const tour = ref(fixture);
</script>

<template>
  <Vr360Viewer :tour="tour" :options="{ brand: 'VR360 DEMO', autoRotate: false }" />
</template>
