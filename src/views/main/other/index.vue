<template>
  <div class="page relative">

    <iframe
      frameborder="0"
      class="w-full h-full box-border"
      :src="activeMenu?.mate.link"
    ></iframe>
    <!-- <Container
      v-for="(item, index) in tabList"
      :routeInfo="item"
      :key="index"
    ></Container> -->
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from "@/store/index";
const store = useStore();
const { tabList, activeMenu } = storeToRefs(store);
console.log(tabList.value, activeMenu.value);
</script>

<style>
</style>