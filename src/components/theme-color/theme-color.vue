<template>
  <div class="pr-2">
    <n-radio-group :value="computedTheme" @update:value="setTheme">
      <n-radio-button
        v-for="song in songs"
        :key="song.value"
        :value="song.value"
        :label="song.label"
      />
    </n-radio-group>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@/store/index";
const store = useStore();
const { setTheme } = store;
const computedTheme = computed(() => {
  return store.theme;
});
const songs = [
  {
    value: "light",
    label: "明亮",
  },
  {
    value: "dark",
    label: "黑暗",
  },
  {
    value: "overrides1",
    label: "主题"
  }
];
</script>

<style scoped>
</style>