import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import store from './store'
import router from './router/index'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 引入中文语言包
import 'element-plus/dist/index.css'


const app = createApp(App)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
  })
// app.use(store)
app.mount('#app')
