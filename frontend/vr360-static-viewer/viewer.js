import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

// ---------------------------------------------------------------------------
// VR360 Viewer (standalone) — visual/UX language mirrors src/vr360-viewer
// (ViewerPill, ScenesSidebar, InfoPoiPopup, area_landmark). No topbar — each
// location is opened directly via its own link.
// Reads window.TOUR_DATA from data.js: an array of published versions, one
// per location, each with `location`, `data.scenes[]`.
// URL: ?q=<slug-or-id>  e.g. ?q=dinh-tot-dong
// ---------------------------------------------------------------------------

const els = {
  panorama: document.getElementById("panorama-viewer"),
  canvas: document.getElementById("pano-canvas"),
  areaLayer: document.getElementById("area-layer"),
  hotspotLayer: document.getElementById("hotspot-layer"),
  landmarkLabelLayer: document.getElementById("landmark-label-layer"),
  sidebarHeader: document.getElementById("scenes-sidebar-header"),
  sidebarRoot: document.getElementById("sidebar-root"),
  sidebar: document.getElementById("scenes-sidebar"),
  sidebarTrigger: document.getElementById("sidebar-trigger"),
  sidebarToggleTab: document.getElementById("sidebar-toggle-tab"),
  scenesList: document.getElementById("scenes-list"),
  modalLayer: document.getElementById("modal-layer"),
  stateOverlay: document.getElementById("state-overlay"),
  stateTitle: document.getElementById("state-title"),
  stateMessage: document.getElementById("state-message"),
  btnHome: document.getElementById("btn-home"),
  btnAutorotate: document.getElementById("btn-autorotate"),
  btnFullscreen: document.getElementById("btn-fullscreen"),
  btnPrev: document.getElementById("btn-prev"),
  btnNext: document.getElementById("btn-next"),
  btnSidebarToggle: document.getElementById("btn-sidebar-toggle"),
  btnSidebarFullscreen: document.getElementById("btn-sidebar-fullscreen"),
  btnSidebarPoi: document.getElementById("btn-sidebar-poi"),
  btnSidebarAutorotate: document.getElementById("btn-sidebar-autorotate"),
  btnImportJson: document.getElementById("btn-import-json"),
  jsonFileInput: document.getElementById("json-file-input"),
};

const params = new URLSearchParams(window.location.search);

// --- State -------------------------------------------------------------
const state = {
  tours: [],
  activeTourId: "",
  activeSceneId: "",
  view: { lon: 0, lat: 0, fov: 75 },
  autoRotate: false,
  poiHidden: false,
  visitedSceneIds: new Set(),
  sidebarExpanded: false,
};

let renderer, scene, camera, mesh, textureLoader;
let dragging = false;
let lastPointer = null;
const activePointers = new Map();
let pinchStartDistance = 0;
let pinchStartFov = 75;

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveUrl(url) {
  if (!url) return "";
  const value = String(url);
  if (/^(blob:|data:|https?:)/i.test(value)) return value;
  const base = window.ASSET_BASE_URL || "";
  return `${base}${value.startsWith("/") ? value : `/${value}`}`;
}

function pickSceneImage(sceneData) {
  return resolveUrl(sceneData.image || sceneData.thumb || "");
}

function youtubeEmbedUrl(url) {
  if (!url) return "";
  const value = String(url).trim();
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/i,
    /youtu\.be\/([^?&]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i,
    /youtube\.com\/shorts\/([^?&/]+)/i,
  ];
  const match = patterns.map((p) => value.match(p)).find(Boolean);
  return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : "";
}

function showState(title, message) {
  els.stateTitle.textContent = title;
  els.stateMessage.innerHTML = message || "";
  els.stateOverlay.hidden = false;
}
function hideState() {
  els.stateOverlay.hidden = true;
}

function activeTour() {
  return state.tours.find((t) => t.id === state.activeTourId) || null;
}
function activeScene() {
  return activeTour()?.scenes.find((s) => s.id === state.activeSceneId) || null;
}
function activeSceneIndex() {
  const tour = activeTour();
  if (!tour) return -1;
  return tour.scenes.findIndex((s) => s.id === state.activeSceneId);
}

// --- Three.js setup ------------------------------------------------------
function initThree() {
  renderer = new THREE.WebGLRenderer({ canvas: els.canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(state.view.fov, 1, 1, 1100);

  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x111318 });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = "anonymous";

  window.addEventListener("resize", onResize);
  onResize();
  requestAnimationFrame(animate);
}

