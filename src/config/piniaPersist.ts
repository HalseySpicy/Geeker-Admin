import { PersistOptions } from "pinia-plugin-persist";

// pinia持久化参数配置
const piniaPersist = (key: string) => {
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

export default piniaPersist;
