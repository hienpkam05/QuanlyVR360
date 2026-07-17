import { createRouter, createWebHistory } from 'vue-router';

import DashboardView from '../views/DashboardView.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import BuilderView from '../views/BuilderView.vue';
import LocationsView from '../views/LocationsView.vue';
import PublicViewerView from '../views/PublicViewerView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import PublishingView from '../views/PublishingView.vue';
import StatsView from '../views/StatsView.vue';
import TourViewerView from '../views/TourViewerView.vue';
import VersionsView from '../views/VersionsView.vue';
import { useAuthStore } from '../stores/authStore';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { public: true },
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { public: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { staffOnly: true },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView,
    meta: { staffOnly: true },
  },
  {
    path: '/locations',
    name: 'Locations',
    component: LocationsView,
    meta: { staffOnly: true },
  },
  {
    path: '/versions',
    name: 'Versions',
    component: VersionsView,
    meta: { staffOnly: true },
  },
  {
    path: '/builder',
    name: 'Builder',
    component: BuilderView,
    meta: { immersive: true, staffOnly: true },
  },
  {
    path: '/viewer',
    name: 'TourViewer',
    component: TourViewerView,
    meta: { immersive: true, public: true },
  },
  {
    path: '/publishing',
    name: 'Publishing',
    component: PublishingView,
    meta: { staffOnly: true },
  },
  {
    path: '/stats',
    name: 'Stats',
    component: StatsView,
    meta: { staffOnly: true },
  },
  {
    path: '/public-viewer',
    name: 'PublicViewer',
    component: PublicViewerView,
    meta: { public: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (!to.meta.public && !auth.isAuthenticated) {
    return '/login';
  }
  if (to.path === '/login' && auth.isAuthenticated) {
    return '/';
  }
  if (to.meta.staffOnly && auth.isGuest) {
    return '/';
  }
  return true;
});

export default router;
