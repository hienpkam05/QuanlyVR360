# Quy Trình Tự Động Tái Hiện Lỗi Benny Agent (BENNY_PIPELINE.md)

> Lấy cảm hứng từ mô hình Benny Agent tại SpaceX / Cursor: Khi nhận báo cáo lỗi, AI tự động mở môi trường giả lập (sandbox), tự bấm lại các bước như người dùng để chứng minh lỗi có thật, và tự kiểm chứng lại sau khi mã nguồn được sửa.

---

## 1. Chu Trình 4 Bước Của Benny Agent

```
[1. Tiếp nhận Issue] ──► [2. Lần theo Feature Map] ──► [3. Chạy Playwright Sandbox] ──► [4. Xác minh sau sửa]
```

1. **Bước 1 - Tiếp nhận Báo cáo lỗi:** Đọc issue hoặc mô tả của người dùng, phân tích hành vi kỳ vọng và hành vi thực tế.
2. **Bước 2 - Lần theo Bản đồ tính năng:** Tra cứu `docs/maps/FEATURE_MAP.md` và `docs/maps/VISUAL_LOCATORS.md` để trích xuất `data-testid`, route và component phụ trách.
3. **Bước 3 - Khởi tạo Sandbox tái hiện lỗi:**
   - Chạy lệnh `node scripts/benny_reproduce.js --url=<route> --steps=<kịch_bản>`.
   - Thu thập ảnh chụp màn hình lúc lỗi (`failure.png`), video trace và error stack log.
4. **Bước 4 - Xác minh sau sửa chữa:**
   - Khi Worker Agent nộp bản vá (patch), Benny chạy lại chính xác kịch bản test trên.
   - Nếu test pass 100% -> Đính kèm báo cáo JSON xác nhận lỗi đã triệt tiêu hoàn toàn vào Pull Request.
