<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { createLocation, deleteLocation, listProjectLocations, updateLocation, uploadLocationThumbnail } from '../api/locationsApi';
import { createProject, deleteProject, listProjects, updateProject } from '../api/projectsApi';
import { createVersion, deleteVersion, listVersions } from '../api/toursApi';

const router = useRouter();

const projects = ref([]);
const locations = ref([]);
const versions = ref([]);
const selectedProjectId = ref('');
const selectedLocationId = ref('');
const selectedVersionId = ref('');
const loading = ref(false);
const loadingLocations = ref(false);
const loadingVersions = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const editModal = ref(null);
const versionModal = ref(false);
const mobileTab = ref('projects'); // 'projects' | 'locations' | 'versions'
let messageTimer = null;

const projectForm = reactive({
  name: '',
  description: '',
});

const versionForm = reactive({
  label: '',
  source_version_id: '',
  background_audio_file: null,
  hotspot_point_logo_file: null,
});

const editForm = reactive({
  id: '',
  type: '',
  name: '',
  description: '',
  is_active: true,
  thumbnail: '',
  thumbnail_file: null,
  thumbnail_preview: '',
  latitude: '',
  longitude: '',
});

const selectedProject = computed(() => projects.value.find((project) => String(project.id) === String(selectedProjectId.value)) || null);
const selectedLocation = computed(() => locations.value.find((location) => String(location.id) === String(selectedLocationId.value)) || null);

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function extractApiError(error, fallback) {
  const data = error.response?.data;
  if (!data) return error.message || fallback;
  if (typeof data === 'string') return data.slice(0, 240) || fallback;
  if (data.detail) return data.detail;
  if (data.non_field_errors?.length) return data.non_field_errors[0];
  const firstKey = Object.keys(data)[0];
  const firstValue = firstKey ? data[firstKey] : null;
  if (Array.isArray(firstValue)) return `${firstKey}: ${firstValue[0]}`;
  if (typeof firstValue === 'string') return `${firstKey}: ${firstValue}`;
  return fallback;
}

function versionLabel(version) {
  const label = version.label ? ` - ${version.label}` : '';
  return `v${version.version_number}${label}`;
}

function isPublishedVersion(version) {
  const status = String(version?.status || '').trim().toLowerCase();
  return status === 'published' || status === 'đã xuất bản' || status === 'da xuat ban';
}

function scheduleMessageAutoDismiss() {
  clearTimeout(messageTimer);
  if (!errorMessage.value && !successMessage.value) return;
  const currentError = errorMessage.value;
  const currentSuccess = successMessage.value;
  messageTimer = setTimeout(() => {
    if (errorMessage.value === currentError) errorMessage.value = '';
    if (successMessage.value === currentSuccess) successMessage.value = '';
  }, 2500);
}

async function loadProjects() {
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await listProjects();
    projects.value = normalizeResults(response.data);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Không thể tải danh sách dự án.';
  } finally {
    loading.value = false;
  }
}

async function selectProject(project) {
  selectedProjectId.value = String(project.id);
  selectedLocationId.value = '';
  selectedVersionId.value = '';
  locations.value = [];
  versions.value = [];
  mobileTab.value = 'locations'; // Chuyển tab trên mobile
  await loadLocations(project.id);
}

async function loadLocations(projectId = selectedProjectId.value) {
  if (!projectId) return;
  loadingLocations.value = true;
  errorMessage.value = '';
  try {
    const response = await listProjectLocations(projectId);
    locations.value = normalizeResults(response.data);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Không thể tải danh sách địa điểm.';
  } finally {
    loadingLocations.value = false;
  }
}

async function selectLocation(location) {
  selectedLocationId.value = String(location.id);
  selectedVersionId.value = '';
  versions.value = [];
  mobileTab.value = 'versions'; // Chuyển tab trên mobile
  await loadVersionsForLocation(location.id);
}

async function loadVersionsForLocation(locationId = selectedLocationId.value) {
  if (!locationId) return;
  loadingVersions.value = true;
  errorMessage.value = '';
  try {
    const response = await listVersions(locationId);
    versions.value = normalizeResults(response.data);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Không thể tải danh sách phiên bản.';
  } finally {
    loadingVersions.value = false;
  }
}

