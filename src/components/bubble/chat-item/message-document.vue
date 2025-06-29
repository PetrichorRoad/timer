<template>
  <section class="immsg-file" :class="msgClass">
    <div class="main">
      <div class="ext">{{ content.name }}</div>
      <div class="file-box">
        <p class="info">
          <span class="name">{{ content.name }}</span>
          <span class="size text-my-text-1">({{ content.size }})</span>
        </p>
        <p class="notice">文件已成功发送, 文件助手永久保存</p>
      </div>
    </div>
    <div class="footer">
      <a @click="download(content.msg_id, 1)">下载</a>
      <a>在线预览</a>
    </div>
  </section>
</template>

<script setup>
import { download, getFileNameSuffix,fileFormatSize } from '@/utils/lib/utils'
import { ref,defineProps, computed } from 'vue'
const props = defineProps({
  message: {
    type: Object,
    default: {
    }
  }
})
const content = computed(() => { 
  let {extra,msg_id} = props.message
  let {name,path,size} = JSON.parse(extra)
  return {name:getFileNameSuffix(name),path,size:fileFormatSize(size),msg_id}
})
const msgClass = computed(() => { 
  let {position=false} = props.message
  return position ? 'bg-my-bg-3' : 'bg-my-bg-4'
})
</script>

<style lang="less" scoped>
.immsg-file {
  width: 250px;
  min-height: 85px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--im-message-border-color);

  .main {
    height: 45px;
    display: flex;
    flex-direction: row;
    margin-top: 5px;

    .ext {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      color: #ffffff;
      background: #49a4ff;
      border-radius: 5px;
      font-size: 12px;
    }

    .file-box {
      flex: 1 1;
      height: 45px;
      margin-left: 10px;
      overflow: hidden;

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        height: 24px;
        font-size: 14px;

        .name {
          flex: 1 auto;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .size {
          font-size: 12px;
          flex-shrink: 0;
        }
      }

      .notice {
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .footer {
    height: 30px;
    line-height: 37px;
    text-align: right;
    font-size: 12px;
    border-top: 1px solid var(--border-color);
    margin-top: 10px;

    a {
      margin: 0 3px;
      user-select: none;
      cursor: pointer;
      color: var(--im-text-color);

      &:hover {
        color: royalblue;
      }
    }
  }
}

html[theme-mode="dark"] {
  .immsg-file {
    border: unset;
    background: rgb(43 43 43);
  }
}
</style>