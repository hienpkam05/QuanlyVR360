import { resolvePointKind } from './pointSchema.js';

/**
 * Shared renderer routing contract. It deliberately describes renderer
 * ownership instead of constructing framework-specific renderer instances.
 * Builder Preview and Viewer can therefore share the same dispatch decision
 * while retaining their existing DOM/Three.js implementations.
 */
export const pointRendererRegistry = Object.freeze({
  nav: { renderer: 'marker', interactive: true },
  info: { renderer: 'marker', interactive: true },
  gallery: { renderer: 'marker', interactive: true },
  video: { renderer: 'marker', interactive: true },
  audio: { renderer: 'audio-marker', interaction: 'poi-audio', interactive: true },
  pin: { renderer: 'marker', interactive: true },
  info_area: { renderer: 'info-area', interactive: true },
  area_landmark: { renderer: 'area-landmark', interactive: true },
  generic: { renderer: 'marker', interactive: true },
});

export function resolvePointRenderer(point) {
  const kind = resolvePointKind(point);
  return pointRendererRegistry[kind] || pointRendererRegistry.generic;
}

export function hasPointRenderer(point, renderer) {
  return resolvePointRenderer(point).renderer === renderer;
}

export function isMarkerPoint(point) {
  return hasPointRenderer(point, 'marker');
}

export function isAreaLandmarkPoint(point) {
  return hasPointRenderer(point, 'area-landmark');
}

export function isInfoAreaPoint(point) {
  return hasPointRenderer(point, 'info-area');
}
