<template>
  <div class="page p-2 box-border overflow-y-auto">
    <FullCalendar :options="calendarOptions" ref="calendarRef">
      <template #eventContent="{ event:{title,extendedProps:{status} }}">
        <div class="flex gap-2 h-[24px] items-center p-[2px]" :style={backgroundColor:bcColorMap[status]}>
          <span class="text-[12px] w-[3px] h-full" :style={backgroundColor:colorMap[status]}></span>
          <n-text strong depth="1"> {{ title }} </n-text>
          <!-- <n-text strong depth="1"> {{ event.title+event.status }} </n-text> -->
        </div>
      </template>
    </FullCalendar>
    <n-modal v-model:show="showModal" preset="dialog" :show-icon="false" title="任务">
          <div class="w-full h-full">
            <n-form ref="formRef" :model="currentEvent" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small">
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
                <n-date-picker type="daterange" v-model:value="currentEvent.timeRange"
                  placeholder="选择日期时间"></n-date-picker>
              </n-form-item>
              <n-form-item label="任务内容" path="title">
                <n-input
                  type="textarea"
                  v-model:value="currentEvent.content"
                  placeholder="任务标题"
                />
                
              </n-form-item> 
              <n-form-item label="状态" path="title">
                <n-radio-group size="small" v-model:value="currentEvent.status" name="radiobuttongroup1">
                  <n-radio-button v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></n-radio-button>
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
  </div>
</template>

<script setup lang="jsx">
import { ref, reactive, onMounted } from "vue";
import editor from "@/components/editor/editorEMC.vue";
import request from "@/api/base"
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
  'task': '任务',
  'meeting': '会议',
  'defect': '缺陷'
}
let statusList = [
  { label: "带开始", value: "1" ,disabled:false},
  { label: "进行中", value: "2" ,disabled:false},
  { label: "已完成", value: "3",disabled:false },
  { label: "已延期", value: "4",disabled:true },
  { label: "已关闭", value: "5" ,disabled:true},
];
const calendarRef = ref(null);
let showModal = ref(false)
let currentEvent = ref({});
let colorMap = {
  0:'#3399CC',
  1:'#99CCFF',
  2:'#CCFFFF',
  3:'#eaf7f7',
}
let bcColorMap = {
  0: '#FFCCCC',
  1: '#FF9999',
  2: '#FF6666',
  3: '#FF0033',
}
let userList = ref([])
const confirm = async () => { 
  console.log(currentEvent.value);
  let {id,timeRange} = currentEvent.value
  let [start,end] = timeRange
  let startTime = moment(start).format("YYYY-MM-DD HH:mm:ss")
  let endTime = moment(end).format("YYYY-MM-DD HH:mm:ss")
  console.log(currentEvent.value);
  if(id){
    let res = await request.updateTask({startTime,endTime,...currentEvent.value})
    console.log(res);
  }else{
    let res = await request.createTask({startTime,endTime,...currentEvent.value})
    console.log(res);
  }
  showModal.value = false
};

const cancel = () => {
  showModal.value = false
};
const getUserList = async () => {
  let {data} = await request.getUserList({companyId:1})
  userList.value = data.map((item) => {
    return {
      label: item.nickname,
      value: item.accountId,
    }
  })
}
const getTaskList = async () => {
  let {data} = await request.getTaskList({companyId:1})
  calendarOptions.value.events = data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      status: item.status,
      ownerId: item.ownerId,
      type: item.type,
      start: moment(item.startTime).format("YYYY-MM-DD"),
      end: moment(item.endTime).format("YYYY-MM-DD"),
      resourceId: item.resourceId,
      status: item.status,
    }
  })
}

const handleEventMouseEnter = (info) => {
};
const handleDateSelect = (info) => {
  let {start,end} = info
  currentEvent.value = {title:'',timeRange:[moment(start).valueOf(),moment(end).valueOf()],type:0,ownerId:"",content:"",status:0}
  showModal.value = true
};
const handleEventClick = (info) => {
  let {event:{title,start,end,id,extendedProps:{type,ownerId,content,status}}} = info
  currentEvent.value = {title,timeRange:[moment(start).valueOf(),moment(end).valueOf()],type,ownerId,content,status,attachment:'',id}
  showModal.value = true
};
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimelinePlugin, listPlugin],
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
  aspectRatio:3,
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
  // eventClick: handleDateClick, // 日程点击事件
  eventMouseEnter: handleEventMouseEnter, // 用户将鼠标悬停在事件上时触发
  eventClick: handleEventClick, //日程点击事件
  locale: zhCnLocale,
  nextDayThreshold: "01:00:00",
  events: [],
});
onMounted(() => {
  getTaskList();
  getUserList()
});
</script>

<style></style>