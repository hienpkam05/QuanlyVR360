<script setup>
import { computed, markRaw } from 'vue';
import BaseAccordion from '../common/BaseAccordion.vue';
import NavPointEditor from './editors/NavPointEditor.vue';
import TextInfoEditor from './editors/poi/TextInfoEditor.vue';
import VideoEditor from './editors/poi/VideoEditor.vue';
import GalleryEditor from './editors/poi/GalleryEditor.vue';
import PinMarkerEditor from './editors/poi/PinMarkerEditor.vue';
import { POI_TYPES } from '@/common/hotspotIcons.js';

const props = defineProps({
  hotspot: { type: Object, required: true },
  hotspotIndex: { type: Number, required: true },
  scenes: { type: Array, required: true },
  activeSceneIndex: { type: Number, required: true },
  targetScene: { type: Object, default: null },
  accOpen: { type: Object, required: true },
});

const emit = defineEmits([
  'update', 'update:hover', 'update:content',
  'toggle-lock', 'duplicate', 'remove',
  'preview-target', 'save-entry-view', 'clear-entry-view',
  'toggle-acc', 'select-info-image', 'select-gallery-images', 'select-video',
]);

// Forward helpers for nested component emit
function forwardUpdate(key, value) {
  emit('update', key, value);
}
function forwardUpdateHover(key, value) {
  emit('update:hover', key, value);
}
function forwardAccToggle(key) {
  emit('toggle-acc', key);
}

// ── Dynamic editor map ──
// Key: loai_poi value → component
const poiEditorMap = {
  thong_tin_van_ban: markRaw(TextInfoEditor),
  phat_video: markRaw(VideoEditor),
  thu_vien_anh: markRaw(GalleryEditor),
  ghim_dia_danh: markRaw(PinMarkerEditor),
};

const isNav = computed(() => props.hotspot.type === 'nav' || props.hotspot.loai_poi === 'chuyen_canh');
const isPoi = computed(() => !isNav.value);
const poiType = computed(() => props.hotspot.loai_poi);
const poiEditor = computed(() => poiEditorMap[poiType.value] || null);
const hasContent = computed(() => poiType.value && poiType.value !== 'chuyen_canh' && poiType.value !== 'ghim_dia_danh');
const isPinMarker = computed(() => poiType.value === 'ghim_dia_danh');

