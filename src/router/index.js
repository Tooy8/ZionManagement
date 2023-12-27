import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Order from '../views/Order.vue'

import OrderManagement from '../components/OrderManagement.vue'
import OrderDetails from '../components/OrderDetails.vue'
import OrderAllocation from '../components/OrderAllocation.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
   
    {
      path: '/order',
      name: 'order',
      component: Order,
      redirect: '/order/orderManagement', // 将orderManagement设为默认子路由
      children: [
        {
          path: 'orderManagement',
          name: 'orderManagement',
          component: OrderManagement
        },
        {
          path: 'orderDetails',
          name: 'orderDetails',
          component: OrderDetails
        },
        {
          path: 'orderAllocation',
          name: 'orderAllocation',
          component: OrderAllocation
        }
      ]
    },
  ]
})

export default router
