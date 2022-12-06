import { createRouter, createWebHashHistory } from "vue-router";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";
import { LOGIN_URL } from "@/config/config";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { staticRouter, errorRouter } from "@/routers/modules/staticRouter";
import NProgress from "@/config/nprogress";

/**
 * @description 动态路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouter, ...errorRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
	const globalStore = GlobalStore();

	// 1.NProgress 开始
	NProgress.start();

	// 2.如果是访问登陆页，没有 token 直接放行，有 token 就在当前页
	if (to.path === LOGIN_URL) {
		if (!globalStore.token) return next();
		else return next(from.fullPath);
	}

	// 3.判断是否有 Token，没有重定向到 login
	if (!globalStore.token) return next(LOGIN_URL);

	// 4.如果没有菜单列表，就重新请求菜单列表并添加动态路由
	const authStore = AuthStore();
	authStore.setRouteName(to.name as string);
	if (!authStore.authMenuListGet.length) {
		await initDynamicRouter();
		return next({ ...to, replace: true });
	}

	// 5.正常访问页面
	next();
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
	const authStore = AuthStore();
	authStore.flatMenuListGet.forEach(route => {
		const { name } = route;
		if (name && router.hasRoute(name)) router.removeRoute(name);
	});
};

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
	NProgress.done();
	console.warn("路由错误", error.message);
});

export default router;
