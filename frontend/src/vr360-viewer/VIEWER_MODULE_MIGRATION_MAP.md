# VR360 Runtime Viewer — Audit & Migration Map

**Audit scope:** source currently present under `src/` on 2026-07-31.  
**Decision boundary:** this document is a design/migration map only. No runtime source, Builder source, JSON schema, dependency, route, or legacy Viewer is changed by this audit.

## 1. Executive summary and target-module audit

The current runtime is not a standalone module. Its main production implementation is embedded in `src/views/TourViewerView.vue`; a second, smaller public/demo-oriented implementation is in `src/views/PublicViewerView.vue`; and a local JSON demo is in `src/vr360builder/pages/DemoVR.vue`.

The reusable rendering base is already partially separated:

- `src/components/PanoramaViewer.vue` is the active Three.js/WebGL panorama engine plus DOM/SVG hotspot projection.
- `src/components/nav/*` supplies runtime NAV visual variants.
- `src/common/vr360/tourDataMapper.js` supplies a Builder-oriented/local-JSON mapper and NAV-style constants.

### Actual state of `src/vr360-viewer`

`src/vr360-viewer` exists but is **empty** (no files and no child directories at audit time). Therefore the directory tree stated as target (`assets/`, `common/`, `components/`, `layout/`, `pages/`, `services/`, `router.js`) has not yet been materialized in the filesystem.

| Target item | Actual status | Audit conclusion |
|---|---|---|
| `src/vr360-viewer/` | Exists, empty | Correct single target root.
| `assets/`, `common/`, `components/`, `layout/`, `pages/`, `services/` | Not yet created | Appropriate target separation; create only during the corresponding migration phase.
| `router.js` | Not yet created | Appropriate as host integration layer, not Viewer-core dependency.
| `index.js` | Not yet created | Recommended in Phase 5 as the stable public barrel export.
| `config/` | Not yet created | Do **not** create by default. Add only if a typed/default Viewer configuration cannot remain in `common/constants` or props; avoid a generic configuration dumping ground.
| `styles/` | Not in requested tree | Recommended only if Viewer CSS is extracted from global `src/styles/main.css`; it should be scoped/imported by the module, not copied into global CSS.

The target shape is suitable. `common/` must remain limited to runtime model adapters, engine primitives, render helpers, constants, and small utilities. UI and API work do not belong there.

## 2. Existing runtime Viewer inventory

