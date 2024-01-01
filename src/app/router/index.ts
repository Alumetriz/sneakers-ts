import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/pages/TheHome.vue'
import TheFavorites from '@/pages/TheFavorites.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheHome
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: TheFavorites
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
