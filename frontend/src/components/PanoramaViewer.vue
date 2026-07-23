<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
  imageUrl: {
    type: String,
    default: '',
  },
  hotspots: {
    type: Array,
    default: () => [],
  },
  selectedHotspotId: {
    type: String,
    default: '',
  },
  initialView: {
    type: Object,
    default: () => ({ lon: 0, lat: 0, fov: 75 }),
  },
  hotspotDisplayMode: {
    type: String,
    default: 'builder',
  },
  pointHotspotLogo: {
    type: String,
    default: '',
  },
  autoRotate: {
    type: Boolean,
    default: false,
  },
  autoRotateDelay: {
    type: Number,
    default: 2500,
  },
  autoRotateSpeed: {
    type: Number,
    default: 2.5,
  },
});

const emit = defineEmits(['panorama-click', 'hotspot-click', 'hotspot-dblclick', 'view-change']);

const container = ref(null);
const projectedHotspots = ref([]);
const projectedInfoAreas = ref([]);
const isTextureLoading = ref(false);
const hasImage = computed(() => Boolean(props.imageUrl));

let renderer;
let scene;
let camera;
let mesh;
let texture;
let transitionMesh;
let transitionTexture;
let transitionStartedAt = 0;
const transitionDuration = 650;
let animationId;
let resizeObserver;
let raycaster;
let pointer;
let isDragging = false;
let pointerDown = null;
let lastInteractionAt = 0;
let lastFrameAt = 0;
let cameraTween = null;
let lon = 0;
let lat = 0;
let fov = 75;
const MIN_LAT = -70;
const MAX_LAT = 82;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampLat(value) {
  return clamp(Number(value || 0), MIN_LAT, MAX_LAT);
}

function emitViewChange() {
  emit('view-change', {
    lon: Math.round(lon * 10) / 10,
    lat: Math.round(lat * 10) / 10,
    fov: Math.round(fov),
  });
}

function markInteraction() {
  lastInteractionAt = performance.now();
}

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function shortestLonDelta(from, to) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

