<script setup>
import { POI_TYPES } from '@/common/hotspotIcons.js';

defineProps({
  scenes: { type: Array, required: true },
  scene: { type: Object, required: true },
  selectedIndex: { type: Number, default: -1 },
});

const emit = defineEmits([
  'select', 'remove', 'duplicate', 'toggle-lock', 'add-point',
  'navigate-back',
]);

const typeLabel = (h) => {
  if (h.loai_poi && POI_TYPES[h.loai_poi]) return POI_TYPES[h.loai_poi].label;
  return h.type === 'nav' ? 'Chỉ đường' : 'POI';
};
</script>

<template>
  <div>
    <div class="vb-hs-list-header">
      <span class="vb-hs-list-title">{{ scene.hotspots.length }} điểm nóng</span>
      <button class="vb-section-action" @click="emit('add-point')" title="Đặt điểm lên canvas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M12 5v14M5 12h14" /></svg>
        Thêm
      </button>
    </div>
    <div class="vb-hs-list vb-hs-list-full">
      <div v-if="scene.hotspots.length === 0" class="vb-hs-empty">
        Chưa có điểm nóng. Double-click lên panorama hoặc nhấn "Thêm".
      </div>
      <div
        v-for="(h, i) in scene.hotspots"
        :key="i"
        class="vb-hs-card"
        :class="[{ selected: i === selectedIndex, locked: h.locked }, 'vb-hs-type-' + (h.loai_poi || h.type)]"
        @click="emit('select', i)"
      >
        <div class="vb-hs-card-header">
          <div class="vb-hs-card-title">
            <span class="vb-hs-type-icon" :class="'vb-hs-icon-' + (h.loai_poi || h.type)">
              <svg v-if="h.loai_poi === 'chuyen_canh' || h.type === 'nav'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              <svg v-else-if="h.loai_poi === 'phat_video'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" /></svg>
              <svg v-else-if="h.loai_poi === 'thu_vien_anh'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
              <svg v-else-if="h.loai_poi === 'ghim_dia_danh'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            </span>
            <span class="vb-hs-idx">{{ i + 1 }}</span>
            <span class="vb-hs-type-badge" :class="'vb-hs-badge-' + (h.loai_poi || h.type)">{{ typeLabel(h) }}</span>
            <span class="vb-hs-name">{{ h.label || 'Điểm ' + (i + 1) }}</span>
          </div>
          <div class="vb-hs-card-actions">
            <button class="vb-hs-card-btn" :class="{ 'vb-hs-card-btn-locked': h.locked }" :title="h.locked ? 'Mở khóa' : 'Khóa vị trí'" @click.stop="emit('toggle-lock', i)">
              <svg v-if="h.locked" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 019.9-1" /></svg>
            </button>
            <button class="vb-hs-card-btn" title="Nhân bản" @click.stop="emit('duplicate', i)">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
            </button>
            <button class="vb-hs-card-btn vb-hs-card-btn-delete" title="Xóa" @click.stop="emit('remove', i)">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="10" height="10" style="color:var(--vb-text-dim);flex-shrink:0"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        </div>
        <div class="vb-hs-card-coords">
          {{ h.lon.toFixed ? h.lon.toFixed(1) : h.lon }}° / {{ h.lat.toFixed ? h.lat.toFixed(1) : h.lat }}°
          <span v-if="h.target"> → {{ scenes.find(s => s.id === h.target)?.name || h.target }}</span>
          <span v-if="h.locked" class="vb-hs-lock-tag">🔒</span>
        </div>
      </div>
    </div>
  </div>
</template>
