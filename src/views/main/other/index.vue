<template>
  <div class="page relative" v-loading="loading">
    <iframe
      frameborder="0"
      class="w-full h-full box-border"
      :src="activeMenu?.meta.link"
      @load="load"
    ></iframe>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store/index";
import { watch, ref } from "vue";
const store = useStore();
const { tabList, activeMenu } = storeToRefs(store);
const loading = ref(null);
watch(
  () => activeMenu.value,
  () => {
    loading.value = true;
  }
);
const load = () => {
  loading.value = false;
};
</script>

<style>
</style>