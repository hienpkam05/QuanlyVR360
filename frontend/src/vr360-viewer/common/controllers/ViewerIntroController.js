const DEFAULT_CONFIG = Object.freeze({
  enabled: true,
  duration: 1900,
  overlayOpacity: 0.15,
  startZoom: 0.94,
  endZoom: 1,
  startFov: null,
  endFov: null,
  easing: 'easeOutQuart',
});

export const INTRO_PHASE = Object.freeze({
  INTRO_ANIMATING: 'intro-animating',
  WAITING_FOR_FIRST_INTERACTION: 'waiting-for-first-interaction',
  INTERACTIVE: 'interactive',
});

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function easeOutQuart(progress) {
  return 1 - Math.pow(1 - progress, 4);
}

function reducedMotionEnabled() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function createViewerIntroController(overrides = {}) {
  const config = {
    ...DEFAULT_CONFIG,
    ...overrides,
    duration: clamp(Number(overrides.duration ?? DEFAULT_CONFIG.duration), 1500, 2200),
    overlayOpacity: clamp(Number(overrides.overlayOpacity ?? DEFAULT_CONFIG.overlayOpacity), 0, 0.3),
    startZoom: clamp(Number(overrides.startZoom ?? DEFAULT_CONFIG.startZoom), 0.85, 1),
    endZoom: clamp(Number(overrides.endZoom ?? DEFAULT_CONFIG.endZoom), 0.85, 1.15),
  };
  let frameId = null;
  let running = false;
  let pendingUnlock = null;
  let phase = INTRO_PHASE.INTRO_ANIMATING;

  function createFrameFor(view = {}) {
    const baseFov = Number(view.fov) || 75;
    const endFov = Number(config.endFov ?? baseFov * config.endZoom);
    const startFov = Number(config.startFov ?? baseFov * config.startZoom);
    const baseLon = Number(view.lon) || 0;
    const baseLat = Number(view.lat) || 0;
    return (progress) => {
      const eased = easeOutQuart(progress);
      return {
        progress,
        fov: startFov + (endFov - startFov) * eased,
        lon: baseLon - 22 * (1 - eased),
        lat: baseLat + 14 * (1 - eased),
        overlayOpacity: config.overlayOpacity * (1 - clamp(progress / 0.5, 0, 1)),
      };
    };
  }

  function cancel() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    running = false;
    pendingUnlock = null;
    phase = INTRO_PHASE.INTRO_ANIMATING;
  }

  function start({ view = {}, onFrame, onWelcome, onUnlock } = {}) {
    cancel();
    const frameFor = createFrameFor(view);
    const finish = () => {
      frameId = null;
      running = false;
      onFrame?.(frameFor(1));
    };

    if (!config.enabled || reducedMotionEnabled()) {
      finish();
      phase = INTRO_PHASE.INTERACTIVE;
      onUnlock?.();
      return;
    }

    running = true;
    const startedAt = performance.now();
    onFrame?.(frameFor(0));
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / config.duration, 1);
      onFrame?.(frameFor(progress));
      if (progress >= 1) {
        frameId = null;
        running = false;
        pendingUnlock = onUnlock;
        phase = INTRO_PHASE.WAITING_FOR_FIRST_INTERACTION;
        onWelcome?.();
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
  }

  function getInitialFrame(view = {}) {
    return createFrameFor(view)(0);
  }

  function unlock() {
    if (phase !== INTRO_PHASE.WAITING_FOR_FIRST_INTERACTION) return;
    const unlockViewer = pendingUnlock;
    pendingUnlock = null;
    phase = INTRO_PHASE.INTERACTIVE;
    unlockViewer?.();
  }

  return {
    config: Object.freeze({ ...config }),
    start,
    unlock,
    getInitialFrame,
    cancel,
    isRunning: () => running,
    getPhase: () => phase,
  };
}

export { DEFAULT_CONFIG as VIEWER_INTRO_DEFAULTS };
