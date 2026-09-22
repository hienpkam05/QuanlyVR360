<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: "" },
});

const emit = defineEmits(["close"]);

function handleClose() {
  emit("close");
}
</script>

<template>
  <div v-if="isOpen" class="bottom-sheet-backdrop" @click="handleClose">
    <div class="bottom-sheet-container" @click.stop>
      <div class="bottom-sheet-handle"></div>
      <div class="bottom-sheet-header">
        <h3 class="bottom-sheet-title">{{ title }}</h3>
        <button class="bottom-sheet-close" type="button" @click="handleClose" aria-label="Đóng">✕</button>
      </div>
      <div class="bottom-sheet-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottom-sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: flex-end;
}
.bottom-sheet-container {
  width: 100%;
  max-height: 80vh;
  background: #ffffff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  animation: sheet-slide-up 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.bottom-sheet-handle {
  width: 40px;
  height: 4px;
  background: #cbd5e1;
  border-radius: 999px;
  margin: 10px auto 4px;
}
.bottom-sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #e2e8f0;
}
.bottom-sheet-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}
.bottom-sheet-close {
  background: transparent;
  border: 0;
  font-size: 18px;
  color: #64748b;
  cursor: pointer;
  padding: 4px 8px;
}
.bottom-sheet-content {
  overflow-y: auto;
  padding: 16px 20px 24px;
}
@keyframes sheet-slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>
