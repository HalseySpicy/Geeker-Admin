<!-- 横向布局 -->
<template>
	<el-container>
		<el-header>
			<div class="header-lf">
				<div class="logo flx-center">
					<img src="@/assets/images/logo.svg" alt="logo" />
					<span>Geeker Admin</span>
				</div>
				<el-scrollbar v-if="menuList.length">
					<el-menu
						mode="horizontal"
						:default-active="activeMenu"
						:router="true"
						:unique-opened="true"
						menu-trigger="click"
						background-color="#191a20"
						text-color="#dadada"
						active-text-color="#ffffff"
					>
						<SubMenu :menuList="menuList" />
					</el-menu>
				</el-scrollbar>
			</div>
			<ToolBarRight />
		</el-header>
		<Tabs v-if="themeConfig.tabs" />
		<el-main>
			<router-view v-slot="{ Component }">
				<transition appear name="fade-transform" mode="out-in">
					<keep-alive :include="cacheRouter">
						<component :is="Component" :key="route.path" />
					</keep-alive>
				</transition>
			</router-view>
		</el-main>
		<el-footer v-if="themeConfig.footer">
			<Footer />
		</el-footer>
	</el-container>
</template>

<script setup lang="ts" name="layoutTransverse">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { GlobalStore } from "@/store";
import { MenuStore } from "@/store/modules/menu";
import cacheRouter from "@/routers/cacheRouter";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";

const route = useRoute();
const menuStore = MenuStore();
const globalStore = GlobalStore();
const activeMenu = computed(() => route.path);
const menuList = computed(() => menuStore.menuList);
const themeConfig = computed(() => globalStore.themeConfig);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style lang="scss">
// 横向菜单布局
.el-menu--horizontal {
	.el-menu-item,
	.el-sub-menu {
		height: 54px !important;
		.el-sub-menu__title {
			height: 100%;
		}
	}
}
</style>
