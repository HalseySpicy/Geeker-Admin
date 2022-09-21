<!-- 纵向布局 -->
<template>
	<el-container>
		<el-aside>
			<div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
				<div class="logo flx-center">
					<img src="@/assets/images/logo.svg" alt="logo" />
					<span v-show="!isCollapse">Geeker Admin</span>
				</div>
				<el-scrollbar>
					<el-menu
						:default-active="activeMenu"
						:router="false"
						:collapse="isCollapse"
						:collapse-transition="false"
						:unique-opened="true"
						background-color="#191a20"
						text-color="#bdbdc0"
						active-text-color="#ffffff"
					>
						<SubMenu :menuList="menuList" />
					</el-menu>
				</el-scrollbar>
			</div>
		</el-aside>
		<el-container>
			<el-header>
				<ToolBarLeft />
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
	</el-container>
</template>

<script setup lang="ts" name="layoutCLassic">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { GlobalStore } from "@/store";
import { MenuStore } from "@/store/modules/menu";
import cacheRouter from "@/routers/cacheRouter";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";

const route = useRoute();
const menuStore = MenuStore();
const globalStore = GlobalStore();
const activeMenu = computed(() => route.path);
const menuList = computed(() => menuStore.menuList);
const themeConfig = computed(() => globalStore.themeConfig);
const isCollapse = computed(() => menuStore.isCollapse);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
