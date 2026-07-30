<script setup>
defineProps({ noiDung: { type: Object, default: () => ({}) } });
const emit = defineEmits(["update-content", "select-video"]);

function onSelectVideo(event) {
  const file = event.target.files?.[0];
  if (file) emit("select-video", file);
  event.target.value = "";
}
</script>

<template>
  <div class="vb-video-editor">
    <div class="vb-prop-row">
      <label class="vb-prop-label">URL video</label>
      <input
        class="vb-prop-input vb-prop-input-mono"
        :value="noiDung?.url_video || ''"
        @input="emit('update-content', 'url_video', $event.target.value)"
        placeholder="https://youtube.com/... hoặc .mp4"
      />
    </div>

    <label class="vb-video-upload">
      <input type="file" accept="video/*" @change="onSelectVideo" />
      <span>+ Upload video</span>
      <small>Chọn file mp4/webm/mov, video sẽ lưu khi bấm Save Tour.</small>
    </label>

    <div v-if="noiDung?.url_video" class="vb-video-preview">
      <video
        v-if="String(noiDung.url_video).startsWith('blob:') || /\.(mp4|webm|ogg|mov)(\?|$)/i.test(noiDung.url_video)"
        :src="noiDung.url_video"
        controls
        muted
      ></video>
      <div v-else class="vb-video-link-preview">
        <span>Video URL</span>
        <small>{{ noiDung.url_video }}</small>
      </div>
    </div>

    <div class="vb-prop-row">
      <label class="vb-prop-label">Tiêu đề video</label>
      <input
        class="vb-prop-input"
        :value="noiDung?.tieu_de || ''"
        @input="emit('update-content', 'tieu_de', $event.target.value)"
        placeholder="Nhập tiêu đề..."
      />
    </div>

    <div class="vb-prop-row" style="margin-bottom: 0">
      <label class="vb-prop-label vb-hover-toggle-label">
        <input
          type="checkbox"
          :checked="!!noiDung?.tu_dong_phat"
          @change="emit('update-content', 'tu_dong_phat', $event.target.checked)"
        />
        Tự động phát
      </label>
    </div>
  </div>
</template>

<style scoped>
.vb-video-editor {
  display: grid;
  gap: 14px;
}

.vb-video-upload {
  display: grid;
  gap: 6px;
  padding: 16px;
  border: 1px dashed rgba(248, 113, 113, 0.38);
  border-radius: 14px;
  background: rgba(248, 113, 113, 0.07);
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    transform 0.18s ease;
}

.vb-video-upload:hover {
  transform: translateY(-1px);
  border-color: rgba(248, 113, 113, 0.78);
  background: rgba(248, 113, 113, 0.12);
}

.vb-video-upload input {
  display: none;
}

.vb-video-upload span {
  color: #fb7185;
  font-size: 14px;
  font-weight: 800;
}

.vb-video-upload small {
  color: #9ca3af;
  font-size: 12px;
  line-height: 1.45;
}

.vb-video-preview {
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.48);
}

.vb-video-preview video {
  display: block;
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  background: #020617;
}

.vb-video-link-preview {
  display: grid;
  gap: 6px;
  padding: 14px;
}

.vb-video-link-preview span {
  color: #e5e7eb;
  font-size: 13px;
  font-weight: 800;
}

.vb-video-link-preview small {
  overflow: hidden;
  color: #9ca3af;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
