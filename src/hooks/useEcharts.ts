import { onDeactivated, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

/**
 * @description 使用 Echarts (只是为了添加图表响应式)
 * @param {Element} myChart Echarts实例 (必传)
 * @param {Object} options 绘制Echarts的参数 (必传)
 * */
export const useEcharts = (myChart: echarts.ECharts, options: echarts.EChartsCoreOption) => {
  if (options && typeof options === "object") {
    myChart.setOption(options);
  }
  const echartsResize = () => {
    myChart && myChart.resize();
  };

  window.addEventListener("resize", echartsResize);

  // 防止 echarts 页面 keepAlive 时，还在继续监听页面
  onDeactivated(() => {
    window.removeEventListener("resize", echartsResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", echartsResize);
  });
};
