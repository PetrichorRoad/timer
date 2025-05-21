<template>
  <div class="page p-2 box-border overflow-y-auto flex gap-2">
    <div class="left flex flex-col gap-2 flex-1">
      <div class="flex justify-between gap-2">
        <div
          class="number p-2 bg-my-bg-4 flex flex-col gap-2 flex-1 relative"
          v-for="item in 4"
          :key="item"
        >
          <div class="position tip"></div>
          <n-statistic tabular-nums class="">
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="12039"
            />
          </n-statistic>
          <div class="text-center">即将结束项目</div>
        </div>
      </div>
      <div class="flex gap-2">
        <n-card title="项目动态" class="flex-1">
          <div class="h-[200px] overflow-y-auto flex flex-col gap-4">
            <n-timeline v-for="(item, index) in 10" :key="index">
              <n-timeline-item time="2018-04-03 20:46" type="success">
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-1">
                    <n-avatar
                      :size="20"
                      :src="'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'"
                    />
                    <span class="w-[]">朱晓明</span>
                  </div>
                  <span class="w-[]">港交所上市计划项目</span>
                  <a>更新了提案</a>
                </div>
              </n-timeline-item>
            </n-timeline>
          </div>
        </n-card>
        <n-card title="近期代办" class="flex-1">
          <div class="h-[200px]"></div>
        </n-card>
      </div>
      <div class="flex gap-2 flex-1 overflow-hidden">
        <n-card title="项目动态" class="flex-1 overflow-hidden h-full">
          <div class="flex flex-col gap-2 h-full overflow-y-scroll">
            <div
              v-for="(item, index) in projectList"
              :key="index"
              class="bg-my-bg-2 p-4 rounded-xl flex flex-col relative "
            >
              <div class="absolute tag px-2 py-1 bg-my-bg-3 text-[12px]" @click="checkDetail(item)">
                {{ item.projectId }}
              </div>
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
                    <span class="text-[16px] font-400">{{ item.projectName }}</span>
                  </div>
                  <div class="flex gap-2 h-full justify-between">
                    <div class="flex flex-col h-full justify-between">
                      <div class="flex gap-2 items-center">
                        <span class="w-[80px]"> 承担部门 </span>
                        <span class=""> 研发中心/基础研发部 </span>
                      </div>
                      <div class="flex gap-2 items-center">
                        <span class="w-[80px]"> 负责人 </span>
                        <span class=""> {{ item.projectManager }} </span>
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
                      <span>负责团队</span>
                      <n-avatar-group :options="item.projectMemberVoList" :size="24" :max="5">
                        <template #avatar="{ option: { nickname, avatar } }">
                          <n-tooltip>
                            <template #trigger>
                              <n-avatar :src="avatar" />
                            </template>
                            {{ nickname }}
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
      </div>
    </div>
    <div class="right flex flex-col gap-2 w-[40%]">
      <n-card title="项目状态统计" class="flex-1"></n-card>
      <n-card title="项目类型统计" class="flex-1"></n-card>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch, ref, h, nextTick, onMounted } from "vue";
import { CashOutline } from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import request from "@/api/base";
let router = useRouter();
let projectList = ref([]);
const createDropdownOptions = (options) =>
  options.map((option) => ({
    key: option.name,
    label: option.name,
  }));
const getProjectList = async () => {
  let {data} = await request.getProjectList();
  console.log(data);
  projectList.value = data;
}
const checkDetail = (item) => {
  router.push({
    name: 'project-detail',
    query: {
      ...item
    }
  })
}
onMounted(() => {
  getProjectList();
});
</script>

<style lang="less" scoped>
:deep(.n-statistic-value) {
  text-align: center;
}
:deep(.n-card__content){
  height: 100%;
  // padding-top: 20px;
}
.tip {
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  background: #ffc3d4;
  height: 80%;
  border-radius: 2px;
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