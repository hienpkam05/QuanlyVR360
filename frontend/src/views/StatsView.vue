<script setup>
import { computed, onMounted, reactive, ref } from "vue";

import {
  getStatsByCountry,
  getStatsByDevice,
  getStatsByReferrer,
  getStatsSummary,
  getStatsTimeseries,
} from "../api/analyticsApi";
import { listProjectLocations } from "../api/locationsApi";
import { listProjects } from "../api/projectsApi";

const currentYear = new Date().getFullYear();
const projects = ref([]);
const locations = ref([]);
const selectedProjectId = ref("");
const selectedLocationId = ref("");
const summary = ref(null);
const timeseries = ref([]);
const countries = ref([]);
const devices = ref([]);
const referrers = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const filters = reactive({
  from: `${currentYear}-01-01`,
  to: `${currentYear}-12-31`,
  granularity: "month",
});

const periodOptions = [
  { label: "Tuan", value: "week", hint: "7 ngay" },
  { label: "Thang", value: "month", hint: "Theo thang" },
  { label: "Nam", value: "year", hint: "Theo nam" },
];
const colors = [
  "#4f63ff",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#0ea5e9",
];
const chartWidth = 1000;
const chartHeight = 300;
const chartPadding = 42;
const chartInnerWidth = chartWidth - chartPadding * 2;
const chartInnerHeight = chartHeight - chartPadding * 2;

const totalVisits = computed(() => Number(summary.value?.total_visits || 0));
const uniqueVisitors = computed(() =>
  Number(summary.value?.unique_visitors || 0),
);
const avgPerPeriod = computed(() => {
  if (!timeseries.value.length) return 0;
  return Math.round((totalVisits.value / timeseries.value.length) * 10) / 10;
});
const maxVisits = computed(() =>
  Math.max(
    1,
    ...timeseries.value.map((item) => Number(item.total_visits || 0)),
  ),
);
const chartBars = computed(() => {
  const count = Math.max(1, timeseries.value.length);
  const slotWidth = chartInnerWidth / count;
  const barWidth = Math.max(10, Math.min(44, slotWidth * 0.5));

  return timeseries.value.map((item, index) => {
    const visits = Number(item.total_visits || 0);
    const height = (visits / maxVisits.value) * chartInnerHeight;
    return {
      ...item,
      visits,
      label: formatPeriod(item.period),
      x: chartPadding + index * slotWidth + (slotWidth - barWidth) / 2,
      y: chartHeight - chartPadding - height,
      width: barWidth,
      height,
    };
  });
});
const chartLabels = computed(() => {
  if (!chartBars.value.length) return [];
  const wanted = filters.granularity === "year" ? chartBars.value.length : 7;
  const step = Math.max(1, Math.ceil(chartBars.value.length / wanted));
  return chartBars.value.filter(
    (_, index) => index % step === 0 || index === chartBars.value.length - 1,
  );
});
const linePoints = computed(() =>
  chartBars.value.map((bar) => `${bar.x + bar.width / 2},${bar.y}`).join(" "),
);
const deviceTotal = computed(() =>
  devices.value.reduce((sum, item) => sum + Number(item.count || 0), 0),
);
const deviceDonutStyle = computed(() => {
  if (!deviceTotal.value) return { background: "#eef2ff" };
  let current = 0;
  const segments = devices.value.slice(0, 6).map((item, index) => {
    const start = current;
    current += (Number(item.count || 0) / deviceTotal.value) * 100;
    return `${colors[index % colors.length]} ${start}% ${current}%`;
  });
  return { background: `conic-gradient(${segments.join(", ")})` };
});
const topCountries = computed(() => countries.value.slice(0, 5));
const topDevices = computed(() => devices.value.slice(0, 5));
const topReferrers = computed(() => referrers.value.slice(0, 6));

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function formatPeriod(period) {
  if (!period) return "";
  const value = String(period);
  if (filters.granularity === "year") return value.slice(0, 4);
  if (filters.granularity === "month") return value.slice(0, 7);
  return value.slice(0, 10);
}

