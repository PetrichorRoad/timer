<template>
  <div class="bg-my-bg-1 h-full flex flex-col gap-4 box-border p-4 w-full border-box">
    <div class="flex gap-4 flex-1">
      <div class="flex-1 flex flex-col gap-4">
        <div class="bg-my-bg-3 rounded-md p-6 text-my-text-1 flex flex-col relative">
          <div>
            <div class="text-sm font-extrabold">访问量</div>
            <div class="flex items-center ">
              <n-statistic tabular-nums class="text-5xl">
                <n-number-animation ref="numberAnimationInstRef" show-separator :from="0" :to="100000000"
                  :active="false" />
              </n-statistic>
            </div>
          </div>
          <div class="absolute top-[50%] right-0 h-[200px] transform translate-x-[10%] translate-y-[-50%]" ref="catRef">

          </div>
        </div>
        <div class="flex-1 flex flex-col gap-4">
          <div class="flex gap-4 flex-1">
            <div class="w-[60%] bg-my-bg-4 rounded-md flex flex-col justify-between p-4 text-my-text-3">
              <div class="text-base flex justify-between">
                <div v-text="city"></div>
              </div>
              <div class="flex-1 flex flex-col justify-center">
                <div class="text-base flex justify-around gap-4">
                  <img width="100" :src="weatherImage" alt="" />
                  <div class="flex flex-col justify-center gap-2">
                    <div class="text-lg">{{ weather?.humidity_float }}</div>
                    <div class="text-lg">{{ weather?.weather }}</div>
                  </div>
                  <div class="flex flex-col justify-center gap-2">
                    <div class="text-lg">{{ reportDate }}</div>
                    <div class="text-xl flex gap-4 flex-wrap">
                      <span>{{ reportWeek }}</span><span>{{ reportTime }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <span class="p-1 rounded-md">温度 ： {{ weather?.humidity }}</span>
                <span class="p-1 rounded-md">风力 ： {{ weather?.windpower }}</span>
                <span class="p-1 rounded-md">风向 ： {{ weather?.winddirection }}</span>
              </div>
            </div>
            <div class="flex-1 bg-my-bg-4 rounded-md" ref="animationRef">

              <!-- <weather-icon :weather="Math.floor(Math.random() * 10)" /> -->
            </div>
          </div>
          <div class="bg-my-bg-4 h-[200px] rounded-md flex justify-around gap-2 px-2 items-center">
            <div v-for="(item, index) in weatherList" :key="index"
              class="h-[150px] rounded-md bg-my-bg-1 w-[22%] min-w-[100px] flex flex-col items-center justify-center gap-4">
              <div class="bg-my-bg-3 rounded-full w-[80px] h-[30px] flex items-center justify-center text-my-text-3"
                v-text="weekMap[item.week]"></div>
              <div class="text-my-text-2 text-xs" v-text="item.date"></div>
              <div class="text-my-text-2 text-xs" v-text="item.dayweather"></div>
              <div class="text-my-text-1 text-xs">
                {{ `${item.daytemp}° ~ ${item.daytemp_float}°` }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex-1 bg-my-bg-2 rounded-md p-4">
          <div ref="chartDom" class="w-full h-full border-box"></div>
        </div>
        <div class="h-[100px] bg-my-bg-2 rounded-md flex items-center justify-between">
          <div class="flex items-center justify-between px-4 gap-4">
            <div class="flex-1 bg-my-bg-2 rounded-md text-2xl">
              <div class="text-sm">Income</div>
              <n-number-animation ref="numberAnimationInstRef1" show-separator :from="0" :to="100000000"
                :active="false" />
            </div>
            <div class="w-[50px] h-[50px] bg-my-bg-1 flex items-center justify-center rounded-full">
              <n-icon :component="TrendingUp" size="30" :depth="1" />
            </div>
          </div>
          <div class="flex items-center justify-between px-4 gap-4">
            <div class="flex-1 bg-my-bg-2 rounded-md text-2xl">
              <div class="text-sm">Spendings</div>
              <n-number-animation ref="numberAnimationInstRef2" show-separator :from="0" :to="100000000"
                :active="false" />
            </div>
            <div class="w-[50px] h-[50px] bg-my-bg-1 flex items-center justify-center rounded-full">
              <n-icon :component="TrendingDownSharp" size="30" :depth="1" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[200px] bg-my-bg-2 rounded-md px-8 border-box justify-between flex gap-8">
      <div class="flex flex-col justify-center gap-4 ml-8 w-[20%]">
        <span class="text-my-text-1 text-2xl" v-context="menuItems">Investments</span>
        <span class="text-my-text-2 text-sm">Change since last login</span>
      </div>
      <div class="flex items-center gap-4 justify-center">
        <div v-for="(item, index) in list" :key="index"
          class="h-[150px] rounded-md bg-my-bg-1 w-[100px] flex flex-col items-center justify-center gap-4">
          <div class="bg-my-bg-3 rounded-full w-[80px] h-[30px] flex items-center justify-center text-my-text-3"
            v-text="item.name"></div>
          <div class="text-my-text-2 text-xs" v-text="item.title"></div>
          <div class="text-my-text-1 text-lg" v-text="item.value"></div>
        </div>
        <div class="h-[150px] rounded-md bg-my-bg-3 w-[100px] flex flex-col pl-4 justify-center gap-4 border-box">
          <div class="text-my-text-3 text-lg">view all</div>
          <div class="w-[30px] h-[30px] bg-my-bg-1 flex items-center justify-center rounded-full">
            <n-icon :component="ChevronForwardSharp" size="20" :depth="1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import weatherIcon from "@/components/weather/weather.vue";
import {
  TrendingUp,
  TrendingDownSharp,
  ChevronForwardSharp,
  CloudyOutline,
} from "@vicons/ionicons5";
import aiAnimationData from '@/assets/animation/work-AI.json';
import catAnimationDate from '@/assets/animation/cat.json';
import { weatherImagesList } from "@/utils/assets/index";
import { option } from "@/utils/mock/data";
import { ref, h, onMounted, computed } from "vue";
import { getWeather } from "@/api/index";
import * as echarts from "echarts";
import moment from "moment";
let animationRef = ref();
let catRef = ref();
let numberAnimationInstRef = ref();
let numberAnimationInstRef1 = ref();
let numberAnimationInstRef2 = ref();
let chartDom = ref(null);
let weather = ref(null);
let weatherList = ref([]);
let list = [
  {
    name: "Income",
    title: "Income",
    value: "+3%",
  },
  {
    name: "Spendings",
    title: "Spendings",
    value: "-1.9%",
  },
  {
    name: "Spendings",
    title: "Spendings",
    value: "+1.1",
  },
];
let weekMap = {
  7: "星期日",
  1: "星期一",
  2: "星期二",
  3: "星期三",
  4: "星期四",
  5: "星期五",
  6: "星期六",
};
let menuItems = ref([
  { label: '复制', action: () => console.log('复制') },
  { label: '删除', action: () => console.log('删除') }
])
const weatherImage = computed(() => {
  return weatherImagesList.cloudy;
});
const initChart = () => {
  let chartInstance = echarts.init(chartDom.value);
  chartInstance.setOption(option);
};
const getWeatherData = async () => {
  let params = {
    key: "40cb54bf8d4addce2cbeb69c39f9b913",
    city: 330106,
    // extensions: "all",
  };
  const res = await getWeather(params);
  weather.value = res.lives[0];
};
const getWeatherWill = async () => {
  let params = {
    key: "40cb54bf8d4addce2cbeb69c39f9b913",
    city: 330106,
    extensions: "all",
  };
  const res = await getWeather(params);
  let { casts } = res.forecasts[0];
  weatherList.value = casts;
};
const city = computed(() => {
  return `${weather.value?.province} - ${weather.value?.city}`;
});
const reportDate = computed(() => {
  return moment(weather.value?.reporttime).format("YYYY-MM-DD");
});
const reportTime = computed(() => {
  return moment(weather.value?.reporttime).format("HH:mm:ss");
});
const reportWeek = computed(() => {
  return moment(weather.value?.reporttime).format("dddd");
});
const loadAnimation = (callback) => {
  lottie.loadAnimation({
    container: animationRef.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: aiAnimationData,
  });
  lottie.loadAnimation({
    container: catRef.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: catAnimationDate,
  });
}
const playNumber = () => {
  loadAnimation()
  numberAnimationInstRef.value?.play();
  numberAnimationInstRef1.value?.play();
  numberAnimationInstRef2.value?.play();
};
onMounted(() => {
  moment.locale("zh-cn");
  playNumber();
  getWeatherData();
  getWeatherWill();
  initChart();
});
</script>

<style scoped lang="less">
:deep(.n-statistic-value__content) {
  font-size: 2rem !important;
}
</style>