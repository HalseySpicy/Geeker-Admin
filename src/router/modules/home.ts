import { RouteRecordRaw } from "vue-router";
// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
    meta: {
      keepAlive: true,
      requiresAuth: true,
      parentTitle: "首页",
      title: "",
      key: "home"
    }
  }
];

export default homeRouter;
