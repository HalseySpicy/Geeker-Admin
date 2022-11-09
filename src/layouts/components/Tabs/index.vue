<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @contextmenu="onContextmenu" @tab-remove="tabRemove">
				<el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
					<template #label>
						<span :page-path="item.path">
							<el-icon class="tabs-icon" v-if="item.icon && themeConfig.tabsIcon">
								<component :is="item.icon"></component>
							</el-icon>
							{{ item.title }}
						</span>
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
import { CustomMouseMenu } from "@howdyjs/mouse-menu";

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

// tab Right Click
const onContextmenu = (e: MouseEvent) => {
	const path = getPagePath(e.target as HTMLElement);
	if (!path) return;
	const menuOptions = {
		menuWrapperCss: {
			background: "#fff",
			boxShadow: "0 0 10px #ccc"
		},
		menuItemCss: {
			hoverBackground: document.documentElement.style.getPropertyValue("--el-color-primary-light-9"),
			hoverLabelColor: document.documentElement.style.getPropertyValue("--el-color-primary"),
			hoverTipsColor: document.documentElement.style.getPropertyValue("--el-color-primary"),
			hoverArrowColor: document.documentElement.style.getPropertyValue("--el-color-primary")
		},
		menuList: [
			{
				label: "关闭左侧",
				tips: "Left",
				fn: (path: any) => tabStore.closeLeftTab(path)
			},
			{
				label: "关闭右侧",
				tips: "Right",
				fn: (path: any) => tabStore.closeRightTab(path)
			},
			{
				label: "关闭其它",
				tips: "All",
				fn: (path: any) => tabStore.closeMultipleTab(path)
			}
		]
	};
	const { x, y } = e;
	const ctx = CustomMouseMenu({
		el: e.currentTarget as HTMLElement,
		params: path,
		...menuOptions
	});
	ctx.show(x, y);
	e.preventDefault();
};

const getPagePath = (target: HTMLElement, depth = 0): any => {
	if (depth > 3) return null;
	const pageKey = target.getAttribute("page-path");
	return pageKey ?? getPagePath(target.parentNode as HTMLElement, ++depth);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
