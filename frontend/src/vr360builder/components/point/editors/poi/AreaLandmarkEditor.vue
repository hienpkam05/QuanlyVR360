<script setup>
defineProps({ hotspot: { type: Object, required: true }, scenes: { type: Array, default: () => [] } });
const emit = defineEmits(['update']);
</script>

<template>
  <div>
    <div class="vb-prop-row">
      <label class="vb-prop-label">Chuyển cảnh tới</label>
      <select class="vb-prop-input" :value="hotspot.target || ''" @change="emit('update', 'target', $event.target.value)">
        <option value="">Chọn cảnh...</option>
        <option v-for="scene in scenes" :key="scene.id" :value="scene.id">{{ scene.name }}</option>
      </select>
    </div>
    <div class="vb-prop-row">
      <label class="vb-prop-label">Tên địa danh</label>
      <input class="vb-prop-input" :value="hotspot.label" @input="emit('update', 'label', $event.target.value)" />
    </div>
    <div class="vb-prop-row-inline">
      <div class="vb-prop-row"><label class="vb-prop-label">Màu polygon</label><input class="vb-prop-input" type="color" :value="hotspot.style?.fill || '#fbbf24'" @change="emit('update', 'style', { ...(hotspot.style || {}), fill: $event.target.value })" /></div>
      <div class="vb-prop-row"><label class="vb-prop-label">Màu viền</label><input class="vb-prop-input" type="color" :value="hotspot.style?.border || '#fbbf24'" @change="emit('update', 'style', { ...(hotspot.style || {}), border: $event.target.value })" /></div>
    </div>
    <div class="vb-prop-row-inline">
      <div class="vb-prop-row"><label class="vb-prop-label">Độ trong suốt</label><input class="vb-prop-input vb-prop-input-mono" type="number" min="0" max="1" step="0.05" :value="hotspot.style?.opacity ?? 0.3" @change="emit('update', 'style', { ...(hotspot.style || {}), opacity: +$event.target.value })" /></div>
      <div class="vb-prop-row"><label class="vb-prop-label">Độ dày viền</label><input class="vb-prop-input vb-prop-input-mono" type="number" min="1" max="12" step="1" :value="hotspot.style?.borderWidth ?? 2" @change="emit('update', 'style', { ...(hotspot.style || {}), borderWidth: +$event.target.value })" /></div>
    </div>
    <div class="vb-prop-row">
      <label class="vb-prop-label">Chiều cao line</label>
      <input class="vb-prop-input vb-prop-input-mono" type="number" min="40" step="1" :value="hotspot.line_height ?? Math.abs(hotspot.label_position?.y || -48)" @change="emit('update', 'line_height', Math.max(40, +$event.target.value))" />
    </div>
    <div class="vb-prop-row"><label class="vb-prop-label">Màu line</label><input class="vb-prop-input" type="color" :value="hotspot.style?.line || '#ffffff'" @change="emit('update', 'style', { ...(hotspot.style || {}), line: $event.target.value })" /></div>
    <div class="vb-prop-row"><label class="vb-prop-label">Kiểu line</label><input class="vb-prop-input" value="Thẳng đứng" disabled /></div>
    <div class="vb-prop-row"><label class="vb-prop-label vb-hover-toggle-label"><input type="checkbox" :checked="hotspot.show_polygon_on_hover !== false" @change="emit('update', 'show_polygon_on_hover', $event.target.checked)" /> Hiển thị polygon khi hover</label></div>
    <div class="vb-prop-row"><label class="vb-prop-label">Metadata</label><textarea class="vb-prop-input" :value="hotspot.metadata?.description || ''" @change="emit('update', 'metadata', { ...(hotspot.metadata || {}), description: $event.target.value })"></textarea></div>
    <small class="vb-hs-shortcuts">Vùng có {{ hotspot.vertices?.length || 0 }} đỉnh. Kéo các đỉnh trực tiếp trên panorama để chỉnh sửa.</small>
  </div>
</template>
