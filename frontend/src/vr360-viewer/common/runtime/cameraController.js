import * as THREE from 'three';

const MIN_LAT = -58;
const MAX_LAT = 82;
const MIN_FOV = 35;
const MAX_FOV = 100;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampLat(value) {
  return clamp(Number(value || 0), MIN_LAT, MAX_LAT);
}

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function shortestLonDelta(from, to) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

export function vectorToLonLat(vector) {
  const normalized = vector.clone().normalize();
  return {
    lon: Math.round(THREE.MathUtils.radToDeg(Math.atan2(normalized.z, normalized.x)) * 10) / 10,
    lat: Math.round(THREE.MathUtils.radToDeg(Math.asin(normalized.y)) * 10) / 10,
  };
}

export function createCameraController(camera) {
  let lon = 0;
  let lat = 0;
  let fov = 75;
  let introDistance = 0;
  let tween = null;

  function getView() {
    return { lon, lat, fov };
  }

  function getRoundedView() {
    return { lon: Math.round(lon * 10) / 10, lat: Math.round(lat * 10) / 10, fov: Math.round(fov) };
  }

  function updateCamera() {
    lat = clampLat(lat);
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);
    const direction = new THREE.Vector3(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta),
    ).normalize();
    camera.position.copy(direction).multiplyScalar(-introDistance);
    camera.lookAt(camera.position.clone().addScaledVector(direction, 500));
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }

  function setView(next = {}) {
    lon = Number(next.lon ?? lon);
    lat = clampLat(next.lat ?? lat);
    fov = clamp(Number(next.fov ?? fov), MIN_FOV, MAX_FOV);
  }

  function restoreView(next = {}) {
    lon = Number(next.lon ?? lon);
    lat = clampLat(next.lat ?? lat);
    fov = Number(next.fov ?? fov);
  }

  function setInitialView(next = {}) {
    lon = Number(next.lon ?? 0);
    lat = clampLat(next.lat ?? 0);
    // Preserves the pre-refactor initial-view behavior: initial FOV is not
    // clamped until a caller changes it through setView/zoom.
    fov = Number(next.fov ?? 75);
  }

  function setIntroDistance(distance = 0) {
    introDistance = Math.max(0, Number(distance) || 0);
  }

  function dragBy(deltaX, deltaY) {
    lon -= deltaX * 0.12;
    lat = clampLat(lat + deltaY * 0.12);
  }

  function zoomBy(deltaY) {
    fov = clamp(fov + deltaY * 0.04, MIN_FOV, MAX_FOV);
  }

  function animateTo(next = {}, duration = 520) {
    tween?.resolve?.({ cancelled: true });
    return new Promise((resolve) => {
      const targetLon = Number(next.lon ?? lon);
      const targetLat = clampLat(next.lat ?? lat);
      const targetFov = clamp(Number(next.fov ?? fov), MIN_FOV, MAX_FOV);
      tween = {
        startedAt: performance.now(), duration,
        from: { lon, lat, fov }, to: { lon: targetLon, lat: targetLat, fov: targetFov },
        lonDelta: shortestLonDelta(lon, targetLon), resolve,
      };
    });
  }

  function cancelTween() {
    if (!tween) return false;
    tween.resolve({ cancelled: true });
    tween = null;
    return true;
  }

  function tick(now) {
    if (!tween) return false;
    const progress = Math.min((now - tween.startedAt) / tween.duration, 1);
    const eased = easeInOutCubic(progress);
    lon = tween.from.lon + tween.lonDelta * eased;
    lat = tween.from.lat + (tween.to.lat - tween.from.lat) * eased;
    fov = tween.from.fov + (tween.to.fov - tween.from.fov) * eased;
    if (progress >= 1) {
      lon = tween.to.lon;
      lat = tween.to.lat;
      fov = tween.to.fov;
      tween.resolve({ cancelled: false });
      tween = null;
    }
    return true;
  }

  function isAnimating() { return Boolean(tween); }

  return { getView, getRoundedView, updateCamera, setView, restoreView, setInitialView, setIntroDistance, dragBy, zoomBy, animateTo, cancelTween, tick, isAnimating, vectorToLonLat };
}
