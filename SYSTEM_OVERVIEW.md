# Tổng Quan Hệ Thống Nền Tảng Quản Lý Tour Du Lịch VR360 (QuanlyVR360)

> **Mã hệ thống:** VR360-MANAGEMENT  
> **Kiến trúc:** Django Monolith Backend + Vue 3/Vite/Three.js SPA Frontend  
> **Tiêu chuẩn quản trị:** AI-Agent-Centric Management Standard v3.2 (Theo triết lý kỹ sư Lauren Tan - SpaceX / Meta / Cursor)

---

## 1. Mục Tiêu Nghiệp Vụ & Tầm Nhìn Sản Phẩm
Nền tảng **QuanlyVR360** được xây dựng nhằm cung cấp giải pháp toàn diện cho việc số hóa không gian du lịch, di tích lịch sử và danh lam thắng cảnh dưới định dạng ảnh toàn cảnh 360 độ (Equirectangular Panoramas). Hệ thống cho phép:
1. **Quản lý phân cấp dự án:** Tổ chức dữ liệu theo mô hình phân cấp chặt chẽ: `Project` (Dự án lớn, vd: Xã Ba Vì) -> `Location` (Địa điểm cụ thể, vd: Đền Thượng) -> `TourVersion` (Phiên bản tour số hóa) -> `SceneAsset` (Tài nguyên ảnh 360 độ và các điểm tương tác).
2. **Biên tập tour trực quan (WYSIWYG 3D Builder):** Cung cấp công cụ kéo thả điểm tương tác (Hotspots: điều hướng sang cảnh mới, thông tin chú thích, điểm mốc có icon riêng, thuyết minh âm thanh) trực tiếp trên quả cầu Three.js WebGL trong không gian 3 chiều.
3. **Phát hành an toàn & Chống đánh cắp tài nguyên:** Cơ chế xuất bản qua mã `public_token`, kiểm duyệt danh sách tên miền được phép nhúng (`WhitelistDomain`) thông qua header HTTP `Origin` và `Referer`, phục vụ ảnh WebP qua proxy có cấu hình CORS chuẩn.
4. **Phân tích truy cập chuyên sâu:** Thu thập thông tin truy cập của du khách (`TourVisit`, `DailyStat`) hoàn toàn ẩn danh (dùng `visitor_hash`), thống kê theo thiết bị, trình duyệt, vị trí địa lý và nguồn giới thiệu.

---

## 2. Nhóm Người Dùng & Vai Trò (User Personas)

| Vai trò | Phân quyền kỹ thuật | Phạm vi hoạt động trong hệ thống |
| :--- | :--- | :--- |
| **Superadmin (Quản trị viên)** | `is_superuser=True`, `is_staff=True` | Toàn quyền quản trị cơ sở dữ liệu, quản lý tài khoản người dùng, cấu hình máy chủ, xem toàn bộ log hệ thống (`ActivityLog`) và truy cập Django Admin. |
| **Staff (Kỹ thuật viên / Biên tập viên)** | `RoleBasedPermission` (`role="admin"` hoặc nhân viên) | Khởi tạo dự án, thêm địa điểm, tải lên ảnh panorama gốc, dựng tour trong Vr360Builder, xuất bản tour và quản lý danh sách tên miền whitelist. Không truy cập Django Admin. |
| **Public Guest (Du khách / Người xem)** | `AllowAny` (Không cần xác thực tài khoản) | Trải nghiệm tour 3D tại trang chủ, qua đường dẫn public `/vr360/:token` hoặc iframe được nhúng trên website của đối tác có trong whitelist. Hệ thống tự động ghi nhận lượt xem. |

---

## 3. Hành Trình Nghiệp Vụ Cốt Lõi (End-to-End User Journey)

1. Đăng nhập JWT (`POST /api/auth/login/`)
2. Tạo Project (`POST /api/projects/`)
3. Tạo Location trong Project (`POST /api/projects/{id}/locations/`)
4. Khởi tạo TourVersion draft (`POST /api/locations/{id}/versions/`)
5. Tải lên ảnh Panorama gốc (`POST /api/media/scenes/upload/`) -> Celery tạo ảnh WebP.
6. Dựng Hotspot trong Builder (`PATCH /api/locations/{id}/versions/{id}/`)
7. Xuất bản Tour (`POST /api/locations/{id}/publish/`) -> Sinh public_token.
8. Thêm tên miền Whitelist (`POST /api/locations/{id}/publish/domains/`)
9. Người xem trải nghiệm qua Web/Iframe với WebGL Image Proxy bảo vệ CORS.

---

## 4. Các Bất Biến Kiến Trúc Bắt Buộc (Architectural Invariants)

1. **Bất biến phiên bản xuất bản (Immutability of Published Versions):** Version `published` tuyệt đối không được sửa.
2. **Bất biến xóa mềm (Soft-Delete Cascade Invariant):** Không xóa cứng database, dùng `SoftDeleteModel.delete()`.
3. **Bất biến dọn dẹp bộ nhớ WebGL (Three.js Memory Invariant):** Mọi tài nguyên Three.js phải gọi `.dispose()` trong `onUnmounted`.
4. **Bất biến Chân lý Duy nhất (SSOT Invariant):** Không hardcode URL/routes, dùng thư mục `configs/ssot/`.
