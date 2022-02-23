import { RouteRecordRaw } from "vue-router";
// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
	{
		path: "/home",
		name: "home",
		component: () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: "首页",
			key: "home"
		}
	}
];

export default homeRouter;
