<template>
  <component :is="h(Element,{...$attrs,...props,ref:changeRef},$slots)"></component>
</template>

<script setup lang="jsx">
import { h,getCurrentInstance } from 'vue'
let props = defineProps({
  Element: {
    type: Object,
    default: () => Input,
  },
})
let vm = getCurrentInstance()
const changeRef = (instance) => {
  vm.exposed = instance || {}
  vm.exposeProxy = instance || {}
}
</script>
