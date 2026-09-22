/**
 * UI/UX Data Formatters & Localization Helpers
 * QuanlyVR360 - Clean Enterprise Standard
 */

/**
 * Chuyển ngữ mã hành động kỹ thuật backend sang tiếng Việt tự nhiên
 * @param {string} action - Mã sự kiện (vd: tour_version_deleted)
 * @returns {string} Văn bản tiếng Việt thân thiện
 */
export function formatActivityAction(action) {
  if (!action) return "Hoạt động hệ thống";
  const dictionary = {
    project_created: "Đã tạo dự án mới",
    project_updated: "Đã cập nhật thông tin dự án",
    project_deleted: "Đã xóa dự án",
    location_created: "Đã thêm địa điểm tham quan",
    location_updated: "Đã cập nhật địa điểm",
    location_deleted: "Đã xóa địa điểm",
    tour_version_created: "Đã tạo bản nháp tour mới",
    tour_version_updated: "Đã cập nhật nội dung tour",
    tour_version_deleted: "Đã xóa bản nháp tour",
    tour_version_published: "Đã xuất bản tour công khai",
    tour_version_archived: "Đã lưu trữ phiên bản tour",
    domain_added: "Đã thêm tên miền whitelist",
    domain_removed: "Đã gỡ tên miền whitelist",
  };
  return dictionary[action] || action.replace(/_/g, " ");
}

/**
 * Rút gọn mã token 64 ký tự để hiển thị an toàn và gọn gàng trên thẻ
 * @param {string} token - Chuỗi token đầy đủ
 * @returns {string} Chuỗi rút gọn dạng 64a8...d2f1
 */
export function obscureToken(token) {
  if (!token || token.length < 16) return token || "Chưa có token";
  return `${token.slice(0, 8)}••••••••••••••••${token.slice(-8)}`;
}

/**
 * Xây dựng đường dẫn public trực tiếp cho tour
 * @param {string} token - Mã public_token
 * @returns {string} URL tuyệt đối để xem tour
 */
export function buildPublicTourUrl(token) {
  if (!token) return "";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/vr360/${token}`;
}
