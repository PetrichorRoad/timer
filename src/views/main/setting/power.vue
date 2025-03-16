<template>
  <div class="page p-2 box-border bg flex flex-col h-full overflow-auto">
    <div class="h-[30%] flex items-center justify-center">
      <!-- <input type="text" /> -->
    </div>
    <div class="h-[70%] w-[70%] grid">
      <template v-for="(item, index) in appList" :key="index">
        <div class="lager" v-if="item.type === 'card'">
          <div class="flex flex-col items-center justify-around w-[70%] h-full">
            <!-- <div>与Tina相识</div> -->
            <n-statistic label="你一共处理了" tabular-nums>
              <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="12039"
              />
              <template #suffix> 条群消息 </template>
            </n-statistic>
            <div>{{ date }}</div>
          </div>
          <div class="flex-1 h-full"></div>
        </div>

        <div class="app" v-if="item.type === 'app'">
          <img class="logo" :src="item.logo" alt="" />
          <span>{{ item.label }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { computed, reactive, watch, ref,h, nextTick, onMounted } from "vue";
import moment from "moment";
const date = ref(moment().format("YYYY-MM-DD"));
const appList = ref([])
const getAppList = (index) => {
  let application = []
  for (let index = 0; index < 31; index++) {
    application.push({
      label: "我的应用",
      value:"user",
      logo: " https://api.opics.org/api",
      type:'app',
      size:'normal'
    })
  }
  application[index] = {
    label: "我的应用",
    value:"user",
    logo: " https://api.opics.org/api",
    type:'card',
    size:'normal'
  }
  appList.value = application
}
onMounted(() => {
  getAppList(7)
})
</script>

<style lang="less" scoped>
.bg {
  background: url("@/assets/images/common/nature.jpg");
  background-size: cover;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 50px;
  margin: auto;
  .lager {
    grid-row: 3/ span 2;
    grid-column: 2/ span 3;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 1rem;
    background-image: url("@/assets/images/common/larg.jpg");
    opacity: 1;
    background-size: 100% 100%;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
    }
  }
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    .logo {
      width: 80px;
      height: 80px;
      border-radius: 1rem;
    }
    .text {
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>