<template>
	<div
		class="menu"
		:style="{ width: isCollapse ? '65px' : '220px' }"
		v-loading="loading"
		element-loading-text="Loading..."
		:element-loading-spinner="loadingSvg"
		element-loading-svg-view-box="-10, -10, 50, 50"
		element-loading-background="rgba(122, 122, 122, 0.01)"
	>
		<Logo :isCollapse="isCollapse" />
		<el-scrollbar>
			<el-menu
				:default-active="activeMenu"
				:router="true"
				:collapse="isCollapse"
				:collapse-transition="false"
				:unique-opened="true"
				background-color="#191a20"
				text-color="#bdbdc0"
				active-text-color="#fff"
			>
				<SubItem :menuList="menuList" />
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MenuStore } from "@/store/modules/menu";
import { AuthStore } from "@/store/modules/auth";
import { getMenuList } from "@/api/modules/login";
import { handleRouter } from "@/utils/util";
import { loadingSvg } from "@/utils/svg";
import Logo from "./components/Logo.vue";
import SubItem from "./components/SubItem.vue";

const route = useRoute();
const menuStore = MenuStore();
const authStore = AuthStore();

// 菜单加载 loading
const loading = ref(false);

onMounted(async () => {
	// 获取菜单列表
	loading.value = true;
	try {
		const res = await getMenuList();
		if (!res.data) return;
		// 把路由菜单处理成一维数组（存储到 pinia 中）
		const dynamicRouter = handleRouter(res.data);
		authStore.setAuthRouter(dynamicRouter);
		menuStore.setMenuList(res.data);
	} finally {
		loading.value = false;
	}
});

const activeMenu = computed((): string => route.path);
const isCollapse = computed((): boolean => menuStore.isCollapse);
const menuList = computed((): Menu.MenuOptions[] => menuStore.menuList);

// aside 自适应
const screenWidth = ref<number>(0);
// 监听窗口大小变化，合并 aside
const listeningWindow = () => {
	window.onresize = () => {
		return (() => {
			screenWidth.value = document.body.clientWidth;
			if (isCollapse.value === false && screenWidth.value < 1200) menuStore.setCollapse();
			if (isCollapse.value === true && screenWidth.value > 1200) menuStore.setCollapse();
		})();
	};
};
listeningWindow();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
