const POI_KIND_BY_LEGACY_TYPE = {
  chuyen_canh: 'nav',
  thong_tin_van_ban: 'info',
  thu_vien_anh: 'gallery',
  phat_video: 'video',
  audio: 'audio',
  ghim_dia_danh: 'pin',
};

const TYPE_ALIASES = {
  nav: 'nav',
  navigate: 'nav',
  navigation: 'nav',
  chuyen_canh: 'nav',
  info: 'info',
  text: 'info',
  text_info: 'info',
  gallery: 'gallery',
  image_gallery: 'gallery',
  video: 'video',
  video_poi: 'video',
  audio: 'audio',
  pin: 'pin',
  pin_marker: 'pin',
  landmark: 'area_landmark',
  'landmark-area': 'area_landmark',
  place: 'area_landmark',
  point: 'generic',
  poi: 'generic',
  generic: 'generic',
};

function asObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

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

function normalizePointCoordinates(points) {
  return asArray(points).map((point) => ({
    ...asObject(point),
    lon: toNumber(point?.lon),
    lat: toNumber(point?.lat),
  }));
}

export function calculateLandmarkAnchor(vertices = []) {
  if (!vertices.length) return { lon: 0, lat: 0 };
  const total = vertices.reduce((sum, point) => {
    const phi = (90 - point.lat) * (Math.PI / 180);
    const theta = point.lon * (Math.PI / 180);
    return {
      x: sum.x + Math.sin(phi) * Math.cos(theta),
      y: sum.y + Math.cos(phi),
      z: sum.z + Math.sin(phi) * Math.sin(theta),
    };
  }, { x: 0, y: 0, z: 0 });
  const length = Math.hypot(total.x, total.y, total.z);
  if (!length) return { lon: 0, lat: 0 };
  return {
    lon: Math.atan2(total.z, total.x) * (180 / Math.PI),
    lat: Math.asin(total.y / length) * (180 / Math.PI),
  };
}

export function normalizeLandmarkVertices(rawPoint = {}) {
  const raw = asObject(rawPoint);
  return normalizePointCoordinates(firstValue(raw.vertices, raw.polygon, raw.area_points, raw.areaPoints));
}

/**
 * Resolves the canonical point kind without mutating the persisted point type.
 * `type` remains a backwards-compatible storage field while `kind` is the
 * single dispatch key for editors and renderers.
 */
export function resolvePointKind(rawPoint = {}) {
  const raw = asObject(rawPoint);
  const sourceType = String(firstValue(raw.type, raw.poiType, raw.kind, raw.category)).toLowerCase();
  // A persisted Landmark may already use the canonical `vertices` field
  // while still carrying the old pin type. Treat all supported geometry
  // aliases as the same Landmark evidence so it reaches the shared runtime.
  const landmarkVertices = firstValue(raw.vertices, raw.polygon, raw.area_points, raw.areaPoints);
  const hasPolygon = asArray(landmarkVertices).length >= 3;
  const poiKind = POI_KIND_BY_LEGACY_TYPE[raw.loai_poi];

  if (sourceType === 'area_landmark') return 'area_landmark';
  if (sourceType === 'info_area') return 'info_area';
  // Persisted Builder/API records may retain the generic `poi` type while
  // storing the concrete POI kind in `loai_poi`. The concrete kind must win,
  // especially for Audio POI, otherwise the runtime dispatches it as generic.
  if (poiKind && (sourceType === 'poi' || !sourceType || sourceType === 'generic')) {
    return poiKind === 'pin' ? (hasPolygon ? 'area_landmark' : 'pin') : poiKind;
  }
  if (['nav', 'navigate', 'navigation', 'chuyen_canh', 'info', 'text', 'text_info', 'gallery', 'image_gallery', 'video', 'video_poi', 'audio', 'pin', 'pin_marker', 'landmark', 'landmark-area', 'place'].includes(sourceType)) {
    return TYPE_ALIASES[sourceType];
  }

  if (poiKind === 'pin') return hasPolygon ? 'area_landmark' : 'pin';
  return poiKind || TYPE_ALIASES[sourceType] || 'generic';
}

