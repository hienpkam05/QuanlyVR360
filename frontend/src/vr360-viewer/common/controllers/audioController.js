function dispose(player) {
  if (!player) return;
  try {
    player.pause();
    player.currentTime = 0;
    player.removeAttribute('src');
    player.load();
  } catch {
    // Audio cleanup must never block Viewer unmount or scene changes.
  }
}

export function createAudioController() {
  let background = null;
  let scene = null;
  let hotspot = null;

  function stop(which) {
    dispose(which === 'background' ? background : which === 'scene' ? scene : hotspot);
    if (which === 'background') background = null;
    if (which === 'scene') scene = null;
    if (which === 'hotspot') hotspot = null;
  }

  return {
    async playBackground(url) {
      if (!url) { stop('background'); return { playing: false, blocked: false }; }
      if (!background || background.src !== url) {
        stop('background');
        background = new Audio(url);
        background.loop = true;
        background.volume = 0.55;
      }
      try { await background.play(); return { playing: true, blocked: false }; }
      catch { return { playing: false, blocked: true }; }
    },
    toggleBackground() {
      if (!background) return false;
      if (background.paused) { background.play().catch(() => {}); return true; }
      background.pause();
      return false;
    },
    async playScene(url) {
      stop('scene');
      if (!url) return { playing: false, blocked: false };
      scene = new Audio(url);
      try { await scene.play(); return { playing: true, blocked: false }; }
      catch { return { playing: false, blocked: true }; }
    },
    playHotspot(url) {
      stop('hotspot');
      if (!url) return;
      hotspot = new Audio(url);
      hotspot.play().catch(() => {});
    },
    stopAll() { stop('background'); stop('scene'); stop('hotspot'); },
    dispose() { this.stopAll(); },
  };
}
