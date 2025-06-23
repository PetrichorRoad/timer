<template>
  <div>{{ message.extra }}</div>
  会话
</template>

<script setup>
import { ref,defineProps } from 'vue'
const props = defineProps({
  message: {
    type: Object,
    default: {

    }
  }
})
</script>

<style>

</style>