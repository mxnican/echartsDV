import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Overview from '@/views/Overview.vue'
import EmptyPage from '@/views/EmptyPage.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: EmptyPage,
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: EmptyPage,
      },
      {
        path: 'system',
        name: 'System',
        component: EmptyPage,
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
