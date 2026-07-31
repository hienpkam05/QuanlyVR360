Bạn đang làm việc trực tiếp trong project:

D:\Metatwin\QuanlyVR360\frontend

Module Runtime Viewer mục tiêu:

D:\Metatwin\QuanlyVR360\frontend\src\vr360-viewer

Cấu trúc BẮT BUỘC phải giữ đúng:

src/vr360-viewer/
├── assets/
├── common/
├── components/
├── layout/
├── pages/
├── services/
└── router.js

KHÔNG tự ý thêm thư mục cấp root khác.
Có thể tạo subfolder bên trong các thư mục trên nếu cần để tổ chức code.

Đây là MIGRATION THỰC TẾ. Hãy trực tiếp chuyển Runtime Viewer hiện tại vào module mới.

==================================================
MỤC TIÊU
==================================================

Đóng gói toàn bộ Runtime Viewer VR360 thành module riêng, tái sử dụng được và tách biệt với VR360 Builder.

Production Viewer lấy dữ liệu từ API.

Local JSON chỉ dùng cho Demo/Test/Fixture, không phải production source.

Không migrate VR360 Builder.

Không làm thay đổi behavior hiện tại của Builder.

==================================================
NGUYÊN TẮC
==================================================

- Không rewrite Viewer từ đầu nếu có thể tái sử dụng code hiện tại.
- Không copy nguyên Viewer thành một phiên bản khác rồi phát triển song song.
- Không tạo duplicate mapper/normalizer/renderer/constants/service.
- Không đổi backend API.
- Không đổi JSON schema.
- Không nâng cấp dependency.
- Không xóa Viewer cũ trước khi Viewer mới hoạt động ổn định.
- Giữ Viewer cũ làm fallback để rollback.
- Ưu tiên migrate từng phần và kiểm tra sau từng bước.
- Không thay đổi behavior chỉ để "làm sạch code" nếu không cần thiết.

==================================================
NGUỒN RUNTIME HIỆN TẠI
==================================================

Đọc và migrate từ source thực tế:

- src/views/TourViewerView.vue
- src/views/PublicViewerView.vue
- src/components/PanoramaViewer.vue
- src/components/nav/NavRenderer.vue
- src/components/nav/NavDefault.vue
- src/components/nav/NavPreviewExpand.vue

Đọc toàn bộ dependency trực tiếp và gián tiếp:

- API modules
- Auth/token
- Router
- Mapper/Normalizer
- Asset URL resolver
- Audio
- Media
- Runtime CSS
- Scene/Hotspot logic

Không dựa vào tên file giả định. Code thực tế là nguồn sự thật.

==================================================
TARGET STRUCTURE
==================================================

### assets/

Asset thuộc Runtime Viewer:
- icon
- hình mặc định
- asset Viewer dùng chung

Không hard-code asset path từ app cha nếu có thể đưa vào module.

### common/

Logic nội bộ Runtime Viewer.

Có thể chia subfolder:

- engine
- model
- mapper
- renderer
- controllers
- constants
- utils

Bao gồm:
- Runtime Model
- API response adapter/normalizer
- Runtime engine/controller
- Scene navigation
- Transition
- Audio controller
- Asset/media utilities
- Constants
- Renderer logic

Không để UI vào đây.

Không đưa Builder-only code vào đây.

### components/

UI component tái sử dụng:

- Panorama
- Hotspot/POI
- NAV
- Controls
- Media
- Scene Gallery
- Loading
- Transition
- Overlay

Giữ riêng:

- NavDefault
- NavPreviewExpand

Không dùng Builder HotspotRenderer làm Runtime renderer.

### layout/

Layout tổng thể Runtime Viewer.

Tách layout/UI khỏi API loading, router và auth.

### pages/

Tạo:

- ViewerProductionPage.vue
- ViewerDemoPage.vue

Production Page:
- Dùng API thật.

Demo Page:
- Có thể dùng local JSON/fixture.

Không copy logic normalize riêng cho Demo.

### services/

Chỉ xử lý external API/I/O.

