<template>
	<div class="layout-search-dialog">
		<el-tooltip effect="dark" content="菜单搜索" placement="bottom" :show-after="200">
			<i @click="handleOpen" :class="'iconfont icon-sousuo'" class="icon-style"></i>
		</el-tooltip>
		<el-dialog v-model="isShowSearch" width="300px" destroy-on-close :modal="false" fullscreen :show-close="false">
			<el-autocomplete
				v-model="searchMenu"
				:fetch-suggestions="searchMenuList"
				ref="menuInputRef"
				placeholder="菜单搜索 ：支持菜单名称、路径"
				@select="handleClickMenu"
				@blur="closeSearch"
			>
				<template #prefix>
					<el-icon>
						<Search />
					</el-icon>
				</template>
				<template #default="{ item }">
					<el-icon>
						<component :is="item.icon"></component>
					</el-icon>
					<span> {{ item.title }} </span>
				</template>
			</el-autocomplete>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { getFlatArr } from "@/utils/util";
import { MenuStore } from "@/store/modules/menu";
const router = useRouter();
const menuStore = MenuStore();
const menuList = computed((): Menu.MenuOptions[] => getFlatArr(menuStore.menuList));

const searchMenuList = (queryString: string, cb: Function) => {
	const results = queryString ? menuList.value.filter(filterNodeMethod(queryString)) : menuList.value;
	cb(results);
};

// 打开搜索菜单
const isShowSearch = ref(false);
const menuInputRef = ref();
const searchMenu = ref("");
const handleOpen = () => {
	isShowSearch.value = true;
	searchMenu.value = "";
	nextTick(() => {
		setTimeout(() => {
			menuInputRef.value.focus();
		});
	});
};

// 搜索窗关闭
const closeSearch = () => {
	isShowSearch.value = false;
};

// 筛选菜单
const filterNodeMethod = (queryString: string) => {
	return (restaurant: Menu.MenuOptions) => {
		return (
			restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
			restaurant.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
		);
	};
};

// 点击菜单跳转
const handleClickMenu = (menuItem: Menu.MenuOptions) => {
	searchMenu.value = "";
	if (menuItem.isLink) window.open(menuItem.isLink, "_blank");
	router.push(menuItem.path);
	closeSearch();
};
</script>

<style scoped lang="scss">
@import "../index.scss";

/* 菜单搜索样式 */
.layout-search-dialog {
	:deep(.el-dialog) {
		background: rgb(0 0 0 / 50%);
		border-radius: 0 !important;
		box-shadow: unset !important;
		.el-dialog__header {
			border-bottom: none !important;
		}
	}
	:deep(.el-autocomplete) {
		position: absolute;
		top: 100px;
		left: 50%;
		width: 560px;
		transform: translateX(-50%);
	}
}
.el-autocomplete__popper {
	.el-icon {
		position: relative;
		top: 2px;
		font-size: 16px;
	}
	span {
		margin: 0 0 0 10px;
		font-size: 14px;
	}
}
</style>