async function submitProject() {
  if (!projectForm.name.trim()) {
    errorMessage.value = 'Tên dự án là bắt buộc.';
    return;
  }
  errorMessage.value = '';
  successMessage.value = '';
  try {
    const response = await createProject({
      name: projectForm.name.trim(),
      description: projectForm.description.trim(),
      is_active: true,
    });
    projectForm.name = '';
    projectForm.description = '';
    successMessage.value = 'Đã tạo dự án thành công.';
    await loadProjects();
    const project = projects.value.find((item) => item.id === response.data.id);
    if (project) await selectProject(project);
  } catch (error) {
    errorMessage.value = extractApiError(error, 'Không thể tạo dự án.');
  }
}

async function submitLocation() {
  if (!selectedProjectId.value) {
    errorMessage.value = 'Vui lòng chọn một dự án trước.';
    return;
  }
  if (!editForm.name.trim()) {
    errorMessage.value = 'Tên địa điểm là bắt buộc.';
    return;
  }
  errorMessage.value = '';
  successMessage.value = '';
  const payload = {
    name: editForm.name.trim(),
    description: editForm.description.trim(),
    is_active: editForm.is_active,
  };
  if (editForm.latitude !== '') payload.latitude = Number(editForm.latitude);
  if (editForm.longitude !== '') payload.longitude = Number(editForm.longitude);

  try {
    const response = await createLocation(selectedProjectId.value, payload);
    if (editForm.thumbnail_file) {
      await uploadLocationThumbnail(response.data.id, editForm.thumbnail_file);
    }
    successMessage.value = 'Đã tạo địa điểm thành công.';
    await loadLocations();
    const location = locations.value.find((item) => item.id === response.data.id);
    if (location) await selectLocation(location);
    closeEditModal();
  } catch (error) {
    errorMessage.value = extractApiError(error, 'Không thể tạo địa điểm.');
  }
}

function openProjectEdit(project) {
  clearEditThumbnailPreview();
  editModal.value = 'project';
  editForm.id = project.id;
  editForm.type = 'project';
  editForm.name = project.name || '';
  editForm.description = project.description || '';
  editForm.is_active = Boolean(project.is_active);
  editForm.thumbnail = project.thumbnail || '';
  editForm.latitude = '';
  editForm.longitude = '';
}

function openLocationEdit(location) {
  clearEditThumbnailPreview();
  editModal.value = 'location';
  editForm.id = location.id;
  editForm.type = 'location';
  editForm.name = location.name || '';
  editForm.description = location.description || '';
  editForm.is_active = Boolean(location.is_active);
  editForm.thumbnail = location.thumbnail || '';
  editForm.latitude = location.latitude ?? '';
  editForm.longitude = location.longitude ?? '';
}

function openLocationCreate() {
  if (!selectedProjectId.value) {
    errorMessage.value = 'Vui lòng chọn một dự án trước.';
    return;
  }
  clearEditThumbnailPreview();
  editModal.value = 'create_location';
  editForm.id = '';
  editForm.type = 'create_location';
  editForm.name = '';
  editForm.description = '';
  editForm.is_active = true;
  editForm.thumbnail = '';
  editForm.latitude = '';
  editForm.longitude = '';
}

function closeEditModal() {
  clearEditThumbnailPreview();
  editModal.value = null;
  editForm.id = '';
  editForm.type = '';
  editForm.name = '';
  editForm.description = '';
  editForm.is_active = true;
  editForm.thumbnail = '';
  editForm.thumbnail_file = null;
  editForm.thumbnail_preview = '';
  editForm.latitude = '';
  editForm.longitude = '';
}

function clearEditThumbnailPreview() {
  if (editForm.thumbnail_preview) URL.revokeObjectURL(editForm.thumbnail_preview);
  editForm.thumbnail_preview = '';
  editForm.thumbnail_file = null;
}

function onEditThumbnailChange(event) {
  const file = event.target.files?.[0] || null;
  if (editForm.thumbnail_preview) URL.revokeObjectURL(editForm.thumbnail_preview);
  editForm.thumbnail_file = file;
  editForm.thumbnail_preview = file ? URL.createObjectURL(file) : '';
}

