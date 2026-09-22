<script setup>
import BaseAccordion from '../common/BaseAccordion.vue';
import { formatGps } from '../../common/exifGps.js';
import { formatBytes } from '../../common/imageResize.js';

defineProps({
  scene: { type: Object, required: true },
  collapsed: { type: Object, required: true },
});

const emit = defineEmits([
  'update:scene', 'update:view',
  'save-view', 'replace-image',
  'navigate-to-points','update:collapsed'
]);

function update(key, value) {
  emit('update:scene', key, value);
}
function updateView(key, value) {
  emit('update:view', key, value);
}
</script>

<template>
  <div>
    <!-- Shortcut to point list -->
    <div class="vb-scene-nav-shortcut" @click="emit('navigate-to-points')">
      <div class="vb-sns-left">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
        <span>Điểm nóng</span>
      </div>
      <div class="vb-sns-right">
        <span class="vb-sns-count">{{ scene.hotspots.length }}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M9 18l6-6-6-6" /></svg>
      </div>
    </div>

    <!-- Scene Properties -->
    <BaseAccordion title="Thuộc tính cảnh" :open="!collapsed.sceneProps" @toggle="emit('update:collapsed', 'sceneProps', !collapsed.sceneProps)">
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
      </template>
      <div class="vb-prop-row">
        <label class="vb-prop-label">Tên cảnh</label>
        <input class="vb-prop-input" :value="scene.name" @change="update('name', $event.target.value)" />
      </div>
      <div class="vb-prop-row">
        <label class="vb-prop-label">Ảnh panorama</label>
        <div style="display:flex;gap:8px;align-items:center">
          <div class="vb-prop-thumb"><img :src="scene.thumb || scene.image" /></div>
          <div style="flex:1">
            <button
              class="vb-prop-btn"
              style="padding:6px"
              type="button"
              @click.stop="emit('replace-image')"
            >
              Thay ảnh
            </button>
            <span class="vb-prop-filename">{{ scene._file ? scene._file.name.substring(0,28) : scene.exportUrl ? scene.exportUrl.split('/').pop().substring(0,28) : '—' }}</span>
            <span v-if="scene._file" class="vb-prop-filesize">
              <template v-if="scene._resized">{{ formatBytes(scene._originalSize) }} → <strong>{{ formatBytes(scene._resizedSize) }}</strong></template>
              <template v-else>{{ formatBytes(scene._resizedSize) }}</template>
            </span>
          </div>
        </div>
      </div>
      <div class="vb-prop-row-inline">
        <div class="vb-prop-row">
          <label class="vb-prop-label">ID cảnh</label>
          <input class="vb-prop-input vb-prop-input-mono" :value="scene.id" @change="update('id', $event.target.value)" />
        </div>
        <div class="vb-prop-row">
          <label class="vb-prop-label">Nhóm</label>
          <input class="vb-prop-input" :value="scene.group" @change="update('group', $event.target.value)" />
        </div>
      </div>
      <div class="vb-prop-row">
        <label class="vb-prop-label">Mô tả</label>
        <textarea class="vb-prop-input" :value="scene.info" @change="update('info', $event.target.value)"></textarea>
      </div>
      <div class="vb-prop-row" style="margin-bottom:0">
        <label class="vb-prop-label">GPS</label>
        <div class="vb-gps-value">{{ scene.gps ? formatGps(scene.gps) : 'Không có dữ liệu GPS' }}</div>
      </div>
    </BaseAccordion>

    <!-- Initial View -->
    <BaseAccordion title="Góc nhìn ban đầu" :open="!collapsed.initialView" @toggle="emit('update:collapsed', 'initialView', !collapsed.initialView)">
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>
      </template>
      <div class="vb-prop-row-inline">
        <div class="vb-prop-row"><label class="vb-prop-label">LON</label><input class="vb-prop-input vb-prop-input-mono" type="number" step="0.1" :value="scene.initialView.lon" @input="updateView('lon', +$event.target.value)" /></div>
        <div class="vb-prop-row"><label class="vb-prop-label">LAT</label><input class="vb-prop-input vb-prop-input-mono" type="number" step="0.1" :value="scene.initialView.lat" @input="updateView('lat', +$event.target.value)" /></div>
        <div class="vb-prop-row"><label class="vb-prop-label">FOV</label><input class="vb-prop-input vb-prop-input-mono" type="number" step="1" min="30" max="120" :value="scene.initialView.fov" @input="updateView('fov', +$event.target.value)" /></div>
      </div>
      <button class="vb-prop-btn vb-prop-btn-primary" @click="emit('save-view')">Lưu góc nhìn hiện tại</button>
    </BaseAccordion>

  </div>
</template>
