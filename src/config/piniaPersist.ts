import { PersistOptions } from "pinia-plugin-persist";

// pinia持久化参数配置
const piniaPersistConfig = (key: string) => {
	const persist: PersistOptions = {
		enabled: true,
		strategies: [
			{
				key,
				storage: localStorage
				// storage: sessionStorage
			}
		]
	};
	return persist;
};

export default piniaPersistConfig;
