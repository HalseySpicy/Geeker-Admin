<template>
	<el-dropdown trigger="click">
		<el-button size="small" type="primary">
			<span>更多</span>
			<el-icon class="el-icon--right"><arrow-down /></el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click.native="closeCurrentTab">关闭当前</el-dropdown-item>
				<el-dropdown-item @click.native="closeOtherTab">关闭其他</el-dropdown-item>
				<el-dropdown-item @click.native="closeAllTab">关闭所有</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { TabsStore } from "@/store/modules/tabs";
const tabStore = TabsStore();

// Close Current
const closeCurrentTab = () => {
	if (tabStore.tabsMenuValue === "/home/index") return;
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
