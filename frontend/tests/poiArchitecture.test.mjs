import assert from 'node:assert/strict';
import * as THREE from 'three';
import {
  createPoint,
  normalizeBuilderPoint,
  normalizePoint,
  resolvePointKind,
} from '../src/common/vr360/pointSchema.js';
import fs from 'node:fs';
import { isAreaAnnotationPoint, isAreaLandmarkPoint, isNavigationPoint, pointRendererRegistry, resolvePointRenderer } from '../src/common/vr360/pointRendererRegistry.js';
import { dispatchPointInteraction, resolvePointPreview, resolvePointVisual } from '../src/vr360-viewer/common/registry/pointPluginRegistry.js';
import { normalizeTour, runtimeHotspotForViewer } from '../src/vr360-viewer/common/mapper/normalizeTour.js';
import { projectViewerPoints } from '../src/vr360-viewer/common/runtime/pointProjection.js';

const cases = [
  ['nav', 'chuyen_canh'],
  ['info', 'thong_tin_van_ban'],
  ['gallery', 'thu_vien_anh'],
  ['video', 'phat_video'],
  ['audio', 'audio'],
  ['pin', 'ghim_dia_danh'],
  ['area_landmark', 'ghim_dia_danh'],
  ['area', null],
  ['generic', null],
];

const editorSource = fs.readFileSync(new URL('../src/vr360builder/components/point/editorRegistry.js', import.meta.url), 'utf8');
const areaEditorSource = fs.readFileSync(new URL('../src/vr360builder/components/point/editors/poi/AreaEditor.vue', import.meta.url), 'utf8');
const videoPopupSource = fs.readFileSync(new URL('../src/vr360-viewer/components/popups/VideoPoiPopup.vue', import.meta.url), 'utf8');
const previewEngineSource = fs.readFileSync(new URL('../src/vr360builder/common/PreviewEngine.js', import.meta.url), 'utf8');
for (const [type] of cases) {
  if (type !== 'generic') assert.match(editorSource, new RegExp(`\\b${type}:`), `${type}: editor registry mapping`);
}

for (const [type, legacyType] of cases) {
  const source = type === 'area_landmark'
    ? { id: type, type, loai_poi: legacyType, vertices: [{ lon: 0, lat: 0 }, { lon: 1, lat: 0 }, { lon: 0, lat: 1 }] }
    : createPoint(type, { id: type, lon: 10, lat: 20 });
  if (legacyType && type !== 'audio') source.loai_poi = legacyType;

  assert.equal(resolvePointKind(source), type, `${type}: factory kind`);
  const builder = normalizeBuilderPoint(source);
  assert.equal(builder.type, type, `${type}: Builder normalize must preserve canonical type`);
  const runtime = normalizePoint(JSON.parse(JSON.stringify(builder)));
  assert.equal(runtime.type, type, `${type}: runtime normalize must preserve type`);
  assert.equal(resolvePointRenderer(runtime), pointRendererRegistry[type], `${type}: renderer registry mapping`);
}

// Regression: the quick-create path used to route Information to Area Landmark.
const quickInfo = createPoint('info', { id: 'quick-info' });
assert.equal(quickInfo.type, 'info');
assert.equal(resolvePointKind(quickInfo), 'info');

