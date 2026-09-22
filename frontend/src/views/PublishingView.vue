<script setup>
import { onMounted, reactive, ref } from "vue";

import { listProjectLocations } from "../api/locationsApi";
import {
  createDomain,
  deleteDomain,
  getPublishConfig,
  listDomains,
  publishLocation,
  regenerateToken,
  unpublishLocation,
  updateDomain,
  updatePublishConfig,
} from "../api/publishingApi";
import { listProjects } from "../api/projectsApi";
import { listVersions } from "../api/toursApi";
import { obscureToken, buildPublicTourUrl } from "../common/formatters";

const projects = ref([]);
const locations = ref([]);
const versions = ref([]);
const domains = ref([]);
const publishState = ref(null);
const selectedProjectId = ref("");
const selectedLocationId = ref("");
const selectedVersionId = ref("");
const errorMessage = ref("");
const copyMessage = ref("");

const domainForm = reactive({
  domain: "localhost:5173",
  label: "Frontend Domain (Thử nghiệm)", // Đã sửa lỗi chính tả Local fronnamed
});

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

async function loadProject() {
  const response = await listProjects();
  projects.value = normalizeResults(response.data);
  if (!selectedProjectId.value && projects.value.length)
    selectedProjectId.value = projects.value[0].id;
}

async function loadLocation() {
  if (!selectedProjectId.value) return;
  const response = await listProjectLocations(selectedProjectId.value);
  locations.value = normalizeResults(response.data);
  if (!selectedLocationId.value && locations.value.length)
    selectedLocationId.value = locations.value[0].id;
}

async function loadVersions() {
  if (!selectedLocationId.value) return;
  const response = await listVersions(selectedLocationId.value);
  versions.value = normalizeResults(response.data);
  selectedVersionId.value = versions.value[0]?.id || "";
}

async function loadPublish() {
  if (!selectedLocationId.value) return;
  const response = await getPublishConfig(selectedLocationId.value);
  publishState.value = response.data;
  const publishedVersion = response.data?.publish_config?.published_version;
  if (publishedVersion) {
    selectedVersionId.value = publishedVersion;
  }
  const domainsResponse = await listDomains(selectedLocationId.value);
  domains.value = normalizeResults(domainsResponse.data);
}

async function reloadAll() {
  await loadVersions();
  await loadPublish();
}

async function changeProject() {
  selectedLocationId.value = "";
  await loadLocation();
  await reloadAll();
}

async function publish() {
  errorMessage.value = "";
  try {
    await publishLocation(selectedLocationId.value, {
      published_version: selectedVersionId.value,
      is_active: true,
    });
    await loadPublish();
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || "Xuất bản không thành công.";
  }
}

async function toggleActive() {
  const current = publishState.value?.publish_config;
  if (!current) return;
  await updatePublishConfig(selectedLocationId.value, {
    is_active: !current.is_active,
  });
  await loadPublish();
}

async function renewToken() {
  if (!window.confirm("Cấp lại Token mới sẽ làm vô hiệu hóa đường link cũ. Bạn có chắc chắn?")) return;
  await regenerateToken(selectedLocationId.value);
  await loadPublish();
}

async function unpublish() {
  if (!window.confirm("Hủy xuất bản tour cho địa điểm này? Người dùng sẽ không thể truy cập công khai.")) return;
  await unpublishLocation(selectedLocationId.value);
  await loadPublish();
}

async function addDomain() {
  if (!domainForm.domain.trim()) return;
  await createDomain(selectedLocationId.value, {
    domain: domainForm.domain.trim(),
    label: domainForm.label.trim(),
    is_active: true,
  });
  domainForm.domain = "";
  domainForm.label = "";
  await loadPublish();
}

async function toggleDomain(domain) {
  await updateDomain(selectedLocationId.value, domain.id, {
    is_active: !domain.is_active,
  });
  await loadPublish();
}

async function removeDomain(domain) {
  if (!window.confirm(`Xóa tên miền ${domain.domain} khỏi danh sách whitelist?`)) return;
  await deleteDomain(selectedLocationId.value, domain.id);
  await loadPublish();
}

function copyPublicUrl() {
  const token = publishState.value?.publish_config?.public_token;
  if (!token) return;
  const url = buildPublicTourUrl(token);
  navigator.clipboard.writeText(url);
  copyMessage.value = "Đã sao chép link tour vào bộ nhớ tạm!";
  setTimeout(() => { copyMessage.value = ""; }, 3000);
}

function copyToken() {
  const token = publishState.value?.publish_config?.public_token;
  if (!token) return;
  navigator.clipboard.writeText(token);
  copyMessage.value = "Đã sao chép Token vào bộ nhớ tạm!";
  setTimeout(() => { copyMessage.value = ""; }, 3000);
}

async function boot() {
  await loadProject();
  await loadLocation();
  await reloadAll();
}

onMounted(boot);
</script>

