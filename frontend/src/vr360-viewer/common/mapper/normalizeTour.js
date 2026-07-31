import { normalizeNavStyle } from '../constants/nav.js';

const DEFAULT_VIEW = { lon: 0, lat: 0, fov: 75 };

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function firstValue(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '') ?? '';
}

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function resolveAsset(value, resolveAssetUrl) {
  return resolveAssetUrl ? resolveAssetUrl(value || '') : (value || '');
}

function sourceScenes(payload) {
  const source = payload?.TOUR_DATA || payload?.tour_data || payload?.data || payload || {};
  return { source, scenes: asArray(source.scenes || source.SCENES) };
}

export function normalizeView(sceneOrView) {
  const source = sceneOrView || {};
  return {
    lon: toNumber(source.lon, DEFAULT_VIEW.lon),
    lat: toNumber(source.lat, DEFAULT_VIEW.lat),
    fov: toNumber(source.fov, DEFAULT_VIEW.fov),
  };
}

export function normalizeHotspot(rawHotspot = {}, sceneIndex = 0, hotspotIndex = 0, options = {}) {
  const raw = rawHotspot;
  const typeValue = firstValue(raw.type, raw.loai_poi);
  const type = typeValue === 'navigate' || typeValue === 'chuyen_canh' ? 'nav'
    : ['nav', 'point', 'info', 'info_area'].includes(typeValue) ? typeValue : 'point';
  const info = raw.info || {};
  const areaPoints = asArray(raw.area_points || raw.areaPoints).map((point) => ({
    lon: toNumber(point.lon),
    lat: toNumber(point.lat),
    x: toNumber(point.x, 50),
    y: toNumber(point.y, 50),
    raw: point,
  }));

  const id = String(firstValue(raw.id, raw.key, `hotspot-${sceneIndex + 1}-${hotspotIndex + 1}`));
  return {
    id,
    type,
    position: { lon: toNumber(raw.lon), lat: toNumber(raw.lat), x: toNumber(raw.x, 50), y: toNumber(raw.y, 50) },
    targetSceneId: String(firstValue(raw.target_scene_id, raw.target, raw.scene_id)),
    targetView: raw.target_view || raw.targetView || raw.view || raw.entryView || null,
    navStyle: normalizeNavStyle(raw.navStyle || raw.nav_style),
    label: firstValue(raw.label, raw.title, `Hotspot ${hotspotIndex + 1}`),
    content: {
      title: firstValue(info.title, raw.info_title, raw.label),
      description: firstValue(info.description, raw.info_description, raw.description),
    },
    media: {
      imageUrl: resolveAsset(firstValue(info.image_url, raw.info_image_url, raw.image_url, raw.image), options.resolveAssetUrl),
      videoUrl: resolveAsset(firstValue(info.video_url, raw.info_video_url, raw.video_url), options.resolveAssetUrl),
      youtubeUrl: firstValue(info.youtube_url, raw.info_youtube_url, raw.youtube_url),
      previewUrl: resolveAsset(firstValue(raw.preview_image, raw.preview, raw.image_url), options.resolveAssetUrl),
    },
    audio: { url: resolveAsset(firstValue(raw.audio_url, raw.audio), options.resolveAssetUrl) },
    style: { glow: raw.glow ?? raw.style?.glow ?? true, icon: raw.icon || null },
    areaPoints,
    raw,
  };
}

export function normalizeScene(rawScene = {}, sceneIndex = 0, options = {}) {
  const raw = rawScene;
  const rawImage = firstValue(raw.original_file, raw.optimized_file, raw.image_url, raw.image, raw.panorama, raw.url, raw.preview_file);
  const rawThumbnail = firstValue(raw.thumbnail_file, raw.thumbnail, raw.thumb_url, raw.thumb, raw.preview_file, raw.optimized_file, rawImage);
  const view = raw.view || raw.initialView || {};
  const id = String(firstValue(raw.id, raw.key, raw.scene_key, `scene-${sceneIndex + 1}`));
  return {
    id,
    name: firstValue(raw.name, raw.title, `Scene ${sceneIndex + 1}`),
    group: firstValue(raw.group, 'Default'),
    imageSources: [rawImage, raw.image_url, raw.optimized_file, raw.preview_file, rawThumbnail]
      .map((value) => resolveAsset(value, options.resolveAssetUrl)).filter(Boolean)
      .filter((value, index, values) => values.indexOf(value) === index),
    thumbnailSource: resolveAsset(rawThumbnail, options.resolveAssetUrl),
    initialView: normalizeView({ ...view, lon: view.lon ?? raw.lon, lat: view.lat ?? raw.lat, fov: view.fov ?? raw.fov }),
    hotspots: asArray(raw.hotspots).map((hotspot, index) => normalizeHotspot(hotspot, sceneIndex, index, options)),
    narration: {
      url: resolveAsset(firstValue(raw.audio_url, raw.audio, raw.entry_audio_url, raw.narration_audio, raw.am_thanh_thuyet_minh?.duong_dan_file_audio), options.resolveAssetUrl),
      autoplay: Boolean(raw.am_thanh_thuyet_minh?.tu_dong_phat),
      duration: toNumber(raw.am_thanh_thuyet_minh?.thoi_luong_giay),
    },
    transition: raw.transition ? { ...raw.transition } : null,
    metadata: { description: firstValue(raw.description, raw.info), gps: raw.gps || null },
    raw,
  };
}

export function normalizeTour(payload = {}, options = {}) {
  const { source, scenes } = sourceScenes(payload);
  const runtimeScenes = scenes.map((scene, index) => normalizeScene(scene, index, options));
  return {
    id: String(firstValue(source.id, payload.id, source.key, 'tour')),
    title: firstValue(source.title, source.name, payload.title, 'VR360 Tour'),
    scenes: runtimeScenes,
    initialSceneId: runtimeScenes[0]?.id || '',
    narration: source.narration || null,
    backgroundMusic: { url: resolveAsset(firstValue(source.background_audio, source.background_music, payload.version?.background_audio), options.resolveAssetUrl) },
    pointHotspotLogo: resolveAsset(firstValue(source.hotspot_point_logo, payload.version?.hotspot_point_logo), options.resolveAssetUrl),
    metadata: { version: payload.version || null, source },
    raw: payload,
  };
}

export function runtimeHotspotForViewer(hotspot, scenes, activeScene) {
  const target = scenes.find((scene) => scene.id === hotspot.targetSceneId);
  return {
    ...hotspot,
    target_scene_id: hotspot.targetSceneId,
    target_scene_name: target?.name || '',
    target_view: hotspot.targetView,
    lon: hotspot.position.lon,
    lat: hotspot.position.lat,
    x: hotspot.position.x,
    y: hotspot.position.y,
    label: hotspot.label,
    type: hotspot.type,
    navStyle: hotspot.navStyle,
    audio_url: hotspot.audio.url,
    preview_image: hotspot.type === 'info' || hotspot.type === 'info_area'
      ? hotspot.media.imageUrl || target?.imageSources?.[0] || activeScene?.imageSources?.[0] || ''
      : target?.imageSources?.[0] || activeScene?.imageSources?.[0] || '',
    info: {
      title: hotspot.content.title,
      description: hotspot.content.description,
      image_url: hotspot.media.imageUrl,
      video_url: hotspot.media.videoUrl,
      youtube_url: hotspot.media.youtubeUrl,
    },
    area_points: hotspot.areaPoints,
    glow: hotspot.style.glow,
  };
}
