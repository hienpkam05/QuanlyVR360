// import ViewerDemoPage from './pages/ViewerDemoPage.vue';
// import ViewerProductionPage from './pages/ViewerProductionPage.vue';

// export const vr360ViewerRoutes = [
//   {
//     path: '/viewer-demo',
//     name: 'Vr360ViewerDemo',
//     component: ViewerDemoPage,
//     meta: { immersive: true, public: true },
//   },
// ];

// export { ViewerProductionPage };
import ViewerDemoPage from './pages/ViewerDemoPage.vue';
import ViewerProductionPage from './pages/ViewerProductionPage.vue';

export const vr360ViewerRoutes = [
  {
    path: '/viewer',
    name: 'Vr360Viewer',
    component: ViewerProductionPage,
  },
  {
    path: '/viewer-demo',
    name: 'Vr360ViewerDemo',
    component: ViewerDemoPage,
  },
];

export {
  ViewerProductionPage,
  ViewerDemoPage,
};