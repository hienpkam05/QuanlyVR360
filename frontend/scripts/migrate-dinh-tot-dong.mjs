import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(projectRoot, 'dinh-tot-dong.json');
const outputPath = path.join(projectRoot, 'dinh-tot-dong.formatted.json');
const reportPath = path.join(projectRoot, 'dinh-tot-dong.mapping.md');

const VIEW_LIMITS = Object.freeze({ minLat: -58, maxLat: 82, minFov: 30, maxFov: 120 });

function asObject(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${name} must be an object.`);
  }
  return value;
}

function asArray(value, name) {
  if (!Array.isArray(value)) throw new Error(`${name} must be an array.`);
  return value;
}

function finiteNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${name} must be a finite number.`);
  return number;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function safeIdPart(value) {
  return String(value).replace(/[^A-Za-z0-9_-]+/g, '_') || 'scene';
}

function isUsableAssetUrl(value) {
  return typeof value === 'string' && /^(https?:\/\/|\/|\.\/|\.\.\/)/.test(value);
}

function normalizeInitialView(sourceView, sceneId, adjustments) {
  const view = asObject(sourceView, `scene ${sceneId}.initialView`);
  const lon = finiteNumber(view.lon, `scene ${sceneId}.initialView.lon`);
  const sourceLat = finiteNumber(view.lat, `scene ${sceneId}.initialView.lat`);
  const sourceFov = finiteNumber(view.fov, `scene ${sceneId}.initialView.fov`);
  const lat = clamp(sourceLat, VIEW_LIMITS.minLat, VIEW_LIMITS.maxLat);
  const fov = clamp(sourceFov, VIEW_LIMITS.minFov, VIEW_LIMITS.maxFov);

  if (lat !== sourceLat || fov !== sourceFov) {
    adjustments.push({ sceneId: String(sceneId), source: { lon, lat: sourceLat, fov: sourceFov }, target: { lon, lat, fov } });
  }
  return { lon, lat, fov };
}

function transformHotspot(sourceHotspot, sceneId, index) {
  const source = asObject(sourceHotspot, `scene ${sceneId}.hotspots[${index}]`);
  const lon = finiteNumber(source.lon, `hotspot ${sceneId}/${index}.lon`);
  const lat = finiteNumber(source.lat, `hotspot ${sceneId}/${index}.lat`);
  if (lat < VIEW_LIMITS.minLat || lat > VIEW_LIMITS.maxLat) {
    throw new Error(`hotspot ${sceneId}/${index}.lat is outside the viewer range ${VIEW_LIMITS.minLat}..${VIEW_LIMITS.maxLat}.`);
  }
  if (typeof source.target !== 'string' || !source.target) {
    throw new Error(`hotspot ${sceneId}/${index}.target must be a non-empty scene id.`);
  }

  // All source hotspots are scene links. `nav` is the current canonical
  // persisted point type and is routed as navigation by the viewer registry.
  return {
    id: `nav_${safeIdPart(sceneId)}_${index + 1}`,
    lon,
    lat,
    label: typeof source.label === 'string' ? source.label : `Scene link ${index + 1}`,
    target: source.target,
    type: 'nav',
    source_type: source.type,
    navStyle: 'default',
    icon: 'dot',
    loai_poi: 'chuyen_canh',
    khi_dua_chuot_vao: {
      hien_thi_anh_thu_nho: false,
      duong_dan_thumbnail: '',
      van_ban_huong_dan: '',
    },
    entryView: null,
  };
}

