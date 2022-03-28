import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/constant";

// 自定义指令模块
const directivesRouter: Array<RouteRecordRaw> = [
	{
		path: "/directives",
		component: Layout,
		redirect: "/directives/copyDirect",
		meta: {
			title: "自定义指令"
		},
		children: [
			{
				path: "/directives/copyDirect",
				name: "copyDirect",
				component: () => import("@/views/directives/copyDirect/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "复制指令",
					key: "copyDirect"
				}
			},
			{
				path: "/directives/dragDirect",
				name: "dragDirect",
				component: () => import("@/views/directives/dragDirect/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "拖拽指令",
					key: "dragDirect"
				}
			},
			{
				path: "/directives/longpressDirect",
				name: "longpressDirect",
				component: () => import("@/views/directives/longpressDirect/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "长按指令",
					key: "longpressDirect"
				}
			}
		]
	}
];

export default directivesRouter;
