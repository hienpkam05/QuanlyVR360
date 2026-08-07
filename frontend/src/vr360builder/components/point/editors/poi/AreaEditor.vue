<script setup>
import { computed } from 'vue';

const props = defineProps({ hotspot: { type: Object, required: true } });
const emit = defineEmits(['update', 'select-media']);
const media = computed(() => ({
  type: 'image', src: '', opacity: 1, brightness: 1, borderRadius: 0, tint: '', fitMode: 'cover',
  loop: true, muted: true, autoplay: true, poster: '', playbackRate: 1, zIndex: 0,
  ...(props.hotspot.areaMedia || {}),
}));

function updateMedia(key, value) {
  emit('update', 'areaMedia', { ...media.value, [key]: value });
}

function addVertex() {
  const vertices = Array.isArray(props.hotspot.vertices) ? props.hotspot.vertices : [];
  if (vertices.length < 2) return;
  const first = vertices[0];
  const last = vertices[vertices.length - 1];
  emit('update', 'vertices', [...vertices, { lon: (Number(first.lon) + Number(last.lon)) / 2, lat: (Number(first.lat) + Number(last.lat)) / 2 }]);
}

function removeVertex() {
  const vertices = Array.isArray(props.hotspot.vertices) ? props.hotspot.vertices : [];
  if (vertices.length <= 3) return;
  emit('update', 'vertices', vertices.slice(0, -1));
}

