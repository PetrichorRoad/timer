import '../lang/index'
import '@/assets/css/style.css'
import '@/assets/css/common.css'
import '@/assets/css/calendar.less'
// main.ts
import 'virtual:uno.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import lottie from 'lottie-web';
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from "./router/index";
import naive from 'naive-ui'
import { loading } from './utils/lib/loading'
import { context } from './directive/context'  
import '@/plugins/highlight.js'
// import { $t , i18n } from './il8n/index'
window.lottie = lottie;
const app = createApp(App)
const pinia = createPinia()
// window.$t = $t;
//app.config.globalProperties.$t = $t;


app.use(router).use(pinia).use(naive).directive('loading',loading).directive('context',context)
// app.use(i18n)
app.mount('#app')
