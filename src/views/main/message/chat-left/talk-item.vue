<template>
  <div class="talk-item pointer" :class="{ actived: active }" @click="emit('tab-talk', data)">
    <div class="talk-item-avatar">
      <timer-avatar :src="avatar" :size="34" :username="data.name" />
      <div class="top-mask" @click.stop="emit('top-talk', data)">
        <n-icon :component="data.is_top === 1 ? CaretDownSharp : CaretUpOutline" />
      </div>
    </div>

    <div class="talk-item-content">
      <div class="header">
        <div class="title gap-1">
          <span class="nickname text-[10px]">{{ username }}</span>
          <span class="badge top font-[10px]" v-show="data.is_top === 1">顶</span>
          <span class="badge roboot font-[10px]" v-show="data.is_robot === 1">助</span>
          <span class="badge group font-[10px]" v-show="data.talk_mode === 2">群</span>
        </div>
        <div class="datetime">
          <text-time :time="data.updated_at" />
        </div>
      </div>

      <div class="content">
        <div class="text">
          <template v-if="!active && data.draft_text">
            <span class="draft">[草稿]</span>
            <span class="detail" v-html="data.draft_text" />
          </template>
          <template v-else>
            <span class="detail" v-html="data.msg_text" />
          </template>
        </div>

        <div class="tip">
          <div v-if="data.is_disturb === 1" class="disturb">
            <n-icon :component="CaretUpOutline" />
          </div>
          
          <div v-else class="unread" v-show="data.unread_num">
            <span class="badge">
              {{ data.unread_num > 99 ? '99+' : data.unread_num }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import textTime from '@/components/custom/time.vue'
import timerAvatar from '@/components/custom/timer-avatar.vue'
import {CaretUpOutline,CaretDownSharp} from '@vicons/ionicons5'

const emit = defineEmits(['tab-talk', 'top-talk'])

defineProps({
  data: {
    type: Object,  // 或者更具体的类型
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="less" scoped>
.talk-item {
  --actived-bg: rgba(24, 144, 255, 0.12);

  padding: 8px 10px;
  height: 50px;
  display: flex;
  align-items: center;

  &-avatar {
    height: 34px;
    width: 34px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    user-select: none;
    transition: ease 1s;
    position: relative;
    overflow: hidden;

    .top-mask {
      width: 100%;
      height: 100%;
      background-color: rgba(22, 25, 29, 0.6);
      position: absolute;
      top: 0;
      left: 0;
      color: #ffffff;
      display: none;
      align-items: center;
      justify-content: center;
    }

    &:hover .top-mask {
      display: flex;
    }
  }

  &-content {
    height: 40px;
    display: flex;
    align-content: center;
    flex-direction: column;
    flex: 1;
    margin-left: 10px;
    overflow: hidden;

    .header {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;

      .title {
        font-size: 16px;
        line-height: 20px;
        flex: 1;
        display: flex;
        overflow: hidden;

        .nickname {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: 5px;
        }
      }

      .datetime {
        color: #8f959e;
        font-size: 12px;
        margin-left: 10px;
        user-select: none;
      }
    }

    .content {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .text {
        overflow: hidden;
        font-weight: 300;
        font-size: 12px;
        color: #8f959e;
        display: flex;

        .draft {
          color: red;
          padding-right: 3px;
          flex-shrink: 0;
        }

        .online {
          color: #8bc34a;
          padding-right: 3px;
          flex-shrink: 0;
        }

        .detail {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .tip {
        height: inherit;
        display: flex;
        padding-left: 5px;
        align-items: center;

        .unread {
          color: #8f959e;
          font-size: 12px;
          user-select: none;

          .badge {
            background-color: #f44336;
            color: #ffffff;
            border-radius: 3px;
            transform-origin: right;
          }
        }

        .disturb {
          color: #8f959e;
          font-size: 12px;
          user-select: none;
        }
      }
    }
  }

  &.actived {
    background-color: var(--actived-bg);
  }
}

.badge {
  font-size: 10px;
  height: 18px;
  line-height: 18px;
  box-sizing: border-box;
  text-align: center;
  width: 18px;

  &.top {
    color: red !important;
    background-color: #ffdddd !important;
  }

  &.roboot {
    color: #dc9b04 !important;
    background-color: #faf1d1 !important;
  }

  &.group {
    color: #3370ff !important;
    background-color: #e1eaff !important;
  }
}

html[theme-mode='dark'] {
  .talk-item {
    --actived-bg: rgba(255, 255, 255, 0.1);

    .nickname {
      color: #ffffff;
    }
  }

  .disturb {
    color: #ffffff;
  }
}
</style>