const typeLabel = computed(() => {
  if (poiType.value && POI_TYPES[poiType.value]) return POI_TYPES[poiType.value].label;
  return isNav.value ? 'Chỉ đường' : 'POI';
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="vb-hs-detail-header">
      <div class="vb-hs-detail-title">
        <span class="vb-hs-idx-lg">#{{ hotspotIndex + 1 }}</span>
        <span class="vb-hs-type-badge vb-hs-badge-lg" :class="'vb-hs-badge-' + (hotspot.loai_poi || hotspot.type)">
          {{ typeLabel }}
        </span>
      </div>
      <button class="vb-lock-btn" :class="{ locked: hotspot.locked }" @click="emit('toggle-lock', hotspotIndex)" :title="hotspot.locked ? 'Mở khóa' : 'Khóa vị trí'">
        <svg v-if="hotspot.locked" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 019.9-1" /></svg>
        {{ hotspot.locked ? 'Đã khóa' : 'Khóa' }}
      </button>
    </div>
    <div class="vb-lock-warning" v-if="hotspot.locked">🔒 Vị trí bị khóa — không thể kéo thả.</div>

    <!-- ── NAV EDITOR ── -->
    <NavPointEditor
      v-if="isNav"
      :hotspot="hotspot"
      :scenes="scenes"
      :active-scene-index="activeSceneIndex"
      :target-scene="targetScene"
      :acc-open="accOpen"
      @update="forwardUpdate"
      @update:hover="forwardUpdateHover"
      @preview-target="emit('preview-target')"
      @save-entry-view="emit('save-entry-view')"
      @clear-entry-view="emit('clear-entry-view')"
      @toggle-acc="forwardAccToggle"
    />

    <!-- ── POI EDITOR ── -->
    <template v-if="isPoi">
      <!-- Accordion: Thông tin chung -->
      <BaseAccordion title="Thông tin chung" :open="accOpen.chung" @toggle="emit('toggle-acc', 'chung')">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
        </template>
        <div class="vb-prop-row">
          <label class="vb-prop-label">Nhãn hiển thị</label>
          <input class="vb-prop-input" :value="hotspot.label" @input="emit('update', 'label', $event.target.value)" />
        </div>
        <div class="vb-prop-row">
          <label class="vb-prop-label">Loại điểm</label>
          <select class="vb-prop-input" :value="hotspot.loai_poi || ''" @change="emit('update', 'loai_poi', $event.target.value || null)">
            <option value="">— POI chung —</option>
            <option v-for="(opt, key) in POI_TYPES" :key="key" :value="key">{{ opt.label }}</option>
          </select>
        </div>
        <div class="vb-prop-row-inline">
          <div class="vb-prop-row">
            <label class="vb-prop-label">LON</label>
            <input class="vb-prop-input vb-prop-input-mono" type="number" step="0.1" :value="hotspot.lon" :disabled="hotspot.locked" @input="emit('update', 'lon', +$event.target.value)" />
          </div>
          <div class="vb-prop-row">
            <label class="vb-prop-label">LAT</label>
            <input class="vb-prop-input vb-prop-input-mono" type="number" step="0.1" :value="hotspot.lat" :disabled="hotspot.locked" @input="emit('update', 'lat', +$event.target.value)" />
          </div>
        </div>
      </BaseAccordion>

      <BaseAccordion
        v-if="!hotspot.loai_poi"
        title="Cảnh đích & góc nhìn"
        :open="accOpen.navTarget"
        @toggle="emit('toggle-acc', 'navTarget')"
        :badge="hotspot.target ? '✓' : '!'"
        :badge-class="hotspot.target ? 'vb-acc-badge vb-acc-badge-ok' : 'vb-acc-badge vb-acc-badge-warn'"
      >
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </template>
        <div class="vb-prop-row">
          <label class="vb-prop-label">Chọn cảnh đích</label>
          <select class="vb-prop-input" :value="hotspot.target" @change="emit('update', 'target', $event.target.value)">
            <option value="">— Chưa chọn —</option>
            <option v-for="(sc, i) in scenes" :key="sc.id" :value="sc.id" :disabled="i === activeSceneIndex">{{ sc.name }}</option>
          </select>
        </div>
        <div v-if="targetScene" class="vb-nav-preview-panel">
          <div class="vb-nav-preview-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            <span>Đến: <strong>{{ targetScene.name }}</strong></span>
          </div>
          <div class="vb-nav-preview-thumb" @click="emit('preview-target')" title="Click để vào cảnh và đặt góc nhìn">
            <img :src="targetScene.thumb || targetScene.image" />
            <div class="vb-nav-preview-overlay">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              <span>Vào & đặt góc</span>
            </div>
          </div>
          <div class="vb-nav-preview-info">
            <span v-if="hotspot.entryView" class="vb-nav-entry-custom">📐 Góc tùy chỉnh: {{ hotspot.entryView.lon }}° / {{ hotspot.entryView.lat }}°</span>
            <span v-else class="vb-nav-entry-default">Dùng góc mặc định của cảnh đích</span>
          </div>
          <div class="vb-nav-preview-actions">
            <button class="vb-prop-btn vb-prop-btn-primary" @click="emit('preview-target')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3" /></svg>
              Vào cảnh để đặt góc
            </button>
            <button v-if="hotspot.entryView" class="vb-prop-btn" @click="emit('clear-entry-view')">↺ Đặt lại</button>
          </div>
        </div>
        <div v-else class="vb-nav-no-target">Chưa chọn cảnh đích</div>
      </BaseAccordion>

      <!-- Accordion: Nội dung (dynamic by loai_poi) -->
      <BaseAccordion v-if="hasContent" title="Nội dung" :open="accOpen.noiDung" @toggle="emit('toggle-acc', 'noiDung')">
        <template #icon>
          <svg v-if="poiType === 'phat_video'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" /></svg>
          <svg v-else-if="poiType === 'thu_vien_anh'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
        </template>
        <component
          :is="poiEditor"
          v-if="poiEditor"
          :noi-dung="hotspot.noi_dung || {}"
          :hotspot="hotspot"
          @update-content="(key, value) => emit('update:content', key, value)"
          @update="(key, value) => emit('update', key, value)"
          @select-image="(file) => emit('select-info-image', file)"
          @select-images="(files) => emit('select-gallery-images', files)"
          @select-video="(file) => emit('select-video', file)"
        />
      </BaseAccordion>

      <!-- Accordion: Ghim địa danh -->
      <BaseAccordion v-if="isPinMarker" title="Cấu hình ghim" :open="accOpen.noiDung" @toggle="emit('toggle-acc', 'noiDung')">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
        </template>
        <PinMarkerEditor :hotspot="hotspot" @update="emit('update', $event, arguments[1])" />
      </BaseAccordion>

      <!-- Accordion: Hover -->
      <BaseAccordion title="Hiệu ứng di chuột" :open="accOpen.hover" @toggle="emit('toggle-acc', 'hover')">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M18 11V6a2 2 0 00-2-2h-1M10 4H7a2 2 0 00-2 2v11a8 8 0 0016 0v-5" /><path d="M14 8l2-2-2-2" /></svg>
        </template>
        <div class="vb-prop-row">
          <label class="vb-prop-label vb-hover-toggle-label"><input type="checkbox" :checked="!!hotspot.khi_dua_chuot_vao?.hien_thi_anh_thu_nho" @change="emit('update:hover', 'hien_thi_anh_thu_nho', $event.target.checked)" /> Hiển thị ảnh thu nhỏ khi di chuột</label>
        </div>
        <template v-if="hotspot.khi_dua_chuot_vao?.hien_thi_anh_thu_nho">
          <div class="vb-prop-row">
            <label class="vb-prop-label">URL ảnh thu nhỏ</label>
            <input class="vb-prop-input vb-prop-input-mono" placeholder="https://..." :value="hotspot.khi_dua_chuot_vao?.duong_dan_thumbnail" @change="emit('update:hover', 'duong_dan_thumbnail', $event.target.value)" />
          </div>
          <div class="vb-prop-row" style="margin-bottom:0">
            <label class="vb-prop-label">Văn bản hướng dẫn</label>
            <input class="vb-prop-input" :value="hotspot.khi_dua_chuot_vao?.van_ban_huong_dan" @change="emit('update:hover', 'van_ban_huong_dan', $event.target.value)" />
          </div>
        </template>
      </BaseAccordion>
    </template>

    <!-- Actions -->
    <div class="vb-hs-detail-actions">
      <button class="vb-prop-btn" @click="emit('duplicate', hotspotIndex)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
        Nhân bản
      </button>
      <button class="vb-prop-btn vb-prop-btn-danger" @click="emit('remove', hotspotIndex)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
        Xóa điểm
      </button>
    </div>
    <div class="vb-hs-shortcuts">Del: xóa | Ctrl+D: nhân bản</div>
  </div>
</template>
