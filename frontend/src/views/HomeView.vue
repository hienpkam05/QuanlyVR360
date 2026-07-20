<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { listPublishedTours } from "../api/publishedToursApi";

const router = useRouter();
const tours = ref([]);
const search = ref("");
const loading = ref(false);
const errorMessage = ref("");

const filteredTours = computed(() => {
  const keyword = search.value.trim().toLowerCase();
  if (!keyword) return tours.value;
  return tours.value.filter((tour) =>
    [
      tour.location_name,
      tour.project_name,
      tour.location_description,
      tour.version_label,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(keyword)),
  );
});
const totalScenes = computed(() =>
  tours.value.reduce((sum, tour) => sum + Number(tour.scene_count || 0), 0),
);

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function formatDate(value) {
  if (!value) return "Chua ro ngay publish";
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

function openViewer(tour) {
  router.push({
    path: "/viewer",
    query: {
      token: tour.public_token,
      project: tour.project_id,
      location: tour.location_id,
      version: tour.version_id,
    },
  });
}

async function loadTours() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await listPublishedTours();
    tours.value = normalizeResults(response.data);
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || "Could not load published tour list.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadTours);
</script>

<template>
  <section class="page home-page">
    <header class="home-hero">
      <div>
        <p class="eyebrow">Thư viện VR360</p>
        <h1>Khám phá tour VR360</h1>
        <p>Chọn một tour đã publish để xem nhanh trong VR360 Viewer.</p>
        <div class="home-hero-actions">
          <input v-model="search" placeholder="Tìm theo project, location..." />
          <button
            class="secondary-button"
            type="button"
            :disabled="loading"
            @click="loadTours"
          >
            {{ loading ? "Loading..." : "Refresh" }}
          </button>
        </div>
      </div>
      <div class="home-summary-card">
        <span>Đã publish</span>
        <strong>{{ tours.length }}</strong>
        <small>{{ totalScenes }} scene sẵn sàng</small>
      </div>
    </header>

    <p v-if="errorMessage" class="builder-alert error">{{ errorMessage }}</p>

    <section v-if="filteredTours.length" class="published-tour-grid">
      <article
        v-for="tour in filteredTours"
        :key="tour.id"
        class="published-tour-card"
      >
        <div
          class="published-tour-cover"
          :style="
            tour.tour_thumbnail || tour.location_thumbnail
              ? {
                  backgroundImage: `url(${tour.tour_thumbnail || tour.location_thumbnail})`,
                }
              : {}
          "
        >
          <span>Đã xuất bản</span>
        </div>
        <div class="published-tour-body">
          <small>{{ tour.project_name }}</small>
          <h2>{{ tour.location_name }}</h2>
          <p>
            {{ tour.location_description || "Tour VR360 đã sẵn sàng để xem." }}
          </p>
          <div class="published-tour-meta">
            <span
              >v{{ tour.version_number }}
              {{ tour.version_label ? `· ${tour.version_label}` : "" }}</span
            >
            <span>{{ tour.scene_count }} scenes</span>
          </div>
          <div class="published-tour-footer">
            <em>{{ formatDate(tour.published_at) }}</em>
            <button
              class="primary-button compact-button"
              type="button"
              @click="openViewer(tour)"
            >
              View tour
            </button>
          </div>
        </div>
      </article>
    </section>

    <section v-else class="panel empty-state">
      {{ loading ? "Loading tour list..." : "No published tours yet." }}
    </section>
  </section>
</template>