export function legacyTypeForPointKind(kind, raw = {}) {
  if (raw.type) return raw.type;
  if (kind === 'nav') return 'nav';
  if (kind === 'info_area') return 'info_area';
  if (kind === 'area_landmark') return 'area_landmark';
  return 'poi';
}

/**
 * Converts every accepted persisted point variant into one non-lossy runtime
 * contract. Unknown fields remain available through both the spread result and
 * `raw`, so normalization never discards API extensions.
 */
export function normalizePoint(rawPoint = {}, options = {}) {
  const raw = asObject(rawPoint);
  const kind = resolvePointKind(raw);
  const legacyContent = asObject(raw.noi_dung);
  const info = asObject(raw.info);
  const hoverRaw = asObject(firstValue(raw.khi_dua_chuot_vao, raw.hover));
  const style = asObject(raw.style);
  const vertices = kind === 'area_landmark' ? normalizeLandmarkVertices(raw) : [];
  const polygon = kind === 'area_landmark' ? vertices : normalizePointCoordinates(firstValue(raw.polygon, raw.area_points, raw.areaPoints));
  const areaPoints = kind === 'area_landmark' ? vertices : normalizePointCoordinates(firstValue(raw.area_points, raw.areaPoints, raw.polygon));
  const computedAnchor = kind === 'area_landmark' ? calculateLandmarkAnchor(vertices) : null;
  const anchorRaw = asObject(raw.anchor);
  const anchor = computedAnchor || (raw.anchor ? { lon: toNumber(anchorRaw.lon), lat: toNumber(anchorRaw.lat) } : null);
  const fallbackId = options.fallbackId || 'hotspot';
  const resolveAsset = options.resolveAssetUrl || ((value) => value || '');
  const label = firstValue(
    typeof raw.label === 'string' ? raw.label : '',
    raw.title,
    legacyContent.tieu_de,
    info.title,
    options.fallbackLabel,
  );

  return {
    ...raw,
    id: String(firstValue(raw.id, raw.key, fallbackId)),
    // Canonical runtime type. Builder adapter below restores the persisted type.
    type: kind,
    kind,
    poiType: firstValue(raw.poiType, raw.loai_poi) || null,
    loaiPoi: raw.loai_poi ?? null,
    position: {
      lon: toNumber(firstValue(anchor?.lon, raw.lon, raw.position?.lon)),
      lat: toNumber(firstValue(anchor?.lat, raw.lat, raw.position?.lat)),
      x: toNumber(firstValue(raw.x, raw.position?.x), 50),
      y: toNumber(firstValue(raw.y, raw.position?.y), 50),
    },
    targetSceneId: String(firstValue(raw.target_scene_id, raw.targetSceneId, raw.target, raw.scene_id)),
    targetView: firstValue(raw.target_view, raw.targetView, raw.entryView, raw.view) || null,
    entryView: raw.entryView || null,
    label,
    labelConfig: typeof raw.label === 'object' ? { ...raw.label } : { text: label },
    icon: raw.icon ?? null,
    navStyle: raw.navStyle || raw.nav_style || null,
    geometry: { vertices: kind === 'area_landmark' ? vertices : undefined, polygon, areaPoints, anchor },
    vertices: kind === 'area_landmark' ? vertices : undefined,
    polygon,
    areaPoints,
    anchor,
    // Landmark labels are always anchored to the computed screen position.
    // This legacy field is retained only for non-landmark points.
    labelPosition: kind === 'area_landmark' ? null : (raw.labelPosition || raw.label_position || null),
    lineHeight: toNumber(raw.line_height ?? raw.lineHeight, 48),
    pinHeight: raw.chieu_cao_duong_ghim ?? null,
    showPolygonOnHover: raw.show_polygon_on_hover !== false,
    content: {
      title: firstValue(legacyContent.tieu_de, info.title, raw.info_title, raw.title, label),
      description: firstValue(legacyContent.mo_ta, info.description, raw.info_description, raw.description),
      link: firstValue(legacyContent.lien_ket, info.link, raw.link),
    },
    media: {
      imageUrl: resolveAsset(firstValue(legacyContent.anh_minh_hoa, info.image_url, raw.info_image_url, raw.image_url, raw.image)),
      images: asArray(firstValue(legacyContent.danh_sach_anh, raw.images, info.images)),
      videoUrl: resolveAsset(firstValue(legacyContent.url_video, info.video_url, raw.info_video_url, raw.video_url)),
      youtubeUrl: firstValue(info.youtube_url, raw.info_youtube_url, raw.youtube_url),
      previewUrl: resolveAsset(firstValue(raw.preview_image, raw.preview, raw.image_url)),
    },
    audio: (() => {
      const hasLegacyAudio = Boolean(raw.audio_url || raw.audio);
      if (kind !== 'audio' && !hasLegacyAudio) return null;
      const audio = raw.audio && typeof raw.audio === 'object' ? raw.audio : {};
      const url = resolveAsset(firstValue(audio.url, audio.file, raw.audio_url, typeof raw.audio === 'string' ? raw.audio : ''));
      return {
        enabled: audio.enabled !== undefined ? Boolean(audio.enabled) : Boolean(url),
        url,
        title: typeof audio.title === 'string' ? audio.title : '',
        description: typeof audio.description === 'string' ? audio.description : '',
        volume: Math.min(1, Math.max(0, toNumber(audio.volume, 1))),
        autoplay: Boolean(audio.autoplay),
        loop: Boolean(audio.loop),
        playbackRate: Math.min(2, Math.max(0.5, toNumber(audio.playbackRate, 1))),
      };
    })(),
    hover: {
      enabled: Boolean(hoverRaw.hien_thi_anh_thu_nho),
      showPolygon: raw.show_polygon_on_hover !== false,
      text: firstValue(hoverRaw.van_ban_huong_dan, hoverRaw.text),
      thumbnail: resolveAsset(firstValue(hoverRaw.duong_dan_thumbnail, hoverRaw.thumbnail)),
      hien_thi_anh_thu_nho: Boolean(hoverRaw.hien_thi_anh_thu_nho),
      van_ban_huong_dan: firstValue(hoverRaw.van_ban_huong_dan, hoverRaw.text),
      duong_dan_thumbnail: resolveAsset(firstValue(hoverRaw.duong_dan_thumbnail, hoverRaw.thumbnail)),
      raw: hoverRaw,
    },
    annotationStyle: Object.keys(style).length ? style : null,
    style: { glow: raw.glow ?? style.glow ?? true, ...style, icon: raw.icon || null },
    metadata: asObject(raw.metadata),
    locked: Boolean(raw.locked),
    raw,
  };
}

