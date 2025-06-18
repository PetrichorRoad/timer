<template>
  <div class="page relative flex">
    <div
      class="left-chat-list w-[300px] border-solid border-r-[1px] border-[#44496B]"
    >
      <search-header
        :options="options"
        @on-keyword="onKeywordChange"
        @on-select="onselect"
      ></search-header>

      <!-- <top-header
        :index-name="indexName"
        :items="talkStore.topItems"
        v-show="loadStatus === 3 && talkStore.topItems.length > 0"
        @tab-talk="(value) => onTabTalk(value, true)"
      /> -->
      <tabs-header v-model="selectIndex"/>
    </div>
    <div class="left-chat-list flex-1"></div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import searchHeader from "./chat-left/search-header.vue";
// import topHeader from "./chat-left/top-header.vue";
import tabsHeader from "./chat-left/tabs-header.vue";
import { chatStore } from "@/store/chat.js";
const talkStore = chatStore();
const {getChatList} = talkStore;

const options = ref([
  {
    label: "添加好友",
    key: "friend",
  },
  {
    label: "创建群聊",
    key: "create-group",
  },
]);
const selectIndex = ref(0)
const onKeywordChange = () => {};
const onselect = (value) => {};
// onBeforeRouteEnter(async (to, from,next) => {
//   await getChatList()
//   next()
// });
onBeforeMount(async () => {
  await getChatList()
});
</script>


<style lang="less" scoped>
</style>