| Current file | Classification | Actual responsibility | Target disposition |
|---|---|---|---|
| `src/views/TourViewerView.vue` | A — runtime, but app-coupled | Production immersive viewer: loading private/public tours, normalization, scene navigation, audio, overlays, gallery, sidebar, controls | Refactor/split; becomes a thin host page plus `vr360-viewer/pages/` and `layout/` elements.
| `src/views/PublicViewerView.vue` | A/D — runtime demo, app-coupled | Manual public-token loader, visit tracking, simplified scene/info UI | Replace later with a thin demo host page using module API; do not copy its duplicate normalizer.
| `src/components/PanoramaViewer.vue` | A — runtime core | Three.js sphere, texture loading/fallback, projection, pointer drag/wheel, auto-rotate, texture fade, inline info-area media | Migrate/refactor to `components/PanoramaCanvas.vue` (or retain name); internal/private component.
| `src/components/nav/NavRenderer.vue` | A — runtime UI | Selects Vue NAV visual component from `navStyle` | `components/nav/NavRenderer.vue`; private implementation behind a future extension registry.
| `src/components/nav/NavDefault.vue` | A — runtime UI | Default NAV marker | `components/nav/NavDefault.vue`; private/built-in variant.
| `src/components/nav/NavPreviewExpand.vue` | A — runtime UI | Hover/focus expandable NAV preview | `components/nav/NavPreviewExpand.vue`; built-in extension implementation.
| `src/common/vr360/tourDataMapper.js` | C — shared today, semantics differ | Builder/local JSON defaults and mapper (`initialView`, Vietnamese Builder fields, `target`) | Do not duplicate. Split/re-home only the pure reusable NAV constants/defaults; build one canonical Viewer adapter that preserves both schemas.
| `src/common/vr360/NavRenderer.js` | B/C — Builder preview renderer | Imperative DOM NAV renderer used by `HotspotRenderer` | Keep for Builder preview; do not move into Vue Viewer. Align shared NAV-style contract through a small neutral module/adapter.
| `src/common/vr360/HotspotRenderer.js` | B/C — Builder preview renderer | Imperative DOM hotspot renderer with drag/edit/lock behavior | Builder-only at present; keep unchanged. It is not used by production Viewer.
| `src/common/hotspotIcons.js` | C — shared candidate | Icon/NAV icon lookup for Builder renderer | Keep shared initially; Viewer currently does not use it. Inject/adapt only if runtime adopts those icons.
| `src/vr360builder/common/PreviewEngine.js` | B — Builder-only | Three.js editor preview, texture cache, hotspot placement/dragging, callbacks | Keep unchanged; not a runtime migration source.
| `src/vr360builder/pages/DemoVR.vue` | A but wrongly located | Local JSON runtime demo using `PanoramaViewer` and mapper | Later replace with `vr360-viewer/pages/ViewerDemoPage.vue`; keep legacy demo until cutover.
| `src/api/publicApi.js` | D/C — app transport | Public token fetch and visit tracking using Axios and `VITE_API_BASE_URL` | Wrap/inject through `services/publicTourService.js`; core must not import it.
| `src/api/publishedToursApi.js` | D/C — app transport | Published-tour catalog using Axios | Wrap/inject through a host loader/service adapter.
| `src/api/toursApi.js` (`getVersion`, `listVersions`) | D/C; largely Builder/admin transport | Authenticated version load and many write/upload/admin calls | Viewer service may adapt **read** functions only; all mutation APIs remain app/Builder.
| `src/api/projectsApi.js`, `src/api/locationsApi.js` | D — host selection UI | Project/location catalog for production page selectors | Do not put in Viewer core; keep/inject host-specific selector data source.
| `src/router/index.js` | D — app integration | Routes `/viewer`, `/vr360/:token`, `/public-viewer`, Builder routes and auth guards | Keep host router; later add module route factory only.
| `src/styles/main.css` | C/D — global style source | Runtime Viewer and Builder styles intermixed | Extract only Viewer-owned selectors to module-scoped stylesheet during migration; do not copy CSS wholesale.

## 3. Architecture and dependency graph (actual)

### 3.1 Production path

```text
src/router/index.js
  └─ /viewer and /vr360/:token → src/views/TourViewerView.vue
       ├─ vue-router: useRoute/useRouter
       ├─ Pinia authStore: chooses public vs authenticated flow
       ├─ API: projectsApi, locationsApi, toursApi, publishedToursApi, publicApi, apiBaseURL
       ├─ local normalizeScene / normalizeTourData / URL resolver
       ├─ Audio elements: background, scene narration/fallback, hotspot audio
       └─ src/components/PanoramaViewer.vue
            ├─ three@0.185.1
            └─ src/components/nav/NavRenderer.vue
                 ├─ src/common/vr360/tourDataMapper.js
                 ├─ NavDefault.vue
                 └─ NavPreviewExpand.vue
```

`PanoramaViewer.vue` uses Three.js directly, creates an inverted equirectangular sphere, loads textures with `THREE.TextureLoader`, projects hotspot/area coordinates from lon/lat to screen space each animation frame, and renders HTML/SVG overlays over the WebGL canvas. It owns WebGL cleanup but currently exposes only `animateToView()`.

### 3.2 Other runtime-like paths

```text
/public-viewer → PublicViewerView.vue
  ├─ publicApi (getPublicTour + trackPublicVisit)
  ├─ duplicated local normalizer / URL resolver / hotspot decoration
  └─ PanoramaViewer.vue

/demo-vr → vr360builder/pages/DemoVR.vue
  ├─ local JSON (`@data/vr360-tour/vr360-tour-an-mien.json`)
  ├─ common/vr360/tourDataMapper.normalizeScene
  └─ PanoramaViewer.vue

Vr360Builder.vue → vr360builder/common/PreviewEngine.js
  └─ common/vr360/HotspotRenderer.js → common/vr360/NavRenderer.js
```

There is no `VrTourViewer.vue` in the source tree. The active equivalent is `TourViewerView.vue`; `PanoramaViewer.vue` is the actual engine component.

### 3.3 Dependency findings

