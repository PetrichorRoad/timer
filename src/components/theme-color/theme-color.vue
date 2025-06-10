<template>
  <div class="pr-2">
    <n-radio-group :value="computedTheme" @update:value="setTheme">
      <n-radio-button
        v-for="song in songs"
        :key="song.value"
        :value="song.value"
        :label="song.label"
      />
    </n-radio-group>

    <n-radio-group :value="computedLocale" @update:value="changeLanguage">
      <n-radio-button
        v-for="song in songs"
        :key="song.value"
        :value="song.lang"
        :label="song.label"
      />
    </n-radio-group>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@/store/index";
// import { useI18n } from 'vue-i18n'
// const { locale, availableLocales,messages } = useI18n()
const store = useStore();
const { setTheme,setLangs } = store;
const computedTheme = computed(() => {
  return store.theme;
});
const computedLocale = computed(() => {
  return store.lang;
});
// 切换语言方法
const changeLanguage = (newLocale) => {
  // $changeLang(newLocale)
  localStorage.setItem('lang', newLocale)
  window.location.reload()
  // console.log(messages.value)
  // locale.value = newLocale
  // setLangs(newLocale)
}
const songs = [
  {
    value: "light",
    label: "明亮",
    lang: "zhcn",
  },
  {
    value: "dark",
    label: "黑暗",
    lang: "en",
  },
  {
    value: "overrides1",
    label: "主题",
    lang: "ja",
  }
];
</script>

<style scoped>
</style>