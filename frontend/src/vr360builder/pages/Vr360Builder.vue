<script setup>
import {
  reactive,
  ref,
  shallowRef,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { PreviewEngine, generateThumb } from "../common/PreviewEngine.js";
import { resizeImageFile } from "../common/imageResize.js";
import { readGpsFromFile } from "../common/exifGps.js";
import { DEFAULT_NAV_ICON } from "@/common/hotspotIcons.js";
import {
  normalizeScene,
  defaultNarration,
  defaultTransition,
  defaultHoverState,
  NAV_STYLES,
} from "@/common/vr360/tourDataMapper.js";
import { resolvePointKind } from "@/common/vr360/pointSchema.js";

import SceneEditor from "../components/scene/SceneEditor.vue";
import BaseAccordion from "../components/common/BaseAccordion.vue";
import PointList from "../components/point/PointList.vue";
import PointEditor from "../components/point/PointEditor.vue";
import { apiBaseURL, http } from "@/api/http.js";
import { createProject, listProjects } from "@/api/projectsApi.js";
import { createLocation, listProjectLocations } from "@/api/locationsApi.js";
import {
  createVersion,
  getVersion,
  listVersions,
  updateVersion,
  uploadHotspotAudio,
  uploadHotspotInfoImage,
  uploadHotspotInfoVideo,
} from "@/api/toursApi.js";
import { uploadSceneAsset } from "@/api/mediaApi.js";

// ══════════════════════════════════════
//  STATE
// ══════════════════════════════════════
const scenes = reactive([]);
const activeSceneIndex = ref(-1);
const selectedHotspotIndex = ref(-1);
const placingHotspot = ref(false);

const uiState = reactive({
  fileMenuOpen: false,
  leftCollapsed: false,
  rightCollapsed: false,
  rightView: "scene", // 'scene' | 'point-list' | 'point-editor'
  collapsed: {
    sceneProps: false,
    initialView: false,
    transition: true,
    narration: true,
    tourAudio: true,
  },
  hsAcc: { chung: true, audio: true, noiDung: true, navTarget: true, hover: false },
});

const activeScene = computed(() =>
  activeSceneIndex.value >= 0 ? scenes[activeSceneIndex.value] : null,
);
const selectedHotspot = computed(() =>
  activeScene.value && selectedHotspotIndex.value >= 0
    ? activeScene.value.hotspots[selectedHotspotIndex.value]
    : null,
);
const targetScene = computed(() => {
  if (!selectedHotspot.value?.target) return null;
  return scenes.find((s) => s.id === selectedHotspot.value.target) || null;
});

function projectAreaPoint(point) {
  if (!engine.value || !point) return null;
  const pos = engine.value.sphereToScreen(Number(point.lon), Number(point.lat));
  return pos ? { ...point, x: pos.x, y: pos.y } : null;
}

function areaPointsToSvg(points) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

const infoAreaOverlays = computed(() => {
  areaOverlayTick.value;
  if (!activeScene.value) return [];
  return activeScene.value.hotspots
    .filter((hotspot) => hotspot.type === "info_area")
    .map((hotspot) => {
      const rawPoints = Array.isArray(hotspot.area_points)
        ? hotspot.area_points
        : [];
      const points = rawPoints.map(projectAreaPoint).filter(Boolean);
      if (points.length < 3) return null;
      return {
        index: activeScene.value.hotspots.indexOf(hotspot),
        hotspot,
        points,
        svgPoints: areaPointsToSvg(points),
        selected: index === selectedHotspotIndex.value,
      };
    })
    .filter(Boolean);
});

const draftInfoAreaOverlay = computed(() => {
  areaOverlayTick.value;
  const points = infoAreaDraftPoints.value.map(projectAreaPoint).filter(Boolean);
  return {
    points,
    svgPoints: areaPointsToSvg(points),
  };
});

const previewMode = reactive({ active: false });

watch(selectedHotspotIndex, (v) => {
  if (v >= 0) {
    uiState.rightView = "point-editor";
    uiState.hsAcc.chung = true;
    uiState.hsAcc.noiDung = true;
    uiState.hsAcc.navTarget = true;
    uiState.hsAcc.hover = false;
    uiState.collapsed.sceneProps = true;
    uiState.collapsed.initialView = true;
    uiState.collapsed.transition = true;
    uiState.collapsed.narration = true;
  } else {
    uiState.rightView = "point-list";
  }
});

const canvasRef = ref(null);
const fileInputRef = ref(null);
const replaceImageInputRef = ref(null);
const audioInputRef = ref(null);
const tourAudioInputRef = ref(null);
const hotspotAudioInputRef = ref(null);

function audioDebug(...args) {
  if (import.meta.env?.DEV) console.debug('[Audio Builder]', ...args);
}
const engine = shallowRef(null);

const tourAudio = reactive({
  enabled: false,
  file: "",
  volume: 1,
  language: "",
  loop: false,
  autoplay: false,
  description: "",
  _file: null,
  _localUrl: "",
  _fileName: "",
  _uploadState: "idle",
  _uploadError: "",
});

const tourAudioPreviewSrc = computed(
  () => tourAudio._localUrl || tourAudio.file || "",
);

function isAudioFile(file) {
  return Boolean(file?.type?.startsWith("audio/"));
}

function resetTourAudio(audio = null, file = "") {
  if (tourAudio._localUrl?.startsWith("blob:")) {
    URL.revokeObjectURL(tourAudio._localUrl);
  }
  Object.assign(tourAudio, {
    enabled: false,
    file: file || "",
    volume: 1,
    language: "",
    loop: false,
    autoplay: false,
    description: "",
    _file: null,
    _localUrl: "",
    _fileName: "",
    _uploadState: "idle",
    _uploadError: "",
    ...(audio || {}),
  });
}

function pickTourAudioFile() {
  tourAudioInputRef.value?.click();
}

function handleTourAudioFile(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  if (!isAudioFile(file)) {
    showToast("error", "❌ Chỉ chấp nhận tệp âm thanh");
    return;
  }
  if (tourAudio._localUrl?.startsWith("blob:")) {
    URL.revokeObjectURL(tourAudio._localUrl);
  }
  tourAudio._file = file;
  tourAudio._localUrl = URL.createObjectURL(file);
  tourAudio._fileName = file.name;
  tourAudio._uploadState = "pending";
  tourAudio._uploadError = "";
  tourAudio.enabled = true;
}

function clearTourAudio() {
  resetTourAudio();
  showToast("info", "↺ Đã xoá cấu hình Tour Audio");
}

function triggerCanvasResize() {
  setTimeout(() => engine.value?._onResize?.(), 210);
}
watch(() => uiState.leftCollapsed, triggerCanvasResize);
watch(() => uiState.rightCollapsed, triggerCanvasResize);

const canvasLoading = ref(false);
const hud = reactive({ lon: "0.0", lat: "0.0", fov: "75" });
const addAreaDragover = ref(false);
const draggingIndex = ref(-1);
const dragOverIndex = ref(-1);
const drawingInfoArea = ref(false);
const infoAreaDraftPoints = ref([]);
const areaOverlayTick = ref(0);
let areaOverlayRaf = 0;

const RESIZE_PRESETS = [
  {
    id: "original",
    label: "Original — giữ nguyên độ phân giải, tối ưu JPEG (lưu trữ/biên tập)",
    maxWidth: 999999,
    quality: 0.95,
  },
  {
    id: "preview",
    label: "Preview — 4096px, nhẹ (xem nhanh)",
    maxWidth: 4096,
    quality: 0.85,
  },
  {
    id: "standard",
    label: "Standard — 8192px (khuyến nghị)",
    maxWidth: 8192,
    quality: 0.92,
  },
  {
    id: "hq",
    label: "High Quality — 12000px, panorama nét cao",
    maxWidth: 12000,
    quality: 0.95,
  },
  {
    id: "lossless",
    label: "Lossless — không resize, giữ nguyên file gốc (chuyên nghiệp)",
    maxWidth: 0,
    quality: 0.95,
  },
];
const resizePresetId = ref("standard");
const resizeSettings = reactive({ maxWidth: 8192, quality: 0.92 });
function applyResizePreset() {
  const p =
    RESIZE_PRESETS.find((x) => x.id === resizePresetId.value) ||
    RESIZE_PRESETS.find((x) => x.id === "standard");
  resizeSettings.maxWidth = p.maxWidth;
  resizeSettings.quality = p.quality;
}
const resizingCount = ref(0);

const modals = reactive({
  export: false,
  import: false,
  api: false,
  load: false,
  hotspotType: false,
  quickCreate: false,
});
const pendingPlacement = reactive({ lon: 0, lat: 0 });
const quickMenu = reactive({ show: false, x: 0, y: 0, lon: 0, lat: 0 });
const exportJsonText = ref("");
const importJsonText = ref("");

const toastState = reactive({ show: false, type: "info", msg: "" });
let toastTimer = null;
function showToast(type, msg) {
  toastState.type = type;
  toastState.msg = msg;
  toastState.show = true;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastState.show = false;
  }, 3000);
}

// ══════════════════════════════════════
//  SCENE MANAGEMENT
// ══════════════════════════════════════
function generateId(name) {
  return (
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "") || "scene_" + Date.now()
  );
}

function generateHotspotId(prefix = "hotspot") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

function ensureHotspotId(hotspot) {
  if (!hotspot.id) hotspot.id = generateHotspotId("hs");
  return hotspot.id;
}

function requestAreaOverlayUpdate() {
  if (areaOverlayRaf) return;
  areaOverlayRaf = requestAnimationFrame(() => {
    areaOverlayTick.value++;
    areaOverlayRaf = 0;
  });
}

async function processIncomingFile(file) {
  if (!resizeSettings.maxWidth)
    return {
      file,
      originalSize: file.size,
      resizedSize: file.size,
      resized: false,
    };
  resizingCount.value++;
  try {
    return await resizeImageFile(file, resizeSettings);
  } catch (e) {
    console.error("resizeImageFile error:", e);
    return {
      file,
      originalSize: file.size,
      resizedSize: file.size,
      resized: false,
    };
  } finally {
    resizingCount.value--;
  }
}

async function addScene(file) {
  const [gps, { file: procFile, originalSize, resizedSize, resized }] =
    await Promise.all([readGpsFromFile(file), processIncomingFile(file)]);
  const localUrl = URL.createObjectURL(procFile);
  const rawName = file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
  const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const scene = {
    id: generateId(name) + "_" + scenes.length,
    name,
    group: "Mặc định",
    image: localUrl,
    thumb: localUrl,
    info: "",
    initialView: { lon: 0, lat: 0, fov: 75 },
    hotspots: [],
    am_thanh_thuyet_minh: defaultNarration(),
    transition: defaultTransition(),
    gps,
    _file: procFile,
    _audioLocalUrl: "",
    _audioFileName: "",
    _originalSize: originalSize,
    _resizedSize: resizedSize,
    _resized: resized,
    exportUrl: "",
    _serverThumb: "",
  };
  scenes.push(scene);
  if (scenes.length === 1) selectScene(0);
  generateThumb(procFile).then((t) => {
    scene.thumb = t;
  });
}

function removeScene(index) {
  if (!confirm(`Xóa scene "${scenes[index].name}"?`)) return;
  previewMode.active = false;
  const rem = scenes.splice(index, 1)[0];
  if (rem.image?.startsWith("blob:")) URL.revokeObjectURL(rem.image);
  if (rem._audioLocalUrl?.startsWith("blob:")) URL.revokeObjectURL(rem._audioLocalUrl);
  if (activeSceneIndex.value === index) {
    activeSceneIndex.value = -1;
    selectedHotspotIndex.value = -1;
    if (scenes.length > 0) selectScene(Math.min(index, scenes.length - 1));
  } else if (activeSceneIndex.value > index) {
    activeSceneIndex.value--;
  }
}

async function selectScene(index) {
  if (index < 0 || index >= scenes.length) return;
  previewMode.active = false;
  activeSceneIndex.value = index;
  selectedHotspotIndex.value = -1;
  cancelPlacingHotspot();
  const s = scenes[index];
  await engine.value.loadPanorama(s.image, s._file);
  engine.value.setView(s.initialView.lon, s.initialView.lat, s.initialView.fov);
  engine.value.setHotspots(s.hotspots, -1);
}

function onDragStart(index) {
  draggingIndex.value = index;
}
function onDragEnd() {
  draggingIndex.value = -1;
  dragOverIndex.value = -1;
}
function onDrop(toIndex, event) {
  dragOverIndex.value = -1;
  const files = event?.dataTransfer?.files;
  if (files && files.length > 0) {
    const f = Array.from(files).find((f) => f.type.startsWith("image/"));
    if (f) replaceSceneImage(toIndex, f);
    draggingIndex.value = -1;
    return;
  }
  const from = draggingIndex.value;
  const to = toIndex;
  if (from < 0 || from === to) return;
  const [moved] = scenes.splice(from, 1);
  scenes.splice(to, 0, moved);
  if (activeSceneIndex.value === from) activeSceneIndex.value = to;
  else if (from < activeSceneIndex.value && to >= activeSceneIndex.value)
    activeSceneIndex.value--;
  else if (from > activeSceneIndex.value && to <= activeSceneIndex.value)
    activeSceneIndex.value++;
}

// ══════════════════════════════════════
//  HOTSPOT PLACEMENT
// ══════════════════════════════════════
function startPlacingHotspot() {
  if (activeSceneIndex.value < 0 || previewMode.active) return;
  placingHotspot.value = true;
  if (engine.value) engine.value.placingHotspot = true;
  showToast("info", "🎯 Click vào panorama để đặt hotspot");
}
function cancelPlacingHotspot() {
  placingHotspot.value = false;
  if (engine.value) engine.value.placingHotspot = false;
  closeQuickMenu();
}
function placeNewHotspot(lon, lat) {
  if (activeSceneIndex.value < 0 || previewMode.active) return;
  if (drawingInfoArea.value) {
    addInfoAreaPoint(lon, lat);
    return;
  }
  pendingPlacement.lon = lon;
  pendingPlacement.lat = lat;
  cancelPlacingHotspot();
  modals.hotspotType = true;
}

function startDrawingInfoArea(seedLon = null, seedLat = null) {
  if (activeSceneIndex.value < 0 || previewMode.active) return;
  infoAreaDraftPoints.value = [];
  if (Number.isFinite(Number(seedLon)) && Number.isFinite(Number(seedLat))) {
    infoAreaDraftPoints.value.push({
      lon: Number(seedLon),
      lat: Number(seedLat),
    });
  }
  drawingInfoArea.value = true;
  placingHotspot.value = true;
  if (engine.value) engine.value.placingHotspot = true;
  closeQuickMenu();
  requestAreaOverlayUpdate();
  showToast(
    "info",
    "Click các đỉnh Area Landmark, tối thiểu 3 điểm rồi bấm Hoàn tất vùng.",
  );
}

function startDrawingInfoAreaFromModal() {
  modals.hotspotType = false;
  startDrawingInfoArea(pendingPlacement.lon, pendingPlacement.lat);
}

function addInfoAreaPoint(lon, lat) {
  infoAreaDraftPoints.value.push({ lon: Number(lon), lat: Number(lat) });
  requestAreaOverlayUpdate();
}

function undoInfoAreaPoint() {
  infoAreaDraftPoints.value.pop();
  requestAreaOverlayUpdate();
}

function cancelInfoAreaDrawing() {
  drawingInfoArea.value = false;
  infoAreaDraftPoints.value = [];
  cancelPlacingHotspot();
  requestAreaOverlayUpdate();
}

function finishInfoAreaDrawing() {
  if (activeSceneIndex.value < 0) return;
  if (infoAreaDraftPoints.value.length < 3) {
    showToast("error", "Vùng thông tin cần tối thiểu 3 điểm.");
    return;
  }
  const hs = scenes[activeSceneIndex.value].hotspots;
  const points = infoAreaDraftPoints.value.map((point) => ({
    lon: Math.round(Number(point.lon) * 10) / 10,
    lat: Math.round(Number(point.lat) * 10) / 10,
  }));
  const newHs = {
    id: generateHotspotId("area_landmark"),
    vertices: points,
    label: "Khu vực " + (hs.length + 1),
    target: "",
    type: "area_landmark",
    icon: null,
    loai_poi: "ghim_dia_danh",
    line_height: 48,
    show_polygon_on_hover: true,
    style: { fill: "#fbbf24", hoverFill: "rgba(251, 191, 36, 0.32)", border: "#fbbf24", hoverBorder: "#fde68a", line: "#ffffff", opacity: 0.3, borderWidth: 2 },
    metadata: {},
    locked: false,
    khi_dua_chuot_vao: defaultHoverState(),
    entryView: null,
    noi_dung: null,
  };
  hs.push(newHs);
  selectedHotspotIndex.value = hs.length - 1;
  drawingInfoArea.value = false;
  infoAreaDraftPoints.value = [];
  cancelPlacingHotspot();
  syncHotspotsToEngine();
  requestAreaOverlayUpdate();
  showToast("success", "Đã tạo Area Landmark. Bạn có thể cấu hình nhãn, đích và style bên phải.");
}

function defaultNoiDung(loai_poi) {
  switch (loai_poi) {
    case "thong_tin_van_ban":
      return { tieu_de: "", mo_ta: "", anh_minh_hoa: "", lien_ket: "" };
    case "phat_video":
      return { url_video: "", tieu_de: "", tu_dong_phat: false };
    case "thu_vien_anh":
      return { tieu_de: "", danh_sach_anh: [] };
    default:
      return null;
  }
}

