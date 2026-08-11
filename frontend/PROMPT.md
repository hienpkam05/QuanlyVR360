# TASK — REUSE CORE EYES MODE / VIEW MODE IN V2 BOTTOM NAV

Project:
D:\Metatwin\QuanlyVR360\frontend\vr360-viewer-v2

Đọc frontend/PROMPT.md trước khi thực hiện.

==================================================
1. MỤC TIÊU
==================================================

Hiện tại V2 Bottom Navigation bên phải CHƯA CÓ chức năng
điều chỉnh chế độ góc nhìn.

Tôi muốn tái sử dụng CHÍNH XÁC chức năng đã tồn tại trong:

frontend/src/vr360-viewer

Core hiện đang có các chế độ:

- Fit Eyes
- Normal
- Mega View

Trong UI V2, chức năng này phải được đặt trong:

BOTTOM NAV — RIGHT GROUP

Không được tự viết lại logic FOV.

Không được tạo một hệ thống View Mode thứ hai.

==================================================
2. QUAN TRỌNG — "EYES MODE"
==================================================

"Eyes Mode" ở đây là chức năng điều chỉnh góc nhìn
đã tồn tại trong VR360 Viewer Core.

PHẢI kiểm tra implementation thực tế trong core trước.

Không được mặc định rằng:

Eyes Mode = FOV cố định.

Không được tự suy luận.

==================================================
3. CORE AUDIT — BẮT BUỘC
==================================================

Đọc và audit:

frontend/src/vr360-viewer/common/controllers/
viewModeManager.js

frontend/src/vr360-viewer/layout/
Vr360ViewerLayout.vue

frontend/src/vr360-viewer/components/
ViewerPill.vue

và tìm toàn bộ:

- Fit Eyes
- fit-eyes
- FitEyes
- Mega View
- mega-view
- Normal
- normal
- viewMode
- view-mode
- eyes
- FOV
- fov

Xác định chính xác:

1. Core định nghĩa mode ở đâu?
2. Core lưu current mode ở đâu?
3. Core thay đổi mode bằng function nào?
4. Core UI gọi function nào?
5. Core có public API nào?
6. Core có event nào?
7. Fit Eyes thực hiện điều gì?
8. Normal thực hiện điều gì?
9. Mega View thực hiện điều gì?
10. Desktop/mobile có khác nhau không?

==================================================
4. SOURCE OF TRUTH
==================================================

SOURCE OF TRUTH DUY NHẤT:

frontend/src/vr360-viewer

V2 chỉ là UI consumer.

Kiến trúc bắt buộc:

V2 Bottom Nav
      ↓
ViewerAdapter
      ↓
ViewerCoreFacade
      ↓
Core Public View Mode API
      ↓
existing Core View Mode implementation

KHÔNG:

V2
 ↓
viewModeManager.js

==================================================
5. KHÔNG HARD-CODE FOV
==================================================

TUYỆT ĐỐI KHÔNG viết:

Fit Eyes = 70
Normal = 75
Mega View = 100

trong V2.

Nếu Core hiện tại sử dụng các giá trị đó thì vẫn phải
delegate tới Core.

Không được copy logic FOV sang V2.

Đặc biệt Normal phải tiếp tục sử dụng FOV thực tế của
scene hiện tại.

==================================================
6. KIỂM TRA PUBLIC API
==================================================

Kiểm tra:

frontend/src/vr360-viewer/facade/ViewerCoreFacade.js

và:

frontend/vr360-viewer-v2/src/adapters/ViewerAdapter.js

Xác định hiện tại đã có:

getViewMode()
setViewMode()
getAvailableViewModes()

hay chưa.

Nếu ĐÃ CÓ:

→ REUSE NGAY.

Nếu CHƯA CÓ:

→ kiểm tra owner surface của Core.

Nếu Core đã expose API tương đương:

→ dùng API đó.

Nếu Core CHƯA expose:

→ chỉ bổ sung public bridge tối thiểu theo architecture
hiện tại.

KHÔNG import internal controller trực tiếp vào V2.

==================================================
7. CORE API EXPECTATION
==================================================

V2 cần có khả năng:

viewerAdapter.getViewMode()

viewerAdapter.setViewMode(mode)

viewerAdapter.getAvailableViewModes()

