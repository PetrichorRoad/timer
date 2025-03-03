<template>
  <div class="page box-border p-3 bg-my-bg-2">
    <div class="w-[650px] h-[650px] bg-[pink]" v-loading="loading"></div>
    <n-button @click="changeLoading">start</n-button>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
let loading = ref(false);
const changeLoading = () => {
  loading.value = true;
  const setLoading = () => {
    loading.value = false;
  };
  setTimeout(setLoading, 3000);
};
</script>

<style scoped>
</style>