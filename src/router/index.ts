import router from "./router";
import NProgress from "@/config/nprogress";
import { HOME_URL } from "@/config/config";
import { MenuStore } from "@/store/modules/menu";
import { GlobalStore } from "@/store";
import { AxiosCanceler } from "@/api/helper/axiosCancel";

const axiosCanceler = new AxiosCanceler();

/**
 * 使用递归处理路由菜单
 * @param newArr 所有菜单数组
 */
export function handleRouter(routerList: Menu.MenuOptions[], newArr: string[] = []) {
	routerList.forEach((item: Menu.MenuOptions) => {
		typeof item === "object" && item.path && newArr.push(item.path);
		item.children && item.children.length !== 0 && handleRouter(item.children, newArr);
	});
	return newArr;
}

// * 路由拦截
router.beforeEach((to, from, next) => {
	NProgress.start();
	// * 在跳转路由之前，清除所有的请求
	axiosCanceler.removeAllPending();

	// * 判断当前路由是否需要访问权限
	if (!to.matched.some(record => record.meta.requiresAuth)) return next();

	// * 判断是否有Token
	const globalStore = GlobalStore();
	if (!globalStore.token) {
		next({
			path: "/login"
		});
		NProgress.done();
		return;
	}

	let menuStore = MenuStore();
	let dynamicRouter = handleRouter(menuStore.menuList);
	// * Static Router(静态路由，必须配置首页地址)
	let staticRouter = [HOME_URL, "/403"];
	let routerList = dynamicRouter.concat(staticRouter);
	console.log(routerList);

	// * 如果访问的地址没有在路由表中重定向到403页面
	if (routerList.indexOf(to.path) === -1) {
		next({
			path: "/403"
		});
	} else {
		next();
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