- Installed dependencies used by the runtime: `vue`, `three`, and indirectly `vue-router`; API hosts use `axios`. No dependency upgrade is needed.
- No runtime use of an i18n library/composable was found.
- No `app_thanh_cong`, `app_quang_bi`, or `app_vr360_builder` directory/import exists. The actual Builder directory is `src/vr360builder`; production Viewer imports none of its code.
- `@/...` aliases occur in Builder/shared code and the NAV runtime component. A portable module should use module-relative imports internally and only accept host services/assets via explicit interfaces.
- Fullscreen is currently an inline `document.documentElement.requestFullscreen?.()` call in `TourViewerView`; it targets the whole document and has no exit/state handling.

## 4. Data flow and canonical adapter strategy

### 4.1 Actual production flow

```text
Route params/query + auth state
  → public catalog/token API OR project/location/version APIs
  → API payload (`payload.data`, `TOUR_DATA`, `tour_data`, `data`, or root)
  → TourViewerView.normalizeTourData()
  → TourViewerView.normalizeScene()
  → scenes[] + activeSceneId
  → displayHotspots (decorates URLs, target name, preview, info fields)
  → PanoramaViewer
  → Three.js texture + projected DOM/SVG hotspots
  → navigation / info modal / audio / thumbnails / sidebar / transition UI
```

### 4.2 Current normalizers and incompatibility

| Name/location | Input supported | Output/role | Issue |
|---|---|---|---|
| `TourViewerView.normalizeTourData` + local `normalizeScene` | API envelopes; server field aliases such as `original_file`, `target_scene_id`, `audio_url`, `info_*`, `area_points` | Flattened runtime scene objects | Best current production behavior, but duplicated.
| `PublicViewerView.normalizeTourScenes` + local `normalizeScene` | Similar API envelopes | Similar but not identical scene object; no scene audio or fallback texture list | Duplicate with behavioral drift.
| `tourDataMapper.normalizeScene` | Builder/local JSON: `image`, `thumb`, `initialView`, `target`, `loai_poi`, Vietnamese narration fields | Builder-oriented shape (`image`, `thumb`, `exportUrl`, `_file`, etc.) | Does not represent production API runtime model directly.
| `DemoVR.mapSceneForRuntime` | Output of Builder mapper | Converts back toward runtime shape | Third conversion path.

No exported `normalizeTour` or canonical `normalizeHotspot` presently serves the production Viewer. `tourDataMapper.normalizeHotspot` is not equivalent to the in-page production normalizers.

### 4.3 Proposed non-mutating canonical runtime model

During Phase 2, create one Viewer-owned adapter, for example `common/normalizeTour.js`, with:

```text
Raw JSON/API payload
  → extractTourPayload(raw)
  → normalizeTour(raw, { resolveAssetUrl, idFactory })
  → RuntimeTour
     { raw, version, scenes, initialSceneId, assets/options }
  → RuntimeScene
     { raw, id, name, group, description, imageSources, thumbnailSource,
       initialView, narration, transition, hotspots }
  → RuntimeHotspot
     { raw, id, type, label, position, targetSceneId, targetView,
       navStyle, audioSource, info, areaPoints, style }
```

Rules:

1. Preserve source objects/unknown fields under `raw` and/or spread-safe metadata; never mutate raw JSON.
2. Read aliases in deterministic precedence. Preserve current production precedence for image URLs and API fields, while additionally supporting Builder/local aliases (`image`, `thumb`, `target`, `entryView`, `am_thanh_thuyet_minh`).
3. Convert numeric runtime coordinates/views safely but retain the original values in `raw`.
4. URL resolution is injected (`resolveAssetUrl`) rather than importing `apiBaseURL` into core.
5. Keep `NAV_STYLES` and `normalizeNavStyle` single-sourced. Do not introduce a second mapper, renderer, or constants list.
6. Do not alter backend/local JSON schema. The adapter is a read-only compatibility layer.

## 5. Classification: Runtime, Builder-only, shared, and app-specific

### A. Runtime Viewer candidates

- `PanoramaViewer.vue`, NAV Vue components, and Viewer-related global CSS.
- The runtime portions of `TourViewerView.vue`: scene state, scene navigation, transition overlay, hotspot action dispatch, audio lifecycle, gallery/sidebar/toolbar/info modal.
- The runtime behavior demonstrated in `DemoVR.vue`.

