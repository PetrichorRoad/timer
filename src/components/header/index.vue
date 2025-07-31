<template>
  <n-layout-header bordered>
    <header class="h-[60px] flex items-center justify-between">
      <div class="flex items-center justify-between w-full">
        <div class="w-[240px]"></div>
        <div class="flex-1 flex justify-between items-center">
          <div class="flex-1">

          </div>
          <!-- <n-menu mode="horizontal" :inverted="inverted" :options="list" :value="routeName" class="flex-1" /> -->
          <div class="flex items-center gap-6 px-6">
            <n-icon :component="TrailSignSharp" size="16" :depth="1" @click="goHomePage" />
            <n-icon :component="SettingsOutline" size="16" :depth="1" @click="setting" />
          </div>
        </div>

        <div>
          <n-dropdown trigger="hover" :options="options">
            <div class="flex items-center p-[8px]">
              <NAvatar round :src="`https://picsum.photos/200/300?${userInfo.accountId}`" class="mr-[12px]" />
              <div class="flex flex-col gap-2">
                <NText depth="2" class="text-[14px]">{{ userInfo.nickname }}</NText>
                <NText depth="3" class="text-[12px]">{{ userInfo.signature }}</NText>
              </div>
            </div>
          </n-dropdown>
        </div>
      </div>
      <div></div>
    </header>
  </n-layout-header>
</template>

<script setup lang="jsx">
import themeColor from "@/components/theme-color/theme-color.vue";
import themeLang from "@/components/theme-color/theme-lang.vue";
import { SettingsOutline, TrailSignSharp } from "@vicons/ionicons5";
import { computed, h } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useStore } from "@/store/setting";
const store = useStore();
let router = useRouter();
const userInfo = computed(() => {
  let info = JSON.parse(localStorage.getItem("userInfo"))
  return info;
});
const setting = () => {
  router.push({
    path: "/index/main/setting",
  });
};
const goHomePage = () => {
  window.open("https://petrichorroad.github.io/", "_blank");
};
const renderCustomHeader = () => {
  return (
    <div class="flex items-center p-[8px]">
      <NAvatar round src={`https://picsum.photos/200/300?${userInfo.value.accountId}`} class="mr-[12px]" />
      <div class="flex flex-col gap-2">
        <NText depth="2" class="text-[14px]">{userInfo.value.nickname}</NText>
        <NText depth="3" class="text-[12px]">{userInfo.value.signature}</NText>
      </div>
    </div>
  )
}
const renderThemeSetting = () => { 
  return (
    <div class="flex items-center p-[8px] gap-2">
      <label depth="2" class="text-[14px] w-[50px]">主题:</label>
      <theme-color></theme-color>
    </div>
  )
}
const renderLanguageSetting = () => { 
  return (
    <div class="flex items-center p-[8px] gap-2">
      <label depth="2" class="text-[14px] w-[50px]">国际化:</label>
      <theme-lang></theme-lang>
    </div>
  )
}
const renderLogout = () => { 
  return (
    <div class="flex items-center p-[8px] gap-2">
      <button class="n-button n-button--primary" onClick={logout}>退出登录</button>
    </div>
  )
}
const logout = () => { 
  router.push('/login')
}
const options = computed(() => {
  return [
    {
      key: 'header',
      type: 'render',
      render: renderCustomHeader
    },
    {
      key: 'header-divider',
      type: 'divider'
    },
    {
      type: 'render',
      key: 'theme',
      render: renderThemeSetting
    },
    {
      type: 'render',
      key: 'language',
      render: renderLanguageSetting
    },
    {
      type: 'render',
      key: 'logout',
      render: renderLogout
    },
  ];
});
</script>

<style></style>