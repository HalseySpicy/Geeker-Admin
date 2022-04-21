import { RouteRecordRaw } from "vue-router";

// 其他页面模块
const otherRouter: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	{
		path: "/dataScreen",
		name: "dataScreen",
		meta: {
			requireAuth: true,
			title: "数据大屏",
			key: "dataScreen"
		},
		component: () => import("@/views/dataScreen/index.vue")
	}
];

export default otherRouter;
