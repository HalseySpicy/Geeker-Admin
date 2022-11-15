<template>
	<Maximize v-if="themeConfig.maximize" />
	<Tabs v-if="themeConfig.tabs" />
	<el-main>
		<router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="authStore.keepAliveRouterGet" v-if="isRouterRefresh">
					<component :is="Component" :key="route.path" />
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
	<el-footer v-if="themeConfig.footer">
		<Footer />
	</el-footer>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, provide, onBeforeUnmount } from "vue";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";
import Maximize from "./components/Maximize.vue";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";

const authStore = AuthStore();
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);

// 刷新当前页面
const isRouterRefresh = ref(true);
const refreshCurrentPage = () => {
	isRouterRefresh.value = false;
	nextTick(function () {
		isRouterRefresh.value = true;
	});
};
provide("refresh", refreshCurrentPage);

// 监听窗口大小变化，折叠侧边栏 && 隐藏面包屑导航
const screenWidth = ref<number>(0);
const listeningWindow = () => {
	screenWidth.value = document.body.clientWidth;
	if (!isCollapse.value && screenWidth.value < 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: true });
	if (isCollapse.value && screenWidth.value > 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: false });
};
window.addEventListener("resize", listeningWindow);
onBeforeUnmount(() => {
	window.removeEventListener("resize", listeningWindow);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