function confirmHotspotType(loai_poi) {
  if (activeSceneIndex.value < 0) return;
  if (loai_poi === "ghim_dia_danh") {
    modals.hotspotType = false;
    startDrawingInfoArea(pendingPlacement.lon, pendingPlacement.lat);
    return;
  }
  const hs = scenes[activeSceneIndex.value].hotspots;
  const isNav = loai_poi === "chuyen_canh";
  const isAudio = loai_poi === "audio";
  const newHs = {
    id: generateHotspotId("hs"),
    lon: pendingPlacement.lon,
    lat: pendingPlacement.lat,
    label: isNav ? "Lối đi " + (hs.length + 1) : "Hotspot " + (hs.length + 1),
    target: "",
    type: isNav ? "nav" : isAudio ? "audio" : "poi",
    ...(isNav ? { navStyle: NAV_STYLES.default } : {}),
    icon: isNav ? DEFAULT_NAV_ICON : null,
    ...(isAudio ? {} : { loai_poi: loai_poi || null }),
    ...(isAudio ? { radius: 0, audio: { enabled: false, url: "", title: "", description: "", volume: 1, autoplay: false, loop: false, playbackRate: 1 } } : {}),
    locked: false,
    khi_dua_chuot_vao: defaultHoverState(),
    entryView: null,
  };
  const nd = defaultNoiDung(loai_poi);
  if (nd) newHs.noi_dung = nd;
  hs.push(newHs);
  selectedHotspotIndex.value = hs.length - 1;
  modals.hotspotType = false;
  syncHotspotsToEngine();
  showToast(
    "success",
    `✅ Đã tạo hotspot tại lon:${pendingPlacement.lon.toFixed(
      1,
    )}, lat:${pendingPlacement.lat.toFixed(1)}`,
  );
}

function openQuickMenu(lon, lat, screenX, screenY) {
  if (activeSceneIndex.value < 0 || previewMode.active) return;
  const canvasEl = canvasRef.value;
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  quickMenu.lon = lon;
  quickMenu.lat = lat;
  const menuW = 164;
  const menuH = 110;
  quickMenu.x = Math.min(screenX - rect.left, rect.width - menuW);
  quickMenu.y = Math.min(screenY - rect.top, rect.height - menuH);
  quickMenu.show = true;
}
function closeQuickMenu() {
  quickMenu.show = false;
}

function quickCreateHotspot(loai_poi) {
  if (activeSceneIndex.value < 0) return;
  if (loai_poi === "thong_tin_van_ban") {
    startDrawingInfoArea(quickMenu.lon, quickMenu.lat);
    return;
  }
  const hs = scenes[activeSceneIndex.value].hotspots;
  const isNav = loai_poi === "chuyen_canh";
  const newHs = {
    id: generateHotspotId("hs"),
    lon: quickMenu.lon,
    lat: quickMenu.lat,
    label: isNav ? "Lối đi " + (hs.length + 1) : "Hotspot " + (hs.length + 1),
    target: "",
    type: isNav ? "nav" : "poi",
    ...(isNav ? { navStyle: NAV_STYLES.default } : {}),
    icon: isNav ? DEFAULT_NAV_ICON : null,
    loai_poi: loai_poi || null,
    locked: false,
    khi_dua_chuot_vao: defaultHoverState(),
    entryView: null,
  };
  const nd = defaultNoiDung(loai_poi);
  if (nd) newHs.noi_dung = nd;
  if (loai_poi === "ghim_dia_danh") { startDrawingInfoArea(quickMenu.lon, quickMenu.lat); return; }
  hs.push(newHs);
  selectedHotspotIndex.value = hs.length - 1;
  closeQuickMenu();
  syncHotspotsToEngine();
  showToast(
    "success",
    isNav
      ? "✅ Đã đặt điểm chỉ đường — chọn scene đích bên phải"
      : "✅ Đã tạo điểm POI",
  );
}

function selectHotspot(i) {
  if (selectedHotspotIndex.value === i) {
    selectedHotspotIndex.value = -1;
    uiState.rightView = "point-list";
  } else {
    selectedHotspotIndex.value = i;
  }
  syncHotspotsToEngine();
  requestAreaOverlayUpdate();
}

function toggleLockHotspot(i) {
  if (activeSceneIndex.value < 0) return;
  const hs = scenes[activeSceneIndex.value].hotspots[i];
  if (!hs) return;
  hs.locked = !hs.locked;
  syncHotspotsToEngine();
  showToast(
    "info",
    hs.locked ? "🔒 Đã khóa vị trí hotspot" : "🔓 Đã mở khóa hotspot",
  );
}

function syncHotspotsToEngine() {
  if (!engine.value || activeSceneIndex.value < 0) return;
  scenes[activeSceneIndex.value].hotspots.forEach(ensureHotspotId);
  engine.value.setHotspots(
    scenes[activeSceneIndex.value].hotspots,
    selectedHotspotIndex.value,
  );
  requestAreaOverlayUpdate();
}

async function goToHotspotTarget(i) {
  if (activeSceneIndex.value < 0 || previewMode.active) return;
  const hs = scenes[activeSceneIndex.value].hotspots[i];
  if (!hs?.target) {
    showToast("info", "⚠ Hotspot chưa gán scene đích");
    return;
  }
  const idx = scenes.findIndex((s) => s.id === hs.target);
  if (idx < 0) {
    showToast("error", "❌ Không tìm thấy scene đích");
    return;
  }
  await selectScene(idx);
  if (hs.entryView)
    engine.value.setView(hs.entryView.lon, hs.entryView.lat, hs.entryView.fov);
}

function removeHotspot(i) {
  if (activeSceneIndex.value < 0) return;
  scenes[activeSceneIndex.value].hotspots.splice(i, 1);
  if (selectedHotspotIndex.value === i) selectedHotspotIndex.value = -1;
  else if (selectedHotspotIndex.value > i) selectedHotspotIndex.value--;
  syncHotspotsToEngine();
  requestAreaOverlayUpdate();
}

function duplicateHotspot(i) {
  if (activeSceneIndex.value < 0) return;
  const hs = scenes[activeSceneIndex.value].hotspots;
  if (i < 0 || i >= hs.length) return;
  const src = hs[i];
  const clone = {
    ...JSON.parse(JSON.stringify(src)),
    id: generateHotspotId("hs"),
    lon: src.lon + 2,
    lat: src.lat + 1,
    label: (src.label || "Hotspot") + " (copy)",
  };
  hs.splice(i + 1, 0, clone);
  selectedHotspotIndex.value = i + 1;
  syncHotspotsToEngine();
  showToast("info", "✅ Đã nhân bản hotspot");
}

function updateHotspot(key, value) {
  if (activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0) return;
  const hs =
    scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
  if (key === "audio_url") {
    updateHotspotAudio({ url: value || "" });
    delete hs.audio_url;
    return;
  }
  if (key.startsWith("audio.")) {
    updateHotspotAudio({ [key.slice("audio.".length)]: value });
    syncHotspotsToEngine();
    return;
  }
  hs[key] = value;
  if (key === "type" && value === "nav" && !hs.icon) hs.icon = DEFAULT_NAV_ICON;
  if (key === "loai_poi") {
    hs.type =
      value === "chuyen_canh"
        ? "nav"
        : value === "ghim_dia_danh" && hs.type === "area_landmark"
          ? "area_landmark"
        : (value === "thong_tin_van_ban" && Array.isArray(hs.area_points))
          ? "info_area"
          : "poi";
    if (hs.type === "nav" && !hs.icon) hs.icon = DEFAULT_NAV_ICON;
    const nd = defaultNoiDung(value);
    hs.noi_dung = nd || null;
    if (value === "ghim_dia_danh" && hs.type !== "area_landmark" && !hs.chieu_cao_duong_ghim)
      hs.chieu_cao_duong_ghim = 54;
  }
  syncHotspotsToEngine();
  requestAreaOverlayUpdate();
}

function canonicalHotspotAudio(audio = {}, patch = {}) {
  const url = patch.url ?? audio.url ?? "";
  const volume = Number(patch.volume ?? audio.volume ?? 1);
  const hasUrlPatch = Object.prototype.hasOwnProperty.call(patch, "url");
  return {
    enabled: patch.enabled ?? (hasUrlPatch ? Boolean(url) : (audio.enabled !== undefined ? Boolean(audio.enabled) : Boolean(url))),
    url,
    title: patch.title ?? audio.title ?? "",
    description: patch.description ?? audio.description ?? "",
    volume: Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : 1,
    autoplay: patch.autoplay ?? Boolean(audio.autoplay),
    loop: patch.loop ?? Boolean(audio.loop),
    playbackRate: patch.playbackRate ?? Math.min(2, Math.max(0.5, Number(audio.playbackRate) || 1)),
  };
}

function updateHotspotAudio(patch) {
  if (activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0) return;
  const hotspot = scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
  hotspot.audio = canonicalHotspotAudio(hotspot.audio, {
    ...patch,
    ...(Object.prototype.hasOwnProperty.call(patch, "url") && !Object.prototype.hasOwnProperty.call(patch, "enabled")
      ? { enabled: Boolean(patch.url) }
      : {}),
  });
  audioDebug('Update Audio POI', hotspot.id, Object.keys(patch));
  delete hotspot.audio_url;
  syncHotspotsToEngine();
}

function updateHotspotHover(key, value) {
  if (activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0) return;
  const hs =
    scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
  if (!hs.khi_dua_chuot_vao) hs.khi_dua_chuot_vao = defaultHoverState();
  hs.khi_dua_chuot_vao[key] = value;
}

function updateHotspotContent(key, value) {
  if (activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0) return;
  const hs =
    scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
  if (!hs.noi_dung) hs.noi_dung = {};
  hs.noi_dung[key] = value;
}

function pickHotspotAudio() {
  if (activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0) return;
  hotspotAudioInputRef.value?.click();
}

function handleHotspotAudioFile(event) {
  const file = event.target.files?.[0];
  event.target.value = '';
  if (!file || activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0) return;
  if (!isAudioFile(file)) {
    const hotspot = scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
    hotspot._audioUploadError = 'Định dạng không được hỗ trợ. Hãy chọn tệp âm thanh hợp lệ.';
    showToast('error', '❌ Chỉ chấp nhận tệp âm thanh');
    return;
  }
  const hotspot = scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
  ensureHotspotId(hotspot);
  if (hotspot._audioLocalUrl?.startsWith('blob:')) URL.revokeObjectURL(hotspot._audioLocalUrl);
  hotspot._audioFile = file;
  delete hotspot._audioUploadError;
  hotspot._audioLocalUrl = URL.createObjectURL(file);
  hotspot._audioFileName = file.name;
  hotspot.audio = canonicalHotspotAudio(hotspot.audio, {
    url: hotspot.audio?.url || hotspot.audio_url || "",
    enabled: true,
  });
  audioDebug('Upload Audio POI', hotspot.id, file.name);
  delete hotspot.audio_url;
  syncHotspotsToEngine();
  showToast('info', '🎧 Audio điểm nóng sẽ được upload khi lưu tour.');
}

function clearHotspotAudio() {
  if (activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0) return;
  const hotspot = scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
  if (hotspot._audioLocalUrl?.startsWith('blob:')) URL.revokeObjectURL(hotspot._audioLocalUrl);
  delete hotspot._audioFile;
  delete hotspot._audioLocalUrl;
  delete hotspot._audioFileName;
  delete hotspot._audioUploadError;
  hotspot.audio = canonicalHotspotAudio(hotspot.audio, { url: "", enabled: false });
  delete hotspot.audio_url;
  syncHotspotsToEngine();
  showToast('info', '↺ Đã xóa Audio điểm nóng.');
}

function handleHotspotInfoImageFile(file) {
  if (activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0 || !file)
    return;
  if (!file.type?.startsWith("image/")) {
    showToast("error", "Vui lòng chọn file ảnh.");
    return;
  }
  const hs =
    scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
  ensureHotspotId(hs);
  if (hs._infoImagePreview?.startsWith("blob:")) {
    URL.revokeObjectURL(hs._infoImagePreview);
  }
  const localUrl = URL.createObjectURL(file);
  hs._infoImageFile = file;
  hs._infoImagePreview = localUrl;
  hs._infoImageName = file.name;
  if (!hs.noi_dung) hs.noi_dung = defaultNoiDung("thong_tin_van_ban");
  hs.noi_dung.anh_minh_hoa = localUrl;
  showToast("info", "Ảnh thông tin sẽ được upload khi Save Tour.");
}

function handleGalleryImageFiles(files) {
  if (activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0) return;
  const validFiles = Array.from(files || []).filter((file) =>
    file.type?.startsWith("image/"),
  );
  if (!validFiles.length) {
    showToast("error", "Vui lòng chọn file ảnh.");
    return;
  }

  const hs =
    scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
  ensureHotspotId(hs);
  if (!hs.noi_dung) hs.noi_dung = defaultNoiDung("thu_vien_anh");
  if (!Array.isArray(hs.noi_dung.danh_sach_anh)) {
    hs.noi_dung.danh_sach_anh = [];
  }
  if (!Array.isArray(hs._galleryImageFiles)) {
    hs._galleryImageFiles = [];
  }

  validFiles.forEach((file) => {
    const previewUrl = URL.createObjectURL(file);
    hs._galleryImageFiles.push({ file, previewUrl, name: file.name });
    hs.noi_dung.danh_sach_anh.push(previewUrl);
  });

  showToast(
    "info",
    `${validFiles.length} ảnh thư viện sẽ được upload khi Save Tour.`,
  );
}

function handleHotspotVideoFile(file) {
  if (activeSceneIndex.value < 0 || selectedHotspotIndex.value < 0 || !file)
    return;
  if (!file.type?.startsWith("video/")) {
    showToast("error", "Vui lòng chọn file video.");
    return;
  }

  const hs =
    scenes[activeSceneIndex.value].hotspots[selectedHotspotIndex.value];
  ensureHotspotId(hs);
  if (hs._videoPreview?.startsWith("blob:")) {
    URL.revokeObjectURL(hs._videoPreview);
  }
  const localUrl = URL.createObjectURL(file);
  hs._videoFile = file;
  hs._videoPreview = localUrl;
  hs._videoName = file.name;
  if (!hs.noi_dung) hs.noi_dung = defaultNoiDung("phat_video");
  hs.noi_dung.url_video = localUrl;
  showToast("info", "Video sẽ được upload khi Save Tour.");
}

// Navigate right panel
function navToPointList() {
  selectedHotspotIndex.value = -1;
  uiState.rightView = "point-list";
  syncHotspotsToEngine();
}
function navToScene() {
  selectedHotspotIndex.value = -1;
  uiState.rightView = "scene";
  syncHotspotsToEngine();
}
function navToPointDetail(i) {
  selectedHotspotIndex.value = i;
  syncHotspotsToEngine();
}

// ══════════════════════════════════════
//  XEM TRƯỚC SCENE ĐÍCH & ĐẶT GÓC NHÌN KHI ĐẾN
// ══════════════════════════════════════
async function previewTargetScene() {
  if (
    !targetScene.value ||
    activeSceneIndex.value < 0 ||
    selectedHotspotIndex.value < 0
  )
    return;
  previewMode.active = true;
  cancelPlacingHotspot();
  const t = targetScene.value;
  await engine.value.loadPanorama(t.image, t._file);
  const v = selectedHotspot.value.entryView || t.initialView;
  engine.value.setView(v.lon, v.lat, v.fov);
  engine.value.setHotspots(t.hotspots, -1);
}
async function returnFromPreview() {
  const s = activeScene.value;
  previewMode.active = false;
  if (!s) return;
  await engine.value.loadPanorama(s.image, s._file);
  engine.value.setView(s.initialView.lon, s.initialView.lat, s.initialView.fov);
  engine.value.setHotspots(s.hotspots, selectedHotspotIndex.value);
}
async function saveEntryView() {
  if (!selectedHotspot.value) return;
  selectedHotspot.value.entryView = engine.value.getView();
  await returnFromPreview();
  showToast("success", "✅ Đã lưu góc nhìn khi đến scene này");
}
function clearEntryView() {
  if (!selectedHotspot.value) return;
  selectedHotspot.value.entryView = null;
  showToast("info", "↺ Dùng lại góc nhìn mặc định của scene đích");
}

// ══════════════════════════════════════
//  PROPERTY PANEL ACTIONS
// ══════════════════════════════════════
function updateScene(key, value) {
  if (activeSceneIndex.value < 0) return;
  const s = scenes[activeSceneIndex.value];
  if (key === "imageUrl") s.exportUrl = value;
  else s[key] = value;
}
function updateView(key, value) {
  if (activeSceneIndex.value < 0) return;
  const iv = scenes[activeSceneIndex.value].initialView;
  iv[key] = value;
  engine.value.setView(iv.lon, iv.lat, iv.fov);
}
function saveCurrentView() {
  if (activeSceneIndex.value < 0) return;
  const v = engine.value.getView();
  scenes[activeSceneIndex.value].initialView = v;
  showToast("success", `✅ lon=${v.lon}° lat=${v.lat}° fov=${v.fov}°`);
}
function replaceImage() {
  if (activeSceneIndex.value < 0) return;
  replaceImageInputRef.value?.click();
}
async function replaceSceneImage(index, file) {
  if (
    !file ||
    !file.type.startsWith("image/") ||
    index < 0 ||
    index >= scenes.length
  )
    return;
  const [gps, { file: procFile, originalSize, resizedSize, resized }] =
    await Promise.all([readGpsFromFile(file), processIncomingFile(file)]);
  const url = URL.createObjectURL(procFile);
  const s = scenes[index];
  if (s.image?.startsWith("blob:")) URL.revokeObjectURL(s.image);
  s.image = url;
  s.thumb = url;
  s._file = procFile;
  s._originalSize = originalSize;
  s._resizedSize = resizedSize;
  s._resized = resized;
  s.gps = gps;
  s.exportUrl = "";
  s._serverThumb = "";
  s.original_file = "";
  s.optimized_file = "";
  s.preview_file = "";
  s.thumbnail_file = "";
  generateThumb(procFile).then((t) => {
    s.thumb = t;
  });
  if (index === activeSceneIndex.value)
    await engine.value.loadPanorama(url, procFile);
  showToast("info", `✅ Đã thay ảnh "${s.name}"`);
}
const handleReplaceImage = async (ev) => {
  const f = ev.target.files?.[0];
  if (activeSceneIndex.value < 0) return;
  await replaceSceneImage(activeSceneIndex.value, f);
  ev.target.value = "";
};

