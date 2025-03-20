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
              <n-form-item label="部门" path="department">
                <n-cascader
                  v-model:value="userParam.department"
                  expand-trigger="click"
                  check-strategy="child"
                  :options="organizationTree"
                  :show-path="false"
                  :filterable="true"
                  @update:value="handleUpdateValue"
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
            <n-grid-item span="2">
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
      <n-card title="大卡片" size="large">
        <n-tag round :bordered="false" type="success">
          Checked
          <template #icon>
            <n-icon :component="CheckmarkCircle" />
          </template>
        </n-tag>
      </n-card>
    </n-space>

    <n-modal
      v-model:show="showModal"
      title="用户信息"
      preset="dialog"
      :show-icon="false"
      :auto-focus="false"
    >
      <div class="pt-4">
        <n-form ref="formRef" :model="userSetting" label-placement="left">
          <n-grid :cols="12" :x-gap="24">
            <n-form-item-gi :span="12" label="职位" path="inputValue">
              <n-select
                v-model:value="userSetting.position"
                :options="positionOptions"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="邮箱" path="inputValue">
              <n-input v-model:value="userSetting.email" :disabled="true" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="电话" path="inputValue">
              <n-input v-model:value="userSetting.phone" :disabled="true" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </div>
      <template #action>
        <div class="flex justify-end gap-1">
          <n-button ghost @click="cancel"> 取消 </n-button>
          <n-button type="primary" @click="confirm"> 确定 </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="jsx">
import { computed, reactive, watch, ref,h, nextTick, onMounted } from "vue";
import { Person,CheckmarkCircle } from '@vicons/ionicons5'
import { organization,getOrganization } from "@/utils/mock/data";
import { useDialog } from 'naive-ui'
let dialog = useDialog()
let userParam = ref({
  phone: "",
  position: "",
  nickname: "",
  email: "",
  status: "",
  department:null
});
let showModal = ref(false)
let organizationTree = getOrganization()
let userSetting = ref({
  avatar: "",
  nickname: "",
  position: "",
  department: "",
  email: "",
  phone: "",
  status: "",
  grade: "",
});
const confirm = () => {
  showModal.value = false
}
const cancel = () => {
  showModal.value = false
}
const handleUpdateValue = (value) => {
  userParam.value.department = value
}

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
const renderAction = (row) => {
  return (
    <div class="flex justify-center gap-1">
      <n-button type="primary" size="small" onClick={(event)=> {
        handleEdit(event,row)
        }} ghost round>
        编辑
      </n-button>
      <n-button type="error" size="small" onClick={(event)=> {
        handleDelete(event,row)
        }} ghost round>
        停用
      </n-button>
    </div>
  );
}
const handleEdit = (event,value) => {
  showModal.value = true
  userSetting.value = value
  console.log('handleEdit',userSetting.value);
}
const handleDelete = (event,value) => {
  dialog.warning({
          title: '警告',
          content: '你确定？',
          positiveText: '确定',
          negativeText: '不确定',
          draggable: true,
          onPositiveClick: () => {
          },
          onNegativeClick: () => {
          }
        })
}
const positionOptions = [
  { label: "前端工程师", value: "frontend" },
  { label: "后端工程师", value: "backend" },
  { label: "全栈架构师", value: "fullstack" },
  { label: "产品经理", value: "product" },
  { label: "UI设计师", value: "designer" },
  { label: "测试工程师", value: "tester" },
  { label: "部门经理", value: "manager" },
];
const tag = (grade,position) => {
  let levelMap = {
    1: "高级",
    2: "中级",
    3: "初级"
  }
  let pos = positionOptions.find(item => item.value === position).label
  return `${levelMap[grade]}${pos}`
};
let columns = [
      // {
      //   type: "selection"
      // },
      {
        title: "头像",
        key: "avatar",
        render:renderAvatar,
        align: "center",
      },
      {
        title: "昵称",
        key: "label",
        ellipsis: true,
        align: "center",
      },
      {
        title: "职位",
        key: "position",
        align: "center",
        render: (row) => {
          return <n-tag type="warning">
                  <div class="flex items-center gap-[10px] text-[12px]">
                    <span>{tag(row.grade,row.position)}</span>
                    <n-icon color={row.sex=='man' ? '#67c23a' : '#f56c6c'} component={Person}/>
                  </div>
                </n-tag>
        }
      },
      {
        title: "邮箱",
        key: "email",
      },
      
      {
        title: "电话号码",
        align: "center",
        key: "phone",
        align: "center",
      },
      {
        title: "用户状态",
        key: "status",
        align: "center",
        width: 80,
        render: (row) => {
          return (<div class="flex items-center justify-center">
            <span class="w-[5px] h-[5px] rounded" class={row.status=='active' ? 'bg-[#67c23a]' : 'bg-[#f56c6c]'}></span>
          </div>)
        }
      },
      {
        title: "操作",
        key: "action",
        align: "center",
        width: 200,
        render: renderAction
      },
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