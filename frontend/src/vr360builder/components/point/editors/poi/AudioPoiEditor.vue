<script setup>
import { computed } from 'vue';
import AudioUpload from './AudioUpload.vue';
import AudioPreview from './AudioPreview.vue';

const props = defineProps({ hotspot: { type: Object, required: true } });
const emit = defineEmits(['update', 'select-audio', 'clear-audio']);
const audio = computed(() => props.hotspot.audio || {});
const source = computed(() => props.hotspot._audioLocalUrl || audio.value.url || '');
const urlError = computed(() => {
  const url = audio.value.url?.trim();
  if (!url) return '';
  try { new URL(url); return ''; } catch { return 'URL audio không hợp lệ. Hãy nhập địa chỉ http(s) hợp lệ.'; }
});
function update(key, value) { emit('update', `audio.${key}`, value); }
function setNumber(key, event, min, max) {
  const value = Number(event.target.value);
  emit('update', key, Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min);
}
</script>

<template>
  <section class="vb-audio-poi-editor">
    <header class="vb-audio-poi-heading"><span aria-hidden="true">◖))</span><div><h3>Audio POI</h3><p>Thiết lập thuyết minh riêng cho vị trí này.</p></div></header>

    <div class="vb-audio-editor-section">
      <h4>General</h4>
      <div class="vb-prop-row"><label class="vb-prop-label">Title</label><input class="vb-prop-input" :value="audio.title || hotspot.label || ''" placeholder="Ví dụ: Lịch sử ngôi đền" @input="update('title', $event.target.value)" /></div>
      <div class="vb-prop-row"><label class="vb-prop-label">Description <small>(tuỳ chọn)</small></label><textarea class="vb-prop-input vb-audio-editor-textarea" rows="3" :value="audio.description || ''" placeholder="Mô tả ngắn cho audio này" @input="update('description', $event.target.value)"></textarea></div>
    </div>

    <div class="vb-audio-editor-section">
      <h4>Audio</h4>
      <AudioUpload :file-name="hotspot._audioFileName" :file-size="hotspot._audioFile?.size" :source="source" :error="hotspot._audioUploadError || urlError" @select="emit('select-audio')" @remove="emit('clear-audio')" />
      <div class="vb-prop-row"><label class="vb-prop-label">Audio URL <small>(hoặc dùng file tải lên)</small></label><input class="vb-prop-input vb-prop-input-mono" :class="{ 'vb-prop-input-error': urlError }" :value="audio.url || ''" placeholder="https://.../narration.mp3" @input="update('url', $event.target.value)" /></div>
      <AudioPreview :src="source" />
    </div>

    <div class="vb-audio-editor-section">
      <h4>Playback</h4>
      <div class="vb-prop-row-inline"><div class="vb-prop-row"><label class="vb-prop-label">Volume</label><div class="vb-audio-range-row"><input type="range" min="0" max="1" step="0.05" :value="audio.volume ?? 1" @input="setNumber('audio.volume', $event, 0, 1)" /><output>{{ Math.round((audio.volume ?? 1) * 100) }}%</output></div></div><div class="vb-prop-row"><label class="vb-prop-label">Radius</label><input class="vb-prop-input" type="number" min="0" step="0.1" :value="hotspot.radius || 0" @input="setNumber('radius', $event, 0, 9999)" /></div></div>
      <div class="vb-audio-toggle-list"><label class="vb-hover-toggle-label"><input type="checkbox" :checked="Boolean(audio.autoplay)" @change="update('autoplay', $event.target.checked)" /><span><strong>Autoplay</strong><small>Tự phát khi người xem chạm vào POI.</small></span></label><label class="vb-hover-toggle-label"><input type="checkbox" :checked="Boolean(audio.loop)" @change="update('loop', $event.target.checked)" /><span><strong>Loop</strong><small>Lặp lại audio cho đến khi người xem dừng.</small></span></label></div>
    </div>

    <div class="vb-audio-editor-section vb-audio-editor-advanced"><h4>Advanced</h4><p>Audio POI sẽ ưu tiên hơn Audio Tour. Khi kết thúc, Audio Tour được tiếp tục từ đúng vị trí đã tạm dừng.</p></div>
  </section>
</template>

