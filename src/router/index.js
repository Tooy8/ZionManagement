import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import index from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
  ]
})

export default router
