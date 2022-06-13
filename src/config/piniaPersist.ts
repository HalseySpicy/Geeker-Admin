import { PersistedStateOptions } from "pinia-plugin-persistedstate";

// pinia持久化参数配置
const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		storage: window.localStorage
		// storage: window.sessionStorage,
	};
	return persist;
};

export default piniaPersistConfig;
