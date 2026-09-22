<script setup>
import { computed, ref, watch } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "./stores/authStore";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const isImmersive = computed(() => Boolean(route.meta.immersive));
const isDrawerOpen = ref(false);

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

// Tự động đóng Drawer khi người dùng chuyển trang
watch(
  () => route.fullPath,
  () => {
    isDrawerOpen.value = false;
  }
);

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value;
}

function logout() {
  auth.logout();
  router.push("/login");
}
</script>

<template>
  <div class="app-shell" :class="{ 'app-shell-immersive': isImmersive }">
    <!-- Mobile Topbar Header -->
    <header v-if="auth.isAuthenticated && !isImmersive" class="mobile-topbar">
      <button
        class="menu-toggle-btn"
        type="button"
        @click="toggleDrawer"
        aria-label="Mở Menu điều hướng"
      >
        <svg
          class="icon-svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <span class="mobile-brand">VR360 Studio</span>
      <button
        class="mobile-logout-btn"
        type="button"
        @click="logout"
        aria-label="Đăng xuất"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>
    </header>

    <!-- Backdrop khi mở Drawer trên mobile -->
    <div
      v-if="isDrawerOpen"
      class="drawer-backdrop"
      @click="isDrawerOpen = false"
    ></div>

    <!-- Sidebar Desktop / Drawer Mobile -->
    <aside
      v-if="auth.isAuthenticated && !isImmersive"
      class="sidebar"
      :class="{ 'drawer-open': isDrawerOpen }"
    >
      <div class="sidebar-header">
        <div class="brand-group">
          <div class="brand-logo-badge">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path
                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              ></path>
            </svg>
          </div>
          <RouterLink class="brand" to="/">VR360 Studio</RouterLink>
        </div>
        <button
          v-if="isDrawerOpen"
          class="drawer-close-btn"
          type="button"
          @click="isDrawerOpen = false"
          aria-label="Đóng Menu"
        >
          ✕
        </button>
      </div>

      <nav>
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <button class="ghost-button logout-sidebar-btn" type="button" @click="logout">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span>Logout</span>
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
