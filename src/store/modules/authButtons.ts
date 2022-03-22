import { defineStore } from "pinia";
import { AuthButtonsState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";

// MenuStore
export const AuthButtonsStore = defineStore({
	id: "AuthButtonsState",
	state: (): AuthButtonsState => ({
		// 用户按钮权限列表
		authorButtons: {}
	}),
	getters: {
		// 处理权限按钮数据，用于方便控制按钮
		authorButtonsObj: state => {
			return state.authorButtons;
		}
	},
	actions: {
		async setAuthButtons(authorButtonList: any) {
			this.authorButtons = authorButtonList;
		}
	},
	persist: piniaPersistConfig("AuthButtonsState")
});
