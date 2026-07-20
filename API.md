# API Documentation — VR360 Management

Tai lieu nay mo ta cac API backend hien co cua du an VR360.

Base URL local:

```text
http://127.0.0.1:8000
```

Frontend local thuong chay tai:

```text
http://127.0.0.1:5174
```

## 1. Quy tac chung

### Authentication

Phan lon API noi bo can JWT access token:

```http
Authorization: Bearer <access_token>
```

Lay token bang:

```http
POST /api/auth/login/
```

### Permission hien tai

He thong dung `app_auth.permissions.RoleBasedPermission`.

- Admin Django/superuser: toan quyen, vao duoc Django Admin.
- Nhan vien cong ty co tai khoan dang nhap: duoc dung cac API noi bo, khong can vao Django Admin.
- Khach/guest: chi nen dung giao dien public/home/viewer public; cac API public co `AllowAny`.

### Pagination

API list dung pagination mac dinh:

```text
?page=1&page_size=20
```

Response dang:

```json
{
  "count": 100,
  "next": "http://...",
  "previous": null,
  "results": []
}
```

### Filter/search/ordering

Nhieu endpoint list ho tro:

```text
?search=abc
?ordering=-created_at
```

Va cac filter rieng theo tung phan ben duoi.

### API schema/docs

| Method | Endpoint | Quyen | Muc dich |
|---|---|---|---|
| GET | `/api/schema/` | Noi bo | OpenAPI schema |
| GET | `/api/docs/` | Noi bo | Swagger UI |

---

# 2. Auth API

Prefix:

```text
/api/auth/
```

## POST `/api/auth/login/`

Dang nhap bang username/password Django, tra JWT access + refresh.

Quyen: public.

Body:

```json
{
  "username": "admin",
  "password": "123456"
}
```

Response:

```json
{
  "access": "jwt_access_token",
  "refresh": "jwt_refresh_token",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "",
    "first_name": "",
    "last_name": "",
    "is_staff": true,
    "is_superuser": true,
    "role": "admin"
  }
}
```

## POST `/api/auth/refresh/`

Lam moi access token.

Quyen: public.

Body:

```json
{
  "refresh": "jwt_refresh_token"
}
```

Response:

```json
{
  "access": "new_access_token"
}
```

## POST `/api/auth/logout/`

Blacklist refresh token.

Quyen: dang nhap.

Body:

```json
{
  "refresh": "jwt_refresh_token"
}
```

Response: `205 Reset Content`.

## GET `/api/auth/me/`

Lay thong tin user hien tai.

Quyen: dang nhap.

Response:

```json
{
  "id": 1,
  "username": "admin",
  "email": "",
  "first_name": "",
  "last_name": "",
  "is_staff": true,
  "is_superuser": true,
  "role": "admin"
}
```

## POST `/api/auth/change-password/`

Doi mat khau user dang dang nhap.

Quyen: dang nhap.

Body:

```json
{
  "old_password": "old_password",
  "new_password": "new_password",
  "confirm_password": "new_password"
}
```

---

# 3. Projects API

Prefix:

```text
/api/projects/
```

## GET `/api/projects/`

Lay danh sach project.

Quyen: dang nhap.

Query ho tro:

```text
search
name
slug
is_active
created_by
created_after
created_before
ordering=name,-created_at,updated_at
page
page_size
```

Response item:

```json
{
  "id": 1,
  "name": "Xa Ba Vi",
  "slug": "xa-ba-vi",
  "description": "Mo ta",
  "thumbnail": "/media/projects/thumbnails/a.jpg",
  "created_by": 2,
  "created_by_name": "nhanvien_1",
  "locations_count": 3,
  "is_active": true,
  "created_at": "2026-07-19T10:00:00+07:00",
  "updated_at": "2026-07-19T10:00:00+07:00"
}
```

## POST `/api/projects/`

Tao project moi.

Quyen: dang nhap.

