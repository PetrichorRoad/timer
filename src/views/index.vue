<template>
  <n-config-provider :theme-overrides="themeOverrides" :hljs="hljs">
    <n-space vertical size="large">
      <n-layout class="h-[100vh] flex flex-col">
        <Header></Header>
        <n-layout has-sider class="flex-1">
          <div class="w-full h-full">
            <router-view></router-view>
          </div>
        </n-layout>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { computed} from "vue";
import hljs from 'highlight.js/lib/core'
import { zhCN, dateZhCN,zhTW,dateZhTW } from 'naive-ui'
import Header from "@/components/header/index.vue";
// import { darkTheme, lightTheme } from "naive-ui";
// console.log(darkTheme);
import { lightThemes } from "@/utils/theme/lightTheme";
import { darkThemes } from "@/utils/theme/darkTheme";
import { overrides1 } from "@/utils/theme/overrides1";
import { useStore } from "@/store/setting";
// console.log(dateZhCN);

const store = useStore();
let lang = computed(() => store.lang);
const themeMap = { light: lightThemes, dark: darkThemes , overrides1 };

const themeOverrides = computed(() => {
  const { theme } = store;
  return themeMap[theme];
});
const langConfig = computed(() => {
  let langMap = {
    zhCN:{lang:zhCN,data:dateZhCN},
    zhTW:{lang:zhTW,data:dateZhTW},
  }
  return langMap[lang.value];
});
</script>

<style lang="less">
.n-layout-scroll-container {
  display: flex;
  flex-direction: column;
}
</style>