async function submitEdit() {
  if (!editForm.name.trim()) {
    errorMessage.value = 'Tên là bắt buộc.';
    return;
  }
  errorMessage.value = '';
  successMessage.value = '';
  const payload = {
    name: editForm.name.trim(),
    description: editForm.description.trim(),
    is_active: editForm.is_active,
  };
  try {
    if (editForm.type === 'project') {
      await updateProject(editForm.id, payload);
      successMessage.value = 'Đã cập nhật dự án.';
      await loadProjects();
      if (String(selectedProjectId.value) === String(editForm.id)) await loadLocations();
    } else if (editForm.type === 'location') {
      payload.latitude = editForm.latitude === '' ? null : Number(editForm.latitude);
      payload.longitude = editForm.longitude === '' ? null : Number(editForm.longitude);
      await updateLocation(editForm.id, payload);
      if (editForm.thumbnail_file) {
        await uploadLocationThumbnail(editForm.id, editForm.thumbnail_file);
      }
      successMessage.value = 'Đã cập nhật địa điểm.';
      await loadLocations();
      if (String(selectedLocationId.value) === String(editForm.id)) await loadVersionsForLocation();
    } else if (editForm.type === 'create_location') {
      await submitLocation();
      return;
    }
    closeEditModal();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Không thể cập nhật.';
  }
}

async function removeProject(project) {
  const ok = window.confirm(`Xác nhận xóa mềm dự án "${project.name}"?`);
  if (!ok) return;
  errorMessage.value = '';
    successMessage.value = '';
  try {
    await deleteProject(project.id);
    successMessage.value = 'Đã xóa dự án.';
    if (String(selectedProjectId.value) === String(project.id)) {
      selectedProjectId.value = '';
      selectedLocationId.value = '';
      locations.value = [];
      versions.value = [];
      mobileTab.value = 'projects';
    }
    await loadProjects();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Không thể xóa dự án.';
  }
}

async function removeLocation(location) {
  const ok = window.confirm(`Xác nhận xóa mềm địa điểm "${location.name}"?`);
  if (!ok) return;
  errorMessage.value = '';
    successMessage.value = '';
  try {
    await deleteLocation(location.id);
    successMessage.value = 'Đã xóa địa điểm.';
    if (String(selectedLocationId.value) === String(location.id)) {
      selectedLocationId.value = '';
      versions.value = [];
      mobileTab.value = 'locations';
    }
    await loadLocations();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Không thể xóa địa điểm.';
  }
}

async function removeVersion(version) {
  const ok = window.confirm(`Xác nhận xóa ${versionLabel(version)}? Chỉ bản nháp mới có thể xóa.`);
  if (!ok) return;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await deleteVersion(selectedLocationId.value, version.id);
    successMessage.value = 'Đã xóa bản nháp phiên bản.';
    await loadVersionsForLocation();
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Không thể xóa phiên bản.';
  }
}

function openVersionModal() {
  if (!selectedLocationId.value) {
    errorMessage.value = 'Vui lòng chọn địa điểm trước.';
    return;
  }
  versionForm.label = '';
  versionForm.source_version_id = versions.value[0]?.id || '';
  versionForm.background_audio_file = null;
  versionForm.hotspot_point_logo_file = null;
  versionModal.value = true;
}

function closeVersionModal() {
  versionModal.value = false;
  versionForm.label = '';
  versionForm.source_version_id = '';
  versionForm.background_audio_file = null;
  versionForm.hotspot_point_logo_file = null;
}

function onVersionAudioChange(event) {
  versionForm.background_audio_file = event.target.files?.[0] || null;
}

function onVersionLogoChange(event) {
  versionForm.hotspot_point_logo_file = event.target.files?.[0] || null;
}

async function submitVersion() {
  if (!selectedLocationId.value) {
    errorMessage.value = 'Vui lòng chọn địa điểm trước.';
    return;
  }
  errorMessage.value = '';
  successMessage.value = '';
  try {
    const label = versionForm.label.trim() || `${selectedLocation.value?.name || 'Tour'} bản nháp`;
    const payload = {
      label,
      changelog: 'Khởi tạo từ luồng quản trị Projects.',
      background_audio_file: versionForm.background_audio_file,
      hotspot_point_logo_file: versionForm.hotspot_point_logo_file,
    };
    if (versionForm.source_version_id) {
      payload.source_version_id = versionForm.source_version_id;
    } else {
      payload.data = {
        title: label,
        scenes: [],
      };
    }
    await createVersion(selectedLocationId.value, payload);
    closeVersionModal();
    successMessage.value = 'Đã tạo phiên bản mới thành công.';
    await loadVersionsForLocation();
  } catch (error) {
    errorMessage.value = extractApiError(error, 'Không thể tạo phiên bản.');
  }
}

