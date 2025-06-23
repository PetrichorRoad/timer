<template>
  <template v-if="false">
    <!-- <div class="chat-container-item system">
      <template v-if="false">
        <component v-if="item.render" :is="item.render()" />
      </template>
      <template v-else-if="item.type === MessageTypeEnum.TEXT">
        <span class="system-content">{{ item.content }}</span>
      </template>
      <template v-else-if="item.type === MessageTypeEnum.TIME">
        <span class="time-content"
          >― {{ humanizeTime(new Date(item.time).getTime()) }} ―</span
        >
      </template>
      <template v-else>
        <span class="system-content">未知类型</span>
      </template>
    </div> -->
  </template>
  <template v-else>
    <div
      class="chat-container-item min-h-[400px]"
      :class="{
        'align-right': message.position,
        border: false,
        active: false,
      }"
    >
      <!-- <div class="chat-checkbox" v-show="showCheckbox">
        <n-checkbox
          size="medium"
          :checked="isSelected"
          @update:checked="
            () => {
              emits('selected-element', item.msg_id);
            }
          "
        />
      </div> -->
      <div class="chat-avatar">
        <timer-avatar
          class="pointer"
          :size="30"
          :src="message.avatar"
          :username="message.nickname"
          :font-size="14"
        />
      </div>

      <div class="chat-content" @click="onClieckSelect($event, message)">
        <div class="chat-content-title">
          <span class="name">{{
            message.nickname
          }}</span>
          <span class="time">{{
            message.send_time
          }}</span>
        </div>

        <div class="chat-content-main">
          <div class="chat-content-message">
            <component :is="messageComponent" :message="message"></component>
            <!-- <span
              class="sent-status sending"
              v-if="item?.status === StatusEnum.SENDING"
              ><n-icon :component="LoadingTwo"
            /></span>
            <span
              class="sent-status fail"
              v-if="item?.status === StatusEnum.ERROR"
              >发送失败</span
            >
          </div>

          <div v-if="item.quote?.quote_id" class="chat-content-quote">
            <n-icon :component="ToTop" size="22" />
            <span>回复：{{ item?.quote?.content }}</span>
          </div>

          <div v-if="showToolsMenus" class="chat-tools-menus">
            <n-icon
              class="pointer"
              :component="Copy"
              @click="emits('element-event', 'copy', raw)"
              size="16"
            />
            <n-icon
              class="pointer"
              :component="Delete"
              @click="emits('element-event', 'delete', raw)"
              size="16"
            />
            <n-icon
              class="pointer"
              :component="Undo"
              @click="emits('element-event', 'revoke', raw)"
              size="16"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref, defineProps, computed, onMounted } from "vue";
import messageCode from "./chat-item/message-code.vue";
import messageImage from "./chat-item/message-image.vue";
import messageText from "./chat-item/message-text.vue";
import messageAudio from "./chat-item/message-audio.vue";
import messageVideo from "./chat-item/message-video.vue";
import messageFile from "./chat-item/message-document.vue";
import messageLocation from "./chat-item/message-location.vue";
import messageVote from "./chat-item/message-vote.vue";
import messageSession from "./chat-item/message-session.vue";
import timerAvatar from "@/components/custom/timer-avatar.vue";
const props = defineProps({
  message: {
    type: Object,
    default: {},
  },
});
let MESSAGE_TYPE = {
  null: { type: "null", name: "未知", component: messageText },
  0: { type: "", name: "", component: messageText },
  1: { type: "text", name: "文本", component: messageText },
  2: { type: "code", name: "代码", component: messageCode },
  3: { type: "image", name: "图片", component: messageImage },
  4: { type: "audio", name: "音频", component: messageAudio },
  5: { type: "video", name: "视频", component: messageVideo },
  6: { type: "document", name: "文件", component: messageFile },
  7: { type: "location", name: "位置", component: messageLocation },
  8: { type: "card", name: "名片", component: messageText },
  9: { type: "session", name: "会话", component: messageSession },
  10: { type: "login", name: "登录信息", component: messageText },
  11: { type: "text", name: "投票", component: messageVote },
  12: { type: "mixed ", name: "混合信息", component: messageText },
  13: { type: "notice", name: "公告", component: messageText },

  1000: { type: "SysText", name: "系统文本消息", component: messageText },
  1101: {
    type: "SysGroupCreate",
    name: "创建群聊消息",
    component: messageImage,
  },
  1102: { type: "SysGroupJoin", name: "加入群聊消息", component: messageImage },
  1103: {
    type: "SysGroupLeave",
    name: "离开群聊消息",
    component: messageImage,
  },
  1104: { type: "SysGroupKick", name: "踢出群聊消息", component: messageImage },
  1105: {
    type: "SysGroupMessageRevoke",
    name: "管理员撤回成员消息",
    component: messageImage,
  },
  1106: { type: "SysGroupDismissed", name: "群解散", component: messageImage },
  1107: { type: "SysGroupMuted", name: "群禁言", component: messageImage },
  1108: {
    type: "SysGroupUnmuted",
    name: "群解除禁言",
    component: messageImage,
  },
  1109: {
    type: "SysGroupMemberMuted",
    name: "群成员禁言",
    component: messageImage,
  },
  1110: {
    type: "SysGroupMemberUnmuted",
    name: "群成员解除禁言",
    component: messageImage,
  },
  1113: { type: "SysGroupTransfer", name: "变更群主", component: messageImage },
};
const messageComponent = computed(() => {
  return MESSAGE_TYPE[props.message.msg_type].component;
});
onMounted(() => {
});
</script>

