<template>
  <component :is="component"></component>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import myInfo from "./page/my-info.vue";
let route = useRoute();
let componentMap = {
  myInfo,
};
const component = computed(() => {
  return componentMap[route.query.page];
});
</script>

<style>
</style>