<template>
  <div class="page relative flex">
    <div class="left-chat-list flex flex-col w-[300px] border-solid border-r-[1px] border-[#44496B]">
      <search-header :options="options" @on-keyword="onKeywordChange" @on-select="onselect"></search-header>

      <!-- <top-header
        :index-name="indexName"
        :items="talkStore.topItems"
        v-show="loadStatus === 3 && talkStore.topItems.length > 0"
        @tab-talk="(value) => onTabTalk(value, true)"
      /> -->
      <tabs-header v-model="selectIndex" />

      <main class="flex-1 overflow-y-auto">
        <n-virtual-list ref="virtualListInst" class="max-h-inherit pointer" :item-size="66" :items="talkList.value">
          <template #default="{ item }">
            <talk-item :key="item.index_name" :data="item" :avatar="item.avatar" :username="item.remark || item.name"
             @tab-talk="onTabTalk" @top-talk="onToTopTalk"
              ></talk-item>
          </template>
        </n-virtual-list>
      </main>

    </div>
    <div class="left-chat-list flex-1"></div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import searchHeader from "./chat-left/search-header.vue";
// import topHeader from "./chat-left/top-header.vue";
import tabsHeader from "./chat-left/tabs-header.vue";
import talkItem from "./chat-left/talk-item.vue";
import { chatStore } from "@/store/chat.js";
const talkStore = chatStore();
const { getChatList } = talkStore;
const { allChatList, friendChatList, groupChatList, talkUnreadNum } = storeToRefs(talkStore);
const talkList = computed(() => {
  let talksList = [allChatList, friendChatList, groupChatList, talkUnreadNum];
  console.log(talksList[selectIndex.value]);
  
  return talksList[selectIndex.value]
});
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
const onKeywordChange = () => { };
const onselect = (value) => { };
const onTabTalk = (index) => {
};
const onToTopTalk = (index) => {
}
onBeforeMount(async () => {
  await getChatList()
});
</script>


<style lang="less" scoped></style>