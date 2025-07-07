<template>
  <div class="page relative flex">
    <div
      class="left-chat-list flex flex-col w-[300px] border-solid border-r-[1px] border-my-border-1"
    >
      <search-header
        :options="options"
        @on-keyword="onKeywordChange"
        @on-select="onselect"
      ></search-header>

      <tabs-header v-model="selectIndex" />
      <main class="flex-1 overflow-y-auto">
        <n-virtual-list
          ref="virtualListInst"
          class="max-h-inherit pointer"
          :item-size="66"
          item-resizable
          :items="talkList.value"
        >
          <template #default="{ item }">
            <talk-item
              :key="item.index_name"
              :data="item"
              :avatar="item.avatar"
              :username="item.remark || item.name"
              @tab-talk="onTabTalk"
              @top-talk="onToTopTalk"
              :active="conversation.id === item.id"
            ></talk-item>
          </template>
        </n-virtual-list>
      </main>
    </div>
    <div class="left-chat-list flex-1">
      <component :is="panelComponent"></component>
    </div>
  </div>
</template>

<script setup>
import { saveSession } from "@/database/data.js";
import { computed, onBeforeMount, ref, markRaw } from "vue";
import { storeToRefs } from "pinia";
import searchHeader from "./chat-left/search-header.vue";
import tabsHeader from "./chat-left/tabs-header.vue";
import talkItem from "./chat-left/talk-item.vue";

import talkPanel from "./chat-right/index.vue";
import empty from "@/components/empty/empty.vue";
import { chatStore } from "@/store/chat.js";
const talkStore = chatStore();
const { getChatList, setConversation } = talkStore;
const {
  allChatList,
  friendChatList,
  groupChatList,
  talkUnreadNum,
  conversation,
  talkMode,
} = storeToRefs(talkStore);
const panelComponent = computed(() => {
  return talkMode.value ? markRaw(talkPanel) : markRaw(empty);
});
const talkList = computed(() => {
  // return allChatList.value;
  let talksList = [allChatList, friendChatList, groupChatList, talkUnreadNum];
  return talksList[selectIndex.value];
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
const selectIndex = ref(0);
const onKeywordChange = () => {};
const onselect = (value) => {};
const onTabTalk = async (talk) => {
  await setConversation(talk);
};
const onToTopTalk = (index) => {};
onBeforeMount(async () => {
  await getChatList();
  // await saveSession(
  //   "1hSYn21quJCLYYTVa9QGLoS8hB",
  //   [
  //     {
  //       msg_id: "682512b6338b432e94861a77ffa6af3e",
  //       sequence: 1942073039273377800,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-07 12:07:49",
  //       extra: '{"content": "上述"}',
  //       quote: "{}",
  //     },
  //     {
  //       msg_id: "3d0ab105604943df95678ffc78135631",
  //       sequence: 1941802657589018600,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-06 18:13:25",
  //       extra: '{"content": "[憨笑]"}',
  //       quote: "{}",
  //     },
  //     {
  //       msg_id: "be35da9279ad4d80936ea4d80ff350d3",
  //       sequence: 1941786230157000700,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-06 17:08:09",
  //       extra: '{"content": "俺爸哈上班‘"}',
  //       quote: "{}",
  //     },
  //     {
  //       msg_id: "d400715b3a2d499d81859bfae28b41ae",
  //       sequence: 1941786223429337000,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-06 17:08:07",
  //       extra: '{"content": "问八角盒是吧"}',
  //       quote: "{}",
  //     },
  //     {
  //       msg_id: "a0199c463e8a46cab0e5679b46c346a8",
  //       sequence: 1941786218891100200,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-06 17:08:06",
  //       extra: '{"content": "问吧呼叫失败发汗解表"}',
  //       quote: "{}",
  //     },
  //     {
  //       msg_id: "0590863d0e0c47b0bf7b339cccb7acf4",
  //       sequence: 1941786213526585300,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-06 17:08:05",
  //       extra: '{"content": "啊是的呐发卡机"}',
  //       quote: "{}",
  //     },
  //     {
  //       msg_id: "5eacad47391c43608b98d94b9c0647c1",
  //       sequence: 1941498481311006700,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-05 22:04:44",
  //       extra: '{"content": "好"}',
  //       quote: "{}",
  //     },
  //     {
  //       msg_id: "fc02716b3643442e80bdd567f457ed9e",
  //       sequence: 1940693024208109600,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-03 16:44:08",
  //       extra: '{"content": "你好"}',
  //       quote: "{}",
  //     },
  //     {
  //       msg_id: "1b7aa4c703af490b82e9ad3cbc593604",
  //       sequence: 1940677281479442400,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-03 15:41:35",
  //       extra: '{"content": "额外发"}',
  //       quote: "{}",
  //     },
  //     {
  //       msg_id: "375b5f75672e4ccc942f6a723f84b68c",
  //       sequence: 1940677276437889000,
  //       msg_type: 1,
  //       from_id: 2054,
  //       nickname: "测试1",
  //       avatar:
  //         "https://im-static.gzydong.com/public/media/image/202507/93dc6429-3cc9-438c-b4fb-4b7bd7f47d71_500x500.png",
  //       is_revoked: 2,
  //       send_time: "2025-07-03 15:41:33",
  //       extra: '{"content": "发发额发"}',
  //       quote: "{}",
  //     },
  //   ]
  // );
});
</script>


<style lang="less" scoped></style>