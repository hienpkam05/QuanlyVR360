## 1. Tóm Tắt Thay Đổi & Feature ID
- **Feature ID:** `FEAT-XXX-YY` (Tra cứu từ `docs/maps/FEATURE_MAP.md`)
- **Mô tả ngắn gọn:** 

## 2. Ranh Giới File Sửa Đổi (Colocation Audit)
- [ ] Chỉ sửa đổi các file trong phạm vi thư mục tính năng được giao.
- [ ] Không sửa đổi các file dùng chung ngoài phạm vi.

## 3. Bảng Tự Chấm Điểm Rubric (Thang 100)
- [ ] **Trụ 1: Chức năng:** Đầy đủ yêu cầu, xử lý lỗi biên, tương thích ngược (40/40)
- [ ] **Trụ 2: SSOT & Kiến trúc:** 100% hằng số import từ `@ssot`, đóng gói chuẩn (20/20)
- [ ] **Trụ 3: Rào chắn cứng:** 0 lỗi ESLint, 0 comment rác, WebGL `.dispose()` đủ (20/20)
- [ ] **Trụ 4: Bằng chứng thực thi:** Playwright E2E pass 100% (20/20)
- **Tổng điểm:** 100 / 100

## 4. Bằng Chứng Thực Thi Độc Lập
- [ ] Đính kèm ảnh chụp màn hình hoặc link video trace Playwright.
- [ ] Không có uncaught console errors.

## 5. Cam Kết Bất Biến
- [ ] Tuyệt đối KHÔNG sửa phiên bản tour có status `published`.
- [ ] Tuyệt đối KHÔNG xóa cứng dữ liệu database.
