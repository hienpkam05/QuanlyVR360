import * as THREE from 'three';
import { isAreaOverlayPoint } from '@/common/vr360/pointRendererRegistry.js';
import { normalizeLandmarkVertices } from '@/common/vr360/pointSchema.js';

function project(point, camera, width, height, cameraDirection) {
  const phi = THREE.MathUtils.degToRad(90 - Number(point.lat || 0));
  const theta = THREE.MathUtils.degToRad(Number(point.lon || 0));
  const vector = new THREE.Vector3(
    500 * Math.sin(phi) * Math.cos(theta),
    500 * Math.cos(phi),
    500 * Math.sin(phi) * Math.sin(theta),
  );
  if (cameraDirection.dot(vector.normalize()) <= 0) return null;
  vector.project(camera);
  return { x: (vector.x * 0.5 + 0.5) * width, y: (-vector.y * 0.5 + 0.5) * height };
}

/** Builder-only edit affordances for Area Media. The media itself is rendered
 * by the independent Three.js AreaMediaRenderer. */
export class AreaMediaEditorOverlay {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.areas = [];
    this.selectedId = null;
    this.elements = new Map();
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('class', 'area-media-editor-layer');
    this.svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:11;';
    container.appendChild(this.svg);
  }

  setAreas(areas = []) { this.areas = areas.filter(isAreaOverlayPoint); }
  setSelectedArea(area) { this.selectedId = area ? String(area.id || '') : null; }

  _element(area, index) {
    const id = String(area.id || index);
    let entry = this.elements.get(id);
    if (entry) return entry;
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const placeholder = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    placeholder.textContent = '▣  Drop Image / Video Here';
    placeholder.setAttribute('text-anchor', 'middle');
    group.append(polygon, placeholder);
    this.svg.appendChild(group);
    entry = { group, polygon, placeholder, vertices: [] };
    this.elements.set(id, entry);
    return entry;
  }

  update(camera, width, height) {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const active = new Set();
    this.areas.forEach((area, index) => {
      const id = String(area.id || index); active.add(id);
      const entry = this._element(area, index);
      const points = normalizeLandmarkVertices(area).map((point) => project(point, camera, width, height, direction));
      if (points.length < 3 || points.some((point) => !point)) { entry.group.style.display = 'none'; return; }
      entry.group.style.display = '';
      const positions = points.map((point) => `${point.x},${point.y}`).join(' ');
      const selected = id === this.selectedId;
      entry.polygon.setAttribute('points', positions);
      entry.polygon.setAttribute('fill', selected ? 'rgba(56,189,248,.12)' : 'rgba(56,189,248,.04)');
      entry.polygon.setAttribute('stroke', selected ? '#38bdf8' : 'rgba(125,211,252,.72)');
      entry.polygon.setAttribute('stroke-width', selected ? '2.5' : '1.5');
      entry.polygon.style.pointerEvents = 'auto';
      entry.polygon.onclick = (event) => { event.stopPropagation(); this.options.onSelect?.(area); };
      const center = points.reduce((sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }), { x: 0, y: 0 });
      entry.placeholder.setAttribute('x', String(center.x / points.length));
      entry.placeholder.setAttribute('y', String(center.y / points.length));
      entry.placeholder.setAttribute('fill', '#e0f2fe');
      entry.placeholder.setAttribute('font-size', '12');
      entry.placeholder.setAttribute('font-weight', '700');
      entry.placeholder.style.display = area.areaMedia?.src ? 'none' : '';
      while (entry.vertices.length < points.length) {
        const vertex = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        vertex.setAttribute('r', '5'); vertex.setAttribute('fill', '#fff'); vertex.setAttribute('stroke', '#0284c7'); vertex.setAttribute('stroke-width', '2');
        vertex.style.pointerEvents = 'auto';
        entry.group.appendChild(vertex); entry.vertices.push(vertex);
      }
      entry.vertices.forEach((vertex, vertexIndex) => {
        const point = points[vertexIndex];
        vertex.style.display = selected ? '' : 'none';
        vertex.setAttribute('cx', String(point.x)); vertex.setAttribute('cy', String(point.y));
        vertex.onpointerup = (event) => {
          event.stopPropagation();
          const rect = this.container.getBoundingClientRect();
          this.options.onVertexDrop?.(area, vertexIndex, { x: event.clientX, y: event.clientY, rect });
        };
      });
      entry.vertices.slice(points.length).forEach((vertex) => { vertex.style.display = 'none'; });
    });
    for (const [id, entry] of this.elements) if (!active.has(id)) { entry.group.remove(); this.elements.delete(id); }
  }

  dispose() { this.elements.clear(); this.svg.remove(); }
}
