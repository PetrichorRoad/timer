<template>
  <div class="page flex items-center justify-center login-page border-box">
    <div class="login-container flex">
      <div class="form-box" :class="scene ? 'register' : 'login'">
        <div class="register-box h-full" v-show="!scene">
          <h1>register</h1>
          <div class="w-full h-[46%] flex flex-col items-center">
            <input type="text" placeholder="昵称" />
            <input type="text" placeholder="邮箱" />
            <input type="password" placeholder="请输入密码" />
            <input type="password" placeholder="请确认密码" />
          </div>
          <button>注册</button>
        </div>
        <div class="login-box h-full" v-show="scene">
          <h1>login</h1>
          <div class="w-full h-[46%] flex flex-col items-center">
            <input type="text" v-model="login.email" placeholder="邮箱" />
            <input
              type="password"
              v-model="login.password"
              placeholder="密码"
            />
          </div>
          <button @click="loginSubmit">登录</button>
        </div>
      </div>
      <div class="con-box left py-8">
        <h2>欢迎来的 <span>前端世界</span></h2>
        <p>快快滴</p>
        <div class="w-[150px] h-[150px]"></div>
        <p>已有帐号</p>
        <button @click="trigger">去登录</button>
      </div>
      <div class="con-box right py-8">
        <h2>欢迎来的 <span>前端世界</span></h2>
        <p>快快滴</p>
        <div class="w-[150px] h-[150px]"></div>
        <p>没有帐号</p>
        <button @click="trigger">去注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import request from "@/api/base";
import user from "@/api/modules/user";
import {saveUserInfo,saveUserSetting} from "@/utils/auth";
let router = useRouter();
let scene = ref(true);
let register = ref({
  email: "",
  email: "",
  prepare_password: "",
  confirm_password: "",
});
let login = ref({
  email: "123@qq.com",
  password: "123456",
});
const loginSubmit = async () => {
  let res = await request.login(login.value);
  let { data:{ token } } = res
  localStorage.setItem("token", token);
  localStorage.setItem("userInfo", JSON.stringify(res.data));
  
  await loginTimerIM();
  router.push("/");
};
const loginTimerIM = async () => {
  let params = {
    mobile: "13800000001",
    password:
      "nkBP8uHbojzOOGzg6u8V2ouimKtUnZXwUYqHthob07RgKjG8hCW+4eH4+RJtW3i2yLxrbdPYX+P4RlKfSFWBwBHLwzxsZGQrbc3gjQAPZIy8LBJRo0caiOcy9GGxfycjieZg2O9C9P8I60fmZrLQPMfWcL0GetjtAmwUeFOtD+wSIKnN895tbPFzognR+a/FpwQvQiG0O6uR1P6Er2EbZ5Li7j0cUg2L/11AWqNZ62iEW/3KAFE9wqgu+uYAwE2FHQ0wt5YeFecog013yLOfE5/2VQSxPmrWJpcakjJ8BeSBadwXRdRQhFbP+OMONhi8a80wuXzWvrfPc520Yn/aEg==",
    platform: "web",
  };
  const {code,data} = await user.login(params);
  if(code === 200){
    let {access_token} = data;
    let expire = 60 * 60 * 24;
    saveUserInfo({expire:new Date().getTime() + expire * 1000,value:access_token});
    let res = await user.getUserInfo({});
    saveUserSetting({expire:new Date().getTime() + expire * 1000,value:res.data});
  }
};
const trigger = () => {
  scene.value = !scene.value;
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(200deg, #f3e7e9, #e3eeff);
  .login-container {
    background-color: #fff;
    width: 640px;
    height: 400px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
    position: relative;
    .form-box {
      position: absolute;
      top: -10%;
      background-color: #d3b7d8;
      width: 300px;
      height: 500px;
      border-radius: 5px;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      transition: background-color 0.5s ease-in-out;
      .register-box,
      .login-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        h1 {
          text-align: center;
          margin-bottom: 25px;
          color: #fff;
          letter-spacing: 5px;
        }
        input {
          background-color: transparent;
          width: 70%;
          color: #fff;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          padding: 10px 0;
          margin: 8px 0;
          text-indent: 10px;
          font-size: 14px;
          letter-spacing: 2px;
          &::placeholder {
            color: #fff;
          }
          &:focus {
            color: #a262ad;
            outline: none;
            border-bottom: 1px solid #a262ad80;
            outline: none;
            transition: 0.5s;
            &::placeholder {
              opacity: 0;
            }
          }
          //   &:-internal-autofill {
          //     -webkit-text-fill-color: #ffffff !important;
          //     transition: background-color 5000s ease-in-out 0s !important;
          //     background-color: transparent !important;
          //   }
          &:-webkit-autofill {
            -webkit-text-fill-color: #ffffff !important;
            -webkit-box-shadow: 0 0 0 1000px #d3b7d8 inset !important;
          }
        }
        button {
          width: 70%;
          margin-top: 35px;
          background-color: #f6f6f6;
          outline: none;
          border-radius: 8px;
          padding: 12px;
          color: #a262ad;
          letter-spacing: 2px;
          border: none;
          cursor: pointer;
          &:hover {
            background-color: #a262ad;
            color: #f6f6f6;
            transition: 0.3s ease-in-out;
          }
        }
      }
    }
    .login {
      right: 5%;
    }
    .register {
      left: 5%;
    }
    .con-box {
      width: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      h2 {
        color: #8e9aaf;
        font-size: 25px;
        font-weight: bold;
        letter-spacing: 2px;
        text-align: center;
        margin-bottom: 4px;
      }
      p {
        font-size: 12px;
        letter-spacing: 2px;
        color: #8e9aaf;
      }
      span {
        color: #d3b7d8;
      }
      div {
        opacity: 0.9;
        margin: 40px 0;
      }
      button {
        margin-top: 3%;
        background: #fff;
        color: #a262ad;
        border: 1px solid #d3b7d8;
        padding: 6px 10px;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        &:hover {
          background: #d3b7d8;
          color: #fff;
        }
      }
    }
    .left {
    }
    .right {
      right: -2%;
    }
    .hidden {
      display: none;
      transition: 0.5s;
    }
  }
}
</style>