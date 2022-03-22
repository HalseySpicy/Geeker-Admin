import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/constant";

// 个人博客模块
const myBlogRouter: Array<RouteRecordRaw> = [
	{
		path: "/myBlog",
		component: Layout,
		redirect: "/myBlog/index",
		children: [
			{
				path: "index",
				name: "myBlog",
				component: () => import(/* webpackChunkName: "myBlog" */ "@/views/myBlog/index.vue"),
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
