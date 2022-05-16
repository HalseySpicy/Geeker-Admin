import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 超级表格模块
const proTableRouter: Array<RouteRecordRaw> = [
	{
		path: "/proTable",
		component: Layout,
		redirect: "/proTable/useComponent",
		meta: {
			title: "超级表格"
		},
		children: [
			{
				path: "/proTable/useComponent",
				name: "useComponent",
				component: () => import("@/views/proTable/useComponent/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用 Component",
					key: "useComponent"
				}
			}
		]
	}
];

export default proTableRouter;
