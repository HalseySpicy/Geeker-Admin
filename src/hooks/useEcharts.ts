import { onUnmounted } from "vue";
import * as echarts from "echarts";

/**
 * @description 使用Echarts(只是为了添加图表响应式)
 * @param myChart Echarts实例(必传)
 * @param option 绘制Echarts的参数(必传)
 * */
export const useEcharts = (myChart: echarts.ECharts, option: echarts.EChartsCoreOption) => {
	if (option && typeof option === "object") {
		myChart.setOption(option);
	}
	const echartsResize = () => {
		myChart && myChart.resize();
	};

	window.addEventListener("resize", echartsResize, false);

	onUnmounted(() => {
		window.removeEventListener("resize", echartsResize);
	});
};
