import { defineStore } from "pinia";
import { GlobalState } from "@/stores/interface";
import { DEFAULT_PRIMARY } from "@/config";
import piniaPersistConfig from "@/config/piniaPersist";

export const useGlobalStore = defineStore({
  id: "geeker-global",
  // 修改默认值之后，需清除 localStorage 数据
  state: (): GlobalState => ({
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: "vertical",
    // element 组件大小
    assemblySize: "default",
    // 当前系统语言
    language: null,
    // 当前页面是否全屏
    maximize: false,
    // 主题颜色
    primary: DEFAULT_PRIMARY,
    // 深色模式
    isDark: false,
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 侧边栏反转 (目前仅支持 'vertical' 模式)
    asideInverted: false,
    // 折叠菜单
    isCollapse: false,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: true,
    // 标签页
    tabs: true,
    // 标签页图标
    tabsIcon: true,
    // 页脚
    footer: true
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(key: keyof GlobalState, val: GlobalState[keyof GlobalState]) {
      this.$patch({ [key]: val });
    }
  },
  persist: piniaPersistConfig("geeker-global")
});
