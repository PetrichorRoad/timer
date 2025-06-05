<template>
  <div class="h-full box-border flex gap-2 flex-col">
    <n-card class="h-full">
      <div class="flex gap-2 flex-col h-full">
        <div class="flex gap-2 h-full">
          <n-card
            title="项目信息"
            :segmented="{ content: true, footer: 'soft' }"
            class="h-full flex-1"
          >
            <!-- <n-data-table
              :columns="columns"
              :data="tableData"
              :single-line="false"
              size="small"
              class="custom-table"
            /> -->
            <table border class="w-full task-detail-container">
              <tbody class="h-full grid table-body">
                <!-- {{ taskDetail }} -->
                <tr v-for="(item, key) in keyMap" :key="key" class="item">
                  <th>{{ item }}</th>
                  <td>
                    <span class="priority-tag">
                      {{ taskDetail[key] }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </n-card>
          <div class="w-[20%] min-w-[300px] flex flex-col gap-2">
            <n-card title="项目进度" class="">
              <div class="flex flex-col gap-2">
                <div class="flex items-center">
                  <span class="w-[100px]">项目结束</span>
                  <span class="flex-1">{{
                    projectSchedule.projectResult
                  }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-[100px]">时间进度</span>
                  <span class="flex-1">{{ projectSchedule.timeProgress }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-[100px]">自评进度</span>
                  <span class="flex-1">{{
                    projectSchedule.selfAssessmentProgress
                  }}</span>
                </div>
              </div>
            </n-card>
            <n-card title="项目经营数据" class="flex-1">
              <div class="flex flex-col gap-2">
                <div class="flex items-center">
                  <span class="w-[100px]">合同金额</span>
                  <span class="flex-1">{{ BusinessData.contractAmount }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-[100px]">净收入</span>
                  <span class="flex-1">{{ BusinessData.netIncome }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-[100px]">成本</span>
                  <span class="flex-1">{{ BusinessData.totalCost }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-[100px]">风险预估成本</span>
                  <span class="flex-1">{{
                    BusinessData.riskAssessmentCost
                  }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-[100px]">利润</span>
                  <span class="flex-1">{{ BusinessData.profit }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-[100px]">利润率</span>
                  <span class="flex-1">{{ BusinessData.profitMargin }}</span>
                </div>
              </div>
            </n-card>
          </div>
        </div>
        <div></div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
let route = useRoute();

const keyMap = {
  projectId: "项目编号",
  projectName: "项目名称",
  projectStatus: "项目状态",
  projectType: "项目类型",
  projectPhase: "项目阶段",
  clientName: "客户名称",
  priorityLevel: "优先级别",
  projectBudget: "项目预算",
  planStartDate: "计划开始",
  planEndDate: "计划结束",
  actualStartDate: "实际开始",
  actualEndDate: "实际结束",
  plannedHours: "计划工时",
  actualHours: "实际工时",
  projectManager: "项目管理人",
  projectSupervisor: "项目监控人",
  projectDescription: "项目说明",
  creatorDept:'创建人部门',
  createTime:  "创建时间",
  organizationTime:"创建人"
};
const taskDetail = computed(() => {
  console.log(route.query);
  return route.query;
});

const BusinessData = {
  contractAmount: "1,275,000.00元",
  netIncome: "1,202,830.00元",
  totalCost: "849,120.00元",
  riskAssessmentCost: "89,120.00元",
  profit: "353,709.00元",
  profitMargin: "29.41%",
};
const projectSchedule = {
  projectResult: "还有 31 天",
  timeProgress: "0%",
  selfAssessmentProgress: "0%",
};
const todo = {
  demand: 0,
  progress: 0,
  delay: 0,
  overdue: 0,
};
</script>

<style lang="less" scoped>
/* 使用Element UI色值体系 */
:root {
  --th-bg: #f5f7fa; /* 表头背景 */
  --border-color: #ebeef5; /* 边框颜色 */
  --text-primary: #303133; /* 主文字颜色 */
  --text-secondary: #606266; /* 次级文字颜色 */
}
.task-detail-container {
  border-collapse: collapse;
  .table-body {
    grid-template-columns: repeat(2, 1fr);
    .item {
      display: flex;
      align-items: center;
      text-align: left;
      // gap: 1.25rem;
      // padding: 8px 0;
      // border: 1px solid #ebeef5;
      th {
        width: 80px;
        color: var(--text-secondary);
        font-weight: 500;
        text-align: right;
        padding: 4px;
      }
      td {
        color: var(--text-primary);
        flex: 1;
        padding: 4px;
      }
    }
  }
}
</style>