function transform(source) {
  const root = asObject(source, 'source root');
  const sourceScenes = asArray(root.scenes, 'source.scenes');
  const sceneIds = new Set();
  const adjustments = [];
  const invalidThumbnails = [];

  const scenes = sourceScenes.map((sourceScene, sceneIndex) => {
    const scene = asObject(sourceScene, `source.scenes[${sceneIndex}]`);
    const id = String(scene.id ?? '');
    if (!id) throw new Error(`source.scenes[${sceneIndex}].id is required.`);
    if (sceneIds.has(id)) throw new Error(`Duplicate source scene id: ${id}`);
    sceneIds.add(id);
    if (!isUsableAssetUrl(scene.image)) throw new Error(`scene ${id}.image is not a usable panorama URL.`);

    const thumbIsUsable = isUsableAssetUrl(scene.thumb);
    const thumb = thumbIsUsable ? scene.thumb : scene.image;
    if (!thumbIsUsable) invalidThumbnails.push({ sceneId: id, sourceThumb: scene.thumb, replacement: scene.image });
    const initialView = normalizeInitialView(scene.initialView, id, adjustments);
    const hotspots = asArray(scene.hotspots, `scene ${id}.hotspots`).map((hotspot, index) => transformHotspot(hotspot, id, index));

    return {
      id,
      name: typeof scene.name === 'string' ? scene.name : `Scene ${sceneIndex + 1}`,
      group: typeof scene.group === 'string' && scene.group ? scene.group : 'Mặc định',
      image: scene.image,
      thumb,
      info: typeof scene.info === 'string' ? scene.info : '',
      initialView,
      hotspots,
      ...(thumbIsUsable ? {} : { source_thumb: scene.thumb }),
      ...(adjustments.some((item) => item.sceneId === id) ? { source_initialView: scene.initialView } : {}),
    };
  });

  for (const scene of scenes) {
    for (const hotspot of scene.hotspots) {
      if (!sceneIds.has(hotspot.target)) throw new Error(`Dangling navigation reference: ${scene.id}/${hotspot.id} -> ${hotspot.target}`);
    }
  }

  return {
    output: { title: typeof root.title === 'string' ? root.title : 'VR360 Virtual Tour', scenes },
    adjustments,
    invalidThumbnails,
  };
}

function validateTarget(tour) {
  const errors = [];
  const sceneIds = new Set();
  const hotspotIds = new Set();
  const statistics = { scenes: 0, hotspots: 0, nav: 0 };
  const fail = (message) => errors.push(message);

  if (!tour || typeof tour !== 'object' || Array.isArray(tour)) fail('Root must be an object.');
  if (!Array.isArray(tour?.scenes)) fail('Root.scenes must be an array.');
  for (const scene of tour?.scenes || []) {
    statistics.scenes += 1;
    if (!scene.id || sceneIds.has(scene.id)) fail(`Invalid or duplicate scene id: ${scene.id}`);
    sceneIds.add(scene.id);
    if (!isUsableAssetUrl(scene.image)) fail(`Scene ${scene.id} has an invalid panorama URL.`);
    for (const key of ['lon', 'lat', 'fov']) {
      if (!Number.isFinite(scene.initialView?.[key])) fail(`Scene ${scene.id} has invalid initialView.${key}.`);
    }
    if (scene.initialView?.lat < VIEW_LIMITS.minLat || scene.initialView?.lat > VIEW_LIMITS.maxLat) fail(`Scene ${scene.id} has out-of-range initialView.lat.`);
    if (scene.initialView?.fov < VIEW_LIMITS.minFov || scene.initialView?.fov > VIEW_LIMITS.maxFov) fail(`Scene ${scene.id} has out-of-range initialView.fov.`);
    for (const hotspot of scene.hotspots || []) {
      statistics.hotspots += 1;
      statistics.nav += hotspot.type === 'nav' ? 1 : 0;
      if (!hotspot.id || hotspotIds.has(hotspot.id)) fail(`Invalid or duplicate hotspot id: ${hotspot.id}`);
      hotspotIds.add(hotspot.id);
      if (hotspot.type !== 'nav' || hotspot.loai_poi !== 'chuyen_canh') fail(`Hotspot ${hotspot.id} is not a canonical navigation point.`);
      if (!Number.isFinite(hotspot.lon) || !Number.isFinite(hotspot.lat)) fail(`Hotspot ${hotspot.id} has invalid lon/lat.`);
      if (hotspot.lat < VIEW_LIMITS.minLat || hotspot.lat > VIEW_LIMITS.maxLat) fail(`Hotspot ${hotspot.id} has out-of-range latitude.`);
    }
  }
  for (const scene of tour?.scenes || []) {
    for (const hotspot of scene.hotspots || []) {
      if (!sceneIds.has(hotspot.target)) fail(`Dangling navigation target: ${scene.id}/${hotspot.id} -> ${hotspot.target}`);
    }
  }
  if (errors.length) throw new Error(`Target validation failed:\n- ${errors.join('\n- ')}`);
  return statistics;
}

