<template>
  <n-layout-header :inverted="inverted" bordered>
    <header class="h-[60px] flex items-center justify-between">
      <div class="flex items-center justify-between w-full">
        <div class="w-[240px]"></div>
        <div class="flex-1 flex justify-between items-center">
          <n-menu
            mode="horizontal"
            :inverted="inverted"
            :options="list"
            :value="routeName"
            class="flex-1"
          />
          <div class="flex items-center gap-2 px-6">
            <n-icon :component="SettingsOutline" size="16" :depth="1" @click="setting" />
          </div>
        </div>
        <theme-color></theme-color>
      </div>
      <div></div>
    </header>
  </n-layout-header>
</template>

<script setup>
import themeColor from "@/components/theme-color/theme-color.vue";
import { SettingsOutline } from "@vicons/ionicons5";
import { computed, h } from "vue";
import { RouterLink, useRoute ,useRouter } from "vue-router";
import { useStore } from "@/store/index";
const store = useStore();
const route = useRoute();
let router = useRouter();
const list = [
  {
    label: () =>
      h(
        RouterLink,
        {
          class: "text-[#FFF]",
          to: {
            path: "/index/home",
          },
        },
        { default: () => "首页" }
      ),
    key: "/index/home",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          class: "text-[#FFF]",
          to: {
            path: "/index/main/test",
          },
        },
        { default: () => "文档" }
      ),
    key: "/index/main",
  },
];
const inverted = computed(() => {
  return store.theme === "dark";
});
const routeName = computed(() => {
  return route.path;
});
const setting = () => {
  router.push({
    path: "/index/main/setting",
  });
};
</script>

<style>
</style>