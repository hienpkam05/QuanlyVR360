# Deploy VR360 len Render + Vercel

Huong dan nay dung cho project hien tai:

- Backend: Django API
- Frontend: Vue 3 / Vite
- Database: PostgreSQL tren Render
- Frontend hosting: Vercel
- Backend hosting: Render

## 1. Mo hinh deploy

```text
Vue 3 Frontend  -> Vercel
Django Backend  -> Render Web Service
PostgreSQL      -> Render PostgreSQL
Media uploads   -> Render Disk tam thoi / Cloud storage sau nay
```

## 2. Chuan bi code backend

Kiem tra `requirements.txt` can co:

```txt
gunicorn
whitenoise
dj-database-url
psycopg[binary]
django-cors-headers
python-dotenv
```

Neu thieu `gunicorn` hoac `whitenoise`, them vao:

```txt
gunicorn>=23.0,<24.0
whitenoise[brotli]>=6.7,<7.0
```

Trong `backend/settings.py`, them WhiteNoise ngay sau `SecurityMiddleware`:

```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    ...
]
```

Them cau hinh static:

```python
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
```

Them cau hinh CSRF trusted origins:

```python
CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CSRF_TRUSTED_ORIGINS", "").split(",")
    if origin.strip()
]
```

## 3. Tao file build.sh cho Render

Tao file `build.sh` o thu muc goc project:

```bash
#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
```

Sau do push code len GitHub:

```powershell
git add .
git commit -m "prepare deploy render vercel"
git push
```

## 4. Tao PostgreSQL tren Render

Vao Render:

```text
New > PostgreSQL
```

Dien:

```text
Name: vr360-postgres
Database: managementvr360_db
User: vr360_user
Region: Oregon
PostgreSQL Version: 18
Storage: 1 GB
Storage Autoscaling: Disabled
High Availability: Disabled
```

Sau khi tao xong, lay:

```text
Internal Database URL
```

URL nay se dung cho bien moi truong `DATABASE_URL` cua backend.

## 5. Tao backend Web Service tren Render

Vao Render:

```text
New > Web Service
```

Chon GitHub repo cua project.

Cau hinh:

```text
Name: vr360-backend
Language: Python 3
Branch: main
Region: Oregon
Root Directory: de trong
Build Command: ./build.sh
Start Command: gunicorn backend.wsgi:application
```

Khong dung:

```text
gunicorn app:app
```

Vi project Django cua minh co WSGI app o:

```text
backend.wsgi:application
```

## 6. Bien moi truong backend tren Render

Trong phan Environment Variables cua Render Web Service, them:

```env
SECRET_KEY=your-production-secret-key
DEBUG=False
DATABASE_URL=Internal Database URL cua Render PostgreSQL
ALLOWED_HOSTS=vr360-backend.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
CSRF_TRUSTED_ORIGINS=https://vr360-backend.onrender.com,https://your-frontend.vercel.app
```

Neu chua deploy frontend len Vercel, co the de tam:

```env
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
CSRF_TRUSTED_ORIGINS=https://vr360-backend.onrender.com,http://localhost:5173,http://127.0.0.1:5173
```

Sau khi co domain Vercel that, quay lai sua lai.

## 7. Cau hinh media upload tren Render

Project hien tai upload anh vao:

```text
media/
```

Neu khong cau hinh disk, anh upload co the mat sau khi redeploy/restart.

Tam thoi dung Render Disk:

```text
Render Web Service > Disks > Add Disk
```

Mount Path:

```text
/opt/render/project/src/media
```

Vi tren Render, source code thuong nam tai:

```text
/opt/render/project/src
```

Sau nay production that nen chuyen sang:

- Cloudinary
- AWS S3
- Cloudflare R2
- Google Cloud Storage

## 8. Deploy backend

Bam:

```text
Deploy Web Service
```

Sau khi deploy xong, test:

```text
https://vr360-backend.onrender.com/api/docs/
```

Neu Swagger hien thi la backend da chay.

## 9. Tao superuser tren Render

Vao backend service tren Render, mo Shell va chay:

```bash
python manage.py createsuperuser
```

Neu Render plan khong co Shell, co the tao superuser local bang database production hoac tao command rieng sau.

## 10. Deploy frontend Vue 3 len Vercel

Vao Vercel:

```text
Add New > Project
```

Chon GitHub repo.

Cau hinh:

```text
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

Them Environment Variable tren Vercel:

```env
VITE_API_BASE_URL=https://vr360-backend.onrender.com
```

Thay `vr360-backend.onrender.com` bang link backend Render that cua ban.

Sau do bam Deploy.

## 11. Sua CORS sau khi co link Vercel

Sau khi frontend deploy xong, ban se co link dang:

```text
https://your-frontend.vercel.app
```

Quay lai Render backend, sua:

```env
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
CSRF_TRUSTED_ORIGINS=https://vr360-backend.onrender.com,https://your-frontend.vercel.app
```

Sau do redeploy backend.

## 12. Cau hinh whitelist domain cho VR publish

Trong trang Publishing cua he thong, khi publish tour va them domain cho phep, neu frontend chay tren Vercel thi them:

```text
your-frontend.vercel.app
```

Neu sau nay dung domain rieng:

```text
yourdomain.com
```

Neu domain khong nam trong whitelist, public viewer se bi loi:

```text
Domain is not allowed to access this published tour.
```

## 13. Kiem tra sau deploy

Kiem tra backend:

```text
https://vr360-backend.onrender.com/api/docs/
```

Kiem tra frontend:

```text
https://your-frontend.vercel.app
```

Can test cac chuc nang:

- Dang nhap
- Tao project
- Tao location
- Tao version
- Upload anh panorama
- Save Tour
- Publish Tour
- Xem tour o Home
- Xem VR360 Viewer
- Kiem tra media anh co mat sau khi redeploy khong

## 14. Loi thuong gap

### Loi 1: Render bao sai Start Command

Neu thay loi lien quan `app:app`, sua Start Command thanh:

```bash
gunicorn backend.wsgi:application
```

### Loi 2: Frontend goi API bi CORS

Kiem tra backend env:

```env
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

Sau do redeploy backend.

### Loi 3: Anh upload bi mat sau deploy

Can cau hinh Render Disk:

```text
/opt/render/project/src/media
```

Hoac chuyen sang cloud storage.

### Loi 4: Trang Vue reload bi 404 tren Vercel

Tao file `frontend/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Loi 5: `SECRET_KEY` missing

Them env tren Render:

```env
SECRET_KEY=your-production-secret-key
```

### Loi 6: `DATABASE_URL` missing

Them env tren Render:

```env
DATABASE_URL=Internal Database URL cua Render PostgreSQL
```

## 15. Ghi chu quan trong

Trong production khong nen dung:

```env
DEBUG=True
```

Nen dung:

```env
DEBUG=False
```

Anh panorama VR360 thuong rat nang, neu san pham chay that nen dua media sang cloud storage thay vi de local disk.

