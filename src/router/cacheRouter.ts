import { RouteRecordRaw } from "vue-router";

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.ts");

let routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

console.log(routerArray);

// * 过滤需要缓存的路由
let cacheRouter: any[] = [];
const filterKeepAlive = (_route: RouteRecordRaw[], _cache: any[]): void => {
	_route.forEach(item => {
		if (item.meta?.keepAlive) {
			_cache.push(item.name);
		}
		if (item.children && item.children.length > 0) {
			filterKeepAlive(item.children, _cache);
		}
	});
};
filterKeepAlive(routerArray, cacheRouter);

export default cacheRouter;
