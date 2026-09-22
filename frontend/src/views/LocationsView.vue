<script setup>
import { onMounted, reactive, ref } from 'vue';

import { listProjectLocations, createLocation, deleteLocation, updateLocation } from '../api/locationsApi';
import { listProjects } from '../api/projectsApi';

const projects = ref([]);
const locations = ref([]);
const selectedProjectId = ref('');
const loading = ref(false);
const saving = ref(false);
const errorMessage = ref('');
const form = reactive({
  id: null,
  name: '',
  description: '',
  latitude: '',
  longitude: '',
  order: 0,
  is_active: true,
});

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function formatApiError(error) {
  const data = error.response?.data;
  if (!data) return error.message || 'Co loi xay ra.';
  if (typeof data === 'string') return data;
  if (data.detail) return data.detail;
  return Object.entries(data)
    .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
    .join(' | ');
}

async function loadProject() {
  const response = await listProjects();
  projects.value = normalizeResults(response.data);
  if (!selectedProjectId.value && projects.value.length) {
    selectedProjectId.value = projects.value[0].id;
  }
}

async function loadLocation() {
  if (!selectedProjectId.value) return;
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await listProjectLocations(selectedProjectId.value);
    locations.value = normalizeResults(response.data);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not load location list.';
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  Object.assign(form, {
    id: null,
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    order: locations.value.length + 1,
    is_active: true,
  });
}

function editLocation(location) {
  Object.assign(form, {
    id: location.id,
    name: location.name,
    description: location.description || '',
    latitude: location.latitude || '',
    longitude: location.longitude || '',
    order: location.order || 0,
    is_active: location.is_active,
  });
}

async function submitLocation() {
  if (!selectedProjectId.value) {
    errorMessage.value = 'Vui long select project truoc khi create location.';
    return;
  }
  saving.value = true;
  errorMessage.value = '';
  const payload = {
    name: form.name,
    description: form.description,
    latitude: form.latitude || null,
    longitude: form.longitude || null,
    order: Number(form.order || 0),
    is_active: form.is_active,
  };
  try {
    if (form.id) {
      await updateLocation(form.id, payload);
    } else {
      await createLocation(selectedProjectId.value, payload);
    }
    resetForm();
    await loadLocation();
  } catch (error) {
    errorMessage.value = formatApiError(error);
  } finally {
    saving.value = false;
  }
}

async function removeLocation(location) {
  if (!window.confirm(`Xác nhận xóa địa điểm "${location.name}"?`)) return;
  await deleteLocation(location.id);
  await loadLocation();
}

async function boot() {
  await loadProject();
  resetForm();
  await loadLocation();
}

onMounted(boot);
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Quản lý nội dung</p>
        <h1>Địa điểm</h1>
      </div>
      <button class="secondary-button" type="button" @click="loadLocation">Làm mới</button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <section class="panel">
      <h2>Chọn dự án</h2>
      <div class="inline-form">
        <label class="form-field">
          <span class="field-label">Dự án</span>
          <select v-model="selectedProjectId" @change="loadLocation">
            <option value="">Chọn dự án</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.name }}
          </option>
          </select>
        </label>
      </div>
    </section>

    <section class="panel">
      <h2>{{ form.id ? 'Cập nhật địa điểm' : 'Tạo địa điểm mới' }}</h2>
      <form class="grid-form" @submit.prevent="submitLocation">
        <label class="form-field">
          <span class="field-label">Tên địa điểm <span class="required">*</span></span>
          <input v-model="form.name" placeholder="Ví dụ: Khu di tích Tràng An" required />
        </label>
        <label class="form-field">
          <span class="field-label">Mô tả</span>
          <input v-model="form.description" placeholder="Mô tả ngắn về địa điểm" />
        </label>
        <label class="form-field">
          <span class="field-label">Vĩ độ</span>
          <input v-model.number="form.latitude" type="number" step="any" placeholder="Ví dụ: 20.254" />
        </label>
        <label class="form-field">
          <span class="field-label">Kinh độ</span>
          <input v-model.number="form.longitude" type="number" step="any" placeholder="Ví dụ: 105.975" />
        </label>
        <label class="form-field">
          <span class="field-label">Thứ tự hiển thị</span>
          <input v-model.number="form.order" type="number" min="0" />
        </label>
        <label class="checkbox-row">
          <input v-model="form.is_active" type="checkbox" />
          Đang hoạt động
        </label>
        <button class="primary-button" type="submit" :disabled="saving">
          {{ saving ? 'Đang lưu...' : form.id ? 'Lưu thay đổi' : 'Tạo địa điểm' }}
        </button>
        <button class="secondary-button" type="button" @click="resetForm">Làm mới</button>
      </form>
    </section>

    <section class="panel">
      <h2>Danh sách địa điểm</h2>
      <p v-if="loading" class="muted">Đang tải...</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Slug</th>
              <th>Thứ tự</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="location in locations" :key="location.id">
              <td>{{ location.id }}</td>
              <td>{{ location.name }}</td>
              <td>{{ location.slug }}</td>
              <td>{{ location.order }}</td>
              <td>{{ location.is_active ? 'Đang hoạt động' : 'Tạm dừng' }}</td>
              <td class="actions-cell">
                <button class="secondary-action-btn" type="button" @click="editLocation(location)">Sửa</button>
                <button class="ghost-danger-btn" type="button" @click="removeLocation(location)">Xóa</button>
              </td>
            </tr>
            <tr v-if="!locations.length && !loading">
              <td colspan="6">Chưa có địa điểm nào.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>
