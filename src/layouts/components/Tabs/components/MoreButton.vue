<template>
	<el-dropdown trigger="click">
		<el-button size="small" type="primary">
			<span>{{ $t("tabs.more") }}</span>
			<el-icon class="el-icon--right"><arrow-down /></el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="refresh">
					<el-icon><Refresh /></el-icon>{{ $t("tabs.refresh") }}
				</el-dropdown-item>
				<el-dropdown-item @click="maximize">
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
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { ElMessage } from "element-plus";
import { HOME_URL } from "@/config/config";
import { GlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const tabStore = TabsStore();
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const reload: Function = inject("refresh") as Function;

// refresh current page
const refresh = () => {
	ElMessage({ type: "success", message: "刷新当前页面 🚀" });
	reload();
};

// maximize current page
const maximize = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, maximize: true });
};

// Close Current
const closeCurrentTab = () => {
	if (route.meta.isAffix) return;
	tabStore.removeTabs(route.path);
};

// Close Other
const closeOtherTab = () => {
	tabStore.closeMultipleTab(route.path);
};

// Close All
const closeAllTab = () => {
	tabStore.closeMultipleTab();
	router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
