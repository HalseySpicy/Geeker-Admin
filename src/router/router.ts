import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import homeRouter from "./modules/home";
import tableRouter from "./modules/table";
import echartsRouter from "./modules/echarts";
import menuRouter from "./modules/menu";
import errorRouter from "./modules/error";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: { name: "login" }
	},
	{
		path: "/login",
		name: "login",
		component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	...homeRouter,
	...tableRouter,
	...echartsRouter,
	...menuRouter,
	...errorRouter,
	{
		// 找不到路由重定向到404页面
		path: "/:pathMatch(.*)",
		redirect: { name: "404" }
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
