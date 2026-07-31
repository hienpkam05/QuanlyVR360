export function defaultNarration() {
  return { duong_dan_file_audio: "", tu_dong_phat: false, thoi_luong_giay: 0 };
}

export function defaultTransition() {
  return { enabled: true, rotation: true, effect: "fade", duration: 1200, speed: 10 };
}

export function defaultHoverState() {
  return { hien_thi_anh_thu_nho: false, duong_dan_thumbnail: "", van_ban_huong_dan: "" };
}

export const NAV_STYLES = {
  default: "default",
  previewExpand: "preview_expand",
};

export function normalizeNavStyle(navStyle) {
  if (navStyle === "arrow") return NAV_STYLES.default;
  return Object.values(NAV_STYLES).includes(navStyle)
    ? navStyle
    : NAV_STYLES.default;
}

export function normalizeHotspot(h) {
  return {
    lon: h.lon || 0,
    lat: h.lat || 0,
    label: h.label || "",
    target: h.target || "",
    type: h.type || "poi",
    ...(h.type === "nav" || h.loai_poi === "chuyen_canh"
      ? { navStyle: normalizeNavStyle(h.navStyle) }
      : {}),
    icon: h.icon || null,
    loai_poi: h.loai_poi || null,
    ...(h.chieu_cao_duong_ghim != null ? { chieu_cao_duong_ghim: h.chieu_cao_duong_ghim } : {}),
    ...(h.thong_tin_gioi_thieu ? { thong_tin_gioi_thieu: h.thong_tin_gioi_thieu } : {}),
    khi_dua_chuot_vao: {
      hien_thi_anh_thu_nho: h.khi_dua_chuot_vao?.hien_thi_anh_thu_nho || false,
      duong_dan_thumbnail: h.khi_dua_chuot_vao?.duong_dan_thumbnail || "",
      van_ban_huong_dan: h.khi_dua_chuot_vao?.van_ban_huong_dan || "",
    },
    entryView: h.entryView || null,
  };
}

export function normalizeScene(s, { generateId, resolveUrl } = {}) {
  const resolve = resolveUrl || ((u) => u || "");
  const genId = generateId || ((n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "scene");

  const rawImage =
    s.original_file ||
    s.image_url ||
    s.image ||
    s.panorama ||
    s.url ||
    s.preview_file ||
    s.optimized_file ||
    "";
  const rawThumb =
    s.thumbnail_file ||
    s.thumb_url ||
    s.thumb ||
    s.preview_file ||
    s.optimized_file ||
    rawImage;

  const img = resolve(rawImage);
  const th = resolve(rawThumb) || img;

  return {
    id: s.id || genId(s.name || "scene"),
    name: s.name || "Scene",
    group: s.group || "Mặc định",
    image: img,
    thumb: th,
    exportUrl: rawImage || "",
    _serverThumb: rawThumb || "",
    _file: null,
    _audioLocalUrl: "",
    _audioFileName: "",
    info: s.info || "",
    gps: s.gps || null,
    initialView: { lon: 0, lat: 0, fov: 75, ...(s.initialView || {}) },
    am_thanh_thuyet_minh: s.am_thanh_thuyet_minh
      ? { ...defaultNarration(), ...s.am_thanh_thuyet_minh }
      : defaultNarration(),
    transition: s.transition
      ? { ...defaultTransition(), ...s.transition }
      : defaultTransition(),
    hotspots: (s.hotspots || []).map(normalizeHotspot),
  };
}
