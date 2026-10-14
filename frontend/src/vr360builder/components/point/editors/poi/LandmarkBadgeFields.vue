<script setup>
import { computed } from 'vue';
import { BADGE_ICONS, BADGE_SIZE, LOGO_FILTER } from '@/common/vr360/landmarkBadge.js';

const props = defineProps({ hotspot: { type: Object, required: true } });
const emit = defineEmits(['update', 'select-badge']);

const ICON_LABELS = {
  landmark: 'Địa danh',
  government: 'Trụ sở / UBND',
  school: 'Trường học',
  temple: 'Đền chùa',
  hospital: 'Y tế',
  market: 'Chợ',
};

const badge = computed(() => ({ src: '', preset: 'photo', icon: '', ...(props.hotspot.badge || {}) }));
const isLogo = computed(() => badge.value.preset === 'logo');
// Local object URL while the file is still queued for upload.
const previewSrc = computed(() => badge.value.preview || badge.value.src);
const hasBadge = computed(() => Boolean(badge.value.src || badge.value.icon));
// Mirrors the renderer: a logo image is shown bare, everything else is framed.
const skin = computed(() => (previewSrc.value ? (isLogo.value ? 'logo' : 'photo') : 'icon'));
const iconPath = computed(() => BADGE_ICONS[badge.value.icon] || BADGE_ICONS.landmark);

function patch(key, value) {
  emit('update', 'badge', { ...badge.value, [key]: value });
}

function clearBadge() {
  emit('update', 'badge', null);
}
</script>

<template>
  <div class="vb-badge-section">
    <div class="vb-prop-row">
      <label class="vb-prop-label">Badge trên nhãn</label>
      <div class="vb-badge-preset">
        <button type="button" class="vb-prop-btn" :class="{ 'is-active': !isLogo }" @click="patch('preset', 'photo')">Ảnh thật</button>
        <button type="button" class="vb-prop-btn" :class="{ 'is-active': isLogo }" @click="patch('preset', 'logo')">Logo</button>
      </div>
    </div>

    <div class="vb-prop-row">
      <label class="vb-prop-label">Upload ảnh</label>
      <input class="vb-prop-input" type="file" accept="image/*" @change="emit('select-badge', $event.target.files?.[0])" />
    </div>

    <div class="vb-prop-row">
      <label class="vb-prop-label">Hoặc dán URL</label>
      <input class="vb-prop-input vb-prop-input-mono" :value="badge.src" placeholder="https://..." @change="patch('src', $event.target.value.trim())" />
    </div>

    <div class="vb-prop-row">
      <label class="vb-prop-label">Icon dự phòng</label>
      <select class="vb-prop-input" :value="badge.icon" @change="patch('icon', $event.target.value)">
        <option value="">— Không —</option>
        <option v-for="(label, key) in ICON_LABELS" :key="key" :value="key">{{ label }}</option>
      </select>
    </div>

    <div class="vb-badge-preview">
      <div
        class="vb-badge-frame"
        :class="`is-${skin}`"
        :style="{ width: `${BADGE_SIZE}px`, height: `${BADGE_SIZE}px` }"
      >
        <img v-if="previewSrc" :src="previewSrc" alt="" :style="skin === 'logo' ? { filter: LOGO_FILTER } : null" />
        <svg v-else-if="badge.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path :d="iconPath" /></svg>
        <span v-else class="vb-badge-empty">—</span>
      </div>
      <div class="vb-badge-preview-note">
        <template v-if="hasBadge">
          Đúng kích thước hiển thị trên panorama.
          <template v-if="skin === 'photo'"> Ảnh không vuông sẽ bị cắt về giữa.</template>
          <template v-else-if="skin === 'logo'"> Giữ nguyên nền trong, không thêm khung.</template>
        </template>
        <template v-else>Chưa có badge — nhãn hiển thị như bình thường.</template>
      </div>
    </div>

    <div v-if="hasBadge" class="vb-prop-row-inline">
      <button type="button" class="vb-prop-btn" @click="clearBadge">Xoá badge</button>
    </div>
  </div>
</template>

<style scoped>
.vb-badge-section { border-top: 1px solid rgba(125, 211, 252, .18); margin-top: 10px; padding-top: 10px; }
.vb-badge-preset { display: flex; gap: 6px; }
.vb-badge-preset .vb-prop-btn { flex: 1; }
.vb-badge-preset .vb-prop-btn.is-active { background: rgba(14, 116, 144, .45); border-color: rgba(125, 211, 252, .7); color: #fff; }
.vb-badge-preview { align-items: center; display: flex; gap: 10px; margin-top: 10px; }
.vb-badge-frame { align-items: center; box-sizing: border-box; display: flex; flex: none; justify-content: center; }
.vb-badge-frame.is-photo, .vb-badge-frame.is-icon {
  background: rgba(18, 18, 28, .92); border: 2px solid #fff; box-shadow: 0 3px 10px rgba(0, 0, 0, .45);
  color: #fff; overflow: hidden;
}
.vb-badge-frame.is-photo { border-radius: 14px; }
.vb-badge-frame.is-icon { border-radius: 50%; }
/* Checkerboard reads as "transparent", so a logo with a baked-in background
   is obvious here instead of being a surprise on the panorama. */
.vb-badge-frame.is-logo {
  background-color: rgba(148, 163, 184, .18);
  background-image:
    linear-gradient(45deg, rgba(148, 163, 184, .28) 25%, transparent 25% 75%, rgba(148, 163, 184, .28) 75%),
    linear-gradient(45deg, rgba(148, 163, 184, .28) 25%, transparent 25% 75%, rgba(148, 163, 184, .28) 75%);
  background-position: 0 0, 5px 5px;
  background-size: 10px 10px;
}
.vb-badge-frame img { box-sizing: border-box; height: 100%; object-position: center; width: 100%; }
.vb-badge-frame.is-photo img { object-fit: cover; }
.vb-badge-frame.is-logo img { object-fit: contain; }
.vb-badge-frame svg { height: 60%; width: 60%; }
.vb-badge-empty { font-size: 18px; opacity: .45; }
.vb-badge-preview-note { color: rgba(226, 232, 240, .68); font-size: 11px; line-height: 1.45; }
</style>
