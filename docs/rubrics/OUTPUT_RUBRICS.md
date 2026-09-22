# Bảng Tiêu Chí Chấm Điểm Đầu Ra (OUTPUT_RUBRICS.md)

> Thang điểm 100 nhị phân (Binary Scoring) bắt buộc cho mọi Pull Request do AI Agent khởi tạo.  
> **Điều kiện phê duyệt:** Đạt tuyệt đối **100/100 điểm**. Bất kỳ tiêu chí nào vi phạm (0 điểm) sẽ tự động bị hệ thống CI chặn đứng.

---

| Trụ Cột Đánh Giá | Tiêu Chí Kiểm Tra Cụ Thể | Điểm Tối Đa | Cơ Chế Kiểm Tra |
| :--- | :--- | :---: | :--- |
| **1. Tính Đúng Đắn Chức Năng** | Đáp ứng trọn vẹn 100% mục tiêu mô tả trong task | 20 | Đối soát yêu cầu |
| (Tổng 40 điểm) | Xử lý đầy đủ trường hợp biên (Null, rỗng, 403, 500) | 10 | Test boundary |
| | Không làm gãy cấu trúc JSON của TourVersion cũ | 10 | Backward schema |
| **2. Ranh Giới Kiến Trúc & SSOT**| 100% hằng số/routes import từ `@ssot`, không hardcode | 10 | Linter AST check |
| (Tổng 20 điểm) | Đóng gói đúng thư mục feature, không sửa lan | 10 | Git Diff bounds |
| **3. Rào Chắn Cứng & Linters** | 0 lỗi ESLint / Custom AST Linters | 10 | `npm run lint` |
| (Tổng 20 điểm) | 0 comment giải thích rác do AI tự sinh | 5 | AST Comment rule |
| | Giải phóng đầy đủ bộ nhớ WebGL Three.js (`dispose`) | 5 | AST Memory rule |
| **4. Bằng Chứng Thực Thi** | Kịch bản Playwright E2E chạy pass 100% | 10 | Playwright CLI |
| (Tổng 20 điểm) | Đính kèm video trace / screenshot kết quả chạy | 10 | PR Attachment |
| **TỔNG CỘNG** | **Điểm đạt yêu cầu bàn giao: 100 / 100** | **100** | **Automated Gate** |
