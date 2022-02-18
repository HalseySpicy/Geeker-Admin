<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/images/login_left.svg" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <p class="logo-text">Geeker-Admin</p>
        </div>
        <LoginForm ref="loginRef" @clickParent="clickParent" :data="loginForm"></LoginForm>
        <el-button type="primary" @click="helloClick">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "./components/LoginForm.vue";
import { ref, reactive, Ref, toRefs } from "vue";
type LoginFormExpose = {
  count: number;
  consoleNumber: () => void;
};
const loginRef = ref<LoginFormExpose | null>(null);

const helloClick = () => {
  console.log(loginRef.value?.count);
  loginRef.value!.consoleNumber();
};
interface LoginFrom {
  username: string;
  password: string;
}
const loginForm = reactive<LoginFrom[]>([
  {
    username: "111",
    password: ""
  }
]);
const item: Ref<string> = ref("111");
const item1 = ref<number>(11);
console.log(item.value, item1.value);

const clickParent = (number: number) => {
  console.log(number);
  console.log(2121212);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