function onResize() {
  const { clientWidth, clientHeight } = els.panorama;
  renderer.setSize(clientWidth, clientHeight, false);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  if (state.autoRotate && !dragging) {
    state.view.lon += 0.03;
  }
  applyView();
  renderOverlays();
  renderer.render(scene, camera);
}

function applyView() {
  const lat = Math.max(-85, Math.min(85, state.view.lat));
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(state.view.lon);
  const target = new THREE.Vector3(
    500 * Math.sin(phi) * Math.cos(theta),
    500 * Math.cos(phi),
    500 * Math.sin(phi) * Math.sin(theta),
  );
  camera.lookAt(target);
  camera.fov = state.view.fov;
  camera.updateProjectionMatrix();
}

function directionForLonLat(lon, lat, radius = 490) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function centroid(points) {
  const sum = points.reduce(
    (acc, p) => ({ lon: acc.lon + p.lon, lat: acc.lat + p.lat }),
    { lon: 0, lat: 0 },
  );
  return { lon: sum.lon / points.length, lat: sum.lat / points.length };
}

// --- area_landmark projection (mirrors src/common/vr360/AreaLandmarkRenderer.js) --
const SVG_NS = "http://www.w3.org/2000/svg";
const AREA_LANDMARK_DEFAULT_STYLE = {
  fill: "#fbbf24",
  hoverFill: "rgba(251, 191, 36, 0.32)",
  border: "#fbbf24",
  hoverBorder: "#fde68a",
  line: "#ffffff",
};

function projectLandmarkPoint(lon, lat, camDir, rect) {
  const vector = directionForLonLat(lon, lat, 500);
  const direction = vector.clone().normalize();
  if (camDir.dot(direction) <= 0) return null;
  const projected = vector.clone().project(camera);
  if (projected.z < -1 || projected.z > 1) return null;
  return { x: (projected.x * 0.5 + 0.5) * rect.width, y: (-projected.y * 0.5 + 0.5) * rect.height };
}

function projectedPolygonCentroid(points) {
  let twiceArea = 0;
  let weightedX = 0;
  let weightedY = 0;
  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length];
    const cross = point.x * next.y - next.x * point.y;
    twiceArea += cross;
    weightedX += (point.x + next.x) * cross;
    weightedY += (point.y + next.y) * cross;
  });
  if (Math.abs(twiceArea) > Number.EPSILON) {
    return { x: weightedX / (3 * twiceArea), y: weightedY / (3 * twiceArea) };
  }
  const average = points.reduce((sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }), { x: 0, y: 0 });
  return { x: average.x / points.length, y: average.y / points.length };
}

let landmarkElements = new Map();
let landmarkSceneKey = "";

function clearLandmarkElements() {
  for (const el of landmarkElements.values()) {
    el.group.remove();
    el.label.remove();
  }
  landmarkElements.clear();
}

function ensureLandmarkElement(hotspot) {
  let el = landmarkElements.get(hotspot.id);
  if (el) return el;

  const group = document.createElementNS(SVG_NS, "g");
  group.classList.add("area-landmark");
  const polygon = document.createElementNS(SVG_NS, "polygon");
  const line = document.createElementNS(SVG_NS, "line");
  const anchor = document.createElementNS(SVG_NS, "circle");
  polygon.style.pointerEvents = "auto";
  polygon.style.cursor = "pointer";
  anchor.style.pointerEvents = "auto";
  anchor.style.cursor = "pointer";
  group.append(polygon, line, anchor);
  els.areaLayer.appendChild(group);

  const label = document.createElement("button");
  label.type = "button";
  label.className = "area-landmark-label";
  els.landmarkLabelLayer.appendChild(label);

  const onClick = () => onHotspotClick(hotspot);
  polygon.addEventListener("click", onClick);
  anchor.addEventListener("click", onClick);
  label.addEventListener("click", onClick);

  el = { group, polygon, line, anchor, label, labelHeight: 0, labelText: "" };
  landmarkElements.set(hotspot.id, el);
  return el;
}

