import { onActivated, onDeactivated, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

/**
 * @description 使用Echarts(只是为了添加图表响应式)
 * @param {Element} myChart Echarts实例(必传)
 * @param {Object} options 绘制Echarts的参数(必传)
 * @return void
 * */
export const useEcharts = (myChart: echarts.ECharts, options: echarts.EChartsCoreOption) => {
	if (options && typeof options === "object") {
		myChart.setOption(options);
	}
	const echartsResize = () => {
		myChart && myChart.resize();
	};

	window.addEventListener("resize", echartsResize);

	onActivated(() => {
		window.addEventListener("resize", echartsResize);
	});

	onDeactivated(() => {
		window.removeEventListener("resize", echartsResize);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("resize", echartsResize);
	});
};
