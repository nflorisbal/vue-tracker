import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Projects from '../views/Projects.vue';
import Tasks from '../views/Tasks.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
