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
});

const emit = defineEmits(['panorama-click', 'hotspot-click', 'view-change']);

const container = ref(null);
const projectedHotspots = ref([]);
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
let lon = 0;
let lat = 0;
let fov = 75;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function emitViewChange() {
  emit('view-change', {
    lon: Math.round(lon * 10) / 10,
    lat: Math.round(lat * 10) / 10,
    fov: Math.round(fov),
  });
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

function updateProjectedHotspots() {
  if (!container.value || !camera) {
    projectedHotspots.value = [];
    return;
  }

  const width = container.value.clientWidth || 1;
  const height = container.value.clientHeight || 1;
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  projectedHotspots.value = props.hotspots
    .map((hotspot, index) => {
      const worldPosition = lonLatToVector(hotspot.lon, hotspot.lat);
      const directionToHotspot = worldPosition.clone().normalize();
      const isInFront = cameraDirection.dot(directionToHotspot) > 0;
      const screenPosition = worldPosition.clone().project(camera);

      return {
        ...hotspot,
        index,
        visible:
          isInFront &&
          screenPosition.z > -1 &&
          screenPosition.z < 1 &&
          screenPosition.x >= -1.12 &&
          screenPosition.x <= 1.12 &&
          screenPosition.y >= -1.12 &&
          screenPosition.y <= 1.12,
        screenX: (screenPosition.x * 0.5 + 0.5) * width,
        screenY: (-screenPosition.y * 0.5 + 0.5) * height,
      };
    })
    .filter((hotspot) => hotspot.visible);
}

function updateCamera() {
  lat = clamp(lat, -85, 85);
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
  updateCamera();
  updateProjectedHotspots();
  updateTransitionFade();
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(renderLoop);
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
  if (!props.imageUrl) {
    disposeTexture();
    clearTransition();
    mesh.material.map = null;
    mesh.material.color.set(0x111827);
    mesh.material.needsUpdate = true;
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
      resize();
    },
    undefined,
    () => {
      mesh.material.map = null;
      mesh.material.color.set(0x111827);
      mesh.material.needsUpdate = true;
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
  renderLoop();
}

function onPointerDown(event) {
  if (!hasImage.value) return;
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
  lon = pointerDown.lon - (event.clientX - pointerDown.x) * 0.12;
  lat = pointerDown.lat + (event.clientY - pointerDown.y) * 0.12;
  emitViewChange();
}

function onPointerUp(event) {
  if (!isDragging || !pointerDown) return;
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
    lat = Number(value?.lat ?? 0);
    fov = Number(value?.fov ?? 75);
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
  >
    <span v-if="!hasImage" class="canvas-empty-text">
      Upload panorama JPG 360 de xem preview, keo chuot de xoay ngang/doc.
    </span>
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
      @click.stop="emit('hotspot-click', hotspot, $event)"
    >
      <template v-if="hotspotDisplayMode === 'viewer' && hotspot.type === 'nav'">
        <span class="viewer-nav-arrow"><i class="ti-angle-double-up" aria-hidden="true"></i></span>
        <span class="viewer-hotspot-preview" v-if="hotspot.preview_image" :style="{ backgroundImage: `url(${hotspot.preview_image})` }"></span>
      </template>
      <template v-else>
        <span class="viewer-point-dot">{{ hotspot.index + 1 }}</span>
        <span class="hotspot-label">{{ hotspot.label || 'Hotspot' }}</span>
        <span class="viewer-hotspot-preview" v-if="hotspotDisplayMode === 'viewer' && hotspot.preview_image" :style="{ backgroundImage: `url(${hotspot.preview_image})` }"></span>
      </template>
    </button>
  </div>
</template>
