<template>
  <div class="page p-2 box-border overflow-y-auto flex flex-col">
    <n-card>
      <div class="box-border flex gap-4 h-[80px]">
        <div class="left">
          <n-avatar :size="80" round :src="userInfo.avatar" />
        </div>
        <div class="right h-full flex flex-col justify-between py-2">
          <p>{{ userInfo.signature }}</p>
          <p class="flex gap-4">
            <span class="gap">{{ userInfo.department }}</span>
            <span class="gap">{{ userInfo.organization }}</span>
            <span class="gap">{{ userInfo.position }}</span>
            <span>{{ userInfo.name }}</span>
          </p>
        </div>
      </div>
    </n-card>
    <div class="box-border flex gap-2 flex-1 bg-my-bg-2">
      <n-card title="常用应用">
        <div class="appList">
            <div class="appItem box-border flex gap-4 h-[80px] p-2 box-border items-center rounded-md" v-for="(item,index) in appList" :key="index" @click="openApp(item)">
              <n-icon size="50" class="appIcon">
                <component :is="item.icon"></component>
              </n-icon>
              <div class="right h-full flex flex-col justify-between">
                <span>{{ item.name }}</span>
                <span>{{ item.description }}</span>
              </div>
            </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BoatSharp } from "@vicons/ionicons5";
import { useRouter } from "vue-router";
let router = useRouter();
let userInfo = ref({
  name: "赵晨宇",
  avatar: "https://picsum.photos/seed/picsum/200/300",
  signature: "人生若只如初见，何事秋风悲画扇",
  nickname: "繁星",
  position: "前端工程师",
  organization: "前端组",
  department: "基础研发",
});
let appList = ref([
  {
    name: "我的信息",
    description: "查看个人信息",
    code: "myInfo",
    icon: BoatSharp,
    url: "https://github.com/zhaochenyu",
  },
  {
    name: "发布公告",
    description: "发布企业公告",
    code: "publishNotice",
    icon: BoatSharp,
    url: "https://github.com/zhaochenyu",
  },
]);
const openApp = (app) => { 
    let { code } = app;
    router.push({
      name: 'workbench',
      query: {
        page:code,
      },
    });
};
</script>

<style lang="less" scoped>
.gap {
  position: relative;
  &::after {
    content: "/";
    position: absolute;
    height: 100%;
    top: 0;
    right: -10px;
  }
}
.appList{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    .appItem{
        border: 1px solid #ccc;
    }
}
</style>