import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/constant";

// 超级表格模块
const tableRouter: Array<RouteRecordRaw> = [
	{
		path: "/proTable",
		component: Layout,
		redirect: "/proTable/index",
		children: [
			{
				path: "index",
				name: "proTable",
				component: () => import(/* webpackChunkName: "proTable" */ "@/views/proTable/index.vue"),
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

export default tableRouter;
