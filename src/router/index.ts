import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '../views/Index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/Park',
    name: 'Park',
    component: () => import('../views/Park.vue'),
  },
  {
    path: '/Remaining',
    name: 'Remaining',
    component: () => import('../views/Remaining.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
