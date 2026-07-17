# Tài liệu Models — VR360 Management

Tài liệu này giải thích các model hiện có trong dự án, ý nghĩa từng thuộc tính, quan hệ giữa các bảng và các quy tắc dữ liệu quan trọng.

## 1. Sơ đồ quan hệ tổng quát

```text
User
├── Project.created_by
├── TourVersion.created_by
├── PublishConfig.published_by
└── ActivityLog.actor

Project
└── Location
    ├── TourVersion
    │   └── SceneAsset
    └── PublishConfig
        ├── WhitelistDomain
        ├── TourVisit
        └── DailyStat
```

## Cơ chế xóa mềm dùng chung

Tất cả model nghiệp vụ kế thừa `backend.models.SoftDeleteModel`. Ứng dụng không xóa vật lý bản ghi khi gọi `delete()`.

| Thuộc tính dùng chung | Kiểu | Giải thích |
|---|---|---|
| `is_deleted` | BooleanField | Đánh dấu bản ghi đã xóa mềm. Mặc định `False`, có database index và không sửa trực tiếp qua form. |
| `deleted_at` | DateTimeField | Thời điểm xóa mềm; bằng `NULL` khi bản ghi còn hoạt động. |

Cách truy vấn:

- `Model.objects.all()`: chỉ trả về bản ghi chưa xóa.
- `Model.all_objects.all()`: trả về cả bản ghi hoạt động và đã xóa.
- `Model.all_objects.deleted()`: chỉ trả về bản ghi đã xóa.
- `instance.delete()`: đặt `is_deleted=True` và ghi `deleted_at`, không chạy lệnh SQL `DELETE`.
- `queryset.delete()`: gọi soft delete cho từng bản ghi, không xóa hàng khỏi database.
- `instance.restore()`: khôi phục một bản ghi bằng cách đặt `is_deleted=False` và `deleted_at=NULL`.

Soft-cascade đang được áp dụng theo chuỗi:

```text
Project → Location → TourVersion → SceneAsset
                   └→ PublishConfig → WhitelistDomain, TourVisit, DailyStat
```

Khi xóa mềm đối tượng cha, các đối tượng con đang hoạt động cũng được xóa mềm. `restore()` chỉ khôi phục đúng bản ghi được gọi; hệ thống không tự khôi phục toàn bộ cây con nhằm tránh phục hồi nhầm dữ liệu đã bị xóa độc lập trước đó.

Các khai báo `on_delete=CASCADE/SET_NULL` trên ForeignKey chỉ là lớp bảo vệ toàn vẹn ở cấp database nếu có thao tác xóa vật lý ngoài ứng dụng. Luồng Django thông thường luôn sử dụng soft delete.

Các model không khai báo khóa chính riêng nên Django tự tạo trường `id` kiểu số nguyên tăng tự động.

## 2. `app_projects.Project`

Đại diện cho một dự án VR360 cấp cao nhất. Một dự án có thể chứa nhiều địa điểm.

Tên bảng mặc định: `app_projects_project`.

| Thuộc tính | Kiểu | Bắt buộc | Giải thích |
|---|---|---:|---|
| `id` | AutoField | Có | Khóa chính do Django tự tạo. |
| `name` | CharField(255) | Có | Tên dự án hiển thị cho người quản trị. |
| `slug` | SlugField(275) | Tự sinh | Chuỗi thân thiện URL. Duy nhất giữa các project chưa xóa. |
| `description` | TextField | Không | Mô tả chi tiết về dự án. |
| `thumbnail` | ImageField | Không | Ảnh đại diện, lưu dưới `media/projects/thumbnails/`. |
| `created_by` | ForeignKey(User) | Không | Người tạo dự án, chỉ dùng audit. User bị xóa thì trường này thành `NULL`. |
| `is_active` | BooleanField | Có | Cho biết dự án đang hoạt động hay đã bị ẩn/ngừng sử dụng. Mặc định `True`. |
| `created_at` | DateTimeField | Tự động | Thời điểm tạo bản ghi. |
| `updated_at` | DateTimeField | Tự động | Thời điểm cập nhật gần nhất. |

