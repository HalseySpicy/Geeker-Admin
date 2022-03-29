<template>
	<div ref="echartsRef" class="content-box"></div>
</template>

<script setup lang="ts" name="columnChart">
import { ref, onMounted } from "vue";
import { useEcharts } from "@/hooks/useEcharts";
import * as echarts from "echarts";
import "echarts-liquidfill";

const echartsRef = ref<HTMLElement>();
onMounted(() => {
	let myChart: echarts.ECharts = echarts.init(echartsRef.value as HTMLElement);
	let value = 0.45;
	let value1 = 0.58;
	let option: echarts.EChartsCoreOption = {
		backgroundColor: "#0F224C",
		series: [
			{
				type: "liquidFill",
				radius: "47%",
				center: ["27%", "48%"],
				color: [
					{
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#446bf5"
							},
							{
								offset: 1,
								color: "#2ca3e2"
							}
						],
						globalCoord: false
					}
				],
				data: [value, value, value, value], // data个数代表波浪数
				backgroundStyle: {
					borderWidth: 1,
					color: "RGBA(51, 66, 127, 0.7)"
				},
				label: {
					fontSize: 40,
					color: "#fff"
				},
				outline: {
					borderDistance: 0,
					itemStyle: {
						borderWidth: 2,
						borderColor: "#112165"
					}
				}
			},
			{
				//第二个球的填充
				type: "liquidFill",
				radius: "47%",
				center: ["73%", "48%"],
				color: [
					{
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#2aa1e3"
							},
							{
								offset: 1,
								color: "#08bbc9"
							}
						],
						globalCoord: false
					}
				],
				data: [value1, value1, value1], // data个数代表波浪数
				backgroundStyle: {
					borderWidth: 1,
					color: "RGBA(51, 66, 127, 0.7)"
				},
				label: {
					fontSize: 40,
					color: "#fff"
				},
				outline: {
					borderDistance: 0,
					itemStyle: {
						borderWidth: 2,
						borderColor: "#112165"
					}
				}
			}
		]
	};
	useEcharts(myChart, option);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
