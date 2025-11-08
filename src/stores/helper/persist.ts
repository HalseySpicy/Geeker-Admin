import { PersistenceOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} pick 需要持久化的 state name
 * @return persist
 * */
const piniaPersistConfig = (key: string, pick?: string[]) => {
  const persist: PersistenceOptions = {
    key,
    storage: localStorage,
    // storage: sessionStorage,
    pick
  };
  return persist;
};

export default piniaPersistConfig;
