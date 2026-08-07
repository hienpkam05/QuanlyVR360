Technical Design Document
VR360 Viewer Intro Experience v2.0

Version: 2.0

Status: Approved Design

Priority: Critical

1. Design Goal

Intro không phải là một animation.

Intro là một trải nghiệm dẫn người dùng từ thế giới bên ngoài bước vào thế giới VR.

Người dùng phải có cảm giác:

"Tôi đang đứng trước một mô hình thu nhỏ của cả thế giới."

↓

"Tôi quyết định bước vào."

↓

"Tôi tiến lại gần."

↓

"Tôi bước vào bên trong."

↓

"Tôi đang ở trong không gian VR."

Tuyệt đối KHÔNG được tạo cảm giác:

"Một quả cầu đang zoom."

2. UX Goal

Người dùng phải trải nghiệm theo đúng thứ tự sau.

Stage 1

Loading

↓

Hiển thị Little Planet

↓

Không có animation.

Không xoay.

Không zoom.

Không chuyển projection.

Không tự chạy.

Stage 2

Hiển thị UI Intro

Ví dụ:

Đình Chùa Tây Phương

Khám phá không gian di sản bằng công nghệ VR360

────────────────────────

      [ BẮT ĐẦU KHÁM PHÁ ]

UI phải cực kỳ tối giản.

Không:

overlay đen
blur
vignette
opacity layer
Stage 3

Người dùng bấm

"Bắt đầu khám phá"

Sau đó

chờ khoảng

200~300ms

để người dùng có phản hồi.

Stage 4

Camera bắt đầu tiến.

Lưu ý:

KHÔNG phải quả cầu phóng to.

Camera mới là thứ di chuyển.

Little Planet gần như đứng yên.

3. Core Principle

Đây là nguyên lý quan trọng nhất.

Animation phải được chia thành hai phần.

Camera Motion

chịu trách nhiệm

đưa người xem tiến vào.

Projection Transition

chịu trách nhiệm

biến Little Planet thành Panorama.

Hai thứ này KHÔNG bắt đầu cùng lúc.

4. Timeline

Tổng thời gian

≈ 3.5~4 giây

Phase A

Idle

0%

Little Planet

100%

Projection

Camera đứng rất xa.

Không chuyển động.

Phase B

User Click

0.2s

Không animation.

Chỉ tạo cảm giác

"Tôi vừa bấm."

Phase C

Camera Move

1.2s

Camera bắt đầu tiến.

Projection

gần như giữ nguyên.

Little Planet

vẫn là Little Planet.

Khoảng

70%

chuyển động ở Intro

đến từ Camera.

Chỉ

30%

đến từ Projection.

Phase D

Projection Relax

1.3s

Camera vẫn tiếp tục tiến.

Projection mới bắt đầu mở.

Không được mở ngay.

Projection chỉ nên bắt đầu khi camera đã đi khoảng

50~60%

quãng đường.

Phase E

Enter World

0.6s

Camera tiến vào.

Projection gần hoàn tất.

Người dùng bắt đầu cảm thấy

"Tôi đã ở bên trong."

Phase F

Settle

0.5s

Camera dừng.

Projection hoàn tất.

Không mở interaction ngay.

Giữ frame ổn định.

Sau đó

enable controls.

5. Motion Curve

Camera

easeInOutCubic

Projection

easeOutSine

Opacity UI

easeOutQuad

Không dùng

bounce
elastic
back
6. Camera Behaviour

Camera là nhân vật chính.

Không phải FOV.

Không phải Projection.

Camera cần:

distance

8

↓

7

↓

6

↓

5

↓

4

↓

3

↓

2

Tiến đều.

Không giật.

Không reset.

7. FOV

FOV chỉ dùng để

điều chỉnh cảm giác.

Không dùng để giả lập chuyển động.

Ví dụ

60°

↓

63°

↓

66°

↓

70°

↓

73°

↓

75°

Không được:

60

↓

100
8. Projection Behaviour

Projection không được

0%

↓

100%

một mạch.

Projection nên giữ

100%

trong khoảng

30%

thời gian đầu.

Sau đó

mới bắt đầu relax.

Ví dụ

100

100

100

95

90

80

70

60

50

40

30

20

10

0
9. Sphere Behaviour

Little Planet

KHÔNG được

scale.

Nếu cần

chỉ

1

↓

1.03

Tối đa

1.05

10. Intro UI

Không cần nhiều.

Tên tour

Subtitle

Button

[BẮT ĐẦU KHÁM PHÁ]

Button

hover

↓

phóng nhẹ

↓

shadow nhẹ

↓

cursor pointer

11. State Machine
Idle

↓

WaitingForUser

↓

DelayAfterClick

↓

CameraMove

↓

ProjectionRelax

↓

EnterWorld

↓

Settle

↓

Completed

Không được bỏ qua state.

12. Architecture
IntroOverlay

↓

ViewerIntroController

↓

IntroCameraAdapter

↓

CameraController

↓

ProjectionBridge

↓

PanoramaViewer

Không được để

PanoramaViewer

chứa logic Intro.

13. Runtime Responsibility
IntroOverlay

UI

Button

Fade

Không animation camera.

ViewerIntroController

Timeline.

State Machine.

Synchronization.

IntroCameraAdapter

Điều khiển camera.

Không biết UI.

ProjectionBridge

Chỉ điều khiển progress.

PanoramaViewer

Không biết Intro.

Chỉ render.

14. Forbidden

Không sửa

Builder

POI

Area

Transition

Audio

BottomNav

Gallery

Import

Export

Marker

Polygon

CSS Global

Business Logic

15. Acceptance Criteria

Animation chỉ được coi là hoàn thành nếu:

✅ Little Planet đứng yên trước khi bấm.

✅ Không tự chạy.

✅ Người dùng phải chủ động bấm.

✅ Camera là thứ chuyển động chính.

✅ Không còn cảm giác zoom.

✅ Projection chỉ mở sau khi camera đã tiến gần.

✅ Không teleport.

✅ Không reset.

✅ Không flicker.

✅ Không pop.

✅ Không jump.

✅ Không ảnh hưởng bất kỳ module nào khác.

16. Quality Target

Nếu so với video mẫu:

Mức độ giống về cảm giác (perceived motion): ≥ 90%
Mức độ giống về timeline: ≥ 95%
Không chấp nhận các giải pháp chỉ thay đổi FOV hoặc easing để "giả" chuyển động camera.cho