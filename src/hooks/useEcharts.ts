import { onActivated, onDeactivated, onBeforeUnmount, watch } from "vue";
import * as echarts from "echarts";
import { GlobalStore } from "@/stores";

/**
 * @description 使用Echarts(图表响应式、主题色)
 * @param {Element} myChart Echarts实例(必传)
 * @param {Object} options 绘制Echarts的参数(必传)
 * @param {Object} darkOptions 暗黑模式参数，用于覆盖浅色模式
 * @return void
 * */
export const useEcharts = (
	myChart: echarts.ECharts,
	options: echarts.EChartsCoreOption,
	darkOptions?: echarts.EChartsCoreOption
) => {
	const globalStore = GlobalStore();
	const setOption = () => {
		if (!myChart.getOption()) myChart.setOption(options || {});
		if (globalStore.themeConfig.isDark) {
			myChart.setOption({ darkMode: true, ...(darkOptions || {}) });
		} else {
			myChart.setOption({ darkMode: false, ...(options || {}) });
		}
	};
	setOption();
	// 主题色切换
	watch(() => {
		return globalStore.themeConfig.isDark;
	}, setOption);

	// resize节流
	let timer: NodeJS.Timeout | null = null;
	const echartsResize = () => {
		if (timer) {
			return;
		}
		timer = setTimeout(() => {
			myChart && myChart.resize();
			timer = null;
		}, 100);
	};

	// 折叠菜单时
	const aside = document.querySelectorAll("aside.el-aside .menu")[0];
	aside.addEventListener("transitionend", echartsResize);
	// 窗口大小改变时
	window.addEventListener("resize", echartsResize);
	// 显示/隐藏标签栏
	watch(
		() => {
			return globalStore.themeConfig.tabs;
		},
		() => {
			echartsResize();
		}
	);
	// 显示/隐藏页脚
	watch(
		() => {
			return globalStore.themeConfig.footer;
		},
		() => {
			echartsResize();
		}
	);

	onActivated(() => {
		window.addEventListener("resize", echartsResize);
		aside.addEventListener("transitionend", echartsResize);
	});

	onDeactivated(() => {
		window.removeEventListener("resize", echartsResize);
		aside.removeEventListener("transitionend", echartsResize);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("resize", echartsResize);
		aside.removeEventListener("transitionend", echartsResize);
	});
};