/** Builder adapter: preserve the persisted JSON shape while filling safe defaults. */
export function normalizeBuilderPoint(rawPoint = {}, options = {}) {
  const point = normalizePoint(rawPoint, options);
  const builderPoint = {
    ...point.raw,
    id: point.id,
    type: rawPoint.type || legacyTypeForPointKind(point.kind, rawPoint),
    pointKind: point.kind,
    lon: point.position.lon,
    lat: point.position.lat,
    label: point.label,
    target: point.targetSceneId,
    loai_poi: point.loaiPoi,
    icon: point.icon,
    ...(point.audio ? { audio: { ...point.audio } } : {}),
    entryView: point.entryView,
    ...(point.navStyle ? { navStyle: point.navStyle } : {}),
    ...(point.pinHeight != null ? { chieu_cao_duong_ghim: point.pinHeight } : {}),
    ...(point.raw.khi_dua_chuot_vao || point.raw.hover ? { khi_dua_chuot_vao: point.raw.khi_dua_chuot_vao || point.raw.hover } : {}),
  };
  // `normalizePoint` reads this legacy field for compatibility; Builder state
  // itself remains canonical so every subsequent save/export writes `audio`.
  delete builderPoint.audio_url;
  if (point.kind !== 'audio') delete builderPoint.audio;
  if (point.kind === 'area_landmark') {
    builderPoint.vertices = point.vertices;
    // Builder UI still displays the derived center in its legacy coordinate
    // columns; cleanHotspotForSave removes these derived fields on export.
    builderPoint.lon = point.anchor.lon;
    builderPoint.lat = point.anchor.lat;
    delete builderPoint.anchor;
    delete builderPoint.label_position;
    delete builderPoint.polygon;
    delete builderPoint.area_points;
  }
  return builderPoint;
}