function updateAreaLandmark(hotspot, camDir, rect) {
  const el = ensureLandmarkElement(hotspot);
  const projectedVertices = hotspot.vertices.map((v) => projectLandmarkPoint(v.lon, v.lat, camDir, rect));
  if (projectedVertices.some((p) => !p)) {
    el.group.style.display = "none";
    el.label.style.display = "none";
    return;
  }

  const anchor = projectedPolygonCentroid(projectedVertices);
  const style = { ...AREA_LANDMARK_DEFAULT_STYLE, ...hotspot.style };

  el.group.style.display = "";
  el.polygon.style.display = "";
  el.polygon.setAttribute(
    "points",
    projectedVertices.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "),
  );
  el.polygon.setAttribute("fill", "none");
  el.polygon.setAttribute("fill-opacity", "0");
  el.polygon.setAttribute("stroke", style.border);
  el.polygon.setAttribute("stroke-width", "1");
  el.polygon.setAttribute("stroke-dasharray", "4 4");
  el.polygon.setAttribute("stroke-linecap", "round");
  el.polygon.setAttribute("stroke-linejoin", "round");
  el.group.style.setProperty("--area-landmark-hover-fill", style.hoverFill);
  el.group.style.setProperty("--area-landmark-hover-border", style.hoverBorder);

  const labelX = anchor.x;
  const labelOffset = Math.max(40, Number(hotspot.lineHeight) || 48) * 2;
  const labelBottom = anchor.y - labelOffset;

  el.label.style.display = "";
  if (hotspot.label !== el.labelText) {
    el.label.textContent = hotspot.label || "";
    el.labelText = hotspot.label || "";
  }
  if (!el.labelHeight) el.labelHeight = el.label.offsetHeight || 32;
  const labelTop = labelBottom - el.labelHeight;

  el.line.setAttribute("x1", String(anchor.x));
  el.line.setAttribute("y1", String(anchor.y));
  el.line.setAttribute("x2", String(labelX));
  el.line.setAttribute("y2", String(labelBottom));
  el.line.setAttribute("stroke", style.line);
  el.line.setAttribute("stroke-width", "2");
  el.line.setAttribute("stroke-dasharray", "6 4");

  el.anchor.setAttribute("cx", String(anchor.x));
  el.anchor.setAttribute("cy", String(anchor.y));
  el.anchor.setAttribute("r", "5.5");
  el.anchor.setAttribute("fill", "#ff5a1f");
  el.anchor.setAttribute("stroke", "#fff");
  el.anchor.setAttribute("stroke-width", "2");

  el.label.style.transform = `translate3d(${labelX}px, ${labelTop}px, 0) translateX(-50%)`;
}

// --- Pointer controls (mouse + touch, incl. pinch-to-zoom) -----------------
function setupControls() {
  const canvas = els.canvas;

  canvas.addEventListener("pointerdown", (event) => {
    canvas.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointers.size === 1) {
      dragging = true;
      lastPointer = { x: event.clientX, y: event.clientY };
    } else if (activePointers.size === 2) {
      dragging = false;
      pinchStartDistance = pinchDistance();
      pinchStartFov = state.view.fov;
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!activePointers.has(event.pointerId)) return;
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size === 2) {
      const distance = pinchDistance();
      if (pinchStartDistance > 0) {
        const scale = pinchStartDistance / distance;
        state.view.fov = Math.max(30, Math.min(100, pinchStartFov * scale));
      }
      return;
    }

    if (!dragging || !lastPointer) return;
    const dx = event.clientX - lastPointer.x;
    const dy = event.clientY - lastPointer.y;
    lastPointer = { x: event.clientX, y: event.clientY };
    state.view.lon -= dx * 0.15;
    state.view.lat += dy * 0.15;
  });

  const stopDrag = (event) => {
    activePointers.delete(event.pointerId);
    if (activePointers.size === 0) {
      dragging = false;
      lastPointer = null;
    }
  };
  canvas.addEventListener("pointerup", stopDrag);
  canvas.addEventListener("pointercancel", stopDrag);
  canvas.addEventListener("pointerleave", stopDrag);

  canvas.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      state.view.fov = Math.max(30, Math.min(100, state.view.fov + event.deltaY * 0.05));
    },
    { passive: false },
  );
}

function pinchDistance() {
  const points = [...activePointers.values()];
  if (points.length < 2) return 0;
  const dx = points[0].x - points[1].x;
  const dy = points[0].y - points[1].y;
  return Math.hypot(dx, dy);
}

