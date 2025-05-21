<template>
  <div class="page p-2 box-border flex gap-2 flex-col">
    <n-card title="" :segmented="{ content: true, footer: 'soft' }">
      <template #header>
        <div class="flex items-center gap-4">
          <n-icon :component="FolderOpenSharp" size="lager" :depth="1" />
          <span>新版PMS研发与应用</span>
          <span>PN0001265</span>
          <n-tag type="success" size="lager" round> 进行中 </n-tag>
        </div>
      </template>
      <div class="flex gap-2 flex-col">
        <div class="flex gap-2 items-center" v-for="item in 3" :key="item">
          <n-icon :component="Grid" size="lager" :depth="1" />
          <span>形目类型</span>
          <span>软件开发现场交付</span>
        </div>
      </div>
    </n-card>
    <div class="flex-1">
      <n-tabs v-model:value="name" type="card" tab-style="min-width: 80px;">
        <n-tab-pane
          v-for="panel in panels"
          :key="panel"
          :tab="panel.name"
          :name="panel.code"
        >
          <component :is="panel.component"></component>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref, markRaw } from "vue";
import { FolderOpenSharp, Grid } from "@vicons/ionicons5";
import projectContract from "./panel/project-contract.vue";
import projectManager from "./panel/project-manager.vue";
import projectInfo from "./panel/project-info.vue";
const name = ref("project-info");
const panels = ref([
  { code: "project-info", name: "项目信息", component: markRaw(projectInfo) },
  {
    code: "project-manager",
    name: "任务管理",
    component: markRaw(projectManager),
  },
  {
    code: "project-contract",
    name: "合同管理",
    component: markRaw(projectContract),
  },
]);
</script>

<style lang="less" scoped>
.n-tabs{
  height: 100%;
  display: flex;
  flex-direction: column;
  .n-tab-pane{
    flex: 1;
  }
}
</style>