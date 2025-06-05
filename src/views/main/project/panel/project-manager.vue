<template>
  <div class="page box-border flex gap-2 flex-col h-full">
    <div class="h-full">
      <n-card title="项目动态" class="flex-1 h-full">
        <div class="h-full">
          <n-steps :current="current" :status="currentStatus" size="small">
            <n-step v-for="(item, index) in steps" :key="index">
              <template #title>
                <div class="flex items-center gap-1">
                  <span>{{ item.title }}</span>
                  <n-icon size="12" :component="AlertCircle" />
                </div>
              </template>
            </n-step>
          </n-steps>
        </div>
      </n-card>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { AlertCircle } from "@vicons/ionicons5";
import { ref } from "vue";
const current = ref(1);
const currentStatus = ref("process");
const steps = ref([
  {
    title: "需求沟通",
    description: "需求沟通",
    status: "process",
  },
  {
    title: "方案策划",
    status: "process",
  },
  {
    title: "功能开发",
    status: "process",
  },
  {
    title: "系统测试",
    description: "需求沟通",
    status: "process",
  },
  {
    title: "产品确认",
    description: "需求沟通",
    status: "process",
  },
  {
    title: "系统上线",
    description: "需求沟通",
    status: "process",
  },
  {
    title: "项目结算",
    description: "需求沟通",
    status: "process",
  },
]);
</script>

<style>
</style>