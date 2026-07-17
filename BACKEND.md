# Chuẩn cấu trúc project — CMS Tina Backend

Tài liệu này mô tả cấu trúc chuẩn, quy ước đặt tên và cách tổ chức code của project `cms-tina-api`, dùng làm tài liệu tham chiếu bắt buộc cho backend developer mới trước khi bắt đầu code.

## 1. Tổng quan kiến trúc

Đây là một **Django monolith** theo mô hình "1 Django app = 1 domain nghiệp vụ", cộng thêm 2 service tách container riêng:

| Thành phần | Công nghệ | Vai trò |
|---|---|---|
| `backend/` + `app_*` | Django 4.2.9 + DRF | Core CMS API (auth, bài viết, phê duyệt, tổ chức...) |
| `workflow/` | Django (module dùng chung) | Engine phê duyệt đa bước, được các app khác "cắm" vào |
| `notifybase/`, `websocketcustome/` | Django Channels | Notification + WebSocket realtime |
| `backup_service/` | FastAPI (độc lập, KHÔNG phải Django app) | Backup/restore database, chạy container riêng |
| `tts_service/` + `vieneu/` | Django app + engine TTS riêng | Text-to-speech cho bài viết |
| `frontend/` | Vue (chỉ có bản build `dist/`) | Serve qua Nginx, source Vue không nằm trong repo này |

Toàn bộ API của các app được gom lại một tầng duy nhất tại `app_api_gate_way/urls.py`, rồi mount vào `backend/urls.py` dưới prefix `/api/`. Đây không phải "gateway" theo nghĩa microservice — chỉ là router tổng hợp.

## 2. Cấu trúc thư mục root

```
cms-tina-api/
├── backend/              # Project core: settings, urls, asgi/wsgi, auth, middleware
├── app_*/                # ~29 Django app theo domain nghiệp vụ (xem mục 3)
├── app_api_gate_way/      # Router tổng hợp toàn bộ app dưới /api/
├── workflow/              # Engine phê duyệt đa bước dùng chung (xem mục 4)
├── notifybase/            # Hạ tầng notification dùng chung
├── websocketcustome/      # Routing WebSocket (Channels)
├── base_form/, base_preload/ # Helper form/preload dùng chung (tài liệu còn thiếu — xem mục 7)
├── backup_service/        # Microservice FastAPI backup, tách container hoàn toàn
├── tts_service/, texttospeech/, vieneu/, vieneu_utils/ # Stack Text-to-Speech
├── frontend/              # Chỉ chứa bản build Vue (dist/) + Dockerfile nginx
├── labs/                  # Sandbox script, không thuộc luồng nghiệp vụ chính thức
├── static/, media/, backups/
├── manage.py, Dockerfile, entrypoint.sh, nginx.conf
├── requirements.txt        # File dependency được Dockerfile dùng để build image
├── docker-compose.yml
├── README.md, DEPLOYMENT_GUIDE.md, DECISION_LOG.md
```

Ghi chú: `Dockerfile:34-36` chỉ copy và cài đặt đúng `requirements.txt` — đây là file dependency thực sự dùng để build image.

## 3. Cấu trúc 1 Django app (`app_*`)

### App lớn (nhiều model/nghiệp vụ phức tạp) — tách sub-package

```
app_posts/
├── models/
│   └── m_posts.py          # tiền tố m_ hoặc md_
├── serializers/
│   └── s_posts.py           # tiền tố s_
├── views/
│   └── v_posts.py           # tiền tố v_
├── extends/                 # logic mở rộng ngoài CRUD chuẩn: permissions.py, preload.py, filter.py, search.py
├── migrations/
├── urls.py                  # DRF DefaultRouter riêng của app
└── apps.py
```

### App nhỏ (CRUD đơn giản) — file phẳng

```
app_bookmarks/
├── models.py
├── serializers.py
├── views.py
├── migrations/
└── urls.py
```

**Quy tắc chọn kiểu:** nếu app có >1 model chính hoặc logic mở rộng (filter, permission riêng, search), tách sub-package như `app_posts`. Nếu chỉ là CRUD đơn giản 1 model, dùng file phẳng như `app_bookmarks`/`app_comments`.