function formatFileSize(value) {
  if (!Number.isFinite(Number(value))) return '';
  return Number(value) < 1024 * 1024 ? `${Math.ceil(Number(value) / 1024)} KB` : `${(Number(value) / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDuration(value) {
  if (!Number.isFinite(Number(value)) || Number(value) <= 0) return '';
  return `${Math.floor(Number(value) / 60)}:${String(Math.floor(Number(value) % 60)).padStart(2, '0')}`;
}
</script>

<template>
  <div>
    <div class="vb-prop-row">
      <label class="vb-prop-label">Tên vùng</label>
      <input class="vb-prop-input" :value="hotspot.label || ''" placeholder="Area Overlay" @input="emit('update', 'label', $event.target.value)" />
    </div>
    <div class="vb-prop-row-inline">
      <button class="vb-prop-btn" type="button" @click="addVertex">+ Thêm đỉnh</button>
      <button class="vb-prop-btn" type="button" :disabled="(hotspot.vertices?.length || 0) <= 3" @click="removeVertex">− Xóa đỉnh</button>
    </div>
    <div class="vb-prop-row">
      <label class="vb-prop-label">Loại media</label>
      <select class="vb-prop-input" :value="media.type" @change="updateMedia('type', $event.target.value)">
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
    </div>
    <div class="vb-prop-row">
      <label class="vb-prop-label">{{ media.type === 'video' ? 'Video URL' : 'Image URL' }}</label>
      <input class="vb-prop-input vb-prop-input-mono" :value="media.src" placeholder="https://..." @change="updateMedia('src', $event.target.value)" />
    </div>
    <div class="vb-prop-row">
      <label class="vb-prop-label">Upload {{ media.type === 'video' ? 'video' : 'image' }}</label>
      <input class="vb-prop-input" type="file" :accept="media.type === 'video' ? 'video/*' : 'image/*'" @change="emit('select-media', $event.target.files?.[0])" />
    </div>
    <div v-if="media.src" class="vb-area-media-preview">
      <img v-if="media.type === 'image'" :src="media.preview || media.src" alt="Area media preview" />
      <video v-else :src="media.preview || media.src" :poster="media.poster || ''" muted playsinline preload="metadata"></video>
      <div class="vb-area-media-preview-meta"><strong>{{ media.fileName || 'Media đã chọn' }}</strong><small>{{ formatFileSize(media.fileSize) }}<template v-if="media.type === 'video' && formatDuration(media.duration)"> · {{ formatDuration(media.duration) }}</template></small></div>
    </div>
    <div v-else class="vb-area-media-placeholder">▣ Chưa có media. Chọn file hoặc nhập URL để xem preview trên panorama.</div>
    <div class="vb-prop-row-inline">
      <div class="vb-prop-row"><label class="vb-prop-label">Opacity</label><input class="vb-prop-input vb-prop-input-mono" type="number" min="0" max="1" step="0.05" :value="media.opacity" @change="updateMedia('opacity', +$event.target.value)" /></div>
      <div class="vb-prop-row"><label class="vb-prop-label">Brightness</label><input class="vb-prop-input vb-prop-input-mono" type="number" min="0" max="2" step="0.05" :value="media.brightness" @change="updateMedia('brightness', +$event.target.value)" /></div>
    </div>
    <div class="vb-prop-row-inline">
      <div class="vb-prop-row"><label class="vb-prop-label">Border radius</label><input class="vb-prop-input vb-prop-input-mono" type="number" min="0" max="100" :value="media.borderRadius" @change="updateMedia('borderRadius', +$event.target.value)" /></div>
      <div class="vb-prop-row"><label class="vb-prop-label">Tint</label><input class="vb-prop-input" type="color" :value="media.tint || '#ffffff'" @change="updateMedia('tint', $event.target.value)" /></div>
    </div>
    <div class="vb-prop-row-inline">
      <div class="vb-prop-row"><label class="vb-prop-label">Fit mode</label><select class="vb-prop-input" :value="media.fitMode" @change="updateMedia('fitMode', $event.target.value)"><option value="cover">Cover</option><option value="contain">Contain</option><option value="fill">Fill</option></select></div>
      <div class="vb-prop-row"><label class="vb-prop-label">Z-index</label><input class="vb-prop-input vb-prop-input-mono" type="number" :value="media.zIndex" @change="updateMedia('zIndex', +$event.target.value)" /></div>
    </div>
    <template v-if="media.type === 'video'">
      <div class="vb-prop-row-inline">
        <label class="vb-prop-label vb-hover-toggle-label"><input type="checkbox" :checked="media.autoplay" @change="updateMedia('autoplay', $event.target.checked)" /> Autoplay</label>
        <label class="vb-prop-label vb-hover-toggle-label"><input type="checkbox" :checked="media.loop" @change="updateMedia('loop', $event.target.checked)" /> Loop</label>
        <label class="vb-prop-label vb-hover-toggle-label"><input type="checkbox" :checked="media.muted" @change="updateMedia('muted', $event.target.checked)" /> Muted</label>
      </div>
      <div class="vb-prop-row-inline">
        <div class="vb-prop-row"><label class="vb-prop-label">Poster URL</label><input class="vb-prop-input vb-prop-input-mono" :value="media.poster" placeholder="https://..." @change="updateMedia('poster', $event.target.value)" /></div>
        <div class="vb-prop-row"><label class="vb-prop-label">Playback rate</label><input class="vb-prop-input vb-prop-input-mono" type="number" min="0.25" max="4" step="0.25" :value="media.playbackRate" @change="updateMedia('playbackRate', +$event.target.value)" /></div>
      </div>
    </template>
    <small class="vb-hs-shortcuts">{{ hotspot.vertices?.length || 0 }} đỉnh. Area Media hiển thị trực tiếp trên panorama, không điều hướng cảnh.</small>
  </div>
</template>

<style scoped>
.vb-area-media-preview { background: #07111f; border: 1px solid rgba(125, 211, 252, .28); border-radius: 8px; margin-top: 8px; overflow: hidden; }
.vb-area-media-preview img, .vb-area-media-preview video { aspect-ratio: 16 / 9; background: #020617; display: block; object-fit: contain; width: 100%; }
.vb-area-media-preview-meta { display: flex; flex-direction: column; gap: 2px; padding: 7px 9px; }
.vb-area-media-preview-meta strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vb-area-media-preview-meta small, .vb-area-media-placeholder { color: rgba(226, 232, 240, .68); font-size: 11px; }
.vb-area-media-placeholder { background: rgba(14, 116, 144, .12); border: 1px dashed rgba(125, 211, 252, .45); border-radius: 8px; line-height: 1.45; margin-top: 8px; padding: 10px; }
</style>
