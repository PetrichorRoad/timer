<template>
  <div class="page flex">
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :native-scrollbar="false"
      :inverted="inverted"
      style="height: 100%"
    >
      <n-menu
        :indent="12"
        :inverted="inverted"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="routeName"
        :render-label="renderLabel"
        @update:value="handleUpdateValue"
      />
    </n-layout-sider>
    <div class="flex-1 box-border overflow-hidden">
      <!-- 组件自己的路由入口 -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="jsx">
import { h, ref, computed } from "vue";
import Container from "@/components/container/index.vue";
import { menuList } from "@/utils/lib/menu.js";
import { useStore } from "@/store/index";
import { storeToRefs } from 'pinia'
import { useRoute } from "vue-router";
const route = useRoute();
const store = useStore();
const { setActiveMenu } = store;
const { activeMenu } = storeToRefs(store);
const inverted = computed(() => {
  return store.theme === "dark";
})
const routeName = computed(() => {
  return store.activeMenu?.key;
});
const menuOptions = computed(() => {
  return menuList();
});
const renderLabel = (item) => {
  return <NEllipsis>{item.label}</NEllipsis>
};
const handleUpdateValue = (value,item) => {
  setActiveMenu(item);
};
</script>

<style></style>