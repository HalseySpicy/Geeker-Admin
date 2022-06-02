import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 常用组件模块
const assemblyRouter: Array<RouteRecordRaw> = [
	{
		path: "/assembly",
		component: Layout,
		redirect: "/assembly/selectIcon",
		meta: {
			title: "常用组件"
		},
		children: [
			{
				path: "/assembly/selectIcon",
				name: "selectIcon",
				component: () => import("@/views/assembly/selectIcon/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "Icon 选择",
					key: "selectIcon"
				}
			},
			{
				path: "/assembly/batchImport",
				name: "batchImport",
				component: () => import("@/views/assembly/batchImport/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "批量导入数据",
					key: "batchImport"
				}
			}
		]
	}
];

export default assemblyRouter;
