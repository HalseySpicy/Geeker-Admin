import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/constant";

// 超级表格模块
const tableRouter: Array<RouteRecordRaw> = [
	{
		path: "/table",
		component: Layout,
		redirect: "/table/index",
		children: [
			{
				path: "index",
				name: "proTable",
				component: () => import(/* webpackChunkName: "table" */ "@/views/table/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "超级表格",
					key: "table"
				}
			}
		]
	}
];

export default tableRouter;
