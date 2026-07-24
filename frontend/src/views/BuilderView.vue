<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";

import PanoramaViewer from "../components/PanoramaViewer.vue";
import { apiBaseURL } from "../api/http";
import {
  createLocation,
  listProjectLocations,
  uploadLocationThumbnail,
} from "../api/locationsApi";
import { deleteSceneAsset, uploadSceneAsset } from "../api/mediaApi";
import { createProject, listProjects } from "../api/projectsApi";
import {
  createVersion,
  getVersion,
  listVersions,
  updateVersion,
  uploadHotspotAudio,
  uploadHotspotInfoImage,
  uploadHotspotInfoVideo,
} from "../api/toursApi";

const router = useRouter();
const route = useRoute();
const projects = ref([]);
const locations = ref([]);
const versions = ref([]);
const selectedProjectId = ref("");
const selectedLocationId = ref("");
const selectedVersionId = ref("");
const version = ref(null);
const scenes = ref([]);
const activeSceneId = ref("");
const selectedHotspotId = ref("");
const errorMessage = ref("");
const successMessage = ref("");
let messageTimer = null;
const uploading = ref(false);
const isDraggingFile = ref(false);
const draggedSceneId = ref("");
const dragOverSceneId = ref("");
const showImportModal = ref(false);
const showExportModal = ref(false);
const showQuickCreateModal = ref(false);
const isPlacingHotspot = ref(false);
const isDrawingInfoArea = ref(false);
const infoAreaDraftPoints = ref([]);
const fileInput = ref(null);
const quickLocation = ref([]);
const quickVersions = ref([]);

const sceneForm = reactive({
  id: "",
  name: "",
  group: "Default",
  description: "",
  image_url: "",
});
const hotspotForm = reactive({
  id: "",
  label: "",
  type: "nav",
  target_scene_id: "",
  x: 50,
  y: 50,
  lon: 0,
  lat: 0,
  audio_url: "",
  info_title: "",
  info_description: "",
  info_image_url: "",
  info_video_url: "",
  info_youtube_url: "",
  glow: true,
});
const viewState = reactive({ lon: 0, lat: 0, fov: 75 });
const importText = ref("");
const quickCreateForm = reactive({
  project_id: "",
  location_id: "",
  version_id: "",
  source_version_id: "",
  create_project: false,
  create_location: false,
  create_version: true,
  project_name: "",
  project_description: "",
  location_name: "",
  location_description: "",
  location_thumbnail_file: null,
  location_thumbnail_preview: "",
  latitude: "",
  longitude: "",
  version_label: "",
  background_audio_file: null,
  hotspot_point_logo_file: null,
});

const activeScene = computed(
  () => scenes.value.find((scene) => scene.id === activeSceneId.value) || null,
);
const selectedHotspot = computed(() => {
  if (!activeScene.value) return null;
  return (
    (activeScene.value.hotspots || []).find(
      (hotspot) => hotspot.id === selectedHotspotId.value,
    ) || null
  );
});
const selectedHotspotIndex = computed(() => {
  if (!activeScene.value || !selectedHotspotId.value) return -1;
  return (activeScene.value.hotspots || []).findIndex(
    (hotspot) => hotspot.id === selectedHotspotId.value,
  );
});
const isConnected = computed(() =>
  Boolean(version.value && selectedVersionId.value),
);
const activeInitialView = computed(
  () => activeScene.value?.view || { lon: 0, lat: 0, fov: 75 },
);
const targetSceneOptions = computed(() =>
  scenes.value.map((scene, index) => ({
    id: scene.id,
    name: scene.name || scene.id,
    index: index + 1,
    isCurrent: scene.id === activeScene.value?.id,
    hasImage: Boolean(resolveSceneImage(scene)),
  })),
);
const activeSceneHotspots = computed(() => {
  const baseHotspots = activeScene.value?.hotspots || [];
  if (!isDrawingInfoArea.value || !infoAreaDraftPoints.value.length) {
    return baseHotspots;
  }
  return [
    ...baseHotspots,
    {
      id: "__draft_info_area__",
      label: "Draft info area",
      type: "info_area",
      area_points: infoAreaDraftPoints.value,
      info: { title: "Draft info area", description: "", image_url: "" },
      isDraft: true,
    },
  ];
});
const tourData = computed(() => ({
  ...(version.value?.data || {}),
  title: version.value?.label || version.value?.data?.title || "VR360 Tour",
  scenes: scenes.value.map((scene) => {
    const { preview_url, preview_object_url, local_file, ...payload } = scene;
    return {
      ...payload,
      hotspots: (payload.hotspots || []).map((hotspot) => {
        const {
          local_audio_file,
          local_info_image_file,
          local_info_image_preview,
          local_info_video_file,
          local_info_video_preview,
          ...hotspotPayload
        } = hotspot;
        return hotspotPayload;
      }),
    };
  }),
}));
const exportText = computed(() => JSON.stringify(tourData.value, null, 2));
const sceneBackground = computed(() => resolveSceneImage(activeScene.value));

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function extractApiError(error, fallback) {
  const data = error.response?.data;
  if (!data) return error.message || fallback;
  if (typeof data === "string") return data.slice(0, 240) || fallback;
  if (data.detail) return data.detail;
  if (data.non_field_errors?.length) return data.non_field_errors[0];
  const firstKey = Object.keys(data)[0];
  const firstValue = firstKey ? data[firstKey] : null;
  if (Array.isArray(firstValue)) return `${firstKey}: ${firstValue[0]}`;
  if (typeof firstValue === "string") return `${firstKey}: ${firstValue}`;
  return fallback;
}

