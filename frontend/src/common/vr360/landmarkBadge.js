/**
 * Shared landmark badge: the image or icon medallion floating above a
 * landmark label. Both AreaLandmarkRenderer and LandmarkPresentation own
 * their own label DOM, so this module owns the badge for both of them.
 *
 * The badge is a sibling of the label, never a child. The label's own box is
 * what positions it vertically (`label.offsetHeight`), so keeping the badge
 * outside guarantees that a landmark without a badge renders exactly as it
 * did before this feature existed.
 */

export const BADGE_SIZE = 56;
/** Vertical space between the badge's bottom edge and the label's top edge. */
export const BADGE_GAP = 14;

/**
 * White outline traced from the logo's own alpha, then a lift shadow.
 *
 * Vietnamese administrative seals are red and yellow, and so is the landmark
 * label, so an unoutlined emblem sinks into it. Four zero-blur offsets build
 * a crisp stroke rather than a soft halo: each drop-shadow applies to the
 * accumulated result of the previous one, so the diagonals fill themselves
 * in. Unlike a plate or a border, this follows the artwork's silhouette.
 */
export const LOGO_FILTER = [
  'drop-shadow(1.5px 0 0 #fff)',
  'drop-shadow(-1.5px 0 0 #fff)',
  'drop-shadow(0 1.5px 0 #fff)',
  'drop-shadow(0 -1.5px 0 #fff)',
  'drop-shadow(0 2px 6px rgba(0,0,0,.55))',
].join(' ');

/** Stroke glyphs used when no image is uploaded, or when one fails to load. */
export const BADGE_ICONS = Object.freeze({
  landmark: 'M3 21h18M5 21V11l7-6 7 6v10M10 21v-5h4v5',
  government: 'M12 3 2 9h20L12 3ZM4 9v10M9 9v10M15 9v10M20 9v10M2 19h20',
  school: 'm12 4 10 5-10 5L2 9l10-5ZM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5',
  temple: 'M3 10h18L12 4 3 10ZM5 10v9M19 10v9M9 19v-5h6v5M3 21h18',
  hospital: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z',
  market: 'M3 9h18l-1 12H4L3 9ZM3 9l2-5h14l2 5M9 13v4M15 13v4',
});

export const BADGE_ICON_KEYS = Object.freeze(Object.keys(BADGE_ICONS));

/**
 * Reads the badge config off a point. Returns null when the point has none,
 * which is the case for every point created before this feature — those must
 * keep rendering without a badge.
 */
export function resolveBadge(annotation) {
  const badge = annotation?.badge;
  if (!badge || typeof badge !== 'object') return null;
  const src = typeof badge.src === 'string' ? badge.src.trim() : '';
  const icon = typeof badge.icon === 'string' ? badge.icon.trim() : '';
  if (!src && !icon) return null;
  return {
    src,
    // Always resolvable, so a broken image URL still has something to show.
    iconKey: BADGE_ICONS[icon] ? icon : 'landmark',
    preset: badge.preset === 'logo' ? 'logo' : 'photo',
  };
}

/**
 * Creates the badge element hidden. `label` only supplies its stacking level
 * so the badge sits on the same layer as the label it belongs to.
 */
export function createBadgeElement(parent, label, handlers = {}) {
  const element = document.createElement('button');
  element.type = 'button';
  element.className = 'landmark-badge';
  element.style.cssText = [
    'position:absolute', 'left:0', 'top:0', 'display:none', 'padding:0',
    `width:${BADGE_SIZE}px`, `height:${BADGE_SIZE}px`, 'box-sizing:border-box',
    'cursor:pointer', 'pointer-events:auto', 'transform-origin:center bottom',
  ].join(';');

  const image = document.createElement('img');
  image.alt = '';
  image.style.cssText = 'display:none;width:100%;height:100%;object-position:center;pointer-events:none;box-sizing:border-box;';

  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');
  icon.style.cssText = 'display:none;width:60%;height:60%;margin:20%;pointer-events:none;';
  const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  icon.appendChild(iconPath);

  element.append(image, icon);
  // A broken or deleted image must fall back to the icon rather than leave a
  // blank medallion on the panorama.
  image.addEventListener('error', () => { element._failed = true; _applySkin(element); });
  image.addEventListener('load', () => { element._failed = false; _applySkin(element); });

  if (handlers.onClick) element.addEventListener('click', handlers.onClick);
  if (handlers.onHover) element.addEventListener('mouseenter', handlers.onHover);
  if (handlers.onHoverEnd) element.addEventListener('mouseleave', handlers.onHoverEnd);

  Object.assign(element, { _image: image, _icon: icon, _iconPath: iconPath, _src: null, _iconKey: null, _preset: null, _skin: null, _failed: false });
  parent.appendChild(element);
  // Sit on the same layer as the label. The level comes from a CSS class in
  // the viewer and an inline style in the builder, so read it back rather
  // than hard-coding a number that is only right in one of them.
  if (label && typeof getComputedStyle === 'function') {
    try {
      const level = getComputedStyle(label).zIndex;
      if (level && level !== 'auto') element.style.zIndex = level;
    } catch { /* non-DOM environment: leave the badge on the default layer */ }
  }
  return element;
}

