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
				<el-dropdown-item @click="closeCurrentTab">
					<el-icon><Remove /></el-icon>{{ $t("tabs.closeCurrent") }}
				</el-dropdown-item>
				<el-dropdown-item @click="closeOtherTab">
					<el-icon><CircleClose /></el-icon>{{ $t("tabs.closeOther") }}
				</el-dropdown-item>
				<el-dropdown-item @click="closeAllTab">
					<el-icon><Delete /></el-icon>{{ $t("tabs.closeAll") }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { TabsStore } from "@/store/modules/tabs";
import { HOME_URL } from "@/config/config";
import { ElMessage } from "element-plus";
const tabStore = TabsStore();

const refresh = () => {
	console.log(tabStore.tabsMenuValue);
	ElMessage({ type: "success", message: "刷新当前页面 🚀" });
};

// Close Current
const closeCurrentTab = () => {
	if (tabStore.tabsMenuValue === HOME_URL) return;
	tabStore.removeTabs(tabStore.tabsMenuValue);
};

// Close Other
const closeOtherTab = () => {
	tabStore.closeMultipleTab(tabStore.tabsMenuValue);
};

// Close All
const closeAllTab = () => {
	tabStore.closeMultipleTab();
	tabStore.goHome();
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
