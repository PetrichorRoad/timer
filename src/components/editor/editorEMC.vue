<template>
  <div class="">
    <editor
      v-model="content"
      api-key="no-api-key"
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      :init="init"
    ></editor>
  </div>
</template>

<script setup>
import { computed, reactive, watch, ref, nextTick, onMounted } from "vue"; //全屏
import Editor from "@tinymce/tinymce-vue";
import "tinymce/tinymce";
import "tinymce/models/dom";
import "tinymce/icons/default";
import "tinymce/themes/silver/theme";

import "tinymce/plugins/fullscreen";
import "tinymce/plugins/autoresize";
// Skins
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import content_style from "tinymce/skins/content/dark/content.min.css?inline"; //将内容存入content_style

// Plugins 组件根据init中调用情况自行加载
import "tinymce/plugins/preview"; // 预览
import "tinymce/plugins/emoticons"; // emoji表情
import "tinymce/plugins/emoticons/js/emojis.js"; //必须引入这个文件才有表情图库
import "tinymce/plugins/code"; // 编辑源码
import "tinymce/plugins/link"; // 链接插件
import "tinymce/plugins/advlist"; //高级列表
import "tinymce/plugins/codesample"; //代码示例
import "tinymce/plugins/autoresize"; // 自动调整编辑器大小
import "tinymce/plugins/quickbars"; // 光标处快捷提示
import "tinymce/plugins/nonbreaking"; //插入不间断空格
import "tinymce/plugins/searchreplace"; //查找替换
import "tinymce/plugins/autolink"; //自动链接
import "tinymce/plugins/directionality"; //文字方向
import "tinymce/plugins/visualblocks"; //显示元素范围
import "tinymce/plugins/visualchars"; //显示不可见字符
import "tinymce/plugins/charmap"; // 特殊符号
import "tinymce/plugins/insertdatetime"; //插入日期时间
import "tinymce/plugins/importcss"; //引入自定义样式的css文件
import "tinymce/plugins/accordion"; // 可折叠数据手风琴模式
import "tinymce/plugins/anchor"; //锚点

import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/importcss"; //图片工具
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/charmap"; // 特殊字符
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/codesample"; // 插入代码
import "tinymce/plugins/code"; // 查看源码
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/link"; //
import "tinymce/plugins/preview"; // 预览
// import "tinymce/plugins/template"; //插入模板
import "tinymce/plugins/save"; // 保存
import "tinymce/plugins/searchreplace"; //查询替换
import "tinymce/plugins/pagebreak"; //分页
import "tinymce/plugins/insertdatetime"; //时间插入
const emit = defineEmits(["update:content"]);
const props = defineProps({
  plugins: {
    type: [String, Array],
    default:
      "preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media" +
      " code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount" +
      " autoresize accordion",
  },
  toolbar: {
    type: [String, Array, Boolean],
    default:
      "undo redo | accordion accordionremove | blocks fontfamily fontsize| bold italic underline strikethrough ltr rtl  | align numlist bullist searchreplace| link image | table | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | anchor codesample | fullscreen preview | print source table quickbars insertdatetime",
  },
  content: {
    type: String,
    default: "",
  },
});
// const content = ref("");
const content = computed({
  get: () => {
    console.log(props.content);
    return props.content;
  },
  set: (value) => emit('update:content', value)
})
const init = ref({
  branding: false,
  promotion: false,
  language_url: "/tinymce/langs/zh_CN.js",
  language: "zh_CN",
  license_key: "gpl",
  skin: "oxide-dark",
  min_height: 500,
  min_width: 500,
  skin_url: "/tinymce/skins/ui/oxide-dark",
  plugins: props.plugins,
  toolbar1: props.toolbar,
  link_context_toolbar: true,
  toolbar_sticky: true,
  menubar: "edit view insert format tools table",
  paste_data_images: true, //允许粘贴图像
  image_dimensions: false, //去除宽高属性
  image_advtab: true,
  importcss_append: true,
  paste_webkit_styles: "all",
  paste_merge_formats: true,
  nonbreaking_force_tab: false,
  paste_auto_cleanup_on_paste: false,
  table_toolbar:
    "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
  setup: (editor) => {
    editor.on("init", (e) => {
      console.log("init", e);
    });

  },
  init_instance_callback: (editor) => {
    editor.on("blur", (e) => {
      var content = tinyMCE.activeEditor.getContent();
    });
    editor.on("paste", (e) => {
      var content = tinyMCE.activeEditor.getContent();
    //   $("#fang_content_temp").val(content);
    });

    editor.on("ExecCommand", (e) => {
      var content = tinyMCE.activeEditor.getContent();
    //   $("#fang_content_temp").val(content);
    });
  },
});
watch(() => props.content,
(newValue)=>{
  console.log(newValue,'qwwqe');
},{  immediate: true }
)
onMounted(() => {
  console.log(props.content,'妈的');
  tinymce.init({ license_key: "gpl" });
});
defineExpose({
    content
})
</script>

<style lang="less" scoped>
</style>