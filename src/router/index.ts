import { createRouter, createWebHistory } from 'vue-router'
import { Layout } from '@/types/router.type'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'movies' },
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        layout: Layout.Default,
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoriteView.vue'),
      meta: {
        layout: Layout.Favorites,
      },
    },
  ],
})

export default router
