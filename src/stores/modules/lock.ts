import { defineStore } from "pinia";
import { useUserStore } from "@/stores/modules/user";
import { LockState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";
import md5 from "md5";
import { loginApi } from "@/api/modules/login";
// import { ElMessage } from "element-plus";

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
      this.lockPassword = lockPassword ? md5(lockPassword) : "";
    },
    // 清除锁屏
    resetLock() {
      this.isLock = false;
      this.lockPassword = "";
    },
    // 解锁
    async unLock(password: string) {
      if (this.lockPassword === md5(password)) {
        this.resetLock();
      } else {
        const userStore = useUserStore();
        const username = userStore?.userInfo?.username;
        const { data } = await loginApi({ username, password: md5(password) });
        userStore.setToken(data.access_token);
        this.resetLock();
      }
    }
  },
  persist: piniaPersistConfig("geeker-lock")
});
