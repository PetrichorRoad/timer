<script setup>
import { onMounted } from "vue";
import { useStore } from "@/store/index";
import langJSON from '../lang/index.json';
import {i18nDB} from "@/database/index";
import ws from '@/plugins/connect.js'
import { getToken, getIMToken } from '@/utils/lib'
const { theme } = useStore();
document.documentElement.className = theme;
const init = () => {
  ws.connect()
  console.log('已连接');
}

onMounted(() => {
  getIMToken() && init()
})
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