function openViewer(version) {
  router.push({
    path: '/viewer',
    query: {
      project: selectedProjectId.value,
      location: selectedLocationId.value,
      version: version.id,
    },
  });
}

function openBuilder(version = null) {
  const projectId = selectedProjectId.value ? String(selectedProjectId.value) : '';
  const locationId = version?.location
    ? String(version.location)
    : selectedLocationId.value
      ? String(selectedLocationId.value)
      : '';
  const versionId = version?.id ? String(version.id) : '';

  if (!projectId || !locationId || !versionId) {
    errorMessage.value = 'Không xác định được project, location hoặc version cần chỉnh sửa.';
    return;
  }
  if (isPublishedVersion(version)) {
    errorMessage.value = 'Phiên bản đã xuất bản không thể chỉnh sửa trực tiếp. Vui lòng mở bản nháp.';
    return;
  }
  selectedVersionId.value = versionId;
  router.push({
    name: 'Builder',
    query: {
      project: projectId,
      location: locationId,
      version: versionId,
    },
  });
}

watch([errorMessage, successMessage], scheduleMessageAutoDismiss);

onMounted(loadProjects);

onBeforeUnmount(() => {
  clearTimeout(messageTimer);
  clearEditThumbnailPreview();
});
</script>

<template>
  <section class="page projects-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Quản lý nội dung</p>
        <h1>Dự án & Không gian VR360</h1>
        <p class="muted">Chọn dự án, chọn địa điểm, sau đó biên tập hoặc xem trước phiên bản trong Viewer.</p>
      </div>
      <button class="secondary-button" type="button" @click="loadProjects">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        Làm mới
      </button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <!-- Form Tạo Nhanh Dự Án có nhãn Label tiếp cận chuẩn a11y -->
    <section class="panel project-quick-create">
      <form class="inline-form" @submit.prevent="submitProject">
        <div class="form-field">
          <label for="quick-proj-name" class="field-label">Tên dự án mới <span class="required">*</span></label>
          <input id="quick-proj-name" v-model="projectForm.name" placeholder="Ví dụ: Dự án Du lịch Tràng An" />
        </div>
        <div class="form-field">
          <label for="quick-proj-desc" class="field-label">Mô tả ngắn</label>
          <input id="quick-proj-desc" v-model="projectForm.description" placeholder="Mô tả tóm tắt mục tiêu dự án" />
        </div>
        <button class="primary-button self-end" type="submit">+ Tạo Dự Án</button>
      </form>
    </section>

    <!-- Mobile Flow Tabs Segmented Control (Chỉ hiển thị trên mobile để tránh tràn lề ngang) -->
    <div class="mobile-flow-tabs">
      <button
        type="button"
        :class="{ active: mobileTab === 'projects' }"
        @click="mobileTab = 'projects'"
      >
        1. Dự án ({{ projects.length }})
      </button>
      <button
        type="button"
        :class="{ active: mobileTab === 'locations' }"
        @click="mobileTab = 'locations'"
      >
        2. Địa điểm ({{ locations.length }})
      </button>
      <button
        type="button"
        :class="{ active: mobileTab === 'versions' }"
        @click="mobileTab = 'versions'"
      >
        3. Phiên bản ({{ versions.length }})
      </button>
    </div>

    <!-- 3-Column Project Flow Grid -->
    <section class="project-flow">
      <!-- Cột 1: Danh Sách Dự Án -->
      <div
        class="panel project-flow-column"
        :class="{ 'mobile-hidden': mobileTab !== 'projects' }"
      >
        <div class="panel-title-row">
          <h2>1. Dự án</h2>
          <span class="muted badge-count">{{ projects.length }}</span>
        </div>
        <p v-if="loading" class="muted">Đang tải danh sách dự án...</p>
        <article
          v-for="project in projects"
          :key="project.id"
          class="flow-card"
          :class="{ active: String(project.id) === String(selectedProjectId) }"
          role="button"
          tabindex="0"
          @click="selectProject(project)"
          @keydown.enter.prevent="selectProject(project)"
          @keydown.space.prevent="selectProject(project)"
        >
          <strong>{{ project.name }}</strong>
          <span>{{ project.description || 'Chưa có mô tả' }}</span>
          <small>{{ project.locations_count || 0 }} địa điểm · {{ project.is_active ? 'Đang hoạt động' : 'Tạm dừng' }}</small>
          
          <!-- Action Hierarchy: Sửa là nút phụ viền rõ, Xóa là Ghost Destructive xám nhạt -->
          <div class="actions-row mt-2">
            <button class="secondary-action-btn" type="button" @click.stop="openProjectEdit(project)">
              Sửa
            </button>
            <button class="ghost-danger-btn" type="button" @click.stop="removeProject(project)">
              Xóa
            </button>
          </div>
        </article>
        <p v-if="!projects.length && !loading" class="muted">Chưa có dự án nào.</p>
      </div>

      <!-- Cột 2: Danh Sách Địa Điểm -->
      <div
        class="panel project-flow-column"
        :class="{ 'mobile-hidden': mobileTab !== 'locations' }"
      >
        <div class="panel-title-row">
          <h2>2. Địa điểm</h2>
          <span class="muted badge-count">{{ locations.length }}</span>
        </div>

        <button
          v-if="selectedProject"
          class="secondary-button mb-2"
          type="button"
          @click="openLocationCreate"
        >
          + Thêm địa điểm mới
        </button>

        <p v-if="!selectedProject" class="muted">Chọn một dự án ở cột 1 để xem địa điểm.</p>
        <p v-else-if="loadingLocations" class="muted">Đang tải địa điểm...</p>
        <article
          v-for="location in locations"
          :key="location.id"
          class="flow-card"
          :class="{ active: String(location.id) === String(selectedLocationId) }"
          role="button"
          tabindex="0"
          @click="selectLocation(location)"
          @keydown.enter.prevent="selectLocation(location)"
          @keydown.space.prevent="selectLocation(location)"
        >
          <strong>{{ location.name }}</strong>
          <span>{{ location.description || selectedProject?.name }}</span>
          <small>{{ location.is_active ? 'Đang hoạt động' : 'Tạm dừng' }}</small>
          
          <div class="actions-row mt-2">
            <button class="secondary-action-btn" type="button" @click.stop="openLocationEdit(location)">
              Sửa
            </button>
            <button class="ghost-danger-btn" type="button" @click.stop="removeLocation(location)">
              Xóa
            </button>
          </div>
        </article>
        <p v-if="selectedProject && !locations.length && !loadingLocations" class="muted">Chưa có địa điểm nào trong dự án này.</p>
      </div>

      <!-- Cột 3: Danh Sách Phiên Bản Tour -->
      <div
        class="panel project-flow-column"
        :class="{ 'mobile-hidden': mobileTab !== 'versions' }"
      >
        <div class="panel-title-row">
          <h2>3. Phiên bản</h2>
          <span class="muted badge-count">{{ versions.length }}</span>
        </div>
        <button
          v-if="selectedLocation"
          class="secondary-button mb-2"
          type="button"
          @click="openVersionModal"
        >
          + Tạo phiên bản mới
        </button>
        <p v-if="!selectedLocation" class="muted">Chọn một địa điểm ở cột 2 để xem phiên bản tour.</p>
        <p v-else-if="loadingVersions" class="muted">Đang tải phiên bản...</p>
        <article
          v-for="version in versions"
          :key="version.id"
          class="flow-card version-card"
        >
          <strong>{{ versionLabel(version) }}</strong>
          <span>{{ version.changelog || selectedLocation?.name }}</span>
          <small>Trạng thái: {{ version.status }} · {{ version.scene_assets_count || 0 }} cảnh</small>
          <div class="actions-row mt-2">
            <button class="primary-button compact-button" type="button" @click="openViewer(version)">
              Xem Tour
            </button>
            <button
              class="secondary-action-btn"
              type="button"
              :aria-disabled="isPublishedVersion(version) ? 'true' : 'false'"
              :title="isPublishedVersion(version) ? 'Version published không thể chỉnh sửa' : 'Chỉnh sửa version'"
              @click.stop="openBuilder(version)"
            >
              Chỉnh Sửa
            </button>
            <button class="ghost-danger-btn" type="button" @click="removeVersion(version)">
              Xóa
            </button>
          </div>
        </article>
        <div v-if="selectedLocation && !versions.length && !loadingVersions" class="empty-flow-card">
          <p class="muted">Chưa có phiên bản tour nào.</p>
        </div>
      </div>
    </section>

    <!-- Modal Tạo Phiên Bản Mới -->
    <div v-if="versionModal" class="builder-modal-backdrop" @click.self="closeVersionModal">
      <div class="builder-modal builder-modal-small">
        <div class="builder-modal-header">
          <h2>Tạo phiên bản tour mới</h2>
          <button type="button" @click="closeVersionModal" aria-label="Đóng">×</button>
        </div>
        <form class="form" @submit.prevent="submitVersion">
          <div class="form-field">
            <label class="field-label">Tên nhãn phiên bản</label>
            <input v-model="versionForm.label" placeholder="Để trống sẽ tự động đặt tên theo thứ tự" />
          </div>
          <div class="form-field">
            <label class="field-label">Kế thừa từ phiên bản trước</label>
            <select v-model="versionForm.source_version_id">
              <option value="">Tạo phiên bản rỗng</option>
              <option v-for="item in versions" :key="item.id" :value="item.id">
                {{ versionLabel(item) }} - {{ item.status }}
              </option>
            </select>
          </div>
          <p class="muted text-sm">
            Nếu chọn kế thừa, bản nháp mới sẽ sao chép toàn bộ cảnh, điểm chuyển cảnh (hotspot), âm thanh và logo từ phiên bản nguồn.
          </p>
          <div class="form-field">
            <label class="field-label">Âm thanh nền (Background Audio)</label>
            <input type="file" accept="audio/*" @change="onVersionAudioChange" />
          </div>
          <div class="form-field">
            <label class="field-label">Logo điểm chuyển cảnh (Hotspot Logo)</label>
            <input type="file" accept="image/*" @change="onVersionLogoChange" />
          </div>
          <div class="actions-row mt-4">
            <button class="primary-button" type="submit">Tạo Bản Nháp</button>
            <button class="secondary-button" type="button" @click="closeVersionModal">Hủy Bỏ</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Chỉnh Sửa Dự Án / Địa Điểm -->
    <div v-if="editModal" class="builder-modal-backdrop">
      <div class="builder-modal builder-modal-small">
        <div class="builder-modal-header">
          <h2>{{ editForm.type === 'create_location' ? 'Tạo địa điểm mới' : `Chỉnh sửa ${editModal}` }}</h2>
          <button type="button" @click="closeEditModal" aria-label="Đóng">×</button>
        </div>
        <form class="form" @submit.prevent="submitEdit">
          <div class="form-field">
            <label class="field-label">Tên <span class="required">*</span></label>
            <input v-model="editForm.name" />
          </div>
          <div class="form-field">
            <label class="field-label">Mô tả</label>
            <textarea v-model="editForm.description" rows="4"></textarea>
          </div>
          <div v-if="editForm.type === 'location' || editForm.type === 'create_location'" class="thumbnail-edit-block">
            <span class="field-label">Ảnh đại diện (Thumbnail)</span>
            <div class="thumbnail-edit-grid">
              <div
                class="thumbnail-preview"
                :style="
                  editForm.thumbnail_preview || editForm.thumbnail
                    ? { backgroundImage: `url(${editForm.thumbnail_preview || editForm.thumbnail})` }
                    : {}
                "
              >
                <span v-if="!editForm.thumbnail_preview && !editForm.thumbnail">Chưa có ảnh</span>
              </div>
              <label class="thumbnail-upload-button">
                <input type="file" accept="image/*" @change="onEditThumbnailChange" />
                <strong>Tải ảnh lên</strong>
                <small>Định dạng JPG/PNG/WebP, hiển thị làm ảnh bìa khi xuất bản.</small>
              </label>
            </div>
          </div>
          <div v-if="editForm.type === 'location' || editForm.type === 'create_location'" class="two-inputs">
            <div class="form-field">
              <label class="field-label">Vĩ độ (Latitude)</label>
              <input
                v-model="editForm.latitude"
                type="number"
                step="0.000001"
                placeholder="VD: 21.402514"
              />
            </div>
            <div class="form-field">
              <label class="field-label">Kinh độ (Longitude)</label>
              <input
                v-model="editForm.longitude"
                type="number"
                step="0.000001"
                placeholder="VD: 105.807476"
              />
            </div>
          </div>
          <label class="checkbox-row mt-2">
            <input v-model="editForm.is_active" type="checkbox" />
            Đang kích hoạt
          </label>
          <div class="actions-row mt-4">
            <button class="primary-button" type="submit">Lưu Thay Đổi</button>
            <button class="secondary-button" type="button" @click="closeEditModal">Hủy Bỏ</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
