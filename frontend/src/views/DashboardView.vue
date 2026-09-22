<script setup>
import { onMounted, ref } from "vue";

import {
  getDashboardOverview,
  getRecentActivity,
  getTopLocations,
} from "../api/dashboardApi";
import { formatActivityAction } from "../common/formatters";
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
      ]
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
        <p class="eyebrow">Xin chào {{ auth.user?.username || "bạn" }}</p>
        <h1>Tổng quan hệ thống</h1>
      </div>
      <button class="secondary-button" type="button" @click="loadDashboard">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        Làm mới
      </button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="loading" class="muted">Đang tải dữ liệu tổng quan...</p>

    <!-- Bento Grid Stat Cards (Nền trắng tinh tế, SVG icons thay thế emojis) -->
    <div v-if="overview" class="metric-grid dashboard-metric-grid">
      <!-- Thẻ Dự Án -->
      <article class="bento-stat-card">
        <div class="stat-info">
          <span class="stat-label">Tổng Dự Án</span>
          <strong class="stat-value">{{ overview.projects_count }}</strong>
        </div>
        <div class="stat-icon-wrap stat-icon-blue">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </article>

      <!-- Thẻ Địa Điểm -->
      <article class="bento-stat-card">
        <div class="stat-info">
          <span class="stat-label">Tổng Địa Điểm</span>
          <strong class="stat-value">{{ overview.locations_count }}</strong>
        </div>
        <div class="stat-icon-wrap stat-icon-cyan">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      </article>

      <!-- Thẻ Xuất Bản -->
      <article class="bento-stat-card">
        <div class="stat-info">
          <span class="stat-label">Tour Xuất Bản</span>
          <strong class="stat-value">{{ overview.published_locations }}</strong>
        </div>
        <div class="stat-icon-wrap stat-icon-emerald">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
      </article>

      <!-- Thẻ Lượt Truy Cập -->
      <article class="bento-stat-card">
        <div class="stat-info">
          <span class="stat-label">Tổng Lượt Xem</span>
          <strong class="stat-value">{{ overview.total_visits }}</strong>
        </div>
        <div class="stat-icon-wrap stat-icon-amber">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
      </article>

      <!-- Thẻ Khách Độc Bản -->
      <article class="bento-stat-card">
        <div class="stat-info">
          <span class="stat-label">Khách Độc Bản</span>
          <strong class="stat-value">{{ overview.unique_visitors }}</strong>
        </div>
        <div class="stat-icon-wrap stat-icon-purple">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </article>
    </div>

    <!-- Main Grid Dashboard -->
    <div class="two-column dashboard-main-grid">
      <section class="panel dashboard-table-panel">
        <div class="panel-title-row">
          <h2>Top địa điểm tham quan</h2>
          <small class="badge-subtle">Lượt xem cao nhất</small>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Địa điểm</th>
                <th>Dự án</th>
                <th>Lượt xem</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in topLocation" :key="item.location_id">
                <td><strong>{{ item.location_name }}</strong></td>
                <td>{{ item.project_name }}</td>
                <td><span class="view-count-badge">{{ item.total_visits }}</span></td>
              </tr>
              <tr v-if="!topLocation.length">
                <td colspan="3" class="muted text-center py-4">Chưa có dữ liệu thống kê.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel dashboard-activity-panel">
        <div class="panel-title-row">
          <h2>Hoạt động gần đây</h2>
          <small>5 sự kiện mới nhất</small>
        </div>
        <ul class="activity-list">
          <li v-for="activity in activities" :key="activity.id">
            <strong>{{ formatActivityAction(activity.action) }}</strong>
            <span>{{ activity.description || activity.entity_type }}</span>
          </li>
          <li v-if="!activities.length" class="muted">Chưa có hoạt động nào được ghi nhận.</li>
        </ul>
      </section>
    </div>
  </section>
</template>
