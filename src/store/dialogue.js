import { defineStore } from "pinia";
import {
  ServTalkMessageDelete,
  ServTalkMessageRevoke,
  ServTalkMessageSend,
} from "@/api/modules/chat";
import { ServGroupMemberList } from "@/api/modules/group";
import user from '../api/modules/user'
import { ServCustomizeEmoticonCreate } from "@/api/modules/emoticon";
// import { useEditorStore } from './editor'

let TalkModeEnum = {
  Single: 1, // 单聊
  Group: 2, // 群聊
};

// 键盘消息事件定时器
let keyboardTimeout;

export const useDialogueStore = defineStore("dialogue", {
  state: () => {
    return {
      // 对话索引（聊天对话的唯一索引）
      index_name: "",

      // 对话节点
      target: {
        username: "",
        description: "",
        talk_mode: 0, // 对话来源[1:私聊;2:群聊]
        to_from_id: 0, // 对话对象ID[群ID或者好友ID]
      },

      // 好友是否正在输入文字
      keyboard: false,

      // 聊天记录
      records: [],

      // 新消息提示
      unreadBubble: 0,

      // 是否显示编辑器
      isShowEditor: false,

      // 群成员列表
      members: [],

      // 聊天面板的容器ID
      container: "",
    };
  },
  getters: {
    // 当前对话是否是群聊
    isGroupTalk: (state) => state.target.talk_mode === TalkModeEnum.Group,
  },
  actions: {
    // 更新对话信息
    setDialogue(data = {}) {
      this.target = {
        username: data.remark || data.name,
        talk_mode: data.talk_mode,
        to_from_id: data.to_from_id,
        description: "",
      };

      this.index_name = `${data.talk_mode}_${data.to_from_id}`;
      this.records = [];
      this.unreadBubble = 0;
      this.members = [];
      // 是机器人则不显示编辑器
      this.isShowEditor = data?.is_robot === 1 ? false : true;

      if (data.talk_mode == TalkModeEnum.Group) {
        this.updateGroupMembers();
      } else {
        this.loadContactDetail();
      }
    },

    // 更新提及列表
    async updateGroupMembers() {
      const { to_from_id: group_id } = this.target;

      this.members = [];
      const { code, data } = await ServGroupMemberList({ group_id });

      if (code != 200 && this.target.to_from_id != group_id) return;

      this.members = data?.items.map((item) => ({
        id: item.user_id,
        nickname: item.nickname,
        avatar: item.avatar,
        gender: item.gender,
        leader: item.leader,
        remark: item.remark,
      }));
    },

    // 更新提及列表
    async loadContactDetail() {
      // const { to_from_id: user_id } = this.target
      // const { code, data } = await ServContactDetail({ user_id })
      // if (code != 200 && this.target.to_from_id != user_id) return
      // this.target.description = data?.motto || ''
    },

    // 清空对话记录
    clearDialogueRecord() {
      this.records = [];
    },

    // 数组头部压入对话记录
    unshiftDialogueRecord(records) {
      this.records.unshift(...records);
    },

    // 推送对话记录
    addDialogueRecord(record) {
      this.records.push(record);
    },

    // 更新对话记录
    updateDialogueRecord(params) {
      const { msg_id = "" } = params;

      const item = this.records.find((item) => item.msg_id === msg_id);

      item && Object.assign(item, params);
    },

    // 批量删除对话记录
    batchDelDialogueRecord(msgIds) {
      msgIds.forEach((msg_id) => {
        const index = this.records.findIndex((item) => item.msg_id === msg_id);

        if (index >= 0) this.records.splice(index, 1);
      });
    },

    // 自增好友键盘输入事件
    triggerKeyboard() {
      this.keyboard = true;

      keyboardTimeout && clearTimeout(keyboardTimeout);

      keyboardTimeout = setTimeout(() => (this.keyboard = false), 2000);
    },

    setUnreadBubble(clear = false) {
      if (clear) {
        this.unreadBubble = 0;
      } else {
        this.unreadBubble++;
      }
    },

    // 删除聊天记录
    async deleteRecord(msgIds) {
      const { code } = await ServTalkMessageDelete({
        talk_mode: this.target.talk_mode,
        to_from_id: this.target.to_from_id,
        msg_ids: msgIds,
      });

      code == 200 && this.batchDelDialogueRecord(msgIds);
    },

    // 撤销聊天记录
    async revokeRecord(msg_id) {
      const { code } = await ServTalkMessageRevoke({
        talk_mode: this.target.talk_mode,
        to_from_id: this.target.to_from_id,
        msg_id,
      });

      code == 200 && this.updateDialogueRecord({ msg_id, is_revoked: 1 });
    },

    // 转发聊天记录
    async forwardRecord(params = {}) {
      // @ts-ignore
      // await ServTalkMessageSend({
      //   ...params,
      //   type: "forward",
      // });
    },

    async collectImage(params = {}) {
      // await ServCustomizeEmoticonCreate(params, {
      //   successText: '收藏成功',
      //   onSuccess: () => {
      //     useEditorStore().loadUserEmoticon()
      //   }
      // })
    },

    /**
     * 滚动到底部
     * @param animation 是否使用动画
     */
    scrollToBottom(animation = false) {
      const el = document.getElementById(this.container);
      el?.scrollTo({
        top: el?.scrollHeight + 1000,
        behavior: animation ? "smooth" : "auto",
      });
    },
  },
});
