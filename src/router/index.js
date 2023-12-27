import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Order from '../views/Order.vue'
import User from '../views/User.vue'


import OrderManagement from '../components/OrderManagement.vue'
import OrderDetails from '../components/OrderDetails.vue'
import OrderAllocation from '../components/OrderAllocation.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //登录
    {
      path: '/',
      name: 'login',
      component: Login
    },
  //  订单
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
    // 用户
    {
      path: '/user',
      name: 'user',
      component: User
    },
  ]
})

export default router
