import * as THREE from "three";
import { HotspotRenderer } from "@/common/vr360/HotspotRenderer";
import { AreaLandmarkRenderer } from "@/common/vr360/AreaLandmarkRenderer";
import { PointLandmarkRenderer } from "@/common/vr360/PointLandmarkRenderer.js";
import { AreaMediaRenderer } from "@/common/vr360/AreaMediaRenderer.js";
import { isAreaLandmarkPoint, isAreaOverlayPoint, isPointLandmarkPoint } from "@/common/vr360/pointRendererRegistry.js";
import { AreaMediaEditorOverlay } from './AreaMediaEditorOverlay.js';

// ══════════════════════════════════════
//  LRU TEXTURE CACHE (max 3)
//  3 textures * ~128MB = ~384MB max VRAM
// ══════════════════════════════════════
export class LRUTextureCache {
  constructor(max = 3) {
    this.max = max;
    this.entries = [];
  }

  get(url) {
    const idx = this.entries.findIndex((e) => e.url === url);
    if (idx < 0) return null;
    const [entry] = this.entries.splice(idx, 1);
    this.entries.unshift(entry);
    return entry.texture;
  }

  set(url, texture) {
    const idx = this.entries.findIndex((e) => e.url === url);
    if (idx >= 0) {
      this.entries[idx].texture.dispose();
      this.entries.splice(idx, 1);
    }
    while (this.entries.length >= this.max) {
      const old = this.entries.pop();
      old.texture.dispose();
    }
    this.entries.unshift({ url, texture });
  }

  has(url) {
    return this.entries.some((e) => e.url === url);
  }

  clear() {
    this.entries.forEach((e) => e.texture.dispose());
    this.entries = [];
  }
}

// ══════════════════════════════════════
//  IMAGEBITMAP TEXTURE LOADER
// ══════════════════════════════════════
const DISPLAY_CEILING = 12288;
let _gpuMaxTexture = 0;
function gpuMaxTextureSize() {
  if (_gpuMaxTexture) return _gpuMaxTexture;
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    _gpuMaxTexture = gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : 4096;
  } catch {
    _gpuMaxTexture = 4096;
  }
  return _gpuMaxTexture || 4096;
}
function maxTextureWidth() {
  return Math.min(DISPLAY_CEILING, gpuMaxTextureSize());
}

function bitmapToTexture(bmp) {
  const cap = maxTextureWidth();
  const canvas = document.createElement("canvas");
  if (bmp.width > cap) {
    canvas.width = cap;
    canvas.height = Math.round(bmp.height * (cap / bmp.width));
  } else {
    canvas.width = bmp.width;
    canvas.height = bmp.height;
  }
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

async function loadTextureOptimized(url, abortSignal) {
  const res = await fetch(url, { signal: abortSignal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const blob = await res.blob();
  if (abortSignal?.aborted) throw new DOMException("Aborted", "AbortError");

  const bmp = await createImageBitmap(blob);
  if (abortSignal?.aborted) {
    bmp.close();
    throw new DOMException("Aborted", "AbortError");
  }

  return bitmapToTexture(bmp);
}

async function loadTextureFromFile(file, abortSignal) {
  const bmp = await createImageBitmap(file);
  if (abortSignal?.aborted) {
    bmp.close();
    throw new DOMException("Aborted", "AbortError");
  }

  return bitmapToTexture(bmp);
}

// ══════════════════════════════════════
//  THUMBNAIL GENERATOR
// ══════════════════════════════════════
export function generateThumb(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 112;
      c.height = 72;
      const ctx = c.getContext("2d");
      const srcR = img.width / img.height,
        dstR = 112 / 72;
      let sx = 0,
        sy = 0,
        sw = img.width,
        sh = img.height;
      if (srcR > dstR) {
        sw = img.height * dstR;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / dstR;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 112, 72);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.4));
    };
    img.onerror = () => resolve(url);
    img.src = url;
  });
}

