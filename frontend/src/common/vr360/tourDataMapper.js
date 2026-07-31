export function defaultNarration() {
  return { duong_dan_file_audio: "", tu_dong_phat: false, thoi_luong_giay: 0 };
}

export function defaultTransition() {
  return { enabled: true, rotation: true, effect: "fade", duration: 1200, speed: 10 };
}

export function defaultHoverState() {
  return { hien_thi_anh_thu_nho: false, duong_dan_thumbnail: "", van_ban_huong_dan: "" };
}

function normalizeHotspotContent(noiDung, resolve) {
  if (!noiDung) return null;
  const content = { ...noiDung };
  if (content.anh_minh_hoa) content.anh_minh_hoa = resolve(content.anh_minh_hoa);
  if (content.url_video) content.url_video = resolve(content.url_video);
  if (Array.isArray(content.danh_sach_anh)) {
    content.danh_sach_anh = content.danh_sach_anh.map((url) => resolve(url));
  }
  return content;
}

export function normalizeHotspot(h, { resolveUrl } = {}) {
  const resolve = resolveUrl || ((u) => u || "");
  return {
    id: h.id || "",
    lon: h.lon || 0,
    lat: h.lat || 0,
    x: h.x ?? 50,
    y: h.y ?? 50,
    label: h.label || "",
    target: h.target || "",
    type: h.type || "poi",
    icon: h.icon || null,
    loai_poi: h.loai_poi || null,
    locked: !!h.locked,
    ...(Array.isArray(h.area_points) ? { area_points: h.area_points } : {}),
    ...(h.noi_dung ? { noi_dung: normalizeHotspotContent(h.noi_dung, resolve) } : {}),
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
    hotspots: (s.hotspots || []).map((h) => normalizeHotspot(h, { resolveUrl: resolve })),
  };
}
