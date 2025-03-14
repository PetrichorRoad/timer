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
              <n-form-item label="用户状态" path="status">
                <n-input
                  v-model:value="userParam.status"
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
        <n-data-table :columns="columns" :data="userList" :row-key="rowKey" />
      </n-card>
      <n-card title="大卡片" size="large"> 卡片内容 </n-card>
      <n-card title="超大卡片" size="huge"> 卡片内容 </n-card>
    </n-space>
  </div>
</template>

<script setup lang="jsx">
import { computed, reactive, watch, ref,h, nextTick, onMounted } from "vue";
import { BookOutline } from '@vicons/ionicons5'
import { organization } from "@/utils/mock/data";
import { render } from "less";
const userParam = ref({
  phone: "",
  position: "",
  nickname: "",
  email: "",
  status: ""
});
const rowKey = (row) => {
  return row.email}
const findUsers = (nodes) => {
    return nodes.reduce((acc, node) => {
        // 如果当前节点是 user，添加到结果中
        if (node.type === 'user') {
          acc.push(node);
        }
        // 如果当前节点有子节点，递归处理子节点
        if (node.children && node.children.length > 0) {
            acc = acc.concat(findUsers(node.children));
        }
        return acc;
    }, []);
}
const userList = computed(() => {
  return findUsers(organization)
})
const renderAvatar = (row) => {
  return <n-avatar
      src={row.avatar|| 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'}
    />
}
const columns = [
      {
        type: "selection"
      },
      {
        title: "头像",
        key: "avatar",
        width: 80,
        render:renderAvatar
      },
      {
        title: "昵称",
        key: "title",
        width: 100,
        ellipsis: true,
        // render: (row) => {
        //   return <n-tooltip trigger="hover">
        //           <template v-slot={"trigger"}>
        //             <span>{ row.title.slice(0, 10) }</span>
        //           </template>
        //           {row.title}
        //         </n-tooltip>;
        // }
      },
      {
        title: "职位",
        key: "position",
        render: (row) => {
          return <n-tag type="warning">
                  {row.position}
                  <template v-slots={{
                    icon: () => (<n-icon component={BookOutline} />),
                  }}>
                  </template>
                </n-tag>
        }
      },
      {
        title: "邮箱",
        key: "email",
      },
      
      {
        title: "电话号码",
        key: "phone"
      },
      {
        title: "用户状态",
        key: "status"
      },
      {
        title: "操作",
        key: "action",
        slot: "action"
      },
];

const positionOptions = [
  { label: "前端工程师", value: "frontend" },
  { label: "后端工程师", value: "backend" },
  { label: "全栈架构师", value: "fullstack" },
  { label: "产品经理", value: "product" },
  { label: "UI设计师", value: "designer" },
  { label: "测试工程师", value: "tester" },
  { label: "部门经理", value: "manager" },
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
    status: ""
  }
}
</script>

<style lang="less" scoped>
</style>