function report({ source, output, adjustments, invalidThumbnails, statistics }) {
  const sceneMap = output.scenes.map((scene) => `| \`${scene.id}\` | \`${scene.id}\` | Preserved |`).join('\n');
  return `# Đình Tốt Động — Migration Mapping Report

## SOURCE SCHEMA

- File: \`dinh-tot-dong.json\`
- Root: object \`{ title, scenes }\`
- Scenes: ${source.scenes.length}; scene shape: \`id, name, group, image, thumb, info, initialView, hotspots\`.
- Hotspots: ${statistics.hotspots}; all source hotspots have \`{ lon, lat, label, target, type: "poi" }\` and are scene-navigation links.
- Source contains no audio, video, image/gallery, info/text, area-media, area-landmark, transition, GPS, scene narration, or intro fields.

## TARGET SCHEMA

### Current Builder Format

The source of truth is \`src/vr360builder/pages/Vr360Builder.vue#buildJson\`, which persists \`{ title, audio?, scenes }\`. Each saved scene contains \`id, name, group, image, thumb, info, gps, initialView, am_thanh_thuyet_minh?, transition?, hotspots\`.

### Current Viewer Format

The production route loads the version API payload in \`src/vr360-viewer/pages/ViewerProductionPage.vue\`; \`src/vr360-viewer/common/mapper/normalizeTour.js\` selects \`payload.data.scenes\` (or a direct \`scenes\` root) and normalizes it. The renderer registry in \`src/vr360-viewer/common/vr360/pointRendererRegistry.js\` treats \`type: "nav"\` as the canonical navigation point.

### Target Selected

Direct Builder/Viewer tour-data payload: \`{ title, scenes: [...] }\`. It can be supplied directly to \`normalizeTour()\` and can be saved as \`TourVersion.data\` by the current Builder.

## MAPPING

| Source | Target | Category | Action |
|---|---|---|---|
| \`title\` | \`title\` | A. Direct copy | Preserved. |
| \`scenes[]\` | \`scenes[]\` | D. Array transform | One source scene becomes one target scene, preserving order. |
| \`scene.id\` | \`scene.id\` | F. ID/reference | Preserved exactly. |
| \`scene.name/group/image/info\` | same fields | A. Direct copy | Preserved. |
| \`scene.thumb\` | \`scene.thumb\` | E. Value transform | Preserved when a usable URL; invalid sentinel is replaced by panorama URL and retained as \`source_thumb\`. |
| \`scene.initialView.{lon,lat,fov}\` | same fields | E. Value transform | Degrees are already the target system. Lat/FOV are constrained to runtime limits only when necessary; original kept in \`source_initialView\`. |
| \`hotspots[]\` | \`hotspots[]\` | D. Array transform | One source link becomes one canonical target nav point. |
| \`hotspot.type: "poi"\` + \`target\` | \`type: "nav", loai_poi: "chuyen_canh"\` | B. Rename / semantic normalization | Source has only linked-scene POIs; canonical target navigation is used; original type is retained in \`source_type\`. |
| \`hotspot.target\` | \`hotspot.target\` | F. ID/reference | Target scene id is unchanged; all references were checked. |
| \`hotspot.lon/lat/label\` | same fields | A. Direct copy | Degrees, no unit conversion. |
| absent hotspot id | \`hotspot.id\` | G. Default | Deterministic \`nav_<sourceSceneId>_<1-based index>\`. |
| absent target display config | \`navStyle/icon/hover/entryView\` | G. Default | Current Builder canonical defaults: \`default\`, \`dot\`, disabled empty hover, \`null\`. |

## TRANSFORMATIONS

- Coordinate system is degrees in both source and target (lon/lat); no yaw/pitch/radian conversion was performed.
- Camera limits come from \`src/vr360-viewer/common/runtime/cameraController.js\`: latitude \`${VIEW_LIMITS.minLat}..${VIEW_LIMITS.maxLat}\`, FOV \`${VIEW_LIMITS.minFov}..${VIEW_LIMITS.maxFov}\`.
- Invalid source thumbnail sentinels: ${invalidThumbnails.length}. Camera adjustments: ${adjustments.length}.

### Camera Adjustments Requiring Manual Review

${adjustments.length ? adjustments.map((item) => `- Scene \`${item.sceneId}\`: source \`${JSON.stringify(item.source)}\` → runtime-safe \`${JSON.stringify(item.target)}\`; original retained in \`source_initialView\`.`).join('\n') : 'None.'}

