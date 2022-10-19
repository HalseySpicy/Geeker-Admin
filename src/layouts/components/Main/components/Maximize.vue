<template>
	<div class="maximize" @click="exitMaximize">
		<el-icon><Close /></el-icon>
	</div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { GlobalStore } from "@/stores";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const exitMaximize = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, maximize: false });
};

// 监听当前页是否全屏，动态添加 class
watch(
	() => themeConfig.value.maximize,
	() => {
		const app = document.getElementById("app") as HTMLElement;
		if (themeConfig.value.maximize) app.classList.add("main-maximize");
		else app.classList.remove("main-maximize");
	},
	{ immediate: true }
);
</script>

<style scoped lang="scss">
.maximize {
	position: fixed;
	top: -25px;
	left: 50%;
	z-index: 999;
	width: 45px;
	height: 45px;
	cursor: pointer;
	background-color: var(--el-color-info-light-3);
	border-radius: 50%;
	opacity: 0.7;
	transform: translateX(-50%);
	&:hover {
		background-color: var(--el-color-info);
	}
	.el-icon {
		position: relative;
		top: 70%;
		left: 50%;
		font-size: 16px;
		color: #ffffff;
		transform: translate(-50%, -50%);
	}
}
</style>