### B. Builder-only — keep unchanged

- Entire `src/vr360builder/` except using it as a behavior/schema reference, including `Vr360Builder.vue`, editors, `PreviewEngine.js`, `SceneEditor.vue`, point editors, and Builder JSON data.
- `src/common/vr360/HotspotRenderer.js` and `src/common/vr360/NavRenderer.js` in their current imperative/editor form.
- Write/upload/delete/import/export endpoints in `src/api/toursApi.js`.

### C. Shared candidates

- `src/common/vr360/tourDataMapper.js`: retain one source of NAV style/default semantics, but split or adapt carefully because the present scene shape is Builder-centric.
- `src/common/hotspotIcons.js`: remains current shared source; do not move unless runtime starts using it.
- `src/styles/main.css`: source only; extract ownership-specific selectors without changing Builder selectors.

### D. App-specific coupling to remove/inject

| Coupling | Present in | Required migration treatment |
|---|---|---|
| `vue-router` route/query/back navigation | `TourViewerView.vue` | Keep in host page/router adapter. Core accepts `tour`/loader and emits events; no `useRoute`/`useRouter` inside core.
| Pinia `useAuthStore` | `TourViewerView.vue` | Host selects loader/mode. Core has no auth-store dependency.
| Project/location/version dropdowns | `TourViewerView.vue` | Host shell concern or optional injected catalog UI slot; not a production Viewer-core responsibility.
| Axios/base URL | API files and local URL resolvers | Inject `tourSource` and `resolveAssetUrl`; module services can be factory adapters over host HTTP clients.
| `document.documentElement` fullscreen | `TourViewerView.vue` | Inject/encapsulate fullscreen target in control layer; do not hard-code document root.
| Global CSS and Themify font icon | `main.js`, `main.css`, `NavDefault.vue` | Module should own a neutral icon or document host CSS requirement. Avoid a hidden dependency on global Themify CSS.
| hard-coded public visit payload (`VN`, `Ha Noi`) | `PublicViewerView.vue` | Analytics belongs in host service callback; never make it core Viewer behavior.

## 6. Target mapping and component architecture

The following are **future destinations**, not files created by this audit.

| Source | Future target | Action |
|---|---|---|
| `components/PanoramaViewer.vue` | `vr360-viewer/components/PanoramaCanvas.vue` | Move only during Phase 3; refactor API/lifecycle without behavior drift.
| `components/nav/NavRenderer.vue`, `NavDefault.vue`, `NavPreviewExpand.vue` | `vr360-viewer/components/nav/` | Move during Phase 3 and redirect to canonical shared NAV style helper.
| Runtime CSS portions of `styles/main.css` | `vr360-viewer/assets/viewer.css` (or module-local style) | Extract by ownership; preserve exact selectors/visual baseline first.
| `TourViewerView.vue` | `vr360-viewer/layout/Vr360ViewerLayout.vue` + `pages/ViewerProductionPage.vue` | Split host loader/route selection from reusable presentation/runtime controller.
| `PublicViewerView.vue` | `vr360-viewer/pages/ViewerDemoPage.vue` | Rebuild as a thin demo host only after common core is ready; do not port duplicate normalizer.
| `DemoVR.vue` | `vr360-viewer/pages/ViewerDemoPage.vue` or fixture-based demo | Migrate functionality after adapter supports local data; existing Builder demo remains until approved.
| Local normalizers in both views | `vr360-viewer/common/normalizeTour.js` | Replace only in Phase 2, with contract tests for all aliases.
| URL/image/YouTube helpers | `vr360-viewer/common/assets.js`, `media.js` | One canonical pure utility each; asset resolution stays injected.
| Scene navigation/transition orchestration | `vr360-viewer/common/createViewerController.js` or composition internal to layout | Private runtime controller; no router import.
| Audio lifecycle | `vr360-viewer/common/audioController.js` | Private controller; preserve browser autoplay recovery semantics.
| Public token, authenticated version loaders | `vr360-viewer/services/*` factories | Host-facing adapters only, no direct global Axios imports in the core component.
| Viewer route definitions | `vr360-viewer/router.js` | Export a route factory or definitions; host `src/router/index.js` remains owner of guards/routes.
| Public component export | `vr360-viewer/index.js` | Create in Phase 5.

### Proposed layering

