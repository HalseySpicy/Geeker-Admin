import * as echarts from "echarts";
import { onActivated, onDeactivated, onMounted, onUnmounted, reactive, Ref, shallowRef, watch } from "vue";

// 定义一个策略接口 , 方便具体策略实现使用
export interface ChartStrategy {
  getOptions: () => echarts.EChartsOption;
}

// 自定义的 Vue 钩子函数，用于管理 ECharts 实例
export function useECharts(
  chartRef: Ref<HTMLElement | null>, // chartRef 是一个引用，指向包含图表的 DOM 元素
  initOptions: echarts.EChartsOption, // strategy 是一个接口，提供获取图表配置的方法
  theme?: string | object | null, // 可选的 theme 参数，用于设置 ECharts 主题
  opts?: echarts.EChartsInitOpts // 可选的 opts 参数，用于初始化 ECharts 的配置
) {
  // 使用 shallowRef 创建一个响应式引用，用于保存 ECharts 实例
  const instance = shallowRef<echarts.EChartsType | null>(null);

  // 使用 ref 创建一个响应式引用，用于保存图表的配置选项
  const options = reactive<echarts.EChartsOption>(initOptions);

  // 初始化图表实例的函数
  const initEchart = () => {
    // 确保 chartRef 绑定了 DOM 元素且 instance 尚未初始化
    if (chartRef.value && !instance.value) {
      // 初始化 ECharts 实例并赋值给 instance
      instance.value = echarts.init(chartRef.value, theme, opts);
      // 设置图表的初始选项
      instance.value.setOption(options);
    }
  };

  // 更新图表配置选项的函数
  const updateEchartOptions = (newOptions: echarts.EChartsOption) => {
    if (instance.value) {
      // 使用新的选项更新图表，不合并现有选项并延迟更新以优化性能
      instance.value.setOption(newOptions, { notMerge: true, lazyUpdate: true });
    }
  };

  // 处理窗口大小调整的函数，确保图表能够自动调整大小
  const handleResize = () => {
    instance.value?.resize(); // 如果 instance 存在，则调用 resize 方法
  };

  // 销毁图表实例的函数，释放内存并清空引用
  const disposeEchart = () => {
    instance.value?.dispose(); // 调用 ECharts 的 dispose 方法销毁实例
    instance.value = null; // 清空 instance 引用，避免内存泄漏
  };

  // 监听 options 的变化，并在其发生改变时更新图表
  watch(
    () => options,
    () => updateEchartOptions,
    { deep: true }
  );

  // 组件挂载时初始化图表并添加窗口大小调整的事件监听器
  onMounted(() => {
    initEchart(); // 初始化图表
    window.addEventListener("resize", handleResize); // 监听窗口大小变化
  });

  // 组件卸载时移除事件监听器并销毁图表实例
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize); // 移除窗口大小调整的监听器
    disposeEchart(); // 销毁图表实例
  });

  // 组件激活时重新初始化图表并添加事件监听器
  onActivated(() => {
    if (!instance.value) {
      initEchart(); // 如果图表实例不存在，重新初始化
    }
    window.addEventListener("resize", handleResize); // 监听窗口大小变化
  });

  // 组件停用时移除事件监听器并销毁图表实例
  onDeactivated(() => {
    window.removeEventListener("resize", handleResize); // 移除窗口大小调整的监听器
    disposeEchart(); // 销毁图表实例
  });

  // 返回 instance 和相关的控制方法，供外部组件使用
  return {
    instance, // 返回图表实例的引用
    options, // 返回图表配置选项的引用
    initEchart, // 返回初始化图表的方法
    handleResize, // 返回手动触发图表调整大小的方法
    disposeEchart // 返回手动销毁图表实例的方法
  };
}
