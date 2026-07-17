# Tài liệu chuẩn Frontend — Project `cms-tina-web`

> Tài liệu này dành cho frontend developer mới gia nhập team. Mục tiêu: hiểu đúng cấu trúc project, quy ước đặt tên, và pattern viết code hiện tại để code mới nhất quán với code cũ.

---

## 1. Tổng quan công nghệ

| Hạng mục | Công nghệ |
|---|---|
| Framework | Vue 3 (`vue@3.2.45`), Composition API + `<script setup>` |
| Build tool | Vue CLI 5 (`@vue/cli-service`) — **không phải Vite** |
| Ngôn ngữ | JavaScript thuần — **không dùng TypeScript** (không có `tsconfig.json`) |
| Router | `vue-router@4` |
| State management | **Pinia** (dùng cho code mới) + **Vuex** (code cũ, chỉ còn giữ cho auth/layout/theme gốc) |
| UI/CSS | Bootstrap 5 + `bootstrap-vue-3` (theme admin Velzon) là chính; PrimeVue dùng bổ sung cho một số component mới; SCSS |
| HTTP | Axios (`helpers/api/axiosHttp.js`) là lớp khuyến nghị; còn tồn tại lớp `fetch` cũ song song |
| Form validate | `@vuelidate` |
| i18n | `vue-i18n` (8 ngôn ngữ, file JSON trong `src/lang/`) |
| Rich text | CKEditor 5 |
| Chart/Map | Chart.js, ApexCharts, ECharts, Leaflet, MapLibre GL, deck.gl (dự án có phần bản đồ khá nặng) |
| Lint | ESLint, cấu hình rỗng trong `package.json` (mức "essential", gần như không ép style) |
| Format | **Không có Prettier** — chưa có auto-format thống nhất |
| Test | **Chưa có** (không Jest/Vitest/Cypress, không thư mục test nào) |

**Lệnh chạy dự án:**
```bash
npm install
npm run serve   # dev server
npm run build   # build production
npm run lint    # eslint
```
Cần khai báo các biến môi trường trong `.env`: `VUE_APP_SERVER_URL`, `VUE_APP_WS_URL`, `VUE_APP_ID_ORGANIZATION`.

---

## 2. Cấu trúc thư mục gốc

```
cms-tina-web/
├── .env / .env.production     # biến môi trường Vue CLI
├── app.config.json            # metadata tên/mô tả app
├── babel.config.js
├── public/                    # index.html, static assets
├── src/                       # toàn bộ mã nguồn (xem mục 3)
├── vue.config.js              # cấu hình Vue CLI (devServer, webpack fallback)
├── package.json                # eslintConfig nằm trong file này
└── docs/                       # tài liệu team (file này)
```

---

## 3. Cấu trúc bên trong `src/`

Dự án **không** tổ chức theo mô hình cổ điển "1 thư mục components + 1 thư mục views" cho toàn app. Thay vào đó dùng **mô hình feature-module**: mỗi domain nghiệp vụ là 1 thư mục cấp 1 tên `app_<domain>`, cộng với lớp hạ tầng dùng chung.

### 3.1. Lớp hạ tầng dùng chung

| Thư mục | Vai trò | Ví dụ |
|---|---|---|
| `src/base/components/` | Component UI dùng chung toàn app | `menu.vue` (sidebar), `form/builder/FormManage.vue`, `dtwinUI/Modal.vue` |
| `src/base/layouts/` | Layout khung trang | `vertical.vue`, `LayoutDtwin2025.vue` |
| `src/base/common/` | Composable UI dùng chung | `useSwal.js` (confirm dialog) |
| `src/helpers/api/` | Lớp giao tiếp API gốc | `axiosHttp.js`, `useAxios.js`, `token.js` |
| `src/helpers/state/` | Vuex store cũ | `store.js`, `modules/auth.js`, `modules/layout.js` |
| `src/helpers/utils/` | Hàm tiện ích chung | `config_system.js`, `debounce.js`, `catchErrors.js` |
| `src/composables/` | Composable dùng chung (Vue 3) | `useLoading.js`, `useTranslate.js` |
| `src/router/` | Router gốc, gom route mọi module | `index.js`, `routes.js`, `middleware/authencation.js` |
| `src/assets/` | Ảnh, font, SCSS toàn cục | `scss/config/default/app.scss` |
| `src/lang/` | File JSON đa ngôn ngữ | `en.json`, `fr.json` |

