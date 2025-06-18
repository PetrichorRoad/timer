<template>
  <header class="el-header search-header">
    <n-input
      placeholder="搜索好友 / 群聊"
      :on-input="onKeywordChange"
      v-model:value.trim="modelValue"
      round
      clearable
    >
      <template #prefix>
        <n-icon :component="Search" />
      </template>
    </n-input>

    <n-dropdown
      :animated="true"
      trigger="hover"
      :show-arrow="true"
      @select="onToolsMenu"
      :options="options"
    >
      <n-button circle style="margin-left: 10px">
        <template #icon>
          <n-icon :component="Add" />
        </template>
      </n-button>
    </n-dropdown>
  </header>
</template>

<script lang="js" setup>
// import { Search, Plus } from '@icon-park/vue-next'
import {  Add, Search } from "@vicons/ionicons5";

const modelValue = defineModel()

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['on-select', 'on-keyword'])

const onKeywordChange = () => {
  emit('on-keyword', modelValue.value)
}

const onToolsMenu = (value) => {
  emit('on-select', value)
}
</script>

<style>
.search-header {
  height: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
}
</style>