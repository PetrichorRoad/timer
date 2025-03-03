<script setup>
import { useStore } from "@/store/index";
const { theme } = useStore();
document.documentElement.className = theme;
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
