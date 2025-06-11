<script setup>
import { useStore } from "@/store/index";
import langJSON from '../lang/index.json';
import {i18nDB} from "@/database/index";
const { theme } = useStore();
document.documentElement.className = theme;
console.log(langJSON,Object.keys(langJSON).length);
// Object.keys(langJSON).forEach(async (lang) => {
//   await i18nDB.save(lang, langJSON[lang]);
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