// --- Scene / texture loading ------------------------------------------------
function loadSceneTexture(sceneData) {
  const url = pickSceneImage(sceneData);
  if (!url) {
    showState("Chưa có ảnh panorama", `Scene <code>${sceneData.name || sceneData.id}</code> chưa có ảnh.`);
    return;
  }
  showState("Đang tải ảnh…", "");
  textureLoader.load(
    url,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      mesh.material.map = texture;
      mesh.material.color.set(0xffffff);
      mesh.material.needsUpdate = true;
      hideState();
    },
    undefined,
    () => showState("Không tải được ảnh", `Không thể tải: <code>${url}</code>`),
  );
}

function goToScene(sceneId, entryView) {
  const tour = activeTour();
  const target = tour?.scenes.find((s) => s.id === sceneId);
  if (!target) return;
  if (state.activeSceneId) state.visitedSceneIds.add(state.activeSceneId);
  state.activeSceneId = sceneId;
  state.view = entryView ? { ...entryView } : { ...target.view };
  loadSceneTexture(target);
  renderSidebarList();
  updateTitles();
  updatePillState();
}

function goToTour(tourId) {
  const tour = state.tours.find((t) => t.id === tourId);
  if (!tour) return;
  state.activeTourId = tourId;
  state.visitedSceneIds = new Set();
  els.sidebarHeader.textContent = tour.name || "Scenes";
  if (tour.scenes.length) {
    goToScene(tour.scenes[0].id);
  } else {
    state.activeSceneId = "";
    renderSidebarList();
    updateTitles();
    showState("Chưa có scene", `Điểm <code>${tour.name}</code> chưa có scene nào.`);
  }
}

function updateTitles() {
  document.title = activeTour()?.name ? `${activeTour().name} — VR360` : "VR360 Viewer";
}

function updatePillState() {
  const tour = activeTour();
  const index = activeSceneIndex();
  const count = tour?.scenes.length || 0;
  const hasMultiple = count > 1;
  els.btnPrev.hidden = !hasMultiple;
  els.btnNext.hidden = !hasMultiple;
  els.btnPrev.disabled = index <= 0;
  els.btnNext.disabled = index < 0 || index >= count - 1;
}

function nextScene() {
  const tour = activeTour();
  const index = activeSceneIndex();
  if (!tour || index < 0 || index >= tour.scenes.length - 1) return;
  goToScene(tour.scenes[index + 1].id);
}
function previousScene() {
  const tour = activeTour();
  const index = activeSceneIndex();
  if (!tour || index <= 0) return;
  goToScene(tour.scenes[index - 1].id);
}
function resetView() {
  const sceneData = activeScene();
  if (sceneData) state.view = { ...sceneData.view };
}

// --- Overlays: hotspot markers + area_landmark polygons ---------------------
function renderOverlays() {
  const sceneData = activeScene();
  els.hotspotLayer.innerHTML = "";

  const sceneKey = `${state.activeTourId}::${state.activeSceneId}`;
  if (landmarkSceneKey !== sceneKey) {
    clearLandmarkElements();
    landmarkSceneKey = sceneKey;
  }

  if (!sceneData || state.poiHidden) {
    for (const el of landmarkElements.values()) {
      el.group.style.display = "none";
      el.label.style.display = "none";
    }
    return;
  }

  const camDir = new THREE.Vector3();
  camera.getWorldDirection(camDir);
  const rect = els.panorama.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  els.areaLayer.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);

  for (const hotspot of sceneData.hotspots || []) {
    if (hotspot.type === "area_landmark") {
      updateAreaLandmark(hotspot, camDir, rect);
      continue;
    }

    const anchorDir = directionForLonLat(hotspot.lon, hotspot.lat);
    const visible = camDir.dot(anchorDir) > 0;
    if (!visible) continue;
    const { x, y } = projectToScreen(anchorDir, rect);
    if (x < -80 || x > rect.width + 80 || y < -80 || y > rect.height + 80) continue;

    const el = document.createElement("div");
    el.className = `viewer-hotspot viewer-hotspot-${hotspot.type}`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    if (hotspot.type === "info") {
      el.innerHTML = `<span class="viewer-info-dot">i</span><span class="hotspot-label">${hotspot.label || ""}</span>`;
    } else {
      const targetScene = activeTour()?.scenes.find((s) => s.id === hotspot.target_scene_id);
      const thumb = targetScene ? pickSceneImage(targetScene) : "";
      el.innerHTML = `
        <span class="viewer-nav-default">
          <span class="viewer-nav-default-arrow"><img src="assets/hotspotelement.png" alt="" draggable="false" /></span>
          ${thumb ? `<span class="viewer-nav-default-preview"><img src="${thumb}" alt="" draggable="false" /><span class="viewer-nav-default-preview-name">${targetScene.name}</span></span>` : ""}
        </span>`;
    }
    el.addEventListener("click", () => onHotspotClick(hotspot));
    els.hotspotLayer.appendChild(el);
  }
}

