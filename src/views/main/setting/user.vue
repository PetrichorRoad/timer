<template>
  <div class="page p-2 box-border overflow-y-auto">
    <n-space vertical>
      <n-card title="搜索">
        <n-form
          ref="formRef"
          inline
          :model="userParam"
          label-placement="left"
          label-width="80"
        >
          <n-grid :x-gap="12" :y-gap="8" :cols="4" responsive="screen">
            <n-grid-item>
              <n-form-item label="昵称" path="nickname">
                <n-input
                  v-model:value="userParam.nickname"
                  placeholder="输入昵称"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="职位" path="position">
                <n-select
                  v-model:value="userParam.position"
                  size="medium"
                  :options="positionOptions"
                  clearable
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="邮箱" path="name">
                <n-input
                  v-model:value="userParam.email"
                  placeholder="输入姓名"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="电话号码" path="phone">
                <n-input
                  v-model:value="userParam.phone"
                  placeholder="电话号码"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="用户状态" path="state">
                <n-input
                  v-model:value="userParam.state"
                  placeholder="用户状态"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="3">
              <div class="flex justify-end gap-2">
                <n-button attr-type="button" @click="reset"> 重置 </n-button>
                <n-button attr-type="button" @click="search" type="primary">
                  搜索
                </n-button>
              </div>
            </n-grid-item>
          </n-grid>
        </n-form>
      </n-card>
      <n-card title="用户列表">
        <n-data-table
          :columns="columns"
          :data="data"
          :row-key="rowKey"
          default-expand-all
        />
      </n-card>
      <n-card title="大卡片" size="large"> 卡片内容 </n-card>
      <n-card title="超大卡片" size="huge"> 卡片内容 </n-card>
    </n-space>
  </div>
</template>

<script setup lang="jsx">
import { computed, reactive, watch, ref,h, nextTick, onMounted } from "vue";
import { routes } from "@/router/index";
const userParam = ref({
  phone: "",
  position: "",
  nickname: "",
  email: "",
  state: ""
});
const rowKey = (row) => row.path
const data = ref(routes)
console.log(routes);
const columns = [
      {
        type: "selection"
      },
      {
        title: "name",
        key: "name"
      },
      {
        title: "index",
        key: "index"
      }
];
const positionOptions = [
  { label: "前端工程师", value: "frontend" },
  { label: "后端工程师", value: "backend" },
  { label: "全栈架构师", value: "fullstack" },
  { label: "产品经理", value: "product" },
  { label: "UI设计师", value: "designer" },
  { label: "测试工程师", value: "tester" },
  { label: "项目经理", value: "manager" },
];
const search = () => {
  console.log(userParam.value);
}
const reset = () => {
  userParam.value = {
    phone: "",
    position: "",
    nickname: "",
    email: "",
    state: ""
  }
}
</script>

<style lang="less" scoped>
</style>