// ══════════════════════════════════════
//  THUYẾT MINH (am_thanh_thuyet_minh)
// ══════════════════════════════════════
function ensureTransition(s) {
  if (!s.transition) s.transition = defaultTransition();
  return s.transition;
}
function ensureNarration(s) {
  if (!s.am_thanh_thuyet_minh) s.am_thanh_thuyet_minh = defaultNarration();
  return s.am_thanh_thuyet_minh;
}
const audioPreviewSrc = computed(() => {
  const s = activeScene.value;
  if (!s) return "";
  return s._audioLocalUrl || s.am_thanh_thuyet_minh?.duong_dan_file_audio || "";
});
function updateNarration(key, value) {
  if (activeSceneIndex.value < 0) return;
  ensureNarration(scenes[activeSceneIndex.value])[key] = value;
}
function pickAudioFile() {
  if (activeSceneIndex.value < 0) return;
  audioInputRef.value?.click();
}
const handleAudioFile = (ev) => {
  const f = ev.target.files?.[0];
  ev.target.value = "";
  if (!f || activeSceneIndex.value < 0) return;
  if (!isAudioFile(f)) {
    showToast("error", "❌ Chỉ chấp nhận tệp âm thanh");
    return;
  }
  const s = scenes[activeSceneIndex.value];
  ensureNarration(s);
  if (s._audioLocalUrl) URL.revokeObjectURL(s._audioLocalUrl);
  s._audioLocalUrl = URL.createObjectURL(f);
  s._audioFile = f;
  s._audioFileName = f.name;
  s._audioUploadState = "pending";
  s._audioUploadError = "";
  ensureNarration(s).enabled = true;
  readAudioDuration(s._audioLocalUrl, s);
  showToast(
    "info",
    "🎧 Đã nạp để nghe thử. Scene Audio cần endpoint upload backend trước khi có thể lưu.",
  );
};
function readAudioDuration(src, s) {
  const a = new Audio();
  a.preload = "metadata";
  a.src = src;
  a.addEventListener(
    "loadedmetadata",
    () => {
      if (isFinite(a.duration))
        s.am_thanh_thuyet_minh.thoi_luong_giay = Math.round(a.duration);
    },
    { once: true },
  );
}
function clearNarration() {
  if (activeSceneIndex.value < 0) return;
  const s = scenes[activeSceneIndex.value];
  if (s._audioLocalUrl) {
    URL.revokeObjectURL(s._audioLocalUrl);
    s._audioLocalUrl = "";
  }
  s._audioFileName = "";
  delete s._audioFile;
  delete s._audioUploadState;
  delete s._audioUploadError;
  s.am_thanh_thuyet_minh = defaultNarration();
  showToast("info", "↺ Đã xoá thuyết minh của scene");
}
function updateTransition(key, value) {
  if (activeSceneIndex.value < 0) return;
  ensureTransition(scenes[activeSceneIndex.value])[key] = value;
}

// ══════════════════════════════════════
//  FILE HANDLING
// ══════════════════════════════════════
function addSceneFromFiles() {
  fileInputRef.value.click();
}
async function addScenesInOrder(files) {
  for (const f of files) {
    if (f.type.startsWith("image/")) await addScene(f);
  }
}
function handleFileInput(e) {
  addScenesInOrder(Array.from(e.target.files));
  e.target.value = "";
}
function onAddAreaDrop(e) {
  addAreaDragover.value = false;
  addScenesInOrder(Array.from(e.dataTransfer.files));
}

// ══════════════════════════════════════
//  API
// ══════════════════════════════════════
const api = reactive({ baseUrl: apiBaseURL, connected: false, currentTourId: null });
const backendContext = reactive({ projectId: "", locationId: "", versionId: "" });
const apiStatus = ref("off");
const apiUrlInput = ref("");
const apiTestBtnLoading = ref(false);
const apiTestResult = reactive({ show: false, ok: false, msg: "" });
const loadModalLoading = ref(false);
const loadModalTours = ref([]);
const projects = ref([]);
const locations = ref([]);
const versions = ref([]);
const quickLocations = ref([]);
const quickVersions = ref([]);
const optionsLoading = ref(false);
const quickCreateLoading = ref(false);
const quickCreateForm = reactive({
  modeProject: "existing",
  modeLocation: "existing",
  modeVersion: "new",
  projectId: "",
  projectName: "",
  projectDescription: "",
  locationId: "",
  locationName: "",
  locationDescription: "",
  latitude: "",
  longitude: "",
  versionId: "",
  sourceVersionId: "",
  versionLabel: "",
});

const currentVersionLabel = computed(() => {
  const item = versions.value.find((v) => String(v.id) === String(backendContext.versionId));
  if (!item) return "";
  return `v${item.version_number} - ${item.status}`;
});

function apiUrl(p) {
  if (!p) return "";
  if (/^(blob:|data:|https?:\/\/)/i.test(p)) return p;
  const path = p.startsWith("/") ? p : `/${p}`;
  return `${api.baseUrl}${path}`;
}
function normalizeApiList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}
function readBuilderParams() {
  const params = new URLSearchParams(window.location.search);
  backendContext.projectId =
    params.get("project") || localStorage.getItem("vr360_builder_project_id") || "";
  backendContext.locationId =
    params.get("location") || localStorage.getItem("vr360_builder_location_id") || "";
  backendContext.versionId =
    params.get("version") || localStorage.getItem("vr360_builder_version_id") || "";
  api.currentTourId = backendContext.versionId || null;
}
function persistBuilderContext() {
  if (backendContext.projectId) {
    localStorage.setItem("vr360_builder_project_id", backendContext.projectId);
  }
  if (backendContext.locationId) {
    localStorage.setItem("vr360_builder_location_id", backendContext.locationId);
  }
  if (backendContext.versionId) {
    localStorage.setItem("vr360_builder_version_id", backendContext.versionId);
  }
  const params = new URLSearchParams();
  if (backendContext.projectId) params.set("project", backendContext.projectId);
  if (backendContext.locationId) params.set("location", backendContext.locationId);
  if (backendContext.versionId) params.set("version", backendContext.versionId);
  const nextUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
  window.history.replaceState({}, "", nextUrl);
}
async function loadProjectOptions({ keepSelection = true } = {}) {
  const response = await listProjects();
  projects.value = normalizeApiList(response.data);
  if (!keepSelection || !projects.value.some((p) => String(p.id) === String(backendContext.projectId))) {
    backendContext.projectId = projects.value[0]?.id ? String(projects.value[0].id) : "";
  }
}
async function loadLocationOptions(projectId = backendContext.projectId, { keepSelection = true } = {}) {
  if (!projectId) {
    locations.value = [];
    backendContext.locationId = "";
    return;
  }
  const response = await listProjectLocations(projectId);
  locations.value = normalizeApiList(response.data);
  if (!keepSelection || !locations.value.some((l) => String(l.id) === String(backendContext.locationId))) {
    backendContext.locationId = locations.value[0]?.id ? String(locations.value[0].id) : "";
  }
}
async function loadVersionOptions(locationId = backendContext.locationId, { keepSelection = true } = {}) {
  if (!locationId) {
    versions.value = [];
    backendContext.versionId = "";
    return;
  }
  const response = await listVersions(locationId);
  versions.value = normalizeApiList(response.data);
  if (!keepSelection || !versions.value.some((v) => String(v.id) === String(backendContext.versionId))) {
    const draft = versions.value.find((v) => v.status === "draft");
    backendContext.versionId = draft?.id ? String(draft.id) : versions.value[0]?.id ? String(versions.value[0].id) : "";
  }
  api.currentTourId = backendContext.versionId || null;
}
async function loadBuilderOptions() {
  optionsLoading.value = true;
  try {
    await loadProjectOptions();
    await loadLocationOptions(backendContext.projectId);
    await loadVersionOptions(backendContext.locationId);
    persistBuilderContext();
  } catch (e) {
    showToast("error", e.response?.data?.detail || "Could not load project/location/version.");
  } finally {
    optionsLoading.value = false;
  }
}
async function handleProjectChange() {
  backendContext.locationId = "";
  backendContext.versionId = "";
  await loadLocationOptions(backendContext.projectId, { keepSelection: false });
  await loadVersionOptions(backendContext.locationId, { keepSelection: false });
  persistBuilderContext();
  if (backendContext.versionId) await loadTourById(backendContext.versionId);
  else clearTourCanvas();
}
async function handleLocationChange() {
  backendContext.versionId = "";
  await loadVersionOptions(backendContext.locationId, { keepSelection: false });
  persistBuilderContext();
  if (backendContext.versionId) await loadTourById(backendContext.versionId);
  else clearTourCanvas();
}
async function handleVersionChange() {
  persistBuilderContext();
  if (backendContext.versionId) await loadTourById(backendContext.versionId);
  else clearTourCanvas();
}
function clearTourCanvas() {
  scenes.splice(0, scenes.length);
  activeSceneIndex.value = -1;
  selectedHotspotIndex.value = -1;
  engine.value?.loadScene?.(null);
}
async function initApi() {
  readBuilderParams();
  api.baseUrl = apiBaseURL;
  const ok = await apiTestConnection(true);
  if (!ok) return;
  await loadBuilderOptions();
  if (backendContext.locationId && backendContext.versionId) {
    await loadTourById(backendContext.versionId);
  }
}
async function apiTestConnection(silent = false) {
  apiStatus.value = "loading";
  try {
    await http.get("/api/projects/");
    apiStatus.value = "on";
    api.connected = true;
    if (!silent) {
      apiTestResult.show = true;
      apiTestResult.ok = true;
      apiTestResult.msg = `Backend OK - ${api.baseUrl}`;
    }
    return true;
  } catch (e) {
    apiStatus.value = "off";
    api.connected = false;
    if (!silent) {
      apiTestResult.show = true;
      apiTestResult.ok = false;
      apiTestResult.msg = e.response?.data?.detail || e.message;
    }
    return false;
  }
}
function requireBackendContext() {
  if (!backendContext.locationId || !backendContext.versionId) {
    showToast(
      "error",
      "Missing location/version. Open builder with /builder?location={id}&version={id}.",
    );
    return false;
  }
  persistBuilderContext();
  api.currentTourId = backendContext.versionId;
  return true;
}
async function apiUpload(f, sceneKey) {
  if (!api.connected) return null;
  if (!requireBackendContext()) return null;
  try {
    const response = await uploadSceneAsset({
      tourVersion: backendContext.versionId,
      sceneKey,
      originalFile: f,
    });
    const asset = response.data.asset || response.data;
    const imageUrl =
      asset.original_file ||
      asset.image_url ||
      asset.preview_file ||
      asset.optimized_file ||
      "";
    const thumbUrl =
      asset.thumbnail_file ||
      asset.preview_file ||
      asset.optimized_file ||
      imageUrl;
    return {
      image_url: imageUrl,
      thumb_url: thumbUrl,
      original_file: asset.original_file || "",
      optimized_file: asset.optimized_file || "",
      preview_file: asset.preview_file || "",
      thumbnail_file: asset.thumbnail_file || "",
      filename: imageUrl || f.name,
      asset_id: asset.id,
    };
  } catch (e) {
    console.warn("Upload:", e.response?.data || e.message);
  }
  return null;
}
async function apiSaveTour(d) {
  if (!api.connected) {
    showToast("error", "❌ Chưa kết nối");
    return null;
  }
  if (!requireBackendContext()) return null;
  try {
    if (tourAudio._file) {
      tourAudio._uploadState = "uploading";
      tourAudio._uploadError = "";
    }
    let response = await updateVersion(backendContext.locationId, backendContext.versionId, {
      label: d.title || "VR360 Virtual Tour",
      data: d,
      ...(tourAudio._file ? { background_audio_file: tourAudio._file } : {}),
    });
    const backgroundAudio = apiUrl(response.data.background_audio || "");
    if (tourAudio._file && backgroundAudio) {
      if (tourAudio._localUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(tourAudio._localUrl);
      }
      tourAudio.file = backgroundAudio;
      tourAudio._file = null;
      tourAudio._localUrl = "";
      tourAudio._fileName = "";
      tourAudio._uploadState = "idle";
      d.audio = {
        enabled: Boolean(tourAudio.enabled),
        file: tourAudio.file,
        volume: tourAudio.volume,
        language: tourAudio.language,
        loop: Boolean(tourAudio.loop),
        autoplay: Boolean(tourAudio.autoplay),
        description: tourAudio.description,
      };
      response = await updateVersion(backendContext.locationId, backendContext.versionId, {
        label: d.title || "VR360 Virtual Tour",
        data: d,
      });
    } else if (tourAudio._file) {
      throw new Error("Backend không trả về URL ổn định cho Tour Audio.");
    }
    api.currentTourId = response.data.id || backendContext.versionId;
    return { ...response.data, tour_id: response.data.id };
  } catch (e) {
    if (tourAudio._file) {
      tourAudio._uploadState = "error";
      tourAudio._uploadError = e.response?.data?.detail || e.message || "Upload Tour Audio thất bại";
    }
    showToast("error", e.response?.data?.detail || "Could not save tour version.");
    return null;
  }
}
async function apiListTours() {
  if (!api.connected) return [];
  if (!backendContext.locationId) return [];
  try {
    const response = await listVersions(backendContext.locationId);
    const items = Array.isArray(response.data?.results) ? response.data.results : response.data;
    return (items || []).map((item) => ({
      tour_id: item.id,
      title: `v${item.version_number} - ${item.label || item.status}`,
      updated_at: item.updated_at,
      scenes: item.scene_assets_count,
    }));
  } catch {
    return [];
  }
}
async function apiLoadTour(id) {
  if (!api.connected) return null;
  if (!backendContext.locationId) return null;
  try {
    const response = await getVersion(backendContext.locationId, id);
    backendContext.versionId = String(id);
    persistBuilderContext();
    api.currentTourId = id;
    return {
      tour_id: response.data.id,
      title: response.data.label,
      scenes: response.data.data?.scenes || [],
      ...response.data.data,
      background_audio: response.data.background_audio || "",
    };
  } catch (e) {
    showToast("error", e.response?.data?.detail || "Could not load tour version.");
    return null;
  }
}
function resetQuickCreateForm() {
  quickLocations.value = [...locations.value];
  quickVersions.value = [...versions.value];
  quickCreateForm.modeProject = backendContext.projectId ? "existing" : "new";
  quickCreateForm.modeLocation = backendContext.locationId ? "existing" : "new";
  quickCreateForm.modeVersion = "new";
  quickCreateForm.projectId = backendContext.projectId || projects.value[0]?.id || "";
  quickCreateForm.projectName = "";
  quickCreateForm.projectDescription = "";
  quickCreateForm.locationId = backendContext.locationId || locations.value[0]?.id || "";
  quickCreateForm.locationName = "";
  quickCreateForm.locationDescription = "";
  quickCreateForm.latitude = "";
  quickCreateForm.longitude = "";
  quickCreateForm.versionId = backendContext.versionId || versions.value[0]?.id || "";
  quickCreateForm.sourceVersionId = backendContext.versionId || versions.value[0]?.id || "";
  quickCreateForm.versionLabel = "";
}
async function openQuickCreateTour() {
  if (!api.connected) {
    showToast("error", "❌ Chưa kết nối backend");
    return;
  }
  if (!projects.value.length) await loadProjectOptions({ keepSelection: true });
  resetQuickCreateForm();
  if (quickCreateForm.projectId && quickCreateForm.modeProject === "existing") {
    await loadQuickLocations();
  }
  modals.quickCreate = true;
}
async function onQuickProjectModeChange(mode) {
  quickCreateForm.modeProject = mode;
  if (mode === "new") {
    quickLocations.value = [];
    quickVersions.value = [];
    quickCreateForm.modeLocation = "new";
    quickCreateForm.modeVersion = "new";
    quickCreateForm.projectId = "";
    quickCreateForm.locationId = "";
    quickCreateForm.versionId = "";
    return;
  }
  quickCreateForm.projectId = backendContext.projectId || projects.value[0]?.id || "";
  await loadQuickLocations();
}
async function loadQuickLocations() {
  if (!quickCreateForm.projectId) return;
  const response = await listProjectLocations(quickCreateForm.projectId);
  quickLocations.value = normalizeApiList(response.data);
  quickCreateForm.locationId = backendContext.locationId || quickLocations.value[0]?.id || "";
  await loadQuickVersions();
}
async function onQuickLocationModeChange(mode) {
  quickCreateForm.modeLocation = mode;
  if (mode === "new") {
    quickVersions.value = [];
    quickCreateForm.modeVersion = "new";
    quickCreateForm.locationId = "";
    quickCreateForm.versionId = "";
    return;
  }
  await loadQuickLocations();
}
async function loadQuickVersions() {
  if (!quickCreateForm.locationId) return;
  const response = await listVersions(quickCreateForm.locationId);
  quickVersions.value = normalizeApiList(response.data);
  quickCreateForm.versionId = backendContext.versionId || quickVersions.value[0]?.id || "";
  quickCreateForm.sourceVersionId = backendContext.versionId || quickVersions.value[0]?.id || "";
}
async function createOrSelectTour() {
  try {
    quickCreateLoading.value = true;
    let projectId = quickCreateForm.projectId;
    if (quickCreateForm.modeProject === "new") {
      if (!quickCreateForm.projectName.trim()) {
        showToast("error", "Nhập tên project mới");
        return;
      }
      const response = await createProject({
        name: quickCreateForm.projectName.trim(),
        description: quickCreateForm.projectDescription.trim(),
      });
      projectId = response.data.id;
    }

    let locationId = quickCreateForm.locationId;
    if (quickCreateForm.modeLocation === "new") {
      if (!quickCreateForm.locationName.trim()) {
        showToast("error", "Nhập tên location mới");
        return;
      }
      const payload = {
        name: quickCreateForm.locationName.trim(),
        description: quickCreateForm.locationDescription.trim(),
      };
      if (quickCreateForm.latitude !== "") payload.latitude = Number(quickCreateForm.latitude);
      if (quickCreateForm.longitude !== "") payload.longitude = Number(quickCreateForm.longitude);
      const response = await createLocation(projectId, payload);
      locationId = response.data.id;
    }

    let versionId = quickCreateForm.versionId;
    if (quickCreateForm.modeVersion === "new") {
      const label = quickCreateForm.versionLabel.trim() || "draft";
      const payload = {
        label,
        changelog: "Created from VR360 Builder.",
        data: { title: label, scenes: [] },
      };
      if (quickCreateForm.sourceVersionId && quickCreateForm.modeLocation !== "new") {
        payload.source_version_id = quickCreateForm.sourceVersionId;
      }
      const response = await createVersion(locationId, payload);
      versionId = response.data.id;
    } else if (!versionId) {
      showToast("error", "Chọn version cần mở");
      return;
    }

    backendContext.projectId = String(projectId);
    backendContext.locationId = String(locationId);
    backendContext.versionId = String(versionId);
    await loadBuilderOptions();
    persistBuilderContext();
    await loadTourById(backendContext.versionId);
    modals.quickCreate = false;
    showToast("success", "✅ Đã tạo/chọn tour");
  } catch (e) {
    showToast("error", e.response?.data?.detail || "Could not create/select tour.");
  } finally {
    quickCreateLoading.value = false;
  }
}
function openApiSettings() {
  apiUrlInput.value = api.baseUrl;
  apiTestResult.show = false;
  modals.api = true;
}
async function testApiConnection() {
  const u = apiUrlInput.value.trim().replace(/\/+$/, "");
  if (!u) {
    showToast("error", "❌ Nhập URL");
    return;
  }
  api.baseUrl = u;
  apiTestBtnLoading.value = true;
  await apiTestConnection(false);
  apiTestBtnLoading.value = false;
}
function saveApiSettings() {
  const u = apiUrlInput.value.trim().replace(/\/+$/, "");
  api.baseUrl = u;
  if (u) {
    localStorage.setItem("vr360_api_url", u);
    apiTestConnection(true).then((ok) => {
      showToast(ok ? "success" : "error", ok ? `✅ ${u}` : "⚠ Chưa kết nối");
    });
  } else {
    localStorage.removeItem("vr360_api_url");
    apiStatus.value = "off";
    api.connected = false;
  }
  modals.api = false;
}
async function saveToServer() {
  if (!api.connected) {
    showToast("error", "❌ Chưa kết nối");
    return;
  }
  if (!scenes.length) {
    showToast("error", "❌ Chưa có scene");
    return;
  }
  const pendingSceneAudio = scenes.filter((scene) => scene._audioFile);
  if (pendingSceneAudio.length) {
    showToast(
      "error",
      `❌ Chưa thể lưu Scene Audio: backend chưa có endpoint upload cho ${pendingSceneAudio.map((scene) => scene.name || scene.id).join(", ")}.`,
    );
    return;
  }
  try {
    const c = cloneForExport();
    audioDebug('Save Audio POI', c.flatMap((scene) => scene.hotspots).filter((hotspot) => hotspot.type === 'audio').map((hotspot) => hotspot.id));
    const pending = c.filter((x) => x._file && !x.exportUrl);
    if (pending.length) {
      const preSave = await apiSaveTour(buildJson(c));
      if (!preSave) return;
      showToast("info", `⏳ Upload ${pending.length} ảnh...`);
      const r = await uploadClone(c);
      if (!r.ok) {
        showToast("error", "❌ Upload thất bại");
        return;
      }
    }
    const hotspotAudioUpload = await uploadHotspotAudioFiles(c);
    if (!hotspotAudioUpload.ok) {
      showToast("error", "❌ Upload audio điểm nóng thất bại");
      return;
    }
    const infoImageUpload = await uploadHotspotInfoImages(c);
    if (!infoImageUpload.ok) {
      showToast("error", "❌ Upload media hotspot thất bại");
      return;
    }
    const res = await apiSaveTour(buildJson(c));
    if (res) {
      syncBack(c);
      showToast("success", `✅ Saved! ID: ${res.tour_id || api.currentTourId}`);
    }
  } catch (e) {
    showToast("error", "❌ " + e.message);
  }
}
async function loadFromServer() {
  if (!api.connected) {
    showToast("error", "❌ Chưa kết nối");
    return;
  }
  loadModalLoading.value = true;
  loadModalTours.value = [];
  modals.load = true;
  loadModalTours.value = await apiListTours();
  loadModalLoading.value = false;
}
async function loadTourById(id) {
  const d = await apiLoadTour(id);
  if (!d) return;
  const resolveUrl = (u) => {
    if (!u) return "";
    return apiUrl(u);
  };
  const mapped = (d.scenes || []).map((s) =>
    normalizeScene(s, { generateId, resolveUrl }),
  );
  resetTourAudio(d.audio, resolveUrl(d.background_audio));
  scenes.splice(0, scenes.length, ...mapped);
  api.currentTourId = id;
  activeSceneIndex.value = -1;
  selectedHotspotIndex.value = -1;
  modals.load = false;
  if (scenes.length > 0) selectScene(0);
  showToast("success", `✅ "${d.title || id}" — ${scenes.length} scenes`);
}