```text
index.js (public API only)
  └─ Vr360Viewer.vue (public façade; receives RuntimeTour or load adapter)
       └─ layout/Vr360ViewerLayout.vue
            ├─ components/PanoramaCanvas.vue
            ├─ components/HotspotLayer + components/nav/*
            ├─ components/ViewerControls.vue
            ├─ components/SceneGallery.vue
            ├─ components/InfoMediaModal.vue
            └─ components/LoadingTransitionOverlay.vue

common/ (private engine/controller/model/normalizer/constants/utils)
services/ (optional host transport adapter factories)
pages/ and router.js (host/demo integration only)
```

Recommended public components: `Vr360Viewer` only; optionally a documented `Vr360ViewerDemoPage` for internal development. `PanoramaCanvas`, marker variants, audio controller, normalizer internals, and layout stay private unless a real host use case emerges.

## 7. Public API proposal

### Component contract

```vue
<Vr360Viewer
  :tour="runtimeTourOrRawTour"
  :resolve-asset-url="resolveAssetUrl"
  :options="viewerOptions"
  @ready="onReady"
  @scene-change="onSceneChange"
  @hotspot-click="onHotspotClick"
  @load-progress="onLoadProgress"
  @load-complete="onLoadComplete"
  @error="onViewerError"
/>
```

Prefer the host to load data and pass raw tour/payload or a pre-normalized `RuntimeTour`. An optional `loadTour` function can be accepted later if it remains a small adapter boundary; do not bake endpoint assumptions into the component.

### Events

| Event | Keep? | Payload/meaning |
|---|---|---|
| `ready` | Yes | Engine initialized and public methods are usable.
| `scene-change` | Yes | `{ previousSceneId, sceneId, source }` after target scene texture/view is active.
| `hotspot-click` | Yes | Runtime hotspot plus original click event/source; emitted before default action can be intercepted/configured.
| `load-progress` | Yes, but define honestly | `{ phase, loaded?, total?, sceneId? }`; Three.js current loader may not provide reliable bytes for every URL.
| `load-complete` | Yes | Initial tour or a requested scene load completed; distinguish scope in payload.
| `error` | Yes | Normalized error with phase, recoverability, and original cause where safe.

### Methods exposed by `ref`

| Method | Recommendation | Notes |
|---|---|---|
| `goToScene(sceneId, options?)` | Expose | Required core navigation; returns a Promise for transition completion.
| `nextScene()` / `previousScene()` | Expose | Useful simple controls; retain current cyclic behavior only if preserved by baseline tests.
| `getView()` / `setView(view, options?)` | Expose | Required for host controls/integration; current engine needs a non-animated setter in addition to `animateToView`.
| `resetView()` | Expose | Reset to active scene's normalized initial view.
| `toggleAutorotate(force?)` | Expose | Needed because autorotate is already runtime behavior.
| `enterFullscreen()` / `exitFullscreen()` | Expose | Expose only through Viewer-owned fullscreen target and feature detection.
| `dispose()` | Expose | Idempotent cleanup for embedded/package consumers; also execute automatically on unmount.

Do not expose raw Three.js scene/camera/renderer as public API; provide `getView`/`setView` instead to keep future engine choices open.

## 8. Services and router strategy

### Services

`services/` handles only external I/O. Suggested factory interfaces:

```js
createPublicTourService({ http, baseUrl, getEmbedOrigin })
// getTour(token), trackVisit(token, payload)

createVersionTourService({ http })
// getVersion(locationId, versionId), listVersions(locationId)

createPublishedCatalogService({ http, baseUrl })
// listPublishedTours(params)
```

`normalizeTour`, media decoration, renderer decisions, and UI must remain outside services. Existing host API modules are retained initially and wrapped/adapted; mutation/upload Builder APIs are not brought into the Viewer module.

### Router

- `src/vr360-viewer/router.js` should export route definitions/factory functions only, e.g. `createVr360ViewerRoutes({ productionPage, demoPage })`.
- The application router remains responsible for `/viewer`, `/vr360/:token`, auth/guest behavior, immersive metadata, and guards.
- `Vr360Viewer` and its internal controller must not import `vue-router`.
- Preserve legacy routes during site-by-site Phase 7 migration. There must be no duplicated runtime implementation attached to the same production route.

## 9. Current feature status and extension points

