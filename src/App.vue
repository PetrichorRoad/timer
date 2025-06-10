<script setup>
import { useStore } from "@/store/index";
const { theme } = useStore();
document.documentElement.className = theme;


// import { onMounted } from "vue";
// i18nDB.open();
// i18nDB.save("greeting", {
//   "zh-CN": "你好",
//   "zh-TW": "你好",
//   "en-US": "Hello",
//   "ja-JP": "こんにちは",
// });
// i18nDB.save("greeting1", {
//   "zh-CN": "你好",
//   "zh-TW": "你好",
//   "en-US": "Hello",
//   "ja-JP": "こんにちは",
// });
</script>

<template>
  <n-modal-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <n-loading-bar-provider>
            <n-config-provider>
              <router-view></router-view>
            </n-config-provider>
          </n-loading-bar-provider>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-modal-provider>
</template>

<style scoped>
</style>