function lonLatToVector(hotspotLon, hotspotLat, radius = 500) {
  const phi = THREE.MathUtils.degToRad(90 - Number(hotspotLat || 0));
  const theta = THREE.MathUtils.degToRad(Number(hotspotLon || 0));
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function vectorToLonLat(vector) {
  const normalized = vector.clone().normalize();
  const nextLon = THREE.MathUtils.radToDeg(Math.atan2(normalized.z, normalized.x));
  const nextLat = THREE.MathUtils.radToDeg(Math.asin(normalized.y));
  return {
    lon: Math.round(nextLon * 10) / 10,
    lat: Math.round(nextLat * 10) / 10,
  };
}

function youtubeEmbedUrl(url) {
  if (!url) return '';
  const value = String(url).trim();
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/i,
    /youtu\.be\/([^?&]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i,
    /youtube\.com\/shorts\/([^?&/]+)/i,
  ];
  const match = patterns.map((pattern) => value.match(pattern)).find(Boolean);
    if (!match?.[1]) return '';
    const params = new URLSearchParams({
      controls: '0',
      disablekb: '1',
      fs: '0',
      modestbranding: '1',
      playsinline: '1',
      rel: '0',
    });
    return `https://www.youtube.com/embed/${match[1]}?${params.toString()}`;
  }

function hasAreaInlineMedia(area) {
  return Boolean(youtubeEmbedUrl(area.info?.youtube_url) || area.info?.video_url);
}

function updateProjectedHotspots() {
  if (!container.value || !camera || isTextureLoading.value) {
    projectedHotspots.value = [];
    projectedInfoAreas.value = [];
    return;
  }

  const width = container.value.clientWidth || 1;
  const height = container.value.clientHeight || 1;
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  function projectLonLat(item) {
    const worldPosition = lonLatToVector(item.lon, item.lat);
    const directionToPoint = worldPosition.clone().normalize();
    const isInFront = cameraDirection.dot(directionToPoint) > 0;
    const screenPosition = worldPosition.clone().project(camera);
    return {
      visible:
        isInFront &&
        screenPosition.z > -1 &&
        screenPosition.z < 1 &&
        screenPosition.x >= -1.2 &&
        screenPosition.x <= 1.2 &&
        screenPosition.y >= -1.2 &&
        screenPosition.y <= 1.2,
      screenX: (screenPosition.x * 0.5 + 0.5) * width,
      screenY: (-screenPosition.y * 0.5 + 0.5) * height,
    };
  }

  projectedHotspots.value = props.hotspots
    .filter((hotspot) => hotspot.type !== 'info_area')
    .map((hotspot, index) => {
      const projected = projectLonLat(hotspot);

      return {
        ...hotspot,
        index,
        ...projected,
      };
    })
    .filter((hotspot) => hotspot.visible);

  projectedInfoAreas.value = props.hotspots
    .filter((hotspot) => hotspot.type === 'info_area' && Array.isArray(hotspot.area_points))
    .map((hotspot, index) => {
      const projectedPoints = hotspot.area_points.map(projectLonLat);
      const visiblePoints = projectedPoints.filter((point) => point.visible);
      const minimumPoints = hotspot.isDraft ? 2 : 3;
      const allPointsVisible = projectedPoints.length > 0 && visiblePoints.length === projectedPoints.length;
      const xs = projectedPoints.map((point) => point.screenX);
      const ys = projectedPoints.map((point) => point.screenY);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const boxWidth = Math.max(...xs) - Math.min(...xs);
      const boxHeight = Math.max(...ys) - Math.min(...ys);
      const crossesScreenEdge = boxWidth > width * 0.72 || boxHeight > height * 0.72;
      const canRenderDraft = hotspot.isDraft && projectedPoints.length >= minimumPoints && visiblePoints.length >= minimumPoints;
      const canRenderArea = !hotspot.isDraft && projectedPoints.length >= minimumPoints && allPointsVisible && !crossesScreenEdge;
        const drawablePoints = hotspot.isDraft ? visiblePoints : projectedPoints;
        const clipPoints = drawablePoints.map((point) => {
          const x = boxWidth ? ((point.screenX - minX) / boxWidth) * 100 : 0;
          const y = boxHeight ? ((point.screenY - minY) / boxHeight) * 100 : 0;
          return `${Math.min(100, Math.max(0, x)).toFixed(2)}% ${Math.min(100, Math.max(0, y)).toFixed(2)}%`;
        });
        return {
          ...hotspot,
          index,
          visible: canRenderDraft || canRenderArea,
          polygonPoints: drawablePoints.map((point) => `${point.screenX},${point.screenY}`).join(' '),
          mediaClipPath: clipPoints.length >= 3 ? `polygon(${clipPoints.join(', ')})` : '',
          box: {
            left: minX,
            top: minY,
            width: boxWidth,
          height: boxHeight,
          },
          mediaBox: {
            left: minX,
            top: minY,
            width: boxWidth,
            height: boxHeight,
          },
        youtube_embed_url: youtubeEmbedUrl(hotspot.info?.youtube_url),
      };
    })
    .filter((area) => area.visible);
}

function updateCamera() {
  lat = clampLat(lat);
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon);
  const target = new THREE.Vector3(
    500 * Math.sin(phi) * Math.cos(theta),
    500 * Math.cos(phi),
    500 * Math.sin(phi) * Math.sin(theta),
  );
  camera.lookAt(target);
  camera.fov = fov;
  camera.updateProjectionMatrix();
}

function renderLoop() {
  const now = performance.now();
  const deltaSeconds = lastFrameAt ? (now - lastFrameAt) / 1000 : 0;
  lastFrameAt = now;
  if (cameraTween) {
    const progress = Math.min((now - cameraTween.startedAt) / cameraTween.duration, 1);
    const eased = easeInOutCubic(progress);
    lon = cameraTween.from.lon + cameraTween.lonDelta * eased;
    lat = cameraTween.from.lat + (cameraTween.to.lat - cameraTween.from.lat) * eased;
    fov = cameraTween.from.fov + (cameraTween.to.fov - cameraTween.from.fov) * eased;
    emitViewChange();
    if (progress >= 1) {
      lon = cameraTween.to.lon;
      lat = cameraTween.to.lat;
      fov = cameraTween.to.fov;
      cameraTween.resolve();
      cameraTween = null;
    }
  }
  if (
    props.autoRotate &&
    hasImage.value &&
    !isDragging &&
    !cameraTween &&
    now - lastInteractionAt >= props.autoRotateDelay
  ) {
    lon += props.autoRotateSpeed * deltaSeconds;
    emitViewChange();
  }
  updateCamera();
  updateProjectedHotspots();
  updateTransitionFade();
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(renderLoop);
}

function animateToView(targetView = {}, duration = 520) {
  markInteraction();
  cameraTween?.resolve?.();
  return new Promise((resolve) => {
    const targetLon = Number(targetView.lon ?? lon);
    const targetLat = clampLat(targetView.lat ?? lat);
    const targetFov = clamp(Number(targetView.fov ?? fov), 35, 100);
    cameraTween = {
      startedAt: performance.now(),
      duration,
      from: { lon, lat, fov },
      to: { lon: targetLon, lat: targetLat, fov: targetFov },
      lonDelta: shortestLonDelta(lon, targetLon),
      resolve,
    };
  });
}

