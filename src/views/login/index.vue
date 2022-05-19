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
				<LoginForm ref="loginRef" :age="'20'" :address="['天府三街', '天府四街']" :obj="obj"></LoginForm>
				<!-- <el-button @click="consoleRef">打印子组件数据</el-button> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
import { LoginFormExpose } from "./interface/index";
import { Login } from "@/api/interface/index";
import { ref, reactive, provide } from "vue";

// * 以下数据都为自己测试使用，不参与功能开发
// 使用provide传方法
let phone = ref<string>("iphone");
// provide
provide("provideState", {
	name: "liutao",
	age: "20",
	changeName: () => {
		// console.log(phone.value);
		setTimeout(() => {
			phone.value = "huawei";
			// console.log(phone.value);
		}, 1000);
	}
});

// 传给子组件方法（submitParent）
// const submitParent = (LoginFrom: Login.ReqLoginForm) => {
// 	console.log(LoginFrom);
// };

// 使用子组件数据
const loginRef = ref<LoginFormExpose | null>(null);
// const consoleRef = () => {
// 	console.log(loginRef.value?.count);
// 	loginRef.value?.consoleNumber("liutao");
// };

// 定义数据类型两种方法
// const item: Ref<string> = ref("111");
// const item1 = ref<number>(111);

const obj = reactive<Login.ReqLoginForm>({
	username: "admin",
	password: "123456"
});
// 使用toRefs解构数据（在template中直接用）
// const { username, password } = toRefs(obj);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
