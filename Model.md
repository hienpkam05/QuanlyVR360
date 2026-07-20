# Models — VR360 Management

Tai lieu nay mo ta cac model hien co trong backend Django, y nghia tung truong, quan he giua cac bang va cac luu y khi thao tac du lieu.

## 1. So do quan he tong quat

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

## 2. Soft delete dung chung

Phan lon model nghiep vu ke thua `backend.models.SoftDeleteModel`, nen khi goi `delete()` se xoa mem thay vi xoa cung ban ghi.

| Truong | Kieu | Giai thich |
|---|---|---|
| `is_deleted` | BooleanField | Danh dau ban ghi da bi xoa mem. Mac dinh `False`. |
| `deleted_at` | DateTimeField | Thoi diem xoa mem. Bang `NULL` neu ban ghi con hoat dong. |

Manager:

- `Model.objects`: chi lay ban ghi chua xoa.
- `Model.all_objects`: lay ca ban ghi chua xoa va da xoa.
- `Model.all_objects.deleted()`: lay ban ghi da xoa.
- `instance.restore()`: khoi phuc ban ghi da xoa mem.

Soft-cascade hien tai:

```text
Project -> Location -> TourVersion -> SceneAsset
                  └-> PublishConfig -> WhitelistDomain, TourVisit, DailyStat
```

Luu y: soft delete giu ban ghi trong database, nhung rieng `SceneAsset.delete()` hien dang xoa ca file anh goc va thu muc tile tren storage/media de tranh rac file.

## 3. `app_projects.Project`

Dai dien cho mot du an VR360. Mot project co the co nhieu location.

Bang mac dinh: `app_projects_project`

| Truong | Kieu | Bat buoc | Giai thich |
|---|---|---:|---|
| `id` | AutoField | Co | Khoa chinh Django tu tao. |
| `name` | CharField(255) | Co | Ten du an. |
| `slug` | SlugField(275) | Tu sinh | Slug than thien URL, duy nhat voi cac project chua xoa. |
| `description` | TextField | Khong | Mo ta du an. |
| `thumbnail` | ImageField | Khong | Anh dai dien, luu duoi `media/projects/thumbnails/`. |
| `created_by` | ForeignKey(User) | Khong | User tao du an, `SET_NULL` neu user bi xoa cung. |
| `is_active` | BooleanField | Co | Trang thai hoat dong/an du an. Mac dinh `True`. |
| `created_at` | DateTimeField | Tu dong | Thoi diem tao. |
| `updated_at` | DateTimeField | Tu dong | Thoi diem cap nhat gan nhat. |

Quy tac:

- Mac dinh sap xep `-created_at`.
- Constraint `unique_active_project_slug`: khong trung slug giua cac project chua xoa.
- Index tren `is_active`.
- Khi xoa project, cac `locations` ben trong cung bi xoa mem.

## 4. `app_locations.Location`

Dai dien cho dia diem thuoc mot project.

Bang mac dinh: `app_locations_location`

| Truong | Kieu | Bat buoc | Giai thich |
|---|---|---:|---|
| `id` | AutoField | Co | Khoa chinh. |
| `project` | ForeignKey(Project) | Co | Project so huu location. |
| `name` | CharField(255) | Co | Ten dia diem. |
| `slug` | SlugField(275) | Tu sinh | Slug cua dia diem, duy nhat trong cung project voi cac location chua xoa. |
| `description` | TextField | Khong | Mo ta/gioi thieu dia diem. |
| `thumbnail` | ImageField | Khong | Anh dai dien, luu duoi `media/locations/thumbnails/`. |
| `latitude` | DecimalField(9,6) | Khong | Vi do, tu `-90` den `90`. |
| `longitude` | DecimalField(9,6) | Khong | Kinh do, tu `-180` den `180`. |
| `order` | PositiveIntegerField | Co | Thu tu hien thi/drag-drop. Mac dinh `0`. |
| `is_active` | BooleanField | Co | Trang thai hoat dong. Mac dinh `True`. |
| `created_at` | DateTimeField | Tu dong | Thoi diem tao. |
| `updated_at` | DateTimeField | Tu dong | Thoi diem cap nhat. |

Quy tac:

- Mac dinh sap xep theo `order`, sau do `created_at`.
- Constraint `unique_active_location_slug_per_project`.
- Index `project + is_active`.
- Khi xoa location, cac `versions` va `publish_configs` lien quan cung bi xoa mem.

