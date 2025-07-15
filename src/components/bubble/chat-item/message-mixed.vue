<template>
  <div
    :class="msgClass"
    class="min-h-[30px] min-w-[30px] p-[6px] rounded-[5px] text-[14px] flex flex-col"
    v-html="content"
  ></div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { textReplaceEmoji } from "@/utils/emojis";
// import { textReplaceLink } from '@/utils/string'
const props = defineProps({
  message: {
    type: Object,
    default: {},
  },
});
const textRenderImage = (content) => {
    return `<img src="${content}" class="max-w-[200px] max-h-[200px]">`
}
const textRenderEmoji = (content) => {
    return `<div class="flex items-cneter">${textReplaceEmoji(content)}</div>`
}
let formatContent = [null,textRenderEmoji,null,textRenderImage];
const content = computed(() => {
  let { extra } = props.message;
  let { items } = JSON.parse(extra);
  return items.map((item) => {
    let  {type,content} = item;
    return formatContent[type](content);
  }).join("");
});
const msgClass = computed(() => {
  let { position = false } = props.message;
  return position ? "bg-my-bg-3" : "bg-my-bg-4";
});
</script>

<style></style>
