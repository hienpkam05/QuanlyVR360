<script setup>
import AudioUpload from './AudioUpload.vue';
const props = defineProps({
  noiDung: { type: Object, default: () => ({}) },
  hotspot: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["update-content", "select-images", "select-audio", "clear-audio"]);

function onImagesSelect(event) {
  const files = Array.from(event.target.files || []).filter((file) =>
    file.type?.startsWith("image/"),
  );
  if (files.length) emit("select-images", files);
  event.target.value = "";
}
</script>

<template>
  <div class="vb-text-info-editor">
    <div v-if="hotspot.type === 'info_area'" class="vb-info-area-note">
      Vùng thông tin đang dùng các điểm bạn đã vẽ trên panorama. Người xem bấm
      vào vùng sáng để mở nội dung này.
    </div>

    <div class="vb-prop-row">
      <label class="vb-prop-label">Tiêu đề</label>
      <input
        class="vb-prop-input"
        :value="noiDung?.tieu_de || ''"
        @input="emit('update-content', 'tieu_de', $event.target.value)"
        placeholder="Nhập tiêu đề..."
      />
    </div>

    <div class="vb-prop-row">
      <label class="vb-prop-label">Mô tả ngắn <small>(hiển thị khi hover)</small></label>
      <textarea
        class="vb-prop-input"
        rows="2"
        :value="noiDung?.mo_ta_ngan || ''"
        @input="emit('update-content', 'mo_ta_ngan', $event.target.value)"
        placeholder="Nhập mô tả ngắn..."
      ></textarea>
    </div>

    <div class="vb-prop-row">
      <label class="vb-prop-label">Danh sách hình ảnh</label>
      <label class="vb-info-image-upload">
        <input type="file" accept="image/*" multiple @change="onImagesSelect" />
        <span>Upload ảnh</span>
        <small>Ảnh sẽ được lưu khi bấm Save Tour.</small>
      </label>
      <div v-if="noiDung?.danh_sach_anh?.length" class="vb-info-image-list">
        <img
          v-for="(image, index) in noiDung.danh_sach_anh"
          :key="`${image}-${index}`"
          :src="image"
          :alt="`Ảnh thông tin ${index + 1}`"
        />
      </div>
      <textarea
        class="vb-prop-input vb-prop-input-mono"
        rows="3"
        :value="(noiDung?.danh_sach_anh || []).join('\n')"
        @change="emit('update-content', 'danh_sach_anh', $event.target.value.split(/\r?\n/).map((url) => url.trim()).filter(Boolean))"
        placeholder="Mỗi URL ảnh một dòng..."
      ></textarea>
      <small class="vb-prop-hint">Có thể upload nhiều ảnh hoặc nhập URL ảnh vào cùng danh sách.</small>
    </div>

    <div class="vb-prop-row">
      <label class="vb-prop-label">Nội dung mô tả</label>
      <textarea
        class="vb-prop-input"
        rows="4"
        :value="noiDung?.mo_ta || ''"
        @input="emit('update-content', 'mo_ta', $event.target.value)"
        placeholder="Nhập nội dung mô tả..."
      ></textarea>
    </div>

    <div class="vb-prop-row">
      <label class="vb-prop-label">Audio thuyết minh</label>
      <AudioUpload
        :file-name="hotspot._audioFileName"
        :file-size="hotspot._audioFile?.size"
        :source="hotspot._audioLocalUrl || hotspot.audio?.url"
        :error="hotspot._audioUploadError"
        @select="emit('select-audio')"
        @remove="emit('clear-audio')"
      />
    </div>

    <div class="vb-prop-row" style="margin-bottom:0">
      <label class="vb-prop-label">Liên kết (URL)</label>
      <input
        class="vb-prop-input vb-prop-input-mono"
        :value="noiDung?.lien_ket || ''"
        @input="emit('update-content', 'lien_ket', $event.target.value)"
        placeholder="https://..."
      />
    </div>

    <div class="vb-prop-row" style="margin-bottom:0">
      <label class="vb-prop-label">YouTube (URL nhúng)</label>
      <input
        class="vb-prop-input vb-prop-input-mono"
        :value="noiDung?.youtube_url || ''"
        @input="emit('update-content', 'youtube_url', $event.target.value)"
        placeholder="https://www.youtube.com/embed/..."
      />
      <small class="vb-prop-hint">Chỉ hỗ trợ URL YouTube hợp lệ.</small>
    </div>
  </div>
</template>
