<template>
  <div class="page box-border flex gap-2 flex-col h-full">
    <div class="h-full overflow-hidden">
      <n-card title="项目动态" class="flex-1 h-full" :segmented="{ content: true, footer: 'soft' }">
        <template #header-extra>
          <n-button type="primary" @click="createTask">创建任务</n-button>
        </template>
        <div class="h-full overflow-y-auto">
          <!-- <n-steps :current="current" :status="currentStatus" size="small">
            <n-step v-for="(item, index) in steps" :key="index">
              <template #title>
                <div class="flex items-center gap-1">
                  <span>{{ item.title }}</span>
                  <n-icon size="12" :component="AlertCircle" />
                </div>
              </template>
            </n-step>
          </n-steps> -->

          <n-data-table :columns="columns" :data="taskList" :pagination="pagination" :min-height="height" :max-height="height" />
        </div>
      </n-card>
    </div>
  </div>

  <taskModal ref="taskModalRef" @confirm="confirm"></taskModal>
</template>

<script setup lang="jsx">
import { AlertCircle } from "@vicons/ionicons5";
import taskModal from "../modal/task-Modal.vue";
import { onMounted, ref, computed, reactive, h } from "vue";
import request from "@/api/base";
import { useRoute } from "vue-router";
import moment from "moment";
let taskModalRef = ref(null);
let statusList = [
  { label: "带开始", value: "1", disabled: false, type: { color: '#3399CC', textColor: '#5470C6', borderColor: '#5470C6' } },
  { label: "进行中", value: "2", disabled: false, type: { color: '#99CCFF', textColor: '#91CC75', borderColor: '#91CC75' } },
  { label: "已完成", value: "3", disabled: false, type: { color: '#CCFFFF', textColor: '#FAC858', borderColor: '#FAC858' } },
  { label: "已延期", value: "4", disabled: true, type: { color: '#eaf7f7', textColor: '#EE6666', borderColor: '#EE6666' } },
  { label: "已关闭", value: "5", disabled: true, type: { color: '#8e6d5b', textColor: '#73C0DE', borderColor: '#73C0DE' } },
];
// import {  NProgressBar, NTag, } from "naive-ui";
let route = useRoute();
let taskList = ref([]);
let columns = [
  {
    title: "任务名称",
    key: "title",
  },
  {
    title: "任务描述",
    key: "content",
  },
  {
    title: "任务状态",
    key: "status",
    render(row) {
      return (
        <n-tag color={statusList[row.type].type} size="small">
          {statusList[row.type].label}
        </n-tag>
      );
    }
  },
  {
    title: "任务进度",
    key: "progress",
    render(row) {
      return (
        <n-progress
          percentage={row.progress}
          type="line"
          show-percentage={false}
          color={row.progress > 50 ? '#13ce66' : '#ff4949'}
        />
      );
    }
  },
  {
    title: "任务开始时间",
    key: "startTime",
    render(row) {
      return (<span>{moment(row.startTime).format("YYYY-MM-DD HH:mm:ss")}</span>);
    },
  },
  {
    title: "任务结束时间",
    key: "endTime",
    render(row) {
      return (<span>{moment(row.endTime).format("YYYY-MM-DD HH:mm:ss")}</span>);
    },
  },
  {
    title: "操作",
    key: "options",
    render(row) {
      return (
        <div className="flex gap-2">
          <n-button type="primary" onClick={() => {createTask(row);}}>修改</n-button>
          <n-button  type="error"  onClick={() => {deleteTask(row);}}>删除</n-button>
        </div>
      );
    },
  },
]
const height = computed(() => {
  return window.innerHeight - 520
})
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [3, 5, 7],
  onChange: (page) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})
const getTaskList = async () => {
  let res = await request.getTaskList({ projectId: taskDetail.value.projectId });
  taskList.value = res.data;
  console.log(res.data);
};
const taskDetail = computed(() => {
  return route.query;
});
const createTask = (data) => {
  taskModalRef.value.open({...data,projectId:taskDetail.value.projectId})
}
const deleteTask = async (data) => { 
  console.log(request);
  let res = await request.removeTask({ id: data.id })
  getTaskList();
}
const confirm = async (data) => {
  console.log(data);
  let { id } = data
  if (id) {
    let res = await request.updateTask(data)
  } else {
    let res = await request.createTask(data)
  }
  getTaskList();
}
onMounted(() => {
  getTaskList();
});
// const current = ref(1);
// const currentStatus = ref("process");
// const steps = ref([
//   {
//     title: "需求沟通",
//     description: "需求沟通",
//     status: "process",
//   },
//   {
//     title: "方案策划",
//     status: "process",
//   },
//   {
//     title: "功能开发",
//     status: "process",
//   },
//   {
//     title: "系统测试",
//     description: "需求沟通",
//     status: "process",
//   },
//   {
//     title: "产品确认",
//     description: "需求沟通",
//     status: "process",
//   },
//   {
//     title: "系统上线",
//     description: "需求沟通",
//     status: "process",
//   },
//   {
//     title: "项目结算",
//     description: "需求沟通",
//     status: "process",
//   },
// ]);
</script>

<style></style>