import { AreaLandmarkRenderer } from '../vr360/AreaLandmarkRenderer.js';
import { isAreaLandmarkPoint } from '../vr360/pointRendererRegistry.js';

export function createLandmarkRenderer(container, onClick) {
  const renderer = new AreaLandmarkRenderer(container, {
    showPolygonOnHover: true,
    onClick,
  });

  function update(hotspots, camera, width, height) {
    const annotations = hotspots.filter(isAreaLandmarkPoint).map((hotspot) => ({
      ...hotspot,
      polygon: hotspot.polygon,
      label: hotspot.labelConfig || hotspot.label,
      style: hotspot.annotationStyle,
      line_height: hotspot.lineHeight,
      show_polygon_on_hover: hotspot.showPolygonOnHover,
      metadata: hotspot.content,
    }));
    renderer.setAnnotations(annotations);
    renderer.update(camera, width, height);
  }

  return { update, dispose: () => renderer.dispose() };
}