function scheduleMessageAutoDismiss() {
  clearTimeout(messageTimer);
  if (!errorMessage.value && !successMessage.value) return;
  const currentError = errorMessage.value;
  const currentSuccess = successMessage.value;
  messageTimer = setTimeout(() => {
    if (errorMessage.value === currentError) errorMessage.value = "";
    if (successMessage.value === currentSuccess) successMessage.value = "";
  }, 2000);
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function safeSlug(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

function resolveUrl(url) {
  if (!url) return "";
  if (
    url.startsWith("blob:") ||
    url.startsWith("data:") ||
    url.startsWith("http")
  )
    return url;
  return `${apiBaseURL}${url.startsWith("/") ? url : `/${url}`}`;
}

function resolveSceneImage(scene) {
  if (!scene) return "";
  return resolveUrl(
      scene.optimized_file ||
      scene.original_file ||
      scene.image_url ||
      scene.preview_url ||
      scene.preview_file ||
      scene.thumbnail ||
      "",
  );
}

function normalizeScene(scene, index = 0) {
  const id = String(scene.id || scene.key || scene.scene_key || uid("scene"));
  const imageUrl =
    scene.optimized_file ||
    scene.original_file ||
    scene.image_url ||
    scene.url ||
    scene.preview_url ||
    scene.preview_file ||
    scene.panorama ||
    "";
  return {
    id,
    name: scene.name || scene.title || `Scene ${index + 1}`,
    group: scene.group || scene.category || "Default",
    description: scene.description || scene.desc || "",
    image_url: imageUrl,
    preview_url: scene.preview_url || "",
    preview_object_url: scene.preview_object_url || "",
    local_file: scene.local_file || null,
    image_file_name: scene.image_file_name || "",
    optimized_file: scene.optimized_file || "",
    preview_file: scene.preview_file || "",
    original_file: scene.original_file || "",
    thumbnail: scene.thumbnail || scene.thumbnail_file || scene.preview_file || "",
    thumbnail_file: scene.thumbnail_file || "",
    scene_asset_id: scene.scene_asset_id || scene.asset_id || "",
    tile_base_path: scene.tile_base_path || "",
    processing_status: scene.processing_status || "",
    view: {
      lon: Number(scene.view?.lon ?? scene.lon ?? 0),
      lat: Number(scene.view?.lat ?? scene.lat ?? 0),
      fov: Number(scene.view?.fov ?? scene.fov ?? 75),
    },
    hotspots: (scene.hotspots || []).map((hotspot, hotspotIndex) => ({
      id: String(hotspot.id || uid("hotspot")),
      label: hotspot.label || hotspot.title || `Hotspot ${hotspotIndex + 1}`,
      type: ["nav", "point", "info", "info_area"].includes(
        hotspot.type || hotspot.action,
      )
        ? hotspot.type || hotspot.action
        : (hotspot.type || hotspot.action) === "navigate"
          ? "nav"
          : "point",
      target_scene_id: String(
        hotspot.target_scene_id || hotspot.target || hotspot.scene_id || "",
      ),
      x: Math.round(Number(hotspot.x ?? 50)),
      y: Math.round(Number(hotspot.y ?? 50)),
      lon: Number(hotspot.lon ?? 0),
      lat: Number(hotspot.lat ?? 0),
      audio_url: hotspot.audio_url || hotspot.audio || "",
      local_audio_file: hotspot.local_audio_file || null,
      local_info_image_file: hotspot.local_info_image_file || null,
      local_info_image_preview: hotspot.local_info_image_preview || "",
      local_info_video_file: hotspot.local_info_video_file || null,
      local_info_video_preview: hotspot.local_info_video_preview || "",
      area_points: Array.isArray(hotspot.area_points)
        ? hotspot.area_points.map((point) => ({
            lon: Number(point.lon ?? 0),
            lat: Number(point.lat ?? 0),
            x: Math.round(Number(point.x ?? 50)),
            y: Math.round(Number(point.y ?? 50)),
          }))
        : [],
      info: {
        title:
          hotspot.info?.title ||
          hotspot.info_title ||
          (hotspot.type === "info" ? hotspot.title || hotspot.label || "" : ""),
        description:
          hotspot.info?.description ||
          hotspot.info_description ||
          hotspot.description ||
          "",
        image_url:
          hotspot.info?.image_url ||
          hotspot.info_image_url ||
          hotspot.image_url ||
          "",
        video_url:
          hotspot.info?.video_url ||
          hotspot.info_video_url ||
          hotspot.video_url ||
          "",
        youtube_url:
          hotspot.info?.youtube_url ||
          hotspot.info_youtube_url ||
          hotspot.youtube_url ||
          "",
      },
      glow: hotspot.glow ?? hotspot.style?.glow ?? true,
    })),
  };
}

function normalizeTourData(data) {
  const source = data?.TOUR_DATA || data?.tour_data || data?.data || data || {};
  const sceneList = source.scenes || source.SCENES || [];
  return Array.isArray(sceneList) ? sceneList.map(normalizeScene) : [];
}

function makeEmptyTourData(title = "VR360 Tour") {
  return {
    title,
    scenes: [],
  };
}

async function loadProject() {
  try {
    const response = await listProjects();
    projects.value = normalizeResults(response.data);
    const queryProject = Number(route.query.project || 0);
    if (
      queryProject &&
      projects.value.some((project) => project.id === queryProject)
    ) {
      selectedProjectId.value = queryProject;
    }
    if (!selectedProjectId.value && projects.value.length)
      selectedProjectId.value = projects.value[0].id;
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || "Could not load project list.";
  }
}

async function loadLocation() {
  if (!selectedProjectId.value) return;
  const response = await listProjectLocations(selectedProjectId.value);
  locations.value = normalizeResults(response.data);
  const queryLocation = Number(route.query.location || 0);
  if (
    queryLocation &&
    locations.value.some((location) => location.id === queryLocation)
  ) {
    selectedLocationId.value = queryLocation;
  }
  if (!selectedLocationId.value && locations.value.length)
    selectedLocationId.value = locations.value[0].id;
}

async function loadVersions() {
  if (!selectedLocationId.value) return;
  const response = await listVersions(selectedLocationId.value);
  versions.value = normalizeResults(response.data);
  const queryVersion = Number(route.query.version || 0);
  if (queryVersion && versions.value.some((item) => item.id === queryVersion)) {
    selectedVersionId.value = queryVersion;
    return;
  }
  const draft = versions.value.find((item) => item.status === "draft");
  selectedVersionId.value = draft?.id || versions.value[0]?.id || "";
}

async function loadVersionDetail() {
  if (!selectedLocationId.value || !selectedVersionId.value) return;
  errorMessage.value = "";
  const response = await getVersion(
    selectedLocationId.value,
    selectedVersionId.value,
  );
  version.value = response.data;
  scenes.value = normalizeTourData(response.data.data);
  activeSceneId.value = scenes.value[0]?.id || "";
  selectedHotspotId.value = "";
  hydrateSceneForm();
  hydrateHotspotForm(null);
}

async function changeProject() {
  selectedLocationId.value = "";
  selectedVersionId.value = "";
  version.value = null;
  locations.value = [];
  versions.value = [];
  await loadLocation();
  await loadVersions();
  await loadVersionDetail();
}

async function changeLocation() {
  selectedVersionId.value = "";
  version.value = null;
  versions.value = [];
  await loadVersions();
  await loadVersionDetail();
}

function hydrateSceneForm() {
  sceneForm.id = activeScene.value?.id || "";
  sceneForm.name = activeScene.value?.name || "";
  sceneForm.group = activeScene.value?.group || "Default";
  sceneForm.description = activeScene.value?.description || "";
  sceneForm.image_url =
    activeScene.value?.image_url || activeScene.value?.original_file || "";
}

function updateActiveSceneName() {
  if (!activeScene.value) return;
  activeScene.value.name =
    sceneForm.name.trim() ||
    activeScene.value.image_file_name ||
    activeScene.value.id;
}

function updateActiveSceneGroup() {
  if (!activeScene.value) return;
  activeScene.value.group = sceneForm.group.trim() || "Default";
}

function hydrateHotspotForm(hotspot) {
  hotspotForm.id = hotspot?.id || "";
  hotspotForm.label = hotspot?.label || "";
  hotspotForm.type = hotspot?.type || "nav";
  hotspotForm.target_scene_id = hotspot?.target_scene_id || "";
  hotspotForm.x = Math.round(Number(hotspot?.x ?? 50));
  hotspotForm.y = Math.round(Number(hotspot?.y ?? 50));
  hotspotForm.lon = Math.round(Number(hotspot?.lon ?? 0) * 10) / 10;
  hotspotForm.lat = Math.round(Number(hotspot?.lat ?? 0) * 10) / 10;
  hotspotForm.audio_url = hotspot?.audio_url || "";
  hotspotForm.info_title = hotspot?.info?.title || "";
  hotspotForm.info_description = hotspot?.info?.description || "";
  hotspotForm.info_image_url = hotspot?.info?.image_url || "";
  hotspotForm.info_video_url = hotspot?.info?.video_url || "";
  hotspotForm.info_youtube_url = hotspot?.info?.youtube_url || "";
  hotspotForm.glow = hotspot?.glow ?? true;
}

function selectScene(sceneId) {
  activeSceneId.value = sceneId;
  selectedHotspotId.value = "";
  isPlacingHotspot.value = false;
  isDrawingInfoArea.value = false;
  infoAreaDraftPoints.value = [];
  hydrateSceneForm();
  hydrateHotspotForm(null);
}

function startPlacingHotspot() {
  if (!activeScene.value) return;
  isPlacingHotspot.value = true;
  isDrawingInfoArea.value = false;
  infoAreaDraftPoints.value = [];
  selectedHotspotId.value = "";
  hydrateHotspotForm(null);
}

function startDrawingInfoArea() {
  if (!activeScene.value) return;
  isDrawingInfoArea.value = true;
  isPlacingHotspot.value = false;
  selectedHotspotId.value = "";
  infoAreaDraftPoints.value = [];
  hydrateHotspotForm(null);
  successMessage.value = "Click multiple points on the panorama, then Finish area.";
}

function addBlankScene() {
  const id = uid("scene");
  scenes.value.push(
    normalizeScene(
      { id, name: `Scene ${scenes.value.length + 1}` },
      scenes.value.length,
    ),
  );
  selectScene(id);
}

function createSceneFromFile(file) {
  const id = `img_${safeSlug(file.name.replace(/\.[^.]+$/, "")) || Date.now()}`;
  const uniqueId = scenes.value.some((scene) => scene.id === id) ? uid(id) : id;
  const previewUrl = URL.createObjectURL(file);
  return normalizeScene(
    {
      id: uniqueId,
      name: file.name.replace(/\.[^.]+$/, ""),
      image_url: "",
      preview_url: previewUrl,
      preview_object_url: previewUrl,
      local_file: file,
      image_file_name: file.name,
    },
    scenes.value.length,
  );
}

async function uploadSceneToBackend(scene, file) {
  if (!selectedVersionId.value) return false;
  try {
    if (scene.scene_asset_id) {
      await deleteSceneAsset(scene.scene_asset_id);
      scene.scene_asset_id = "";
      scene.optimized_file = "";
      scene.preview_file = "";
      scene.original_file = "";
      scene.thumbnail_file = "";
      scene.tile_base_path = "";
      scene.processing_status = "";
    }
    const response = await uploadSceneAsset({
      tourVersion: selectedVersionId.value,
      sceneKey: scene.id,
      originalFile: file,
    });
    const asset = response.data.asset || response.data;
    scene.scene_asset_id = asset.id;
    scene.optimized_file = asset.optimized_file || "";
    scene.preview_file = asset.preview_file || "";
    scene.original_file = asset.original_file;
    scene.thumbnail_file = asset.thumbnail_file || "";
    scene.image_url =
      asset.optimized_file ||
      asset.original_file ||
      asset.preview_file ||
      scene.image_url ||
      "";
    scene.preview_url = asset.preview_file || scene.preview_url || "";
    scene.thumbnail = asset.thumbnail_file || asset.preview_file || scene.thumbnail || "";
    scene.tile_base_path = asset.tile_base_path;
    scene.processing_status = asset.processing_status;
    scene.local_file = null;
    return true;
  } catch (error) {
    const asset = error.response?.data?.asset;
    if (asset) {
      scene.scene_asset_id = asset.id;
      scene.optimized_file = asset.optimized_file || "";
      scene.preview_file = asset.preview_file || "";
      scene.original_file = asset.original_file;
      scene.thumbnail_file = asset.thumbnail_file || "";
      scene.image_url =
        asset.optimized_file ||
        asset.original_file ||
        asset.preview_file ||
        scene.image_url ||
        "";
      scene.preview_url = asset.preview_file || scene.preview_url || "";
      scene.thumbnail = asset.thumbnail_file || asset.preview_file || scene.thumbnail || "";
      scene.tile_base_path = asset.tile_base_path;
      scene.processing_status = asset.processing_status;
      scene.local_file = null;
      errorMessage.value =
        error.response?.data?.detail ||
        "Image was saved, but tiles are not processed yet.";
      return true;
    }
    errorMessage.value =
      error.response?.data?.detail ||
      "Image is previewed locally, but backend upload is not finished. Click Save Tour and upload again if tiles are needed.";
    return false;
  }
}

async function uploadPendingSceneFiles() {
  if (!selectedVersionId.value) return 0;
  let uploadedCount = 0;
  for (const scene of scenes.value) {
    if (scene.local_file) {
      const uploaded = await uploadSceneToBackend(scene, scene.local_file);
      if (uploaded) uploadedCount += 1;
    }
  }
  return uploadedCount;
}

async function uploadHotspotAudioToBackend(hotspot) {
  if (
    !selectedLocationId.value ||
    !selectedVersionId.value ||
    !hotspot.local_audio_file
  )
    return false;
  const response = await uploadHotspotAudio(
    selectedLocationId.value,
    selectedVersionId.value,
    {
      hotspotId: hotspot.id,
      audioFile: hotspot.local_audio_file,
    },
  );
  hotspot.audio_url = response.data.audio_url || response.data.audio_path || "";
  hotspot.local_audio_file = null;
  return true;
}

async function uploadPendingHotspotAudioFiles() {
  if (!selectedVersionId.value) return 0;
  let uploadedCount = 0;
  for (const scene of scenes.value) {
    for (const hotspot of scene.hotspots || []) {
      if (hotspot.local_audio_file) {
        const uploaded = await uploadHotspotAudioToBackend(hotspot);
        if (uploaded) uploadedCount += 1;
      }
    }
  }
  return uploadedCount;
}

async function uploadHotspotInfoImageToBackend(hotspot) {
  if (
    !selectedLocationId.value ||
    !selectedVersionId.value ||
    !hotspot.local_info_image_file
  )
    return false;
  const response = await uploadHotspotInfoImage(
    selectedLocationId.value,
    selectedVersionId.value,
    {
      hotspotId: hotspot.id,
      imageFile: hotspot.local_info_image_file,
    },
  );
  hotspot.info = {
    ...(hotspot.info || {}),
    image_url: response.data.image_url || response.data.image_path || "",
  };
  if (hotspot.local_info_image_preview) {
    URL.revokeObjectURL(hotspot.local_info_image_preview);
  }
  hotspot.local_info_image_file = null;
  hotspot.local_info_image_preview = "";
  hotspotForm.info_image_url = hotspot.info.image_url;
  return true;
}

async function uploadPendingHotspotInfoImages() {
  if (!selectedVersionId.value) return 0;
  let uploadedCount = 0;
  for (const scene of scenes.value) {
    for (const hotspot of scene.hotspots || []) {
      if (hotspot.local_info_image_file) {
        const uploaded = await uploadHotspotInfoImageToBackend(hotspot);
        if (uploaded) uploadedCount += 1;
      }
    }
  }
  return uploadedCount;
}

async function uploadHotspotInfoVideoToBackend(hotspot) {
  if (
    !selectedLocationId.value ||
    !selectedVersionId.value ||
    !hotspot.local_info_video_file
  )
    return false;
  const response = await uploadHotspotInfoVideo(
    selectedLocationId.value,
    selectedVersionId.value,
    {
      hotspotId: hotspot.id,
      videoFile: hotspot.local_info_video_file,
    },
  );
  hotspot.info = {
    ...(hotspot.info || {}),
    video_url: response.data.video_url || response.data.video_path || "",
  };
  if (hotspot.local_info_video_preview) {
    URL.revokeObjectURL(hotspot.local_info_video_preview);
  }
  hotspot.local_info_video_file = null;
  hotspot.local_info_video_preview = "";
  hotspotForm.info_video_url = hotspot.info.video_url;
  return true;
}

async function uploadPendingHotspotInfoVideos() {
  if (!selectedVersionId.value) return 0;
  let uploadedCount = 0;
  for (const scene of scenes.value) {
    for (const hotspot of scene.hotspots || []) {
      if (hotspot.local_info_video_file) {
        const uploaded = await uploadHotspotInfoVideoToBackend(hotspot);
        if (uploaded) uploadedCount += 1;
      }
    }
  }
  return uploadedCount;
}

async function handleFiles(fileList) {
  const files = Array.from(fileList || []).filter((file) =>
    file.type.startsWith("image/"),
  );
  if (!files.length) return;

  uploading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  for (const file of files) {
    const scene = createSceneFromFile(file);
    scenes.value.push(scene);
    activeSceneId.value = scene.id;
    hydrateSceneForm();
  }

  uploading.value = false;
  successMessage.value = `Added ${files.length} image(s) to tour. Click Save Tour to save images to backend.`;
}

function triggerAddImage() {
  fileInput.value?.click();
}

function uploadPanorama(event) {
  handleFiles(event.target.files);
  event.target.value = "";
}

function onDropFiles(event) {
  isDraggingFile.value = false;
  handleFiles(event.dataTransfer?.files);
}

function saveSceneMeta() {
  if (!activeScene.value) return;
  const oldId = activeScene.value.id;
  const nextId = sceneForm.id.trim() || oldId;
  activeScene.value.id = nextId;
  activeScene.value.name = sceneForm.name.trim() || activeScene.value.name;
  activeScene.value.group = sceneForm.group.trim() || "Default";
  activeScene.value.description = sceneForm.description.trim();
  activeScene.value.image_url = sceneForm.image_url.trim();
  scenes.value.forEach((scene) => {
    scene.hotspots = (scene.hotspots || []).map((hotspot) => ({
      ...hotspot,
      target_scene_id:
        hotspot.target_scene_id === oldId ? nextId : hotspot.target_scene_id,
    }));
  });
  activeSceneId.value = nextId;
  successMessage.value = "Đã lưu thuộc tính scene.";
}

function removeScene(sceneId) {
  if (!window.confirm("Delete scene này?")) return;
  const scene = scenes.value.find((item) => item.id === sceneId);
  if (scene?.preview_object_url) URL.revokeObjectURL(scene.preview_object_url);
  scenes.value = scenes.value.filter((item) => item.id !== sceneId);
  scenes.value.forEach((item) => {
    item.hotspots = (item.hotspots || []).filter(
      (hotspot) => hotspot.target_scene_id !== sceneId,
    );
  });
  activeSceneId.value = scenes.value[0]?.id || "";
  selectedHotspotId.value = "";
  hydrateSceneForm();
  hydrateHotspotForm(null);
}

function onSceneDragStart(event, sceneId) {
  draggedSceneId.value = sceneId;
  dragOverSceneId.value = sceneId;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", sceneId);
}

function onSceneDragOver(event, sceneId) {
  event.preventDefault();
  if (!draggedSceneId.value || draggedSceneId.value === sceneId) return;
  dragOverSceneId.value = sceneId;
}

function onSceneDrop(event, targetSceneId) {
  event.preventDefault();
  const sourceSceneId =
    draggedSceneId.value || event.dataTransfer.getData("text/plain");
  if (!sourceSceneId || sourceSceneId === targetSceneId) {
    onSceneDragEnd();
    return;
  }

  const nextScenes = [...scenes.value];
  const fromIndex = nextScenes.findIndex((scene) => scene.id === sourceSceneId);
  const toIndex = nextScenes.findIndex((scene) => scene.id === targetSceneId);
  if (fromIndex < 0 || toIndex < 0) {
    onSceneDragEnd();
    return;
  }

  const [movedScene] = nextScenes.splice(fromIndex, 1);
  nextScenes.splice(toIndex, 0, movedScene);
  scenes.value = nextScenes;
  activeSceneId.value = movedScene.id;
  onSceneDragEnd();
}

function onSceneDragEnd() {
  draggedSceneId.value = "";
  dragOverSceneId.value = "";
}

function addHotspotFromCanvas(point) {
  if (!activeScene.value) return;
  if (isDrawingInfoArea.value) {
    infoAreaDraftPoints.value = [
      ...infoAreaDraftPoints.value,
      {
        x: Math.round(point.x),
        y: Math.round(point.y),
        lon: Math.round(Number(point.lon ?? viewState.lon) * 10) / 10,
        lat: Math.round(Number(point.lat ?? viewState.lat) * 10) / 10,
      },
    ];
    return;
  }
  if (!isPlacingHotspot.value) return;
  const hotspot = {
    id: uid("hotspot"),
    label: `Hotspot ${(activeScene.value.hotspots || []).length + 1}`,
    type: "nav",
    target_scene_id: getDefaultTargetSceneId(),
    x: Math.round(point.x),
    y: Math.round(point.y),
    lon: Math.round(Number(point.lon ?? viewState.lon) * 10) / 10,
    lat: Math.round(Number(point.lat ?? viewState.lat) * 10) / 10,
    audio_url: "",
    local_audio_file: null,
    local_info_image_file: null,
    local_info_image_preview: "",
    local_info_video_file: null,
    local_info_video_preview: "",
    area_points: [],
    info: { title: "", description: "", image_url: "", video_url: "", youtube_url: "" },
    glow: true,
  };
  activeScene.value.hotspots = [...(activeScene.value.hotspots || []), hotspot];
  selectedHotspotId.value = hotspot.id;
  isPlacingHotspot.value = false;
  hydrateHotspotForm(hotspot);
}

function finishInfoArea() {
  if (!activeScene.value || infoAreaDraftPoints.value.length < 3) {
    errorMessage.value = "Info area needs at least 3 points.";
    return;
  }
  const points = [...infoAreaDraftPoints.value];
  const average = points.reduce(
    (total, point) => ({
      x: total.x + Number(point.x || 0),
      y: total.y + Number(point.y || 0),
      lon: total.lon + Number(point.lon || 0),
      lat: total.lat + Number(point.lat || 0),
    }),
    { x: 0, y: 0, lon: 0, lat: 0 },
  );
  const count = points.length || 1;
  const hotspot = {
    id: uid("info-area"),
    label: `Info area ${(activeScene.value.hotspots || []).length + 1}`,
    type: "info_area",
    target_scene_id: "",
    x: Math.round(average.x / count),
    y: Math.round(average.y / count),
    lon: Math.round((average.lon / count) * 10) / 10,
    lat: Math.round((average.lat / count) * 10) / 10,
    audio_url: "",
    local_audio_file: null,
    local_info_image_file: null,
    local_info_image_preview: "",
    local_info_video_file: null,
    local_info_video_preview: "",
    area_points: points,
    info: { title: "", description: "", image_url: "", video_url: "", youtube_url: "" },
    glow: true,
  };
  activeScene.value.hotspots = [...(activeScene.value.hotspots || []), hotspot];
  selectedHotspotId.value = hotspot.id;
  isDrawingInfoArea.value = false;
  infoAreaDraftPoints.value = [];
  hydrateHotspotForm(hotspot);
  successMessage.value = "Created info area. Add title, image and description.";
}

function undoInfoAreaPoint() {
  infoAreaDraftPoints.value = infoAreaDraftPoints.value.slice(0, -1);
}

function cancelInfoArea() {
  isDrawingInfoArea.value = false;
  infoAreaDraftPoints.value = [];
}

function selectHotspot(hotspot) {
  selectedHotspotId.value = hotspot.id;
  hydrateHotspotForm(hotspot);
}

function openHotspotTargetScene(hotspot) {
  if (!hotspot) return;
  selectHotspot(hotspot);
  const targetSceneId = hotspot.target_scene_id;
  if (!targetSceneId) {
    errorMessage.value = "Hotspot nay chua co target scene.";
    return;
  }
  const targetScene = scenes.value.find(
    (scene) => String(scene.id) === String(targetSceneId),
  );
  if (!targetScene) {
    errorMessage.value = "Khong tim thay scene duoc lien ket.";
    return;
  }
  selectScene(targetScene.id);
  successMessage.value = `Da chuyen den scene: ${targetScene.name || targetScene.id}.`;
}

function getDefaultTargetSceneId() {
  if (!activeScene.value) return "";
  const currentIndex = scenes.value.findIndex(
    (scene) => scene.id === activeScene.value.id,
  );
  const nextScene = scenes.value.find(
    (scene, index) => index > currentIndex && scene.id !== activeScene.value.id,
  );
  return (
    nextScene?.id ||
    scenes.value.find((scene) => scene.id !== activeScene.value.id)?.id ||
    ""
  );
}

function saveHotspot() {
  const hotspot = selectedHotspot.value;
  if (!hotspot) return;
  hotspot.label = hotspotForm.label.trim() || hotspot.label;
  hotspot.type = hotspotForm.type;
  hotspot.target_scene_id =
    ["info", "info_area"].includes(hotspotForm.type)
      ? ""
      : hotspotForm.target_scene_id || getDefaultTargetSceneId();
  hotspot.x = Number(hotspotForm.x);
  hotspot.y = Number(hotspotForm.y);
  hotspot.lon = Number(hotspotForm.lon);
  hotspot.lat = Number(hotspotForm.lat);
  hotspot.audio_url = hotspotForm.audio_url.trim();
  hotspot.info = {
    title: hotspotForm.info_title.trim(),
    description: hotspotForm.info_description.trim(),
    image_url:
      hotspot.local_info_image_preview ||
      hotspotForm.info_image_url.trim() ||
      hotspot.info?.image_url ||
      "",
    video_url:
      hotspot.local_info_video_preview ||
      hotspotForm.info_video_url.trim() ||
      hotspot.info?.video_url ||
      "",
    youtube_url: hotspotForm.info_youtube_url.trim(),
  };
  hotspot.glow = Boolean(hotspotForm.glow);
  hotspotForm.target_scene_id = hotspot.target_scene_id;
  successMessage.value = "Da luu hotspot.";
}

function onHotspotAudioChange(event) {
  const file = event.target.files?.[0] || null;
  const hotspot = selectedHotspot.value;
  if (!hotspot || !file) return;
  hotspot.local_audio_file = file;
  hotspot.audio_url = "";
  hotspotForm.audio_url = "";
  successMessage.value = "Đã chọn audio cho hotspot. Bấm Save Tour để upload.";
}

function onHotspotInfoImageChange(event) {
  const file = event.target.files?.[0] || null;
  const hotspot = selectedHotspot.value;
  if (!hotspot || !file) return;
  if (!file.type.startsWith("image/")) {
    errorMessage.value = "Only image files are allowed.";
    event.target.value = "";
    return;
  }
  if (hotspot.local_info_image_preview) {
    URL.revokeObjectURL(hotspot.local_info_image_preview);
  }
  hotspot.local_info_image_file = file;
  hotspot.local_info_image_preview = URL.createObjectURL(file);
  hotspot.info = {
    ...(hotspot.info || {}),
    image_url: hotspot.local_info_image_preview,
  };
  hotspotForm.info_image_url = "";
  successMessage.value = "Selected info image. Click Save Tour to upload it.";
  event.target.value = "";
}

function onHotspotInfoVideoChange(event) {
  const file = event.target.files?.[0] || null;
  const hotspot = selectedHotspot.value;
  if (!hotspot || !file) return;
  if (!file.type.startsWith("video/")) {
    errorMessage.value = "Only video files are allowed.";
    event.target.value = "";
    return;
  }
  if (hotspot.local_info_video_preview) {
    URL.revokeObjectURL(hotspot.local_info_video_preview);
  }
  hotspot.local_info_video_file = file;
  hotspot.local_info_video_preview = URL.createObjectURL(file);
  hotspot.info = {
    ...(hotspot.info || {}),
    video_url: hotspot.local_info_video_preview,
  };
  hotspotForm.info_video_url = "";
  successMessage.value = "Selected info video. Click Save Tour to upload it.";
  event.target.value = "";
}

function removeHotspot() {
  if (!activeScene.value || !selectedHotspotId.value) return;
  activeScene.value.hotspots = (activeScene.value.hotspots || []).filter(
    (hotspot) => hotspot.id !== selectedHotspotId.value,
  );
  selectedHotspotId.value = "";
  hydrateHotspotForm(null);
}

function saveDefaultView() {
  if (!activeScene.value) return;
  activeScene.value.view = { ...viewState };
  successMessage.value = "Đã lưu view mặc định cho scene.";
}

function updateViewState(value) {
  viewState.lon = value.lon;
  viewState.lat = value.lat;
  viewState.fov = value.fov;
}

function downloadExportJson() {
  const blob = new Blob([exportText.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "vr360-tour.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function copyExportJson() {
  await navigator.clipboard.writeText(exportText.value);
  successMessage.value = "Đã copy TOUR_DATA.";
}

function openImportModal() {
  importText.value = "";
  showImportModal.value = true;
}

async function openQuickCreateModal() {
  if (!projects.value.length) await loadProject();
  quickCreateForm.project_id =
    selectedProjectId.value || projects.value[0]?.id || "";
  quickCreateForm.location_id = "";
  quickCreateForm.version_id = "";
  quickCreateForm.source_version_id = "";
  quickCreateForm.create_project = !quickCreateForm.project_id;
  quickCreateForm.create_location = false;
  quickCreateForm.create_version = true;
  quickCreateForm.project_name = "";
  quickCreateForm.project_description = "";
  quickCreateForm.location_name = "";
  quickCreateForm.location_description = "";
  clearQuickLocationThumbnailPreview();
  quickCreateForm.latitude = "";
  quickCreateForm.longitude = "";
  quickCreateForm.version_label = "";
  quickCreateForm.background_audio_file = null;
  quickCreateForm.hotspot_point_logo_file = null;
  quickLocation.value = [];
  quickVersions.value = [];
  if (quickCreateForm.project_id) await loadQuickLocation();
  showQuickCreateModal.value = true;
}

async function loadQuickLocation() {
  quickLocation.value = [];
  quickVersions.value = [];
  quickCreateForm.location_id = "";
  quickCreateForm.version_id = "";
  quickCreateForm.source_version_id = "";
  if (!quickCreateForm.project_id || quickCreateForm.create_project) return;
  const response = await listProjectLocations(quickCreateForm.project_id);
  quickLocation.value = normalizeResults(response.data);
  quickCreateForm.location_id =
    selectedLocationId.value || quickLocation.value[0]?.id || "";
  if (quickCreateForm.location_id) await loadQuickVersions();
}

async function loadQuickVersions() {
  quickVersions.value = [];
  quickCreateForm.version_id = "";
  quickCreateForm.source_version_id = "";
  if (!quickCreateForm.location_id || quickCreateForm.create_location) return;
  const response = await listVersions(quickCreateForm.location_id);
  quickVersions.value = normalizeResults(response.data);
  const draft = quickVersions.value.find((item) => item.status === "draft");
  quickCreateForm.version_id =
    selectedVersionId.value || draft?.id || quickVersions.value[0]?.id || "";
  quickCreateForm.source_version_id =
    selectedVersionId.value || quickVersions.value[0]?.id || "";
}

function enableCreateProject() {
  quickCreateForm.create_project = true;
  quickCreateForm.create_location = true;
  quickCreateForm.create_version = true;
  quickCreateForm.project_id = "";
  quickCreateForm.location_id = "";
  quickCreateForm.version_id = "";
  quickCreateForm.source_version_id = "";
  quickLocation.value = [];
  quickVersions.value = [];
}

function useExistingProject() {
  quickCreateForm.create_project = false;
  quickCreateForm.create_location = false;
  quickCreateForm.project_id =
    selectedProjectId.value || projects.value[0]?.id || "";
  loadQuickLocation();
}

function enableCreateLocation() {
  quickCreateForm.create_location = true;
  quickCreateForm.create_version = true;
  quickCreateForm.location_id = "";
  quickCreateForm.version_id = "";
  quickCreateForm.source_version_id = "";
  clearQuickLocationThumbnailPreview();
  quickVersions.value = [];
}

function useExistingLocation() {
  quickCreateForm.create_location = false;
  clearQuickLocationThumbnailPreview();
  quickCreateForm.location_id =
    selectedLocationId.value || quickLocation.value[0]?.id || "";
  loadQuickVersions();
}

function clearQuickLocationThumbnailPreview() {
  if (quickCreateForm.location_thumbnail_preview) {
    URL.revokeObjectURL(quickCreateForm.location_thumbnail_preview);
  }
  quickCreateForm.location_thumbnail_file = null;
  quickCreateForm.location_thumbnail_preview = "";
}

function onQuickLocationThumbnailChange(event) {
  const file = event.target.files?.[0] || null;
  if (quickCreateForm.location_thumbnail_preview) {
    URL.revokeObjectURL(quickCreateForm.location_thumbnail_preview);
  }
  quickCreateForm.location_thumbnail_file = file;
  quickCreateForm.location_thumbnail_preview = file ? URL.createObjectURL(file) : "";
}

function onQuickVersionAudioChange(event) {
  quickCreateForm.background_audio_file = event.target.files?.[0] || null;
}

function onQuickVersionLogoChange(event) {
  quickCreateForm.hotspot_point_logo_file = event.target.files?.[0] || null;
}

async function quickCreateTour() {
  if (quickCreateForm.create_project && !quickCreateForm.project_name.trim()) {
    errorMessage.value = "Bạn cần import name project mới.";
    return;
  }
  if (!quickCreateForm.create_project && !quickCreateForm.project_id) {
    errorMessage.value = "Bạn cần chọn project hoặc tạo project mới.";
    return;
  }
  if (
    quickCreateForm.create_location &&
    !quickCreateForm.location_name.trim()
  ) {
    errorMessage.value = "Bạn cần import name location mới.";
    return;
  }
  if (!quickCreateForm.create_location && !quickCreateForm.location_id) {
    errorMessage.value = "Bạn cần chọn location hoặc tạo location mới.";
    return;
  }
  if (!quickCreateForm.create_version && !quickCreateForm.version_id) {
    errorMessage.value = "Bạn cần chọn version có sẵn hoặc tạo version mới.";
    return;
  }

  errorMessage.value = "";
  successMessage.value = "";

  try {
    let project = projects.value.find(
      (item) => item.id === quickCreateForm.project_id,
    );
    if (quickCreateForm.create_project) {
      const projectResponse = await createProject({
        name: quickCreateForm.project_name.trim(),
        description: quickCreateForm.project_description.trim(),
        is_active: true,
      });
      project = projectResponse.data;
    }

    let location = quickLocation.value.find(
      (item) => item.id === quickCreateForm.location_id,
    );
    if (quickCreateForm.create_location) {
      const locationPayload = {
        name: quickCreateForm.location_name.trim(),
        description: quickCreateForm.location_description.trim(),
        is_active: true,
        order: 0,
      };
      if (quickCreateForm.latitude !== "")
        locationPayload.latitude = Number(quickCreateForm.latitude);
      if (quickCreateForm.longitude !== "")
        locationPayload.longitude = Number(quickCreateForm.longitude);

        const locationResponse = await createLocation(
          project.id,
          locationPayload,
        );
        location = locationResponse.data;
        if (quickCreateForm.location_thumbnail_file) {
          const thumbnailResponse = await uploadLocationThumbnail(
            location.id,
            quickCreateForm.location_thumbnail_file,
          );
          location = thumbnailResponse.data;
        }
      }

    let nextVersion = quickVersions.value.find(
      (item) => item.id === quickCreateForm.version_id,
    );
    if (quickCreateForm.create_version) {
      const label = quickCreateForm.version_label.trim() || `${location.name} draft`;
      const versionPayload = {
        label: quickCreateForm.version_label.trim() || `${location.name} draft`,
        changelog: "Created from VR360 Builder.",
        background_audio_file: quickCreateForm.background_audio_file,
        hotspot_point_logo_file: quickCreateForm.hotspot_point_logo_file,
      };
      if (quickCreateForm.source_version_id && !quickCreateForm.create_location) {
        versionPayload.source_version_id = quickCreateForm.source_version_id;
      } else {
        versionPayload.data = makeEmptyTourData(label);
      }
      const versionResponse = await createVersion(location.id, versionPayload);
      nextVersion = versionResponse.data;
    } else {
      const response = await getVersion(location.id, nextVersion.id);
      nextVersion = response.data;
    }

    await loadProject();
    selectedProjectId.value = project.id;
    await loadLocation();
    selectedLocationId.value = location.id;
    await loadVersions();
    selectedVersionId.value = nextVersion.id;
    version.value = nextVersion;
    scenes.value.forEach((scene) => {
      if (scene.preview_object_url)
        URL.revokeObjectURL(scene.preview_object_url);
    });
    scenes.value = normalizeTourData(nextVersion.data);
    activeSceneId.value = scenes.value[0]?.id || "";
    selectedHotspotId.value = "";
    hydrateSceneForm();
    hydrateHotspotForm(null);

    showQuickCreateModal.value = false;
    successMessage.value = quickCreateForm.create_version
      ? "Đã tạo/chọn tour và tạo version draft mới."
      : "Đã mở version có sẵn để chỉnh sửa.";
  } catch (error) {
    errorMessage.value = extractApiError(
      error,
      "Could not create/select tour.",
    );
  }
}

function applyImportJson() {
  try {
    const data = JSON.parse(importText.value);
    scenes.value.forEach((scene) => {
      if (scene.preview_object_url)
        URL.revokeObjectURL(scene.preview_object_url);
    });
    scenes.value = normalizeTourData(data);
    version.value = version.value ? { ...version.value, data } : version.value;
    activeSceneId.value = scenes.value[0]?.id || "";
    selectedHotspotId.value = "";
    hydrateSceneForm();
    hydrateHotspotForm(null);
    showImportModal.value = false;
    successMessage.value = "Đã import JSON.";
  } catch {
    errorMessage.value = "JSON none hợp lệ.";
  }
}

async function saveBuilder() {
  if (!selectedLocationId.value) {
    errorMessage.value =
      "Bạn cần chọn location trước, rồi Save Tour sẽ tự tạo version draft.";
    return;
  }
  errorMessage.value = "";
  successMessage.value = "";
  try {
    if (!selectedVersionId.value || !version.value) {
      const createResponse = await createVersion(selectedLocationId.value, {
        label: tourData.value.title || "VR360 Tour draft",
        changelog: "Created from VR360 Builder.",
        data: tourData.value,
      });
      version.value = createResponse.data;
      selectedVersionId.value = createResponse.data.id;
      await loadVersions();
      selectedVersionId.value = createResponse.data.id;
    }

    const pendingSceneUploadCount = scenes.value.filter((scene) => scene.local_file).length;
    const hasPendingUploads = pendingSceneUploadCount > 0;
    const hasPendingHotspotAudio = scenes.value.some((scene) =>
      (scene.hotspots || []).some((hotspot) => hotspot.local_audio_file),
    );
    const hasPendingHotspotInfoImages = scenes.value.some((scene) =>
      (scene.hotspots || []).some((hotspot) => hotspot.local_info_image_file),
    );
    const hasPendingHotspotInfoVideos = scenes.value.some((scene) =>
      (scene.hotspots || []).some((hotspot) => hotspot.local_info_video_file),
    );
    let uploadedCount = 0;
    let uploadedHotspotAudioCount = 0;
    let uploadedHotspotInfoImageCount = 0;
    let uploadedHotspotInfoVideoCount = 0;
    if (
      hasPendingUploads ||
      hasPendingHotspotAudio ||
      hasPendingHotspotInfoImages ||
      hasPendingHotspotInfoVideos
    ) {
      version.value = (
        await updateVersion(selectedLocationId.value, selectedVersionId.value, {
          label: version.value.label,
          changelog: version.value.changelog,
          data: tourData.value,
        })
      ).data;
      uploadedCount = await uploadPendingSceneFiles();
      if (uploadedCount !== pendingSceneUploadCount) {
        throw new Error(
          errorMessage.value ||
            "Some panorama images could not be uploaded. Please try Save Tour again.",
        );
      }
      uploadedHotspotAudioCount = await uploadPendingHotspotAudioFiles();
      uploadedHotspotInfoImageCount = await uploadPendingHotspotInfoImages();
      uploadedHotspotInfoVideoCount = await uploadPendingHotspotInfoVideos();
    }

    const response = await updateVersion(
      selectedLocationId.value,
      selectedVersionId.value,
      {
        label: version.value.label,
        changelog: version.value.changelog,
        data: tourData.value,
      },
    );
    version.value = response.data;
    successMessage.value =
      hasPendingUploads ||
      hasPendingHotspotAudio ||
      hasPendingHotspotInfoImages ||
      hasPendingHotspotInfoVideos
        ? `Saved tour and uploaded ${uploadedCount} panorama image(s), ${uploadedHotspotAudioCount} hotspot audio file(s), ${uploadedHotspotInfoImageCount} info image(s), ${uploadedHotspotInfoVideoCount} info video(s).`
        : "Saved draft tour version successfully.";
  } catch (error) {
    errorMessage.value = extractApiError(
      error,
      "Could not save builder. Published versions cannot be edited.",
    );
  }
}

async function boot() {
  try {
    await loadProject();
    await loadLocation();
    await loadVersions();
    await loadVersionDetail();
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || "Could not load builder data.";
  }
}

function goBack() {
  if (window.history.length > 1) {
    router.back();
    return;
  }
  router.push("/dashboard");
}

watch([errorMessage, successMessage], scheduleMessageAutoDismiss);

onMounted(boot);

onBeforeUnmount(() => {
  clearTimeout(messageTimer);
  clearQuickLocationThumbnailPreview();
  scenes.value.forEach((scene) => {
    if (scene.preview_object_url) URL.revokeObjectURL(scene.preview_object_url);
  });
});
</script>

<template>
  <section class="builder-page">
    <header class="builder-topbar">
      <button
        class="builder-tool-button builder-back-button"
        type="button"
        @click="goBack"
      >
        &lt; Back
      </button>
      <div class="builder-brand">VR360 Builder</div>
      <div class="builder-top-actions">
        <button
          class="builder-tool-button"
          type="button"
          @click="triggerAddImage"
        >
          + Add image
        </button>
        <button
          class="builder-tool-button"
          type="button"
          @click="openImportModal"
        >
          Import JSON
        </button>
        <button
          class="builder-tool-button"
          type="button"
          @click="loadVersionDetail"
        >
          Load Tour
        </button>
        <button class="builder-save-button" type="button" @click="saveBuilder">
          Save Tour
        </button>
        <button
          class="builder-quick-button"
          type="button"
          @click="openQuickCreateModal"
        >
          + Create new tour
        </button>
        <select v-model="selectedProjectId" @change="changeProject">
          <option value="">Select project</option>
          <option
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>
        <select v-model="selectedLocationId" @change="changeLocation">
          <option value="">Select location</option>
          <option
            v-for="location in locations"
            :key="location.id"
            :value="location.id"
          >
            {{ location.name }}
          </option>
        </select>
        <select v-model="selectedVersionId" @change="loadVersionDetail">
          <option value="">Select version</option>
          <option v-for="item in versions" :key="item.id" :value="item.id">
            v{{ item.version_number }} - {{ item.status }}
          </option>
        </select>
      </div>
      <div class="builder-right-actions">
        <button
          class="builder-export-button"
          type="button"
          @click="showExportModal = true"
        >
          Export JSON
        </button>
      </div>
      <input
        ref="fileInput"
        class="hidden-input"
        type="file"
        multiple
        accept="image/*"
        @change="uploadPanorama"
      />
    </header>

    <p v-if="errorMessage" class="builder-alert error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="builder-alert success">
      {{ successMessage }}
    </p>

    <div class="builder-shell">
      <aside
        class="builder-left"
        :class="{ 'drag-over': isDraggingFile }"
        @dragover.prevent="isDraggingFile = true"
        @dragleave.prevent="isDraggingFile = false"
        @drop.prevent="onDropFiles"
      >
        <div class="panel-title-row">
          <h2>Scenes</h2>
          <span>{{ scenes.length }}</span>
        </div>

        <article
          v-for="(scene, index) in scenes"
          :key="scene.id"
          class="scene-list-item"
          :class="{
            active: scene.id === activeSceneId,
            dragging: scene.id === draggedSceneId,
            'drag-over-scene': scene.id === dragOverSceneId && scene.id !== draggedSceneId,
          }"
          draggable="true"
          role="button"
          tabindex="0"
          @dragstart="onSceneDragStart($event, scene.id)"
          @dragover="onSceneDragOver($event, scene.id)"
          @drop="onSceneDrop($event, scene.id)"
          @dragend="onSceneDragEnd"
          @click="selectScene(scene.id)"
          @keydown.enter.prevent="selectScene(scene.id)"
          @keydown.space.prevent="selectScene(scene.id)"
        >
          <span class="scene-index">{{ index + 1 }}</span>
          <span
            class="scene-thumb"
            :style="
              resolveSceneImage(scene)
                ? { backgroundImage: `url(${resolveSceneImage(scene)})` }
                : {}
            "
          ></span>
          <span class="scene-copy">
            <strong>{{ scene.name || scene.id }}</strong>
            <small
              >{{ scene.hotspots?.length || 0 }} hotspot ·
              {{ scene.group || "Default" }}</small
            >
          </span>
          <button
            class="scene-delete-button"
            type="button"
            title="Delete scene"
            aria-label="Delete scene"
            @click.stop="removeScene(scene.id)"
          >
            🗑
          </button>
        </article>

        <button class="drop-zone-button" type="button" @click="triggerAddImage">
          + Keo tha hoac click de them anh 360°
        </button>
      </aside>

      <main class="builder-canvas-panel">
        <div class="builder-canvas">
          <PanoramaViewer
            :image-url="sceneBackground"
            :hotspots="activeSceneHotspots"
            :selected-hotspot-id="selectedHotspotId"
            :initial-view="activeInitialView"
            @panorama-click="addHotspotFromCanvas"
            @hotspot-click="selectHotspot"
            @hotspot-dblclick="openHotspotTargetScene"
            @view-change="updateViewState"
          />
          <div class="viewer-help">
            {{
              !activeScene
                ? "Thêm ảnh panorama 360° để bắt đầu"
                : isDrawingInfoArea
                  ? `Drawing info area: ${infoAreaDraftPoints.length} point(s). Click wall/object edges, then Finish area.`
                  : isPlacingHotspot
                  ? "Selecting hotspot position: click image to pin point"
                  : "Drag mouse to rotate. Click + Add hotspot then click image to place point."
            }}
          </div>
          <div class="view-meter">
            <span>LON {{ viewState.lon }}°</span>
            <span>LAT {{ viewState.lat }}°</span>
            <span>FOV {{ viewState.fov }}°</span>
          </div>
        </div>
      </main>

      <aside class="builder-right">
        <h2>Inspector</h2>

        <template v-if="activeScene">
          <div class="inspector-image-row">
            <span
              class="inspector-thumb"
              :style="
                sceneBackground
                  ? { backgroundImage: `url(${sceneBackground})` }
                  : {}
              "
            ></span>
            <button
              class="builder-tool-button wide"
              type="button"
              @click="triggerAddImage"
            >
              {{ uploading ? "Uploading..." : "Change image" }}
            </button>
          </div>

          <div class="form">
            <label>Scene ID<input v-model="sceneForm.id" /></label>
            <label
              >Scene name<input
                v-model="sceneForm.name"
                @input="updateActiveSceneName"
            /></label>
            <label
              >Group<input
                v-model="sceneForm.group"
                @input="updateActiveSceneGroup"
            /></label>
            <label
              >Description<textarea
                v-model="sceneForm.description"
                rows="3"
              ></textarea>
            </label>
            <label
              >URL cloud / file<input
                v-model="sceneForm.image_url"
                placeholder="/media/... hoac https://..."
            /></label>
            <div class="actions-row">
              <button
                class="secondary-button"
                type="button"
                @click="saveSceneMeta"
              >
                Save scene
              </button>
              <button
                class="danger-button"
                type="button"
                @click="removeScene(activeScene.id)"
              >
                Delete scene
              </button>
            </div>
          </div>

          <hr />

          <section class="inspector-section">
            <h3>View</h3>
            <div class="three-inputs">
              <label>LON<input :value="viewState.lon" readonly /></label>
              <label>LAT<input :value="viewState.lat" readonly /></label>
              <label>FOV<input :value="viewState.fov" readonly /></label>
            </div>
            <button
              class="builder-outline-button"
              type="button"
              @click="saveDefaultView"
            >
              Save current view
            </button>
          </section>

          <hr />

          <section class="inspector-section">
            <div class="panel-title-row">
              <h3>Hotspots ({{ activeScene.hotspots?.length || 0 }})</h3>
              <button
                class="builder-mini-button"
                type="button"
                :class="{ active: isPlacingHotspot }"
                @click="startPlacingHotspot"
              >
                {{ isPlacingHotspot ? "Click image..." : "+ Add hotspot" }}
              </button>
              <button
                class="builder-mini-button"
                type="button"
                :class="{ active: isDrawingInfoArea }"
                @click="startDrawingInfoArea"
              >
                + Draw area
              </button>
            </div>
            <div v-if="isDrawingInfoArea" class="info-area-toolbar">
              <span>{{ infoAreaDraftPoints.length }} point(s)</span>
              <button
                type="button"
                :disabled="!infoAreaDraftPoints.length"
                @click="undoInfoAreaPoint"
              >
                Undo
              </button>
              <button
                type="button"
                :disabled="infoAreaDraftPoints.length < 3"
                @click="finishInfoArea"
              >
                Finish
              </button>
              <button type="button" @click="cancelInfoArea">Cancel</button>
            </div>
            <div v-if="activeScene.hotspots?.length" class="hotspot-list">
              <div
                v-for="(hotspot, index) in activeScene.hotspots"
                :key="hotspot.id"
                class="hotspot-list-item"
                :class="{ active: hotspot.id === selectedHotspotId }"
                role="button"
                tabindex="0"
                @click="selectHotspot(hotspot)"
                @keydown.enter.prevent="selectHotspot(hotspot)"
                @keydown.space.prevent="selectHotspot(hotspot)"
              >
                <span class="hotspot-number">{{ index + 1 }}</span>
                <span>
                  <strong>{{ hotspot.label || `Hotspot ${index + 1}` }}</strong>
                  <small>
                    Lon:{{ Math.round(Number(hotspot.lon || 0) * 10) / 10 }}°
                    Lat:{{ Math.round(Number(hotspot.lat || 0) * 10) / 10 }}° →
                    {{
                      ["info", "info_area"].includes(hotspot.type)
                        ? hotspot.info?.title || "info popup"
                        : hotspot.target_scene_id || "not selected"
                    }} ({{ hotspot.type || "point" }})
                  </small>
                </span>
                <button
                  class="hotspot-remove"
                  type="button"
                  @click.stop="
                    selectedHotspotId = hotspot.id;
                    removeHotspot();
                  "
                >
                  ×
                </button>
              </div>
            </div>
            <p v-if="!selectedHotspot" class="builder-muted">
              Click "+ Add hotspot", then click image to pin hotspot in the 360
              position.
            </p>
          </section>

          <div v-if="selectedHotspot" class="form hotspot-form">
            <h3>HOTSPOT #{{ selectedHotspotIndex + 1 }}</h3>
            <label>Label<input v-model="hotspotForm.label" /></label>
            <label>
              Type
              <select v-model="hotspotForm.type">
                <option value="point">POINT</option>
                <option value="nav">NAV</option>
                <option value="info">INFO</option>
                <option value="info_area">INFO AREA</option>
              </select>
            </label>
            <label v-if="!['info', 'info_area'].includes(hotspotForm.type)">
              Target scene
              <select v-model="hotspotForm.target_scene_id">
                <option value="">None</option>
                <option
                  v-for="scene in targetSceneOptions"
                  :key="scene.id"
                  :value="scene.id"
                  :disabled="scene.isCurrent"
                >
                  {{ scene.index }}. {{ scene.name }}
                  {{ scene.isCurrent ? "(current scene)" : "" }}
                  {{ !scene.hasImage ? "(no image)" : "" }}
                </option>
              </select>
            </label>
            <div
              v-if="['info', 'info_area'].includes(hotspotForm.type)"
              class="info-hotspot-fields"
            >
              <div class="info-editor-head">
                <span>{{ hotspotForm.type === "info_area" ? "Area content" : "Info content" }}</span>
                <small>
                  {{
                    hotspotForm.type === "info_area"
                      ? "Click glowing area to open this card."
                      : "Click hotspot to open this card."
                  }}
                </small>
              </div>
              <label>
                Title
                <input
                  v-model="hotspotForm.info_title"
                  placeholder="Painting / object / highlight name"
                />
              </label>
              <div class="info-image-uploader">
                <span
                  class="info-image-preview"
                  :style="
                    selectedHotspot.info?.image_url
                      ? { backgroundImage: `url(${selectedHotspot.info.image_url})` }
                      : {}
                  "
                >
                  <small v-if="!selectedHotspot.info?.image_url">No image</small>
                </span>
                <div class="info-image-actions">
                  <label class="info-upload-button">
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      @change="onHotspotInfoImageChange"
                    />
                  </label>
                  <input
                    v-model="hotspotForm.info_image_url"
                    placeholder="Or paste image URL..."
                  />
                  <small>
                    {{
                      selectedHotspot.local_info_image_file
                        ? `Selected: ${selectedHotspot.local_info_image_file.name}`
                        : "Image will show in the viewer popup."
                    }}
                  </small>
                </div>
              </div>
              <div class="info-media-uploader">
                <div class="info-media-card">
                  <strong>Video</strong>
                  <small>Upload MP4/WebM or paste a hosted video URL.</small>
                  <label class="info-upload-button">
                    Upload video
                    <input
                      type="file"
                      accept="video/*"
                      @change="onHotspotInfoVideoChange"
                    />
                  </label>
                  <input
                    v-model="hotspotForm.info_video_url"
                    placeholder="Video URL /media/... or https://..."
                  />
                  <small>
                    {{
                      selectedHotspot.local_info_video_file
                        ? `Selected: ${selectedHotspot.local_info_video_file.name}`
                        : selectedHotspot.info?.video_url
                          ? "Video will be shown in the popup."
                          : "No uploaded video selected."
                    }}
                  </small>
                </div>
                <div class="info-media-card">
                  <strong>YouTube</strong>
                  <small>Paste a YouTube watch/share/embed link.</small>
                  <input
                    v-model="hotspotForm.info_youtube_url"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              </div>
              <label>
                Description
                <textarea
                  v-model="hotspotForm.info_description"
                  rows="4"
                  placeholder="This text is shown when viewer clicks the info hotspot."
                ></textarea>
              </label>
              <label class="checkbox-row info-glow-row">
                <input v-model="hotspotForm.glow" type="checkbox" />
                <span>Glow effect</span>
              </label>
            </div>
            <div class="two-inputs">
              <label
                >LON<input v-model="hotspotForm.lon" type="number" step="0.1"
              /></label>
              <label
                >LAT<input v-model="hotspotForm.lat" type="number" step="0.1"
              /></label>
            </div>
            <div class="two-inputs">
              <label
                >X %<input
                  v-model="hotspotForm.x"
                  type="number"
                  min="0"
                  max="100"
              /></label>
              <label
                >Y %<input
                  v-model="hotspotForm.y"
                  type="number"
                  min="0"
                  max="100"
              /></label>
            </div>
            <label>
              Hotspot audio
              <input
                type="file"
                accept="audio/*"
                @change="onHotspotAudioChange"
              />
            </label>
            <label>
              Audio URL
              <input
                v-model="hotspotForm.audio_url"
                placeholder="/media/... or https://..."
              />
            </label>
            <p class="builder-muted">
              {{
                selectedHotspot.local_audio_file
                  ? `Selected: ${selectedHotspot.local_audio_file.name}`
                  : hotspotForm.audio_url
                    ? "Hotspot has audio."
                    : "No audio for this hotspot."
              }}
            </p>
            <div class="actions-row">
              <button class="primary-button" type="button" @click="saveHotspot">
                Save hotspot
              </button>
              <button
                class="danger-button"
                type="button"
                @click="removeHotspot"
              >
                Delete
              </button>
            </div>
          </div>
        </template>

        <div v-else class="empty-inspector">
          <p>Select a scene on the left to edit properties.</p>
          <button
            class="builder-tool-button wide"
            type="button"
            @click="addBlankScene"
          >
            + Create empty scene
          </button>
        </div>
      </aside>
    </div>

    <div
      v-if="showExportModal"
      class="builder-modal-backdrop"
      @click.self="showExportModal = false"
    >
      <div class="builder-modal">
        <div class="panel-title-row">
          <h2>Export TOUR_DATA</h2>
          <button
            class="builder-mini-button"
            type="button"
            @click="showExportModal = false"
          >
            Close
          </button>
        </div>
        <textarea readonly rows="18" :value="exportText"></textarea>
        <div class="actions-row">
          <button
            class="builder-save-button"
            type="button"
            @click="downloadExportJson"
          >
            Download JSON
          </button>
          <button
            class="builder-tool-button"
            type="button"
            @click="copyExportJson"
          >
            Copy
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showImportModal"
      class="builder-modal-backdrop"
      @click.self="showImportModal = false"
    >
      <div class="builder-modal">
        <div class="panel-title-row">
          <h2>Import JSON</h2>
          <button
            class="builder-mini-button"
            type="button"
            @click="showImportModal = false"
          >
            Cancel
          </button>
        </div>
        <textarea
          v-model="importText"
          rows="18"
          placeholder="Paste TOUR_DATA JSON here..."
        ></textarea>
        <div class="actions-row">
          <button
            class="builder-save-button"
            type="button"
            @click="applyImportJson"
          >
            Nhap
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showQuickCreateModal"
      class="builder-modal-backdrop"
      @click.self="showQuickCreateModal = false"
    >
      <div class="builder-modal builder-modal-small">
        <div class="panel-title-row">
          <h2>Select or create tour</h2>
          <button
            class="builder-mini-button"
            type="button"
            @click="showQuickCreateModal = false"
          >
            Close
          </button>
        </div>
        <div class="form">
          <section class="quick-step">
            <div class="panel-title-row">
              <h3>1. Project</h3>
              <button
                class="builder-mini-button"
                type="button"
                @click="
                  quickCreateForm.create_project
                    ? useExistingProject()
                    : enableCreateProject()
                "
              >
                {{
                  quickCreateForm.create_project
                    ? "Select project có sẵn"
                    : "+ Create new project"
                }}
              </button>
            </div>

            <template v-if="quickCreateForm.create_project">
              <label
                >New project name *<input
                  v-model="quickCreateForm.project_name"
                  placeholder="VD: Xa Co Do"
              /></label>
              <label
                >Description project<textarea
                  v-model="quickCreateForm.project_description"
                  rows="2"
                ></textarea>
              </label>
            </template>
            <label v-else>
              Select project co san
              <select
                v-model="quickCreateForm.project_id"
                @change="loadQuickLocation"
              >
                <option value="">Select project</option>
                <option
                  v-for="project in projects"
                  :key="project.id"
                  :value="project.id"
                >
                  {{ project.name }}
                </option>
              </select>
            </label>
          </section>

          <section class="quick-step">
            <div class="panel-title-row">
              <h3>2. Location</h3>
              <button
                class="builder-mini-button"
                type="button"
                :disabled="
                  quickCreateForm.create_project ||
                  (!quickCreateForm.create_project &&
                    !quickCreateForm.project_id)
                "
                @click="
                  quickCreateForm.create_location
                    ? useExistingLocation()
                    : enableCreateLocation()
                "
              >
                {{
                  quickCreateForm.create_location
                    ? "Select location co san"
                    : "+ Create new location"
                }}
              </button>
            </div>

            <template v-if="quickCreateForm.create_location">
              <label
                >New location name *<input
                  v-model="quickCreateForm.location_name"
                  placeholder="VD: Den Dan Ha"
              /></label>
              <label
                >Description location<textarea
                  v-model="quickCreateForm.location_description"
                  rows="2"
                ></textarea>
              </label>
              <div class="thumbnail-edit-block">
                <span class="form-label">Location thumbnail</span>
                <div class="thumbnail-edit-grid">
                  <div
                    class="thumbnail-preview"
                    :style="
                      quickCreateForm.location_thumbnail_preview
                        ? {
                            backgroundImage: `url(${quickCreateForm.location_thumbnail_preview})`,
                          }
                        : {}
                    "
                  >
                    <span v-if="!quickCreateForm.location_thumbnail_preview">
                      No thumbnail
                    </span>
                  </div>
                  <label class="thumbnail-upload-button">
                    <input
                      type="file"
                      accept="image/*"
                      @change="onQuickLocationThumbnailChange"
                    />
                    <strong>Upload thumbnail</strong>
                    <small>
                      Anh nay dung cho card publish tren Home, dep hon anh
                      panorama.
                    </small>
                  </label>
                </div>
              </div>
              <div class="two-inputs">
                <label
                  >Latitude<input
                    v-model="quickCreateForm.latitude"
                    type="number"
                    step="0.000001"
                /></label>
                <label
                  >Longitude<input
                    v-model="quickCreateForm.longitude"
                    type="number"
                    step="0.000001"
                /></label>
              </div>
            </template>
            <label v-else>
              Select location co san
              <select
                v-model="quickCreateForm.location_id"
                :disabled="!quickLocation.length"
                @change="loadQuickVersions"
              >
                <option value="">Select location</option>
                <option
                  v-for="location in quickLocation"
                  :key="location.id"
                  :value="location.id"
                >
                  {{ location.name }}
                </option>
              </select>
            </label>
          </section>

          <section class="quick-step">
            <div class="panel-title-row">
              <h3>3. Version</h3>
              <button
                v-if="!quickCreateForm.create_location"
                class="builder-mini-button"
                type="button"
                @click="
                  quickCreateForm.create_version =
                    !quickCreateForm.create_version
                "
              >
                {{
                  quickCreateForm.create_version
                    ? "Select version co san"
                    : "+ Create new version"
                }}
              </button>
            </div>

            <label
              v-if="
                !quickCreateForm.create_version &&
                !quickCreateForm.create_location
              "
            >
              Select version de chinh sua
              <select
                v-model="quickCreateForm.version_id"
                :disabled="!quickVersions.length"
              >
                <option value="">Select version</option>
                <option
                  v-for="item in quickVersions"
                  :key="item.id"
                  :value="item.id"
                >
                  v{{ item.version_number }} - {{ item.status }} -
                  {{ item.label || "No label" }}
                </option>
              </select>
            </label>

            <label v-else>
              New draft version label
              <input
                v-model="quickCreateForm.version_label"
                placeholder="Leave empty to auto-name"
              />
            </label>
            <template
              v-if="
                quickCreateForm.create_version ||
                quickCreateForm.create_location
              "
            >
              <label v-if="quickCreateForm.create_version && !quickCreateForm.create_location">
                Inherit from version
                <select
                  v-model="quickCreateForm.source_version_id"
                  :disabled="!quickVersions.length"
                >
                  <option value="">Create empty version</option>
                  <option
                    v-for="item in quickVersions"
                    :key="item.id"
                    :value="item.id"
                  >
                    v{{ item.version_number }} - {{ item.status }} -
                    {{ item.label || "No label" }}
                  </option>
                </select>
              </label>
              <p
                v-if="quickCreateForm.create_version && !quickCreateForm.create_location"
                class="builder-muted"
              >
                New draft will copy scenes, hotspots, audio, logo and media from selected version.
              </p>
              <label>
                Background audio
                <input
                  type="file"
                  accept="audio/*"
                  @change="onQuickVersionAudioChange"
                />
              </label>
              <label>
                Point hotspot logo
                <input
                  type="file"
                  accept="image/*"
                  @change="onQuickVersionLogoChange"
                />
              </label>
              <p class="builder-muted">
                Logo này sẽ dùng cho hotspot loai point trong viewer.
              </p>
            </template>
            <p v-if="quickCreateForm.create_location" class="builder-muted">
              New location has no version, so Builder will create a new draft
              version.
            </p>
          </section>

          <div class="actions-row">
            <button
              class="builder-save-button"
              type="button"
              @click="quickCreateTour"
            >
              {{
                quickCreateForm.create_version
                  ? "Create/select tour"
                  : "Open version to edit"
              }}
            </button>
            <button
              class="builder-tool-button"
              type="button"
              @click="showQuickCreateModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