Quan hệ ngược:

- `project.locations.all()`: lấy các địa điểm chưa xóa thuộc dự án.
- `user.created_projects.all()`: lấy các dự án do một user tạo.

Quy tắc và hành vi:

- Dữ liệu mặc định được sắp xếp theo `created_at` giảm dần.
- Có index trên `is_active` để tối ưu truy vấn dự án đang hoạt động.
- Constraint `unique_active_project_slug` bảo đảm không trùng slug giữa các project chưa xóa.
- Nếu không truyền `slug`, phương thức `save()` tạo slug từ `name`.
- Nếu slug đã tồn tại, hệ thống tự thêm hậu tố `-2`, `-3`, ...
- Nếu tên không thể chuyển thành slug, giá trị cơ sở là `project`.

## 3. `app_locations.Location`

Đại diện cho một địa điểm nằm trong dự án, ví dụ một di tích, khu du lịch hoặc điểm tham quan.

Tên bảng mặc định: `app_locations_location`.

| Thuộc tính | Kiểu | Bắt buộc | Giải thích |
|---|---|---:|---|
| `id` | AutoField | Có | Khóa chính. |
| `project` | ForeignKey(Project) | Có | Dự án sở hữu địa điểm. Xóa mềm dự án sẽ soft-cascade các địa điểm bên trong. |
| `name` | CharField(255) | Có | Tên địa điểm. |
| `slug` | SlugField(275) | Tự sinh | Slug của địa điểm, chỉ cần duy nhất trong cùng một project. |
| `description` | TextField | Không | Nội dung giới thiệu địa điểm. |
| `thumbnail` | ImageField | Không | Ảnh đại diện, lưu dưới `media/locations/thumbnails/`. |
| `latitude` | DecimalField(9,6) | Không | Vĩ độ, chỉ nhận giá trị từ `-90` đến `90`. |
| `longitude` | DecimalField(9,6) | Không | Kinh độ, chỉ nhận giá trị từ `-180` đến `180`. |
| `order` | PositiveIntegerField | Có | Thứ tự hiển thị và drag-drop. Mặc định `0`. |
| `is_active` | BooleanField | Có | Trạng thái hoạt động của địa điểm. Mặc định `True`. |
| `created_at` | DateTimeField | Tự động | Thời điểm tạo. |
| `updated_at` | DateTimeField | Tự động | Thời điểm cập nhật gần nhất. |

Quan hệ ngược:

- `location.versions.all()`: các phiên bản tour của địa điểm.
- `location.publish_configs.all()`: các cấu hình public chưa xóa của địa điểm; constraint bảo đảm tối đa một cấu hình đang hoạt động.

Constraint và index:

- `unique_active_location_slug_per_project`: không cho phép hai location chưa xóa trong cùng project có cùng slug.
- Index `project + is_active`: tối ưu danh sách địa điểm hoạt động theo dự án.
- Thứ tự mặc định là `order`, sau đó đến `created_at`.

Slug được tự sinh tương tự `Project`, nhưng việc kiểm tra trùng chỉ diễn ra trong phạm vi project hiện tại.

## 4. `app_tours.TourVersion`

Đại diện cho một lần tạo hoặc chỉnh sửa nội dung VR360 của một địa điểm. Một location có thể có nhiều version để hỗ trợ lịch sử, preview, publish và rollback.

Tên bảng mặc định: `app_tours_tourversion`.

### Trạng thái

| Giá trị | Ý nghĩa |
|---|---|
| `draft` | Bản nháp, còn được phép chỉnh sửa. |
| `published` | Phiên bản đã hoặc đang được xuất bản. |
| `archived` | Phiên bản đã lưu trữ, không dùng để chỉnh sửa trực tiếp. |

