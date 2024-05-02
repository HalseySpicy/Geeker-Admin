import { defineStore } from "pinia";
import { LockState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";
import md5 from "md5";

export const useLockStore = defineStore({
  id: "geeker-lock",
  state: (): LockState => ({
    isLock: false,
    lockPassword: ""
  }),
  getters: {
    // 是否锁屏
    isLockGet: state => state.isLock
  },
  actions: {
    // 设置锁屏
    setLock(lockPassword: string) {
      this.isLock = true;
      this.lockPassword = md5(lockPassword);
    },
    // 清除锁屏
    resetLock() {
      this.isLock = false;
      this.lockPassword = "";
    },
    // 解锁
    async unLock(password: string) {
      if (this.lockPassword === md5(password)) {
        return true;
      } else {
        return false;
      }
    }
  },
  persist: piniaPersistConfig("geeker-lock")
});
