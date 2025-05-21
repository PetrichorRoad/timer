<template>
    <div v-if="visible" class="context-menu bg-my-bg-3" :style="{ left: `${x}px`, top: `${y}px` }" @click.stop>
        <!-- 接收动态菜单项 -->
        <slot name="menu">
            <!-- 默认菜单项渲染 -->
            <div v-for="(item, index) in items" :key="index" class="menu-item" @click="handleClick(item)">
                {{ item.label }}
            </div>
        </slot>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onUpdated } from 'vue'
let emit = defineEmits(['close'])
const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    visible: {
        type: Boolean,
        default: false
    },
    x: {
        type: Number,
        default: 0
    },
    y: {
        type: Number,
        default: 0
    }
})
const handleClick = (item) => {
    item.action()
    emit('close', item)
}
</script>

<style scoped>
.context-menu {
    position: fixed;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 8px 0;
    color: color-contrast(var(--un-preset-theme-colors-myBg-3) vs #fff, #000);  /** 基于背景色，自动选择对比度更高的颜色 **/
}

.menu-item {
    padding: 8px 16px;
    cursor: pointer;
}

.menu-item:hover {
    color: #409eff;
}
</style>