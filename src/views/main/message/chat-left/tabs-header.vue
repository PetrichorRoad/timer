<template>
   <header class="el-header tabs-header">
    <n-space class="tabs" style="flex-flow: nowrap">
      <n-tag
        v-for="(tab, index) in tabs"
        :type="tabIndex == index ? 'primary' : 'default'"
        size="small"
        class="pointer"
        round
        :key="tab.name"
        @click="onChange(index)"
      >
        {{ tab.name }}<span>&nbsp;{{ tab.value }}</span>
      </n-tag>
    </n-space>
  </header>
</template>

<script setup>
import { computed, defineModel, ref } from "vue";
import { storeToRefs } from "pinia";
import { chatStore } from "@/store/chat.js";    
const talkStore = chatStore();
const {allChatList,friendChatList,groupChatList,talkUnreadNum} = storeToRefs(talkStore);
const tabIndex = defineModel()
const tabs = ref([
  {
    name: '全部',
    value: computed(() => {
      return allChatList.value.length
    })
  },
  {
    name: '好友',
    value: computed(() => {
      return friendChatList.value.length
    })
  },
  {
    name: '群聊',
    value: computed(() => {
      return groupChatList.value.length
    })
  },
  {
    name: '未读',
    value: computed(() => {
      return talkUnreadNum.value.length
    })
  }
])
const onChange = (index) => {
  tabIndex.value = index
}
</script>

<style lang="less" scoped>
.tabs-header {
  height: 38px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 0px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    height: 0px;
    background-color: transparent;
  }
}
</style>