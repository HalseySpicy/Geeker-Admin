import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 超级表格模块
const proTableRouter: Array<RouteRecordRaw> = [
	{
		path: "/proTable",
		component: Layout,
		redirect: "/proTable/index",
		children: [
			{
				path: "index",
				name: "proTable",
				component: () => import("@/views/proTable/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "超级表格",
					key: "proTable"
				}
			}
		]
	}
];

export default proTableRouter;
