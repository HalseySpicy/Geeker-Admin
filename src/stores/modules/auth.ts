import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { getAuthButtonListApi, getAuthMenuListApi } from "@/api/modules/login";
import { getKeepAliveRouterName, getShowMenuList, getAllBreadcrumbList } from "@/utils/util";
import piniaPersistConfig from "@/config/piniaPersist";

// AuthStore
export const AuthStore = defineStore({
	id: "AuthState",
	state: (): AuthState => ({
		// 按钮权限列表
		authButtonList: {},
		// menuList 作为动态路由，不会做持久化存储
		authMenuList: [],
		// 当前页面的 router name，用来做按钮权限筛选
		routeName: ""
	}),
	getters: {
		// 按钮权限列表
		authButtonListGet: state => state.authButtonList,
		// 后端返回的菜单列表
		authMenuListGet: state => state.authMenuList,
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
		showMenuListGet: state => getShowMenuList(state.authMenuList),
		// 扁平化成一维数组后的菜单列表 ==> 用来添加动态路由
		// flatMenuListGet: state => getFlatArr(state.authMenuList),
		// 面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList),
		// 需要缓存的菜单 name，用作页面 keepAlive
		keepAliveRouterGet: state => getKeepAliveRouterName(state.authMenuList)
	},
	actions: {
		// getAuthButtonList
		async getAuthButtonList() {
			const { data } = await getAuthButtonListApi();
			this.authButtonList = data;
		},
		// getAuthMenuList
		async getAuthMenuList() {
			const { data } = await getAuthMenuListApi();
			this.authMenuList = data;
		},
		// setRouteName
		async setRouteName(name: string) {
			this.routeName = name;
		}
	},
	persist: piniaPersistConfig("AuthState", ["authButtonList", "routeName"])
});
