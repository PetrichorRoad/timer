import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from "vite-plugin-compression";
// 图片压缩
import viteImagemin from "vite-plugin-imagemin";

import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    UnoCSS(),
    vueJsx(),
    visualizer({
      open: true, // 打包后自动打开分析图
      filename: "visualizer.html", // 分析图生成的文件名
      gzipSize: true, // 显示 gzip 压缩大小
      brotliSize: true, // 显示 brotli 压缩大小
    }),
    viteCompression({
      verbose: true, // 是否在控制台中输出压缩结果
      disable: false,
      threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
      algorithm: "gzip", // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
      ext: ".gz",
      deleteOriginFile: true, // 源文件压缩后是否删除(我为了看压缩后的效果，先选择了true)
    }),
    AutoImport({
      resolvers: [NaiveUiResolver()],
    }),
    // 按需导入element plus 自定义主题。
    Components({
      resolvers: [NaiveUiResolver({ importStyle: "less" })],
    }),
    viteImagemin({
      gifsicle: {
        // gif图片压缩
        optimizationLevel: 3, // 选择1到3之间的优化级别
        interlaced: false, // 隔行扫描gif进行渐进式渲染
      },
      optipng: {
        // png
        optimizationLevel: 7, // 选择0到7之间的优化级别
      },
      mozjpeg: {
        // jpeg
        quality: 20, // 压缩质量，范围从0(最差)到100(最佳)。
      },
      pngquant: {
        // png
        quality: [0.8, 0.9], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
        speed: 4, // 压缩速度，1(强力)到11(最快)
      },
      svgo: {
        plugins: [
          // svg压缩
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: {
    // src 别名配置
    alias: {
      "@": resolve(__dirname, "src"),
    },
    // 使用路径别名时想要省略的后缀名，可以自己增减
    extensions: [".js", ".json", ".ts"],
  },
  server: {
    host: '0.0.0.0',
    port: 8081,
    open: true,
    cors: true,
    proxy: {
      '/timer': { // 代理前缀（可自定义）
        target: 'http://192.168.9.15:8080', // 后端地址
        changeOrigin: true, // 启用跨域
        // rewrite: (path) => path.replace(/^\/api/, '') // 移除路径中的 /api
      },
      '/ws': {
        target: 'ws://192.168.9.15:8080',
        ws: true,
      },
      '/weather': { // 代理前缀（可自定义）
        target: 'https://restapi.amap.com/v3', // 后端地址
        changeOrigin: true, // 启用跨域
        // rewrite: (path) => path.replace(/^\/api/, '') // 移除路径中的 /api
      }
    }
  },
  build: {
    outDir: "dist", // 打包出口文件夹名
    // sourcemap: isProduction ? false : "inline", //  'inline' 开发环境、测试环境调试
    sourcemap: false, //  'inline' 开发环境、测试环境调试
    rollupOptions: {
      // external: ["vue", "vue-router", "element-plus", "axios", "moment", "echarts"], //排除cdn加载的依赖
      output: {
        entryFileNames: "js/[name]-[hash].js", // 入口文件单独拿出来
        chunkFileNames: "js/[name]-[hash].js", // 控制分割代码名称
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "css/[name]-[hash].css";
          }
          const imgExts = [".png", ".jpg", "jpeg", "webp", ".svg", "gif"];
          if (imgExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return "imgs/[name]-[hash][ext]";
          }
          // 其他如视频、音频
          return "assets/[name]-[hash][ext]";
        },
      },
      // 控制如何分割代码
      manualChunks: (id) => {
        if (id.includes("node_modules")) {
          return "vendor"; // 其他第三方依赖打包到 vendor
        }
        if (id.includes("views")) {
          const viewsName = id.split("/").pop().replace(".js", "");
          return `views-${viewsName}`; // 每个页面模块单独打包
        }
      },
      external: ['vue'],
    },
  },
  esbuild: {
    drop: ["console", "debugger"]
  }
});
