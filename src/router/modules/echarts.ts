import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/constant";

// echarts模块
const echartsRouter: Array<RouteRecordRaw> = [
	{
		path: "/echarts",
		component: Layout,
		redirect: "/echarts/columnChart",
		name: "echarts",
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: "Echarts",
			key: "echarts"
		},
		children: [
			{
				path: "/echarts/columnChart",
				name: "columnChart",
				component: () => import(/* webpackChunkName: "columnChart" */ "@/views/echarts/columnChart/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "柱状图",
					key: "columnChart"
				}
			},
			{
				path: "/echarts/lineChart",
				name: "lineChart",
				component: () => import(/* webpackChunkName: "lineChart" */ "@/views/echarts/lineChart/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "折线图",
					key: "lineChart"
				}
			},
			{
				path: "/echarts/pieChart",
				name: "pieChart",
				component: () => import(/* webpackChunkName: "pieChart" */ "@/views/echarts/pieChart/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "饼图",
					key: "pieChart"
				}
			},
			{
				path: "/echarts/radarChart",
				name: "radarChart",
				component: () => import(/* webpackChunkName: "radarChart" */ "@/views/echarts/radarChart/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "雷达图",
					key: "radarChart"
				}
			},
			{
				path: "/echarts/nestedChart",
				name: "nestedChart",
				component: () => import(/* webpackChunkName: "nestedChart" */ "@/views/echarts/nestedChart/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "嵌套环形图",
					key: "nestedChart"
				}
			}
		]
	}
];

export default echartsRouter;
