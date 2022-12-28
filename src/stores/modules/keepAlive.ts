import { defineStore } from "pinia";
import { keepAliveState } from "@/stores/interface";

// KeepAliveStore
export const KeepAliveStore = defineStore({
	id: "keepAliveStore",
	state: (): keepAliveState => ({
		// 当前缓存的 routerName
		keepAliveName: []
	}),
	actions: {
		// addKeepAliveName
		async addKeepAliveName(name: string) {
			!this.keepAliveName.includes(name) && this.keepAliveName.push(name);
		},
		// removeKeepAliveName
		async removeKeepAliveName(name: string) {
			this.keepAliveName = this.keepAliveName.filter(item => item !== name);
		},
		// setKeepAliveName
		async setKeepAliveName(nameArr: string[] = []) {
			this.keepAliveName = nameArr;
		}
	}
});
