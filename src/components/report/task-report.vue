<template>
  <div class="w-[300px] h-[360px]">
    <div class="w-full h-full" ref="taskReport"></div>
  </div>
</template>

<script setup>
import { onMounted, ref ,computed,watch} from "vue";
import * as echarts from "echarts";

let taskReport = ref(null);
let props = defineProps({
  counts: {
    type: Array,
    default: () => {
      return [{}];
    },
  },
});
const option = computed(() => {
  return {
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
        data: props.counts
      },
    ],
  };
});
const initECharts = () => {
  const myChart = echarts.init(taskReport.value);
  myChart.setOption(option.value);
};
watch(() => props.counts,(newValue)=>{
    console.log(newValue);
    initECharts();
})
onMounted(() => {
  initECharts();
});
</script>

<style>
</style>