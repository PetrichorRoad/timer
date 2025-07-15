<template>
  <component :is="h(Element,{...$attrs,...props,ref:changeRef},$slots)"></component>
</template>

<script>
import { h } from 'vue'
export default {
  props: {
    Element: {
      type: Object,
      default: () => Input,
    },
  },
  methods: {
    changeRef(instance) {
      this.exposed = instance || {};
      this.exposeProxy = instance || {};
    }
  }
}
</script>