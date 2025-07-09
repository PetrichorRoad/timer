<template>
  <div class="w-[100%] h-[100%] box-border absolute p-2" :style="{ zIndex }">
    <div class="relative w-[100%] h-[100%] box-border" v-if="loading" v-loading="loading"></div>
    <iframe
      frameborder="0"
      class="w-full h-full box-border"
      :src="props.routeInfo.link"
      v-show="!loading"
      @error="loading = false"
      @load="loading = false" 
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "@/store/setting";
import { storeToRefs } from "pinia";
const store = useStore();
const loading = ref(false);
const { activeMenu } = storeToRefs(store);
const props = defineProps({
  routeInfo: {
    type: Object,
    default: {},
  },
});
const zIndex = computed(() => {
  return activeMenu?.value.key === props.routeInfo?.key ? 1 : -999;
});
onMounted(() => {
  loading.value = true;
});
</script>

<style>
</style>