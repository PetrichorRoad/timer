<template>
  <div class="page p-2 box-border">
    <n-data-table
      :columns="columns"
      :data="data"
      :row-key="rowKey"
      default-expand-all
    />
  </div>
</template>

<script setup lang="jsx">
import { computed, reactive, watch, ref,h, nextTick, onMounted } from "vue";
import { routes } from "@/router/index";
const rowKey = (row) => row.path
const data = ref(routes)
const columns = [
      {
        type: "selection"
      },
      {
        title: "name",
        key: "name"
      },
      {
        title: "index",
        key: "index"
      }
];
</script>

<style lang="less" scoped>
</style>