Các mode phải là canonical mode của Core.

Ví dụ nếu Core đang dùng:

"normal"
"fit-eyes"
"mega-view"

thì giữ nguyên.

Không tạo:

"eyes"
"fit"
"wide"

nếu Core không sử dụng.

==================================================
8. BOTTOM NAV
==================================================

Đưa View Mode vào nhóm bên phải.

Ví dụ:

LEFT:

[Previous] [Scene List] [Next]

RIGHT:

[View Mode] [Rotation] [Home] [Audio] [Fullscreen]

View Mode nằm trong Bottom Nav bên phải.

Không tạo floating control riêng.

Không đặt giữa màn hình.

==================================================
9. VIEW MODE BUTTON
==================================================

Button phải tái sử dụng icon/style phù hợp với Core nếu
Core đã có.

Không import thêm icon library nếu không cần.

Button hiển thị trạng thái hiện tại nếu UI architecture
đang hỗ trợ.

Ví dụ:

[View]

Click:

[ Fit Eyes ]
[ Normal ✓ ]
[ Mega View ]

==================================================
10. POPUP / SHEET
==================================================

Có thể dùng:

- dropdown
- popover
- compact menu
- bottom sheet trên mobile

Nhưng phải phù hợp với Bottom Nav hiện tại.

Không tạo modal fullscreen.

Không tạo backdrop che toàn bộ viewer.

==================================================
11. CURRENT MODE
==================================================

Current mode phải lấy từ Core.

Không tạo state độc lập kiểu:

const currentMode = ref("normal")

nếu state đó không đồng bộ với Core.

Nếu cần local UI state:

→ chỉ mirror Core state.

Core là source of truth.

==================================================
12. VIEW MODE CHANGE
==================================================

Khi user chọn:

Fit Eyes

phải gọi:

ViewerAdapter.setViewMode("fit-eyes")

Sau đó:

Core xử lý FOV/animation.

Không xử lý FOV trong V2.

Tương tự:

Normal
Mega View.

==================================================
13. EVENT SYNC
==================================================

Nếu Core có event:

view-mode-change

→ facade/adapter phải subscribe.

Khi Core thay đổi mode từ nơi khác:

V2 phải cập nhật selected/current state.

Không để:

Core = Mega View
V2 UI = Normal.

==================================================
14. CORE UI REGRESSION
==================================================

Không được phá ViewerPill hiện tại.

Không remove:

Fit Eyes
Normal
Mega View

khỏi Core UI.

Không thay đổi behavior của Core.

==================================================
15. SCENE LIST
==================================================

Không sửa Scene List.

Không sửa:

- visited checked
- active scene
- scroll
- scene navigation.

View Mode chỉ thêm vào Bottom Nav.

==================================================
16. AUDIO
==================================================

Không được làm mất Audio.

Sau khi thêm View Mode:

Right Nav vẫn phải có:

View Mode
Rotation
Home
Audio
Fullscreen

Audio behavior phải giữ nguyên.

==================================================
17. ROTATION
==================================================

Không sửa logic rotation.

View Mode không được ảnh hưởng:

autorotation state.

==================================================
18. FULLSCREEN
==================================================

Không sửa fullscreen implementation ngoài phạm vi cần thiết.

View Mode phải tiếp tục hoạt động khi fullscreen.

Bottom Nav vẫn visible.

==================================================
19. INTRO
==================================================

Không bypass Intro.

Trước intro complete:

View Mode phải tuân theo trạng thái lock hiện tại.

Sau intro complete:

View Mode usable.

==================================================
20. MOBILE
==================================================

Trên mobile:

View Mode phải có hit area đủ lớn.

Có thể dùng compact popover/sheet.

Không dựa vào hover.

Touch phải hoạt động.

Không phá:

- rotate
- pinch zoom
- fullscreen
- audio.

==================================================
21. MOBILE FOV POLICY
==================================================

Nếu Core có:

mobileFovPolicy.js

→ View Mode phải đi qua Core.

Không tạo mobile FOV riêng trong V2.

Không override:

fit-eyes
normal
mega-view

bằng giá trị desktop.

==================================================
22. EYES MODE / VIEW MODE DISTINCTION
==================================================

