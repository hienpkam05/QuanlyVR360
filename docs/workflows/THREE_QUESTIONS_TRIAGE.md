# Quy Trình Triệt Tiêu Lỗi Gốc Rễ - Three Questions Triage

> Khi AI mắc lỗi lần thứ 2 cùng loại, **tuyệt đối không nhắc lại bằng văn bản prompt**. Phải dừng lại và trả lời 3 câu hỏi để biến lời nhắc thành rào chắn cứng.

---

### Câu Hỏi 1: Làm sao biến lời nhắc này thành Luật Linter hoặc Schema JSON?
- Thay vì nhắc: *"Nhớ dispose Three.js nhé"*, viết AST Linter: `eslint-plugin-vr360-guard/no-three-memory-leak`.
- Thay vì nhắc: *"Đừng hardcode URL"*, tạo `configs/ssot/routes.json` và rule `no-hardcode-routes`.

### Câu Hỏi 2: Làm sao để hệ thống CI tự động phát hiện và chặn đứng?
- Cấu hình Husky pre-commit hook và GitHub Actions CI.
- Nếu linter hoặc test báo lỗi -> Đánh trượt PR tự động, không cần PM phải duyệt tay.

### Câu Hỏi 3: Làm sao tái thiết kế kiến trúc để lỗi không thể xảy ra về mặt vật lý?
- Đóng gói toàn bộ logic gọi API vào factory `API()` tự động đính token và hiển thị toast.
- Chuyển router sang chế độ nạp động từ file JSON SSOT để không ai phải sửa tay `router/index.js`.
