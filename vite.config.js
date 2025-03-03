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
    port:8080,
    open:true,
    cors:true,
  }
})