function resize() {
  if (!container.value || !renderer || !camera) return;
  const width = container.value.clientWidth || 1;
  const height = container.value.clientHeight || 1;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  updateProjectedHotspots();
}

function disposeTexture() {
  if (texture) {
    texture.dispose();
    texture = null;
  }
}

function clearTransition() {
  if (transitionMesh) {
    scene?.remove(transitionMesh);
    transitionMesh.geometry.dispose();
    transitionMesh.material.dispose();
    transitionMesh = null;
  }
  if (transitionTexture) {
    transitionTexture.dispose();
    transitionTexture = null;
  }
}

function startTextureTransition(oldTexture) {
  if (!oldTexture || !scene) return;
  clearTransition();
  const geometry = new THREE.SphereGeometry(499, 64, 40);
  geometry.scale(-1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: oldTexture,
    transparent: true,
    opacity: 1,
    depthWrite: false,
  });
  transitionMesh = new THREE.Mesh(geometry, material);
  transitionMesh.renderOrder = 2;
  transitionTexture = oldTexture;
  transitionStartedAt = performance.now();
  scene.add(transitionMesh);
}

function updateTransitionFade() {
  if (!transitionMesh) return;
  const progress = Math.min((performance.now() - transitionStartedAt) / transitionDuration, 1);
  const eased = 1 - Math.pow(1 - progress, 3);
  transitionMesh.material.opacity = 1 - eased;
  if (progress >= 1) clearTransition();
}

function loadTexture() {
  if (!mesh) return;
  isTextureLoading.value = true;
  projectedHotspots.value = [];
  projectedInfoAreas.value = [];
  if (!props.imageUrl) {
    disposeTexture();
    clearTransition();
    mesh.material.map = null;
    mesh.material.color.set(0x111827);
    mesh.material.needsUpdate = true;
    isTextureLoading.value = false;
    return;
  }
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');
  loader.load(
    props.imageUrl,
    (loadedTexture) => {
      const oldTexture = texture;
      texture = loadedTexture;
      texture.colorSpace = THREE.SRGBColorSpace;
      mesh.material.map = texture;
      mesh.material.color.set(0xffffff);
      mesh.material.needsUpdate = true;
      if (oldTexture) startTextureTransition(oldTexture);
      isTextureLoading.value = false;
      resize();
    },
    undefined,
    () => {
      mesh.material.map = null;
      mesh.material.color.set(0x111827);
      mesh.material.needsUpdate = true;
      isTextureLoading.value = false;
    },
  );
}

function initThree() {
  if (!container.value) return;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(fov, 1, 1, 1100);
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  const geometry = new THREE.SphereGeometry(500, 64, 40);
  geometry.scale(-1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x111827 });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setClearColor(0x111827, 1);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.domElement.className = 'panorama-canvas';
  container.value.appendChild(renderer.domElement);
  resize();
  loadTexture();
  markInteraction();
  renderLoop();
}

function onPointerDown(event) {
  if (!hasImage.value) return;
  markInteraction();
  isDragging = true;
  pointerDown = {
    x: event.clientX,
    y: event.clientY,
    lon,
    lat,
  };
}

function onPointerMove(event) {
  if (!isDragging || !pointerDown) return;
  markInteraction();
  lon = pointerDown.lon - (event.clientX - pointerDown.x) * 0.12;
  lat = clampLat(pointerDown.lat + (event.clientY - pointerDown.y) * 0.12);
  emitViewChange();
}

function onPointerUp(event) {
  if (!isDragging || !pointerDown) return;
  markInteraction();
  const moved = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
  isDragging = false;
  pointerDown = null;
  if (moved < 5 && hasImage.value) {
    const rect = container.value?.getBoundingClientRect();
    if (!rect || !raycaster || !pointer || !mesh) return;
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersection = raycaster.intersectObject(mesh, false)[0];
    const sphericalPoint = intersection ? vectorToLonLat(intersection.point) : { lon, lat };

    emit('panorama-click', {
      x: ((event.offsetX || 0) / (container.value?.clientWidth || 1)) * 100,
      y: ((event.offsetY || 0) / (container.value?.clientHeight || 1)) * 100,
      lon: sphericalPoint.lon,
      lat: sphericalPoint.lat,
    });
  }
}

function onWheel(event) {
  if (!hasImage.value) return;
  markInteraction();
  event.preventDefault();
  fov = clamp(fov + event.deltaY * 0.04, 35, 100);
  emitViewChange();
}

