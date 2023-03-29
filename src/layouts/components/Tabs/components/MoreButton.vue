<template>
	<el-dropdown trigger="click" :teleported="false">
		<el-button size="small" type="primary">
			<span>{{ $t("tabs.more") }}</span>
			<el-icon class="el-icon--right"><arrow-down /></el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="openDrawer">
					<i :class="'iconfont icon-zhuti'" class="toolBar-icon"></i>
				</el-dropdown-item>
				<el-dropdown-item @click="refresh">
					<el-icon><Refresh /></el-icon>{{ $t("tabs.refresh") }}
				</el-dropdown-item>
				<el-dropdown-item @click="logout" divided>
					<el-icon><SwitchButton /></el-icon>{{ $t("header.logout") }}
				</el-dropdown-item>
				<!-- <el-dropdown-item @click="maximize">
					<el-icon><FullScreen /></el-icon>{{ $t("tabs.maximize") }}
				</el-dropdown-item>
				<el-dropdown-item divided @click="closeCurrentTab">
					<el-icon><Remove /></el-icon>{{ $t("tabs.closeCurrent") }}
				</el-dropdown-item>
				<el-dropdown-item @click="closeOtherTab">
					<el-icon><CircleClose /></el-icon>{{ $t("tabs.closeOther") }}
				</el-dropdown-item>
				<el-dropdown-item @click="closeAllTab">
					<el-icon><FolderDelete /></el-icon>{{ $t("tabs.closeAll") }}
				</el-dropdown-item> -->
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
// import { computed, inject, nextTick } from "vue";
import { inject, nextTick } from "vue";
// import { HOME_URL } from "@/config/config";
import { GlobalStore } from "@/stores";
// import { TabsStore } from "@/stores/modules/tabs";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import { useRoute, useRouter } from "vue-router";
import { logoutApi } from "@/api/modules/login";
import { ElMessageBox, ElMessage } from "element-plus";
import { LOGIN_URL } from "@/config/config";

import mittBus from "@/utils/mittBus";
const openDrawer = () => {
	mittBus.emit("openThemeDrawer");
};

// import ThemeSetting from "./ThemeSetting.vue";

const route = useRoute();
// const router = useRouter();
// const tabStore = TabsStore();
// const globalStore = GlobalStore();
const keepAliveStore = KeepAliveStore();
// const themeConfig = computed(() => globalStore.themeConfig);

const refreshCurrentPage: Function = inject("refresh") as Function;
// refresh current page
const refresh = () => {
	setTimeout(() => {
		keepAliveStore.removeKeepAliveName(route.name as string);
		refreshCurrentPage(false);
		nextTick(() => {
			keepAliveStore.addKeepAliveName(route.name as string);
			refreshCurrentPage(true);
		});
	}, 0);
};

// 退出登录
const globalStore = GlobalStore();
const router = useRouter();
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(async () => {
		// 1.调用退出登录接口
		await logoutApi();
		// 2.清除 Token
		globalStore.setToken("");
		// 3.重定向到登陆页
		router.replace(LOGIN_URL);
		ElMessage.success("退出登录成功！");
	});
};

// maximize current page
// const maximize = () => {
// 	globalStore.setThemeConfig({ ...themeConfig.value, maximize: true });
// };

// // Close Current
// const closeCurrentTab = () => {
// 	if (route.meta.isAffix) return;
// 	tabStore.removeTabs(route.fullPath);
// 	keepAliveStore.removeKeepAliveName(route.name as string);
// };

// Close Other
// const closeOtherTab = () => {
// 	tabStore.closeMultipleTab(route.fullPath);
// 	keepAliveStore.setKeepAliveName([route.name] as string[]);
// };

// // Close All
// const closeAllTab = () => {
// 	tabStore.closeMultipleTab();
// 	keepAliveStore.setKeepAliveName();
// 	router.push(HOME_URL);
// };
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
