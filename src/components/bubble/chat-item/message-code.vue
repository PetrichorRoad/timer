<template>
  <div>{{ message.extra }}</div>
  代码
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