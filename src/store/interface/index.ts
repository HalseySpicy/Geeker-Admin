/* GlobalStore */
export interface GlobalState {
	token: string;
	userInfo: any;
	size: string;
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
