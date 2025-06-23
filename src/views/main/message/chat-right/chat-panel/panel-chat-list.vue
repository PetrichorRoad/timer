<template>
  <div class="h-full">
    <div
      class="h-full overflow-y-scroll flex flex-col"
      ref="virtualListInstRef"
    >
      <div v-for="item in talkRecords" :key="item.msg_id" class="item">
        <chat-item :message="item" :index="item.msg_id" />
      </div>
    </div>
    <!-- <n-virtual-list :style="{maxHeight:`${height}px`}" item-resizable :item-size="70" :items="talkRecords" ref="virtualListInstRef">
      <template #default="{ item }">
        <div class="item">
          <chat-item :message="item" :index="item.msg_id" />
        </div>
      </template>
    </n-virtual-list> -->
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { chatStore } from "@/store/chat.js";
import { computed, onMounted, ref, nextTick, watch } from "vue";
import chatItem from "@/components/bubble/index.vue";
const virtualListInstRef = ref(null);
const talkStore = chatStore();
const talkInfo = storeToRefs(talkStore);
const talkRecords = computed(() => {
  let userInfo = localStorage.getItem("user");
  let { uid } = JSON.parse(userInfo);
  return talkInfo.chatRecords.value.map((item) => {
    let { from_id } = item;
    return {
      ...item,
      position: uid === from_id,
    };
  });
});
const scrollToBottom = () => {
  nextTick(() => {
    const height = virtualListInstRef.value?.scrollHeight + 1000;
    virtualListInstRef.value?.scrollTo({ top: height, behavior: "smooth" });
  });
};
watch(
  () => talkRecords.value,
  () => {
    scrollToBottom();
  }
);
</script>

<style>
</style>