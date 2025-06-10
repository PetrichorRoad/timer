<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :show-icon="false"
    title="任务"
    style="width: 500px"
  >
    <div class="w-full h-full">
      <n-form
        ref="formRef"
        :model="currentEvent"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="small"
      >
        <n-form-item label="责任人" path="title">
          <n-select
            v-model:value="currentEvent.ownerId"
            placeholder="责任人"
            :options="userList"
          >
          </n-select>
        </n-form-item>
        <n-form-item label="任务标题" path="title">
          <n-input v-model:value="currentEvent.title" placeholder="任务标题" />
        </n-form-item>
        <n-form-item label="任务时间" path="time">
          <n-date-picker
            type="daterange"
            v-model:value="currentEvent.timeRange"
            placeholder="选择日期时间"
          ></n-date-picker>
        </n-form-item>
        <n-form-item label="任务内容" path="title">
          <n-input
            type="textarea"
            v-model:value="currentEvent.content"
            placeholder="任务标题"
          />
        </n-form-item>
        {{ currentEvent.type }}
        <n-form-item label="状态" path="title">
          <n-radio-group
            size="small"
            v-model:value="currentEvent.status"
            name="radiobuttongroup1"
          >
            <n-radio-button
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></n-radio-button>
          </n-radio-group>
        </n-form-item>
        <!-- <n-form-item label="任务附件" path="title">
                <n-upload
                  action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                  :default-file-list="currentEvent.attachment"
                  list-type="image-card"
                >
                  点击上传
                </n-upload>
              </n-form-item> -->
      </n-form>
    </div>
    <template #action>
      <div class="flex gap-2">
        <n-button strong secondary round @click="confirm" type="primary">
          确定
        </n-button>
        <n-button strong secondary round @click="cancel" type="default">
          取消
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import moment from "moment";
import request from "@/api/base";
import { useRoute } from "vue-router";
let route = useRoute();
let showModal = ref(false);
let currentEvent = ref({
  //   id: "",
  ownerId: "",
  title: "",
  timeRange: [moment().valueOf(), moment().valueOf()],
  content: "",
  status: 1,
  //   attachment: [],
  projectId: route.query.projectId,
});
let userList = ref([]);
let statusList = [
  { label: "待开始", value: "1" },
  { label: "进行中", value: "2" },
  { label: "已完成", value: "3" },
  { label: "已延期", value: "4" },
  { label: "已取消", value: "5" },
];
let emit = defineEmits(["confirm"]);
// 任务状态(1:待开始 2:进行中 3:已完成 4:已延期 5:已取消)
const confirm = async () => {
  console.log(currentEvent.value);
  let { timeRange,status } = currentEvent.value;
  let [start, end] = timeRange;
  let startTime = moment(start).format("YYYY-MM-DD HH:mm:ss");
  let endTime = moment(end).format("YYYY-MM-DD HH:mm:ss");
  emit("confirm", { startTime, endTime, ...currentEvent.value });
  showModal.value = false;
};
const getUserList = async () => {
  let { data } = await request.getUserList({ companyId: 1 });
  userList.value = data.map((item) => {
    return {
      label: item.nickname,
      value: item.accountId,
    };
  });
};
const cancel = () => {
  showModal.value = false;
};
const open = (data) => {
  if (data) {
    let { startTime, endTime,ownerId,title,content,type,projectId,id} = data;
    let task = {
      timeRange: [moment(startTime).valueOf(), moment(endTime).valueOf()],
      ownerId,title,content,status:type,projectId,id
    };
    currentEvent.value = task;
  }
  showModal.value = true;
};
onMounted(() => {
  getUserList();
});
defineExpose({
  open,
});
</script>

<style>
</style>