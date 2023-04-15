export type AsideThemeType = "light" | "inverted" | "dark";

export const asideTheme: Record<AsideThemeType, { [key: string]: string }> = {
  light: {
    "--el-logo-text-color": "#303133",
    "--el-menu-bg-color": "#ffffff",
    "--el-menu-hover-bg-color": "#cccccc",
    "--el-menu-active-bg-color": "var(--el-color-primary-light-9)",
    "--el-menu-text-color": "#333333",
    "--el-menu-active-color": "var(--el-color-primary)",
    "--el-menu-hover-text-color": "#333333",
    "--el-menu-horizontal-sub-item-height": "55px"
  },
  inverted: {
    "--el-logo-text-color": "#dadada",
    "--el-menu-bg-color": "#191a20",
    "--el-menu-hover-bg-color": "#000000",
    "--el-menu-active-bg-color": "#000000",
    "--el-menu-text-color": "#bdbdc0",
    "--el-menu-active-color": "#ffffff",
    "--el-menu-hover-text-color": "#ffffff",
    "--el-menu-horizontal-sub-item-height": "55px"
  },
  dark: {
    "--el-logo-text-color": "#dadada",
    "--el-menu-bg-color": "#141414",
    "--el-menu-hover-bg-color": "#000000",
    "--el-menu-active-bg-color": "#000000",
    "--el-menu-text-color": "#bdbdc0",
    "--el-menu-active-color": "#ffffff",
    "--el-menu-hover-text-color": "#ffffff",
    "--el-menu-horizontal-sub-item-height": "55px"
  }
};
