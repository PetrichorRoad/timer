import { defineStore } from "pinia";
import { router } from "@/router";
import { getSessionList } from "../database/data";
import { getSession } from "../database/data";
import { getUserInfo } from '@/utils/lib'
import user from "../api/modules/user";
import { useDialogueStore } from "@/store/dialogue.js";
import request from "@/api/base";
// 第一个参数 storeId 是仓库的key 必须独一无二
export const useSessionStore = defineStore("chat-list", {
  state: () => {
    return {
      chatList: [],
      conversation: { id: null, talk_mode: null },
    };
  },
  getters: {
    allChatList: (state) => state.chatList,
    friendChatList: (state) =>
      state.chatList.filter((item) => item.talk_mode === 1),
    groupChatList: (state) =>
      state.chatList.filter((item) => item.talk_mode === 2),
    talkUnreadNum: (state) =>
      state.chatList.filter((item) => item.unread_num > 0),

    talkMode: (state) => state.conversation.talk_mode,
  },
  actions: {
    async getChatList() {
      const { deptId } = getUserInfo()
      let { data } = await request.getUserLists({ depId:deptId })
      let result = await getSessionList();
      this.chatList = Object.entries(result).map(([key, value]) => {
        const { nickname, signature, avatar, accountId } = data.find(item => item.accountId === key)
        return {
          nickname, signature, avatar, accountId,
          id: key,
          avatar: `https://picsum.photos/200/300?${key}`,
          is_disturb: 2,
          is_robot: 2,
          is_top: 2,
          msg_text: "...",
          name: nickname,
          remark: "",
          talk_mode: 1,
          to_from_id: key,
          unread_num: 0,
          updated_at: "2025-07-07 21:52:38",
        };
      });
    },
    async setConversation(talk) {
      const dialogueStore = useDialogueStore();
      dialogueStore.clearDialogueRecord();
      this.conversation = talk;
      this.loadChatRecord();
    },
    async loadChatRecord() {
      let { id } = this.conversation
      let result = await getSession(id);
      console.log(result);
      const dialogueStore = useDialogueStore();
      dialogueStore.unshiftDialogueRecord(result.reverse());
    },
    findIndex(id) {
      return this.chatList.find((item) => item.id === id);
    },
    findItem(index_name) {
      return this.chatList.find((item) => item.index_name === index_name);
    },
    updateItem(params) {
      if (!params.index_name) return;

      const item = this.findItem(params.index_name);

      item && Object.assign(item, params);
    },
    addItem(item) {
      this.chatList.unshift(item);
    },
  },
});
