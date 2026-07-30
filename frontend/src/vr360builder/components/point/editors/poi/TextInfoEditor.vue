<script setup>
const props = defineProps({
  noiDung: { type: Object, default: () => ({}) },
  hotspot: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["update-content", "select-image"]);

function onImageSelect(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  emit("select-image", file);
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
      <label class="vb-prop-label">Ảnh minh họa</label>
      <div class="vb-info-image-box">
        <div class="vb-info-image-preview">
          <img
            v-if="noiDung?.anh_minh_hoa"
            :src="noiDung.anh_minh_hoa"
            alt="Ảnh minh họa"
          />
          <span v-else>Chưa có ảnh</span>
        </div>
        <label class="vb-info-image-upload">
          <input type="file" accept="image/*" @change="onImageSelect" />
          <span>Upload ảnh</span>
          <small>Ảnh sẽ được lưu khi bấm Save Tour.</small>
        </label>
      </div>
      <input
        class="vb-prop-input vb-prop-input-mono"
        :value="noiDung?.anh_minh_hoa || ''"
        @input="emit('update-content', 'anh_minh_hoa', $event.target.value)"
        placeholder="Hoặc nhập URL ảnh https://..."
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
  </div>
</template>
