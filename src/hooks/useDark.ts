import { computed, onBeforeMount } from "vue";
import { GlobalStore } from "@/store";

/**
 * @description 切换暗黑模式
 * */
export const useDark = () => {
	const globalStore = GlobalStore();
	const themeConfig = computed(() => globalStore.themeConfig);

	const switchTheme = () => {
		const body = document.documentElement as HTMLElement;
		if (themeConfig.value.isDark) body.setAttribute("class", "dark");
		else body.setAttribute("class", "");
	};

	onBeforeMount(() => {
		switchTheme();
	});

	return {
		switchTheme
	};
};
