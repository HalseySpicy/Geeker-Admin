<!-- 横向布局 -->
<template>
	<el-container class="layout-transverse">
		<el-header>
			<div class="logo flx-center">
				<img src="@/assets/images/logo.svg" alt="logo" />
				<span>Geeker Admin</span>
			</div>
			<el-menu
				mode="horizontal"
				:default-active="activeMenu"
				:router="false"
				:unique-opened="true"
				background-color="#191a20"
				text-color="#dadada"
				active-text-color="#ffffff"
			>
				<!-- 只有在这里写 submenu 才能触发 menu 三个点省略 -->
				<template v-for="subItem in menuList" :key="subItem.path">
					<el-sub-menu
						v-if="subItem.children && subItem.children.length > 0"
						:index="subItem.path"
						:key="subItem.path + 'el-sub-menu'"
					>
						<template #title>
							<el-icon>
								<component :is="subItem.icon"></component>
							</el-icon>
							<span>{{ subItem.title }}</span>
						</template>
						<SubMenu :menuList="subItem.children" />
					</el-sub-menu>
					<el-menu-item v-else :index="subItem.path" :key="subItem.path + 'el-menu-item'" @click="handleClickMenu(subItem)">
						<el-icon>
							<component :is="subItem.icon"></component>
						</el-icon>
						<template #title>
							<span>{{ subItem.title }}</span>
						</template>
					</el-menu-item>
				</template>
			</el-menu>
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
import { useRouter } from "vue-router";
import cacheRouter from "@/routers/cacheRouter";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
	if (subItem.isLink) window.open(subItem.isLink, "_blank");
	router.push(subItem.path);
};

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
.transverse {
	.el-menu,
	.el-menu--popup {
		.el-menu-item {
			&.is-active {
				background: #060708;
				&::before {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					width: 4px;
					content: "";
					background: var(--el-color-primary);
				}
			}
		}
	}
}
</style>
