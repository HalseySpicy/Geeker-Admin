<template>
	<!-- Gitee / GitHub 访问量占比 -->
	<div class="echarts" id="curve"></div>
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
const initChart = (data: any): ECharts => {
	const echartsBox = document.getElementById("curve") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	const option = {
		tooltip: {
			trigger: "axis",
			backgroundColor: "transparent",
			axisPointer: {
				type: "none"
			},
			padding: 0,
			formatter: (p: any) => {
				let dom = `<div style="width:100%; height: 70px !important; display:flex;flex-direction: column;justify-content: space-between;padding:10px;box-sizing: border-box;
      color:#fff; background: #6B9DFE;border-radius: 11px;font-size:14px; ">
        <div style="display: flex; align-items: center;"> <div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>平台 :  ${p[0].name}</div>
        <div style="display: flex;align-items: center;"><div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>数据量 :  ${p[0].value}</div>
      </div>`;
				return dom;
			}
		},
		toolbox: {
			show: true,
			orient: "horizontal"
		},
		grid: {
			left: "5%",
			right: "6%"
			// containLabel: true
		},
		dataZoom: [
			{
				show: false,
				height: 10,
				xAxisIndex: [0],
				bottom: 0,
				startValue: 0, //数据窗口范围的起始数值
				endValue: 9, //数据窗口范围的结束数值
				// maxSpan:50,
				// handleIcon:
				//   "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
				// handleSize: "110%",
				handleStyle: {
					color: "#6b9dfe"
				},
				textStyle: {
					color: "transparent"
				}
			},
			{
				type: "inside",
				show: true,
				height: 0,
				// start: 0,
				// end: 100,
				zoomLock: true //控制伸缩
			}
		],
		xAxis: [
			{
				type: "category",
				data: data.map((val: any) => {
					return {
						value: val.spotName
					};
				}),
				axisTick: {
					show: false
				},
				axisLabel: {
					// interval: time > 4 ? 27 : 0,
					margin: 20,
					interval: 0,
					color: "#999",
					fontSize: 14,
					formatter: function (name: string) {
						undefined;
						return name.length > 8 ? name.slice(0, 8) + "..." : name;
					}
				},
				axisLine: {
					lineStyle: {
						color: "#F6F6F7",
						width: 2
					}
				}
			}
		],
		yAxis: [
			{
				name: "数据来源",
				nameTextStyle: {
					color: "#282843",
					fontSize: 18,
					fontWeight: 600,
					padding: [0, 0, 10, 0]
				},
				min: 0,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: true,
					lineStyle: {
						type: "dashed",
						color: "#f8f9fe",
						width: 2
					}
				},
				axisLabel: {
					color: "#D3D3D8",
					fontSize: 16,
					fontWeight: 400,
					formatter: function (value: number) {
						if (value === 0) {
							return value;
						} else if (value >= 10000) {
							return value / 10000 + "w";
						}
						return value;
					}
				}
			}
		],
		series: [
			{
				name: "Direct",
				type: "bar",
				data: data.map((val: any) => {
					return {
						value: val.value
					};
				}),
				barWidth: "45px",
				itemStyle: {
					color: "#C5D8FF",
					borderRadius: [12, 12, 0, 0]
				},
				emphasis: {
					itemStyle: {
						color: "#6B9DFE"
					}
				}
			}
		]
	};
	echarts.setOption(option);
	return echarts;
};
defineExpose({
	initChart
});
</script>
<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 100%;
}
</style>
