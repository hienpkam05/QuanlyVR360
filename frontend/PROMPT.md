There are still several UI regressions after the recent Audio UI refactor.

Do NOT patch them with random CSS.

Audit the Viewer UI, Audio Panel and all hotspot renderers before modifying anything.

==================================================
1. FIX AUDIO PROGRESS BAR
==================================================

The current progress bar looks incorrect.

Problems:

- The played section is oversized.
- The thumb is misaligned.
- The track height is too large.
- The control looks like a browser range input.
- Timeline proportions are visually wrong.

Redesign the timeline.

Requirements:

- thin modern track
- centered thumb
- smooth fill animation
- rounded track
- played color uses project accent
- remaining track uses neutral gray
- thumb size around 14~16px
- track height around 4~6px
- perfect vertical alignment

The thumb must stay centered on the track.

==================================================
2. FIX VOLUME SLIDER
==================================================

Current volume slider is mathematically wrong.

There is empty spacing before 0%.

There is empty spacing after 100%.

Because of that:

volume = 0

still shows yellow.

volume = 1

never reaches the end.

Requirements:

The fill must start exactly at the left edge.

The fill must end exactly at the right edge.

No visual padding.

No fake margins.

Audit:

VolumeSlider component

CSS

pseudo elements

range styles

browser appearance

Remove every unnecessary padding.

==================================================
3. DO NOT BREAK PHOTO SPHERE VIEWER HOTSPOTS
==================================================

A recent CSS change has modified hotspot behaviour.

Current problems:

Navigation hotspot animation is much faster than before.

Pointer cursor rapidly alternates between:

pointer

default

pointer

default

while hovering.

Hover transition no longer matches Photo Sphere Viewer.

Some hotspot animations appear jittery.

Audit all CSS affecting:

.psv-marker

.psv-marker *

.hotspot

.poi

.nav

button

svg

transform

transition

animation

cursor

pointer-events

Find the exact rule causing this regression.

==================================================
4. DO NOT APPLY GLOBAL TRANSITIONS
==================================================

Search the project for rules such as:

* {
transition: ...
}

button {
transition: ...
}

svg {
transition: ...
}

div {
transition: ...
}

img {
transition: ...
}

transform:
transition: all

These rules are probably affecting PSV DOM.

Replace them with scoped classes only.

Never animate every element globally.

==================================================
5. POINTER CURSOR MUST BE STABLE
==================================================

While hovering hotspots:

cursor must become pointer

and remain pointer.

It must NEVER oscillate.

Audit:

mouseenter

mouseleave

pointer-events

z-index

overlay elements

hover overlays

Pseudo elements must not steal pointer events.

Decorative layers should use:

pointer-events: none

==================================================
6. NAVIGATION HOTSPOT ANIMATION
==================================================

Navigation hotspots currently animate too quickly.

Restore original timing.

Animation should feel smooth.

Approximately:

transition:
200~300ms

ease

Do not use:

50ms

80ms

100ms

Animation should match the original Viewer behaviour before the Audio UI refactor.

==================================================
7. AUDIO UI MUST NOT MODIFY HOTSPOT CSS
==================================================

Audio Panel styles must be isolated.

They must NOT affect:

POI markers

Navigation markers

Photo Sphere Viewer DOM

Scene transitions

Marker hover

Cursor

Projection

Move Audio CSS into its own namespace.

Examples:

.audio-panel

.audio-player

.audio-slider

.audio-progress

.audio-volume

Never style generic:

button

svg

input

img

span

div

globally.

==================================================
8. VERIFY HOTSPOT TYPES
==================================================

Test all hotspot types.

Information POI

Image POI

Video POI

Audio POI

Navigation POI

Polygon

Label

Each type must preserve:

hover

animation

cursor

click

focus

==================================================
9. REGRESSION TEST
==================================================

Verify:

✓ Progress bar is visually centered.

✓ Thumb alignment correct.

✓ Volume reaches true 0%.

✓ Volume reaches true 100%.

✓ No empty spacing.

✓ Navigation hotspot animation restored.

✓ Pointer cursor stable.

✓ Hover no longer flickers.

✓ Audio CSS isolated.

✓ Photo Sphere Viewer behaviour matches before Audio refactor.

==================================================
10. REPORT
==================================================

Report:

Files modified.

Which CSS rules caused the hotspot regression.

Which global selectors were removed.

How volume alignment was fixed.

How progress bar was rebuilt.

Confirm that Photo Sphere Viewer interaction behaviour is identical to before the Audio UI refactor.