Ví dụ:
- Tour
- Scene
- Media
- Public Tour
- Version Tour

Ưu tiên tái sử dụng API implementation hiện tại thông qua adapter/factory.

Không duplicate:
- endpoint
- request logic
- authentication logic
- response parsing

Nếu API module hiện tại chứa cả Builder mutation và Viewer read logic, chỉ adapter phần read cần thiết cho Runtime Viewer.

Services không xử lý:
- UI
- Three.js
- Renderer
- Runtime Model
- Hotspot behavior

Không hard-code:
- Pinia store
- Axios instance của app
- API base URL

### router.js

Chỉ là integration layer.

Viewer Core không phụ thuộc trực tiếp vào vue-router.

Host router vẫn quản lý:
- route ownership
- auth guard
- permission
- redirect

Trước khi migrate route, đọc `src/router/index.js` và xác định route production thực tế.

Chỉ chuyển MỘT route production đầu tiên.

Giữ nguyên:
- URL path
- route params
- query
- auth behavior
- guard

Không chuyển tất cả route cùng lúc.

==================================================
DATA FLOW
==================================================

Production:

API
→ Service/Adapter
→ Raw API Payload
→ Runtime Normalizer
→ Runtime Model
→ Viewer

Tạo MỘT nguồn normalize dùng chung.

Không để:
- TourViewerView có normalizer riêng
- PublicViewerView có normalizer riêng
- Demo có mapper riêng

Normalizer:
- Không mutate raw API data.
- Hỗ trợ API response variants hiện tại.
- Chuẩn hóa ID.
- Chuẩn hóa URL asset.
- Chuẩn hóa Scene/View/Hotspot.
- Chuẩn hóa NAV style.
- Chuẩn hóa POI type.
- Giữ backward compatibility.
- Không làm mất field chưa sử dụng.

Không đổi backend API hoặc JSON schema.

==================================================
RUNTIME MODEL
==================================================

Thiết kế model nội bộ dùng chung:

RuntimeTour
- id
- title
- scenes
- initialSceneId
- narration
- backgroundMusic
- metadata
- raw

RuntimeScene
- id
- name
- group
- imageSources
- thumbnailSource
- initialView
- hotspots
- transition
- metadata
- raw

RuntimeHotspot
- id
- type
- position
- targetSceneId
- targetView
- navStyle
- label
- content
- media
- audio
- style
- metadata
- raw

Chỉ mapping field có cơ sở từ API thực tế.

==================================================
VIEWER / HOST BOUNDARY
==================================================

Viewer Core KHÔNG import trực tiếp:

- Pinia auth store
- vue-router
- API modules của app cha
- API_BASE_URL global
- composable riêng của site

Host App chịu trách nhiệm:

- Auth
- Token
- Router
- API client
- Permission
- Analytics
- Project/Location/Version selection

Viewer nhận data/dependency qua:
- props
- options
- factory
- injection
- adapter

==================================================
PUBLIC VIEWER API
==================================================

Thiết kế Viewer theo hướng:

<Vr360Viewer
  :tour="tourData"
  :options="viewerOptions"
/>

Hoặc loader interface nếu thực sự cần:

<Vr360Viewer
  :load-tour="loadTour"
/>

Events:

- ready
- scene-change
- hotspot-click
- load-progress
- load-complete
- error

Exposed methods:

- goToScene
- nextScene
- previousScene
- getView
- setView
- resetView
- toggleAutorotate
- enterFullscreen
- exitFullscreen
- dispose

Không expose trực tiếp Three.js internals.

==================================================
NAV / POI
==================================================

Giữ nguyên behavior Runtime:

- NAV default
- NAV Preview Expand
- POI/Hotspot
- Target Scene
- EntryView
- Hover
- Click
- Transition

Không migrate Builder renderer.

Thiết kế mở rộng để thêm NAV style/POI type sau này mà không sửa toàn bộ Viewer.

==================================================
MIGRATION ORDER
==================================================

