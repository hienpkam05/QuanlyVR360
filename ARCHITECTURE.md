# Kiến Trúc Kỹ Thuật Hệ Thống QuanlyVR360

> **Tài liệu tham chiếu:** ARCHITECTURE-SPEC-2026  
> **Mục tiêu:** Cung cấp bản thiết kế phân tầng, luồng dữ liệu máy đọc được cho kỹ sư và các tác nhân AI.

---

## 1. Sơ Đồ Kiến Trúc Phân Tầng Tổng Thể

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT / BROWSER LAYER                            │
├──────────────────────────────────────┬──────────────────────────────────────┤
│    Admin & Builder (Staff Area)      │     Public Tour Viewer (Du khách)    │
│  • Vue 3.5 (Composition API)         │  • Three.js 0.185 (WebGL 360 Engine) │
│  • Pinia Store + Vue Router 4.5      │  • Spatial Audio & Hotspot Overlay   │
│  • WYSIWYG Hotspot Raycaster Canvas  │  • Responsive Mobile / Desktop View  │
└──────────────────────────────────┬───┴──────────────────────────────────┬───┘
                                   │                                      │
                         REST API  │ Authorization: Bearer <JWT>          │ HTTP GET with Origin
                                   ▼                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND GATEWAY & ROUTER                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ • WhiteNoise Static Server (Nén Brotli/Gzip)                                │
│ • CorsMiddleware (Kiểm tra CORS_ALLOWED_ORIGINS)                            │
│ • app_api_gate_way/urls.py (Prefix: /api/)                                  │
│ • RoleBasedPermission & SimpleJWT Authentication Filter                     │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
┌───────────────┐            ┌───────────────┐            ┌───────────────┐
│ Domain Auth   │            │ Domain Tours  │            │ Domain Media  │
│  & Management │            │  & Publishing │            │  & Processing │
├───────────────┤            ├───────────────┤            ├───────────────┤
│• app_auth     │            │• app_tours    │            │• app_media    │
│• app_projects │            │• app_publishing│           │• Celery Task  │
│• app_locations│            │• app_analytics│            │  (Tối ưu hóa  │
│• app_dashboard│            │• app_public   │            │   ảnh WebP)   │
└───────┬───────┘            └───────┬───────┘            └───────┬───────┘
        │                            │                            │
        ▼                            ▼                            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PERSISTENCE & STORAGE                             │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ PostgreSQL Database                  │ Media & File Storage                 │
│ • SoftDeleteModel Cascade Tracking   │ • Render Persistent Disk / S3 / R2   │
│ • JSONField Tour Data (Scenes/Points)│ • media/scenes/originals/ (Ảnh gốc)  │
│ • B-Tree Indexes on ForeignKeys & Slugs • media/scenes/optimized/ (WebP 4K) │
│ • Celery Broker / Backend: Redis     │ • media/tours/audio/ (Thuyết minh)   │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 2. Ma Trận Trách Nhiệm Của 9 Django Apps

| Tên App | Trách nhiệm chính trong hệ thống | Models quản lý | Quan hệ phụ thuộc chính |
| :--- | :--- | :--- | :--- |
| `app_auth` | Xác thực người dùng, cấp phát và thu hồi JWT, phân quyền theo Role. | `User` | Cung cấp User context cho toàn bộ hệ thống. |
| `app_projects` | Quản lý dự án du lịch, thông tin chung, ảnh đại diện dự án. | `Project` | Phụ thuộc `app_auth.User`. |
| `app_locations` | Quản lý các điểm tham quan cụ thể thuộc dự án, tọa độ GPS, thứ tự hiển thị. | `Location` | Phụ thuộc `app_projects.Project`. |
| `app_tours` | Quản lý phiên bản tour VR360 (`draft`, `published`, `archived`), cấu trúc scenes/hotspots dạng JSON. | `TourVersion` | Phụ thuộc `app_locations.Location`. |
| `app_media` | Tiếp nhận upload ảnh panorama 360, kích hoạt Celery task tạo ảnh biến thể WebP. | `SceneAsset` | Phụ thuộc `app_tours.TourVersion`. |
| `app_publishing` | Cấu hình xuất bản public, cấp token truy cập, quản lý whitelist domain được phép nhúng iframe. | `PublishConfig`, `WhitelistDomain` | Phụ thuộc `app_locations.Location`, `app_tours.TourVersion`. |
| `app_analytics` | Ghi nhận lượt truy cập tour ẩn danh, tổng hợp báo cáo theo ngày/quốc gia/thiết bị. | `TourVisit`, `DailyStat` | Phụ thuộc `app_publishing.PublishConfig`. |
| `app_dashboard` | Cung cấp dữ liệu thống kê tổng hợp cho trang quản trị, lưu trữ nhật ký thao tác. | `ActivityLog` | Đọc dữ liệu từ tất cả các app khác. |
| `app_public` | Cung cấp API công khai cho người xem ngoài web (Public Viewer API) và WebGL Image Proxy. | Không có model riêng | Đọc dữ liệu từ `PublishConfig`, `TourVersion`, `SceneAsset`. |

---

## 3. Luồng Xử Lý WebGL Image Proxy & An Toàn CORS

1. Trình duyệt gửi request: `GET /api/public/tour/{public_token}/images/{scene_key}/{variant}/`
2. **Kiểm tra Header Whitelist:** Backend đọc `request.headers.get('Origin')` (hoặc `Referer`).
   - Nếu Origin thuộc `WhitelistDomain` có `is_active=True` của `PublishConfig` tương ứng -> Cho phép tiếp tục.
   - Nếu Origin không hợp lệ -> Trả về mã lỗi `HTTP 403 Forbidden` kèm thông điệp: `"Domain is not allowed to access this published tour."`
3. **Cấp phát ảnh kèm CORS:** Backend truyền stream file WebP với headers:
   - `Access-Control-Allow-Origin: <origin_hop_le>`
   - `Access-Control-Allow-Methods: GET, OPTIONS`
   - `Content-Type: image/webp`
