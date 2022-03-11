import { RouteRecordRaw } from "vue-router";
import { Layout, ParentLayout } from "@/router/constant";

// menu模块
const menuRouter: Array<RouteRecordRaw> = [
	{
		path: "/menu",
		component: Layout,
		redirect: "/menu/menu1",
		name: "menu",
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: "菜单嵌套",
			key: "menu"
		},
		children: [
			{
				path: "/menu/menu1",
				name: "menu1",
				component: () => import(/* webpackChunkName: "menu" */ "@/views/menu/menu1/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "菜单1",
					key: "menu1"
				}
			},
			{
				path: "/menu/menu2",
				component: ParentLayout,
				redirect: "/menu/menu2/menu21",
				name: "menu2",
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "菜单2",
					key: "menu2"
				},
				children: [
					{
						path: "/menu/menu2/menu21",
						name: "menu21",
						component: () => import(/* webpackChunkName: "menu21" */ "@/views/menu/menu2/menu21/index.vue"),
						meta: {
							keepAlive: true,
							requiresAuth: true,
							title: "菜单2-1",
							key: "menu21"
						}
					},
					{
						path: "/menu/menu2/menu23",
						name: "menu23",
						component: () => import(/* webpackChunkName: "menu23" */ "@/views/menu/menu2/menu23/index.vue"),
						meta: {
							keepAlive: true,
							requiresAuth: true,
							title: "菜单2-3",
							key: "menu23"
						}
					}
				]
			},
			{
				path: "/menu/menu3",
				name: "menu3",
				component: () => import(/* webpackChunkName: "menu3" */ "@/views/menu/menu3/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "菜单3",
					key: "menu3"
				}
			}
		]
	}
];

export default menuRouter;