**Điểm kiến trúc quan trọng nhất cần nắm trước tiên:** `src/app_manage_dynamic_api/` là một "framework CRUD nội bộ" cung cấp engine gọi API/list/pagination (`hook/state/manage_data.js`) và layout xem chi tiết bản ghi (`layout/record/LayoutRecord.vue`). Component `FormManage.vue` (`src/base/components/form/builder/FormManage.vue`) build trên nền engine này. **Phần lớn trang danh sách/CRUD trong toàn bộ app** (bài viết, danh mục, người dùng...) chỉ cần nhúng:
```vue
<FormManage sourceApi="posts" ... />
```
thay vì tự viết bảng + phân trang từ đầu. Dev mới nên đọc kỹ 2 file này trước khi bắt đầu làm trang CRUD mới.

### 3.2. Feature-module (`app_xxx`)

Danh sách module hiện có: `app_auth`, `app_manage_posts`, `app_manage_categories`, `app_manage_dynamic_api`, `app_dashboard_reports`, `app_system_config_tina` (= "home-settings"), `app_user`, `app_organizations`, `app_notification`, `app_comments`, `app_backup`, `app_system_manage`, v.v.

Cấu trúc chuẩn của 1 module:
```
app_xxx/
├── router.js         # export default function(path) → mảng route, gắn prefix path
├── pages/            # mỗi file .vue = 1 route/trang
├── components/       # component riêng của module
├── composables/      # composable riêng (nếu cần)
└── config/           # config tĩnh riêng (vd cấu hình cột search)
```

Ví dụ thực tế (`src/app_manage_posts/`):
```
components/ArticleViewer.vue, FormPost.vue, SearchSidebar.vue, WorkflowPreview.vue
composables/useCitation.js
config/search.js
pages/ManagePost.vue, CreatePost.vue, EditPost.vue, MyRequest.vue
router.js
```

**Khi tạo module mới, làm theo checklist:**
1. Tạo thư mục `src/app_<ten_module>/` với `router.js` + `pages/`.
2. `router.js` export 1 hàm `function(path)`, map route tĩnh gắn prefix, mỗi route có `meta: { title, name, icon, showMenu, requiresAuth, cpuiaPermission }`.
3. Import và mount trong `src/router/routes.js`:
   ```js
   import app_ten_module from "@/app_ten_module/router.js";
   ...app_ten_module(manageRouter + "/ten-module"),
   ```
4. Trang danh sách nên ưu tiên dùng `FormManage` thay vì tự viết bảng.

---

## 4. Quy ước đặt tên

| Đối tượng | Quy ước | Ví dụ |
|---|---|---|
| Thư mục feature-module (cấp 1 trong `src/`) | `snake_case`, tiền tố `app_` | `app_manage_posts`, `app_system_config_tina` |
| Component `.vue` | `PascalCase` | `FormManage.vue`, `ManagePost.vue`, `ArticleViewer.vue` |
| File logic JS (helper/service) | `camelCase` | `axiosHttp.js`, `useAxios.js`, `mediaSigned.js` |
| Composable | tiền tố `use` + `camelCase` | `useLoading.js`, `useSwal.js`, `useCitation.js` |
| Pinia store | `camelCase` + hậu tố `Store`, đặt **cùng cấp với page dùng nó** trong `pages/<feature>/` (không có thư mục `stores/` tập trung) | `src/app_user/pages/manage_user/userStore.js` |
| Route file mỗi module | luôn tên `router.js` | — |
| Tên route (`name`) | `PascalCase` không dấu | `PostsTinaAdd`, `EditTinaAdd` |

**Lưu ý:** một số file cũ kế thừa từ theme Velzon gốc dùng kebab-case/thường (`menu.vue`, `nav-bar.vue`, `footer.vue`) — đây là ngoại lệ lịch sử, **không nhân rộng** cho code mới. Quy ước chính thức cho code mới: component = `PascalCase.vue`, composable = `useCamelCase.js`, store = `featureNameStore.js`.

---

## 5. Quản lý state

Project tồn tại **song song 2 hệ quản lý state** — cần biết để không dùng nhầm:

- **Pinia (khuyến nghị cho code mới):** `defineStore("useXxxStore", () => {...})` theo **style Composition API** (không dùng object style `state/actions/getters`). Đặt file store cùng cấp thư mục `pages/<feature>/` chứ không gom vào `src/stores/`.
- **Vuex (chỉ dùng cho phần cũ):** `src/helpers/state/modules/` — quản lý auth, layout, notification gốc của theme. Module mới **không nên** thêm Vuex module mới, chỉ dùng Pinia.

