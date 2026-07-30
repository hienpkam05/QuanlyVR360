<script setup>
import BaseAccordion from '../common/BaseAccordion.vue';
import { formatGps } from '../../common/exifGps.js';
import { formatBytes } from '../../common/imageResize.js';

defineProps({
  scene: { type: Object, required: true },
  collapsed: { type: Object, required: true },
  audioPreviewSrc: { type: String, default: '' },
  audioFileName: { type: String, default: '' },
});

const emit = defineEmits([
  'update:scene', 'update:view', 'update:narration', 'update:transition',
  'save-view', 'replace-image', 'pick-audio', 'clear-narration',
  'navigate-to-points','update:collapsed'
]);

function update(key, value) {
  emit('update:scene', key, value);
}
function updateView(key, value) {
  emit('update:view', key, value);
}
function updateNarration(key, value) {
  emit('update:narration', key, value);
}
function updateTransition(key, value) {
  emit('update:transition', key, value);
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
            <button class="vb-prop-btn" style="padding:6px" @click="emit('replace-image')">Thay ảnh</button>
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

    <!-- Transition -->
    <BaseAccordion title="Hiệu ứng chuyển cảnh" :open="!collapsed.transition" @toggle="emit('update:collapsed', 'transition', !collapsed.transition)">
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>
      </template>
      <div class="vb-prop-row">
        <label class="vb-prop-label vb-hover-toggle-label"><input type="checkbox" :checked="scene.transition?.enabled !== false" @change="updateTransition('enabled', $event.target.checked)" /> Bật hiệu ứng</label>
      </div>
      <template v-if="scene.transition?.enabled !== false">
        <div class="vb-prop-row">
          <label class="vb-prop-label">Kiểu hiệu ứng</label>
          <select class="vb-prop-input" :value="scene.transition?.effect || 'fade'" @change="updateTransition('effect', $event.target.value)">
            <option value="fade">Mờ dần (Fade)</option>
            <option value="black">Tối màn hình</option>
            <option value="white">Sáng màn hình</option>
          </select>
        </div>
        <div class="vb-prop-row">
          <label class="vb-prop-label">Thời lượng (ms)</label>
          <input class="vb-prop-input vb-prop-input-mono" type="number" min="200" step="100" :value="scene.transition?.duration ?? 2000" @change="updateTransition('duration', +$event.target.value)" />
        </div>
        <div class="vb-prop-row">
          <label class="vb-prop-label vb-hover-toggle-label"><input type="checkbox" :checked="scene.transition?.rotation !== false" @change="updateTransition('rotation', $event.target.checked)" /> Xoay camera khi chuyển</label>
        </div>
        <div v-if="scene.transition?.rotation !== false" class="vb-prop-row" style="margin-bottom:0">
          <label class="vb-prop-label">Tốc độ xoay (vòng/phút)</label>
          <input class="vb-prop-input vb-prop-input-mono" type="number" min="1" step="1" :value="scene.transition?.speed ?? 10" @change="updateTransition('speed', +$event.target.value)" />
        </div>
      </template>
    </BaseAccordion>

    <!-- Narration -->
    <BaseAccordion title="Thuyết minh âm thanh" :open="!collapsed.narration" @toggle="emit('update:collapsed', 'narration', !collapsed.narration)"
      :badge="(scene.am_thanh_thuyet_minh?.duong_dan_file_audio || audioPreviewSrc) ? '●' : ''"
      badge-class="vb-acc-badge">
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
      </template>
      <div class="vb-prop-row-inline" style="align-items:flex-end">
        <div class="vb-prop-row" style="flex:0 0 auto;margin-bottom:0"><button class="vb-prop-btn vb-prop-btn-accent" @click="emit('pick-audio')">Chọn file âm thanh</button></div>
        <div class="vb-prop-row" style="flex:1;margin-bottom:0"><label class="vb-prop-label">Thời lượng (giây)</label><input class="vb-prop-input vb-prop-input-mono" type="number" min="0" step="1" :value="scene.am_thanh_thuyet_minh?.thoi_luong_giay || 0" @change="updateNarration('thoi_luong_giay', +$event.target.value)" /></div>
      </div>
      <div class="vb-prop-row">
        <label class="vb-prop-label">URL file âm thanh</label>
        <input class="vb-prop-input vb-prop-input-mono" placeholder="https://..." :value="scene.am_thanh_thuyet_minh?.duong_dan_file_audio || ''" @change="updateNarration('duong_dan_file_audio', $event.target.value)" />
        <span v-if="audioFileName" class="vb-prop-filename">{{ audioFileName }}</span>
      </div>
      <div class="vb-prop-row" v-if="audioPreviewSrc"><audio class="vb-audio-player" controls :src="audioPreviewSrc"></audio></div>
      <div class="vb-prop-row">
        <label class="vb-prop-label vb-hover-toggle-label"><input type="checkbox" :checked="!!scene.am_thanh_thuyet_minh?.tu_dong_phat" @change="updateNarration('tu_dong_phat', $event.target.checked)" /> Tự động phát khi vào cảnh</label>
      </div>
      <div class="vb-prop-row" v-if="audioPreviewSrc" style="margin-bottom:0">
        <button class="vb-prop-btn vb-prop-btn-danger" @click="emit('clear-narration')">Xóa thuyết minh</button>
      </div>
    </BaseAccordion>
  </div>
</template>
