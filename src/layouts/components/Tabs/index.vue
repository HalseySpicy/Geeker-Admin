<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
				<el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
					<template #label>
						<el-icon class="tabs-icon" v-if="item.icon && themeConfig.tabsIcon">
							<component :is="item.icon"></component>
						</el-icon>
						{{ item.title }}
					</template>
				</el-tab-pane>
			</el-tabs>
			<MoreButton />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { TabsPaneContext } from "element-plus";
import MoreButton from "./components/MoreButton.vue";

const route = useRoute();
const router = useRouter();
const tabStore = TabsStore();
const globalStore = GlobalStore();

const tabsMenuValue = ref(route.path);
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const themeConfig = computed(() => globalStore.themeConfig);

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
	() => route.path,
	() => {
		tabsMenuValue.value = route.path;
		const tabsParams = {
			icon: route.meta.icon as string,
			title: route.meta.title as string,
			path: route.path,
			close: !route.meta.isAffix
		};
		tabStore.addTabs(tabsParams);
	},
	{
		immediate: true
	}
);

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
	let path = tabItem.props.name as string;
	router.push(path);
};

// Remove Tab
const tabRemove = (activeTabPath: string) => {
	tabStore.removeTabs(activeTabPath, activeTabPath == route.path);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