watch(
  () => props.imageUrl,
  async () => {
    await nextTick();
    loadTexture();
  },
);

watch(
  () => props.hotspots,
  () => updateProjectedHotspots(),
  { deep: true },
);

watch(
  () => props.initialView,
  (value) => {
    lon = Number(value?.lon ?? 0);
    lat = clampLat(value?.lat ?? 0);
      fov = Number(value?.fov ?? 75);
    markInteraction();
    emitViewChange();
  },
  { deep: true, immediate: true },
);

onMounted(() => {
  initThree();
  window.addEventListener('resize', resize);
  if (container.value) {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container.value);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  resizeObserver?.disconnect();
  cancelAnimationFrame(animationId);
  disposeTexture();
  clearTransition();
  if (mesh) {
    mesh.geometry.dispose();
    mesh.material.dispose();
  }
  renderer?.dispose();
});

defineExpose({
  animateToView,
});
</script>

<template>
  <div
    ref="container"
    class="panorama-viewer"
    :class="{ empty: !hasImage }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerUp"
    @wheel="onWheel"
    @click="markInteraction"
  >
    <span v-if="!hasImage" class="canvas-empty-text">
      Upload panorama JPG 360 de xem preview, keo chuot de xoay ngang/doc.
    </span>
    <svg v-if="projectedInfoAreas.length" class="panorama-info-area-layer" aria-hidden="true">
      <template v-for="area in projectedInfoAreas" :key="area.id">
        <polyline
          v-if="area.isDraft"
          class="panorama-info-area draft"
          :points="area.polygonPoints"
        />
        <polygon
          v-else
          class="panorama-info-area"
          :points="area.polygonPoints"
          @click.stop="markInteraction(); emit('hotspot-click', area, $event)"
        />
      </template>
    </svg>
    <div
      v-for="area in projectedInfoAreas.filter(hasAreaInlineMedia)"
      :key="`${area.id}-media`"
      class="panorama-info-area-media"
        :style="{
          left: `${area.mediaBox.left}px`,
          top: `${area.mediaBox.top}px`,
          width: `${area.mediaBox.width}px`,
          height: `${area.mediaBox.height}px`,
          clipPath: area.mediaClipPath,
          WebkitClipPath: area.mediaClipPath,
        }"
      @click.stop="markInteraction(); emit('hotspot-click', area, $event)"
    >
      <iframe
          v-if="area.youtube_embed_url"
          :src="area.youtube_embed_url"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      <video
        v-else
        :src="area.info.video_url"
        autoplay
        muted
        loop
        playsinline
        controls
      ></video>
    </div>
    <button
      v-for="hotspot in projectedHotspots"
      :key="hotspot.id"
      class="panorama-hotspot"
      :class="[
        hotspotDisplayMode === 'viewer' ? `viewer-hotspot viewer-hotspot-${hotspot.type || 'point'}` : 'hotspot-dot',
        { active: hotspot.id === selectedHotspotId },
      ]"
      :style="{ left: `${hotspot.screenX}px`, top: `${hotspot.screenY}px` }"
      type="button"
      @click.stop="markInteraction(); emit('hotspot-click', hotspot, $event)"
      @dblclick.stop="markInteraction(); emit('hotspot-dblclick', hotspot, $event)"
    >
      <template v-if="hotspotDisplayMode === 'viewer' && hotspot.type === 'nav'">
        <span class="viewer-nav-arrow"><i class="ti-angle-double-up" aria-hidden="true"></i></span>
        <span class="viewer-hotspot-preview" v-if="hotspot.preview_image" :style="{ backgroundImage: `url(${hotspot.preview_image})` }"></span>
      </template>
      <template v-else>
        <span
          v-if="hotspotDisplayMode === 'viewer' && pointHotspotLogo && hotspot.type !== 'info'"
          class="viewer-point-logo"
          :style="{ backgroundImage: `url(${pointHotspotLogo})` }"
        ></span>
        <span v-else-if="hotspotDisplayMode === 'viewer' && hotspot.type === 'info'" class="viewer-info-dot">i</span>
        <span v-else class="viewer-point-dot">{{ hotspot.index + 1 }}</span>
        <span class="hotspot-label">{{ hotspot.label || 'Hotspot' }}</span>
        <span class="viewer-hotspot-preview" v-if="hotspotDisplayMode === 'viewer' && hotspot.preview_image" :style="{ backgroundImage: `url(${hotspot.preview_image})` }"></span>
      </template>
    </button>
  </div>
</template>
