function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function createProjectionState() {
  const state = {
    projectionBlend: 0,
    fisheyeStrength: 1,
  };

  function setProgress(progress = 0) {
    const projectionBlend = clamp(Number(progress) || 0, 0, 1);
    state.projectionBlend = projectionBlend;
    state.fisheyeStrength = 1 - projectionBlend;
  }

  function reset() {
    setProgress(0);
  }

  function complete() {
    setProgress(1);
  }

  return { state, setProgress, reset, complete };
}