/**
 * Three looks, picked from what is actually on screen:
 *
 *   logo image  bare artwork, no frame at all. A seal or emblem already has
 *               its own silhouette; a plate behind it only adds a white ring,
 *               and clipping it to a box would cut the shape.
 *   photo image framed: dark plate, white border, rounded square, clipped.
 *   icon        framed circle. A stroke glyph has no body of its own, so it
 *               needs a backdrop to stay readable against bright sky.
 */
function _resolveSkin(element) {
  const showImage = Boolean(element._src) && !element._failed;
  if (!showImage) return 'icon';
  return element._preset === 'logo' ? 'logo' : 'photo';
}

function _applySkin(element) {
  const skin = _resolveSkin(element);
  const showImage = skin !== 'icon';
  element._image.style.display = showImage ? '' : 'none';
  element._icon.style.display = showImage ? 'none' : '';
  if (skin === element._skin) return;
  element._skin = skin;

  if (skin === 'logo') {
    // drop-shadow traces the alpha channel, so the shadow follows the emblem
    // itself rather than drawing a rectangle around transparent pixels.
    element.style.border = 'none';
    element.style.background = 'transparent';
    element.style.borderRadius = '0';
    element.style.overflow = 'visible';
    element.style.boxShadow = 'none';
    element.style.filter = 'none';
    // On the image, not the frame: the editor preview puts a transparency
    // checkerboard behind the same artwork, and a filter on the frame would
    // outline that checkerboard instead of the emblem.
    element._image.style.filter = LOGO_FILTER;
    element._image.style.objectFit = 'contain';
    element._image.style.padding = '0';
    return;
  }

  element.style.border = '2px solid #fff';
  element.style.background = 'rgba(18,18,28,.92)';
  element.style.color = '#fff';
  element.style.borderRadius = skin === 'icon' ? '50%' : '14px';
  element.style.overflow = 'hidden';
  element.style.boxShadow = '0 3px 10px rgba(0,0,0,.45)';
  element.style.filter = 'none';
  element._image.style.filter = 'none';
  element._image.style.objectFit = 'cover';
  element._image.style.padding = '0';
}

/**
 * Positions and paints the badge. `labelTop` is the label's top edge in
 * container pixels; the badge hangs directly above it.
 */
export function updateBadgeElement(element, badge, { x, labelTop, scale = 1 } = {}) {
  if (!element) return;
  if (!badge) { element.style.display = 'none'; return; }
  element.style.display = '';

  element._preset = badge.preset;

  if (badge.src !== element._src) {
    element._src = badge.src;
    element._failed = false;
    if (badge.src) element._image.src = badge.src;
    else element._image.removeAttribute('src');
  }

  if (badge.iconKey !== element._iconKey) {
    element._iconKey = badge.iconKey;
    element._iconPath.setAttribute('d', BADGE_ICONS[badge.iconKey] || BADGE_ICONS.landmark);
  }

  _applySkin(element);

  // transform-origin is the bottom edge, so scaling keeps the gap constant.
  const top = labelTop - BADGE_GAP * scale - BADGE_SIZE;
  element.style.transform = `translate3d(${x}px, ${top}px, 0) translateX(-50%) scale(${scale})`;
}
