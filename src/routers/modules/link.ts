import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 外部链接模块
const myBlogRouter: Array<RouteRecordRaw> = [
	{
		path: "/link",
		component: Layout,
		redirect: "/link/gitee",
		meta: {
			title: "外部链接"
		},
		children: [
			{
				path: "/link/gitee",
				name: "gitee",
				component: () => import("@/views/link/gitee/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "Gitee 仓库",
					key: "gitee"
				}
			},
			{
				path: "/link/github",
				name: "github",
				component: () => import("@/views/link/github/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "GitHub 仓库",
					key: "github"
				}
			},
			{
				path: "/link/juejin",
				name: "juejin",
				component: () => import("@/views/link/juejin/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "掘金文档",
					key: "juejin"
				}
			},
			{
				path: "/link/myBlog",
				name: "myBlog",
				component: () => import("@/views/link/myBlog/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "个人博客",
					key: "myBlog"
				}
			}
		]
	}
];

export default myBlogRouter;