## 5. `app_tours.TourVersion`

Dai dien cho mot phien ban tour VR360 cua mot location. Moi location co the co nhieu version de lam ban nhap, publish, rollback hoac tiep tuc edit.

Bang mac dinh: `app_tours_tourversion`

### Status

| Gia tri | Y nghia |
|---|---|
| `draft` | Ban nhap, duoc edit. |
| `published` | Ban dang/da publish. Hien tai day la status bi khoa edit tren API/frontend. |
| `archived` | Ban luu tru. Theo logic hien tai van co the edit, chi `published` moi khong duoc edit. |

### Truong du lieu

| Truong | Kieu | Bat buoc | Giai thich |
|---|---|---:|---|
| `id` | AutoField | Co | Khoa chinh. |
| `location` | ForeignKey(Location) | Co | Location so huu version. |
| `version_number` | PositiveIntegerField | Tu sinh | So version trong pham vi location. Khong sua truc tiep. |
| `label` | CharField(100) | Khong | Ten goi de doc, vi du `v1`, `Ban thang 7`. |
| `data` | JSONField | Co | Cau truc tour gom `scenes`, `hotspots`, view, audio hotspot... |
| `thumbnail` | ImageField | Khong | Anh dai dien version, luu duoi `media/tours/thumbnails/`. |
| `background_audio` | FileField | Khong | Nhac nen cua version, luu duoi `media/tours/audio/`. Field nay moi duoc them. |
| `hotspot_point_logo` | ImageField | Khong | Logo/icon rieng cho hotspot loai `point`, luu duoi `media/tours/hotspot_logos/`. Field nay moi duoc them. |
| `status` | CharField(20) | Co | Trang thai version. Mac dinh `draft`. |
| `changelog` | TextField | Khong | Ghi chu thay doi cua version. |
| `created_by` | ForeignKey(User) | Khong | User tao version. |
| `created_at` | DateTimeField | Tu dong | Thoi diem tao. |
| `updated_at` | DateTimeField | Tu dong | Thoi diem cap nhat. |

### Cau truc `data`

`data` phai la JSON object va bat buoc co `scenes` la danh sach.

Vi du toi thieu:

```json
{
  "title": "Tour demo",
  "scenes": []
}
```

Moi scene thuong co:

```json
{
  "id": "scene-1",
  "name": "San chinh",
  "image_url": "/media/scenes/originals/example.jpg",
  "view": { "lon": 0, "lat": 0, "fov": 75 },
  "hotspots": []
}
```

Moi hotspot thuong co:

```json
{
  "id": "hotspot-1",
  "label": "Di vao trong",
  "type": "nav",
  "target_scene_id": "scene-2",
  "lon": 12.5,
  "lat": -8.2,
  "audio_url": "/media/tours/hotspot_audio/v1/hotspot-1/audio.mp3"
}
```

Luu y: audio tung hotspot hien khong phai mot model rieng. File duoc upload vao storage, con duong dan duoc luu trong `TourVersion.data` tai truong `hotspot.audio_url`.

Validation `data`:

- Gia tri goc phai la object.
- Phai co `scenes` la list.
- Moi scene phai la object va co `id`.
- Scene id trong cung version khong duoc trung nhau.

Quy tac:

- Constraint `unique_tour_version_per_location`: mot location khong co hai version cung `version_number`.
- Index `location + status`.
- Mac dinh sap xep `-version_number`.
- Khi tao moi, `version_number` duoc lay theo so lon nhat hien co cua location + 1 trong transaction.
- Khi xoa version, cac `scene_assets` cua version cung bi xoa; file anh goc/tile cua `SceneAsset` cung duoc don.

## 6. `app_media.SceneAsset`

Dai dien cho file panorama that cua mot scene va trang thai xu ly tile.

Bang mac dinh: `app_media_sceneasset`

