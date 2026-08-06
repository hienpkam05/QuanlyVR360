<script setup>
import { computed } from 'vue';

const props = defineProps({
  fileName: { type: String, default: '' },
  fileSize: { type: Number, default: 0 },
  source: { type: String, default: '' },
  error: { type: String, default: '' },
});
const emit = defineEmits(['select', 'remove']);
const hasFile = computed(() => Boolean(props.fileName || props.source));
const displayName = computed(() => props.fileName || props.source.split('/').pop()?.split('?')[0] || 'Audio file');
const sizeLabel = computed(() => props.fileSize ? `${(props.fileSize / 1024 / 1024).toFixed(2)} MB` : (props.source ? 'Đã lưu trên máy chủ' : 'MP3, WAV, M4A, OGG'));
</script>

<template>
  <div class="vb-audio-upload" :class="{ 'has-file': hasFile, error }">
    <template v-if="hasFile">
      <span class="vb-audio-upload-file-icon" aria-hidden="true">◖))</span>
      <div class="vb-audio-upload-file-copy"><strong>{{ displayName }}</strong><small>{{ sizeLabel }}</small></div>
      <button type="button" class="vb-audio-upload-action" @click="emit('select')">Thay thế</button>
      <button type="button" class="vb-audio-upload-remove" aria-label="Xóa audio" @click="emit('remove')">×</button>
    </template>
    <button v-else type="button" class="vb-audio-upload-empty" @click="emit('select')">
      <span class="vb-audio-upload-empty-icon" aria-hidden="true">◖))</span>
      <span><strong>Tải audio lên</strong><small>Kéo thả hoặc chọn tệp âm thanh</small></span>
    </button>
    <p v-if="error" class="vb-audio-upload-error">{{ error }}</p>
  </div>
</template>
