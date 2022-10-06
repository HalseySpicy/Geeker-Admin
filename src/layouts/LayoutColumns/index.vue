<!-- 分栏布局 -->
<template>
	<el-container class="layout-columns">
		<div class="aside-split">
			<div class="logo flx-center">
				<img src="@/assets/images/logo.svg" alt="logo" />
			</div>
			<el-scrollbar>
				<div class="split-list">
					<div
						class="split-item"
						:class="splitActive.includes(item.path) ? 'split-active' : ''"
						v-for="item in menuList"
						:key="item.path"
						@click="changeSubMenu(item)"
					>
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<span class="title">{{ item.title }}</span>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<el-aside>
			<div class="menu" :style="{ width: isCollapse ? '65px' : '200px' }">
				<div class="logo flx-center">
					<span>{{ isCollapse ? "G" : "Geeker Admin" }}</span>
				</div>
				<el-scrollbar>
					<el-menu
						:default-active="activeMenu"
						:router="false"
						:collapse="isCollapse"
						:collapse-transition="false"
						:unique-opened="true"
						background-color="#ffffff"
					>
						<SubMenu :menuList="subMenu" />
					</el-menu>
				</el-scrollbar>
			</div>
		</el-aside>
		<el-container>
			<el-header>
				<ToolBarLeft />
				<ToolBarRight />
			</el-header>
			<Main />
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="layoutColumns">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MenuStore } from "@/store/modules/menu";
import { TABS_WHITE_LIST } from "@/config/config";
import Main from "@/layouts/components/Main/index.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";

const route = useRoute();
const router = useRouter();
const menuStore = MenuStore();
const activeMenu = computed(() => route.path);
const menuList = computed(() => menuStore.menuList);
const isCollapse = computed(() => menuStore.isCollapse);
const watchData = computed(() => [menuList, route]);

const subMenu = ref<Menu.MenuOptions[]>([]);
const splitActive = ref<string>("");
watch(
	() => watchData,
	() => {
		// 当前路由存在 tabs 白名单中 || 当前菜单没有数据直接 return
		if (TABS_WHITE_LIST.includes(route.path) || !menuList.value.length) return;
		splitActive.value = route.path;
		const menuItem = menuList.value.filter((item: Menu.MenuOptions) => route.path.includes(item.path));
		if (menuItem[0].children?.length) return (subMenu.value = menuItem[0].children);
		subMenu.value = [menuItem[0]];
	},
	{
		deep: true,
		immediate: true
	}
);

const changeSubMenu = (item: Menu.MenuOptions) => {
	splitActive.value = item.path;
	if (item.children?.length) return (subMenu.value = item.children);
	subMenu.value = [item];
	router.push({ path: item.path });
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style lang="scss">
.columns {
	.el-menu,
	.el-menu--popup {
		.el-menu-item {
			&.is-active {
				background: var(--el-color-primary-light-9);
				&::before {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					width: 4px;
					content: "";
					background: var(--el-color-primary);
				}
			}
		}
	}
}
</style>