---

## 6. Gọi API

Có **2 lớp gọi API song song**, cần thống nhất dùng lớp Axios cho code mới:

### 6.1. Lớp Axios (khuyến nghị)
- Base URL: `src/helpers/utils/config_system.js` đọc từ `process.env.VUE_APP_SERVER_URL`.
- Instance + interceptor tự refresh token: `src/helpers/api/axiosHttp.js`.
- Factory dùng trong component: `src/helpers/api/useAxios.js` → `API().get/post/put/patch/remove/call/custom(...)`.
  ```js
  import { API } from "@/helpers/api/useAxios";
  await API().post(`posts/${id}/archive/`, {}, "Lưu thành công", "Có lỗi xảy ra");
  ```
  `API()` tự gắn Authorization header, tự bắt lỗi (kể cả lỗi dạng Django REST serializer), tự hiện toast nếu truyền tham số thông báo.
- Dialog xác nhận trước khi gọi API: dùng `useSwal()` (`src/base/common/useSwal.js`) thay vì gọi SweetAlert2 trực tiếp.

### 6.2. Lớp fetch thuần (code cũ, không dùng cho code mới)
- `src/helpers/api/api.js` — `useFetch`, `usePost`... Không có xử lý lỗi/toast tập trung như lớp Axios. Chỉ còn tồn tại trong một số Pinia store cũ, không nên viết thêm theo pattern này.

### 6.3. Ghi chú
- Backend trả lỗi theo format Django REST serializer (`{"field": ["msg"]}`), lớp Axios đã tự parse và gộp thành toast — không cần tự xử lý lại.
- Chưa có thư mục `services/` tập trung theo domain — mỗi page/store tự gọi `API().get('posts/...')` bằng URL string trực tiếp. Khi code mới lớn dần, cân nhắc tách service riêng cho từng domain thay vì rải URL string khắp nơi.

---

## 7. Code style

- ESLint cấu hình trong `package.json` (mục `eslintConfig`), extends `plugin:vue/vue3-essential` + `eslint:recommended`, **không có rule custom** — chỉ bắt lỗi cú pháp Vue cơ bản.
- **Không có Prettier** → chưa auto-format. Dev mới nên tự giữ format nhất quán với file xung quanh (thụt lề 2 space, dùng `<script setup>`, single quote) cho đến khi team thống nhất thêm Prettier.
- Ưu tiên `<script setup>` + Composition API cho mọi component mới (không viết Options API mới).
- Không dùng TypeScript — prop validate bằng `defineProps({...})` runtime (type + default).

---

## 8. Những khoảng trống cần lưu ý (để tránh làm sai)

1. **README.md gốc gần như trống** — tài liệu này bổ sung phần đó.
2. **Không có test tự động** — khi thêm tính năng mới, không có CI kiểm tra hồi quy, cần tự kiểm thử thủ công kỹ trước khi merge.
3. **2 hệ state (Vuex/Pinia) và 2 lớp API (axios/fetch) tồn tại song song** — code mới bắt buộc dùng Pinia + lớp Axios (`useAxios.js`), không thêm Vuex module hay `fetch` helper mới.
4. **`vue.config.js` tắt overlay lỗi runtime khi dev** — lỗi sẽ không hiện to trên trình duyệt, phải xem console/terminal.
5. Quy ước màu icon trong menu dropdown (tham khảo thêm `.claude/DECISION_LOG.md`): `text-warning` = đổi mật khẩu, `text-danger` = khoá/xoá, `text-primary` = xem nhật ký, `text-info` = xem chi tiết, `text-secondary` = chỉnh sửa — nên giữ nhất quán khi thêm action mới vào các trang quản lý.

---

## 9. Checklist nhanh cho dev mới trước khi code

- [ ] Đã chạy được `npm run serve` với `.env` đầy đủ biến.
- [ ] Đã đọc `src/app_manage_dynamic_api/` và `FormManage.vue` trước khi làm trang CRUD mới.
- [ ] Trang mới dùng Pinia (không Vuex), gọi API qua `useAxios.js` (không `fetch` thuần).
- [ ] Đặt tên module/thư mục/file đúng quy ước ở mục 4.
- [ ] Route mới có đủ `meta.title/name/icon/requiresAuth`.
- [ ] Chạy `npm run lint` trước khi commit.