<template>
  <section class="page publishing-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Xuất bản & Chia sẻ</p>
        <h1>Cấu hình tour công khai</h1>
      </div>
      <button class="secondary-button" type="button" @click="reloadAll">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        Làm mới
      </button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="copyMessage" class="success-message">{{ copyMessage }}</p>

    <!-- Chọn Bộ Lọc Dự Án - Địa Điểm - Phiên Bản -->
    <section class="panel selector-grid publish-selector-grid">
      <label>
        Dự án
        <select v-model="selectedProjectId" @change="changeProject">
          <option
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>
      </label>
      <label>
        Địa điểm
        <select v-model="selectedLocationId" @change="reloadAll">
          <option
            v-for="location in locations"
            :key="location.id"
            :value="location.id"
          >
            {{ location.name }}
          </option>
        </select>
      </label>
      <label>
        Phiên bản xuất bản
        <select v-model="selectedVersionId">
          <option
            v-for="version in versions"
            :key="version.id"
            :value="version.id"
          >
            v{{ version.version_number }} - {{ version.status }}
          </option>
        </select>
      </label>
      <button
        class="primary-button publish-button"
        type="button"
        @click="publish"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        Xuất bản Tour
      </button>
    </section>

    <section class="two-column">
      <!-- Thẻ Tổng Quan Xuất Bản Trực Quan (Thay thế khối JSON thô) -->
      <div class="panel publishing-overview-card">
        <div class="pub-card-header">
          <div>
            <span
              class="status-badge"
              :class="publishState?.publish_config?.is_active ? 'badge-active' : 'badge-inactive'"
            >
              {{ publishState?.publish_config?.is_active ? '● Đang xuất bản trực tiếp' : '○ Tạm dừng hoạt động' }}
            </span>
            <h2 class="pub-title mt-2">Thông tin xuất bản công khai</h2>
          </div>
          <span v-if="publishState?.publish_config?.published_version" class="version-tag">
            Phiên bản đang chạy: v{{ publishState.publish_config.published_version }}
          </span>
        </div>

        <div v-if="publishState?.publish_config" class="pub-details-grid">
          <div class="pub-info-item">
            <span class="info-label">Mã Token Công Khai (Public Token)</span>
            <div class="token-box">
              <code>{{ obscureToken(publishState.publish_config.public_token) }}</code>
              <button class="compact-button secondary-button" type="button" @click="copyToken" title="Sao chép toàn bộ Token">
                Sao chép Token
              </button>
            </div>
          </div>

          <div class="pub-info-item mt-3">
            <span class="info-label">Đường dẫn trực tiếp cho khách tham quan</span>
            <div class="url-action-group">
              <input
                readonly
                :value="buildPublicTourUrl(publishState.publish_config.public_token)"
                class="public-url-input"
              />
              <button class="primary-button compact-button" type="button" @click="copyPublicUrl">
                Sao Chép Link
              </button>
              <a
                :href="buildPublicTourUrl(publishState.publish_config.public_token)"
                target="_blank"
                class="secondary-button compact-button action-preview-link"
              >
                Xem Thử ↗
              </a>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>Chưa có cấu hình xuất bản cho địa điểm này. Vui lòng chọn phiên bản và bấm "Xuất bản Tour" ở trên.</p>
        </div>

        <div v-if="publishState?.publish_config" class="actions-row publish-config-actions mt-4">
          <button class="secondary-button" type="button" @click="toggleActive">
            {{ publishState?.publish_config?.is_active ? 'Tạm Dừng Hoạt Động' : 'Kích Hoạt Lại' }}
          </button>
          <button class="secondary-button" type="button" @click="renewToken">
            Cấp Lại Token Mới
          </button>
          <button class="ghost-danger-btn" type="button" @click="unpublish">
            Hủy Xuất Bản
          </button>
        </div>
      </div>

      <!-- Quản Lý Domain Whitelist -->
      <div class="panel domain-whitelist-panel">
        <div class="panel-title-row">
          <h2>Tên miền được phép nhúng (Whitelist)</h2>
          <small class="badge-subtle">{{ domains.length }} tên miền</small>
        </div>
        <form class="form mt-3" @submit.prevent="addDomain">
          <div class="form-field">
            <label class="field-label">Tên miền (Domain)</label>
            <input v-model="domainForm.domain" placeholder="Ví dụ: mywebsite.vn hoặc localhost:5173" />
          </div>
          <div class="form-field">
            <label class="field-label">Ghi chú (Label)</label>
            <input v-model="domainForm.label" placeholder="Ví dụ: Web chính thức công ty" />
          </div>
          <button class="primary-button" type="submit">+ Thêm Tên Miền</button>
        </form>

        <ul class="activity-list domain-list mt-4">
          <li v-for="domain in domains" :key="domain.id" class="domain-item">
            <div class="domain-item-info">
              <strong>{{ domain.domain }}</strong>
              <span>{{ domain.label || "Không có nhãn" }} · <em :class="domain.is_active ? 'text-success' : 'text-muted'">{{ domain.is_active ? 'Đang hoạt động' : 'Tắt' }}</em></span>
            </div>
            <div class="actions-row">
              <button
                class="secondary-button compact-button"
                type="button"
                @click="toggleDomain(domain)"
              >
                {{ domain.is_active ? 'Tắt' : 'Bật' }}
              </button>
              <button
                class="ghost-danger-btn compact-button"
                type="button"
                @click="removeDomain(domain)"
              >
                Xóa
              </button>
            </div>
          </li>
          <li v-if="!domains.length" class="muted text-center py-3">
            Chưa có tên miền nào được thêm vào whitelist.
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>