// ══════════════════════════════════════
//  EXPORT / IMPORT
// ══════════════════════════════════════
function cloneForExport() {
  return scenes.map((s) => ({
    id: s.id,
    name: s.name,
    group: s.group,
    image: s.image,
    thumb: s.thumb,
    info: s.info,
    gps: s.gps || null,
    exportUrl: s.exportUrl || "",
    _serverThumb: s._serverThumb || "",
    _file: s._file || null,
    initialView: { ...s.initialView },
    am_thanh_thuyet_minh: s.am_thanh_thuyet_minh
      ? { ...s.am_thanh_thuyet_minh }
      : null,
    transition: s.transition ? { ...s.transition } : null,
    hotspots: s.hotspots.map(cloneHotspotForExport),
  }));
}

function clonePlain(value, fallback = null) {
  if (value === undefined || value === null) return fallback;
  return JSON.parse(JSON.stringify(value));
}

function cloneHotspotForExport(h) {
  return {
    ...h,
    ...(h.noi_dung ? { noi_dung: clonePlain(h.noi_dung, {}) } : {}),
    ...(Array.isArray(h.area_points)
      ? { area_points: h.area_points.map((point) => ({ ...point })) }
      : {}),
    ...(h.khi_dua_chuot_vao
      ? { khi_dua_chuot_vao: clonePlain(h.khi_dua_chuot_vao, {}) }
      : {}),
    ...(h.entryView ? { entryView: { ...h.entryView } } : {}),
  };
}
function buildJson(c) {
  return {
    title: "VR360 Virtual Tour",
    ...(tourAudio.file
      ? {
          audio: {
            enabled: Boolean(tourAudio.enabled),
            file: tourAudio.file,
            volume: tourAudio.volume,
            language: tourAudio.language,
            loop: Boolean(tourAudio.loop),
            autoplay: Boolean(tourAudio.autoplay),
            description: tourAudio.description,
          },
        }
      : {}),
    scenes: c.map((s) => ({
      id: s.id,
      name: s.name,
      group: s.group,
      image: s.exportUrl || s.image,
      thumb: s._serverThumb || s.exportUrl || s.thumb,
      info: s.info,
      gps: s.gps || null,
      initialView: { ...s.initialView },
      ...(s.am_thanh_thuyet_minh?.duong_dan_file_audio
        ? { am_thanh_thuyet_minh: { ...s.am_thanh_thuyet_minh } }
        : {}),
      ...(s.transition?.enabled !== false
        ? { transition: { ...s.transition } }
        : {}),
      hotspots: s.hotspots.map(cleanHotspotForSave),
    })),
  };
}

function cleanHotspotForSave(hotspot) {
  ensureHotspotId(hotspot);
  const copy = JSON.parse(
    JSON.stringify(hotspot, (key, value) => {
      if (
        key === "_infoImageFile" ||
        key === "_infoImagePreview" ||
        key === "_infoImageName" ||
        key === "_galleryImageFiles" ||
        key === "_videoFile" ||
        key === "_videoPreview" ||
        key === "_videoName" ||
        key === "_audioFile" ||
        key === "_audioLocalUrl" ||
        key === "_audioFileName" ||
        key === "_audioBlob" ||
        key === "audioFile" ||
        key === "localAudio"
      )
        return undefined;
      return value;
    }),
  );
  if (resolvePointKind(copy) === "audio") {
    const legacyAudioUrl = copy.audio?.url || copy.audio_url || "";
    copy.audio = canonicalHotspotAudio(copy.audio, {
      url: legacyAudioUrl,
      enabled: copy.audio?.enabled !== undefined ? Boolean(copy.audio.enabled) : Boolean(legacyAudioUrl),
    });
    copy.position = { lon: Number(copy.lon) || 0, lat: Number(copy.lat) || 0 };
    audioDebug('Export Audio POI', copy.id);
  } else {
    delete copy.audio;
  }
  delete copy.audio_url;
  if (copy.type === "area_landmark" || copy.pointKind === "area_landmark") {
    const vertices = Array.isArray(copy.vertices)
      ? copy.vertices
      : Array.isArray(copy.polygon)
        ? copy.polygon
        : Array.isArray(copy.area_points)
          ? copy.area_points
          : [];
    copy.vertices = vertices;
    delete copy.anchor;
    delete copy.label_position;
    delete copy.polygon;
    delete copy.area_points;
    delete copy.lon;
    delete copy.lat;
  }
  return copy;
}

async function uploadHotspotAudioFiles(c) {
  const pending = c.flatMap((scene) => scene.hotspots
    .filter((hotspot) => hotspot?._audioFile)
    .map((hotspot) => ({ hotspot, file: hotspot._audioFile })));
  if (!pending.length) return { ok: true, up: 0, fail: 0 };
  if (!backendContext.locationId || !backendContext.versionId) {
    showToast("error", "❌ Chưa chọn location/version để upload audio điểm nóng");
    return { ok: false, up: 0, fail: pending.length };
  }
  let up = 0;
  let fail = 0;
  for (const { hotspot, file } of pending) {
    try {
      ensureHotspotId(hotspot);
      const response = await uploadHotspotAudio(backendContext.locationId, backendContext.versionId, {
        hotspotId: hotspot.id,
        audioFile: file,
      });
      const audioUrl = response?.data?.audio_url || response?.data?.audio_path || response?.data?.url || "";
      if (!audioUrl) throw new Error("No audio URL returned");
      hotspot.audio = canonicalHotspotAudio(hotspot.audio, {
        url: apiUrl(audioUrl),
        enabled: true,
      });
      delete hotspot.audio_url;
      if (hotspot._audioLocalUrl?.startsWith("blob:")) URL.revokeObjectURL(hotspot._audioLocalUrl);
      delete hotspot._audioFile;
      delete hotspot._audioLocalUrl;
      delete hotspot._audioFileName;
      delete hotspot._audioUploadError;
      up++;
    } catch (error) {
      console.error("uploadHotspotAudio error:", error);
      hotspot._audioUploadError = 'Không thể tải file audio lên. Vui lòng thử lại.';
      fail++;
    }
  }
  return { ok: fail === 0, up, fail };
}

