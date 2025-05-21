import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { resolve } from "path"; 
// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), UnoCSS(), vueJsx()],
  resolve: {
    // src 别名配置
    alias: {
      "@": resolve(__dirname, "src"),
    },
    // 使用路径别名时想要省略的后缀名，可以自己增减
    extensions: [".js", ".json", ".ts"],
  },
  server:{
    host:'0.0.0.0',
    port:8081,
    open:true,
    cors:true,
    proxy:{
      '/timer': { // 代理前缀（可自定义）
        target: 'http://192.168.9.15:8080', // 后端地址
        changeOrigin: true, // 启用跨域
        // rewrite: (path) => path.replace(/^\/api/, '') // 移除路径中的 /api
      },
      '/ws':{
        target: 'ws://192.168.9.15:8080',
        ws:true,
      },
      '/weather': { // 代理前缀（可自定义）
        target: 'https://restapi.amap.com/v3', // 后端地址
        changeOrigin: true, // 启用跨域
        // rewrite: (path) => path.replace(/^\/api/, '') // 移除路径中的 /api
      }
    }
  }
})
