<script setup>
import { computed } from "vue";

const props = defineProps({ noiDung: { type: Object, default: () => ({}) } });
const emit = defineEmits(["update-content", "select-images"]);

const galleryUrls = computed(() =>
  Array.isArray(props.noiDung?.danh_sach_anh) ? props.noiDung.danh_sach_anh : [],
);

function updateUrls(value) {
  emit(
    "update-content",
    "danh_sach_anh",
    value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  );
}

function onSelectFiles(event) {
  const files = Array.from(event.target.files || []).filter((file) =>
    file.type?.startsWith("image/"),
  );
  if (files.length) emit("select-images", files);
  event.target.value = "";
}
</script>

<template>
  <div class="vb-gallery-editor">
    <div class="vb-prop-row">
      <label class="vb-prop-label">Tiêu đề thư viện</label>
      <input
        class="vb-prop-input"
        :value="noiDung?.tieu_de || ''"
        @input="emit('update-content', 'tieu_de', $event.target.value)"
        placeholder="Nhập tiêu đề..."
      />
    </div>

    <label class="vb-gallery-upload">
      <input type="file" accept="image/*" multiple @change="onSelectFiles" />
      <span>+ Upload ảnh</span>
      <small>Chọn một hoặc nhiều ảnh, ảnh sẽ lưu khi bấm Save Tour.</small>
    </label>

    <div v-if="galleryUrls.length" class="vb-gallery-preview-grid">
      <div
        v-for="(url, index) in galleryUrls"
        :key="`${url}-${index}`"
        class="vb-gallery-preview-item"
      >
        <img :src="url" :alt="`Ảnh thư viện ${index + 1}`" />
        <span>#{{ index + 1 }}</span>
      </div>
    </div>

    <div class="vb-prop-row" style="margin-bottom: 0">
      <label class="vb-prop-label">Danh sách ảnh (mỗi URL 1 dòng)</label>
      <textarea
        class="vb-prop-input vb-prop-input-mono"
        rows="4"
        :value="galleryUrls.join('\n')"
        @change="updateUrls($event.target.value)"
        placeholder="https://...&#10;https://..."
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
.vb-gallery-editor {
  display: grid;
  gap: 14px;
}

.vb-gallery-upload {
  display: grid;
  gap: 6px;
  padding: 16px;
  border: 1px dashed rgba(34, 211, 238, 0.35);
  border-radius: 14px;
  background: rgba(34, 211, 238, 0.06);
  color: #e5e7eb;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    transform 0.18s ease;
}

.vb-gallery-upload:hover {
  transform: translateY(-1px);
  border-color: rgba(34, 211, 238, 0.75);
  background: rgba(34, 211, 238, 0.11);
}

.vb-gallery-upload input {
  display: none;
}

.vb-gallery-upload span {
  color: #22d3ee;
  font-size: 14px;
  font-weight: 800;
}

.vb-gallery-upload small {
  color: #9ca3af;
  font-size: 12px;
  line-height: 1.45;
}

.vb-gallery-preview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.vb-gallery-preview-item {
  position: relative;
  overflow: hidden;
  min-height: 76px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.45);
}

.vb-gallery-preview-item img {
  width: 100%;
  height: 76px;
  object-fit: cover;
  display: block;
}

.vb-gallery-preview-item span {
  position: absolute;
  left: 6px;
  top: 6px;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.78);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}
</style>