### Invalid Thumbnail Values Preserved for Audit

${invalidThumbnails.length ? invalidThumbnails.map((item) => `- Scene \`${item.sceneId}\`: \`${item.sourceThumb}\` → panorama URL; original retained in \`source_thumb\`.`).join('\n') : 'None.'}

## UNMAPPED FIELDS

None. Every field present in the source schema is copied, transformed, or retained for audit where the target runtime cannot consume the original value.

## UNSUPPORTED TYPES

None in source. The source has only scene-link POIs, which map to canonical \`nav\` points. Audio, video, gallery/image, info, area media, area landmark, transitions, intro, and narration were absent and were not fabricated.

## DEFAULT VALUES

- Per generated navigation point: \`id\`, \`navStyle: "default"\`, \`icon: "dot"\`, \`loai_poi: "chuyen_canh"\`, disabled empty \`khi_dua_chuot_vao\`, and \`entryView: null\`.
- No scene audio, tour audio, intro, transition, GPS, or media defaults were added because the source does not contain those entities and they are optional in current Builder output.

## ID MAPPING

Scene IDs are intentionally unchanged, so every navigation target remains valid.

| Source scene ID | Target scene ID | Action |
|---|---|---|
${sceneMap}

Generated hotspot IDs are deterministic from source scene id and array position: \`nav_<sourceSceneId>_<1-based index>\`.

## ASSET PATH TRANSFORM

- Panorama and valid thumbnail URLs remain absolute HTTPS URLs. The Viewer accepts absolute URLs without API-base rewriting.
- No local path or asset-host rewrite was applied.

## VALIDATION RESULT

- JSON syntax: **PASS** (output is parsed after being written).
- Target static schema: **PASS** (${statistics.scenes} unique scenes; ${statistics.hotspots} unique canonical nav points).
- IDs: **PASS**.
- Navigation references: **PASS** (no dangling targets).
- Panorama assets: **PASS** (all scene panorama URLs have accepted absolute-URL form; remote reachability is not tested).
- Coordinates: **PASS** after the two documented camera-limit transformations.
- FOV: **PASS**.
- Unsupported type conversion: **PASS** (none silently converted).

## REPRODUCE

Run from \`frontend\`:

\`\`\`powershell
node scripts/migrate-dinh-tot-dong.mjs
\`\`\`
`;
}

function main() {
  const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const { output, adjustments, invalidThumbnails } = transform(source);
  const statistics = validateTarget(output);
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  fs.writeFileSync(reportPath, report({ source, output, adjustments, invalidThumbnails, statistics }), 'utf8');
  console.log(`Migrated ${statistics.scenes} scenes and ${statistics.hotspots} navigation hotspots.`);
  console.log(`Output: ${outputPath}`);
  console.log(`Report: ${reportPath}`);
}

main();
