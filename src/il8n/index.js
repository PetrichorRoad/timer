import { createI18n } from 'vue-i18n';
import { getTranslations } from '@/database/data';

import messages from './locales';
const formatData = async () => {
  let res = await getTranslations();
  let locales = {
    'en-US':{},
    'zh-CN':{},
    'zh-TW':{},
    'ja-JP':{},
    'ko-KR':{},
    'fr-FR':{},
  }
  for (let key in res) {
    let transaction = res[key];
    locales['en-US'][key] = res[key]['en-US'];
    locales['zh-CN'][key] = res[key]['zh-CN'];
    locales['zh-TW'][key] = res[key]['zh-TW'];
    locales['ja-JP'][key] = res[key]['ja-JP'];
    locales['ko-KR'][key] = res[key]['ko-KR'];
    locales['fr-FR'][key] = res[key]['fr-FR'];
  }
  console.log(locales);
  console.log(messages);
  return locales;
}
// const 
export const i18n = createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: await formatData(),
  // messages: messages,
  legacy: false
});
export const $t = i18n.global.t;