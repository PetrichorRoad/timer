<script setup>
import request from "@/api/modules/user";
import {saveUserInfo,saveUserSetting} from "@/utils/auth";
const login = async () => {
  let params = {
    mobile: "13800000001",
    password:
      "GUnJ6KllG4wlZB5kZbYW/0tPeVxhMZoGMOY/k/l+VZwxj9MtgY/g5UlsI3xxJh1bAJoPERg7esVNsaeBgsMtyub3wsbloqDt+EOO82utYQWldRqVsrPZjoMGMbobE3aALEFRXMwTCKo3XbIPy+B6oDcrdrZogB4LclkFxMeC6HMz2Vl0ItDMcTo3UdXN9xtqIXx1bLJo97lKgE05/APUvQNWQZQ8QldghYPE/s7eiexLXpOLopnHaEmN8IF2akjbHeZ2fvcyD+W5g4w1Bi2cXFHfF90Hqr6zAbefPw9e5G5l/Z9JuTjbHnvgF0WNoFQR8o8VUc3y5r3tB/Nue+OyTw==",
    platform: "web",
  };
  const {code,data} = await request.login(params);
  if(code === 200){
    let {access_token} = data;
    let expire = 60 * 60 * 24;
    saveUserInfo({expire:new Date().getTime() + expire * 1000,value:access_token});
    let res = await request.getUserInfo({});
    saveUserSetting({expire:new Date().getTime() + expire * 1000,value:res.data});
  }
};
onMounted(() => {
  login();
});
</script>

<template>
  <div></div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