assert.equal(resolvePointPreview(createPoint('info')).kind, 'tooltip');
assert.equal(resolvePointPreview(createPoint('audio')).kind, 'tooltip');
assert.equal(resolvePointPreview(createPoint('nav')).kind, 'tooltip');
assert.equal(resolvePointPreview(createPoint('gallery')).kind, 'image');
assert.equal(resolvePointPreview(createPoint('video')).kind, 'none');
assert.equal(resolvePointPreview(createPoint('area')).kind, 'none');
assert.equal(resolvePointVisual(createPoint('nav')).nav, true);
assert.equal(resolvePointVisual(createPoint('audio')).audio, true);
assert.equal(resolvePointVisual(createPoint('video')).video, true);
const area = createPoint('area', { id: 'area' });
assert.equal(resolvePointRenderer(area).renderer, 'area-media');
assert.equal(resolvePointRenderer(area).interactive, false);
assert.equal(isAreaAnnotationPoint(area), false);
assert.equal(isNavigationPoint(area), false);
assert.equal(isAreaLandmarkPoint({ type: 'area_landmark', vertices: [{ lon: 0, lat: 0 }, { lon: 1, lat: 0 }, { lon: 0, lat: 1 }] }), true);
assert.equal(isNavigationPoint({ type: 'area_landmark', vertices: [{ lon: 0, lat: 0 }, { lon: 1, lat: 0 }, { lon: 0, lat: 1 }] }), true);
assert.equal(normalizePoint({ type: 'area', vertices: [{ lon: 0, lat: 0 }, { lon: 1, lat: 0 }, { lon: 0, lat: 1 }], overlay_image: '/overlay.jpg' }).areaMedia.src, '/overlay.jpg');
const exportedAreaShape = normalizePoint({ type: 'area-media', mediaType: 'video', media: { src: '/screen.mp4', type: 'video', loop: false, muted: true, autoplay: true, poster: '/poster.jpg', playbackRate: 1.25 }, vertices: [{ lon: 0, lat: 0 }, { lon: 1, lat: 0 }, { lon: 0, lat: 1 }] });
assert.equal(exportedAreaShape.type, 'area');
assert.equal(exportedAreaShape.areaMedia.src, '/screen.mp4');
assert.equal(exportedAreaShape.areaMedia.type, 'video');
assert.equal(exportedAreaShape.areaMedia.loop, false);
assert.equal(exportedAreaShape.areaMedia.poster, '/poster.jpg');
assert.equal(exportedAreaShape.areaMedia.playbackRate, 1.25);
const fullAreaExport = normalizePoint({
  type: 'area-media',
  mediaType: 'image',
  media: { src: '/poster.png', opacity: 0.7, brightness: 1.2, borderRadius: 12, tint: '#fff0cc', fitMode: 'contain', zIndex: 5 },
  vertices: [{ lon: 0, lat: 0 }, { lon: 1, lat: 0 }, { lon: 0, lat: 1 }],
});
assert.deepEqual(fullAreaExport.areaMedia, {
  type: 'image', src: '/poster.png', opacity: 0.7, brightness: 1.2,
  borderRadius: 12, tint: '#fff0cc', fitMode: 'contain', loop: true,
  muted: true, autoplay: true, poster: '', playbackRate: 1, zIndex: 5,
});
const mediaOnlyBuilderArea = normalizeBuilderPoint({
  type: 'area-media', media: { type: 'image', src: '/media-only.png', fileName: 'media-only.png', fileSize: 1024 },
  vertices: [{ lon: 0, lat: 0 }, { lon: 1, lat: 0 }, { lon: 0, lat: 1 }],
});
assert.equal(mediaOnlyBuilderArea.type, 'area');
assert.equal(mediaOnlyBuilderArea.areaMedia.src, '/media-only.png');
assert.equal(mediaOnlyBuilderArea.areaMedia.fileName, 'media-only.png');
assert.equal(mediaOnlyBuilderArea.areaMedia.fileSize, 1024);
const landmarkTour = normalizeTour({
  scenes: [
    { id: 'scene-a', image: '/a.jpg', hotspots: [{ id: 'area-nav', type: 'area_landmark', target: 'scene-b', vertices: [{ lon: 0, lat: 0 }, { lon: 2, lat: 0 }, { lon: 0, lat: 2 }] }] },
    { id: 'scene-b', image: '/b.jpg', hotspots: [] },
  ],
});
const runtimeLandmark = runtimeHotspotForViewer(landmarkTour.scenes[0].hotspots[0], landmarkTour.scenes, landmarkTour.scenes[0]);
assert.equal(runtimeLandmark.target_scene_id, 'scene-b', 'Area Landmark must preserve its navigation target at runtime');
assert.equal(runtimeLandmark.type, 'area_landmark');
const navigationPreviewTour = normalizeTour({
  scenes: [
    {
      id: 'scene-a', image: '/a.jpg', hotspots: [
        { id: 'nav', type: 'nav', target: 'scene-b', navStyle: 'preview_expand', lon: 0, lat: 0 },
        { id: 'nav', type: 'nav', target: 'scene-b', navStyle: 'preview_expand', lon: 25, lat: 0 },
      ],
    },
    { id: 'scene-b', image: '/b.jpg', thumb: '/b-thumb.jpg', hotspots: [] },
  ],
});
const runtimeNavigationPreview = navigationPreviewTour.scenes[0].hotspots.map((hotspot) => (
  runtimeHotspotForViewer(hotspot, navigationPreviewTour.scenes, navigationPreviewTour.scenes[0])
));
assert.equal(runtimeNavigationPreview[0].target_scene_thumbnail, '/b-thumb.jpg');
const projectionCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
projectionCamera.lookAt(500, 0, 0);
projectionCamera.updateMatrixWorld();
const projectedNavigationPreview = projectViewerPoints(runtimeNavigationPreview, projectionCamera, 1000, 1000, () => '');
assert.equal(projectedNavigationPreview.markers.length, 2);
assert.notEqual(projectedNavigationPreview.markers[0].renderKey, projectedNavigationPreview.markers[1].renderKey, 'Navigation markers with duplicate persisted IDs need unique render keys');
const areaMediaRendererSource = fs.readFileSync(new URL('../src/common/vr360/AreaMediaRenderer.js', import.meta.url), 'utf8');
assert.match(areaMediaRendererSource, /mesh\.raycast = \(\) => \{\}/, 'Area Media must stay out of picking');
assert.match(areaMediaRendererSource, /applyFitMode/, 'Area Media fit mode must be rendered, not only serialized');
assert.match(areaMediaRendererSource, /createCornerMask/, 'Area Media border radius must be rendered, not only serialized');
assert.match(previewEngineSource, /AreaMediaRenderer/);
assert.match(previewEngineSource, /AreaMediaEditorOverlay/);
let dispatched = '';
dispatchPointInteraction(createPoint('info'), { openPopup: (kind) => { dispatched = kind; } });
assert.equal(dispatched, 'info');
dispatched = 'unchanged';
dispatchPointInteraction(area, { openPopup: () => { dispatched = 'popup'; }, navigate: () => { dispatched = 'navigate'; } });
assert.equal(dispatched, 'unchanged');
assert.match(areaEditorSource, /areaMedia/);
assert.doesNotMatch(areaEditorSource, /Destination Scene|Cảnh đích|Transition|Camera Target/);
assert.match(videoPopupSource, /youtubeEmbedUrl/);
assert.match(videoPopupSource, /requestFullscreen/);
const viewerNavRendererSource = fs.readFileSync(new URL('../src/vr360-viewer/components/nav/NavRenderer.vue', import.meta.url), 'utf8');
assert.match(viewerNavRendererSource, /NavPreviewExpand/);
assert.match(viewerNavRendererSource, /normalizeNavStyle\(props\.hotspot\.navStyle\)/);
assert.match(viewerNavRendererSource, /target_scene_thumbnail/);

console.log(`POI architecture checks passed for ${cases.length} canonical types.`);
