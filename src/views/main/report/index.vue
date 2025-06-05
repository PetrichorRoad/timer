<template>
  <div class="page p-2 box-border overflow-y-auto">
    <n-space vertical>
      <div class="flex gap-4">
        <n-card title="绩效标杆" class="flex-1">
          <div class="h-[300px] card-container">
            <div
              v-for="(item, index) in 8"
              :key="index"
              class="bg-my-bg-2 flex items-center py-2 px-4 gap-4 justify-center"
            >
              <n-avatar
                round
                :size="64"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              />
              <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                  <span class="text-lg"> 张伟成 </span>
                  <n-tag size="small" class="round-2" type="primary"
                    >中级</n-tag
                  >
                </div>
                <div class="">用户界面/UI设计师</div>
              </div>
            </div>
          </div>
        </n-card>
        <n-card title="最新公告" class="w-[500px]">
          <div
            class="bg-my-bg-2 h-[300px] p-1 gap-4 flex flex-col justify-between"
          >
            <div
              class="flex gap-4 flex-1"
              v-for="(item, index) in 3"
              :key="index"
            >
              <div class="tips bg-[#bb2649]"></div>
              <div class="flex flex-col gap-2">
                <div>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  omnis hic architecto temporibus!
                </div>
                <div>
                  <span>今天 | 下午 5：00</span>
                </div>
              </div>
            </div>
          </div>
        </n-card>
      </div>
      <div class="flex gap-4">
        <n-card title="热门项目" class="flex-1">
          <div class="flex flex-col gap-2">
            <div
              v-for="(item, index) in 3"
              :key="index"
              class="bg-my-bg-2 p-4 rounded-xl flex flex-col relative"
            >
              <div class="absolute tag px-2 py-1 bg-my-bg-3 text-[12px]">PN0001265</div>
              <div
                class="flex items-center justify-between flex-1 h-[72px] gap-4 box-border"
              >
                <div class="flex flex-col gap-2 h-full justify-between">
                  <div class="flex gap-2">
                    <n-avatar
                      :size="72"
                      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                    />
                  </div>
                </div>
                <div
                  class="flex flex-col h-[72px] justify-between gap-1 flex-1"
                >
                  <div>
                    <span class="text-[16px] font-400">新版PMS研发与应用</span>
                  </div>
                  <div class="flex gap-2 h-full justify-between">
                    <div class="flex flex-col h-full justify-between">
                      <div class="flex gap-2 items-center">
                        <span class="w-[80px]"> 承担部门 </span>
                        <span class=""> 研发中心/基础研发部 </span>
                      </div>
                      <div class="flex gap-2 items-center">
                        <span class="w-[80px]"> 负责人 </span>
                        <span class=""> 研发中心/基础研发部 </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="h-[72px] flex flex-col w-[300px]">
                  <div class="flex justify-between">
                    <span class="text-lg"> 项目数据 </span>
                  </div>
                  <div class="flex gap-1 justify-between mt-auto">
                    <div class="flex flex-col">
                      <span>所有任务</span>
                      <span> 34 </span>
                    </div>
                    <div class="flex flex-col">
                      <span>所有任务</span>
                      <span> 34 </span>
                    </div>
                    <div class="flex flex-col">
                      <span>所有任务</span>
                      <n-avatar-group :options="options" :size="24" :max="5">
                        <template #avatar="{ option: { name, src } }">
                          <n-tooltip>
                            <template #trigger>
                              <n-avatar :src="src" />
                            </template>
                            {{ name }}
                          </n-tooltip>
                        </template>
                        <template #rest="{ options: restOptions, rest }">
                          <n-dropdown
                            :options="createDropdownOptions(restOptions)"
                            placement="top"
                          >
                            <n-avatar>+{{ rest }}</n-avatar>
                          </n-dropdown>
                        </template>
                      </n-avatar-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </n-card>
        <n-card title="进度详情" class="w-[500px]">
          <div class="bg-my-bg-2 h-full py-2 px-4 justify-between flex flex-col">
            <template v-for="(item, index) in 3" :key="index">
              <div class="flex flex-col gap-2">
                <div class="flex gap-4 items-center">
                  <n-avatar
                    round
                    :size="40"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                  />
                  <div class="flex flex-col gap-2">
                    <div class="flex justify-between">
                      <span class="text-md"> 张伟成 </span>
                      <n-tag size="mini" class="round-2" type="primary"
                        ><span class="text-[12px]">中级</span></n-tag
                      >
                    </div>
                    <div class="text-[12px]">用户界面/UI设计师</div>
                  </div>
                </div>
                <div class="flex py-2 px-4 items-center bg-my-bg-4 rounded-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </template>
          </div>
        </n-card>
      </div>
    </n-space>
  </div>
</template>

<script setup lang="jsx">
import { computed, reactive, watch, ref, h, nextTick, onMounted } from "vue";
import { CashOutline } from '@vicons/ionicons5'
let options = ref([
  {
    name: '张三',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    name: '李四',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    name: '王五',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    name: '赵六',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    name: '七仔',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    name: '赵六',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    name: '七仔',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  }
])
const createDropdownOptions = (options) =>
  options.map(option => ({
    key: option.name,
    label: option.name
  }))
</script>

<style lang="less" scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.tag {
  top: 0;
  right: 0;
  border-radius: 0 1rem 0 1rem;
}
.tips {
  border: 2px solid;
  border-radius: 2px;
}
</style>