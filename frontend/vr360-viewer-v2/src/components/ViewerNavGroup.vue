<script setup>
defineProps({
  label: { type: String, required: true },
});
</script>

<template>
  <!-- Only the button cluster captures pointer events so panorama drag/pinch
   * keeps working across the rest of the overlay area. -->
  <div class="vr360-v2-nav-group" role="group" :aria-label="label">
    <slot />
  </div>
</template>
