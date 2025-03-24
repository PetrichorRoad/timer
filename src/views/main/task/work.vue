<template>
  <div class="page p-2 box-border overflow-y-auto">
    <FullCalendar :options="calendarOptions" ref="calendarRef">
      <h1>213123</h1>
      <template #eventContent="{ event }">
        <n-popover trigger="click" content-class="w-[600px] h-[400px]">
          <template #trigger>
            {{ event.title }}
          </template>
          <template #header>
            <n-text strong depth="1"> {{ taskMap[currentEvent.type] }} </n-text>
          </template>
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
                  v-model:value="currentEvent.person"
                  placeholder="任务标题"
                >
                  <!-- <n-option v-for="item in 5" :key="item" :label="item" :value="item">{{ item }}</n-option> -->
                </n-select>
              </n-form-item>
              <n-form-item label="任务标题" path="title">
                <n-input
                  v-model:value="currentEvent.title"
                  placeholder="任务标题"
                />
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
                <!-- <editor api-key="no-api-key" ref="editorRef"></editor> -->
              </n-form-item>
              <n-form-item label="任务附件" path="title">
                <n-upload
                  action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                  :default-file-list="currentEvent.attachment"
                  list-type="image-card"
                >
                  点击上传
                </n-upload>
              </n-form-item>
            </n-form>
          </div>
          <template #footer>
            <div class="flex gap-2">
              <n-button strong secondary round type="warning">
                <template #icon>
                  <span class="text-[12px]">完成</span>
                  <n-icon size="12"><CashOutline /></n-icon>
                </template>
              </n-button>
              <n-button strong secondary round type="error">
                <template #icon>
                  <span class="text-[12px]">拒绝</span>
                  <n-icon size="12"><CashOutline /></n-icon>
                </template>
              </n-button>
              <n-button strong secondary round color="#8a2be2">
                <template #icon>
                  <span class="text-[12px]">修改</span>
                  <n-icon size="12"><CashOutline /></n-icon>
                </template>
              </n-button>
            </div>
          </template>
        </n-popover>
      </template>
    </FullCalendar>
  </div>
</template>

<script setup lang="jsx">
import { ref, reactive, onMounted } from "vue";
import editor from "@/components/editor/editorEMC.vue";
import moment from "moment";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import zhCnLocale from "@fullcalendar/core/locales/zh-cn";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { CashOutline } from '@vicons/ionicons5'
import "tippy.js/dist/tippy.css"; // optional for styling
let task = ref([])
let taskMap = {
  'task':'任务',
  'meeting':'会议',
  'defect':'缺陷'
}
const calendarRef = ref(null);
let currentEvent = ref({});
const getTaskList = async () => {
  let data = [
    {
      id: 1,
      title: "Task 1",
      content:'今日摸鱼，不必理会',
      state:'finish',
      person:'离南江',
      type:'task',
      start: "2025-03-01",
      end: "2025-03-03",
      resourceId: "a",
    },
    {
      id: 2,
      title: "Task 2",
      content:'今日摸鱼，不必理会2',
      person:'离南江',
      type:'defect',
      start: "2025-03-22",
      end: "2025-03-26",
    }
  ]
  calendarOptions.value.events = data
}

const handleEventMouseEnter = (info) => {
  // console.log(info);
};
const handleDateSelect = (info) => {
  
};
const handleDateClick = (info) => {
  console.log(info);
};
const handleEventClick = (info) => {
  let {event:{title,start,end,extendedProps:{type,person,content,state}}} = info
  currentEvent.value = {title,timeRange:[moment(start).valueOf(),moment(end).valueOf()],type,person,content,state,attachment:['https://picsum.photos/200/300']}
  console.log(currentEvent.value );
};
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin,resourceTimelinePlugin,listPlugin],
  initialView: "dayGridMonth",
  height: 800, //日历高度
  //   width: 600,
  headerToolbar: {
    // 头部toolba
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    // right: 'dayGridMonth'
  },
  // headerToolbar:false,
  handleWindowResize: true, //随浏览器窗口变化
  // initialDate:""//初始化日期
  // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  editable: true, //是否可编辑
  // droppable: true,//可拖拽的
  // timeZone: 'local',//采用时区
  selectable: true,
  // selectMirror: true,
  dayMaxEvents: true,
  select: handleDateSelect,
  eventClick: handleDateClick, // 日程点击事件
  eventMouseEnter: handleEventMouseEnter, // 用户将鼠标悬停在事件上时触发
  eventClick: handleEventClick, //日程点击事件
  locale: zhCnLocale,
  nextDayThreshold: "01:00:00",
  events: [] ,
});
onMounted(() => {
  getTaskList();
});
</script>

<style>
</style>