import { defineStore } from "pinia";
import { router } from "@/router";
import { getSessionList } from "../database/data";

import user from "../api/modules/user";
import { useDialogueStore } from "@/store/dialogue.js";
// 第一个参数 storeId 是仓库的key 必须独一无二
export const chatStore = defineStore("chat-list", {
  state: () => {
    return {
      chatList: [],
      conversation: { id: null, talk_mode: null },

      // chatRecords:[],

      groupInfo: [],
      friendInfo: {},
      friendStatus: {},
      // cursor:0
    };
  },
  getters: {
    allChatList: (state) => state.chatList,
    friendChatList: (state) =>
      state.chatList.filter((item) => item.talk_mode === 1),
    groupChatList: (state) =>
      state.chatList.filter((item) => item.talk_mode === 2),
    talkUnreadNum: (state) =>
      state.chatList.reduce((total, item) => total + item.unread_num, 0),

    talkMode: (state) => state.conversation.talk_mode,

    // userTalkSession: (state) => {
    //     let { chatRecords, friendInfo, friendStatus, conversation } = state
    //     return { chatRecords, friendInfo, friendStatus, conversation }
    // },
    // groupTalkSession: (state) => {
    //     let { chatRecords, groupInfo, conversation } = state
    //     return { chatRecords, groupInfo, conversation }
    // },
    // talkSession: (state) => {
    //     let { talkMode, userTalkSession, groupTalkSession } = state
    //     switch (talkMode) {
    //         case 1:
    //             return userTalkSession
    //         case 2:
    //             return groupTalkSession
    //     }
    // }
  },
  actions: {
    async getChatList() {
      // let { data} = await user.getChatList({})
      // this.chatList = data.items
      // console.log(this.chatList);

      let result = await getSessionList();
      this.chatList = Object.entries(result).map(([key, value]) => {
        console.log(key, value);
        return {
          id: key,
          avatar: `https://picsum.photos/200/300?${key}`,
          is_disturb: 2,
          is_robot: 2,
          is_top: 2,
          msg_text: "...",
          name: "索滢",
          remark: "",
          talk_mode: 1,
          to_from_id: 1199,
          unread_num: 0,
          updated_at: "2025-07-07 21:52:38",
          sessions: value,
        };
      });
    },
    async setConversation(talk) {
      const dialogueStore = useDialogueStore();
      this.conversation = talk;
      let { talk_mode } = talk;
      switch (talk_mode) {
        case 1:
          dialogueStore.clearDialogueRecord();
          await this.getFriendsInfo();
          await this.getFriendsStatus();
          await this.loadChatRecord();
          break;
        case 2:
          dialogueStore.clearDialogueRecord();
          await this.getGroupInfo();
          await this.loadChatRecord();
          break;
      }
    },
    async loadChatRecord() {
      const dialogueStore = useDialogueStore();
      let { talk_mode, to_from_id } = this.conversation;
      let {
        data: { items, cursor },
      } = await user.getTalkRecords({
        talk_mode,
        to_from_id,
        cursor: 0,
        limit: 30,
      });
      dialogueStore.unshiftDialogueRecord(items.reverse());
      this.cursor = cursor;
    },
    // async getMoreChatRecords () {
    //     let { talk_mode, to_from_id } = this.conversation
    //     let { data: { items, cursor } } = await user.getTalkRecords({ talk_mode, to_from_id, cursor: this.cursor, limit: 30 })
    //     this.chatRecords = [...items.reverse(),...this.chatRecords]
    //     this.cursor = cursor
    // },
    async getGroupInfo() {
      let { to_from_id } = this.conversation;
      let {
        data: { items },
      } = await user.getGroupInfo({ group_id: to_from_id });
      this.groupInfo = items;
    },
    async getFriendsInfo() {
      let { to_from_id } = this.conversation;
      let { data } = await user.getFriendsInfo({ user_id: to_from_id });
      this.friendInfo = data;
    },
    async getFriendsStatus() {
      let { to_from_id } = this.conversation;
      let { data } = await user.getFriendsStatus({ user_id: to_from_id });
      this.friendStatus = data;
    },
    findIndex(index_name) {
      return this.chatList.find((item) => item.index_name === index_name);
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
