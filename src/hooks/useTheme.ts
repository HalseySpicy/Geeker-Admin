import { computed } from "vue";
import { getLightColor, getDarkColor } from "@/utils/theme/tool";
import { GlobalStore } from "@/stores";
import { DEFAULT_PRIMARY } from "@/config/config";
import { ElMessage } from "element-plus";

/**
 * @description 切换主题
 * */
export const useTheme = () => {
	const globalStore = GlobalStore();
	const themeConfig = computed(() => globalStore.themeConfig);

	// 切换暗黑模式
	const switchDark = () => {
		const body = document.documentElement as HTMLElement;
		if (themeConfig.value.isDark) body.setAttribute("class", "dark");
		else body.setAttribute("class", "");
		changePrimary(themeConfig.value.primary);
	};

	// 修改主题颜色
	const changePrimary = (val: string) => {
		if (!val) {
			val = DEFAULT_PRIMARY;
			ElMessage({ type: "success", message: `主题颜色已重置为 ${DEFAULT_PRIMARY}` });
		}
		globalStore.setThemeConfig({ ...themeConfig.value, primary: val });
		// 为了兼容暗黑模式下主题颜色也正常，以下方法计算主题颜色 由深到浅 的具体颜色
		document.documentElement.style.setProperty("--el-color-primary", themeConfig.value.primary);
		document.documentElement.style.setProperty(
			"--el-color-primary-dark-2",
			themeConfig.value.isDark
				? `${getLightColor(themeConfig.value.primary, 0.2)}`
				: `${getDarkColor(themeConfig.value.primary, 0.3)}`
		);
		// 颜色加深或变浅
		for (let i = 1; i <= 9; i++) {
			document.documentElement.style.setProperty(
				`--el-color-primary-light-${i}`,
				themeConfig.value.isDark
					? `${getDarkColor(themeConfig.value.primary, i / 10)}`
					: `${getLightColor(themeConfig.value.primary, i / 10)}`
			);
		}
	};

	// 灰色和弱色切换
	const changeGreyOrWeak = (value: boolean, type: string) => {
		const body = document.body as HTMLElement;
		if (!value) return body.setAttribute("style", "");
		if (type === "grey") body.setAttribute("style", "filter: grayscale(1)");
		if (type === "weak") body.setAttribute("style", "filter: invert(80%)");
		let propName = type == "grey" ? "isWeak" : "isGrey";
		globalStore.setThemeConfig({ ...themeConfig.value, [propName]: false });
	};

	// 初始化 theme 配置
	const initTheme = () => {
		switchDark();
		changePrimary(themeConfig.value.primary);
		if (themeConfig.value.isGrey) changeGreyOrWeak(true, "grey");
		if (themeConfig.value.isWeak) changeGreyOrWeak(true, "weak");
	};

	return {
		initTheme,
		switchDark,
		changePrimary,
		changeGreyOrWeak
	};
};
