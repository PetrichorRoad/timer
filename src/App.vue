<script setup>
import { onMounted } from "vue";
import { useStore } from "@/store/setting";
import ws from '@/plugins/connect.js'
import { getToken, getIMToken } from '@/utils/lib'
import MessageBox from "@/components/empty/message.vue";

const { theme } = useStore();
document.documentElement.className = theme;
const init = () => {
  ws.connect()
}


// conten
onMounted(() => {
  init()
  // getIMToken() && init()
})
</script>

<script>


// content
</script>

<template>
  <n-modal-provider>
    <n-message-provider>
      <message-box></message-box>
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