### Đăng ký app mới vào hệ thống
1. Tạo app bằng `python manage.py startapp app_<domain>`, đặt tên tiền tố `app_` bắt buộc.
2. Thêm vào `INSTALLED_APPS` trong `backend/settings.py`.
3. Include `urls.py` của app vào `app_api_gate_way/urls.py`.
4. Nếu app cần approval workflow, xem mục 4 để tích hợp `workflow/`.

## 4. Module dùng chung — `workflow/`

Đây là engine phê duyệt đa bước tái sử dụng cho các app như `app_posts`, `app_approval_posts`. Cấu trúc:

```
workflow/
├── core/           # base serializer/view để app khác "cắm" workflow vào
├── models/         # m_definations, m_steps, m_instances, m_data_version, m_logs, m_app_extend
├── serializers/    # s_definations, s_steps, s_instances, s_logs, s_app_extend
├── views/          # v_definations, v_steps, v_instances, v_app_extend
├── engine.py       # WorkflowEngine: start_instance, approve, reject, feedback, recall, resend_instance
├── check_perm.py   # get_my_step_tasks, get_approval_users, get_step_can_approve
├── constants.py    # CHECKPOINT_TYPE, APPROVAL_TYPE, FORWARD_TYPE...
├── exceptions.py
├── callbacks.py    # dispatch_workflow_callback khi instance hoàn thành
└── urls.py
```

Khi cần thêm 1 luồng phê duyệt mới cho app của bạn, đọc `workflow/README.md` và tham khảo cách `app_approval_posts` tích hợp trước khi tự viết state machine riêng.

## 5. Naming convention bắt buộc

| Loại file | Tiền tố | Ví dụ |
|---|---|---|
| Model | `m_*.py` / `md_*.py` | `m_province.py`, `md_users.py` |
| Serializer | `s_*.py` | `s_posts.py`, `s_role_app.py` |
| View | `v_*.py` | `v_users.py`, `v_definations.py` |
| App | `app_<domain>` (snake_case) | `app_posts`, `app_organizations` |

- URL routing 2 tầng: mỗi app có `urls.py` riêng dùng DRF `DefaultRouter`, sau đó `app_api_gate_way/urls.py` include tất cả dưới `/api/`.
- Codebase song ngữ Việt/Anh trong comment và message lỗi trả về người dùng (vd `raise ValueError("Đối tượng này đã hoàn thành!")`) — giữ nguyên convention này khi viết message lỗi hướng tới người dùng cuối.
- Model dùng `django-simple-history` sẽ có bản ghi `Historical*` tương ứng, lưu vào DB `history` riêng (route qua `backend/router.py`) — không tự ý bỏ `HistoricalRecords()` khi sửa model đã có lịch sử.

## 6. Docker & hạ tầng

`docker-compose.yml` (root) định nghĩa 7 service chính:

| Service | Vai trò |
|---|---|
| `redis` | Cache + Celery broker |
| `elasticsearch` | Search index (`django-haystack`) |
| `api` | Django + Gunicorn (3 workers), chạy `collectstatic` → `migrate` → `setup_es_index` → `update_index` → `gunicorn` |
| `websocket` | Daphne, ASGI (`backend.asgi:application`) |
| `celery` | Celery worker |
| `celery-beat` | Celery scheduler |
| `nginx` | Reverse proxy: `/` → api, `/ws/` → websocket, `/media/` → static |

`backup_service` chạy **container hoàn toàn tách biệt** với `docker-compose.yml` riêng của nó — không nằm trong compose root. Nó tự kết nối DB để `pg_dump`/restore và ghi lịch sử vào bảng `tb_backup_data` bằng raw SQL (không qua Django ORM) — nếu bạn đổi schema bảng này trong Django, phải cập nhật đồng bộ ở `backup_service/app.py`.

## 7. Environment variables

`backup_service/.env.example` là file mẫu biến môi trường có sẵn trong repo, có comment tiếng Việt giải thích từng biến. Các nhóm biến chính trong `.env` root: Database, Email, OAuth2, Domain/URL, service liên kết (`TTS_BASE_URL`, `BACKUP_SERVICE_URL`), SSO/OIDC, feature flag.

## 8. Setup máy mới

1. Cài dependency: `pip install -r requirements.txt`.
2. Setup local dev theo `README.md`: tạo `.env` → venv → `pip install` → `loaddata initial_data.json` → `setup_oauth2` → `createsuperuser` → `runserver`.
3. Chạy bằng Docker: `docker-compose up` với `docker-compose.yml` ở root (định nghĩa các service ở mục 6).
