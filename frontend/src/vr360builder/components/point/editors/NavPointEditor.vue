<script setup>
import BaseAccordion from '../../common/BaseAccordion.vue';
import { DEFAULT_NAV_ICON, NAV_ICONS } from '@/common/hotspotIcons.js';

defineProps({
  hotspot: { type: Object, required: true },
  scenes: { type: Array, required: true },
  activeSceneIndex: { type: Number, required: true },
  targetScene: { type: Object, default: null },
  accOpen: { type: Object, default: () => ({}) },
});

const emit = defineEmits([
  'update', 'update:hover', 'preview-target', 'save-entry-view',
  'clear-entry-view', 'toggle-acc',
]);

const navIconDefault = DEFAULT_NAV_ICON;
const navIconOptions = Object.entries(NAV_ICONS).map(([key, v]) => ({ key, label: v.label }));
</script>

<template>
  <div>
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
        <label class="vb-prop-label">Biểu tượng</label>
        <select class="vb-prop-input" :value="hotspot.icon || navIconDefault" @change="emit('update', 'icon', $event.target.value)">
          <option v-for="opt in navIconOptions" :key="opt.key" :value="opt.key">{{ opt.label }}</option>
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

    <!-- Accordion: Cảnh đích & góc nhìn -->
    <BaseAccordion title="Cảnh đích & góc nhìn" :open="accOpen.navTarget" @toggle="emit('toggle-acc', 'navTarget')"
      :badge="hotspot.target ? '✓' : '!'"
      :badge-class="hotspot.target ? 'vb-acc-badge vb-acc-badge-ok' : 'vb-acc-badge vb-acc-badge-warn'">
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
  </div>
</template>