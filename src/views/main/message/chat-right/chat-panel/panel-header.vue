<template>
  <header class="el-header panel-header">
    <div class="menu border-right pointer" @click="onSetMenu">
      <n-icon :component="menu ? ChevronForward : ChevronBackSharp" :size="22" />
    </div>
    <!-- {{ talkSessionInfo }} -->
    <div class="module left-module">
      <span class="tag" v-show="talkSessionInfo.talkMode == 2"> 群聊 </span>
      <span class="tag red" v-show="talkSessionInfo.talkMode == 1"> 好友 </span>
      <span class="tag" v-show="talkSessionInfo.talkMode == 1" style="background-color: rgb(65, 174, 60)">
        在线
      </span>
      <span class="nickname text-ellipsis">{{ talkSessionInfo.username }}</span>
      <!-- <span class="keyboard" v-show="keyboard">对方正在输入...</span> -->
      <span class="num" v-show="talkSessionInfo.talkMode == 2">({{ talkSessionInfo.num }})</span>
      <!-- <p class="desc text-ellipsis" v-show="description.length">
        {{ description }}
      </p> -->
    </div>

    <div class="module right-module">
      <n-popover trigger="hover">
        <template #trigger>
          <n-icon
            class="icon"
            v-show="talkSessionInfo.talkMode == 2"
            :component="Calendar"
            :size="18"
            @click="emit('evnet', 'announcement')"
          />
        </template>
        群公告
      </n-popover>

      <!-- <n-popover trigger="hover">
        <template #trigger>
          <n-icon
            class="icon"
            v-show="talkMode == 1"
            :component="PhoneVideoCall"
            :size="18"
            @click="emit('evnet', 'phone_video_call')"
          />
        </template>
        语音通话
      </n-popover>

      <n-popover trigger="hover">
        <template #trigger>
          <n-icon
            class="icon"
            v-show="talkMode == 1"
            :component="VideoOne"
            :size="18"
            @click="emit('evnet', 'facetime')"
          />
        </template>
        视频通话
      </n-popover> -->

      <n-popover trigger="hover">
        <template #trigger>
          <n-icon
            class="icon"
            :component="PersonAdd"
            :size="18"
            @click="emit('evnet', 'addGroup')"
          />
        </template>
        {{ talkSessionInfo.talkMode === 1 ? '发起群聊' : '邀请好友' }}
      </n-popover>

      <n-popover trigger="hover">
        <template #trigger>
          <n-icon
            class="icon"
            v-show="talkSessionInfo.talkMode == 2"
            :component="EllipsisHorizontal"
            :size="18"
            @click="emit('evnet', 'group')"
          />
        </template>
        群详情
      </n-popover>
    </div>
  </header>
</template>

<script setup>
import {ChevronBackSharp,ChevronForward,PersonAdd,Calendar,EllipsisHorizontal} from '@vicons/ionicons5'
import { computed, defineEmits, defineProps,ref } from "vue";
import { useSessionStore } from "@/store/session.js";
import { useDialogueStore } from '@/store/dialogue.js'
const talkStore = useSessionStore();
const dialogueStore = useDialogueStore()
const talkSessionInfo = computed(() => {
  let {conversation} = talkStore;
  let {records} = dialogueStore
  let {talk_mode,remark,name} = conversation;
  return {
    talkMode:talk_mode,
     talkSession:records,
     username:remark||name,
     num:10
    }
});
let menu = ref(false)
const emit = defineEmits(['evnet', 'changeSessionMenu'])

const props = defineProps({
  username: {
    type: String,
    default: ''
  },
  online: {
    type: Boolean,
    default: false
  },
  keyboard: {
    type: Boolean,
    default: false
  },
  num: {
    type: Number,
    default: 0
  },
  menu: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.panel-header {
  height: 60px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  -webkit-app-region: drag;
  position: relative;

  .menu {
    width: 50px;
    position: absolute;
    display: flex;
    align-items: center;
    left: 0;
    justify-content: center;
  }

  .module {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .left-module {
    padding-right: 5px;
    margin-left: 50px;
    position: relative;
    flex: 1 auto;

    .keyboard {
      animation: inputfade 1s infinite;
      -webkit-animation: inputfade 1s infinite;
      margin-left: 5px;
      font-size: 12px;
    }

    .desc {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 80%;
      font-size: 12px;
      opacity: 0.4;
    }
  }

  .right-module {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .icon {
      cursor: pointer;
      margin: 0 8px;
    }
  }
}

/* css 动画 */
@keyframes inputfade {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
}

@-webkit-keyframes inputfade {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
}

.tag {
  background: rgb(81 139 254);
  height: 18px;
  line-height: 18px;
  padding: 1px 3px;
  font-size: 10px;
  color: white;
  border-radius: 3px;
  margin-right: 8px;
  flex-shrink: 0;

  &.red {
    background: #f97348;
  }
}
</style>