| Truong | Kieu | Bat buoc | Giai thich |
|---|---|---:|---|
| `id` | AutoField | Co | Khoa chinh. |
| `tour_version` | ForeignKey(TourVersion) | Co | Version chua asset. |
| `scene_key` | CharField(100) | Co | ID scene, khop voi `scene.id` trong `TourVersion.data`. |
| `original_file` | ImageField | Co | Anh panorama goc, luu duoi `media/scenes/originals/`. |
| `original_width` | PositiveIntegerField | Khong | Chieu rong anh goc. |
| `original_height` | PositiveIntegerField | Khong | Chieu cao anh goc. |
| `file_size` | PositiveBigIntegerField | Khong | Dung luong file theo byte. |
| `checksum_sha256` | CharField(64) | Khong | Ma hash SHA-256, co index. |
| `mime_type` | CharField(100) | Khong | MIME type, vi du `image/jpeg`. |
| `tile_base_path` | CharField(500) | Khong | Thu muc tile da sinh. |
| `max_zoom_level` | PositiveSmallIntegerField | Co | Zoom toi da. Mac dinh `3`. |
| `tile_size` | PositiveSmallIntegerField | Co | Kich thuoc tile. Mac dinh `512`. |
| `processing_status` | CharField(20) | Co | `pending`, `processing`, `done`, `failed`. |
| `celery_task_id` | CharField(255) | Khong | ID Celery task, co index. |
| `retry_count` | PositiveSmallIntegerField | Co | So lan retry. Mac dinh `0`. |
| `error_message` | TextField | Khong | Loi xu ly gan nhat. |
| `created_at` | DateTimeField | Tu dong | Thoi diem tao. |
| `processing_started_at` | DateTimeField | Khong | Thoi diem bat dau xu ly. |
| `processed_at` | DateTimeField | Khong | Thoi diem xu ly xong. |
| `updated_at` | DateTimeField | Tu dong | Thoi diem cap nhat. |

Constraint:

- `unique_active_scene_key_per_tour_version`: moi `scene_key` chi co mot asset chua xoa trong cung version.

Luu y quan trong:

- Khi `SceneAsset.delete()` duoc goi, ban ghi van xoa mem nhung file `original_file` va thu muc tile se bi xoa tren storage/local media.
- Vi vay neu xoa version thi anh trong `media/scenes/originals/` cua version do cung duoc don theo.

## 7. `app_publishing.PublishConfig`

Quan ly cau hinh publish public cua mot location.

Bang mac dinh: `app_publishing_publishconfig`

| Truong | Kieu | Bat buoc | Giai thich |
|---|---|---:|---|
| `id` | AutoField | Co | Khoa chinh. |
| `location` | ForeignKey(Location) | Co | Location duoc publish. |
| `public_token` | CharField(64) | Tu sinh | Token public duy nhat dung trong URL `/vr360/{token}/`. |
| `published_version` | ForeignKey(TourVersion) | Khong | Version dang duoc public. |
| `is_active` | BooleanField | Co | Bat/tat public. Mac dinh `False`. |
| `published_at` | DateTimeField | Khong | Thoi diem publish lan dau. |
| `published_by` | ForeignKey(User) | Khong | User thuc hien publish. |
| `updated_at` | DateTimeField | Tu dong | Thoi diem cap nhat. |

Quy tac:

- Mot location chi co toi da mot PublishConfig chua xoa (`unique_active_publish_config_per_location`).
- `is_active=True` bat buoc co `published_version`.
- `published_version` phai thuoc dung `location`.
- Khong publish version da xoa mem.
- `regenerate_token()` sinh token moi.
- Xoa PublishConfig se xoa mem whitelist domain, visit va daily stat lien quan.

## 8. `app_publishing.WhitelistDomain`

Danh sach domain duoc phep truy cap tour public.

Bang mac dinh: `app_publishing_whitelistdomain`

| Truong | Kieu | Bat buoc | Giai thich |
|---|---|---:|---|
| `id` | AutoField | Co | Khoa chinh. |
| `publish_config` | ForeignKey(PublishConfig) | Co | Cau hinh publish so huu domain. |
| `domain` | CharField(255) | Co | Domain duoc cho phep, co the kem port, vi du `localhost:5174`. |
| `label` | CharField(100) | Khong | Ghi chu hien thi. |
| `is_active` | BooleanField | Co | Bat/tat domain. Mac dinh `True`. |
| `created_at` | DateTimeField | Tu dong | Thoi diem them. |

Quy tac:

- Domain duoc chuan hoa ve hostname + port.
- Khong chap nhan path/query/fragment.
- Constraint `unique_active_domain_per_publish_config`.

## 9. `app_analytics.TourVisit`

Luu tung luot truy cap tour public. Moi lan frontend goi:

```text
POST /api/public/tour/{public_token}/track-visit/
```

thi backend tao mot ban ghi `TourVisit`.

Bang mac dinh: `app_analytics_tourvisit`