| Capability | Current state | Future extension point |
|---|---|---|
| NAV style | `default`, `preview_expand` implemented in Vue and Builder imperative paths | `common/navStyleRegistry`/injected component map; canonical style values remain shared.
| NAV preview expand | Implemented | Built-in `NavPreviewExpand`; no schema change.
| POI text/image/video/YouTube | Info modal and inline area media partly implemented | `HotspotActionResolver` + `InfoMediaModal`; support gallery/HTML/audio by media renderer registry.
| POI gallery | Builder editor exists; no runtime gallery renderer found | Future `components/media/GalleryModal.vue` registered by hotspot content type.
| POI HTML | Not implemented | Sanitized/injected renderer policy; do not render arbitrary HTML unsafely.
| Transition | Texture fade in engine; page overlay in production; Builder has richer transition metadata not consumed by production viewer | `TransitionStrategy` reads normalized `scene.transition`; baseline default remains present behavior.
| Fullscreen | One-way document-root request only | `FullscreenController` bound to Viewer root.
| Zoom | Wheel/FOV is implemented | `ViewController` with controlled FOV bounds and UI controls.
| Autorotate | Implemented through props | `ViewController` state/method; already a public API candidate.
| Gyroscope | Not implemented (iframe allow token is not sensor control) | Optional device-orientation adapter behind permission gate.
| Tiny Planet/Fisheye | Not implemented | Camera/projection strategy; do not couple it to tour schema.
| VR mode/WebXR | Not implemented | Engine adapter capability, possibly requires future dependency/product decision.
| Auto Tour | Not implemented | `AutoTourController` consuming normalized scene order/config; host controls it.
| Scene gallery | Sidebar + thumbnail strip implemented | `SceneGallery` component with slots/theme props.
| Theme | CSS is global and fixed | CSS variables/theme object at Viewer root; keep default visual baseline first.
| Intro/loading overlay | Scene transition overlay exists; no explicit tour intro model | `LoadingTransitionOverlay` and optional host-provided intro slot.
| Background/scene/hotspot audio | Production page implementation exists; Public Viewer does not match it | Private audio controller with explicit autoplay-blocked state/events.

## 10. Migration risks and controls

1. **Three normalizers currently drift.** Consolidation can change field precedence, generated IDs, URL behavior, or default hotspot type. Mitigate with fixtures from API-shaped payloads and the existing local JSON files.
2. **Runtime and Builder mapper share names but not schema semantics.** Do not replace Builder mapper with the Viewer adapter or change Builder imports.
3. **Texture race/memory risk.** `PanoramaViewer` does not currently abort `TextureLoader` requests; rapid navigation can produce late callbacks. Preserve baseline first, then add generation-token/cancellation safeguards behind tests.
4. **Audio browser policy.** Background/scene playback intentionally retries after user interaction. Preserve that behavior and test blocked-autoplay flows.
5. **CSS global collision.** Viewer and Builder styles coexist in `main.css`, including `:has()` and Themify icon dependencies. Extract only verified Viewer selectors and retain exact UI snapshots/manual checks.
6. **Fullscreen behavior changes.** Current request targets `document.documentElement`; moving to a Viewer root changes UX. Treat this as an explicit approved behavior improvement, not silent parity work.
7. **Info-area projection.** Polygons are only rendered if all vertices are visible and not crossing a broad screen edge. This is intentional/current behavior and needs visual regression tests.
8. **Public/private route/auth branching.** `TourViewerView` currently branches on Pinia guest state and route selection. Keep it in a host adapter until branch coverage is verified.
9. **Hard-coded/incomplete behavior.** `selectedPointHotspot` is cleared and never assigned by current `onHotspotClick`; Builder transition/narration metadata is richer than what production consumes. These are baseline observations, not changes for this audit.

## 11. Phased migration plan

### Phase 0 — Audit + baseline behavior

- **Create/modify:** This map; add no runtime code. Capture representative manual/API/local fixtures and baseline screenshots/checklist outside schema changes.
- **Must not modify:** `src/vr360builder/**`, legacy views/components, API contracts, dependencies.
- **Dependencies affected:** None.
- **Acceptance criteria:** Inventory, graph, coupling, normalization differences, and unsupported features are documented; baseline routes `/viewer`, `/vr360/:token`, `/public-viewer`, `/demo-vr` are identified.
- **Tests:** Existing build; manual smoke of available routes; fixture catalog for public/private/local forms.
- **Risk:** Missing backend examples. Record as unresolved rather than infer schema.
- **Rollback:** Delete the audit document only if explicitly abandoning the initiative; no behavior rollback required.