function projectToScreen(direction, rect) {
  const projected = direction.clone().project(camera);
  return {
    x: ((projected.x + 1) / 2) * rect.width,
    y: ((1 - projected.y) / 2) * rect.height,
  };
}

function onHotspotClick(hotspot) {
  if (hotspot.type === "info") {
    openInfoPopup(hotspot);
    return;
  }
  if (hotspot.target_scene_id) {
    goToScene(hotspot.target_scene_id, hotspot.entry_view);
  }
}

// --- Info POI popup (mirrors InfoPoiPopup.vue) ------------------------------
function openInfoPopup(hotspot) {
  const info = hotspot.info || {};
  const images = [info.image_url, ...(info.gallery || [])].filter(Boolean);
  const uniqueImages = [...new Set(images)];
  const heroImage = uniqueImages[0] || "";
  const youtube = youtubeEmbedUrl(info.youtube_url);
  const link = /^https?:\/\//i.test(info.link_url || "") ? info.link_url : "";
  const title = info.title || hotspot.label || "Điểm tham quan";

  els.modalLayer.innerHTML = "";
  const backdrop = document.createElement("div");
  backdrop.className = "poi-popup-backdrop";
  backdrop.innerHTML = `
    <article class="poi-popup poi-info-popup poi-light-glass" role="dialog" aria-modal="true">
      <header class="poi-info-header">
        <div>
          <span class="poi-popup-eyebrow">POINT OF INTEREST</span>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <button class="poi-popup-close" type="button" aria-label="Đóng">×</button>
      </header>
      <div class="poi-info-content">
        <section class="poi-info-section poi-info-hero${heroImage ? "" : " is-image-less"}">
          ${heroImage ? `<div class="poi-info-hero-image"><img src="${resolveUrl(heroImage)}" alt="${escapeHtml(title)}" /></div>` : ""}
          <div class="poi-info-hero-copy"></div>
        </section>
        ${
          info.description
            ? `<section class="poi-info-section poi-info-description-section"><h3>Mô tả chi tiết</h3><p class="poi-info-description">${escapeHtml(info.description)}</p></section>`
            : ""
        }
        ${
          uniqueImages.length > 1
            ? `<section class="poi-info-section poi-info-gallery-section"><h3>Danh sách hình ảnh</h3><div class="poi-info-gallery-grid">${uniqueImages
                .map(
                  (image, index) =>
                    `<button type="button" class="poi-info-gallery-thumb" data-index="${index}"><img src="${resolveUrl(image)}" alt="${escapeHtml(title)} - ảnh ${index + 1}" /></button>`,
                )
                .join("")}</div></section>`
            : ""
        }
        ${
          youtube
            ? `<section class="poi-info-section"><h3>Video tham quan</h3><div class="poi-info-video"><iframe src="${youtube}" title="${escapeHtml(title)} - YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></section>`
            : ""
        }
        ${link ? `<a class="poi-info-link" href="${link}" target="_blank" rel="noopener noreferrer">Khám phá thêm <span aria-hidden="true">↗</span></a>` : ""}
      </div>
    </article>`;
  els.modalLayer.appendChild(backdrop);

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeInfoPopup();
  });
  backdrop.querySelector(".poi-popup-close").addEventListener("click", closeInfoPopup);
  backdrop.querySelectorAll(".poi-info-gallery-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => openLightbox(uniqueImages, Number(thumb.dataset.index), title));
  });
}

function closeInfoPopup() {
  els.modalLayer.innerHTML = "";
}

function openLightbox(images, startIndex, title) {
  let index = startIndex;
  const backdrop = document.createElement("div");
  backdrop.className = "poi-lightbox-backdrop";

  function render() {
    backdrop.innerHTML = `
      <div class="poi-lightbox">
        <button class="poi-lightbox-close" type="button" aria-label="Đóng">×</button>
        <img class="poi-lightbox-image" src="${resolveUrl(images[index])}" alt="${escapeHtml(title)} - ảnh ${index + 1}" />
        ${images.length > 1 ? `<button class="poi-lightbox-nav poi-lightbox-prev" type="button" aria-label="Ảnh trước">‹</button>` : ""}
        ${images.length > 1 ? `<button class="poi-lightbox-nav poi-lightbox-next" type="button" aria-label="Ảnh tiếp theo">›</button>` : ""}
        ${images.length > 1 ? `<span class="poi-lightbox-counter">${index + 1} / ${images.length}</span>` : ""}
      </div>`;
    backdrop.querySelector(".poi-lightbox-close").addEventListener("click", close);
    backdrop.querySelector(".poi-lightbox-prev")?.addEventListener("click", () => move(-1));
    backdrop.querySelector(".poi-lightbox-next")?.addEventListener("click", () => move(1));
  }
  function move(delta) {
    index = (index + delta + images.length) % images.length;
    render();
  }
  function close() {
    backdrop.remove();
  }
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  render();
  els.modalLayer.appendChild(backdrop);
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = String(value ?? "");
  return div.innerHTML;
}

// --- Scenes sidebar ----------------------------------------------------------
function renderSidebarList() {
  const tour = activeTour();
  els.scenesList.innerHTML = "";
  if (!tour) return;
  for (const sceneData of tour.scenes) {
    const btn = document.createElement("button");
    btn.type = "button";
    const isActive = sceneData.id === state.activeSceneId;
    const isVisited = state.visitedSceneIds.has(sceneData.id);
    btn.className = `scenes-sidebar-item${isActive ? " active" : ""}${isVisited ? " visited" : ""}`;
    const img = pickSceneImage(sceneData);
    btn.innerHTML = `<span class="scenes-sidebar-thumb" style="${
      img ? `background-image:url('${img}')` : ""
    }"></span><span class="scenes-sidebar-name">${sceneData.name}</span>${isVisited ? '<span class="scenes-sidebar-check">✓</span>' : ""}`;
    btn.addEventListener("click", () => goToScene(sceneData.id));
    els.scenesList.appendChild(btn);
  }
}

