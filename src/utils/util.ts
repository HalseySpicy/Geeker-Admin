import { isArray } from "@/utils/is";

/**
 * @description 获取localStorage
 * @param key Storage名称
 * @returns {String} Storage值
 */
export function localGet(key: string) {
	const value = window.localStorage.getItem(key);
	try {
		return JSON.parse(window.localStorage.getItem(key) as string);
	} catch (error) {
		return value;
	}
}

/**
 * @description 存储localStorage
 * @param key Storage名称
 * @param value Storage值
 */
export function localSet(key: string, value: any) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description 清除localStorage
 * @param key Storage名称
 */
export function localRemove(key: string) {
	window.localStorage.removeItem(key);
}

/**
 * 清除所有localStorage
 * @returns {String}
 */
export function localClear() {
	window.localStorage.clear();
}

/**
 * @description 对象数组深克隆
 * @param obj 源对象
 * @returns {obj} 克隆后的对象
 */
export function deepCopy<T>(obj: any): T {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === "object") {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}

/**
 * @description 判断数据类型
 * @param val 需要判断类型的数据
 * @returns {string} 数据类型
 */
export function isType(val: any) {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 生成随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {number}
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}

/**
 * @description 获取浏览器默认语言
 * @returns {String} 语言
 */
export function getBrowserLang() {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
}

/**
 * @description 递归查询当前路由所对应的tabPane（暂时没用了）
 * @param menuList 菜单列表
 * @param path 当前地址
 * @returns {Array} 当前路由所对应的tabPane
 */
export function getTabPane<T, U>(menuList: any[], path: U): T {
	let result: any;
	for (let item of menuList || []) {
		if (item.path === path) result = item;
		const res = getTabPane(item.children, path);
		if (res) result = res;
	}
	return result;
}

/**
 * 使用递归处理路由菜单
 * @param newArr 所有菜单数组
 */
export function handleRouter(routerList: Menu.MenuOptions[], newArr: string[] = []) {
	routerList.forEach((item: Menu.MenuOptions) => {
		typeof item === "object" && item.path && newArr.push(item.path);
		item.children && item.children.length && handleRouter(item.children, newArr);
	});
	return newArr;
}

/**
 * @description 格式化表格单元格默认值
 * @param row 行
 * @param col 列
 * @param callValue 当前单元格值
 * @return {String} 格式化后的值
 * */
export function defaultFormat(row: number, col: number, callValue: any) {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
	return callValue ?? "--";
}

/**
 * @description 根据枚举列表查询当需要的数据
 * @param callValue 当前单元格值
 * @param enumData 枚举列表
 * @param type 过滤类型（目前只有 tag）
 * @return {String} 格式化后的值
 * */
export function filterEnum(callValue: any, enumData: any[] = [], type?: string): string {
	let filterData = enumData.find(item => item.value === callValue);
	if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
	return filterData ? filterData.label : "--";
}