### Thuộc tính

| Thuộc tính | Kiểu | Bắt buộc | Giải thích |
|---|---|---:|---|
| `id` | AutoField | Có | Khóa chính. |
| `location` | ForeignKey(Location) | Có | Địa điểm sở hữu version. Xóa mềm location sẽ soft-cascade các version. |
| `version_number` | PositiveIntegerField | Tự sinh | Số thứ tự version trong phạm vi location; không cho sửa trực tiếp. |
| `label` | CharField(100) | Không | Nhãn dễ đọc, ví dụ `Bản cập nhật tháng 7`. |
| `data` | JSONField | Có | Toàn bộ cấu trúc tour như scenes, hotspots và initial view. |
| `thumbnail` | ImageField | Không | Ảnh đại diện version, lưu tại `media/tours/thumbnails/`. |
| `status` | CharField(20) | Có | Trạng thái version. Mặc định `draft`. |
| `changelog` | TextField | Không | Nội dung mô tả những thay đổi của version. |
| `created_by` | ForeignKey(User) | Không | Người tạo version. User bị xóa thì trường thành `NULL`. |
| `created_at` | DateTimeField | Tự động | Thời điểm tạo. |
| `updated_at` | DateTimeField | Tự động | Thời điểm chỉnh sửa gần nhất. |

### Validation trường `data`

Hàm `validate_tour_data` đảm bảo:

- Giá trị gốc phải là JSON object.
- Phải có thuộc tính `scenes` kiểu danh sách.
- Mỗi phần tử trong `scenes` phải là object và có `id`.
- Không được có hai scene trùng `id` trong cùng một version.

Ví dụ tối thiểu hợp lệ:

```json
{
  "scenes": [
    {"id": "scene-entrance", "title": "Cổng chính"}
  ]
}
```

Constraint và index:

- `unique_tour_version_per_location`: một location không thể có hai bản ghi cùng `version_number`.
- Index `location + status`: tối ưu truy vấn version theo địa điểm và trạng thái.
- Sắp xếp mặc định theo `version_number` giảm dần.

Khi tạo version mới, hệ thống khóa bản ghi Location trong transaction bằng `select_for_update()`, lấy số version lớn nhất rồi cộng `1`. Cách này hạn chế việc hai request đồng thời sinh cùng số version.

## 5. `app_media.SceneAsset`

Đại diện cho ảnh panorama thật của một scene và trạng thái tile hóa ảnh. `scene_key` liên kết logic với `id` của scene nằm trong `TourVersion.data`.

Tên bảng mặc định: `app_media_sceneasset`.

### Trạng thái xử lý

| Giá trị | Ý nghĩa |
|---|---|
| `pending` | Đã upload nhưng chưa bắt đầu xử lý. |
| `processing` | Worker đang tạo tile. |
| `done` | Xử lý hoàn tất. |
| `failed` | Xử lý thất bại; xem `error_message`. |

### Thuộc tính

