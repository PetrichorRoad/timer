import '@/assets/css/style.css'
import '@/assets/css/common.css'
// main.ts
import 'virtual:uno.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from "./router/index";
import naive from 'naive-ui'
import { loading } from './utils/lib/loading'
createApp(App).use(router).use(createPinia()).use(naive).directive('loading',loading).mount('#app')
