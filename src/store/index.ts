import { defineStore } from "pinia";
import { GlobalState } from "./interface";
import piniaPersist from "@/config/piniaPersist";
// import * as types from "./mutation-types";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: (): GlobalState => ({
		token: "",
		userInfo: "",
		// element组件大小
		size: "default"
	}),
	getters: {},
	actions: {
		// set token
		setToken(token: string) {
			this.token = token;
		},
		// set userInfo
		setUserInfo(userInfo: any) {
			this.userInfo = userInfo;
		},
		// set AssemblySize
		setSize(size: string) {
			this.size = size;
		}
	},
	persist: piniaPersist("GlobalState")
});
