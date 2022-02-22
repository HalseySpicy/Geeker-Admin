import { defineStore } from "pinia";
import piniaPersist from "@/config/piniaPersist";

// MenuStore
export const MenuStore = defineStore({
  id: "MenuState",
  state: () => ({
    // menu collapse
    isCollapse: false
  }),
  getters: {},
  actions: {
    async setCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  persist: piniaPersist("MenuState")
});
