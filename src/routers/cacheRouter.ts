import { RouteRecordRaw, RouteRecordName } from "vue-router";
import { routerArray } from "@/routers/router";

// * 过滤需要缓存的路由
let cacheRouter: any[] = [];
const filterKeepAlive = (_route: RouteRecordRaw[], _cache: RouteRecordName[]): void => {
	_route.forEach(item => {
		item.meta?.keepAlive && item.name && _cache.push(item.name);
		item.children && item.children.length !== 0 && filterKeepAlive(item.children, _cache);
	});
};

filterKeepAlive(routerArray, cacheRouter);

export default cacheRouter;
