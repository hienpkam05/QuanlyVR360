# Cấu hình dùng chung cho team

File `.env` dùng để lưu thông tin cấu hình riêng của từng máy: database, secret key, domain frontend/backend. Vì có thể chứa mật khẩu nên không đẩy `.env` lên Git.

## 1. Backend

Tại thư mục gốc project, copy file mẫu:

```powershell
Copy-Item .env.example .env
```

Sau đó sửa `.env` theo máy của bạn:

```env
SECRET_KEY=replace-with-a-long-random-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://user:password@localhost:5432/managementvr360_db
CORS_ALLOWED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
```

Nếu cả team muốn dùng chung database, chỉ cần mọi người dùng cùng một `DATABASE_URL` trỏ tới PostgreSQL chung. Không nên commit URL thật nếu có mật khẩu.

## 2. Frontend

Tại thư mục `frontend`, copy file mẫu:

```powershell
cd frontend
Copy-Item .env.example .env
```

Mặc định frontend gọi backend local:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Nếu backend deploy lên mạng, đổi thành URL backend thật, ví dụ:

```env
VITE_API_BASE_URL=https://vr360-api.onrender.com
```

## 3. Luồng chạy local

Backend:

```powershell
.\venv\Scripts\activate
python manage.py migrate
python manage.py runserver
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

## 4. Những file được commit

Nên commit:

- `.env.example`
- `frontend/.env.example`
- `CONFIG.md`
- Source code backend/frontend

Không commit:

- `.env`
- `frontend/.env`
- `venv/`
- `node_modules/`
- `media/`
- `frontend/dist/`

Các file không nên commit đã được khai báo trong `.gitignore`.