| Thuộc tính | Kiểu | Bắt buộc | Giải thích |
|---|---|---:|---|
| `id` | AutoField | Có | Khóa chính. |
| `tour_version` | ForeignKey(TourVersion) | Có | Version chứa scene. Xóa mềm version sẽ soft-cascade metadata scene. |
| `scene_key` | CharField(100) | Có | ID ổn định của scene, khớp với scene trong JSON. |
| `original_file` | ImageField | Có | File panorama gốc, lưu tại `media/scenes/originals/`. |
| `original_width` | PositiveIntegerField | Không | Chiều rộng ảnh gốc theo pixel. |
| `original_height` | PositiveIntegerField | Không | Chiều cao ảnh gốc theo pixel. |
| `file_size` | PositiveBigIntegerField | Không | Kích thước file tính theo byte. |
| `checksum_sha256` | CharField(64) | Không | Mã SHA-256 để kiểm tra trùng hoặc tính toàn vẹn file. Có index. |
| `mime_type` | CharField(100) | Không | Loại nội dung, ví dụ `image/jpeg`. |
| `tile_base_path` | CharField(500) | Không | Thư mục gốc chứa tile đã sinh. |
| `max_zoom_level` | PositiveSmallIntegerField | Có | Cấp zoom lớn nhất. Mặc định `3`. |
| `tile_size` | PositiveSmallIntegerField | Có | Kích thước cạnh của mỗi tile. Mặc định `512` pixel. |
| `processing_status` | CharField(20) | Có | Trạng thái xử lý hiện tại. Mặc định `pending`. |
| `celery_task_id` | CharField(255) | Không | ID task Celery đang hoặc đã xử lý ảnh. Có index. |
| `retry_count` | PositiveSmallIntegerField | Có | Số lần worker thử xử lý lại. Mặc định `0`. |
| `error_message` | TextField | Không | Chi tiết lỗi gần nhất nếu xử lý thất bại. |
| `created_at` | DateTimeField | Tự động | Thời điểm tạo asset. |
| `processing_started_at` | DateTimeField | Không | Thời điểm bắt đầu xử lý. |
| `processed_at` | DateTimeField | Không | Thời điểm xử lý hoàn tất hoặc kết thúc. |
| `updated_at` | DateTimeField | Tự động | Thời điểm cập nhật gần nhất. |

Constraint `unique_active_scene_key_per_tour_version` bảo đảm mỗi `scene_key` chỉ xuất hiện một lần trong các asset chưa xóa của một tour version.

## 6. `app_publishing.PublishConfig`

Quản lý link public cố định của một location. Mỗi location chỉ có tối đa một PublishConfig chưa xóa, nhưng `published_version` có thể đổi để update hoặc rollback.

Tên bảng mặc định: `app_publishing_publishconfig`.

| Thuộc tính | Kiểu | Bắt buộc | Giải thích |
|---|---|---:|---|
| `id` | AutoField | Có | Khóa chính. |
| `location` | ForeignKey(Location) | Có | Location được public. Constraint có điều kiện giới hạn một cấu hình chưa xóa cho mỗi location. |
| `public_token` | CharField(64) | Tự sinh | Token duy nhất dùng trong URL public; không chỉnh trực tiếp. |
| `published_version` | ForeignKey(TourVersion) | Không | Version đang được public. Soft delete bị chặn ở validation publish; `SET_NULL` chỉ áp dụng nếu version bị xóa vật lý ngoài ứng dụng. |
| `is_active` | BooleanField | Có | Cho phép hoặc ngừng truy cập public. Mặc định `False`. |
| `published_at` | DateTimeField | Không/Tự động | Lần đầu cấu hình được kích hoạt với một version. |
| `published_by` | ForeignKey(User) | Không | Người thực hiện publish. User bị xóa thì trường thành `NULL`. |
| `updated_at` | DateTimeField | Tự động | Thời điểm cập nhật cấu hình gần nhất. |

Quy tắc nghiệp vụ trong `clean()` và `save()`:

- `is_active=True` bắt buộc phải có `published_version`.
- Version được chọn phải thuộc đúng `location` của PublishConfig.
- Không thể publish một TourVersion đã bị xóa mềm.
- Token được sinh bằng `secrets.token_urlsafe(24)` và kiểm tra không trùng.
- Khi kích hoạt lần đầu, `published_at` được đặt bằng thời gian hiện tại.
- `save()` luôn gọi `full_clean()` trước khi ghi database.

Phương thức hỗ trợ:

- `regenerate_token()`: thu hồi token hiện tại và sinh token mới.
- `public_url(base_url)`: ghép base URL với token thành `/vr360/{token}/`.

Quan hệ ngược:

- `publish_config.whitelist_domains.all()`
- `publish_config.visits.all()`
- `publish_config.daily_stats.all()`

## 7. `app_publishing.WhitelistDomain`

