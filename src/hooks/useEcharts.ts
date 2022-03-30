import { onUnmounted } from "vue";
import * as echarts from "echarts";

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