| Truong | Kieu | Bat buoc | Giai thich |
|---|---|---:|---|
| `id` | AutoField | Co | Khoa chinh. |
| `publish_config` | ForeignKey(PublishConfig) | Co | Tour public duoc truy cap. |
| `visitor_hash` | CharField(64) | Co | Hash visitor, khong luu IP tho. Co index. |
| `country_code` | CharField(2) | Khong | Ma quoc gia. |
| `city` | CharField(100) | Khong | Thanh pho neu co. |
| `device_type` | CharField(10) | Co | `mobile`, `tablet`, `desktop`, `other`. |
| `browser` | CharField(50) | Khong | Trinh duyet. |
| `os` | CharField(50) | Khong | He dieu hanh. |
| `referrer_domain` | CharField(255) | Khong | Domain gioi thieu. |
| `visited_at` | DateTimeField | Tu dong | Thoi diem truy cap. Co index. |

Index:

- `publish_config + visited_at`
- `publish_config + country_code`
- `publish_config + device_type`
- `publish_config + referrer_domain`

## 10. `app_analytics.DailyStat`

Bang tong hop thong ke theo ngay.

Bang mac dinh: `app_analytics_dailystat`

| Truong | Kieu | Bat buoc | Giai thich |
|---|---|---:|---|
| `id` | AutoField | Co | Khoa chinh. |
| `publish_config` | ForeignKey(PublishConfig) | Co | Tour public duoc thong ke. |
| `date` | DateField | Co | Ngay thong ke. |
| `total_visits` | PositiveIntegerField | Co | Tong luot truy cap. |
| `unique_visitors` | PositiveIntegerField | Co | So visitor duy nhat. |
| `country_breakdown` | JSONField | Co | Thong ke theo quoc gia. |
| `device_breakdown` | JSONField | Co | Thong ke theo thiet bi. |
| `referrer_breakdown` | JSONField | Co | Thong ke theo referrer. |

Constraint:

- `unique_active_daily_stat_per_publish_config`: moi publish config chi co mot daily stat chua xoa cho moi ngay.

## 11. `app_dashboard.ActivityLog`

Luu log hoat dong he thong.

Bang mac dinh: `app_dashboard_activitylog`

| Truong | Kieu | Bat buoc | Giai thich |
|---|---|---:|---|
| `id` | AutoField | Co | Khoa chinh. |
| `actor` | ForeignKey(User) | Khong | User thuc hien hanh dong. |
| `action` | CharField(100) | Co | Ma hanh dong, vi du `tour.created`. |
| `entity_type` | CharField(100) | Co | Loai doi tuong bi tac dong. |
| `entity_id` | CharField(100) | Co | ID doi tuong dang chuoi. |
| `description` | CharField(500) | Khong | Mo ta de doc. |
| `metadata` | JSONField | Co | Du lieu phu dang JSON. Mac dinh `{}`. |
| `created_at` | DateTimeField | Tu dong | Thoi diem tao log. Co index. |

Mac dinh sap xep `-created_at`, co index `entity_type + entity_id`.

## 12. Cac app khong co model rieng

### `app_auth`

Dung `django.contrib.auth.models.User` mac dinh. App nay xu ly login, refresh token, logout, `/me/`, doi mat khau va role/permission.

### `app_public`

Khong co bang rieng. Doc du lieu tu `PublishConfig`, `TourVersion`, `SceneAsset` va ghi visit vao `TourVisit`.

### `backend`

Chua co model nghiep vu rieng, nhung co `SoftDeleteModel`, manager va queryset dung chung.

## 13. Ghi chu khi thay doi model

- Neu thay doi field/constraint/index thi chay:

```bash
python manage.py makemigrations
python manage.py migrate
```

- `ImageField` va `FileField` chi luu duong dan file trong PostgreSQL; file that nam trong `MEDIA_ROOT` hoac cloud storage neu cau hinh.
- `background_audio`, `hotspot_point_logo`, `thumbnail`, `original_file` deu la duong dan file, khong phai blob luu truc tiep trong PostgreSQL.
- Audio tung hotspot hien duoc luu duong dan trong `TourVersion.data`, khong co bang rieng.
- Khong dung `QuerySet.update(is_deleted=True)` de xoa, vi se bo qua soft-cascade va `deleted_at`.
- Khi can xem/thung rac/khoi phuc ban ghi da xoa, dung `Model.all_objects`.
