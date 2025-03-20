<template>
  <div class="page p-2 box-border overflow-y-auto">
    <FullCalendar :options="calendarOptions">
      <!-- <template #eventContent="{ event }">
        <div class="tooltip">
          <div class="text-sm font-medium">
            {{ event }}
          </div>
        </div>
      </template> -->
    </FullCalendar>
  </div>
</template>

<script setup lang="jsx">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import zhCnLocale from "@fullcalendar/core/locales/zh-cn";
import timeGridPlugin from "@fullcalendar/timegrid";

import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
const handleEventMouseEnter = (info) => {
  console.log(info);
};
const handleEventClick = (info) => {
  console.log(info);
};
const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin,resourceTimelinePlugin],
  initialView: "dayGridMonth",
  height: 800, //日历高度
  //   width: 600,
  headerToolbar: {
    // 头部toolba
    left: "prev,next today",
    center: "title",
    right: "timeGridDay,timeGridWeek,dayGridMonth",
    // right: 'dayGridMonth'
  },
  handleWindowResize: true, //随浏览器窗口变化
  // initialDate:""//初始化日期
  // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  editable: true, //是否可编辑
  // droppable: true,//可拖拽的
  // timeZone: 'local',//采用时区
  selectable: true,
  // selectMirror: true,
  dayMaxEvents: true,
  //   eventContent:(event,element)=>{
  //     // console.log(event,element);
  //     // return{
  //     //     html:`<div class="tooltip">
  //     //     <div class="text-sm font-medium">
  //     //       ${event.title}
  //     //     </div>
  //     //   </div>`
  //     // }
  //   },
  // weekends: true, // 是否显示一周七天
  // select: this.handleDateSelect,
  // eventClick: this.handleEventClick, // 日程点击事件
  eventMouseEnter: handleEventMouseEnter, // 用户将鼠标悬停在事件上时触发
  // eventsSet: this.handleEvents,
  // dateClick: this.handleDateClick,//日期方格点击事件
  eventClick: handleEventClick, //日程点击事件
  locale: zhCnLocale,
  nextDayThreshold: "01:00:00",
  resourceAreaColumns: [
        {
          headerContent: "车型",
          field: "room_name",
        },
        {
          headerContent: "车牌",
          field: "car_code",
        },
  ],
   resourceAreaWidth: "15%",
    resources: [{
      id: 1,
      room_name: 'item.car_type',
      car_code: 'item.car_code',
    }],
  events: [
    {
      id: "1",
      title: "周末双休",
      start: "2025-03-22",
      end: "2025-03-25",
    },
    {
      id: "4",
      title: 'asj',
      start: "2025-03-22",
      end: "2025-03-25",
      allDay: true,
      textColor:"pink",
    //   color: "transparent",
    },
    {
      id: "2",
      title: "周末双休",
      start: "2025-03-27",
      end: "2025-03-29",
    },
  ],
  // datesSet: this.handleDateSet,
  /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
};
</script>

<style>
</style>