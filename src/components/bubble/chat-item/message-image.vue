<template>
  <div class="min-h-[30px] min-w-[30px] p-[6px] rounded-[5px] text-[14px] flex items-center">
    <!-- {{ message.extra }} -->
      <img :src="content.url" class="max-w-[200px] max-h-[200px]" alt="">
  </div>
</template>

<script setup>
import { ref,defineProps,computed } from 'vue'
const props = defineProps({
  message: {
    type: Object,
    default: {}
  }
})
const content = computed(() => { 
  let {extra} = props.message
  let content = JSON.parse(extra)
  return content
})
</script>

<style>

</style>