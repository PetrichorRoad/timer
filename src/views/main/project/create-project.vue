<template>
  <div class="page p-2 box-border flex gap-2 flex-col">
    <div>
      <n-card title="项目动态">
        <template #header>12132 </template>
      </n-card>

      <n-card title="项目动态" class="flex-1">
        <n-form
          ref="formRef"
          :model="projectForm"
          :rules="rules"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <n-grid :cols="24" :x-gap="24">
            <!-- 基础信息 -->
            <n-gi :span="12">
              <n-form-item label="项目编号" path="projectId">
                <n-input
                  v-model:value="projectForm.projectId"
                  placeholder="请输入项目编号"
                  clearable
                />
              </n-form-item>

              <n-form-item label="项目名称" path="projectName">
                <n-input
                  v-model:value="projectForm.projectName"
                  placeholder="请输入项目名称"
                  clearable
                />
              </n-form-item>

              <n-form-item label="项目状态" path="projectStatus">
                <n-select
                  v-model:value="projectForm.projectStatus"
                  :options="projectStatusOptions"
                  placeholder="请选择项目状态"
                />
              </n-form-item>

              <n-form-item label="优先级" path="priorityLevel">
                <n-select
                  v-model:value="projectForm.priorityLevel"
                  :options="priorityLevelOptions"
                  placeholder="请选择优先级"
                />
              </n-form-item>
            </n-gi>

            <!-- 时间信息 -->
            <n-gi :span="12">
              <n-form-item label="计划开始时间" path="planStartDate">
                <n-date-picker
                  v-model:value="projectForm.planStartDate"
                  type="date"
                  clearable
                />
              </n-form-item>

              <n-form-item label="计划结束时间" path="planEndDate">
                <n-date-picker
                  v-model:value="projectForm.planEndDate"
                  type="date"
                  clearable
                />
              </n-form-item>

              <n-form-item label="实际开始时间" path="actualStartDate">
                <n-date-picker
                  v-model:value="projectForm.actualStartDate"
                  type="date"
                  clearable
                />
              </n-form-item>

              <n-form-item label="实际结束时间" path="actualEndDate">
                <n-date-picker
                  v-model:value="projectForm.actualEndDate"
                  type="date"
                  clearable
                />
              </n-form-item>
            </n-gi>

            <!-- 金额与工时 -->
            <n-gi :span="12">
              <n-form-item label="项目预算" path="projectBudget">
                <n-input-number
                  v-model:value="projectForm.projectBudget"
                  :precision="2"
                  clearable
                  placeholder="请输入预算金额"
                />
              </n-form-item>

              <n-form-item label="计划工时" path="plannedHours">
                <n-input-number
                  v-model:value="projectForm.plannedHours"
                  :min="0"
                  clearable
                  placeholder="请输入计划工时"
                />
              </n-form-item>

              <n-form-item label="实际工时" path="actualHours">
                <n-input-number
                  v-model:value="projectForm.actualHours"
                  :min="0"
                  clearable
                  placeholder="请输入实际工时"
                />
              </n-form-item>
            </n-gi>

            <!-- 人员与部门 -->
            <n-gi :span="12">
              <n-form-item label="项目经理" path="projectManager">
                <n-input
                  v-model:value="projectForm.projectManager"
                  placeholder="请输入项目经理姓名"
                  clearable
                />
              </n-form-item>

              <n-form-item label="创建部门" path="creatorDept">
                <n-input
                  v-model:value="projectForm.creatorDept"
                  placeholder="请输入创建部门"
                  clearable
                />
              </n-form-item>

              <n-form-item label="项目描述" path="projectDescription">
                <n-input
                  v-model:value="projectForm.projectDescription"
                  type="textarea"
                  placeholder="请输入项目描述"
                  :autosize="{ minRows: 3 }"
                />
              </n-form-item>
            </n-gi>
          </n-grid>

          <div class="flex gap-2">
            <n-button type="primary" @click="handleSubmit">提交</n-button>
            <n-button @click="handleReset">重置</n-button>
          </div>
        </n-form>
      </n-card>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { updateProject, createProject } from "@/api/base";
