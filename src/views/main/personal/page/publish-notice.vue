<template>
  <div class="page p-2 box-border overflow-y-auto gap-2 flex flex-col">
    <n-card title="卡片插槽示例">
      <template #header-extra>
        <n-button type="primary">预览</n-button>
      </template>
      <n-form
        ref="formRef"
        :model="userInfo"
        :rules="rules"
        label-placement="top"
        class="card-content"
      >
        <n-form-item label="标题" path="title">
          <n-input v-model:value="userInfo.title" />
        </n-form-item>
        <n-form-item label="类型" path="type">
          <n-radio-group v-model:value="userInfo.type">
            <n-radio value="1">通知</n-radio>
            <n-radio value="2">公告</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="内容" path="content">
          <editor
            api-key="no-api-key"
            ref="editorRef"
            :content="userInfo.content"
            v-model="userInfo.content"
          ></editor>
        </n-form-item>
      </n-form>

      <!-- <template #footer> #footer </template> -->
      <template #action>
        <div class="flex gap-2">
          <n-button type="primary" @click="save">保存</n-button>
          <n-button type="primary">发布</n-button>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import request from "@/api/base";
import { ref, watch, onMounted } from "vue";
import editor from "@/components/editor/editorEMC.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const formRef = ref();
const userInfo = ref({
  id: null,
  title: "",
  type: "1",
  content: "",
});
const rules = {
  title: [{ required: true, message: "请输入标题", max: 16, trigger: "blur" }],
  content: [
    { required: true, message: "请输入内容", max: 1000, trigger: "blur" },
  ],
};
const saveOrUpdateNotice = async () => {
  let res = await request.saveOrUpdateNotice(userInfo.value);
  console.log(res);
};
const save = () => {
  formRef.value.validate((valid) => {
    console.log(!valid);
    if (!valid) {
      saveOrUpdateNotice();
    }
  });
};
onMounted(() => {
  let {title,id,type,content} = route.query;
  userInfo.value = {title,id,type,content};
});
</script>

<style></style>