// ══════════════════════════════════════
//  PREVIEW ENGINE — with WYSIWYG hotspot rendering
// ══════════════════════════════════════
export class PreviewEngine {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.callbacks = callbacks;
    this.lon = 0;
    this.lat = 0;
    this.targetLon = 0;
    this.targetLat = 0;
    this.fov = 75;
    this.targetFov = 75;
    this.isInteracting = false;
    this.pointerStart = { x: 0, y: 0 };
    this.pointerDelta = { lon: 0, lat: 0 };
    this._cameraCommitTimer = 0;
    this.hasTexture = false;
    this._activeTool = null;
    this._toolCleanup = null;
    this._cameraPointerId = null;
    this.editMode = true; // Builder always in edit mode

    // Callbacks from builder
    this._sceneHotspots = [];
    this._selectedHotspotIndex = -1;

    this._needsRender = true;
    this._animating = false;
    this._rafId = 0;
    this._loadAbort = null;

    this._hudFrame = 0;
    this._lastHud = ["", "", ""];
    this._hsFrame = 0;

    this._raycaster = new THREE.Raycaster();
    this._rayMouse = new THREE.Vector2();

    this._initRenderer();
    this._initScene();
    this._initEvents();
    this._initHotspotRenderer();
    this._initAreaLandmarkRenderer();
    this._initAreaMediaRenderer();
    this._startLoop();
  }

  _initRenderer() {
    const p = this.canvas.parentElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(p.clientWidth, p.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  _initScene() {
    this.scene = new THREE.Scene();
    const p = this.canvas.parentElement;
    this.camera = new THREE.PerspectiveCamera(this.fov, p.clientWidth / p.clientHeight, 1, 1100);
    const geo = new THREE.SphereGeometry(500, 60, 40);
    geo.scale(-1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0x111111 });
    this.sphere = new THREE.Mesh(geo, this.material);
    this.scene.add(this.sphere);
    this.textureCache = new LRUTextureCache(3);
    this._lookAt = new THREE.Vector3();
  }

  _initHotspotRenderer() {
    const hotspotContainer = document.createElement("div");
    hotspotContainer.className = "preview-hotspot-container";
    hotspotContainer.style.cssText =
      "position:absolute;inset:0;z-index:12;pointer-events:none;";
    // Insert after canvas
    this.canvas.parentElement.appendChild(hotspotContainer);

    this.hotspotRenderer = new HotspotRenderer(hotspotContainer, {
      editMode: true,
      canDrag: () => this._activeTool === 'move',
      onHotspotClick: (index, e) => {
        const sourceIndex = this._sourceHotspotIndex(index);
        if (sourceIndex >= 0) this.callbacks.onHotspotSelect?.(sourceIndex, e);
      },
      onHotspotDblClick: (index, e) => {
        const sourceIndex = this._sourceHotspotIndex(index);
        if (sourceIndex >= 0) this.callbacks.onHotspotNav?.(sourceIndex, e);
      },
      onHotspotDragStart: (index, e) => {
        if (this._activeTool !== 'move') return;
        const sourceIndex = this._sourceHotspotIndex(index);
        if (sourceIndex >= 0) this.callbacks.onHotspotDragStart?.(sourceIndex, e);
      },
      onHotspotDrag: (index, e) => {
        if (this._activeTool !== 'move') return;
        const sourceIndex = this._sourceHotspotIndex(index);
        const pos = this._hotspotPositionFromPointer(e);
        if (sourceIndex >= 0 && pos) this.callbacks.onHotspotDrag?.(sourceIndex, pos.lon, pos.lat);
      },
      onHotspotDragEnd: (index, e) => {
        if (this._activeTool !== 'move') return;
        const sourceIndex = this._sourceHotspotIndex(index);
        const pos = this._hotspotPositionFromPointer(e);
        if (sourceIndex >= 0 && pos) this.callbacks.onHotspotDragEnd?.(sourceIndex, pos.lon, pos.lat);
      },
      onHotspotHover: (index, el) => {
        if (this.callbacks.onHotspotHover) {
          this.callbacks.onHotspotHover(index, el);
        }
      },
      onHotspotHoverEnd: () => {
        this.callbacks.onHotspotHoverEnd?.();
      },
      resolveNavTarget: (targetId) => this.callbacks.resolveNavTarget?.(targetId),
    });
    this.hotspotRenderer.setInteractionEnabled(this._activeTool !== 'view');
  }

  _initAreaLandmarkRenderer() {
    this.areaLandmarkRenderer = new AreaLandmarkRenderer(this.canvas.parentElement, {
      editMode: true,
      onClick: (annotation, event) => this.callbacks.onAreaLandmarkSelect?.(annotation, event),
      onLabelDragEnd: (annotation, position) => {
        if (this._activeTool !== 'move') return;
        this.callbacks.onAreaLandmarkLabelDragEnd?.(annotation, position);
      },
      onVertexDragEnd: (annotation, vertexIndex, position) => {
        if (this._activeTool !== 'move') return;
        const sphere = this.screenToSphere(position.x + position.rect.left, position.y + position.rect.top);
        if (sphere) this.callbacks.onAreaLandmarkVertexDragEnd?.(annotation, vertexIndex, sphere);
      },
    });
    this.pointLandmarkRenderer = new PointLandmarkRenderer(this.canvas.parentElement, {
      editMode: true,
      onClick: (annotation, event) => this.callbacks.onAreaLandmarkSelect?.(annotation, event),
    });
  }

  _initAreaMediaRenderer() {
    this.areaMediaRenderer = new AreaMediaRenderer(this.scene);
    this.areaMediaEditorOverlay = new AreaMediaEditorOverlay(this.canvas.parentElement, {
      onSelect: (area) => this.callbacks.onAreaMediaSelect?.(area),
      onVertexDrop: (area, vertexIndex, position) => {
        if (this._activeTool !== 'move') return;
        const sphere = this.screenToSphere(position.x, position.y);
        if (sphere) this.callbacks.onAreaMediaVertexDragEnd?.(area, vertexIndex, sphere);
      },
    });
  }

  setHotspots(hotspots, selectedIndex = -1) {
    this._allHotspots = hotspots || [];
    this._sceneHotspots = this._allHotspots.filter((hotspot) => !isAreaLandmarkPoint(hotspot) && !isPointLandmarkPoint(hotspot) && !isAreaOverlayPoint(hotspot));
    this._selectedHotspotIndex = selectedIndex;
    const selected = this._allHotspots[selectedIndex];
    this.areaLandmarkRenderer?.setSelectedAnnotation(isAreaLandmarkPoint(selected) ? selected : null);
    this.areaLandmarkRenderer?.setAnnotations(this._allHotspots.filter(isAreaLandmarkPoint));
    this.pointLandmarkRenderer?.setAnnotations(this._allHotspots);
    this.areaMediaRenderer?.setAreas(this._allHotspots);
    this.areaMediaEditorOverlay?.setAreas(this._allHotspots);
    this.areaMediaEditorOverlay?.setSelectedArea(isAreaOverlayPoint(selected) ? selected : null);
    this.requestRender();
  }

  setSelectedIndex(index) {
    if (this._selectedHotspotIndex === index) return;
    this._selectedHotspotIndex = index;
    const selected = this._allHotspots?.[index];
    this.areaLandmarkRenderer?.setSelectedAnnotation(isAreaLandmarkPoint(selected) ? selected : null);
    this.areaMediaEditorOverlay?.setSelectedArea(isAreaOverlayPoint(selected) ? selected : null);
    this.requestRender();
  }

  _sourceHotspotIndex(renderedIndex) {
    const hotspot = this._sceneHotspots[renderedIndex];
    return hotspot ? this._allHotspots.indexOf(hotspot) : -1;
  }

  _hotspotPositionFromPointer(event) {
    const rect = this.canvas.getBoundingClientRect();
    return this.hotspotRenderer.screenToSphere(
      event.clientX,
      event.clientY,
      this.camera,
      rect,
    );
  }

  // ABORT-AWARE TEXTURE LOADING
  async loadPanorama(url, file) {
    if (this._loadAbort) this._loadAbort.abort();
    this._loadAbort = new AbortController();
    const signal = this._loadAbort.signal;

    const cached = this.textureCache.get(url);
    if (cached) {
      this.material.map = cached;
      this.material.color = null;
      this.material.needsUpdate = true;
      this.hasTexture = true;
      this.requestRender();
      return;
    }

    this.callbacks.onLoadingChange?.(true);

    try {
      let texture;
      if (file) {
        texture = await loadTextureFromFile(file, signal);
      } else {
        texture = await loadTextureOptimized(url, signal);
      }

      if (signal.aborted) {
        texture.dispose();
        return;
      }

      this.textureCache.set(url, texture);
      this.material.map = texture;
      this.material.color = null;
      this.material.needsUpdate = true;
      this.hasTexture = true;
      this.requestRender();
    } catch (e) {
      if (e.name === "AbortError") return;
      console.error("loadPanorama error:", e);
    } finally {
      if (!signal.aborted) {
        this.callbacks.onLoadingChange?.(false);
      }
    }
  }

  setView(lon, lat, fov) {
    this.lon = this.targetLon = lon;
    this.lat = this.targetLat = lat;
    this.fov = this.targetFov = fov ?? 75;
    this.requestRender();
  }

  getView() {
    return {
      lon: Math.round(this.lon * 10) / 10,
      lat: Math.round(this.lat * 10) / 10,
      fov: Math.round(this.fov * 10) / 10,
    };
  }

  _commitCameraState() {
    this.callbacks.onCameraCommit?.({
      lon: Math.round(this.targetLon * 10) / 10,
      lat: Math.round(this.targetLat * 10) / 10,
      fov: Math.round(this.targetFov * 10) / 10,
    });
  }

  requestRender() {
    this._needsRender = true;
    if (!this._animating) {
      this._animating = true;
      this._rafId = requestAnimationFrame(() => this._renderLoop());
    }
  }

  _renderLoop() {
    const lonD = Math.abs(this.targetLon - this.lon);
    const latD = Math.abs(this.targetLat - this.lat);
    const fovD = Math.abs(this.targetFov - this.fov);
    const animating = lonD > 0.01 || latD > 0.01 || fovD > 0.01;

    if (animating) {
      this.lon += (this.targetLon - this.lon) * 0.12;
      this.lat += (this.targetLat - this.lat) * 0.12;
      this.fov += (this.targetFov - this.fov) * 0.12;
    } else {
      this.lon = this.targetLon;
      this.lat = this.targetLat;
      this.fov = this.targetFov;
    }

    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
    const phi = THREE.MathUtils.degToRad(90 - this.lat);
    const theta = THREE.MathUtils.degToRad(this.lon);
    this._lookAt.set(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta)
    );
    this.camera.lookAt(this._lookAt);
    this.renderer.render(this.scene, this.camera);
    this.callbacks.onFrame?.();

    this._updateHUD();

    // Update WYSIWYG hotspots
    this._updateHotspots();

    if (animating || this.isInteracting || this._needsRender) {
      this._needsRender = false;
      this._rafId = requestAnimationFrame(() => this._renderLoop());
    } else {
      this._animating = false;
      // One final hotspot update
      this._updateHotspots();
      this.callbacks.onFrame?.();
    }
  }

  _startLoop() {
    this.requestRender();
  }

  _updateHUD() {
    if (++this._hudFrame % 5 !== 0) return;
    const sL = this.lon.toFixed(1),
      sA = this.lat.toFixed(1),
      sF = this.fov.toFixed(0);
    if (sL !== this._lastHud[0] || sA !== this._lastHud[1] || sF !== this._lastHud[2]) {
      this._lastHud = [sL, sA, sF];
      this.callbacks.onHudChange?.({ lon: sL, lat: sA, fov: sF });
    }
  }

  _updateHotspots() {
    if (!this.hotspotRenderer || !this._sceneHotspots) return;
    const p = this.canvas.parentElement;
    this.hotspotRenderer.options.selectedIndex = this._sceneHotspots.indexOf(
      this._allHotspots?.[this._selectedHotspotIndex],
    );
    this.hotspotRenderer.update(
      this._sceneHotspots,
      this.camera,
      p.clientWidth,
      p.clientHeight
    );
    this.areaLandmarkRenderer?.update(this.camera, p.clientWidth, p.clientHeight);
    this.pointLandmarkRenderer?.update(this.camera, p.clientWidth, p.clientHeight);
    this.areaMediaEditorOverlay?.update(this.camera, p.clientWidth, p.clientHeight);
  }

  screenToSphere(cx, cy) {
    const r = this.canvas.getBoundingClientRect();
    this._rayMouse.set(
      ((cx - r.left) / r.width) * 2 - 1,
      -((cy - r.top) / r.height) * 2 + 1
    );
    this._raycaster.setFromCamera(this._rayMouse, this.camera);
    const dir = this._raycaster.ray.direction;
    return {
      lon: Math.round(THREE.MathUtils.radToDeg(Math.atan2(dir.z, dir.x)) * 10) / 10,
      lat: Math.round(THREE.MathUtils.radToDeg(Math.asin(dir.y)) * 10) / 10,
    };
  }

  sphereToScreen(lon, lat) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);
    const proj = new THREE.Vector3(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta)
    );
    const projected = proj.clone().project(this.camera);
    const camDir = new THREE.Vector3();
    this.camera.getWorldDirection(camDir);
    if (camDir.dot(proj.clone().normalize()) < 0) return null;
    const r = this.canvas.getBoundingClientRect();
    return {
      x: (projected.x * 0.5 + 0.5) * r.width,
      y: (-projected.y * 0.5 + 0.5) * r.height,
      scale: Math.max(0.5, 1 - Math.sqrt(projected.x ** 2 + projected.y ** 2) * 0.2),
    };
  }

  get placingHotspot() {
    return this._activeTool === 'place';
  }

  _initEvents() {
    const c = this.canvas;
    c.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this.targetFov = Math.max(30, Math.min(120, this.targetFov + e.deltaY * 0.05));
        clearTimeout(this._cameraCommitTimer);
        this._cameraCommitTimer = window.setTimeout(() => this._commitCameraState(), 160);
        this.requestRender();
      },
      { passive: false }
    );
    this._onResize = () => this.resize();
    window.addEventListener("resize", this._onResize);

    this._handleViewPointerDown = this._onViewPointerDown.bind(this);
    this._handleViewPointerMove = this._onViewPointerMove.bind(this);
    this._handleViewPointerUp = this._onViewPointerUp.bind(this);
    this._handleViewPointerCancel = this._onViewPointerCancel.bind(this);
    this._handlePlaceClick = this._onPlaceClick.bind(this);
    this._handlePlaceKeyDown = this._onPlaceKeyDown.bind(this);

    this.activateTool('view');
  }

  resize() {
    const p = this.canvas.parentElement;
    const { clientWidth: width, clientHeight: height } = p;
    // The builder can be temporarily hidden by its top-level tab. Do not
    // resize the WebGL drawing buffer to 0x0 while it is hidden.
    if (!width || !height) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.requestRender();
  }

  _onViewPointerDown(e) {
    if (e.button !== 0) return;
    this.isInteracting = true;
    this._cameraPointerId = e.pointerId;
    this.pointerStart = { x: e.clientX, y: e.clientY };
    this.pointerDelta = { lon: this.targetLon, lat: this.targetLat };
    try { this.canvas.setPointerCapture(e.pointerId); } catch {}
    this.requestRender();
  }

  _onViewPointerMove(e) {
    if (!this.isInteracting) return;
    const s = 0.15 * (this.fov / 75);
    this.targetLon = this.pointerDelta.lon - (e.clientX - this.pointerStart.x) * s;
    this.targetLat = Math.max(-85, Math.min(85, this.pointerDelta.lat + (e.clientY - this.pointerStart.y) * s));
    this.requestRender();
  }

  _onViewPointerUp(e) {
    if (!this.isInteracting) return;
    this._endCameraInteraction(e);
    this._commitCameraState();
    this.requestRender();
  }

  _onViewPointerCancel(e) {
    if (!this.isInteracting) return;
    this._endCameraInteraction(e);
    this.requestRender();
  }

  _endCameraInteraction(event) {
    const pointerId = event?.pointerId ?? this._cameraPointerId;
    if (pointerId !== null && pointerId !== undefined) {
      try {
        if (this.canvas.hasPointerCapture?.(pointerId)) this.canvas.releasePointerCapture(pointerId);
      } catch {}
    }
    this._cameraPointerId = null;
    this.isInteracting = false;
  }

  _onPlaceClick(e) {
    const coords = this.screenToSphere(e.clientX, e.clientY);
    if (coords) this.callbacks.onHotspotPlace?.(coords.lon, coords.lat);
  }

  _onPlaceKeyDown(e) {
    if (e.key === 'Escape') this.callbacks.onCancelPlacing?.();
  }

  activateTool(name) {
    if (this._activeTool === name) return;
    this.deactivateTool();
    this._activeTool = name;
    // Markers stay visible in Rotate mode but are transparent to pointer hit
    // testing, so the canvas exclusively owns the camera gesture.
    this.hotspotRenderer?.setInteractionEnabled(name !== 'view');
    const c = this.canvas;
    if (name === 'view') {
      c.addEventListener('pointerdown', this._handleViewPointerDown);
      c.addEventListener('pointermove', this._handleViewPointerMove);
      c.addEventListener('pointerup', this._handleViewPointerUp);
      c.addEventListener('pointercancel', this._handleViewPointerCancel);
      this._toolCleanup = () => {
        c.removeEventListener('pointerdown', this._handleViewPointerDown);
        c.removeEventListener('pointermove', this._handleViewPointerMove);
        c.removeEventListener('pointerup', this._handleViewPointerUp);
        c.removeEventListener('pointercancel', this._handleViewPointerCancel);
      };
    } else if (name === 'move') {
      // A marker owns its own pointer gesture. Background drags reuse the
      // established camera handler so editing mode never locks rotation.
      c.addEventListener('pointerdown', this._handleViewPointerDown);
      c.addEventListener('pointermove', this._handleViewPointerMove);
      c.addEventListener('pointerup', this._handleViewPointerUp);
      c.addEventListener('pointercancel', this._handleViewPointerCancel);
      this._toolCleanup = () => {
        c.removeEventListener('pointerdown', this._handleViewPointerDown);
        c.removeEventListener('pointermove', this._handleViewPointerMove);
        c.removeEventListener('pointerup', this._handleViewPointerUp);
        c.removeEventListener('pointercancel', this._handleViewPointerCancel);
      };
    } else if (name === 'place') {
      c.addEventListener('click', this._handlePlaceClick);
      window.addEventListener('keydown', this._handlePlaceKeyDown);
      this._toolCleanup = () => {
        c.removeEventListener('click', this._handlePlaceClick);
        window.removeEventListener('keydown', this._handlePlaceKeyDown);
      };
    }
  }

  deactivateTool() {
    this.hotspotRenderer?.cancelDrag();
    if (this._toolCleanup) {
      this._toolCleanup();
      this._toolCleanup = null;
    }
    this._endCameraInteraction();
    this._activeTool = null;
  }

  dispose() {
    this.deactivateTool();
    if (this._rafId) cancelAnimationFrame(this._rafId);
    if (this._loadAbort) this._loadAbort.abort();
    clearTimeout(this._cameraCommitTimer);
    window.removeEventListener("resize", this._onResize);
    this.hotspotRenderer?.dispose();
    this.areaLandmarkRenderer?.dispose();
    this.pointLandmarkRenderer?.dispose();
    this.areaMediaRenderer?.dispose();
    this.areaMediaEditorOverlay?.dispose();
    this.textureCache.clear();
    this.renderer.dispose();
  }
}
