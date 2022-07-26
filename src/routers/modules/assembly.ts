import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 常用组件模块
const assemblyRouter: Array<RouteRecordRaw> = [
	{
		path: "/assembly",
		component: Layout,
		redirect: "/assembly/guide",
		meta: {
			title: "常用组件"
		},
		children: [
			{
				path: "/assembly/guide",
				name: "guide",
				component: () => import("@/views/assembly/guide/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "引导页",
					key: "guide"
				}
			},
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
				path: "/assembly/uploadImg",
				name: "uploadImg",
				component: () => import("@/views/assembly/uploadImg/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "图片上传",
					key: "uploadImg"
				}
			},
			{
				path: "/assembly/batchImport",
				name: "batchImport",
				component: () => import("@/views/assembly/batchImport/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "批量上传数据",
					key: "batchImport"
				}
			},
			{
				path: "/assembly/wangEditor",
				name: "wangEditor",
				component: () => import("@/views/assembly/wangEditor/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "富文本编辑器",
					key: "wangEditor"
				}
			}
		]
	}
];

export default assemblyRouter;
