<script setup>
import { reactive, ref } from "vue";

import { getPublicTour, trackPublicVisit } from "../api/publicApi";

const form = reactive({
  token: "",
  origin: window.location.origin,
});
const tour = ref(null);
const errorMessage = ref("");
const tracked = ref(false);

async function loadTour() {
  errorMessage.value = "";
  tracked.value = false;
  try {
    const response = await getPublicTour(form.token, form.origin);
    tour.value = response.data;
  } catch (error) {
    tour.value = null;
    errorMessage.value =
      error.response?.data?.detail || "Could not load public tour.";
  }
}

async function trackVisit() {
  await trackPublicVisit(
    form.token,
    { country_code: "VN", city: "Ha Noi" },
    form.origin,
  );
  tracked.value = true;
}
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Public</p>
        <h1>Public Viewer</h1>
      </div>
    </header>

    <section class="panel">
      <form class="inline-form" @submit.prevent="loadTour">
        <input v-model="form.token" placeholder="public_token" />
        <input v-model="form.origin" placeholder="Origin" />
        <button class="primary-button" type="submit">Load Tour</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </section>

    <section v-if="tour" class="two-column">
      <div class="panel">
        <h2>{{ tour.location.name }}</h2>
        <p class="muted">
          Version v{{ tour.version.version_number }} - {{ tour.version.label }}
        </p>
        <button class="secondary-button" type="button" @click="trackVisit">
          {{ tracked ? "Da track visit" : "Track visit" }}
        </button>
        <div class="scene-grid">
          <article
            v-for="scene in tour.data.scenes"
            :key="scene.id"
            class="scene-card"
          >
            <strong>{{ scene.name || scene.id }}</strong>
            <span>{{ scene.tile_url ? "Có tile URL" : "Chưa có tile" }}</span>
            <small>{{ scene.tile_url }}</small>
          </article>
        </div>
      </div>

      <div class="panel">
        <h2>Raw data</h2>
        <pre class="json-preview">{{ tour }}</pre>
      </div>
    </section>
  </section>
</template>