### Phase 1 — Map Runtime into `src/vr360-viewer`, no behavior change

- **Create/modify:** Create target subdirectories and ownership manifest/internal import plan; no final route switch. Prefer small compatibility re-exports only if required.
- **Must not modify:** `src/vr360builder/**`; legacy Viewer behavior; JSON schema; dependency versions.
- **Dependencies affected:** Relative/alias import plan and CSS ownership only.
- **Acceptance criteria:** Every runtime responsibility has one planned target; no duplicate engine/mapper/renderer is introduced.
- **Tests:** `npm run build`; static import graph review.
- **Risk:** Copying components creates divergence.
- **Rollback:** Remove only newly created, unreferenced module scaffolding.

### Phase 2 — Extract runtime engine and data adapter

- **Create/modify:** `common/normalizeTour.js`, runtime model/types/docs, pure asset/media helpers, private controller contracts; minimal compatibility changes to consumers when approved.
- **Must not modify:** Builder mapper semantics, `PreviewEngine.js`, Builder renderer, API JSON schema.
- **Dependencies affected:** Existing Viewers/Demo must consume the same canonical adapter one at a time, never parallel duplicate mappers.
- **Acceptance criteria:** Raw input is unmodified; unknown fields are retained; API and local fixture aliases normalize to expected IDs/images/hotspots/views; one authoritative Viewer normalizer exists.
- **Tests:** Unit tests for `normalizeTour`, `normalizeScene`, `normalizeHotspot`, URL precedence, info area, NAV style, invalid/missing values.
- **Risk:** Field-precedence regressions.
- **Rollback:** Keep compatibility adapter at call site; revert consumer adoption while retaining tested pure module.

### Phase 3 — Migrate components, layout, pages, common, assets

- **Create/modify:** Move/refactor panorama, NAV components, hotspot/media overlays, transition, audio controller, scene gallery, Viewer-owned CSS/assets into target; compose `Vr360ViewerLayout`.
- **Must not modify:** Builder preview engine/renderers/editors; host route contracts.
- **Dependencies affected:** Three.js lifecycle, global CSS import path, Themify icon dependency.
- **Acceptance criteria:** New core renders same panorama texture/fallback, pointer view, wheel zoom, NAV variants, point/info/info-area overlays, transitions, audio recovery, thumbnails/sidebar as baseline.
- **Tests:** WebGL manual regression across desktop/mobile viewport; texture error/fallback; disposal/unmount; visual snapshots where available.
- **Risk:** CSS bleed and WebGL resource leaks.
- **Rollback:** Keep legacy components/routes active; revert host use of new layout without deleting them.

### Phase 4 — Separate services and router integration

- **Create/modify:** `services/` adapter factories and `router.js` route factory; thin host loader/page adapters.
- **Must not modify:** Existing endpoint paths/payloads, auth guard policy, Builder API writes.
- **Dependencies affected:** Axios/http injection, route params/query, Pinia remains host-only.
- **Acceptance criteria:** Core has no imports from `src/api`, `src/stores`, `vue-router`, or app global base URL; equivalent public/private loading remains possible via injected loaders.
- **Tests:** Mocked service contracts; host route smoke tests; unauthenticated/guest/authenticated selection checks.
- **Risk:** Route guard or token fallback regressions.
- **Rollback:** Switch route components back to legacy pages; services are additive adapters.

### Phase 5 — Public API and integration layer

- **Create/modify:** `index.js`, `Vr360Viewer.vue` façade, documented props/events/ref methods, integration examples.
- **Must not modify:** JSON schema; internal component imports exposed as accidental public API.
- **Dependencies affected:** Host imports Viewer from `@/vr360-viewer`.
- **Acceptance criteria:** `import { Vr360Viewer } from '@/vr360-viewer'` works; all approved events/methods are documented and tested; `dispose()` is idempotent.
- **Tests:** Component integration harness, event/method tests, unmount/remount checks.
- **Risk:** Prematurely freezing unstable internals.
- **Rollback:** Preserve legacy route integration and mark new API experimental until Phase 7 completes.