async function uploadHotspotInfoImages(c) {
  const pending = [];
  c.forEach((scene) => {
    scene.hotspots.forEach((hotspot) => {
      if (hotspot?._infoImageFile) {
        ensureHotspotId(hotspot);
        pending.push({
          hotspot,
          file: hotspot._infoImageFile,
          mode: "info",
        });
      }
      if (Array.isArray(hotspot?._galleryImageFiles)) {
        ensureHotspotId(hotspot);
        hotspot._galleryImageFiles.forEach((item) => {
          if (item?.file) {
            pending.push({
              hotspot,
              file: item.file,
              localUrl: item.previewUrl,
              mode: "gallery",
            });
          }
        });
      }
      if (hotspot?._videoFile) {
        ensureHotspotId(hotspot);
        pending.push({
          hotspot,
          file: hotspot._videoFile,
          mode: "video",
        });
      }
    });
  });
  if (!pending.length) return { ok: true, up: 0, fail: 0 };
  if (!backendContext.locationId || !backendContext.versionId) {
    showToast("error", "❌ Chưa chọn location/version để upload media hotspot");
    return { ok: false, up: 0, fail: pending.length };
  }
  let up = 0;
  let fail = 0;
  for (const item of pending) {
    const { hotspot } = item;
    try {
      if (!hotspot.noi_dung) hotspot.noi_dung = {};

      if (item.mode === "video") {
        const response = await uploadHotspotInfoVideo(
          backendContext.locationId,
          backendContext.versionId,
          { hotspotId: hotspot.id, videoFile: item.file },
        );
        const videoUrl = response?.data?.video_url || response?.data?.url || "";
        if (!videoUrl) throw new Error("No video_url returned");
        hotspot.noi_dung.url_video = apiUrl(videoUrl);
        if (hotspot._videoPreview?.startsWith("blob:")) {
          URL.revokeObjectURL(hotspot._videoPreview);
        }
        delete hotspot._videoFile;
        delete hotspot._videoPreview;
        delete hotspot._videoName;
      } else {
        const response = await uploadHotspotInfoImage(
          backendContext.locationId,
          backendContext.versionId,
          { hotspotId: hotspot.id, imageFile: item.file },
        );
        const imageUrl = response?.data?.image_url || response?.data?.url || "";
        if (!imageUrl) throw new Error("No image_url returned");
        const uploadedUrl = apiUrl(imageUrl);

        if (item.mode === "gallery") {
        const list = Array.isArray(hotspot.noi_dung.danh_sach_anh)
          ? hotspot.noi_dung.danh_sach_anh
          : [];
        hotspot.noi_dung.danh_sach_anh = list.map((url) =>
          url === item.localUrl ? uploadedUrl : url,
        );
        if (item.localUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(item.localUrl);
        }
        } else {
        hotspot.noi_dung.anh_minh_hoa = uploadedUrl;
        if (hotspot._infoImagePreview?.startsWith("blob:")) {
          URL.revokeObjectURL(hotspot._infoImagePreview);
        }
        delete hotspot._infoImageFile;
        delete hotspot._infoImagePreview;
        delete hotspot._infoImageName;
        }
      }
      up++;
    } catch (error) {
      console.error("uploadHotspotMedia error:", error);
      fail++;
    }
  }
  c.forEach((scene) => {
    scene.hotspots.forEach((hotspot) => {
      delete hotspot._galleryImageFiles;
    });
  });
  if (up) showToast("success", `☁️ Đã upload ${up} media hotspot`);
  return { ok: fail === 0, up, fail };
}
async function uploadClone(c, prog) {
  const pending = c.filter((x) => x._file && !x.exportUrl);
  if (!pending.length) return { ok: true, up: 0, fail: 0 };
  if (!api.connected) return { ok: false, up: 0, fail: 0 };
  let up = 0,
    fail = 0;
  for (let i = 0; i < pending.length; i++) {
    if (prog) prog(i + 1, pending.length, pending[i].name);
    try {
      const r = await apiUpload(pending[i]._file, pending[i].id);
      if (r) {
        pending[i].exportUrl = r.image_url;
        pending[i]._serverThumb = r.thumb_url;
        pending[i].original_file = r.original_file || r.image_url || "";
        pending[i].optimized_file = r.optimized_file || "";
        pending[i].preview_file = r.preview_file || "";
        pending[i].thumbnail_file = r.thumbnail_file || r.thumb_url || "";
        up++;
      } else fail++;
    } catch {
      fail++;
    }
  }
  return { ok: !fail, up, fail };
}
function syncBack(c) {
  c.forEach((x, i) => {
    const s = scenes[i];
    if (!s || s.id !== x.id) return;
    if (x.exportUrl) {
      if (s.image?.startsWith("blob:")) URL.revokeObjectURL(s.image);
      s.image = x.exportUrl;
      s.thumb = x._serverThumb || x.exportUrl || s.thumb;
      s.exportUrl = x.exportUrl;
      s._serverThumb = x._serverThumb;
      s.original_file = x.original_file || x.exportUrl;
      s.optimized_file = x.optimized_file || "";
      s.preview_file = x.preview_file || "";
      s.thumbnail_file = x.thumbnail_file || x._serverThumb || "";
      s._file = null;
    }
    x.hotspots.forEach((hotspot, hotspotIndex) => {
      const target = s.hotspots[hotspotIndex];
      if (!target) return;
      if (hotspot.noi_dung) target.noi_dung = clonePlain(hotspot.noi_dung, {});
      if (hotspot.id) target.id = hotspot.id;
      if (hotspot.audio) target.audio = { ...hotspot.audio };
      if (hotspot.type === 'audio' && hotspot.audio) audioDebug('Reload Builder Audio POI', hotspot.id, hotspot.audio.url || '');
      delete target.audio_url;
      delete target._galleryImageFiles;
      delete target._videoFile;
      delete target._videoPreview;
      delete target._videoName;
    });
  });
}
function hasPendingUploads(c) {
  return c.some((x) => x._file && !x.exportUrl);
}
async function exportJSON() {
  try {
    if (tourAudio._file) {
      showToast(
        "error",
        "⚠ Tour Audio chưa được tải lên. Hãy lưu tour vào server trước khi export JSON.",
      );
      return;
    }
    const scenesWithLocalAudio = scenes.filter(
      (scene) => scene._audioLocalUrl,
    );
    if (scenesWithLocalAudio.length) {
      showToast(
        "error",
        "⚠ Scene Audio đang là tệp cục bộ. Hãy dùng URL audio đã host trước khi export JSON.",
      );
      return;
    }
    const hotspotsWithPendingAudio = scenes.flatMap((scene) =>
      (scene.hotspots || []).filter((hotspot) => hotspot?._audioFile),
    );
    if (hotspotsWithPendingAudio.length) {
      showToast(
        "error",
        "⚠ POI Audio chưa được tải lên. Hãy lưu tour vào server trước khi export JSON.",
      );
      return;
    }
    const c = cloneForExport();
    const pending = c.filter((x) => x._file && !x.exportUrl);
    if (pending.length && !api.connected) {
      showToast(
        "error",
        `⚠ Còn ${pending.length} ảnh chưa upload. Hãy kết nối API rồi export lại (không xuất blob).`,
      );
      openApiSettings();
      return;
    }
    if (!pending.length) {
      const json = buildJson(c);
      if (JSON.stringify(json).includes("blob:")) {
        showToast(
          "error",
          "⚠ Còn ảnh dạng blob chưa được host. Hãy import lại ảnh gốc rồi export khi đã kết nối API.",
        );
        openApiSettings();
        return;
      }
      exportJsonText.value = JSON.stringify(json, null, 2);
      modals.export = true;
      return;
    }
    exportJsonText.value = "⏳ Đang tải lên...";
    modals.export = true;
    const r = await uploadClone(c, (i, t, n) => {
      exportJsonText.value = `⏳ ${i}/${t}: ${n}`;
    });
    syncBack(c);
    if (hasPendingUploads(c)) {
      exportJsonText.value = `❌ Upload thất bại ${r.fail} ảnh — chưa thể export vì còn ảnh dạng blob. Vui lòng thử export lại.`;
      showToast("error", `❌ ${r.fail} ảnh upload thất bại, chưa export`);
      return;
    }
    exportJsonText.value = JSON.stringify(buildJson(c), null, 2);
    if (r.up) showToast("success", `☁️ ${r.up} ảnh uploaded`);
  } catch (e) {
    exportJsonText.value = "❌ " + e.message;
    modals.export = true;
  }
}
function copyExportJSON() {
  navigator.clipboard
    .writeText(exportJsonText.value)
    .then(() => showToast("success", "📋 Copied!"));
}
function downloadExportJSON() {
  const blob = new Blob([exportJsonText.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `vr360-tour-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
function importJSON() {
  importJsonText.value = "";
  modals.import = true;
}
function doImportJSON() {
  try {
    const d = JSON.parse(importJsonText.value.trim());
    const sc = d.scenes || d;
    if (!Array.isArray(sc)) throw new Error("Invalid");
    const mapped = sc.map((s) => normalizeScene(s, { generateId }));
    resetTourAudio(d.audio);
    scenes.splice(0, scenes.length, ...mapped);
    activeSceneIndex.value = -1;
    selectedHotspotIndex.value = -1;
    modals.import = false;
    if (scenes.length > 0) selectScene(0);
    showToast("success", `✅ ${scenes.length} scenes imported`);
  } catch (e) {
    showToast("error", "❌ " + e.message);
  }
}
function closeModal(name) {
  modals[name] = false;
}

// ══════════════════════════════════════
//  LIFECYCLE
// ══════════════════════════════════════
function onGlobalKeydown(e) {
  if (
    e.target.tagName === "INPUT" ||
    e.target.tagName === "TEXTAREA" ||
    e.target.tagName === "SELECT"
  )
    return;
  if (e.key === "Escape") {
    if (drawingInfoArea.value) cancelInfoAreaDrawing();
    else closeQuickMenu();
  }
  if (e.key === "Delete" && selectedHotspotIndex.value >= 0)
    removeHotspot(selectedHotspotIndex.value);
  if (
    (e.ctrlKey || e.metaKey) &&
    e.key === "d" &&
    selectedHotspotIndex.value >= 0
  ) {
    e.preventDefault();
    duplicateHotspot(selectedHotspotIndex.value);
  }
}
onMounted(() => {
  engine.value = new PreviewEngine(canvasRef.value, {
    onLoadingChange: (v) => {
      canvasLoading.value = v;
    },
    onHudChange: (h) => {
      hud.lon = h.lon;
      hud.lat = h.lat;
      hud.fov = h.fov;
    },
    onFrame: () => requestAreaOverlayUpdate(),
    onHotspotPlace: (lon, lat) => placeNewHotspot(lon, lat),
    onHotspotDblClick: (lon, lat, sx, sy) => openQuickMenu(lon, lat, sx, sy),
    onCancelPlacing: () => cancelPlacingHotspot(),
    onHotspotSelect: (index) => selectHotspot(index),
    onHotspotNav: (index) => goToHotspotTarget(index),
    onAreaLandmarkSelect: (annotation) => {
      const index = scenes[activeSceneIndex.value]?.hotspots.findIndex(
        (hotspot) => String(hotspot.id) === String(annotation.id),
      ) ?? -1;
      if (index >= 0) selectHotspot(index);
    },
    onAreaLandmarkLabelDragEnd: (annotation, position) => {
      annotation.line_height = Math.max(40, Math.round(Math.abs(position.y)));
      syncHotspotsToEngine();
    },
    onAreaLandmarkVertexDragEnd: (annotation, vertexIndex, point) => {
      const vertices = Array.isArray(annotation.vertices) ? annotation.vertices : [];
      if (!vertices[vertexIndex]) return;
      vertices[vertexIndex] = point;
      annotation.vertices = vertices;
      syncHotspotsToEngine();
    },
    resolveNavTarget: (targetId) =>
      scenes.find((scene) => scene.id === targetId) || null,
    onHotspotDragEnd: (index, lon, lat) => {
      if (activeSceneIndex.value >= 0) {
        const hs = scenes[activeSceneIndex.value].hotspots[index];
        if (hs && !hs.locked) {
          hs.lon = lon;
          hs.lat = lat;
        } else if (hs?.locked)
          showToast("info", "🔒 Hotspot đang bị khóa vị trí");
        syncHotspotsToEngine();
      }
    },
  });
  window.addEventListener("keydown", onGlobalKeydown);
  initApi();
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onGlobalKeydown);
  if (areaOverlayRaf) cancelAnimationFrame(areaOverlayRaf);
  engine.value?.dispose();
  if (tourAudio._localUrl?.startsWith("blob:")) {
    URL.revokeObjectURL(tourAudio._localUrl);
  }
  scenes.forEach((s) => {
    if (s.image?.startsWith("blob:")) URL.revokeObjectURL(s.image);
    if (s._audioLocalUrl?.startsWith("blob:"))
      URL.revokeObjectURL(s._audioLocalUrl);
    s.hotspots?.forEach((hotspot) => {
      if (hotspot._audioLocalUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(hotspot._audioLocalUrl);
      }
      if (hotspot._infoImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(hotspot._infoImagePreview);
      }
      if (Array.isArray(hotspot._galleryImageFiles)) {
        hotspot._galleryImageFiles.forEach((item) => {
          if (item?.previewUrl?.startsWith("blob:")) {
            URL.revokeObjectURL(item.previewUrl);
          }
        });
      }
      if (hotspot._videoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(hotspot._videoPreview);
      }
    });
  });
});
</script>

<template>
  <div
    class="vb-app"
    @click="
      uiState.fileMenuOpen = false;
      closeQuickMenu();
    "
  >
    <div class="vb-topbar">
      <div class="vb-brand">VR360 BUILDER</div>
      <div
        class="vb-menu-trigger"
        @click.stop="uiState.fileMenuOpen = !uiState.fileMenuOpen"
      >
        File
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          width="12"
          height="12"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <div class="vb-dropdown-menu" v-show="uiState.fileMenuOpen" @click.stop>
        <div
          class="vb-menu-item"
          @click="
            addSceneFromFiles();
            uiState.fileMenuOpen = false;
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Thêm ảnh 360°
        </div>
        <div
          class="vb-menu-item"
          @click="
            importJSON();
            uiState.fileMenuOpen = false;
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
            />
          </svg>
          Nhập JSON
        </div>
        <div class="vb-menu-divider"></div>
        <div
          class="vb-menu-item"
          @click="
            loadFromServer();
            uiState.fileMenuOpen = false;
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"
            />
          </svg>
          Tải tour từ Server
        </div>
        <div class="vb-menu-divider"></div>
        <div
          class="vb-menu-item"
          @click="
            openApiSettings();
            uiState.fileMenuOpen = false;
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
            />
          </svg>
          Cài đặt API
        </div>
      </div>
      <button class="vb-btn vb-btn-accent" @click="saveToServer">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M17 21v-8H7v8M7 3v5h8" />
          <path
            d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
          />
        </svg>
        Save Tour
      </button>
      <button class="vb-btn vb-btn-success" @click="openQuickCreateTour">
        + Create new tour
      </button>
      <select
        v-model="backendContext.projectId"
        class="vb-top-select"
        :disabled="optionsLoading || !projects.length"
        @change="handleProjectChange"
      >
        <option value="">Select project</option>
        <option v-for="project in projects" :key="project.id" :value="String(project.id)">
          {{ project.name }}
        </option>
      </select>
      <select
        v-model="backendContext.locationId"
        class="vb-top-select"
        :disabled="optionsLoading || !backendContext.projectId || !locations.length"
        @change="handleLocationChange"
      >
        <option value="">Select location</option>
        <option v-for="location in locations" :key="location.id" :value="String(location.id)">
          {{ location.name }}
        </option>
      </select>
      <select
        v-model="backendContext.versionId"
        class="vb-top-select vb-top-select-version"
        :disabled="optionsLoading || !backendContext.locationId || !versions.length"
        @change="handleVersionChange"
      >
        <option value="">Select version</option>
        <option v-for="item in versions" :key="item.id" :value="String(item.id)">
          v{{ item.version_number }} - {{ item.status }}
        </option>
      </select>
      <div class="vb-spacer"></div>
      <button class="vb-btn vb-btn-primary" @click="exportJSON">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
          />
        </svg>
        Xuất JSON
      </button>
    </div>

    <div class="vb-main">
      <!-- LEFT: SCENE NAVIGATOR -->
      <div class="vb-left" :class="{ collapsed: uiState.leftCollapsed }">
        <div class="vb-panel-header">
          <template v-if="!uiState.leftCollapsed">
            <span class="vb-panel-title">Cảnh</span>
            <span class="vb-scene-count">{{ scenes.length }}</span>
          </template>
          <button
            class="vb-collapse-toggle"
            @click="uiState.leftCollapsed = !uiState.leftCollapsed"
            :title="uiState.leftCollapsed ? 'Mở rộng' : 'Thu gọn'"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="16"
              height="16"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
        </div>
        <template v-if="!uiState.leftCollapsed">
          <div class="vb-scene-list">
            <div
              v-for="(s, i) in scenes"
              :key="s.id"
              class="vb-scene-card"
              :class="{
                active: i === activeSceneIndex,
                dragover: dragOverIndex === i,
              }"
              draggable="true"
              @click="selectScene(i)"
              @dragstart="onDragStart(i)"
              @dragend="onDragEnd"
              @dragover.prevent="dragOverIndex = i"
              @dragleave="dragOverIndex = -1"
              @drop.prevent="onDrop(i, $event)"
            >
              <span class="vb-scene-num">{{ i + 1 }}</span>
              <span v-if="s.exportUrl" class="vb-scene-badge">☁</span>
              <div class="vb-scene-thumb">
                <img
                  :src="s._serverThumb || s.thumb || s.image"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div class="vb-scene-meta">
                <div class="vb-scene-name">{{ s.name }}</div>
                <div class="vb-scene-info">
                  {{ s.hotspots.length }} hp · {{ s.group }}
                </div>
              </div>
              <button class="vb-scene-delete" @click.stop="removeScene(i)">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path
                    d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            class="vb-add-area"
            :class="{ dragover: addAreaDragover }"
            @click="fileInputRef.click()"
            @dragover.prevent="addAreaDragover = true"
            @dragleave="addAreaDragover = false"
            @drop.prevent="onAddAreaDrop"
          >
            <input
              ref="fileInputRef"
              type="file"
              multiple
              accept="image/*"
              style="display: none"
              @click.stop
              @change="handleFileInput"
            />
            <input
              ref="replaceImageInputRef"
              type="file"
              accept="image/*"
              style="display: none"
              @click.stop
              @change.stop="handleReplaceImage"
            />
            <span v-if="resizingCount > 0"
              >Đang xử lý {{ resizingCount }}...</span
            >
            <span v-else>+ Thêm ảnh 360°</span>
          </div>
        </template>
      </div>

      <input
        ref="audioInputRef"
        type="file"
        accept="audio/*"
        style="display: none"
        @change="handleAudioFile"
      />
      <input
        ref="tourAudioInputRef"
        type="file"
        accept="audio/*"
        style="display: none"
        @change="handleTourAudioFile"
      />
      <input
        ref="hotspotAudioInputRef"
        type="file"
        accept="audio/*"
        style="display: none"
        @change="handleHotspotAudioFile"
      />

      <!-- CENTER: CANVAS -->
      <div class="vb-center">
        <canvas
          ref="canvasRef"
          class="vb-canvas"
          :class="{ 'placing-hotspot': placingHotspot }"
        ></canvas>
        <svg class="vb-info-area-layer" aria-hidden="true">
          <g
            v-for="area in infoAreaOverlays"
            :key="area.hotspot.id || area.index"
            class="vb-info-area-group"
            :class="{ selected: area.selected }"
            @click.stop="selectHotspot(area.index)"
          >
            <polygon
              class="vb-info-area-fill"
              :points="area.svgPoints"
            />
            <polygon
              class="vb-info-area-line"
              :points="area.svgPoints"
            />
          </g>
          <g v-if="drawingInfoArea && draftInfoAreaOverlay.points.length">
            <polyline
              class="vb-info-area-draft-line"
              :points="draftInfoAreaOverlay.svgPoints"
            />
            <circle
              v-for="(point, index) in draftInfoAreaOverlay.points"
              :key="'draft-' + index"
              class="vb-info-area-node"
              :cx="point.x"
              :cy="point.y"
              r="4"
            />
          </g>
        </svg>
        <div class="vb-canvas-loading" :class="{ show: canvasLoading }">
          Đang tải...
        </div>
        <div class="vb-viewer-empty" v-show="scenes.length === 0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
            />
          </svg>
          <p>Thêm ảnh panorama để bắt đầu</p>
        </div>
        <div class="vb-crosshair-overlay" :class="{ active: placingHotspot }">
          <div class="vb-crosshair-msg">
            {{
              drawingInfoArea
                ? "Click các góc vùng thông tin — tối thiểu 3 điểm"
                : "Click để đặt hotspot — ESC để hủy"
            }}
          </div>
        </div>
        <div v-if="drawingInfoArea" class="vb-info-area-toolbar">
          <span>{{ infoAreaDraftPoints.length }} điểm</span>
          <button class="vb-btn" :disabled="infoAreaDraftPoints.length === 0" @click="undoInfoAreaPoint">
            Lùi
          </button>
          <button class="vb-btn vb-btn-primary" :disabled="infoAreaDraftPoints.length < 3" @click="finishInfoAreaDrawing">
            Hoàn tất vùng
          </button>
          <button class="vb-btn" @click="cancelInfoAreaDrawing">Hủy</button>
        </div>
        <div class="vb-preview-banner" v-if="previewMode.active">
          <span
            >Xem trước: <strong>{{ targetScene?.name }}</strong></span
          >
          <button class="vb-btn vb-btn-primary" @click="saveEntryView">
            Lưu góc nhìn
          </button>
          <button class="vb-btn" @click="returnFromPreview">Hủy</button>
        </div>

        <!-- CANVAS TOOLBAR -->
        <div
          class="vb-canvas-toolbar"
          v-show="activeSceneIndex >= 0 && !previewMode.active"
        >
          <button
            class="vb-tool-btn"
            :class="{ active: !placingHotspot }"
            @click="cancelPlacingHotspot"
            title="Xoay (V)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M18 11V6a2 2 0 00-2-2h-1a2 2 0 00-2 2M14 10V4.5a2 2 0 00-2-2 2 2 0 00-2 2V10M10 10.5V4a2 2 0 00-2-2 2 2 0 00-2 2v7"
              />
              <path
                d="M6 11a2 2 0 00-2 2v1a8 8 0 0016 0v-5a2 2 0 00-2-2 2 2 0 00-2 2"
              />
            </svg>
          </button>
          <div class="vb-tool-sep"></div>
          <button
            class="vb-tool-btn"
            :class="{ active: placingHotspot }"
            @click="startPlacingHotspot"
            title="Đặt Hotspot (H)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </button>
          <div class="vb-tool-sep"></div>
          <button
            class="vb-tool-btn"
            @click="saveCurrentView"
            title="Lưu góc nhìn hiện tại làm mặc định"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
              />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>
        </div>

        <!-- QUICK MENU -->
        <Transition name="qm">
          <div
            v-if="quickMenu.show"
            class="vb-quick-menu"
            :style="{ left: quickMenu.x + 'px', top: quickMenu.y + 'px' }"
            @click.stop
          >
            <div class="vb-qm-title">Thêm điểm nóng</div>
            <button
              class="vb-qm-item vb-qm-nav"
              @click="quickCreateHotspot('chuyen_canh')"
            >
              <span class="vb-qm-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  width="14"
                  height="14"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" /></svg
              ></span>
              <span class="vb-qm-label">Chuyển cảnh (Nav)</span>
            </button>
            <button
              class="vb-qm-item vb-qm-poi"
              @click="quickCreateHotspot('thong_tin_van_ban')"
            >
              <span class="vb-qm-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="14"
                  height="14"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" /></svg
              ></span>
              <span class="vb-qm-label">Thông tin (vẽ vùng)</span>
            </button>
            <button
              class="vb-qm-item vb-qm-more"
              @click="
                pendingPlacement.lon = quickMenu.lon;
                pendingPlacement.lat = quickMenu.lat;
                closeQuickMenu();
                modals.hotspotType = true;
              "
            >
              <span class="vb-qm-icon"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="14"
                  height="14"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" /></svg
              ></span>
              <span class="vb-qm-label">Loại khác…</span>
            </button>
            <button class="vb-qm-close" @click="closeQuickMenu()" title="Đóng">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="10"
                height="10"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </Transition>
      </div>

      <!-- RIGHT: CONTEXT-SENSITIVE INSPECTOR -->
      <div class="vb-right" :class="{ collapsed: uiState.rightCollapsed }">
        <div class="vb-panel-header vb-right-header">
          <template v-if="!uiState.rightCollapsed">
            <div class="vb-breadcrumb" v-if="activeScene">
              <span
                class="vb-breadcrumb-item"
                :class="{ active: uiState.rightView === 'scene' }"
                @click="navToScene()"
                >{{ activeScene.name }}</span
              >
              <template v-if="uiState.rightView !== 'scene'">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="10"
                  height="10"
                  class="vb-breadcrumb-sep"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <span
                  class="vb-breadcrumb-item"
                  :class="{ active: uiState.rightView === 'point-list' }"
                  @click="navToPointList()"
                  >Điểm nóng</span
                >
              </template>
              <template
                v-if="uiState.rightView === 'point-editor' && selectedHotspot"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="10"
                  height="10"
                  class="vb-breadcrumb-sep"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <span
                  class="vb-breadcrumb-item active"
                  style="max-width: 90px"
                  >{{
                    selectedHotspot.label ||
                    "Điểm " + (selectedHotspotIndex + 1)
                  }}</span
                >
              </template>
            </div>
            <span v-else class="vb-panel-title">Thuộc tính</span>
          </template>
          <button
            class="vb-collapse-toggle"
            @click="uiState.rightCollapsed = !uiState.rightCollapsed"
            :title="uiState.rightCollapsed ? 'Mở rộng' : 'Thu gọn'"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="16"
              height="16"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="15" y1="3" x2="15" y2="21" />
            </svg>
          </button>
        </div>
        <template v-if="!uiState.rightCollapsed">
          <div class="vb-right-scroll">
            <BaseAccordion
              title="Tour Audio"
              :open="!uiState.collapsed.tourAudio"
              :badge="tourAudioPreviewSrc ? 'Đã chọn' : ''"
              @toggle="uiState.collapsed.tourAudio = !uiState.collapsed.tourAudio"
            >
              <template #icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </template>
              <div class="vb-prop-row">
                <button class="vb-prop-btn vb-prop-btn-accent" @click="pickTourAudioFile">
                  {{ tourAudioPreviewSrc ? 'Thay file âm thanh' : 'Chọn file âm thanh' }}
                </button>
                <span v-if="tourAudio._fileName" class="vb-prop-filename">{{ tourAudio._fileName }}</span>
              </div>
              <div class="vb-prop-row">
                <label class="vb-prop-label">URL audio đã host</label>
                <input v-model.trim="tourAudio.file" class="vb-prop-input vb-prop-input-mono" placeholder="https://.../tour-audio.mp3" />
              </div>
              <div v-if="tourAudioPreviewSrc" class="vb-prop-row">
                <audio class="vb-audio-player" controls :src="tourAudioPreviewSrc"></audio>
              </div>
              <div class="vb-prop-row">
                <label class="vb-prop-label vb-hover-toggle-label"><input v-model="tourAudio.enabled" type="checkbox" :disabled="!tourAudioPreviewSrc" /> Bật Tour Audio</label>
              </div>
              <div class="vb-prop-row-inline">
                <div class="vb-prop-row" style="flex:1"><label class="vb-prop-label">Âm lượng cấu hình</label><input v-model.number="tourAudio.volume" class="vb-prop-input vb-prop-input-mono" type="number" min="0" max="1" step="0.1" /></div>
                <div class="vb-prop-row" style="flex:1"><label class="vb-prop-label">Ngôn ngữ</label><input v-model.trim="tourAudio.language" class="vb-prop-input" placeholder="vi" /></div>
              </div>
              <div class="vb-prop-row-inline">
                <div class="vb-prop-row" style="flex:1"><label class="vb-prop-label vb-hover-toggle-label"><input v-model="tourAudio.loop" type="checkbox" /> Lặp lại</label></div>
                <div class="vb-prop-row" style="flex:1"><label class="vb-prop-label vb-hover-toggle-label"><input v-model="tourAudio.autoplay" type="checkbox" /> Tự động phát</label></div>
              </div>
              <div class="vb-prop-row">
                <label class="vb-prop-label">Mô tả</label>
                <input v-model.trim="tourAudio.description" class="vb-prop-input" placeholder="Mô tả audio (tuỳ chọn)" />
              </div>
              <div v-if="tourAudioPreviewSrc" class="vb-prop-row">
                <button class="vb-prop-btn vb-prop-btn-danger" @click="clearTourAudio">Xoá cấu hình audio</button>
              </div>
            </BaseAccordion>

            <!-- EMPTY STATE -->
            <div v-if="!activeScene" class="vb-empty-state">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                />
              </svg>
              <p>Chọn một cảnh để chỉnh sửa</p>
            </div>

            <!-- VIEW: SCENE -->
            <SceneEditor
              v-else-if="uiState.rightView === 'scene'"
              :scene="activeScene"
              :collapsed="uiState.collapsed"
              :audio-preview-src="audioPreviewSrc"
              :audio-file-name="activeScene._audioFileName"
              @update:scene="updateScene"
              @update:view="updateView"
              @update:narration="updateNarration"
              @update:transition="updateTransition"
              @save-view="saveCurrentView"
              @replace-image="replaceImage"
              @pick-audio="pickAudioFile"
              @clear-narration="clearNarration"
              @navigate-to-points="navToPointList"
              @update:collapsed="
                (key, value) => {
                  uiState.collapsed[key] = value;
                }
              "
            />

            <!-- VIEW: POINT LIST -->
            <PointList
              v-else-if="uiState.rightView === 'point-list'"
              :scenes="scenes"
              :scene="activeScene"
              :selected-index="selectedHotspotIndex"
              @select="navToPointDetail"
              @remove="removeHotspot"
              @duplicate="duplicateHotspot"
              @toggle-lock="toggleLockHotspot"
              @add-point="startPlacingHotspot"
            />

            <!-- VIEW: POINT EDITOR -->
            <PointEditor
              v-else-if="
                uiState.rightView === 'point-editor' && selectedHotspot
              "
              :hotspot="selectedHotspot"
              :hotspot-index="selectedHotspotIndex"
              :scenes="scenes"
              :active-scene-index="activeSceneIndex"
              :target-scene="targetScene"
              :acc-open="uiState.hsAcc"
              @update="updateHotspot"
              @update-audio="updateHotspotAudio"
              @update:hover="updateHotspotHover"
              @update:content="updateHotspotContent"
              @select-info-image="handleHotspotInfoImageFile"
              @select-gallery-images="handleGalleryImageFiles"
              @select-video="handleHotspotVideoFile"
              @pick-audio="pickHotspotAudio"
              @clear-audio="clearHotspotAudio"
              @select-audio="pickHotspotAudio"
              @toggle-lock="toggleLockHotspot"
              @duplicate="duplicateHotspot"
              @remove="removeHotspot"
              @preview-target="previewTargetScene"
              @save-entry-view="saveEntryView"
              @clear-entry-view="clearEntryView"
              @toggle-acc="
                (key) => {
                  uiState.hsAcc[key] = !uiState.hsAcc[key];
                }
              "
            />
          </div>
        </template>
      </div>
    </div>

    <!-- STATUS BAR -->
    <div class="vb-statusbar">
      <div class="vb-status-group" v-show="activeSceneIndex >= 0">
        <span class="vb-status-chip"
          >LON <b>{{ hud.lon }}</b></span
        >
        <span class="vb-status-chip"
          >LAT <b>{{ hud.lat }}</b></span
        >
        <span class="vb-status-chip"
          >FOV <b>{{ hud.fov }}</b></span
        >
      </div>
      <div class="vb-spacer"></div>
      <div class="vb-status-group">
        <select
          class="vb-status-select"
          v-model="resizePresetId"
          @change="applyResizePreset"
          title="Image resize preset"
        >
          <option v-for="p in RESIZE_PRESETS" :key="p.id" :value="p.id">
            {{ p.label }}
          </option>
        </select>
      </div>
      <div class="vb-spacer"></div>
      <div class="vb-status-group">
        <span
          v-if="resizingCount > 0"
          class="vb-status-chip"
          style="color: var(--vb-warning)"
          >Đang xử lý {{ resizingCount }}...</span
        >
        <span class="vb-status-chip">{{ scenes.length }} cảnh</span>
        <div
          class="vb-api-mini"
          @click="openApiSettings"
          :title="apiStatus === 'on' ? api.baseUrl : 'Cài đặt API'"
        >
          <div class="vb-api-dot" :class="apiStatus"></div>
          <span>{{
            apiStatus === "on"
              ? "Đã kết nối"
              : apiStatus === "loading"
              ? "..."
              : "Ngoại tuyến"
          }}</span>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <div
      class="vb-modal-overlay"
      :class="{ show: modals.hotspotType }"
      @click.self="modals.hotspotType = false"
    >
      <div class="vb-modal vb-modal-hotspot-type">
        <div class="vb-modal-header">
          <h3>📍 Chọn loại Hotspot</h3>
          <button class="vb-modal-close" @click="modals.hotspotType = false">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="vb-modal-body vb-hs-type-picker">
          <p class="vb-hs-type-hint">
            Chọn loại điểm nóng để tạo tại lon:{{
              pendingPlacement.lon.toFixed
                ? pendingPlacement.lon.toFixed(1)
                : pendingPlacement.lon
            }}° lat:{{
              pendingPlacement.lat.toFixed
                ? pendingPlacement.lat.toFixed(1)
                : pendingPlacement.lat
            }}°
          </p>
          <div class="vb-hs-type-grid">
            <button
              class="vb-hs-type-option vb-hs-type-nav"
              @click="confirmHotspotType('chuyen_canh')"
            >
              <div class="vb-hs-type-option-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="24"
                  height="24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <div class="vb-hs-type-option-label">Chuyển cảnh</div>
              <div class="vb-hs-type-option-desc">Dẫn sang panorama khác</div>
            </button>
            <button
              class="vb-hs-type-option vb-hs-type-info"
              @click="startDrawingInfoAreaFromModal"
            >
              <div class="vb-hs-type-option-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="24"
                  height="24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div class="vb-hs-type-option-label">Thông tin</div>
              <div class="vb-hs-type-option-desc">Vẽ vùng, thêm văn bản và ảnh</div>
            </button>
            <button
              class="vb-hs-type-option vb-hs-type-gallery"
              @click="confirmHotspotType('thu_vien_anh')"
            >
              <div class="vb-hs-type-option-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="24"
                  height="24"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <div class="vb-hs-type-option-label">Thư viện ảnh</div>
              <div class="vb-hs-type-option-desc">Bộ sưu tập hình ảnh</div>
            </button>
            <button
              class="vb-hs-type-option vb-hs-type-video"
              @click="confirmHotspotType('phat_video')"
            >
              <div class="vb-hs-type-option-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="24"
                  height="24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon
                    points="10 8 16 12 10 16 10 8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>
              <div class="vb-hs-type-option-label">Phát video</div>
              <div class="vb-hs-type-option-desc">Nhúng video vào cảnh</div>
            </button>
            <button class="vb-hs-type-option vb-hs-type-audio" @click="confirmHotspotType('audio')">
              <div class="vb-hs-type-option-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M4 10v4h3l4 3V7l-4 3H4z" fill="currentColor" stroke="none"/><path d="M15 9.5a4 4 0 010 5M17.5 7a7 7 0 010 10"/></svg></div>
              <div class="vb-hs-type-option-label">Audio</div>
              <div class="vb-hs-type-option-desc">Thuyết minh tại vị trí này</div>
            </button>
            <button
              class="vb-hs-type-option vb-hs-type-pin"
              @click="confirmHotspotType('ghim_dia_danh')"
            >
              <div class="vb-hs-type-option-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="24"
                  height="24"
                >
                  <path
                    d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                  />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              </div>
              <div class="vb-hs-type-option-label">Địa danh</div>
              <div class="vb-hs-type-option-desc">Vẽ khu vực, nhãn và đường dẫn</div>
            </button>
            <button
              class="vb-hs-type-option vb-hs-type-generic"
              @click="confirmHotspotType(null)"
            >
              <div class="vb-hs-type-option-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="24"
                  height="24"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div class="vb-hs-type-option-label">POI chung</div>
              <div class="vb-hs-type-option-desc">
                Điểm nóng không phân loại
              </div>
            </button>
          </div>
        </div>
        <div class="vb-modal-footer">
          <button class="vb-btn" @click="modals.hotspotType = false">
            Hủy
          </button>
        </div>
      </div>
    </div>

    <div
      class="vb-modal-overlay"
      :class="{ show: modals.quickCreate }"
      @click.self="closeModal('quickCreate')"
    >
      <div class="vb-modal vb-modal-tour">
        <div class="vb-modal-header">
          <h3>Create or select tour</h3>
          <button class="vb-modal-close" @click="closeModal('quickCreate')">
            ×
          </button>
        </div>
        <div class="vb-modal-body vb-tour-form">
          <section class="vb-tour-form-section">
            <div class="vb-tour-form-head">
              <h4>1. Project</h4>
              <button
                class="vb-btn"
                @click="onQuickProjectModeChange(quickCreateForm.modeProject === 'new' ? 'existing' : 'new')"
              >
                {{
                  quickCreateForm.modeProject === "new"
                    ? "Select existing project"
                    : "+ Create new project"
                }}
              </button>
            </div>
            <template v-if="quickCreateForm.modeProject === 'new'">
              <label class="vb-form-label">
                Project name
                <input v-model="quickCreateForm.projectName" class="vb-form-input" />
              </label>
              <label class="vb-form-label">
                Description
                <textarea v-model="quickCreateForm.projectDescription" class="vb-form-input"></textarea>
              </label>
            </template>
            <label v-else class="vb-form-label">
              Select project
              <select
                v-model="quickCreateForm.projectId"
                class="vb-form-input"
                @change="loadQuickLocations"
              >
                <option value="">Select project</option>
                <option v-for="project in projects" :key="project.id" :value="String(project.id)">
                  {{ project.name }}
                </option>
              </select>
            </label>
          </section>

          <section class="vb-tour-form-section">
            <div class="vb-tour-form-head">
              <h4>2. Location</h4>
              <button
                class="vb-btn"
                :disabled="quickCreateForm.modeProject === 'new' && !quickCreateForm.projectName.trim()"
                @click="onQuickLocationModeChange(quickCreateForm.modeLocation === 'new' ? 'existing' : 'new')"
              >
                {{
                  quickCreateForm.modeLocation === "new"
                    ? "Select existing location"
                    : "+ Create new location"
                }}
              </button>
            </div>
            <template v-if="quickCreateForm.modeLocation === 'new'">
              <label class="vb-form-label">
                Location name
                <input v-model="quickCreateForm.locationName" class="vb-form-input" />
              </label>
              <label class="vb-form-label">
                Description
                <textarea v-model="quickCreateForm.locationDescription" class="vb-form-input"></textarea>
              </label>
              <div class="vb-form-grid">
                <label class="vb-form-label">
                  Latitude
                  <input v-model="quickCreateForm.latitude" class="vb-form-input" type="number" step="any" />
                </label>
                <label class="vb-form-label">
                  Longitude
                  <input v-model="quickCreateForm.longitude" class="vb-form-input" type="number" step="any" />
                </label>
              </div>
            </template>
            <label v-else class="vb-form-label">
              Select location
              <select
                v-model="quickCreateForm.locationId"
                class="vb-form-input"
                @change="loadQuickVersions"
              >
                <option value="">Select location</option>
                <option v-for="location in quickLocations" :key="location.id" :value="String(location.id)">
                  {{ location.name }}
                </option>
              </select>
            </label>
          </section>

          <section class="vb-tour-form-section">
            <div class="vb-tour-form-head">
              <h4>3. Version</h4>
              <button
                v-if="quickCreateForm.modeLocation !== 'new'"
                class="vb-btn"
                @click="quickCreateForm.modeVersion = quickCreateForm.modeVersion === 'new' ? 'existing' : 'new'"
              >
                {{
                  quickCreateForm.modeVersion === "new"
                    ? "Select existing version"
                    : "+ Create new version"
                }}
              </button>
            </div>
            <template v-if="quickCreateForm.modeVersion === 'new' || quickCreateForm.modeLocation === 'new'">
              <label class="vb-form-label">
                New draft version label
                <input
                  v-model="quickCreateForm.versionLabel"
                  class="vb-form-input"
                  placeholder="Leave empty to auto-name"
                />
              </label>
              <label
                v-if="quickCreateForm.modeLocation !== 'new' && quickVersions.length"
                class="vb-form-label"
              >
                Inherit from version
                <select v-model="quickCreateForm.sourceVersionId" class="vb-form-input">
                  <option value="">Create empty version</option>
                  <option v-for="item in quickVersions" :key="item.id" :value="String(item.id)">
                    v{{ item.version_number }} - {{ item.status }}
                  </option>
                </select>
              </label>
            </template>
            <label v-else class="vb-form-label">
              Select version
              <select v-model="quickCreateForm.versionId" class="vb-form-input">
                <option value="">Select version</option>
                <option v-for="item in quickVersions" :key="item.id" :value="String(item.id)">
                  v{{ item.version_number }} - {{ item.status }}
                </option>
              </select>
            </label>
          </section>
        </div>
        <div class="vb-modal-footer">
          <button class="vb-btn" @click="closeModal('quickCreate')">Cancel</button>
          <button
            class="vb-btn vb-btn-accent"
            :disabled="quickCreateLoading"
            @click="createOrSelectTour"
          >
            {{ quickCreateLoading ? "Creating..." : "Create/select tour" }}
          </button>
        </div>
      </div>
    </div>

    <div class="vb-modal-overlay" :class="{ show: modals.export }">
      <div class="vb-modal">
        <div class="vb-modal-header">
          <h3>📦 Xuất dữ liệu Tour</h3>
          <button class="vb-modal-close" @click="closeModal('export')">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="vb-modal-body">
          <textarea
            class="vb-json-preview"
            readonly
            :value="exportJsonText"
          ></textarea>
        </div>
        <div class="vb-modal-footer">
          <button class="vb-btn" @click="closeModal('export')">Đóng</button>
          <button class="vb-btn" @click="downloadExportJSON">⬇ Tải file</button>
          <button class="vb-btn vb-btn-primary" @click="copyExportJSON">
            📋 Copy
          </button>
        </div>
      </div>
    </div>

    <div class="vb-modal-overlay" :class="{ show: modals.import }">
      <div class="vb-modal">
        <div class="vb-modal-header">
          <h3>📥 Nhập JSON</h3>
          <button class="vb-modal-close" @click="closeModal('import')">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="vb-modal-body">
          <textarea
            class="vb-json-preview vb-json-editable"
            v-model="importJsonText"
            placeholder="Dán JSON vào đây..."
          ></textarea>
        </div>
        <div class="vb-modal-footer">
          <button class="vb-btn" @click="closeModal('import')">Hủy</button>
          <button class="vb-btn vb-btn-primary" @click="doImportJSON">
            Nhập
          </button>
        </div>
      </div>
    </div>

    <div class="vb-modal-overlay" :class="{ show: modals.api }">
      <div class="vb-modal" style="width: 480px">
        <div class="vb-modal-header">
          <h3>⚡ Máy chủ API</h3>
          <button class="vb-modal-close" @click="closeModal('api')">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="vb-modal-body">
          <div style="margin-bottom: 14px">
            <label class="vb-prop-label">Địa chỉ API</label>
            <div style="display: flex; gap: 8px">
              <input
                class="vb-prop-input vb-prop-input-mono"
                v-model="apiUrlInput"
                placeholder="http://localhost:8360"
                style="flex: 1"
              />
              <button class="vb-btn" @click="testApiConnection">
                {{ apiTestBtnLoading ? "⏳..." : "🔌 Kiểm tra" }}
              </button>
            </div>
          </div>
          <div
            v-if="apiTestResult.show"
            class="vb-api-test-result"
            :class="{ ok: apiTestResult.ok, err: !apiTestResult.ok }"
          >
            {{ apiTestResult.msg }}
          </div>
        </div>
        <div class="vb-modal-footer">
          <button class="vb-btn" @click="closeModal('api')">Hủy</button>
          <button class="vb-btn vb-btn-primary" @click="saveApiSettings">
            💾 Lưu
          </button>
        </div>
      </div>
    </div>

    <div class="vb-modal-overlay" :class="{ show: modals.load }">
      <div class="vb-modal" style="width: 520px">
        <div class="vb-modal-header">
          <h3>📂 Chọn Tour</h3>
          <button class="vb-modal-close" @click="closeModal('load')">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="vb-modal-body">
          <div v-if="loadModalLoading" class="vb-empty-state">⏳...</div>
          <div v-else-if="loadModalTours.length === 0" class="vb-empty-state">
            Chưa có tour
          </div>
          <template v-else>
            <div
              v-for="t in loadModalTours"
              :key="t.tour_id"
              class="vb-tour-row"
              @click="loadTourById(t.tour_id)"
            >
              <div class="vb-tour-icon">🗺️</div>
              <div style="flex: 1; min-width: 0">
                <div style="font-size: 13px; font-weight: 500">
                  {{ t.title || "Untitled" }}
                </div>
                <div class="vb-tour-meta">
                  {{ t.scene_count }} scenes ·
                  {{
                    t.updated_at
                      ? new Date(t.updated_at * 1000).toLocaleString("vi-VN")
                      : "—"
                  }}
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="vb-modal-footer">
          <button class="vb-btn" @click="closeModal('load')">Đóng</button>
        </div>
      </div>
    </div>

    <div class="vb-toast" :class="[toastState.type, { show: toastState.show }]">
      {{ toastState.msg }}
    </div>
  </div>
</template>

<style>
/* ── All original CSS from Vr360Builder.vue ── */
.vb-app {
  --vb-bg-0: #0c0c14;
  --vb-bg-1: #12121c;
  --vb-bg-2: #1a1a28;
  --vb-bg-3: #222234;
  --vb-bg-4: #2a2a40;
  --vb-border: rgba(255, 255, 255, 0.06);
  --vb-border-hover: rgba(255, 255, 255, 0.12);
  --vb-primary: #6c5ce7;
  --vb-primary-light: #a29bfe;
  --vb-primary-dim: rgba(108, 92, 231, 0.15);
  --vb-accent: #00cec9;
  --vb-accent-dim: rgba(0, 206, 201, 0.15);
  --vb-danger: #ff6b6b;
  --vb-danger-dim: rgba(255, 107, 107, 0.15);
  --vb-warning: #feca57;
  --vb-text: #e8e8f0;
  --vb-text-muted: rgba(232, 232, 240, 0.5);
  --vb-text-dim: rgba(232, 232, 240, 0.3);
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: "Segoe UI", sans-serif;
  background: var(--vb-bg-0);
  color: var(--vb-text);
  font-size: 13px;
}
.vb-app * {
  box-sizing: border-box;
}
.vb-topbar {
  height: 40px;
  flex-shrink: 0;
  background: var(--vb-bg-1);
  border-bottom: 1px solid var(--vb-border);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 6px;
  z-index: 100;
  position: relative;
}
.vb-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.vb-brand {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(
    135deg,
    var(--vb-primary-light),
    var(--vb-accent)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  flex-shrink: 0;
}
.vb-menu-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border: 1px solid transparent;
  background: none;
  color: var(--vb-text-muted);
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.15s;
}
.vb-menu-trigger:hover {
  background: var(--vb-bg-3);
  color: var(--vb-text);
}
.vb-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 60px;
  min-width: 200px;
  background: var(--vb-bg-2);
  border: 1px solid var(--vb-border-hover);
  border-radius: 8px;
  padding: 4px;
  z-index: 200;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}
.vb-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  color: var(--vb-text-muted);
  transition: all 0.12s;
}
.vb-menu-item:hover {
  background: var(--vb-bg-3);
  color: var(--vb-text);
}
.vb-menu-item svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.vb-menu-divider {
  height: 1px;
  background: var(--vb-border);
  margin: 4px 8px;
}
.vb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--vb-border);
  background: var(--vb-bg-2);
  color: var(--vb-text-muted);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.vb-btn:hover {
  background: var(--vb-bg-3);
  color: var(--vb-text);
  border-color: var(--vb-border-hover);
}
.vb-btn-primary {
  background: var(--vb-primary);
  color: #fff;
  border-color: var(--vb-primary);
}
.vb-btn-primary:hover {
  background: var(--vb-primary-light);
}
.vb-btn-success {
  background: #10b981;
  color: #fff;
  border-color: rgba(16, 185, 129, 0.75);
}
.vb-btn-success:hover {
  background: #059669;
  color: #fff;
}
.vb-btn-accent {
  background: var(--vb-accent-dim);
  color: var(--vb-accent);
  border-color: rgba(0, 206, 201, 0.3);
}
.vb-btn svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}
.vb-top-select {
  height: 30px;
  min-width: 150px;
  max-width: 210px;
  padding: 0 30px 0 10px;
  border: 1px solid var(--vb-border-hover);
  background: #fff;
  color: #0f172a;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  outline: none;
}
.vb-top-select-version {
  min-width: 130px;
}
.vb-top-select:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
.vb-spacer {
  flex: 1;
}
.vb-left {
  width: 240px;
  flex-shrink: 0;
  background: var(--vb-bg-1);
  border-right: 1px solid var(--vb-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s ease;
}
.vb-left.collapsed {
  width: 40px;
}
.vb-panel-header {
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--vb-border);
  flex-shrink: 0;
  gap: 6px;
  min-height: 40px;
}
.vb-panel-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--vb-text-muted);
}
.vb-collapse-toggle {
  background: none;
  border: none;
  color: var(--vb-text-dim);
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vb-collapse-toggle:hover {
  color: var(--vb-text);
  background: var(--vb-bg-3);
}
.vb-scene-count {
  font-family: monospace;
  font-size: 11px;
  color: var(--vb-text-dim);
}
.vb-scene-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}
.vb-scene-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 4px;
  background: var(--vb-bg-2);
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  position: relative;
}
.vb-scene-card:hover {
  background: var(--vb-bg-3);
  border-color: var(--vb-border-hover);
}
.vb-scene-card.active {
  border-color: var(--vb-primary);
  background: var(--vb-primary-dim);
}
.vb-scene-card.dragover {
  border-color: var(--vb-accent);
  border-style: dashed;
}
.vb-scene-thumb {
  width: 56px;
  height: 36px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--vb-bg-4);
  flex-shrink: 0;
}
.vb-scene-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.vb-scene-meta {
  flex: 1;
  min-width: 0;
}
.vb-scene-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--vb-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vb-scene-info {
  font-size: 10px;
  color: var(--vb-text-dim);
  margin-top: 2px;
  font-family: monospace;
}
.vb-scene-num {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 9px;
  font-weight: 700;
  color: var(--vb-text-dim);
  background: var(--vb-bg-0);
  padding: 1px 5px;
  border-radius: 3px;
  font-family: monospace;
}
.vb-scene-delete {
  opacity: 0;
  background: none;
  border: none;
  color: var(--vb-danger);
  cursor: pointer;
  padding: 4px;
  transition: opacity 0.15s;
  flex-shrink: 0;
}
.vb-scene-card:hover .vb-scene-delete {
  opacity: 1;
}
.vb-scene-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 8px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  background: #10b981;
  color: #fff;
}
.vb-add-area {
  margin: 8px;
  padding: 24px;
  text-align: center;
  border: 2px dashed var(--vb-border);
  border-radius: 8px;
  color: var(--vb-text-dim);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  flex-shrink: 0;
}
.vb-add-area:hover {
  border-color: var(--vb-primary);
  color: var(--vb-primary-light);
}
.vb-add-area.dragover {
  border-color: var(--vb-accent);
  background: var(--vb-accent-dim);
  color: var(--vb-accent);
}
.vb-center {
  flex: 1;
  position: relative;
  background: var(--vb-bg-0);
  overflow: hidden;
}
.vb-canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
  display: block;
}
.vb-canvas:active {
  cursor: grabbing;
}
.vb-canvas.placing-hotspot {
  cursor: crosshair !important;
}
.vb-info-area-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  pointer-events: none;
}
.vb-info-area-group {
  pointer-events: auto;
  cursor: pointer;
}
.vb-info-area-fill {
  fill: rgba(34, 211, 238, 0.16);
  transition: fill 0.16s ease;
}
.vb-info-area-line,
.vb-info-area-draft-line {
  fill: none;
  stroke: rgba(103, 232, 249, 0.92);
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-dasharray: 2 8;
  stroke-linecap: round;
  filter: drop-shadow(0 0 7px rgba(34, 211, 238, 0.28));
}
.vb-info-area-group:hover .vb-info-area-fill,
.vb-info-area-group.selected .vb-info-area-fill {
  fill: rgba(34, 211, 238, 0.24);
}
.vb-info-area-group.selected .vb-info-area-line {
  stroke: rgba(255, 225, 82, 0.96);
}
.vb-info-area-node {
  fill: var(--vb-accent);
  stroke: var(--vb-bg-0);
  stroke-width: 2;
}
.vb-info-area-toolbar {
  position: absolute;
  top: 88px;
  left: 50%;
  z-index: 24;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--vb-border);
  border-radius: 14px;
  background: rgba(18, 18, 28, 0.88);
  box-shadow: var(--vb-shadow);
  backdrop-filter: blur(12px);
}
.vb-info-area-toolbar span {
  padding: 0 6px;
  color: var(--vb-text-muted);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}
.vb-info-area-toolbar .vb-btn {
  min-height: 32px;
  padding: 7px 12px;
  font-size: 12px;
}
.area-landmark-layer {
  z-index: 9;
}
.area-landmark polygon {
  fill-opacity: 0.3;
  filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.28));
  pointer-events: none;
}
.area-landmark.is-selected polygon {
  filter: drop-shadow(0 0 10px rgba(253, 224, 71, 0.78));
  stroke: #fde047;
}
.area-landmark line {
  pointer-events: none;
  stroke-linecap: round;
}
.area-landmark circle {
  pointer-events: auto;
}
.area-landmark .area-landmark-vertex {
  filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.96));
}
.area-landmark.is-selected .area-landmark-vertex {
  r: 6px;
  stroke: #fde047;
}
.area-landmark-label {
  align-items: center;
  background: rgba(18, 18, 28, 0.92);
  border: 1px solid #fbbf24;
  border-radius: 8px;
  color: #fff;
  cursor: grab;
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  left: 0;
  padding: 8px 10px;
  position: absolute;
  top: 0;
  z-index: 10;
}
.area-landmark-label:active { cursor: grabbing; }
.preview-hotspot-container .hotspot {
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: center center;
  pointer-events: auto;
  z-index: 2;
  will-change: left, top, transform;
}
.preview-hotspot-container .hotspot.hidden {
  display: none;
}
.preview-hotspot-container .hotspot-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  pointer-events: auto;
}
.preview-hotspot-container .hotspot-marker::before {
  content: "";
  position: absolute;
  top: 16px;
  left: 50%;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 999px;
  transform: translate(-50%, -50%);
  animation: vbHotspotPulse 2.4s ease-out infinite;
  pointer-events: none;
}
.preview-hotspot-container .hotspot-icon {
  position: relative;
  z-index: 1;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: linear-gradient(135deg, #7b61ff, #4f7cff);
  color: #fff;
  border: 2px solid rgba(255, 225, 82, 0.92);
  box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.14), 0 7px 16px rgba(0, 0, 0, 0.28);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.preview-hotspot-container .hotspot-icon svg {
  width: 14px;
  height: 14px;
}
.preview-hotspot-container .hotspot-label {
  position: relative;
  z-index: 1;
  max-width: 120px;
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(7, 8, 12, 0.78);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.preview-hotspot-container .hotspot-walk {
  position: relative;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  pointer-events: auto;
  animation: vbHotspotFloat 1.25s ease-in-out infinite;
}
.preview-hotspot-container .hotspot-marker-nav::before {
  display: none;
}
.preview-hotspot-container .hotspot-walk::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: rgba(22, 22, 28, 0.38);
  box-shadow: inset 0 0 18px rgba(255, 255, 255, 0.08), 0 8px 16px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(3px);
  pointer-events: none;
}
.preview-hotspot-container .hotspot-walk::after {
  content: "";
  position: absolute;
  z-index: 2;
  width: 14px;
  height: 14px;
  border-top: 4px solid rgba(255, 255, 255, 0.96);
  border-left: 4px solid rgba(255, 255, 255, 0.96);
  border-radius: 2px;
  transform: translateY(3px) rotate(45deg);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
  pointer-events: none;
}
.preview-hotspot-container .hotspot-walk-img {
  position: relative;
  z-index: 1;
  width: 0;
  height: 0;
  opacity: 0;
  object-fit: contain;
  filter: none;
  transition: transform 0.18s ease, filter 0.18s ease;
}
.preview-hotspot-container .hotspot-edit-ring {
  position: absolute;
  top: 16px;
  left: 50%;
  width: 44px;
  height: 44px;
  border: 1px dashed rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.preview-hotspot-container .hotspot-selected .hotspot-icon,
.preview-hotspot-container .hotspot-selected .hotspot-walk::before {
  border-color: rgba(255, 225, 82, 0.65);
  box-shadow: 0 0 0 3px rgba(255, 225, 82, 0.12), 0 8px 16px rgba(0, 0, 0, 0.22);
}
.preview-hotspot-container .hotspot:hover .hotspot-icon {
  transform: scale(1.08);
  box-shadow: 0 0 0 5px rgba(123, 97, 255, 0.15), 0 10px 20px rgba(0, 0, 0, 0.3);
}
.preview-hotspot-container .hotspot:hover .hotspot-walk {
  transform: scale(1.08);
}
.preview-hotspot-container .hotspot:hover .hotspot-walk::before {
  border-color: rgba(255, 255, 255, 0.42);
  box-shadow:
    0 0 0 5px rgba(255, 255, 255, 0.08),
    0 0 18px rgba(255, 255, 255, 0.28),
    inset 0 0 18px rgba(255, 255, 255, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.22);
}
@keyframes vbHotspotPulse {
  0% {
    opacity: 0.34;
    transform: translate(-50%, -50%) scale(0.9);
  }
  70% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.45);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.45);
  }
}
@keyframes vbHotspotFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}
.vb-viewer-empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--vb-text-dim);
  z-index: 5;
}
.vb-viewer-empty svg {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
}
.vb-crosshair-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 15;
  display: none;
}
.vb-crosshair-overlay.active {
  display: block;
}
.vb-crosshair-msg {
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vb-accent);
  color: var(--vb-bg-0);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
}
.vb-preview-banner {
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid var(--vb-accent);
  color: var(--vb-text);
  padding: 8px 12px 8px 16px;
  border-radius: 10px;
  font-size: 12px;
  white-space: nowrap;
}
.vb-canvas-toolbar {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 18;
  display: flex;
  align-items: center;
  gap: 2px;
  background: rgba(12, 12, 20, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid var(--vb-border-hover);
  border-radius: 10px;
  padding: 4px;
}
.vb-tool-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--vb-text-muted);
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.15s;
}
.vb-tool-btn:hover {
  background: var(--vb-bg-3);
  color: var(--vb-text);
}
.vb-tool-btn.active {
  background: var(--vb-primary-dim);
  color: var(--vb-primary-light);
}
.vb-tool-btn svg {
  width: 18px;
  height: 18px;
}
.vb-tool-sep {
  width: 1px;
  height: 20px;
  background: var(--vb-border);
  margin: 0 2px;
}
.vb-right {
  width: 300px;
  flex-shrink: 0;
  background: var(--vb-bg-1);
  border-left: 1px solid var(--vb-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s ease;
}
.vb-right.collapsed {
  width: 40px;
}
.vb-right-header {
  min-height: 40px;
}
.vb-breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  flex: 1;
}
.vb-breadcrumb-item {
  font-size: 11px;
  font-weight: 500;
  color: var(--vb-text-dim);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
  transition: color 0.15s;
}
.vb-breadcrumb-item:hover {
  color: var(--vb-text);
}
.vb-breadcrumb-item.active {
  color: var(--vb-text);
  font-weight: 600;
  cursor: default;
}
.vb-breadcrumb-sep {
  flex-shrink: 0;
  color: var(--vb-text-dim);
}
.vb-right-scroll {
  flex: 1;
  overflow-y: auto;
}
.vb-section-action {
  background: none;
  border: 1px solid var(--vb-border);
  color: var(--vb-text-dim);
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.vb-section-action:hover {
  color: var(--vb-accent);
  border-color: var(--vb-accent);
  background: var(--vb-accent-dim);
}
.vb-hover-toggle-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: var(--vb-text-muted);
}
.vb-prop-row {
  margin-bottom: 10px;
}
.vb-prop-label {
  font-size: 11px;
  color: var(--vb-text-muted);
  margin-bottom: 4px;
  display: block;
}
.vb-prop-input {
  width: 100%;
  padding: 8px 10px;
  background: var(--vb-bg-2);
  border: 1px solid var(--vb-border);
  border-radius: 6px;
  color: var(--vb-text);
  font-size: 12px;
  outline: none;
}
.vb-prop-input:focus {
  border-color: var(--vb-primary);
}
.vb-prop-input-mono {
  font-family: monospace;
  font-size: 11px;
}
textarea.vb-prop-input {
  resize: vertical;
  min-height: 60px;
  line-height: 1.5;
}
.vb-prop-row-inline {
  display: flex;
  gap: 8px;
}
.vb-prop-row-inline .vb-prop-row {
  flex: 1;
  margin-bottom: 0;
}
.vb-info-area-note {
  margin-bottom: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(34, 211, 238, 0.18);
  border-radius: 12px;
  background: rgba(34, 211, 238, 0.08);
  color: var(--vb-text-muted);
  font-size: 12px;
  line-height: 1.45;
}
.vb-info-image-box {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
  margin-bottom: 10px;
}
.vb-info-image-preview {
  min-height: 82px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid var(--vb-border);
  border-radius: 12px;
  background: var(--vb-bg-2);
  color: var(--vb-text-dim);
  font-size: 12px;
}
.vb-info-image-preview img {
  width: 100%;
  height: 100%;
  min-height: 82px;
  object-fit: cover;
}
.vb-info-image-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  min-height: 82px;
  padding: 12px;
  border: 1px dashed rgba(34, 211, 238, 0.3);
  border-radius: 12px;
  background: rgba(34, 211, 238, 0.04);
  cursor: pointer;
  transition: border-color 0.16s ease, background 0.16s ease;
}
.vb-info-image-upload:hover {
  border-color: var(--vb-accent);
  background: rgba(34, 211, 238, 0.08);
}
.vb-info-image-upload input {
  display: none;
}
.vb-info-image-upload span {
  color: var(--vb-accent);
  font-weight: 800;
}
.vb-info-image-upload small {
  color: var(--vb-text-muted);
  font-size: 11px;
  line-height: 1.35;
}
.vb-prop-btn {
  width: 100%;
  padding: 9px;
  border: 1px solid var(--vb-border);
  background: var(--vb-bg-2);
  color: var(--vb-text-muted);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.vb-prop-btn:hover {
  background: var(--vb-bg-3);
  color: var(--vb-text);
}
.vb-prop-btn-primary {
  background: var(--vb-primary-dim);
  color: var(--vb-primary-light);
  border-color: var(--vb-primary);
}
.vb-prop-btn-primary:hover {
  background: var(--vb-primary);
  color: #fff;
}
.vb-prop-btn-accent {
  background: var(--vb-accent-dim);
  color: var(--vb-accent);
  border-color: rgba(0, 206, 201, 0.3);
}
.vb-prop-btn-danger {
  color: var(--vb-danger);
  border-color: rgba(255, 107, 107, 0.2);
}
.vb-prop-btn-danger:hover {
  background: var(--vb-danger-dim);
}
.vb-prop-thumb {
  width: 80px;
  height: 45px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--vb-bg-3);
  flex-shrink: 0;
  border: 1px solid var(--vb-border);
}
.vb-prop-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.vb-prop-filename {
  font-size: 10px;
  color: var(--vb-text-dim);
  font-family: monospace;
  display: block;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vb-prop-filesize {
  font-size: 10px;
  color: var(--vb-accent);
  font-family: monospace;
  display: block;
  margin-top: 2px;
}
.vb-gps-value {
  font-size: 11px;
  color: var(--vb-text-muted);
  font-family: monospace;
}
.vb-audio-player {
  width: 100%;
  height: 34px;
  border-radius: 8px;
}
.vb-hs-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.vb-hs-empty {
  text-align: center;
  color: var(--vb-text-dim);
  padding: 16px;
  font-size: 11px;
}
.vb-hs-card {
  padding: 10px;
  background: var(--vb-bg-2);
  border: 1px solid var(--vb-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.vb-hs-card:hover {
  border-color: var(--vb-border-hover);
}
.vb-hs-card.selected {
  border-color: var(--vb-warning);
  background: rgba(254, 202, 87, 0.05);
}
.vb-hs-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.vb-hs-card-title {
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.vb-hs-idx {
  background: var(--vb-primary-dim);
  color: var(--vb-primary-light);
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 700;
  font-family: monospace;
}
.vb-hs-card-actions {
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.15s;
}
.vb-hs-card:hover .vb-hs-card-actions {
  opacity: 1;
}
.vb-hs-card-btn {
  background: none;
  border: none;
  color: var(--vb-text-dim);
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
}
.vb-hs-card-btn:hover {
  color: var(--vb-primary-light);
}
.vb-hs-card-btn-delete:hover {
  color: var(--vb-danger);
}
.vb-hs-type-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
.vb-hs-badge-nav,
.vb-hs-badge-chuyen_canh {
  background: var(--vb-accent-dim);
  color: var(--vb-accent);
}
.vb-hs-badge-poi,
.vb-hs-badge-thong_tin_van_ban {
  background: var(--vb-primary-dim);
  color: var(--vb-primary-light);
}
.vb-hs-badge-thu_vien_anh {
  background: rgba(255, 159, 67, 0.15);
  color: #ff9f43;
}
.vb-hs-badge-phat_video {
  background: rgba(255, 71, 87, 0.15);
  color: #ff4757;
}
.vb-hs-badge-ghim_dia_danh {
  background: rgba(255, 138, 43, 0.15);
  color: #ff8a2b;
}
.vb-hs-shortcuts {
  margin-top: 8px;
  text-align: center;
  font-size: 10px;
  color: var(--vb-text-dim);
  font-family: monospace;
}
.vb-hs-card-coords {
  font-family: monospace;
  font-size: 10px;
  color: var(--vb-text-dim);
}
.vb-empty-state {
  text-align: center;
  padding: 32px 16px;
  color: var(--vb-text-dim);
  font-size: 12px;
  line-height: 1.6;
}
.vb-empty-state svg {
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
  opacity: 0.3;
}
.vb-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  z-index: 9999;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}
.vb-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.vb-toast.success {
  background: #10b981;
  color: #fff;
}
.vb-toast.info {
  background: var(--vb-primary);
  color: #fff;
}
.vb-toast.error {
  background: var(--vb-danger);
  color: #fff;
}
.vb-statusbar {
  height: 28px;
  flex-shrink: 0;
  background: var(--vb-bg-1);
  border-top: 1px solid var(--vb-border);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 12px;
  z-index: 100;
  font-size: 11px;
}
.vb-status-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.vb-status-chip {
  font-family: monospace;
  font-size: 10px;
  color: var(--vb-text-dim);
}
.vb-status-chip b {
  color: var(--vb-accent);
  font-weight: 500;
}
.vb-status-select {
  background: var(--vb-bg-2);
  color: var(--vb-text-muted);
  border: 1px solid var(--vb-border);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 10px;
  outline: none;
}
.vb-api-mini {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 10px;
  color: var(--vb-text-dim);
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.15s;
}
.vb-api-mini:hover {
  background: var(--vb-bg-3);
  color: var(--vb-text-muted);
}
.vb-api-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.vb-api-dot.off {
  background: var(--vb-text-dim);
}
.vb-api-dot.on {
  background: #10b981;
  box-shadow: 0 0 5px #10b981;
}
.vb-api-dot.loading {
  background: var(--vb-warning);
}
.vb-api-test-result {
  padding: 10px;
  border-radius: 6px;
  font-size: 12px;
}
.vb-api-test-result.ok {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}
.vb-api-test-result.err {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  color: #ff6b6b;
}
.vb-tour-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--vb-bg-2);
  border: 1px solid var(--vb-border);
  border-radius: 8px;
  margin-bottom: 6px;
  cursor: pointer;
}
.vb-tour-row:hover {
  border-color: var(--vb-primary);
}
.vb-tour-icon {
  width: 40px;
  height: 40px;
  background: var(--vb-primary-dim);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.vb-tour-meta {
  font-size: 10px;
  color: var(--vb-text-dim);
  font-family: monospace;
  margin-top: 2px;
}
.vb-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.6);
  display: none;
  align-items: center;
  justify-content: center;
}
.vb-modal-overlay.show {
  display: flex;
}
.vb-modal {
  background: var(--vb-bg-1);
  border: 1px solid var(--vb-border);
  border-radius: 12px;
  width: 560px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
.vb-modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--vb-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.vb-modal-header h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}
.vb-modal-close {
  background: none;
  border: none;
  color: var(--vb-text-muted);
  cursor: pointer;
  padding: 4px;
}
.vb-modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}
.vb-modal-footer {
  padding: 14px 20px;
  border-top: 1px solid var(--vb-border);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.vb-modal-tour {
  width: min(760px, calc(100vw - 32px));
}
.vb-tour-form {
  display: grid;
  gap: 12px;
  padding: 16px;
}
.vb-tour-form-section {
  border: 1px solid var(--vb-border);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  padding: 14px;
}
.vb-tour-form-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}
.vb-tour-form-head h4 {
  margin: 0;
  font-size: 14px;
}
.vb-form-label {
  display: grid;
  gap: 6px;
  margin-bottom: 10px;
  color: var(--vb-text-muted);
  font-size: 12px;
  font-weight: 600;
}
.vb-form-input {
  width: 100%;
  min-height: 34px;
  border: 1px solid var(--vb-border-hover);
  border-radius: 8px;
  background: var(--vb-bg-2);
  color: var(--vb-text);
  padding: 8px 10px;
  font-size: 12px;
  outline: none;
}
textarea.vb-form-input {
  min-height: 70px;
  resize: vertical;
}
.vb-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.vb-json-preview {
  width: 100%;
  min-height: 300px;
  max-height: 50vh;
  background: var(--vb-bg-0);
  border: 1px solid var(--vb-border);
  border-radius: 8px;
  padding: 14px;
  font-family: monospace;
  font-size: 11px;
  line-height: 1.6;
  color: var(--vb-accent);
  resize: vertical;
  outline: none;
}
.vb-json-editable {
  color: var(--vb-text);
}
.vb-quick-menu {
  position: absolute;
  z-index: 50;
  width: 164px;
  background: var(--vb-bg-2);
  border: 1px solid var(--vb-border-hover);
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.04);
  pointer-events: auto;
}
.vb-qm-title {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--vb-text-dim);
  padding: 6px 10px 4px;
}
.vb-qm-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: var(--vb-text-muted);
  border-radius: 7px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  transition: background 0.12s, color 0.12s;
}
.vb-qm-item:hover {
  background: var(--vb-bg-3);
  color: var(--vb-text);
}
.vb-qm-icon {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.vb-qm-nav .vb-qm-icon {
  background: rgba(0, 206, 201, 0.15);
  color: var(--vb-accent);
}
.vb-qm-nav:hover {
  color: var(--vb-accent);
}
.vb-qm-poi .vb-qm-icon {
  background: var(--vb-primary-dim);
  color: var(--vb-primary-light);
}
.vb-qm-poi:hover {
  color: var(--vb-primary-light);
}
.vb-qm-more .vb-qm-icon {
  background: var(--vb-bg-4);
  color: var(--vb-text-dim);
}
.vb-qm-label {
  flex: 1;
}
.vb-qm-close {
  position: absolute;
  top: 6px;
  right: 6px;
  background: none;
  border: none;
  color: var(--vb-text-dim);
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vb-qm-close:hover {
  color: var(--vb-text);
  background: var(--vb-bg-3);
}
.qm-enter-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}
.qm-leave-active {
  transition: opacity 0.08s ease, transform 0.08s ease;
}
.qm-enter-from,
.qm-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(-4px);
}
.vb-nav-preview-panel {
  margin: 10px 0;
  border: 1px solid var(--vb-accent);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vb-bg-2);
}
.vb-nav-preview-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  font-size: 11px;
  color: var(--vb-accent);
  background: var(--vb-accent-dim);
  border-bottom: 1px solid rgba(0, 206, 201, 0.2);
}
.vb-nav-preview-header strong {
  color: var(--vb-text);
}
.vb-nav-preview-thumb {
  position: relative;
  cursor: pointer;
  height: 90px;
  overflow: hidden;
}
.vb-nav-preview-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.vb-nav-preview-thumb:hover img {
  transform: scale(1.05);
}
.vb-nav-preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.2s;
}
.vb-nav-preview-thumb:hover .vb-nav-preview-overlay {
  opacity: 1;
}
.vb-nav-preview-info {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 10px;
  font-size: 10px;
  font-family: monospace;
  border-bottom: 1px solid var(--vb-border);
}
.vb-nav-entry-custom {
  color: var(--vb-warning);
}
.vb-nav-entry-default {
  color: var(--vb-text-dim);
}
.vb-nav-preview-actions {
  display: flex;
  gap: 6px;
  padding: 8px 10px;
}
.vb-nav-preview-actions .vb-prop-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 11px;
}
.vb-modal-hotspot-type {
  width: 560px;
}
.vb-hs-type-hint {
  font-size: 11px;
  color: var(--vb-text-dim);
  font-family: monospace;
  margin: 0 0 16px;
}
.vb-hs-type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.vb-hs-type-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 10px;
  border: 1px solid var(--vb-border);
  background: var(--vb-bg-2);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.18s;
  text-align: center;
}
.vb-hs-type-option:hover {
  transform: translateY(-2px);
  border-color: var(--vb-primary);
  background: var(--vb-bg-3);
}
.vb-hs-type-option-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.vb-hs-type-option-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vb-text);
}
.vb-hs-type-option-desc {
  font-size: 10px;
  color: var(--vb-text-dim);
  line-height: 1.4;
}
.vb-hs-type-nav .vb-hs-type-option-icon {
  background: rgba(0, 206, 201, 0.15);
  color: var(--vb-accent);
}
.vb-hs-type-nav:hover {
  border-color: var(--vb-accent);
}
.vb-hs-type-info .vb-hs-type-option-icon {
  background: var(--vb-primary-dim);
  color: var(--vb-primary-light);
}
.vb-hs-type-info:hover {
  border-color: var(--vb-primary);
}
.vb-hs-type-gallery .vb-hs-type-option-icon {
  background: rgba(255, 159, 67, 0.15);
  color: #ff9f43;
}
.vb-hs-type-gallery:hover {
  border-color: #ff9f43;
}
.vb-hs-type-video .vb-hs-type-option-icon {
  background: rgba(255, 71, 87, 0.15);
  color: #ff4757;
}
.vb-hs-type-video:hover {
  border-color: #ff4757;
}
.vb-hs-type-audio .vb-hs-type-option-icon {
  background: rgba(250, 204, 21, 0.15);
  color: #facc15;
}
.vb-hs-type-audio:hover {
  border-color: #facc15;
}
.vb-hs-type-pin .vb-hs-type-option-icon {
  background: rgba(255, 138, 43, 0.15);
  color: #ff8a2b;
}
.vb-hs-type-pin:hover {
  border-color: #ff8a2b;
}
.vb-hs-type-generic .vb-hs-type-option-icon {
  background: var(--vb-bg-3);
  color: var(--vb-text-muted);
}
.vb-hs-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.vb-hs-detail-title {
  display: flex;
  align-items: center;
  gap: 6px;
}
.vb-hs-idx-lg {
  background: var(--vb-warning);
  color: #1a1208;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  font-family: monospace;
}
.vb-hs-badge-lg {
  font-size: 10px !important;
  padding: 2px 8px !important;
}
.vb-lock-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid var(--vb-border);
  background: var(--vb-bg-2);
  color: var(--vb-text-dim);
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.15s;
}
.vb-lock-btn:hover {
  border-color: var(--vb-warning);
  color: var(--vb-warning);
  background: rgba(254, 202, 87, 0.08);
}
.vb-lock-btn.locked {
  background: rgba(254, 202, 87, 0.1);
  border-color: var(--vb-warning);
  color: var(--vb-warning);
}
.vb-lock-warning {
  margin-bottom: 10px;
  padding: 8px 10px;
  background: rgba(254, 202, 87, 0.08);
  border: 1px solid rgba(254, 202, 87, 0.3);
  border-radius: 6px;
  font-size: 11px;
  color: var(--vb-warning);
  line-height: 1.5;
}
.vb-hs-card.locked {
  border-color: rgba(254, 202, 87, 0.3);
  background: rgba(254, 202, 87, 0.03);
}
.vb-hs-card.locked .vb-hs-card-title {
  opacity: 0.8;
}
.vb-hs-lock-tag {
  font-size: 10px;
  margin-left: 4px;
}
.vb-hs-card-btn-locked {
  color: var(--vb-warning) !important;
  opacity: 1 !important;
}
.vb-hs-type-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  flex-shrink: 0;
}
.vb-hs-icon-nav,
.vb-hs-icon-chuyen_canh {
  background: rgba(0, 206, 201, 0.15);
  color: var(--vb-accent);
}
.vb-hs-icon-poi,
.vb-hs-icon-thong_tin_van_ban {
  background: var(--vb-primary-dim);
  color: var(--vb-primary-light);
}
.vb-hs-icon-thu_vien_anh {
  background: rgba(255, 159, 67, 0.15);
  color: #ff9f43;
}
.vb-hs-icon-phat_video {
  background: rgba(255, 71, 87, 0.15);
  color: #ff4757;
}
.vb-hs-icon-ghim_dia_danh {
  background: rgba(255, 138, 43, 0.15);
  color: #ff8a2b;
}
.vb-hs-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
}
.vb-scene-nav-shortcut {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: var(--vb-bg-2);
  border: 1px solid var(--vb-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
}
.vb-scene-nav-shortcut:hover {
  border-color: var(--vb-primary);
  background: var(--vb-primary-dim);
}
.vb-sns-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--vb-text-muted);
}
.vb-sns-right {
  display: flex;
  align-items: center;
  gap: 6px;
}
.vb-sns-count {
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--vb-primary-light);
}
.vb-hs-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vb-border);
}
.vb-hs-list-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--vb-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.vb-hs-list-full {
  padding: 8px;
}
.vb-hs-detail-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.vb-hs-detail-actions .vb-prop-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.vb-acc-item {
  border-bottom: 1px solid var(--vb-border);
}
.vb-acc-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  color: var(--vb-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: background 0.12s;
  user-select: none;
}
.vb-acc-header:hover {
  background: var(--vb-bg-2);
  color: var(--vb-text);
}
.vb-acc-chevron {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}
.vb-acc-chevron.open {
  transform: rotate(90deg);
}
.vb-acc-body {
  padding: 8px 12px 12px;
}
.vb-acc-badge {
  font-size: 9px;
  font-weight: 700;
  margin-left: auto;
  padding: 1px 6px;
  border-radius: 3px;
}
.vb-acc-badge-ok {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}
.vb-acc-badge-warn {
  background: rgba(254, 202, 87, 0.15);
  color: var(--vb-warning);
}
.vb-nav-no-target {
  padding: 16px;
  text-align: center;
  color: var(--vb-text-dim);
  font-size: 11px;
}
</style>