import { ref, reactive } from "vue";
import { useMessage } from "naive-ui";
import moment from "moment/moment";

const message = useMessage();
const formRef = ref(null);

// 表单数据模型
const projectForm = ref({
  // projectId: '',
  // projectName: '',
  // projectStatus: '进行中',
  // projectType: '',
  // projectPhase: '',
  // clientName: '',
  // priorityLevel: '中',
  // deliveryDept: '',
  // projectBudget: null,
  // planStartDate: null,
  // planEndDate: null,
  // actualStartDate: null,
  // actualEndDate: null,
  // plannedHours: 0,
  // actualHours: 0,
  // projectManager: '',
  // projectSupervisor: '',
  // creator: '',
  // creatorDept: '',
  // createTime: null,
  // organizationTime: null,
  // projectDescription: ''
  id: null,
  projectId: "PROJ-20231002", // 必填，项目编号（String）
  projectName: "智能仓储系统开发", // 必填，项目名称（String）
  projectStatus: "进行中", // 枚举值：进行中/已结项/暂停中
  projectType: "软件开发", // 项目类型（String）
  projectPhase: "需求分析", // 项目阶段（String）

  // 客户与部门信息
  clientName: "未来物流集团", // 客户名称（String）
  priorityLevel: "中", // 枚举值：高/中/低（默认中）
  deliveryDept: "技术交付部", // 交付部门（String）

  // 预算与时间
  projectBudget: 250000.0, // 项目预算（BigDecimal，两位小数）
  planStartDate: moment("2023-10-10").valueOf(), // 计划开始日期（Date，yyyy-MM-dd）
  planEndDate: moment("2024-06-30").valueOf(), // 计划结束日期（Date）

  // 实际时间（可选）
  actualStartDate: null, // 实际开始日期（未开始时为null）
  actualEndDate: null, // 实际结束日期（未结束时为null）

  // 工时
  plannedHours: 1200, // 计划工时（Integer）
  actualHours: 0, // 实际工时（Integer，初始为0）

  // 人员信息
  projectManager: "张总监", // 项目经理（String）
  projectSupervisor: "李主管", // 项目主管（String）
  creator: "王工程师", // 创建人（String）
  creatorDept: "研发中心", // 创建部门（String）

  // 系统字段
  createTime: "2023-10-01", // 创建时间（Date，自动填充）
  organizationTime: "2023-09-20", // 立项时间（Date）

  // 项目描述
  projectDescription: "开发智能仓储管理系统，实现自动化库存调度与AI预测", // 项目描述（String）
});

// 枚举选项
const projectStatusOptions = [
  { label: "进行中", value: "进行中" },
  { label: "已结项", value: "已结项" },
  { label: "暂停中", value: "暂停中" },
];

const priorityLevelOptions = [
  { label: "高", value: "高" },
  { label: "中", value: "中" },
  { label: "低", value: "低" },
];

// 验证规则
const rules = {
  projectId: { required: true, message: "项目编号不能为空", trigger: "blur" },
  projectName: { required: true, message: "项目名称不能为空", trigger: "blur" },
  projectStatus: {
    required: true,
    message: "请选择项目状态",
    trigger: "change",
  },
  projectBudget: {
    required: true,
    type: "number",
    message: "请输入有效的预算金额",
    trigger: "blur",
  },
};

// 提交处理
const handleSubmit = (e) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let { id } = projectForm.value;
      if (id) {
        let res = await updateProject(projectForm.value);
        message.success("表单验证通过");
      } else {
        let res = await createProject(projectForm.value);
        message.success("表单验证通过");
      }
    } else {
      message.error("请完善表单信息");
    }
  });
};

// 重置表单
const handleReset = () => {
  formRef.value?.restoreValidation()
};
</script>

<style>
</style>