Danh sách domain được phép nhúng hoặc truy cập tour public của một PublishConfig.

Tên bảng mặc định: `app_publishing_whitelistdomain`.

| Thuộc tính | Kiểu | Bắt buộc | Giải thích |
|---|---|---:|---|
| `id` | AutoField | Có | Khóa chính. |
| `publish_config` | ForeignKey(PublishConfig) | Có | Cấu hình publish sở hữu whitelist. |
| `domain` | CharField(255) | Có | Hostname được cho phép, có thể kèm port. |
| `label` | CharField(100) | Không | Ghi chú dễ đọc cho quản trị viên. |
| `is_active` | BooleanField | Có | Bật hoặc tắt domain mà không cần xóa. Mặc định `True`. |
| `created_at` | DateTimeField | Tự động | Thời điểm thêm domain. |

Chuẩn hóa domain:

- Loại bỏ khoảng trắng và chuyển về chữ thường.
- Loại bỏ protocol như `https://`.
- Chuyển domain Unicode sang IDNA/Punycode khi cần.
- Giữ lại port nếu người dùng khai báo.
- Không chấp nhận path, query string hoặc fragment.
- `save()` gọi `full_clean()` trước khi lưu.

Constraint `unique_active_domain_per_publish_config` không cho phép trùng domain giữa các bản ghi chưa xóa trong cùng một PublishConfig.

## 8. `app_analytics.TourVisit`

Lưu log chi tiết từng lượt truy cập tour public. Đây là dữ liệu nguồn để tính thống kê theo ngày.

Tên bảng mặc định: `app_analytics_tourvisit`.

### Loại thiết bị

- `mobile`: điện thoại.
- `tablet`: máy tính bảng.
- `desktop`: máy tính để bàn/laptop.
- `other`: thiết bị chưa xác định.

### Thuộc tính

| Thuộc tính | Kiểu | Bắt buộc | Giải thích |
|---|---|---:|---|
| `id` | AutoField | Có | Khóa chính. |
| `publish_config` | ForeignKey(PublishConfig) | Có | Tour public nhận lượt truy cập. |
| `visitor_hash` | CharField(64) | Có | Hash định danh visitor mà không lưu IP thô. Có index. |
| `country_code` | CharField(2) | Không | Mã quốc gia ISO hai ký tự, ví dụ `VN`. |
| `city` | CharField(100) | Không | Thành phố được suy ra từ IP/GeoIP. |
| `device_type` | CharField(10) | Có | Nhóm thiết bị; mặc định `other`. |
| `browser` | CharField(50) | Không | Trình duyệt đã chuẩn hóa. |
| `os` | CharField(50) | Không | Hệ điều hành đã chuẩn hóa. |
| `referrer_domain` | CharField(255) | Không | Domain giới thiệu người dùng đến tour. |
| `visited_at` | DateTimeField | Tự động | Thời điểm truy cập. Có index. |

Các index kết hợp hỗ trợ truy vấn thống kê theo:

- PublishConfig và thời gian.
- PublishConfig và quốc gia.
- PublishConfig và thiết bị.
- PublishConfig và referrer.

Khi xóa mềm PublishConfig, toàn bộ visit đang hoạt động liên quan cũng được xóa mềm.

## 9. `app_analytics.DailyStat`

Bảng tổng hợp thống kê theo ngày để dashboard không phải quét toàn bộ TourVisit ở mỗi request.

Tên bảng mặc định: `app_analytics_dailystat`.

| Thuộc tính | Kiểu | Bắt buộc | Giải thích |
|---|---|---:|---|
| `id` | AutoField | Có | Khóa chính. |
| `publish_config` | ForeignKey(PublishConfig) | Có | Tour public được thống kê. |
| `date` | DateField | Có | Ngày thống kê theo timezone dự án. |
| `total_visits` | PositiveIntegerField | Có | Tổng số lượt truy cập trong ngày. |
| `unique_visitors` | PositiveIntegerField | Có | Số visitor duy nhất trong ngày. |
| `country_breakdown` | JSONField | Có | Thống kê theo quốc gia, ví dụ `{"VN": 120}`. |
| `device_breakdown` | JSONField | Có | Thống kê theo thiết bị, ví dụ `{"mobile": 80}`. |
| `referrer_breakdown` | JSONField | Có | Thống kê theo domain giới thiệu. |

