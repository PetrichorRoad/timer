<template>
  <div class="page p-2 box-border overflow-y-auto gap-2 flex flex-col">
    <n-card title="个人信息">
      <div class="flex gap-4 flex-col">
        <div class="flex justify-between">
          <n-button @click="back">返回</n-button>
          <div class="flex gap-2">
            <n-button @click="back" type="primary">人事调动</n-button>
            <n-button @click="back" type="primary" ghost>导出</n-button>
            <n-button @click="back" type="primary" ghost>更多操作</n-button>
          </div>
        </div>
        <div class="flex justify-center items-center flex-col gap-2">
          <n-avatar :src="userInfo.avatar" :size="88" />
          <p class="text-lg">{{ userInfo.name }}</p>
          <p class="flex gap-4">
            <span class="gap">{{ userInfo.location }}</span>
            <span class="gap">{{ userInfo.status }}</span>
            <span class="gap">{{ userInfo.department }}</span>
            <span class="gap">{{ userInfo.organization }}</span>
            <span>{{ userInfo.position }}</span>
          </p>
          <div class="flex gap-4">
            <div class="flex gap-2 items-center">
              <n-icon size="16" class="appIcon">
                <Call />
              </n-icon>
              <span>{{ userInfo.phone }}</span>
            </div>
            <div class="flex gap-2 items-center">
              <n-icon size="16" class="appIcon">
                <Mail />
              </n-icon>
              <span>{{ userInfo.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </n-card>
    <n-card class="flex-1">
      <div class="flex gap-2 h-full">
        <div class="h-full flex flex-col">
          <div
            class="left flex gap-2 px-4 py-2 items-center menuItem"
            v-for="item in userMenuList"
            :key="item"
          >
            <n-icon size="16" class="appIcon"
              ><component :is="item.icon"></component
            ></n-icon>
            <span class="appName">{{ item.text }}</span>
          </div>
        </div>

        <div class="right flex-1 card-container">
          <div class="card-item">
            <div class="card-title">
              <span>{{ " 基础信息" }}</span>
              <span
                class="card-btns"
                v-show="!baseInfoVisible"
                @click="baseInfoVisible = true"
                >{{ "编辑" }}</span
              >
              <span
                class="card-btns"
                v-show="baseInfoVisible"
                @click="baseInfoVisible = false"
                >{{ "保存" }}</span
              >
            </div>
            <n-form
              ref="formRef"
              :model="userInfo"
              :rules="rules"
              label-placement="left"
              label-width="100"
              class="card-content"
            >
              <n-form-item label="姓名" path="name">
                <n-input v-model:value="userInfo.name" v-if="baseInfoVisible" />
                <div v-else>{{ userInfo.name }}</div>
              </n-form-item>
              <n-form-item label="工号" path="workNumber">
                <n-input
                  v-bind:value="userInfo.workNumber"
                  v-if="baseInfoVisible"
                  :disabled="true"
                />
                <div v-else>{{ userInfo.workNumber }}</div>
              </n-form-item>
              <n-form-item label="部门组织" path="organization">
                <n-cascader
                  v-if="baseInfoVisible"
                  v-model:value="userInfo.organization"
                  :options="organizationList"
                />
                <div v-else>{{ userInfo.organization }}</div>
              </n-form-item>
              <n-form-item label="职位" path="position">
                <n-select
                  v-if="baseInfoVisible"
                  v-model:value="userInfo.position"
                >
                  <n-option
                    v-for="item in positionList"
                    :value="item.value"
                    :label="item.label"
                    :key="item"
                    >{{ item.label }}</n-option
                  >
                  <n-option value="front-end" label="前端开发工程师">{{
                    "前端开发工程师"
                  }}</n-option>
                </n-select>
                <div v-else>{{ userInfo.position }}</div>
              </n-form-item>
              <n-form-item label="手机号" path="phone">
                <n-input
                  v-if="baseInfoVisible"
                  v-model:value="userInfo.phone"
                  placeholder="请输入手机号"
                />
                <div v-else>{{ userInfo.phone }}</div>
              </n-form-item>
              <n-form-item label="邮箱" path="email">
                <n-input
                  v-if="baseInfoVisible"
                  v-model:value="userInfo.email"
                  placeholder="请输入邮箱"
                />
                <div v-else>{{ userInfo.email }}</div>
              </n-form-item>
              <n-form-item label="位置" path="location">
                <n-cascader
                  v-if="baseInfoVisible"
                  v-model:value="userInfo.location"
                  :options="locationList"
                  placeholder="请选择位置"
                />
                <div v-else>{{ userInfo.location }}</div>
              </n-form-item>
              <n-form-item label="状态" path="status">
                <n-switch
                  v-if="baseInfoVisible"
                  v-model:value="userInfo.status"
                  :options="statusList"
                />
                <div v-else>{{ userInfo.status }}</div>
              </n-form-item>
            </n-form>
          </div>
          <div class="card-item">
            <div class="card-title">
              <span>{{ " 工作状态" }}</span>
              <span
                class="card-btns"
                v-show="!baseInfoVisible"
                @click="baseInfoVisible = true"
                >{{ "编辑" }}</span
              >
              <span
                class="card-btns"
                v-show="baseInfoVisible"
                @click="baseInfoVisible = false"
                >{{ "保存" }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Call, Mail } from "@vicons/ionicons5";
import { ref } from "vue";
let router = useRouter();
let userMenuList = [
  {
    icon: Call,
    text: "工作信息",
    code: "work-info",
  },
  {
    icon: Call,
    text: "个人信息",
    route: "/system-setting",
  },
  {
    icon: Call,
    text: "教育经历",
    route: "/system-setting",
  },
  {
    icon: Call,
    text: "工作经历",
    route: "/system-setting",
  },
  {
    icon: Call,
    text: "合同信息",
    route: "/system-setting",
  },
  {
    icon: Call,
    text: "薪资档案",
    route: "/system-setting",
  },
  {
    icon: Call,
    text: "附件存档",
    route: "/system-setting",
  },
  {
    icon: Call,
    text: "成长记录",
    route: "/system-setting",
  },
];
let organizationList = ref([]);
let positionList = ref([]);
let locationList = ref([]);
let baseInfoVisible = ref(false);
let userInfo = ref({
  name: "赵晨宇",
  avatar: "https://picsum.photos/seed/picsum/200/300",
  signature: "人生若只如初见，何事秋风悲画扇",
  nickname: "繁星",
  position: "front-end",
  organization: "前端组",
  department: "基础研发",
  location: "上海",
  email: "zhao@gmail.com",
  phone: "12345678901",
  status: "正式",
  level: "高级工程师",
  workNumber: "12345678",
});
let rules = ref({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  workNumber: [{ required: true, message: "请输入工号", trigger: "blur" }],
  signature: [{ required: true, message: "请输入签名", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  position: [{ required: true, message: "请输入职位", trigger: "blur" }],
  organization: [{ required: true, message: "请输入组织", trigger: "blur" }],
  department: [{ required: true, message: "请输入部门", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  location: [{ required: true, message: "请输入地址", trigger: "blur" }],
});
const back = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.gap {
  position: relative;
  &::after {
    content: "|";
    position: absolute;
    top: 0;
    right: -10px;
    height: 100%;
  }
}
.menuItem {
  border-radius: 4px;
  .active {
    background-color: #2d8cf0;
  }
  &:hover {
    background-color: #2d8cf0;
  }
}
.card-container {
  border-radius: 4px;
  border: 1px solid #e8eaec;
  padding: 1.25rem;
  overflow: auto;
  .card-item {
    .card-title {
      position: relative;
      padding-left: 16px;
      margin-bottom: 16px;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 4px;
        background-color: #2d8cf0;
        border-radius: 2px;
      }
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 80px;
        transform: translateY(-50%);
        width: calc(100% - 160px);
        border: 1px solid #e8eaec;
        background-color: #2d8cf0;
        border-radius: 2px;
      }
      .card-btns {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
      }
    }
    .card-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>