### Phase 6 — Production page + Demo Viewer

- **Create/modify:** `pages/ViewerProductionPage.vue`, `pages/ViewerDemoPage.vue`, fixture provider/demo route integration.
- **Must not modify:** Legacy `TourViewerView.vue`, `PublicViewerView.vue`, `DemoVR.vue` until acceptance passes.
- **Dependencies affected:** Router factory and host-specific loader adapters.
- **Acceptance criteria:** Production page uses shared core; demo covers local fixture/public-token path without copying normalization/navigation logic.
- **Tests:** Route-level smoke, all supported hotspot/media variants, audio and fullscreen capability checks.
- **Risk:** Demo diverges from production configuration.
- **Rollback:** Remove only new route registrations; legacy pages remain intact.

### Phase 7 — Move each current site/route to the new module

- **Create/modify:** One host route adapter at a time (`/viewer`, `/vr360/:token`, then `/public-viewer`/demo decision).
- **Must not modify:** Builder routes `/builder`, `/demo-vr` until explicit approval; common JSON schema and server APIs.
- **Dependencies affected:** Auth/public route selection, analytics injection, host branding/theme.
- **Acceptance criteria:** Each migrated route satisfies Phase 3 baseline plus route-specific loading/error/analytics behavior before next route changes.
- **Tests:** Side-by-side legacy/new regression on same payloads; production-like token access and authorized version tests.
- **Risk:** Site-specific coupling hidden in page templates/CSS.
- **Rollback:** Feature flag or route component switch back to the legacy Viewer per site; retain legacy files until all sites pass.

### Phase 8 — Regression, performance, cleanup

- **Create/modify:** Tests, performance profiling, documentation; remove deprecated duplicates only after approved cutover.
- **Must not modify:** `src/vr360builder/**` absent a separately approved Builder project; dependency versions/schema unless separately approved.
- **Dependencies affected:** Bundle size, texture memory, rendering FPS, route ownership.
- **Acceptance criteria:** No duplicate canonical mapper/renderer/constants; no WebGL/audio leaks in repeated scene switches; verified build and supported-browser matrix; removal approval recorded.
- **Tests:** Automated unit/integration suite, long navigation soak, memory/FPS checks, visual/media/audio/accessibility smoke tests.
- **Risk:** Cleanup removes a fallback too early.
- **Rollback:** Tag/release before cleanup; retain a compatibility route branch and restore route mapping rather than reconstruct files from copies.

## 12. Rollback strategy (cross-phase)

1. Use additive module creation and route-level opt-in; never delete legacy Viewer in Phases 0–7.
2. Keep raw payload contracts unchanged, making adapter adoption reversible at the page boundary.
3. Switch a single host route back to legacy component on regression; do not copy fixes between implementations.
4. Gate destructive cleanup until all migrated routes meet Phase 8 acceptance and an explicit approval is given.
5. Preserve a tested fixture set and behavior checklist so rollback validation does not depend on a live backend alone.

## 13. Open questions / conclusions not possible from source alone

1. Real API response variants, media CORS headers, and maximum panorama size were not available in source; they need captured fixtures/backend confirmation.
2. The exact intended precedence between `optimized_file` and `original_file` differs between existing views (`TourViewerView` prefers original first; `PublicViewerView` prefers optimized first). Product decision/baseline verification is needed before canonicalization.
3. Builder stores `transition` and `am_thanh_thuyet_minh`, but current production Viewer does not consume those exact fields. Confirm intended runtime contract before activating them.
4. No requirements or implementation for gyroscope, tiny planet, fisheye, WebXR/VR mode, auto tour, HTML POI, or gallery POI runtime were found.
5. Confirm whether fullscreen should remain document-root or become Viewer-container fullscreen.
6. Confirm whether `PublicViewerView` is a retained admin/test tool or should become the only public embed demo; its hard-coded visit geography must not become module behavior.
7. Confirm desired packaging boundary: application-local `@/vr360-viewer` first, or a future npm package. The proposed injected service/router boundaries support both.

## 14. Approval gate

No migration should begin until the following architectural decisions are approved: canonical field precedence, public vs host page responsibilities, Viewer-root fullscreen behavior, CSS/icon ownership, service injection contract, and the initial public API above.
