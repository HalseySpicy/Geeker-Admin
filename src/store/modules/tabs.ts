import { defineStore } from "pinia";
import piniaPersist from "@/config/piniaPersist";
import router from "@/router/index";
import { deepCopy } from "@/utils/util";
import { TabPaneProps } from "element-plus";

interface TabsState {
	tabsMenuValue: string;
	tabsMenuList: Menu.MenuOptions[];
}

export const TabsStore = defineStore({
	id: "TabsState",
	state: (): TabsState => ({
		tabsMenuValue: "/home/index",
		tabsMenuList: [{ title: "首页", path: "/home/index", icon: "home-filled", close: false }]
	}),
	getters: {},
	actions: {
		// Add Tabs
		async addTabs(tabItem: Menu.MenuOptions) {
			// not add tabs whiteList
			let whiteList = ["/403", "/404", "/500", "/layout", "/login"];
			if (whiteList.includes(tabItem.path)) return;
			const tabInfo: Menu.MenuOptions = {
				title: tabItem.title,
				path: tabItem.path,
				close: tabItem.close
			};
			let flag = false;
			this.tabsMenuList.forEach(item => {
				if (item.title === tabItem.title) flag = true;
			});
			if (flag) {
				router.push(tabItem.path);
				this.setTabsMenuValue(tabItem.path);
			} else {
				const newTabsMenuList = deepCopy<Menu.MenuOptions[]>(this.tabsMenuList);
				newTabsMenuList.push(tabInfo);
				this.tabsMenuList = newTabsMenuList;
				this.tabsMenuValue = tabItem.path;
				router.push(tabItem.path);
			}
			flag = false;
		},
		// Remove Tabs
		async removeTabs(tabPath: string) {
			let tabsMenuValue = this.tabsMenuValue;
			const tabsMenuList = this.tabsMenuList;
			if (tabsMenuValue === tabPath) {
				tabsMenuList.forEach((item, index) => {
					if (item.path === tabPath) {
						const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
						if (nextTab) {
							tabsMenuValue = nextTab.path;
							router.push(nextTab.path);
						}
					}
				});
			}
			this.tabsMenuValue = tabsMenuValue;
			this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath);
		},
		// Change Tabs
		async changeTabs(tabItem: TabPaneProps) {
			this.tabsMenuList.forEach(item => {
				if (item.title === tabItem.label) router.push(item.path);
			});
		},
		// Set TabsMenuValue
		async setTabsMenuValue(tabsMenuValue: string) {
			this.tabsMenuValue = tabsMenuValue;
		},
		// Set TabsMenuList
		async setTabsMenuList(tabsMenuList: Menu.MenuOptions[]) {
			this.tabsMenuList = tabsMenuList;
		},
		// Close MultipleTab
		async closeMultipleTab(tabsMenuValue?: string) {
			this.tabsMenuList = this.tabsMenuList.filter(item => {
				return item.path === tabsMenuValue || item.path === "/home/index";
			});
		},
		// Go Home
		async goHome() {
			router.push("/home/index");
			this.tabsMenuValue = "/home/index";
		}
	},
	persist: piniaPersist("TabsState")
});