<style lang="less" scoped>
.chat-container-item {
  display: flex;
  gap: 5px;
  min-height: 20px;
  border: 1px solid transparent;
  padding: 5px;
  margin: 3px 0;
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  min-height: 70px;

  &.border {
    cursor: pointer;
    border-color: var(--border-color);

    &:hover,
    &.active {
      border-color: var(--im-primary-color);
    }
  }

  .chat-checkbox {
    order: 1;
    width: 26px;
  }

  .chat-avatar {
    width: 40px;
    order: 2;
  }

  .chat-checkbox,
  .chat-avatar {
    flex-shrink: 0;
    text-align: center;
  }

  .chat-content {
    order: 3;
    flex: auto;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    overflow: hidden;

    .chat-content-title {
      height: 18px;
      display: flex;
      align-items: center;
      gap: 5px;
      user-select: none;

      .name {
        font-size: 12px;
        cursor: pointer;

        &::before {
          content: "@";
          display: none;
        }

        &:hover::before {
          display: inline-flex;
        }

        &:hover {
          color: var(--im-primary-color);
        }
      }

      .time {
        color: #8f8f8f;
        font-size: 12px;
        font-weight: 300;
      }
    }

    .chat-content-main {
      display: flex;
      flex-direction: column;
      row-gap: 2px;
      overflow: hidden;

      .chat-content-message {
        display: flex;
        width: 100%;
        align-items: end;

        > div {
          max-width: 70%;
        }

        .text-content {
          padding: 10px;
          border-radius: 5px;
          width: fit-content;
          white-space: pre-wrap;
          word-break: break-word;
          word-wrap: break-word;
          font-size: 14px;
        }

        .sent-status {
          margin: 0 10px;
          // font-size: 12px;
          color: #8f8f8f;

          &.fail {
            color: #ff8d8d;
          }
        }
      }

      .chat-content-quote {
        display: flex;
        align-items: center;
        width: fit-content;
        padding: 4px;
        font-size: 12px;
        color: #8f8f8f;
        word-break: break-all;
        background-color: var(--chat-assistant-bg-color);
        border-radius: 5px;
        max-width: 300px;
        cursor: pointer;
        overflow: hidden;
        span {
          margin-left: 5px;
        }
      }

      .chat-tools-menus {
        height: 20px;
        display: flex;
        gap: 8px;
        align-items: center;
        visibility: hidden;
        transition: all 0.5s ease-in;

        i:active {
          transform: scale(1.2);
        }

        i:hover {
          color: var(--im-primary-color);
        }
      }
    }
  }

  &.align-right {
    .chat-avatar {
      order: 3;
    }

    .chat-content {
      order: 2;

      .chat-content-title {
        display: flex;
        flex-direction: row-reverse;
      }

      .chat-content-main {
        .chat-content-message,
        .chat-tools-menus {
          justify-content: right;
        }

        .chat-content-message {
          flex-direction: row-reverse;
        }

        .chat-content-quote {
          margin-left: auto;
        }
      }
    }
  }

  &.system {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    font-size: 13px;
    width: inherit;

    .system-content {
      background-color: var(--chat-bg-grey-color);
      border-radius: 3px;
      padding: 3px 10px;
      max-width: 60%;
    }
  }

  &:hover {
    .chat-content {
      .chat-content-main {
        .chat-tools-menus {
          visibility: visible;
        }
      }
    }
  }
}
</style>