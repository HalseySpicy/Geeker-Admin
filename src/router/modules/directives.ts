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
			}
		]
	}
];

export default directivesRouter;
