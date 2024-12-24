import { createRouter, createWebHistory } from 'vue-router'
import { Layout } from '@/types/router.type'
import HomeView from '@/views/HomeView.vue'
import FavoriteView from '@/views/FavoriteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: Layout.Default,
      },
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView,
      meta: {
        layout: Layout.Favorite,
      },
    },
  ],
})

export default router
