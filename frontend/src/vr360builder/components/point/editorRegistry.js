import { markRaw } from 'vue';
import NavPointEditor from './editors/NavPointEditor.vue';
import TextInfoEditor from './editors/poi/TextInfoEditor.vue';
import VideoEditor from './editors/poi/VideoEditor.vue';
import GalleryEditor from './editors/poi/GalleryEditor.vue';
import PinMarkerEditor from './editors/poi/PinMarkerEditor.vue';
import AreaLandmarkEditor from './editors/poi/AreaLandmarkEditor.vue';
import AudioPoiEditor from './editors/poi/AudioPoiEditor.vue';
import { resolvePointKind } from '@/common/vr360/pointSchema.js';

export const pointEditorRegistry = Object.freeze({
  nav: markRaw(NavPointEditor),
  info: markRaw(TextInfoEditor),
  gallery: markRaw(GalleryEditor),
  video: markRaw(VideoEditor),
  pin: markRaw(PinMarkerEditor),
  area_landmark: markRaw(AreaLandmarkEditor),
  audio: markRaw(AudioPoiEditor),
});

export function resolvePointEditor(hotspot) {
  return pointEditorRegistry[resolvePointKind(hotspot)] || null;
}
