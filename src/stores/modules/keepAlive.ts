import { defineStore } from "pinia";
import { keepAliveState } from "@/stores/interface";

// KeepAliveStore
export const KeepAliveStore = defineStore({
	id: "keepAliveStore",
	state: (): keepAliveState => ({
		// 当前缓存的 routerName
		keepLiveName: []
	}),
	getters: {},
	actions: {
		// addKeepLiveName
		async addKeepLiveName(name: string) {
			!this.keepLiveName.includes(name) && this.keepLiveName.push(name);
		},
		// removeKeepLiveName
		async removeKeepLiveName(name: string) {
			this.keepLiveName = this.keepLiveName.filter(item => item !== name);
		},
		// clearMultipleKeepAlive
		async clearMultipleKeepAlive(keepLiveName: string[] = []) {
			this.keepLiveName = keepLiveName;
		}
	}
});
