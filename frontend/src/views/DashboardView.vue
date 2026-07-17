<script setup>
import { onMounted, ref } from 'vue';

import { getDashboardOverview, getRecentActivity, getTopLocations } from '../api/dashboardApi';
import { useAuthStore } from '../stores/authStore';

const auth = useAuthStore();
const overview = ref(null);
const topLocation = ref([]);
const activities = ref([]);
const loading = ref(true);
const errorMessage = ref('');

async function loadDashboard() {
  loading.value = true;
  errorMessage.value = '';
  try {
    const [overviewResponse, topResponse, activityResponse] = await Promise.all([
      getDashboardOverview(),
      getTopLocations({ limit: 5 }),
      getRecentActivity({ limit: 8 }),
    ]);
    overview.value = overviewResponse.data;
    topLocation.value = topResponse.data.results || [];
    activities.value = activityResponse.data.results || [];
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Could not load dashboard.';
  } finally {
    loading.value = false;
  }
}

onMounted(loadDashboard);
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Xin chao {{ auth.user?.username || 'ban' }}</p>
        <h1>Dashboard dashboard</h1>
      </div>
      <button class="secondary-button" type="button" @click="loadDashboard">Refresh</button>
    </header>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="loading" class="muted">Loading data...</p>

    <div v-if="overview" class="metric-grid">
      <article class="metric-card">
        <span>Project</span>
        <strong>{{ overview.projects_count }}</strong>
      </article>
      <article class="metric-card">
        <span>Location</span>
        <strong>{{ overview.locations_count }}</strong>
      </article>
      <article class="metric-card">
        <span>Publishing</span>
        <strong>{{ overview.published_locations }}</strong>
      </article>
      <article class="metric-card">
        <span>Luot truy cap</span>
        <strong>{{ overview.total_visits }}</strong>
      </article>
      <article class="metric-card">
        <span>Unique visitor</span>
        <strong>{{ overview.unique_visitors }}</strong>
      </article>
    </div>

    <div class="two-column">
      <section class="panel">
        <h2>Top location</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Project</th>
                <th>Luot xem</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in topLocation" :key="item.location_id">
                <td>{{ item.location_name }}</td>
                <td>{{ item.project_name }}</td>
                <td>{{ item.total_visits }}</td>
              </tr>
              <tr v-if="!topLocation.length">
                <td colspan="3">Chua co du lieu.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <h2>Hoat dong gan day</h2>
        <ul class="activity-list">
          <li v-for="activity in activities" :key="activity.id">
            <strong>{{ activity.action }}</strong>
            <span>{{ activity.description || activity.entity_type }}</span>
          </li>
          <li v-if="!activities.length" class="muted">Chua co hoat dong.</li>
        </ul>
      </section>
    </div>
  </section>
</template>
