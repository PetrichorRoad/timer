<template>
  <div :class="msgClass" class="min-h-[30px] min-w-[30px] p-[6px] rounded-[5px] text-[14px] flex items-center">{{ content }}</div>
</template>

<script setup>
import { ref,defineProps, computed } from 'vue'
const props = defineProps({
  message: {
    type: Object,
    default: {
    }
  }
})
const content = computed(() => { 
  let {extra} = props.message
  let {content} = JSON.parse(extra)
  return content
})
const msgClass = computed(() => { 
  let {position=false} = props.message
  return position ? 'bg-my-bg-3' : 'bg-my-bg-4'
})
</script>

<style>

</style>