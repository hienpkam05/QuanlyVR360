<script setup>
import { onMounted, ref } from "vue";

import {
  getDashboardOverview,
  getRecentActivity,
  getTopLocations,
} from "../api/dashboardApi";
import { useAuthStore } from "../stores/authStore";

const auth = useAuthStore();
const overview = ref(null);
const topLocation = ref([]);
const activities = ref([]);
const loading = ref(true);
const errorMessage = ref("");

async function loadDashboard() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const [overviewResponse, topResponse, activityResponse] = await Promise.all(
      [
        getDashboardOverview(),
        getTopLocations({ limit: 5 }),
        getRecentActivity({ limit: 5 }),
      ],
    );
    overview.value = overviewResponse.data;
    topLocation.value = topResponse.data.results || [];
    activities.value = activityResponse.data.results || [];
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || "Could not load dashboard.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadDashboard);
</script>

<template>
  <section class="page dashboard-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Xin chào {{ auth.user?.username || "ban" }}</p>
        <h1>Tổng quan hệ thống</h1>
      </div>
      <button class="secondary-button" type="button" @click="loadDashboard">
        Refresh
      </button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="loading" class="muted">Loading data...</p>

    <div v-if="overview" class="metric-grid dashboard-metric-grid">
      <article class="metric-card dashboard-metric-card project">
        <div>
          <span>Project</span>
          <strong>{{ overview.projects_count }}</strong>
        </div>
        <i>📁</i>
      </article>
      <article class="metric-card dashboard-metric-card location">
        <div>
          <span>Location</span>
          <strong>{{ overview.locations_count }}</strong>
        </div>
        <i>📍</i>
      </article>
      <article class="metric-card dashboard-metric-card publish">
        <div>
          <span>Publishing</span>
          <strong>{{ overview.published_locations }}</strong>
        </div>
        <i>🌐</i>
      </article>
      <article class="metric-card dashboard-metric-card visit">
        <div>
          <span>Lượt truy cập</span>
          <strong>{{ overview.total_visits }}</strong>
        </div>
        <i>👁</i>
      </article>
      <article class="metric-card dashboard-metric-card unique">
        <div>
          <span>Unique visitor</span>
          <strong>{{ overview.unique_visitors }}</strong>
        </div>
        <i>👤</i>
      </article>
    </div>

    <div class="two-column dashboard-main-grid">
      <section class="panel dashboard-table-panel">
        <h2>Top location</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Project</th>
                <th>Lượt xem</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in topLocation" :key="item.location_id">
                <td>{{ item.location_name }}</td>
                <td>{{ item.project_name }}</td>
                <td>{{ item.total_visits }}</td>
              </tr>
              <tr v-if="!topLocation.length">
                <td colspan="3">Chưa có dữ liệu.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel dashboard-activity-panel">
        <div class="panel-title-row">
          <h2>Hoạt động gần đây.</h2>
          <small>5 mới nhất</small>
        </div>
        <ul class="activity-list">
          <li v-for="activity in activities" :key="activity.id">
            <strong>{{ activity.action }}</strong>
            <span>{{ activity.description || activity.entity_type }}</span>
          </li>
          <li v-if="!activities.length" class="muted">Chưa có hoạt động.</li>
        </ul>
      </section>
    </div>
  </section>
</template>