Nếu audit cho thấy "Eyes Mode" thực tế có tên khác
trong Core:

PHẢI ghi rõ:

"Eyes Mode" của user tương ứng với:

<CORE FEATURE NAME>

Không được tạo feature mới chỉ vì tên gọi khác nhau.

==================================================
23. TEST
==================================================

Phải test:

1. getAvailableViewModes()

2. getViewMode()

3. setViewMode("fit-eyes")

4. setViewMode("normal")

5. setViewMode("mega-view")

6. UI selected state.

7. Core event sync.

==================================================
24. ACCEPTANCE TEST — DESKTOP
==================================================

Sau Intro:

Bottom Nav visible.

Click View Mode.

Expected:

Fit Eyes
Normal
Mega View

Click Fit Eyes:

Expected:

Core Fit Eyes hoạt động.

Click Normal:

Expected:

Core Normal hoạt động.

Click Mega View:

Expected:

Core Mega View hoạt động.

==================================================
25. ACCEPTANCE TEST — MOBILE
==================================================

Mobile:

Bottom Nav visible.

Tap View Mode.

Expected:

3 modes có thể thao tác bằng touch.

Tap:

Fit Eyes
Normal
Mega View

Expected:

Core thay đổi view mode đúng.

Không phá touch viewer.

==================================================
26. ACCEPTANCE TEST — CURRENT STATE
==================================================

Nếu Core đang:

Mega View

V2 phải hiển thị:

Mega View ✓

Không được:

Normal ✓.

==================================================
27. ACCEPTANCE TEST — EXTERNAL CHANGE
==================================================

Nếu user thay đổi View Mode từ Core UI:

V2 phải đồng bộ.

Nếu Core hỗ trợ event:

view-mode-change

→ dùng event đó.

Không polling liên tục.

==================================================
28. KHÔNG TẠO LOGIC FOV
==================================================

Search V2:

setFov(
getFov(
fov =
normalFov
fitEyesFov
megaViewFov

Nếu những thứ này được tạo chỉ để phục vụ View Mode:

→ REMOVE.

V2 không được sở hữu View Mode FOV logic.

==================================================
29. KHÔNG IMPORT INTERNAL CORE
==================================================

Search:

frontend/vr360-viewer-v2/**

Không được có:

import viewModeManager
import cameraController
import mobileFovPolicy

hoặc import internal runtime/controller khác.

V2 chỉ:

Adapter
→ Facade
→ Public Core API.

==================================================
30. BUILD
==================================================

Chạy:

npm.cmd run build

Sau đó:

git diff --check

==================================================
31. BOUNDARY
==================================================

CHỈ được sửa:

frontend/vr360-viewer-v2/**

và public facade/bridge tối thiểu nếu cần theo
PROMPT.md.

Không sửa:

- cameraController
- projection
- AudioManager
- IntroController
- IntroCameraAdapter
- Scene List
- touch
- existing FOV implementation.

Không git reset.

Không git restore.

Không revert thay đổi cũ.

==================================================
32. FINAL REPORT
==================================================

## CORE AUDIT

Core View Mode implementation:
...

Core controller:
...

Core UI:
...

Canonical modes:
...

Core API:
...

## PUBLIC API

getViewMode:
FILE + LINE

setViewMode:
FILE + LINE

getAvailableViewModes:
FILE + LINE

## V2

ViewerCoreFacade:
...

ViewerAdapter:
...

Bottom Nav:
...

View Mode UI:
...

## TEST

Fit Eyes:
PASS/FAIL

Normal:
PASS/FAIL

Mega View:
PASS/FAIL

Current mode:
PASS/FAIL

Event sync:
PASS/FAIL

Desktop:
PASS/FAIL

Mobile:
PASS/FAIL

Touch:
PASS/FAIL

Audio:
PASS/FAIL

Fullscreen:
PASS/FAIL

Intro:
PASS/FAIL

## FILES MODIFIED

...

## CORE FILES MODIFIED

...

## BUILD

PASS/FAIL

## GIT DIFF CHECK

PASS/FAIL

## FINAL STATUS

DONE

chỉ khi V2 thực sự gọi được implementation View Mode
của Core.

Nếu Core chưa có public API cần thiết:

BLOCKED

và KHÔNG được tạo workaround bằng FOV.