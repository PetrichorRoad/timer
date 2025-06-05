import { createI18n } from 'vue-i18n';

import messages from './locales';
// import { useStore } from "@/store/index";
// const store = useStore();
export const i18n = createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false
});
console.log(i18n.global.messages.value);

export const $t = i18n.global.t;