function percent(count, total) {
  if (!total) return 0;
  return Math.round((Number(count || 0) / total) * 100);
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

async function loadStats() {
  if (!selectedLocationId.value) return;
  loading.value = true;
  errorMessage.value = "";
  try {
    const params = { from: filters.from, to: filters.to };
    const [
      summaryResponse,
      seriesResponse,
      countryResponse,
      deviceResponse,
      referrerResponse,
    ] = await Promise.all([
      getStatsSummary(selectedLocationId.value, params),
      getStatsTimeseries(selectedLocationId.value, {
        ...params,
        granularity: filters.granularity,
      }),
      getStatsByCountry(selectedLocationId.value, params),
      getStatsByDevice(selectedLocationId.value, params),
      getStatsByReferrer(selectedLocationId.value, params),
    ]);
    summary.value = summaryResponse.data;
    timeseries.value = seriesResponse.data.results || [];
    countries.value = countryResponse.data.results || [];
    devices.value = deviceResponse.data.results || [];
    referrers.value = referrerResponse.data.results || [];
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || "Could not load du lieu stats.";
  } finally {
    loading.value = false;
  }
}

async function changeProject() {
  selectedLocationId.value = "";
  locations.value = [];
  await loadLocation();
  await loadStats();
}

async function setGranularity(value) {
  filters.granularity = value;
  await loadStats();
}

async function boot() {
  await loadProject();
  await loadLocation();
  await loadStats();
}

onMounted(boot);
</script>

<template>
  <section class="page analytics-dashboard-page">
    <header class="page-header analytics-dashboard-header">
      <div>
        <p class="eyebrow">Stats</p>
        <h1>Stats location</h1>
        <span class="analytics-subtitle"
          >Theo dõi lượt truy cập, thiết bị và nguồn giới thiệu của tour
          VR360.</span
        >
      </div>
      <button
        class="secondary-button"
        type="button"
        :disabled="loading"
        @click="loadStats"
      >
        {{ loading ? "Loading..." : "Refresh" }}
      </button>
    </header>

    <section class="panel analytics-filter-panel">
      <label>
        Project
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
        Location
        <select v-model="selectedLocationId" @change="loadStats">
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
        Từ ngày
        <input v-model="filters.from" type="date" @change="loadStats" />
      </label>
      <label>
        Đến ngày
        <input v-model="filters.to" type="date" @change="loadStats" />
      </label>
      <div class="period-toggle" aria-label="Choose time range">
        <button
          v-for="option in periodOptions"
          :key="option.value"
          type="button"
          :class="{ active: filters.granularity === option.value }"
          @click="setGranularity(option.value)"
        >
          <strong>{{ option.label }}</strong>
          <small>{{ option.hint }}</small>
        </button>
      </div>
    </section>

    <p v-if="errorMessage" class="builder-alert error">{{ errorMessage }}</p>

    <section class="analytics-metric-row">
      <article class="analytics-metric-card primary">
        <span>Tổng lượt truy cập</span>
        <strong>{{ totalVisits }}</strong>
        <small>{{ filters.from }} → {{ filters.to }}</small>
      </article>
      <article class="analytics-metric-card">
        <span>Khách duy nhất </span>
        <strong>{{ uniqueVisitors }}</strong>
        <small>Unique visitor</small>
      </article>
      <article class="analytics-metric-card">
        <span>Trung bình / kỳ</span>
        <strong>{{ avgPerPeriod }}</strong>
        <small>{{ filters.granularity }}</small>
      </article>
    </section>

    <section class="analytics-main-grid">
      <article class="panel analytics-chart-card">
        <div class="panel-title-row">
          <div>
            <h2>Biểu đồ truy cập</h2>
            <p class="chart-subtitle">
              Lượt truy cập theo
              {{
                periodOptions
                  .find((item) => item.value === filters.granularity)
                  ?.label.toLowerCase()
              }}
            </p>
          </div>
          <span class="chart-badge">Cao nhất {{ maxVisits }}</span>
        </div>

        <div v-if="timeseries.length" class="analytics-chart large">
          <svg
            :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
            preserveAspectRatio="none"
            role="img"
            aria-label="Bieu do luot truy cap"
          >
            <line
              v-for="tick in 5"
              :key="tick"
              :x1="chartPadding"
              :x2="chartWidth - chartPadding"
              :y1="chartPadding + ((tick - 1) * chartInnerHeight) / 4"
              :y2="chartPadding + ((tick - 1) * chartInnerHeight) / 4"
              class="chart-grid-line"
            />
            <rect
              v-for="bar in chartBars"
              :key="bar.period"
              class="chart-bar"
              :x="bar.x"
              :y="bar.y"
              :width="bar.width"
              :height="bar.height"
              rx="8"
            >
              <title>{{ bar.label }}: {{ bar.visits }} luot</title>
            </rect>
            <polyline
              v-if="chartBars.length > 1"
              class="chart-line"
              :points="linePoints"
            />
            <circle
              v-for="bar in chartBars"
              :key="`${bar.period}-point`"
              class="chart-point"
              :cx="bar.x + bar.width / 2"
              :cy="bar.y"
              r="4"
            />
            <text
              v-for="label in chartLabels"
              :key="label.period"
              class="chart-label"
              :x="label.x + label.width / 2"
              :y="chartHeight - 10"
              text-anchor="middle"
            >
              {{ label.label }}
            </text>
          </svg>
        </div>
        <p v-else class="empty-state">
          Chua co du lieu truy cap trong khoang thoi gian nay.
        </p>
      </article>

      <article class="panel analytics-donut-card">
        <div class="panel-title-row">
          <h2>Thiết bị truy cập</h2>
          <span class="chart-badge">{{ deviceTotal }}</span>
        </div>
        <div class="donut-wrap">
          <div class="donut-chart" :style="deviceDonutStyle">
            <span>{{ deviceTotal }}</span>
          </div>
        </div>
        <ul class="breakdown-list">
          <li v-for="(item, index) in topDevices" :key="item.key">
            <i :style="{ background: colors[index % colors.length] }"></i>
            <strong>{{ item.key }}</strong>
            <span
              >{{ item.count }} · {{ percent(item.count, deviceTotal) }}%</span
            >
          </li>
        </ul>
      </article>
    </section>

    <section class="analytics-table-grid">
      <article class="panel">
        <h2>Quốc gia</h2>
        <ul class="breakdown-list roomy">
          <li v-for="(item, index) in topCountries" :key="item.key">
            <i :style="{ background: colors[index % colors.length] }"></i>
            <strong>{{ item.key }}</strong>
            <span>{{ item.count }} luot</span>
          </li>
        </ul>
      </article>

      <article class="panel">
        <h2>Nguồn giới thiệu</h2>
        <ul class="analytics-referrer-table">
          <li v-for="item in topReferrers" :key="item.key">
            <strong>{{ item.key }}</strong>
            <span>{{ item.count }}</span>
            <em>{{ item.unique_visitors }} unique</em>
          </li>
        </ul>
      </article>
    </section>
  </section>
</template>
