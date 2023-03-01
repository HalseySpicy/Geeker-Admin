<template>
	<div class="card content-box">
		<span class="text"> 菜单权限 🍓🍇🍈🍉</span>
		<el-alert
			:title="'目前菜单权限使用动态路由实现，模拟后台根据不同用户角色返回对应路由，注意观察左侧菜单变化（admin 账号可查看所有菜单、user 账号只可查看部分菜单）'"
			type="success"
			:closable="false"
		/>
		<el-button class="mt20" type="primary" :icon="Promotion" @click="handleToLogin">登录其他账号</el-button>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { useRouter } from "vue-router";
import { LOGIN_URL } from "@/config/config";
import { GlobalStore } from "@/stores";
import { Promotion } from "@element-plus/icons-vue";

const router = useRouter();
const globalStore = GlobalStore();

const handleToLogin = () => {
	globalStore.setToken("");
	router.push(LOGIN_URL);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
