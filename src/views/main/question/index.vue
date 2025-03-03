<template>
  <div class="page">
    <editor api-key="no-api-key" ref="editorRef"></editor>
    <n-button @click="sendNotice">全屏</n-button>
  </div>
</template>

<script setup lang="jsx">
import { computed, reactive, watch, ref,h, nextTick, onMounted } from "vue";
import editor from "@/components/editor/editorEMC.vue";
import { NAvatar, NButton, useNotification } from "naive-ui";
import { render } from "less";
import moment from "moment";
let editorRef = ref();
const notification = useNotification();
const sendNotice = () => {
  let markAsRead = false;
  const n = notification.create({
    title: () =>
      h(NAvatar, {
        size: "small",
        round: true,
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
      }),
    content: ()=>{
      return (<div v-html={editorRef.value.content}></div>)
    },
    meta: moment().format("YYYY-MM-DD HH:mm:ss"),
    action: () =>
      h(
        NButton,
        {
          text: true,
          type: "primary",
          onClick: () => {
            markAsRead = true;
            n.destroy();
          },
        },
        {
          default: () => "已读",
        }
      ),
    onClose: () => {
      n.destroy();
    },
    duration: 5000,
  });
};
</script>

<style lang="less" scoped>
</style>