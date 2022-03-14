declare module "nprogress";
declare module "js-md5";

// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
	}
}

// * 转化为只读类型
declare interface MyReadonly<T> {
	readonly [K in T]: T[K];
}