Body:

```json
{
  "name": "Xa Ba Vi",
  "description": "Mo ta project",
  "is_active": true
}
```

## GET `/api/projects/{id}/`

Lay chi tiet project.

## PATCH `/api/projects/{id}/`

Cap nhat project.

Body:

```json
{
  "name": "Ten moi",
  "description": "Mo ta moi",
  "is_active": true
}
```

## DELETE `/api/projects/{id}/`

Xoa mem project. Location, version, publish config lien quan cung bi soft-cascade.

## POST `/api/projects/{id}/upload-thumbnail/`

Upload thumbnail project.

Content-Type: `multipart/form-data`

Body:

```text
thumbnail=<image_file>
```

## GET `/api/projects/{id}/dashboard/`

Dashboard nho trong pham vi mot project.

Response gom:

- `project`
- `statistics`
- `recent_locations`

---

# 4. Locations API

## GET `/api/projects/{project_id}/locations/`

List locations trong mot project.

Quyen: dang nhap.

Query ho tro:

```text
search
project
project_slug
name
slug
is_active
has_coordinates
order_min
order_max
created_after
created_before
ordering=order,name,-created_at,updated_at
page
page_size
```

Response item:

```json
{
  "id": 1,
  "project": 1,
  "project_name": "Xa Ba Vi",
  "name": "Den Thuong",
  "slug": "den-thuong",
  "description": "Mo ta",
  "thumbnail": "/media/locations/thumbnails/a.jpg",
  "latitude": "21.000000",
  "longitude": "105.000000",
  "order": 0,
  "is_active": true,
  "versions_count": 2,
  "created_at": "2026-07-19T10:00:00+07:00",
  "updated_at": "2026-07-19T10:00:00+07:00"
}
```

## POST `/api/projects/{project_id}/locations/`

Tao location trong project.

Body:

```json
{
  "name": "Den Thuong",
  "description": "Mo ta dia diem",
  "latitude": "21.000000",
  "longitude": "105.000000",
  "order": 1,
  "is_active": true
}
```

## PATCH `/api/projects/{project_id}/locations/reorder/`

Cap nhat thu tu hien thi location trong project.

Body bat buoc gom tat ca location active trong project:

```json
{
  "locations": [
    { "id": 1, "order": 0 },
    { "id": 2, "order": 1 }
  ]
}
```

## GET `/api/locations/{id}/`

Chi tiet location.

## PATCH `/api/locations/{id}/`

Cap nhat location.

## DELETE `/api/locations/{id}/`

Xoa mem location. Version va publish config lien quan cung bi xoa mem.

## POST `/api/locations/{id}/upload-thumbnail/`

Upload thumbnail location.

Content-Type: `multipart/form-data`

Body:

```text
thumbnail=<image_file>
```

---

# 5. Tour Versions API

Prefix:

```text
/api/locations/{location_id}/versions/
```

## GET `/api/locations/{location_id}/versions/`

List version cua location.

Quyen: dang nhap.

Query ho tro:

```text
search
location
location_slug
project
project_slug
status=draft|published|archived
version_number
version_min
version_max
created_by
created_after
created_before
ordering=-version_number,created_at,updated_at
page
page_size
```

Response item:

```json
{
  "id": 3,
  "location": 2,
  "version_number": 1,
  "label": "v1",
  "thumbnail": null,
  "background_audio": "/media/tours/audio/music.mp3",
  "hotspot_point_logo": "/media/tours/hotspot_logos/logo.png",
  "status": "draft",
  "changelog": "Created from Builder.",
  "created_by": 2,
  "created_by_name": "nhanvien_1",
  "scene_assets_count": 2,
  "created_at": "2026-07-19T10:00:00+07:00",
  "updated_at": "2026-07-19T10:00:00+07:00"
}
```

## POST `/api/locations/{location_id}/versions/`

Tao version moi.

Quyen: dang nhap.