<style scoped>
.vb-audio-poi-editor { display: grid; gap: 14px; }
.vb-audio-poi-heading { align-items: center; background: linear-gradient(135deg, rgba(250,204,21,.14), rgba(251,146,60,.06)); border: 1px solid rgba(250,204,21,.24); border-radius: 12px; display: flex; gap: 11px; padding: 13px; }
.vb-audio-poi-heading > span { align-items: center; background: rgba(250,204,21,.18); border-radius: 10px; color: #fcd34d; display: inline-flex; font-size: 15px; height: 34px; justify-content: center; letter-spacing: -4px; padding-right: 5px; width: 34px; }
.vb-audio-poi-heading h3 { color: #f8fafc; font-size: 14px; margin: 0; }.vb-audio-poi-heading p { color: #94a3b8; font-size: 11px; margin: 3px 0 0; }
.vb-audio-editor-section { border: 1px solid rgba(148,163,184,.13); border-radius: 11px; display: grid; gap: 12px; padding: 13px; }.vb-audio-editor-section h4 { color: #fcd34d; font-size: 10px; letter-spacing: .08em; margin: 0; text-transform: uppercase; }.vb-audio-editor-section :deep(.vb-prop-row) { margin-bottom: 0; }.vb-audio-editor-section :deep(.vb-prop-label small) { color: #64748b; font-weight: 400; }.vb-audio-editor-textarea { min-height: 76px; resize: vertical; }
.vb-audio-upload { align-items: center; background: rgba(15,23,42,.46); border: 1px dashed rgba(250,204,21,.35); border-radius: 10px; display: flex; gap: 9px; min-height: 68px; padding: 9px; position: relative; }.vb-audio-upload.has-file { border-style: solid; }.vb-audio-upload.error { border-color: #fb7185; }.vb-audio-upload-empty { align-items: center; background: transparent; border: 0; color: inherit; cursor: pointer; display: flex; gap: 11px; padding: 0; text-align: left; width: 100%; }.vb-audio-upload-empty-icon,.vb-audio-upload-file-icon { align-items: center; background: rgba(250,204,21,.15); border-radius: 10px; color: #fcd34d; display: inline-flex; font-size: 14px; height: 38px; justify-content: center; letter-spacing: -4px; padding-right: 5px; width: 38px; }.vb-audio-upload-empty strong,.vb-audio-upload-file-copy strong { color: #e2e8f0; display: block; font-size: 12px; }.vb-audio-upload-empty small,.vb-audio-upload-file-copy small { color: #64748b; display: block; font-size: 10px; margin-top: 3px; }.vb-audio-upload-file-copy { min-width: 0; flex: 1; }.vb-audio-upload-file-copy strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }.vb-audio-upload-action,.vb-audio-upload-remove { background: rgba(250,204,21,.12); border: 0; border-radius: 7px; color: #fcd34d; cursor: pointer; font-size: 10px; padding: 6px 7px; }.vb-audio-upload-remove { background: rgba(251,113,133,.1); color: #fda4af; font-size: 16px; line-height: 1; padding: 3px 7px; }.vb-audio-upload-error { bottom: -20px; color: #fda4af; font-size: 10px; left: 0; margin: 0; position: absolute; }.vb-prop-input-error { border-color: #fb7185 !important; }
.vb-audio-preview { align-items: center; background: rgba(15,23,42,.6); border-radius: 9px; display: grid; gap: 9px; grid-template-columns: 30px minmax(0,1fr) auto; padding: 8px; }.vb-audio-preview-play { background: #facc15; border: 0; border-radius: 50%; color: #342704; cursor: pointer; font-size: 11px; font-weight: 800; height: 30px; width: 30px; }.vb-audio-preview-track { min-width: 0; }.vb-audio-preview-track input { accent-color: #facc15; cursor: pointer; margin: 0; width: 100%; }.vb-audio-preview-track small { color: #94a3b8; display: block; font-size: 9px; margin-top: 3px; }.vb-audio-preview-label { color: #64748b; font-size: 9px; text-transform: uppercase; }
.vb-audio-range-row { align-items: center; display: flex; gap: 8px; }.vb-audio-range-row input { accent-color: #facc15; flex: 1; min-width: 0; }.vb-audio-range-row output { color: #fcd34d; font-size: 11px; min-width: 31px; }.vb-audio-toggle-list { display: grid; gap: 8px; }.vb-audio-toggle-list :deep(.vb-hover-toggle-label) { align-items: flex-start; display: flex; gap: 8px; margin: 0; }.vb-audio-toggle-list strong,.vb-audio-toggle-list small { display: block; }.vb-audio-toggle-list strong { color: #cbd5e1; font-size: 11px; }.vb-audio-toggle-list small { color: #64748b; font-size: 10px; margin-top: 2px; }.vb-audio-editor-advanced { background: rgba(15,23,42,.3); }.vb-audio-editor-advanced p { color: #94a3b8; font-size: 11px; line-height: 1.5; margin: 0; }
@media (max-width: 480px) { .vb-audio-editor-section :deep(.vb-prop-row-inline) { display: grid; grid-template-columns: 1fr; }.vb-audio-preview-label { display: none; }.vb-audio-upload { flex-wrap: wrap; }.vb-audio-upload-action { margin-left: auto; } }
</style>
