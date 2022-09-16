/* themeConfigProp */
export interface ThemeConfigProp {
	layout: string;
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isWeak: boolean;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: string;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

/* TabsState */
export interface TabsState {
	tabsMenuValue: string;
	tabsMenuList: TabsOptions[];
}

/* AuthState */
export interface AuthState {
	authButtons: {
		[key: string]: any;
	};
	authRouter: string[];
}
