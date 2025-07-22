<template>
  <div class="h-full">
    <div
      class="h-full overflow-y-scroll flex flex-col"
      ref="virtualListInstRef"
    >
      <div v-for="item in records" :key="item.msg_id" class="item">
        <chat-item :message="item" :index="item.msg_id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, nextTick, watch } from "vue";
import chatItem from "@/components/bubble/index.vue";
import { useDialogueStore } from '@/store/dialogue.js';
const virtualListInstRef = ref(null);
const dialogueStore = useDialogueStore();

const records = computed(() => {
  let userInfo = localStorage.getItem("userInfo");
  let { accountId } = JSON.parse(userInfo);
  return dialogueStore.records.map((item) => {
    let { from_id } = item;
    console.log(accountId, from_id);
    console.log(item);
    return {
      ...item,
      position: accountId === from_id,
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
  () => records.value,
  () => {
    scrollToBottom();
  }
);
</script>

<style>
</style>