/* GlobalStore */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: string;
	language: string;
}

/* MenuStore */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

/* TabsStore */
export interface TabsState {
	tabsMenuValue: string;
	tabsMenuList: Menu.MenuOptions[];
}

export interface AuthButtonsState {
	authorButtons: {
		[propName: string]: any;
	};
}
