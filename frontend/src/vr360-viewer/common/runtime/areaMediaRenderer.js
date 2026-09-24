import { AreaMediaRenderer } from '../vr360/AreaMediaRenderer.js';
import { isAreaOverlayPoint } from '../vr360/pointRendererRegistry.js';

export function createAreaMediaRenderer(scene) {
  const renderer = new AreaMediaRenderer(scene);
  return {
    update(hotspots) {
      renderer.setAreas(hotspots);
    },
    dispose: () => renderer.dispose(),
  };
}
