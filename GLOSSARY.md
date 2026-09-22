# Từ Điển Thuật Ngữ Nghiệp Vụ & Danh Pháp (GLOSSARY.md)

> Chuẩn hóa định nghĩa các thực thể và quy ước danh pháp cho toàn bộ hệ thống QuanlyVR360. Bắt buộc mọi AI Agent và kỹ sư phải tuân thủ nghiêm ngặt.

---

## 1. Bảng Định Nghĩa Thực Thể Cốt Lõi

| Thuật ngữ | Tên Tiếng Anh | Định nghĩa kỹ thuật trong hệ thống | Bảng cơ sở dữ liệu |
| :--- | :--- | :--- | :--- |
| **Dự án** | `Project` | Đơn vị quản trị cấp cao nhất, đại diện cho một khu vực, xã hoặc dự án du lịch tổng thể (vd: Dự án VR360 Huyện Ba Vì). Chứa nhiều Location. | `app_projects_project` |
| **Địa điểm** | `Location` | Một địa danh, điểm tham quan cụ thể nằm trong Dự án (vd: Đền Thượng, Rừng Quốc Gia). Có tọa độ địa lý (`latitude`, `longitude`) và thứ tự sắp xếp (`order`). | `app_locations_location` |
| **Phiên bản Tour** | `TourVersion` | Một bản dựng tour VR360 của một Location. Có số phiên bản tự tăng (`version_number`) và trạng thái (`draft`, `published`, `archived`). Chứa toàn bộ cấu trúc scenes và hotspots dưới trường JSON `data`. | `app_tours_tourversion` |
| **Tài nguyên Cảnh** | `SceneAsset` | Tệp ảnh panorama thực tế liên kết với một `scene_key` trong `TourVersion.data`. Quản lý đường dẫn của 4 biến thể ảnh: `original_file`, `optimized_file`, `preview_file`, `thumbnail_file`. | `app_media_sceneasset` |
| **Điểm tương tác** | `Hotspot` | Một điểm đánh dấu tọa độ cầu (`lon`: kinh độ -180 đến 180, `lat`: vĩ độ -90 đến 90) đặt trên bề mặt quả cầu 360 độ để người dùng click tương tác. | Lưu trong JSON `TourVersion.data` |
| **Cấu hình Xuất bản** | `PublishConfig` | Thiết lập cho phép xem tour công khai của một Location. Quản lý mã định danh công khai `public_token` (chuỗi ngẫu nhiên 64 ký tự) và phiên bản đang phát hành (`published_version`). | `app_publishing_publishconfig` |
| **Tên miền Cho phép** | `WhitelistDomain` | Danh sách các hostname/domain (vd: `dulichbavi.vn`, `localhost:5174`) được phép nhúng và tải dữ liệu tour public. | `app_publishing_whitelistdomain` |
| **Lượt truy cập Tour** | `TourVisit` | Bản ghi một lần xem tour công khai, lưu mã băm ẩn danh `visitor_hash`, thiết bị, trình duyệt, hệ điều hành và quốc gia. | `app_analytics_tourvisit` |
| **Thống kê Ngày** | `DailyStat` | Bảng tổng hợp số liệu truy cập theo từng ngày của một PublishConfig, lưu trữ phân rã theo quốc gia, thiết bị và referrer dưới dạng JSON. | `app_analytics_dailystat` |

---

## 2. Phân Loại Điểm Tương Tác (Hotspot Types)

1. **`nav` (Navigation Hotspot):** Chuyển đổi cảnh panorama. Bắt buộc có `target_scene_id`.
2. **`info` (Information Hotspot):** Hiển thị popup thông tin, hình ảnh (`title`, `description`, `image_url`).
3. **`point` (Landmark / Audio Hotspot):** Điểm mốc nổi bật kèm icon riêng (`hotspot_point_logo`) và thuyết minh âm thanh (`audio_url`).

---

## 3. Danh Mục Từ Ngữ Cấm Dùng (Forbidden Terms)

| Từ Cấm Dùng | Lý Do Cấm | Thuật Ngữ Thay Thế Bắt Buộc |
| :--- | :--- | :--- |
| **Tile / Tile Base Path** | Hệ thống đã loại bỏ cơ chế chia nhỏ mảnh ảnh tile, chuyển sang nạp WebP trực tiếp. | **Optimized WebP Panorama** |
| **Hard Delete** | Gây mất toàn vẹn dữ liệu và hỏng liên kết thống kê lịch sử. | **Soft Delete (`is_deleted=True`)** |
| **CMS Tina** | Tên của dự án cũ trong tài liệu tiền thân. | **QuanlyVR360** |
