<template>
	<!-- 个人/团队预约占比 -->
	<div class="echarts" id="pie"></div>
</template>
<script setup lang="ts" name="pie">
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import { ECharts, init } from "echarts";
const initChart = (data: any): ECharts => {
	const echartsBox = document.getElementById("pie") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	const option = {
		title: {
			text: "Gitee / GitHub",
			subtext: "访问占比",
			left: "56%",
			top: "45%",
			textAlign: "center",
			textStyle: {
				rich: {
					fontSize: 15,
					color: "#38456A",
					fontWeight: 400
				}
			},
			subtextStyle: {
				fontSize: 15,
				color: "#38456A"
			}
		},
		tooltip: {
			trigger: "item"
		},
		legend: {
			top: "4%",
			left: "2%",
			orient: "vertical",
			icon: "circle", //图例形状
			align: "left",
			itemGap: 20,
			textStyle: {
				fontSize: 13,
				color: "#38456A",
				fontWeight: 500
			},
			formatter: function (name: string) {
				let dataCopy = "";
				for (let i = 0; i < data.length; i++) {
					if (data[i].name == name && data[i].value >= 10000) {
						dataCopy = (data[i].value / 10000).toFixed(2);
						return name + "      " + dataCopy + "w";
					} else if (data[i].name == name) {
						dataCopy = data[i].value;
						return name + "      " + dataCopy;
					}
				}
			}
		},
		series: [
			{
				type: "pie",
				radius: ["70%", "40%"],
				center: ["57%", "52%"],
				silent: true,
				clockwise: true,
				startAngle: 150,
				data: data,
				labelLine: {
					length: 80,
					length2: 30,
					lineStyle: {
						width: 1
					}
				},
				label: {
					normal: {
						position: "outside",
						show: true,
						formatter: "{d}%",
						// position: "inner", //标签的位置
						textStyle: {
							fontWeight: 400,
							fontSize: 19,
							color: "#282843" //文字的字体大小
						}
					}
				},
				color: [
					{
						type: "linear",
						x: 0,
						y: 0,
						x2: 0.5,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#feb791" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#fe8b4c" // 100% 处的颜色
							}
						]
					},
					{
						type: "linear",
						x: 0,
						y: 0,
						x2: 1,
						y2: 0.5,
						colorStops: [
							{
								offset: 0,
								color: "#b898fd" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#8347fd" // 100% 处的颜色
							}
						]
					}
				]
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