Constraint `unique_active_daily_stat_per_publish_config` bảo đảm một PublishConfig chỉ có một bản tổng hợp chưa xóa cho mỗi ngày. Dữ liệu mặc định sắp xếp theo ngày giảm dần.

## 10. `app_dashboard.ActivityLog`

Lưu hoạt động nghiệp vụ gần đây để phục vụ dashboard và audit nhẹ, ví dụ tạo version, publish, rollback hoặc thay đổi project.

Tên bảng mặc định: `app_dashboard_activitylog`.

| Thuộc tính | Kiểu | Bắt buộc | Giải thích |
|---|---|---:|---|
| `id` | AutoField | Có | Khóa chính. |
| `actor` | ForeignKey(User) | Không | Người thực hiện hành động. User bị xóa thì giữ log và đặt actor thành `NULL`. |
| `action` | CharField(100) | Có | Mã hành động, ví dụ `tour.created` hoặc `location.published`. |
| `entity_type` | CharField(100) | Có | Loại đối tượng bị tác động, ví dụ `TourVersion`. |
| `entity_id` | CharField(100) | Có | ID đối tượng dưới dạng chuỗi, hỗ trợ cả integer và UUID. |
| `description` | CharField(500) | Không | Nội dung mô tả dễ đọc. |
| `metadata` | JSONField | Có | Dữ liệu mở rộng tùy hành động. Mặc định `{}`. |
| `created_at` | DateTimeField | Tự động | Thời điểm ghi nhận hoạt động. Có index. |

Model có index kết hợp `entity_type + entity_id` để tìm lịch sử của một đối tượng. Dữ liệu mặc định sắp xếp mới nhất trước.

## 11. Các app không có model riêng

### `app_auth`

Hiện sử dụng `django.contrib.auth` và model `auth.User` mặc định của Django. App này chịu trách nhiệm cho login, refresh token, logout, thông tin user và đổi mật khẩu; chưa định nghĩa user model tùy chỉnh.

### `app_public`

Không lưu bảng riêng. App đọc dữ liệu từ `PublishConfig`, `TourVersion`, `SceneAsset` và ghi lượt truy cập thông qua `TourVisit`.

### `app_api_gate_way`

Chỉ là tầng tổng hợp URL, không phải domain dữ liệu và không có model.

## 12. Lưu ý khi làm việc với model

- Thay đổi field, constraint hoặc index phải chạy `python manage.py makemigrations` và `python manage.py migrate`.
- Validation trong `clean()` không tự chạy khi dùng `QuerySet.update()` hoặc `bulk_create()`.
- Không dùng `QuerySet.update(is_deleted=True)` thay cho `delete()`, vì cách đó bỏ qua soft-cascade và không tự ghi `deleted_at`.
- Dùng manager `all_objects` khi xây dựng màn hình thùng rác hoặc chức năng khôi phục.
- `ImageField` lưu đường dẫn trong database; file thật nằm trong `MEDIA_ROOT` hoặc storage được cấu hình.
- Soft delete giữ nguyên file của `ImageField` để có thể khôi phục. Nếu cần xóa vĩnh viễn sau thời hạn lưu trữ, phải có tác vụ dọn file và dữ liệu riêng.
- Các trường audit như `created_by` và `published_by` nên được gán từ `request.user` ở view/service, không nhận trực tiếp từ client.
- Trạng thái publish, archive và xử lý scene nên thay đổi qua service nghiệp vụ để đảm bảo nhiều bảng luôn nhất quán.