1. Kiểm tra target structure.
2. Migrate common Runtime logic.
3. Tạo Runtime normalizer dùng chung.
4. Migrate Panorama/NAV/POI/components.
5. Migrate layout.
6. Tách API services/adapters.
7. Tạo ViewerProductionPage.
8. Tạo ViewerDemoPage.
9. Tạo router.js integration.
10. Tích hợp Viewer mới với host app.
11. Xác định route production thực tế từ host router.
12. Chuyển MỘT route production sang Viewer mới.
13. Regression test.
14. Chỉ chuyển route tiếp theo khi route trước pass đầy đủ.
15. Sau khi tất cả route ổn định mới loại bỏ legacy Viewer không còn sử dụng.

Không tạo nhiều implementation Viewer production song song lâu dài.

==================================================
KHÔNG ĐƯỢC LÀM HỎNG
==================================================

Phải giữ:

- API load Tour.
- API load Scene.
- Panorama.
- NAV default.
- NAV Preview Expand.
- POI/Hotspot.
- Target Scene.
- EntryView.
- Transition.
- Thumbnail.
- Scene Gallery.
- Audio narration.
- Background music.
- Drag.
- Zoom.
- Autorotate.
- Fullscreen.
- Responsive.
- Loading/Error fallback.

Không ảnh hưởng:

- VR360 Builder.
- Builder PreviewEngine.
- Builder HotspotRenderer.
- Builder routes.
- Backend API.
- JSON schema.

==================================================
TEST
==================================================

Bắt buộc kiểm tra:

1. API load Tour.
2. API load Scene.
3. Panorama render.
4. NAV default.
5. NAV Preview Expand.
6. POI/Hotspot.
7. Target Scene.
8. EntryView.
9. Transition.
10. Thumbnail/Scene Gallery.
11. Audio narration.
12. Background music.
13. Drag/Zoom.
14. Autorotate.
15. Fullscreen.
16. Responsive.
17. API error/fallback.
18. Unmount/remount.
19. Chuyển Scene liên tục.
20. Không ảnh hưởng Builder.

Kiểm tra thêm:
- WebGL dispose.
- Texture cleanup/cache.
- Audio cleanup.
- Event listener cleanup.
- DOM cleanup.
- Không leak Three.js object.

Chạy lint/build/test nếu project có.

==================================================
DEFINITION OF DONE
==================================================

Chỉ coi migration hoàn tất khi:

- Production Viewer lấy dữ liệu từ API.
- Viewer mới render được đầy đủ behavior cần thiết.
- Một route production đã chạy ổn định trên Viewer mới.
- Các route còn lại chỉ chuyển sau khi route trước pass regression.
- Không còn duplicate Runtime normalizer.
- Không có duplicate Viewer production implementation đang được sử dụng.
- Builder không bị ảnh hưởng.
- Backend API và JSON schema không thay đổi.
- Không có WebGL/Audio/Event listener leak khi mount/unmount và đổi Scene nhiều lần.
- Lint/build/test pass hoặc báo rõ lý do không chạy được.
- `git diff` chỉ chứa thay đổi liên quan Viewer và integration cần thiết.

==================================================
BÁO CÁO CUỐI
==================================================

Báo cáo:

- File mới trong `src/vr360-viewer`.
- File đã sửa.
- File Viewer cũ được thay thế.
- Logic Runtime đã migrate.
- API services/adapters đã tách.
- Normalizer dùng chung.
- Runtime Model.
- Public API.
- Route đã chuyển.
- Builder code được giữ nguyên.
- Các lỗi phát sinh và cách xử lý.
- Kết quả lint/build/test.

QUAN TRỌNG:

Hãy trực tiếp thực hiện migration.

Không chỉ phân tích hoặc lập kế hoạch.

Không tạo thêm thư mục cấp root ngoài:

assets/
common/
components/
layout/
pages/
services/

và file:

router.js

Mọi logic mới phải được đặt trong đúng các nhóm trên.

Không tạo `index.js` hoặc thư mục cấp root mới ở bước này.

Sau khi migration hoàn tất, kiểm tra `git diff` và đảm bảo không có thay đổi ngoài phạm vi Runtime Viewer, Host integration cần thiết và route tích hợp.