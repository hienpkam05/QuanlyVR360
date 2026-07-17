<script setup>
import { computed } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "./stores/authStore";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const isImmersive = computed(() => Boolean(route.meta.immersive));
const navItems = computed(() => {
  const publicItems = [
    { to: "/", label: "Home" },
    { to: "/viewer", label: "VR360 Viewer" },
  ];
  if (auth.isGuest) return publicItems;
  return [
    ...publicItems.slice(0, 1),
    { to: "/dashboard", label: "Dashboard" },
    { to: "/projects", label: "Projects" },
    { to: "/builder", label: "VR360 Builder" },
    publicItems[1],
    { to: "/publishing", label: "Publishing" },
    { to: "/stats", label: "Analytics" },
    { to: "/public-viewer", label: "Public Viewer" },
  ];
});

function logout() {
  auth.logout();
  router.push("/login");
}
</script>

<template>
  <div class="app-shell" :class="{ 'app-shell-immersive': isImmersive }">
    <aside v-if="auth.isAuthenticated && !isImmersive" class="sidebar">
      <RouterLink class="brand" to="/">VR360</RouterLink>
      <nav>
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">{{
          item.label
        }}</RouterLink>
      </nav>
      <button class="ghost-button" type="button" @click="logout">
        Logout
      </button>
    </aside>

    <main
      class="content"
      :class="{
        'content-auth': !auth.isAuthenticated,
        'content-immersive': isImmersive,
      }"
    >
      <RouterView :key="route.fullPath" />
    </main>
  </div>
</template>