function setSidebarExpanded(expanded) {
  state.sidebarExpanded = expanded;
  els.sidebar.classList.toggle("open", expanded);
  els.sidebarToggleTab.classList.toggle("is-expanded", expanded);
}

// --- Toolbar actions --------------------------------------------------------
function toggleAutorotate() {
  state.autoRotate = !state.autoRotate;
  els.btnAutorotate.classList.toggle("active", state.autoRotate);
  els.btnSidebarAutorotate.classList.toggle("active", state.autoRotate);
}
function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.getElementById("app").requestFullscreen();
}
function togglePoi() {
  state.poiHidden = !state.poiHidden;
  els.btnSidebarPoi.classList.toggle("active", state.poiHidden);
}

els.btnHome.addEventListener("click", resetView);
els.btnAutorotate.addEventListener("click", toggleAutorotate);
els.btnFullscreen.addEventListener("click", toggleFullscreen);
els.btnPrev.addEventListener("click", previousScene);
els.btnNext.addEventListener("click", nextScene);
els.btnSidebarFullscreen.addEventListener("click", toggleFullscreen);
els.btnSidebarPoi.addEventListener("click", togglePoi);
els.btnSidebarAutorotate.addEventListener("click", toggleAutorotate);
els.btnSidebarToggle.addEventListener("click", () => setSidebarExpanded(!state.sidebarExpanded));
els.sidebarTrigger.addEventListener("mouseenter", () => setSidebarExpanded(true));
els.btnImportJson.addEventListener("click", () => els.jsonFileInput.click());
els.jsonFileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const json = JSON.parse(await file.text());
    loadTourData(json);
  } catch (error) {
    showState("JSON không hợp lệ", String(error.message || error));
  }
});
document.addEventListener("fullscreenchange", () => {
  const active = Boolean(document.fullscreenElement);
  els.btnFullscreen.classList.toggle("active", active);
  els.btnSidebarFullscreen.classList.toggle("active", active);
});

