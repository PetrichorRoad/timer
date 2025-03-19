<template>
  <div class="page relative" v-loading="{loading,type:'card'}">
    <iframe
      frameborder="0"
      class="w-full h-full box-border"
      :src="link"
      @load="load"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const loading = ref({
  load: false,
  type:'card'
});
const link = computed(() => {
  loading.value = true;
  return route.meta.link
});
const load = () => {
  loading.value = false;
};
</script>

<style>
</style>