Co the gui JSON:

```json
{
  "label": "v1",
  "changelog": "Created from Builder.",
  "data": {
    "title": "Tour",
    "scenes": []
  }
}
```

Hoac `multipart/form-data` neu co upload audio/logo:

```text
label=v1
changelog=Created from Builder.
data={"title":"Tour","scenes":[]}
background_audio=<audio_file>
hotspot_point_logo=<image_file>
```

Luu y:

- `version_number` tu sinh.
- `status` mac dinh `draft`.

## GET `/api/locations/{location_id}/versions/{version_id}/`

Chi tiet version, gom ca field `data`.

## PATCH `/api/locations/{location_id}/versions/{version_id}/`

Cap nhat version.

Quyen: dang nhap.

Luu y:

- `published` version khong duoc edit.
- `archived` van co the edit theo logic hien tai.
- Co the gui JSON hoac multipart.

Body JSON:

```json
{
  "label": "v2",
  "changelog": "Sua scene",
  "data": {
    "title": "Tour",
    "scenes": [
      {
        "id": "scene-1",
        "name": "San",
        "image_url": "/media/scenes/originals/a.jpg",
        "view": { "lon": 0, "lat": 0, "fov": 75 },
        "hotspots": []
      }
    ]
  }
}
```

## DELETE `/api/locations/{location_id}/versions/{version_id}/`

Xoa mem version.

Chi xoa duoc version `draft`.

## GET `/api/locations/{location_id}/versions/{version_id}/export/`

Export JSON tour.

Response:

```json
{
  "label": "v1",
  "changelog": "",
  "data": {
    "title": "Tour",
    "scenes": []
  }
}
```

## GET `/api/locations/{location_id}/versions/{version_id}/preview/`

Lay data day du de preview/editor, co resolve thong tin tile/processing status.

Response:

```json
{
  "version": {},
  "data": {
    "scenes": []
  }
}
```

## POST `/api/locations/{location_id}/versions/import/`

Import JSON thanh version moi.

Body:

```json
{
  "label": "Imported tour",
  "changelog": "Import from file",
  "data": {
    "title": "Tour",
    "scenes": []
  }
}
```

Neu payload goc co `scenes` truc tiep, backend se boc thanh `data`.

## GET `/api/locations/{location_id}/versions/compare/?from={id}&to={id}`

So sanh hai version trong cung location.

Response:

```json
{
  "from": {},
  "to": {},
  "changes": {
    "metadata": {},
    "scenes_added": [],
    "scenes_removed": [],
    "scenes_modified": []
  }
}
```

## POST `/api/locations/{location_id}/versions/{version_id}/hotspot-audio/`

Upload audio cho mot hotspot.

Content-Type: `multipart/form-data`

Body:

```text
hotspot_id=hotspot-1
audio=<audio_file>
```

Response:

```json
{
  "audio_url": "http://127.0.0.1:8000/media/tours/hotspot_audio/v3/hotspot-1/audio-ab12cd34.mp3",
  "audio_path": "/media/tours/hotspot_audio/v3/hotspot-1/audio-ab12cd34.mp3"
}
```

Luu y:

- Endpoint chi upload file va tra URL.
- Frontend can luu URL nay vao `TourVersion.data.scenes[].hotspots[].audio_url`.
- Khong upload duoc vao version `published`.

---

# 6. Media / Scene Assets API

## POST `/api/media/scenes/upload/`

Upload anh panorama goc cho mot scene.

Quyen: dang nhap.

Content-Type: `multipart/form-data`

Body:

```text
tour_version=3
scene_key=scene-1
original_file=<jpg/png panorama file>
max_zoom_level=3
tile_size=512
```

Response item `SceneAsset`:

```json
{
  "id": 10,
  "tour_version": 3,
  "scene_key": "scene-1",
  "original_file": "/media/scenes/originals/a.jpg",
  "original_width": 4096,
  "original_height": 2048,
  "file_size": 1234567,
  "checksum_sha256": "...",
  "mime_type": "image/jpeg",
  "tile_base_path": "",
  "max_zoom_level": 3,
  "tile_size": 512,
  "processing_status": "pending",
  "celery_task_id": "...",
  "retry_count": 0,
  "error_message": "",
  "created_at": "...",
  "processing_started_at": null,
  "processed_at": null,
  "updated_at": "..."
}
```

Luu y:

- Chi upload vao version `draft`.
- `scene_key` phai ton tai trong `TourVersion.data.scenes[].id`.
- Moi scene chi co mot asset active.

## GET `/api/media/scenes/{scene_asset_id}/status/`

Lay trang thai xu ly tile.

Response:

```json
{
  "id": 10,
  "scene_key": "scene-1",
  "processing_status": "done",
  "retry_count": 0,
  "error_message": "",
  "processing_started_at": "...",
  "processed_at": "..."
}
```

## DELETE `/api/media/scenes/{scene_asset_id}/`

Xoa scene asset.

Luu y:

- Xoa mem ban ghi.
- Xoa file anh goc va thu muc tile tren media/storage.

## GET `/api/media/tiles/{location_id}/{version_number}/{scene_key}/{z}/{x}/{y}.jpg`

Serve tile anh cho editor/admin.

Vi du:

```text
/api/media/tiles/2/1/scene-1/0/0/0.jpg
```

---

# 7. Publishing API

## GET `/api/published-tours/`

List tour da publish, dung cho Home/public list.

Quyen: public.

Query ho tro:

```text
search
ordering=-published_at,updated_at,location__name
page
page_size
```

Response item:

```json
{
  "id": 4,
  "public_token": "abc123",
  "public_url": "http://127.0.0.1:8000/vr360/abc123/",
  "project_id": 1,
  "project_name": "Xa Ba Vi",
  "location_id": 2,
  "location_name": "Den Thuong",
  "location_slug": "den-thuong",
  "location_description": "Mo ta",
  "location_thumbnail": "http://127.0.0.1:8000/media/...",
  "version_id": 3,
  "version_number": 1,
  "version_label": "v1",
  "tour_thumbnail": "http://127.0.0.1:8000/media/...",
  "scene_count": 2,
  "published_at": "2026-07-19T10:00:00+07:00"
}
```

## GET `/api/locations/{location_id}/publish/`

Xem cau hinh publish hien tai cua location.

Quyen: dang nhap.

Response:

```json
{
  "is_published": true,
  "publish_config": {
    "id": 4,
    "location": 2,
    "public_token": "abc123",
    "public_url": "http://127.0.0.1:8000/vr360/abc123/",
    "published_version": 3,
    "is_active": true,
    "published_at": "...",
    "published_by": 2,
    "updated_at": "...",
    "whitelist_domains": []
  }
}
```

## POST `/api/locations/{location_id}/publish/`

Publish location voi mot version.

Body:

```json
{
  "published_version": 3,
  "is_active": true
}
```

Hoac:

```json
{
  "version_id": 3,
  "is_active": true
}
```

Luu y:

- Version phai thuoc dung location.
- Khi publish version moi, version cu se thanh `archived` neu chua archived.
- Version duoc chon se thanh `published`.

## PATCH `/api/locations/{location_id}/publish/`

Cap nhat cau hinh publish.

Body:

```json
{
  "published_version": 4,
  "is_active": true
}
```

Co the chi gui mot field.

## POST `/api/locations/{location_id}/publish/regenerate-token/`

Sinh public token moi, token cu bi thu hoi.

## DELETE `/api/locations/{location_id}/publish/`

Huy publish.

Luu y:

- PublishConfig bi xoa mem.
- Version dang publish chuyen ve `archived`.

## GET `/api/locations/{location_id}/publish/domains/`

List domain whitelist cua location publish config.

Query ho tro:

```text
domain
label
is_active
created_after
created_before
ordering=domain,created_at
```

## POST `/api/locations/{location_id}/publish/domains/`

Them whitelist domain.

Body:

```json
{
  "domain": "localhost:5174",
  "label": "Local frontend",
  "is_active": true
}
```

Luu y:

- Domain khong duoc chua path/query/fragment.
- Backend se chuan hoa domain ve hostname + port.

## GET `/api/locations/{location_id}/publish/domains/{domain_id}/`

Chi tiet whitelist domain.

## PATCH `/api/locations/{location_id}/publish/domains/{domain_id}/`

Cap nhat domain.

Body:

```json
{
  "label": "Production",
  "is_active": false
}
```

## DELETE `/api/locations/{location_id}/publish/domains/{domain_id}/`

Xoa mem domain whitelist.

---

# 8. Public Viewer API

Public API khong can login, nhung bat buoc domain request phai nam trong whitelist.

Domain duoc check tu header:

- `Origin`
- neu khong co Origin thi dung `Referer`

Neu domain khong hop le:

```json
{
  "detail": "Domain is not allowed to access this published tour."
}
```

Status: `403`.

## GET `/api/public/tour/{public_token}/`

Lay data tour da publish.

Header:

```http
Origin: http://127.0.0.1:5174
```

Response:

```json
{
  "location": {
    "id": 2,
    "name": "Den Thuong",
    "slug": "den-thuong",
    "project_id": 1
  },
  "version": {
    "id": 3,
    "version_number": 1,
    "label": "v1",
    "background_audio": "http://127.0.0.1:8000/media/tours/audio/music.mp3",
    "hotspot_point_logo": "http://127.0.0.1:8000/media/tours/hotspot_logos/logo.png",
    "published_at": "..."
  },
  "data": {
    "title": "Tour",
    "scenes": []
  }
}
```

## GET `/api/public/tour/{public_token}/tiles/{scene_key}/{z}/{x}/{y}.jpg`

Serve tile cho viewer public.

## POST `/api/public/tour/{public_token}/track-visit/`

Ghi nhan mot luot truy cap public.

Body optional:

```json
{
  "country_code": "VN",
  "city": "Ha Noi",
  "device_type": "desktop",
  "browser": "Chrome",
  "os": "Windows"
}
```

Response:

```json
{
  "id": 1,
  "tracked": true
}
```

Luu y:

- Neu client khong gui `device_type/browser/os`, backend se co gang suy ra tu User-Agent.
- `visitor_hash` duoc tao tu token + IP + user-agent + accept-language.
- Chi vao `/viewer?project=...&location=...&version=...` thi khong tinh visit public; phai goi endpoint `track-visit`.

---

# 9. Analytics / Stats API

Prefix:

```text
/api/locations/{location_id}/stats/
```

Quyen: dang nhap.

Query date chung:

```text
?from=2026-01-01&to=2026-12-31
```

Hoac:

```text
?date_from=2026-01-01&date_to=2026-12-31
```

## GET `/api/locations/{location_id}/stats/summary/`

Tong luot truy cap va unique visitor.

Response:

```json
{
  "location_id": 2,
  "total_visits": 100,
  "unique_visitors": 50,
  "from": "2026-01-01",
  "to": "2026-12-31"
}
```

## GET `/api/locations/{location_id}/stats/timeseries/`

Du lieu theo thoi gian.

Query:

```text
from
to
granularity=day|week|month|year
```

Response:

```json
{
  "location_id": 2,
  "granularity": "month",
  "from": "2026-01-01",
  "to": "2026-12-31",
  "results": [
    {
      "period": "2026-01-01",
      "total_visits": 10,
      "unique_visitors": 8
    }
  ]
}
```

## GET `/api/locations/{location_id}/stats/by-country/`

Breakdown theo quoc gia.

Response:

