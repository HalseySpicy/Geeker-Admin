import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 首页模块
const guideRouter: Array<RouteRecordRaw> = [
	{
		path: "/guide",
		component: Layout,
		redirect: "/guide/index",
		children: [
			{
				path: "index",
				name: "guide",
				component: () => import("@/views/guide/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "引导页",
					key: "guide"
				}
			}
		]
	}
];

export default guideRouter;
