<template>
    <div class="time">{{ text }}</div>
</template>
<script setup>
import { defineComponent, h, ref, onUnmounted, watch, computed } from 'vue'
import { formatTimeAgo } from '@/utils/lib/utils'

const props = defineProps({
    time: {
        type: String,
        default: '2022-03-06 21:20:00'
    }
})
const text = computed(() => {
    return formatTimeAgo(props.time)
})

</script>