<template>
  <div class="w-[300px] h-[360px]">
    <div class="w-full h-full" ref="taskReport"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
let taskReport = ref(null);
const option = ref({
  tooltip: {
    trigger: "item",
  },
  legend: {
    bottom: "5%",
    left: "center",
    textStyle: {
      color: "#fff", // 设置字体颜色为白色
    },
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "待开始" },
        { value: 735, name: "已完成" },
        { value: 580, name: "进行中" },
        { value: 484, name: "已延期" },
        { value: 300, name: "已关闭" },
      ],
    },
  ],
});
const initECharts = () => {
  const myChart = echarts.init(taskReport.value);
  myChart.setOption(option.value);
};
onMounted(() => {
  initECharts();
});
</script>

<style>
</style>