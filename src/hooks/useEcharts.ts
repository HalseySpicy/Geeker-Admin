import { onDeactivated, onUnmounted } from "vue";
import * as echarts from "echarts";

export const useEcharts = (myChart: echarts.ECharts, option: echarts.EChartsCoreOption) => {
	if (option && typeof option === "object") {
		myChart.setOption(option);
	}

	window.onresize = () => {
		myChart && myChart.resize();
	};

	onDeactivated(() => {
		window.onresize = null;
	});

	onUnmounted(() => {
		window.onresize = null;
	});
};
