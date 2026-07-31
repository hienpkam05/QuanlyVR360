export function createFullscreenController(getTarget) {
  return {
    enterFullscreen() { return getTarget()?.requestFullscreen?.(); },
    exitFullscreen() { return document.exitFullscreen?.(); },
  };
}
