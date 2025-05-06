<template>
  <div class="page p-2 box-border overflow-y-auto">
    <n-space vertical>
      <n-card title="菜单列表">
        <template #header-extra>
          <div class="flex gap-2">
            <n-button type="primary" size="small">添加菜单</n-button>
          </div>
        </template>
        <n-data-table :columns="columns" :data="dataList" :row-key="rowKey" />
      </n-card>
      <n-card title="超大卡片" size="huge">
        <div ref="animationRef" style="width: 300px; height: 300px;"></div>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="jsx">
import { menuList } from '@/utils/lib/menu'
import { onMounted, ref } from 'vue'
import animationData from '@/assets/animation/load.json';
let columns = ref([
  {
    title: '菜单类型',
    render(row) {
      let flag = row.children ? '菜单' : '目录'
      let type = row.children ? 'warning' : 'default'
      return <n-tag type={type}>{flag}</n-tag>
    },
    width: 100,
    align: 'center',
  },
  {
    title: '图标',
    render(row) {
      return row.icon()
    },
    width: 100,
    align: 'center',
  },
  {
    title: '菜单名称',
    key: 'label',
    width: 200,
    align: 'center',
  },
  {
    title: '路由名称',
    key: 'name',
  },
  {
    title: '路由路径',
    key: 'path',
  },
  {
    title: '操作',
    width: 200,
    align: 'center',
    render(row) {
      return <div class="flex gap-2">
        <n-button type="primary" size="small">编辑</n-button>
        <n-button type="error" size="small">删除</n-button>
        {row.children ? <n-button type="primary" size="small">添加子菜单</n-button> : ''}
      </div>
    }
  }
])
let dataList = ref([])
let animationRef = ref(null)
let animation = ref(null)
let rowKey = (row) => row.name
const getMenuList = () => {
  dataList.value = menuList()
  console.log(dataList.value);
}
const loadAnimation = (callback) => {
  animation.value = lottie.loadAnimation({
    container: animationRef.value,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: animationData,
  });
  // animation.value.play()
  animation.value.addEventListener('complete', () => {
    // animation.value.stop(); // 停止在最后一帧
    console.log('ok');
    
  });
}
const stopAnimation = () => {
  
  
}
onMounted(() => {
  getMenuList()
  loadAnimation(stopAnimation)
  
})
</script>

<style></style>