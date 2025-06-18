<template>
  <div class="page p-2 box-border overflow-y-auto">
    <div class="flex gap-4">
      <div class="flex gap-4 flex-1">
        <n-card title="热门项目" class="flex-1">
          <div class="flex flex-col gap-2">
            <div
              v-for="(item, index) in projectList"
              :key="index"
              class="bg-my-bg-2 p-4 rounded-xl flex flex-col relative"
            >
              <div class="absolute tag px-2 py-1 bg-my-bg-3 text-[12px]" @click="checkDetail(item)">{{ item.projectId }}</div>
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
                        <span class=""> {{ item.creatorDept }} </span>
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
                      <span>所有任务</span>
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
      <div class="flex flex-col gap-4">
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
        <n-card title="最新公告" class="w-[500px] overflow-hidden">
          <div
            class="bg-my-bg-2 h-[300px] w-full p-1 gap-4 flex flex-col justify-between overflow-auto"
          >
            <div
              class="flex gap-4 flex-1 w-full"
              @click="openSysNotice(item)"
              v-for="(item, index) in sysNoticeList"
              :key="index"
            >
              <div class="tips bg-[#bb2649]"></div>
              <div class="flex flex-col gap-2 w-full">
                <div class="flex flex-col gap-2 w-full">
                  <div class="flex items-center justify-between">
                    <span>{{ item.title }}</span>
                    <span class="title"></span>
                  </div>
                  <div class="max-h-[40px] two-line-ellipsis">{{ item.content }}</div>
                </div>
                <div>
                  <span>{{ item.formatTime }} | 下午 5：00</span>
                </div>
              </div>
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { getAllProjectLists,getSysNotice } from "@/api/base";
import { computed, reactive, watch, ref, h, nextTick, onMounted } from "vue";
import { CashOutline } from '@vicons/ionicons5'
import { useRouter } from "vue-router";
import { formatTimeAgo } from "@/utils/lib/utils";
let router = useRouter();

let projectList = ref([]);
let sysNoticeList = ref([]);
const getProjectListData = async () => {
  const res = await getAllProjectLists({companyId:1});
  projectList.value = res.data;
};
const openSysNotice = (item) => { 
  router.push({
    name: "workbench",
    query: {
        page:"publishNotice",
        ...item
      },
  });
};
const getSysNoticeData = async () => {
  const res = await getSysNotice({});
  sysNoticeList.value = res.data.map((item)=>{
    return{
      ...item,
      formatTime: formatTimeAgo(item.publishTime)
    }
  });
  console.log(res.data);
};
const checkDetail = (item) => {
  router.push({
    name: 'project-detail',
    query: {
      ...item
    }
  })
}
const createDropdownOptions = (options) =>
  options.map(option => ({
    key: option.name,
    label: option.name
}))
onMounted(() => {
  getProjectListData();
  getSysNoticeData();
});
</script>

<style lang="less" scoped>
.two-line-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.5;
  max-height: 3em;
  
  /* 备用方案 */
  @supports not (-webkit-line-clamp: 2) {
    position: relative;
    padding-right: 1em;
    &::after {
      content: '...';
      position: absolute;
      right: 0;
      bottom: 0;
      background: white; /* 背景色需匹配父元素 */
    }
  }
}
.title{
  background: url('@/assets/images/common/new.png') no-repeat center center / contain;
  width: 30px;
  height: 30px;
}
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