// --- Normalization -----------------------------------------------------------
function normalizeHotspot(raw, sceneIndex, hotspotIndex) {
  const type = ["nav", "info", "area_landmark"].includes(raw.type) ? raw.type : "nav";
  const vertices = Array.isArray(raw.vertices)
    ? raw.vertices.map((v) => ({ lat: Number(v.lat ?? 0), lon: Number(v.lon ?? 0) }))
    : [];
  const anchor =
    raw.lon != null || raw.lat != null
      ? { lon: Number(raw.lon ?? 0), lat: Number(raw.lat ?? 0) }
      : raw.position
        ? { lon: Number(raw.position.lon ?? 0), lat: Number(raw.position.lat ?? 0) }
        : vertices.length
          ? centroid(vertices)
          : { lon: 0, lat: 0 };
  const content = raw.noi_dung || null;

  return {
    id: String(raw.id ?? `hotspot-${sceneIndex + 1}-${hotspotIndex + 1}`),
    label: raw.label || "",
    type,
    target_scene_id: raw.target != null ? String(raw.target) : "",
    lon: anchor.lon,
    lat: anchor.lat,
    vertices,
    style: raw.style || {},
    lineHeight: Number(raw.line_height ?? raw.lineHeight ?? 48),
    entry_view: raw.entryView
      ? {
          lon: Number(raw.entryView.lon ?? 0),
          lat: Number(raw.entryView.lat ?? 0),
          fov: Number(raw.entryView.fov ?? 75),
        }
      : null,
    info: content
      ? {
          title: content.tieu_de || raw.label || "",
          description: content.mo_ta || content.mo_ta_ngan || "",
          image_url: content.anh_minh_hoa || "",
          youtube_url: content.youtube_url || "",
          link_url: content.lien_ket || "",
          gallery: Array.isArray(content.danh_sach_anh) ? content.danh_sach_anh : [],
        }
      : null,
  };
}

function normalizeScene(raw, sceneIndex) {
  return {
    id: String(raw.id ?? `scene-${sceneIndex + 1}`),
    name: raw.name || `Scene ${sceneIndex + 1}`,
    group: raw.group || "Default",
    image: raw.image || raw.optimized_file || raw.image_url || "",
    thumb: raw.thumb || raw.thumbnail || "",
    view: {
      lon: Number(raw.initialView?.lon ?? raw.view?.lon ?? 0),
      lat: Number(raw.initialView?.lat ?? raw.view?.lat ?? 0),
      fov: Number(raw.initialView?.fov ?? raw.view?.fov ?? 75),
    },
    hotspots: (raw.hotspots || []).map((h, hi) => normalizeHotspot(h, sceneIndex, hi)),
  };
}

function deriveTourName(entry, scenes) {
  for (const s of scenes) {
    const landmark = s.hotspots.find((h) => h.type === "area_landmark" && h.label);
    if (landmark) return landmark.label;
  }
  return entry.data?.title || entry.label || `Location ${entry.location ?? ""}`;
}

function normalizeTourEntry(entry, index) {
  const scenes = (entry.data?.scenes || []).map(normalizeScene);
  const name = deriveTourName(entry, scenes);
  return {
    id: String(entry.id ?? entry.location ?? `tour-${index + 1}`),
    location: entry.location ?? null,
    version: entry.version_number ?? entry.id ?? null,
    name,
    slug: slugify(name),
    scenes,
  };
}

// --- Bootstrapping -----------------------------------------------------------
function loadTourData(data) {
  const rawList = Array.isArray(data) ? data : data?.scenes ? [{ data: { scenes: data.scenes } }] : [];
  state.tours = rawList.map(normalizeTourEntry);

  if (!state.tours.length) {
    els.sidebarHeader.textContent = "Scenes";
    showState(
      "Chưa có dữ liệu JSON",
      "Dán JSON của bạn vào <code>data.js</code> (biến <code>TOUR_DATA</code>) hoặc bấm nút mũi tên trong sidebar để nhập file JSON.",
    );
    return;
  }

  const requested = (params.get("q") || "").trim();
  const requestedSlug = slugify(requested);
  const preferred = requested
    ? state.tours.find((t) => t.slug === requestedSlug || String(t.location) === requested)
    : null;
  goToTour((preferred || state.tours[0]).id);
}

initThree();
setupControls();
loadTourData(window.TOUR_DATA || {});
