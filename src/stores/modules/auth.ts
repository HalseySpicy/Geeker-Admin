import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { getFlatArr } from "@/utils/util";
import { getAuthButtonListApi, getAuthMenuListApi } from "@/api/modules/login";
import { getShowMenuList, getAllBreadcrumbList } from "@/utils/util";

// AuthStore
export const AuthStore = defineStore({
	id: "AuthState",
	state: (): AuthState => ({
		// 当前页面的 router name，用来做按钮权限筛选
		routeName: "",
		// 按钮权限列表
		authButtonList: {},
		// 菜单权限列表
		authMenuList: []
	}),
	getters: {
		// 按钮权限列表
		authButtonListGet: state => state.authButtonList,
		// 后端返回的菜单列表 ==> 这里没有经过任何处理
		authMenuListGet: state => state.authMenuList,
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
		showMenuListGet: state => getShowMenuList(state.authMenuList),
		// 扁平化之后的一维数组路由，主要用来添加动态路由
		flatMenuListGet: state => getFlatArr(state.authMenuList),
		// 所有面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
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
	}
});
