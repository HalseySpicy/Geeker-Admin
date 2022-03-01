import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/constant";

// 超级表格模块
const tableRouter: Array<RouteRecordRaw> = [
	{
		path: "/table",
		component: Layout,
		children: [
			{
				path: "index",
				name: "table",
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
