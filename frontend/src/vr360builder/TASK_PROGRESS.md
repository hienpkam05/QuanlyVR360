# VR360 Builder Implementation Progress

## Phase 1: Shared Engine & Hotspot Rendering
- [ ] Create shared VR360Engine.js extracted from VrTourViewer.vue
- [ ] Create shared hotspot renderer with viewer-style markers
- [ ] Add edit-mode hooks to engine (drag hotspot, select, place)

## Phase 2: Enhanced Builder Preview
- [ ] Update builder to use viewer-style hotspot rendering
- [ ] Add drag-and-drop hotspot repositioning on preview
- [ ] Add live property-to-preview sync
- [ ] Add visual feedback for selected/editing states

## Phase 3: Full WYSIWYG Experience
- [ ] Ensure all hotspot types render identically to View
- [ ] Add transition preview in builder
- [ ] Add audio narration preview
- [ ] Polish builder UI/UX

## Phase 4: Integration & Testing
- [ ] Test with sample tour data
- [ ] Verify hotspot placement/edit/delete workflow
- [ ] Verify export produces valid View-compatible JSON