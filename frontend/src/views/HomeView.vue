<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { listPublishedTours } from "../api/publishedToursApi";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const auth = useAuthStore();
const tours = ref([]);
const search = ref("");
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
let messageTimer = null;

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

function viewerEmbedUrl(tour) {
  const url = new URL("/viewer", window.location.origin);
  url.searchParams.set("token", tour.public_token);
  return url.toString();
}

function iframeCode(tour) {
  const src = viewerEmbedUrl(tour);
  const title = `${tour.project_name || "VR360"} - ${tour.location_name || "Tour"}`;
  return `<iframe src="${src}" title="${title}" width="100%" height="640" style="border:0;border-radius:12px;" allow="fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; accelerometer" allowfullscreen loading="lazy"></iframe>`;
}

function showToast(message) {
  clearTimeout(messageTimer);
  successMessage.value = "";
  window.requestAnimationFrame(() => {
    successMessage.value = message;
    messageTimer = setTimeout(() => {
      successMessage.value = "";
    }, 2000);
  });
}

async function copyEmbedLink(tour) {
  const code = iframeCode(tour);
  try {
    await navigator.clipboard.writeText(code);
    showToast("Da copy iframe VR. Web khac chi dung duoc neu domain da whitelist.");
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showToast("Da copy iframe VR.");
  }
}

function goLogin() {
  router.push("/login");
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

onBeforeUnmount(() => {
  clearTimeout(messageTimer);
});
</script>

<template>
  <section class="page home-page">
    <nav v-if="!auth.isAuthenticated" class="home-topbar">
      <RouterLink class="home-logo" to="/">VR360</RouterLink>
      <div class="home-topbar-actions">
        <button class="ghost-button compact-button" type="button" @click="loadTours">
          {{ loading ? "Loading..." : "Refresh" }}
        </button>
        <button class="primary-button compact-button" type="button" @click="goLogin">
          Dang nhap
        </button>
      </div>
    </nav>

    <header class="home-hero">
      <div class="home-hero-copy">
        <p class="eyebrow">Thu vien VR360</p>
        <h1>Kham pha cac tour 360 da publish</h1>
        <p>Chon tour cong khai de xem nhanh tren VR360 Viewer, hoac dang nhap de quan ly du an.</p>
        <div class="home-hero-actions">
          <input v-model="search" placeholder="Tim theo project, location..." />
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
        <span>Da publish</span>
        <strong>{{ tours.length }}</strong>
        <small>{{ totalScenes }} scene san sang</small>
      </div>
    </header>

    <p v-if="errorMessage" class="builder-alert error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="builder-alert success">{{ successMessage }}</p>

    <section v-if="filteredTours.length" class="published-tour-grid">
      <article
        v-for="tour in filteredTours"
        :key="tour.id"
        class="published-tour-card"
      >
        <div
          class="published-tour-cover"
          :style="
              tour.location_thumbnail || tour.tour_thumbnail
                ? {
                   backgroundImage: `url(${tour.location_thumbnail || tour.tour_thumbnail})`,
                  }
                : {}
          "
        >
          <span>Da xuat ban</span>
        </div>
        <div class="published-tour-body">
          <small>{{ tour.project_name }}</small>
          <h2>{{ tour.location_name }}</h2>
          <p>{{ tour.location_description || "Tour VR360 da san sang de xem." }}</p>
          <div class="published-tour-meta">
            <span>v{{ tour.version_number }}{{ tour.version_label ? ` · ${tour.version_label}` : "" }}</span>
            <span>{{ tour.scene_count }} scenes</span>
          </div>
          <div class="published-tour-footer">
            <em>Published {{ formatDate(tour.published_at) }}</em>
            <div class="published-tour-actions">
              <button
                class="secondary-button compact-button"
                type="button"
                title="Copy iframe de nhung vao website khac"
                @click="copyEmbedLink(tour)"
              >
                Lay link VR
              </button>
              <button
                class="primary-button compact-button"
                type="button"
                @click="openViewer(tour)"
              >
                Xem tour
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section v-else class="panel empty-state">
      {{ loading ? "Loading tour list..." : "No published tours yet." }}
    </section>
  </section>
</template>