```json
{
  "location_id": 2,
  "results": [
    {
      "key": "VN",
      "count": 100,
      "unique_visitors": 50
    }
  ]
}
```

## GET `/api/locations/{location_id}/stats/by-device/`

Breakdown theo thiet bi.

Response key co the la:

```text
mobile, tablet, desktop, other, unknown
```

## GET `/api/locations/{location_id}/stats/by-referrer/`

Breakdown theo domain gioi thieu.

---

# 10. Dashboard API

Prefix:

```text
/api/dashboard/
```

Quyen: dang nhap.

## GET `/api/dashboard/overview/`

Tong quan he thong.

Response:

```json
{
  "projects_count": 5,
  "locations_count": 10,
  "published_locations": 3,
  "tour_versions_count": 20,
  "total_visits": 1000,
  "unique_visitors": 500
}
```

## GET `/api/dashboard/top-locations/`

Top location theo luot xem.

Query:

```text
from
to
limit=10
```

Response:

```json
{
  "from": "2026-01-01",
  "to": "2026-12-31",
  "limit": 10,
  "results": [
    {
      "location_id": 2,
      "location_name": "Den Thuong",
      "project_id": 1,
      "project_name": "Xa Ba Vi",
      "total_visits": 100,
      "unique_visitors": 50
    }
  ]
}
```

## GET `/api/dashboard/recent-activity/`

Hoat dong gan day.

Query:

```text
limit=20
```

Response:

```json
{
  "limit": 20,
  "results": [
    {
      "id": 1,
      "actor": 2,
      "actor_name": "nhanvien_1",
      "action": "tour_version_created",
      "entity_type": "tour_version",
      "entity_id": "3",
      "description": "Created draft tour version v1.",
      "metadata": {},
      "created_at": "2026-07-19T10:00:00+07:00"
    }
  ]
}
```

---

# 11. Error thuong gap

## 401 Unauthorized

Thieu token, token het han, hoac dung nham refresh token lam access token.

Dung:

```http
Authorization: Bearer <access_token>
```

Khong dung refresh token o header.

## 403 Forbidden public tour

Public tour bi chan domain whitelist.

Can them domain frontend vao:

```text
POST /api/locations/{location_id}/publish/domains/
```

Vi du local:

```json
{
  "domain": "127.0.0.1:5174",
  "label": "Local frontend",
  "is_active": true
}
```

## 400 khi upload scene

Thuong do:

- Version khong phai `draft`.
- `scene_key` khong ton tai trong `TourVersion.data.scenes`.
- Scene da co asset active.

## 400 khi edit version

Neu version co status `published`, API se chan edit:

```json
{
  "non_field_errors": [
    "Published tour versions cannot be edited. Archive or create a new draft first."
  ]
}
```

---

# 12. Thu tu goi API de tao tour moi

Mot flow tao tour tu dau:

1. Dang nhap:

```text
POST /api/auth/login/
```

2. Tao project:

```text
POST /api/projects/
```

3. Tao location:

```text
POST /api/projects/{project_id}/locations/
```

4. Tao version draft rong:

```text
POST /api/locations/{location_id}/versions/
```

Body:

```json
{
  "label": "v1",
  "data": {
    "title": "Tour",
    "scenes": []
  }
}
```

5. Them scene trong Builder va save `TourVersion.data`:

```text
PATCH /api/locations/{location_id}/versions/{version_id}/
```

6. Upload anh panorama cho tung scene:

```text
POST /api/media/scenes/upload/
```

7. Luu lai `image_url/original_file` vao scene trong `TourVersion.data`:

```text
PATCH /api/locations/{location_id}/versions/{version_id}/
```

8. Publish:

```text
POST /api/locations/{location_id}/publish/
```

9. Them whitelist domain:

```text
POST /api/locations/{location_id}/publish/domains/
```

10. Viewer public lay tour:

```text
GET /api/public/tour/{public_token}/
POST /api/public/tour/{public_token}/track-visit/
```
