import { createRouter, createWebHistory } from 'vue-router'
import { Layout } from '@/types/router.type'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        layout: Layout.Default,
      },
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/FavoriteView.vue'),
      meta: {
        layout: Layout.Favorite,
      },
    },
  ],
})

export default router
