<template>
	<div ref="echartsRef" class="card content-box"></div>
</template>

<script setup lang="ts" name="waterChart">
import { ref, onMounted } from "vue";
import { useEcharts } from "@/hooks/useEcharts";
import * as echarts from "echarts";

const echartsRef = ref<HTMLElement>();
onMounted(() => {
	let myChart: echarts.ECharts = echarts.init(echartsRef.value as HTMLElement);
	const data = [
		{
			name: "数据中心人员专题库",

			tooltip: {
				formatter: "{b}: 19999<br />"
			},
			symbol: "circle",
			symbolSize: [40, 40],
			value: [700, 400],
			x: 800,
			y: 400,
			fixed: true,
			// draggable: false,
			category: 1,
			label: {
				color: "#303133",
				position: "bottom"
			},
			rippleEffect: {
				// 涟漪特效相关配置。
				brushType: "stroke" // 波纹的绘制方式，可选 'stroke' 和 'fill'。
			},
			hoverAnimation: true,
			itemStyle: {
				normal: {
					color: "#157eff"
				}
			}
		},
		{
			name: "数据治理服务",
			x: 400,
			y: 400,
			value: [400, 400],
			fixed: true,
			symbol: "circle",
			symbolSize: [35, 35],
			label: {
				color: "#303133",
				position: "bottom"
			},
			category: 1,
			itemStyle: {
				normal: {
					color: "#157eff"
				}
			}
		},
		{
			name: "OSM",
			x: 200,
			y: 200,
			value: [100, 200],

			fixed: true,
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133"
			},
			category: 1,

			itemStyle: {
				normal: {
					color: "#ffb402"
				}
			}
		},
		{
			name: "人员专题库",
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133",
				position: "bottom"
			},
			value: [100, 500],

			x: 200,
			y: 500,
			fixed: true,
			category: 1,
			itemStyle: {
				normal: {
					color: "#157eff"
				}
			}
		},
		{
			name: "人员专题库2",
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133",
				position: "bottom"
			},
			value: [300, 100],

			x: 300,
			y: 200,
			fixed: true,
			category: 2,
			itemStyle: {
				normal: {
					color: "#157eff"
				}
			}
		},
		{
			name: "国家队",
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133",
				position: "bottom"
			},
			x: 1000,
			y: 300,
			value: [1000, 300],

			fixed: true,
			category: 1,
			itemStyle: {
				normal: {
					color: "#157eff"
				}
			}
		},
		{
			name: "社会专家",
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133",
				position: "bottom"
			},
			value: [1000, 100],

			x: 1000,
			y: 100,
			fixed: true,
			category: 2,
			itemStyle: {
				normal: {
					color: "#157eff"
				}
			}
		},
		{
			name: "志愿者",
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133",
				position: "bottom"
			},
			x: 1000,
			y: 200,
			value: [1000, 200],

			fixed: true,
			category: 2,
			itemStyle: {
				normal: {
					// borderColor: "#b457ff",
					// borderWidth: 4,
					// shadowBlur: 10,
					// shadowColor: "#b457ff",
					color: "rgb(255, 197, 61)" // 黄色
				}
			}
		},
		{
			name: "专职队",
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133",
				position: "bottom"
			},
			x: 1000,
			y: 400,
			value: [1000, 400],

			fixed: true,
			itemStyle: {
				normal: {
					color: "#157eff"
				}
			},
			category: 2
		},
		{
			name: "主机",
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133",
				position: "bottom"
			},
			x: 1000,
			y: 600,
			value: [1000, 600],

			fixed: true,
			itemStyle: {
				normal: {
					color: "#157eff"
				}
			},
			category: 2
		},
		{
			name: "自建",
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133",
				position: "bottom"
			},
			x: 600,
			y: 200,
			value: [600, 600],

			fixed: true,

			itemStyle: {
				normal: {
					color: "#157eff"
				}
			},
			category: 2
		},
		{
			name: "组织机构",
			symbol: "circle",
			symbolSize: [30, 30],
			label: {
				color: "#303133",
				position: "bottom"
			},
			value: [1000, 500],

			x: 1000,
			y: 500,
			fixed: true,
			category: 2,
			itemStyle: {
				normal: {
					color: "#157eff"
				}
			}
		}
	];
	let option: echarts.EChartsCoreOption = {
		backgroundColor: "#fff",
		xAxis: {
			show: true,
			type: "value"
		},
		yAxis: {
			show: true,
			type: "value"
		},
		tooltip: {},
		series: [
			{
				type: "graph",
				zlevel: 5,
				draggable: false,
				coordinateSystem: "cartesian2d", // 使用二维的直角坐标系（也称笛卡尔坐标系）
				symbol: "rect",
				// symbolOffset: ['15%', 0],
				label: {
					normal: {
						show: true
					}
				},
				data: data,
				links: [
					{
						source: "数据治理服务",
						target: "数据中心人员专题库"
					},
					{
						source: "OSM",
						target: "数据治理服务",
						symbol: ["none", "arrow"],
						label: {
							show: true,
							formatter: "×",
							padding: [0, 0, -13, 0],
							fontSize: 20
						},
						lineStyle: {
							color: "red"
						}
					},
					{
						source: "人员专题库",
						target: "数据治理服务",
						lineStyle: {
							normal: {
								// color: "#12b5d0",
							}
						}
					},
					{
						source: "数据中心人员专题库",
						target: "社会专家",
						lineStyle: {
							normal: {
								// color: "#12b5d0",
							}
						}
					},

					{
						source: "数据中心人员专题库",
						target: "志愿者",
						lineStyle: {
							normal: {
								// color: "#12b5d0",
							}
						}
					},

					{
						source: "数据中心人员专题库",
						target: "国家队",
						lineStyle: {
							normal: {
								// color: "#12b5d0",
							}
						}
					},

					{
						source: "数据中心人员专题库",
						target: "专职队"
						// lineStyle: {
						//   normal: {
						//     color: "#12b5d0",
						//
						//   }
						// }
					},
					{
						source: "数据中心人员专题库",
						target: "组织机构",
						lineStyle: {
							normal: {
								// color: "#12b5d0",
							}
						}
					},
					{
						source: "数据中心人员专题库",
						target: "主机",
						lineStyle: {
							normal: {
								// color: "#12b5d0",
							}
						}
					},
					{
						source: "自建",
						target: "数据中心人员专题库",
						lineStyle: {
							normal: {
								// color: "#12b5d0",
							}
						}
					},
					{
						source: "数据中心人员专题库",
						target: "人员专题库2",
						lineStyle: {
							normal: {
								// color: "#12b5d0",
							}
						}
					}
				],
				// links: links,

				lineStyle: {
					normal: {
						opacity: 1,
						color: "#53B5EA",
						curveness: 0.2,
						width: 2
					}
				}
			},
			{
				type: "effectScatter",
				coordinateSystem: "cartesian2d",
				data: data, // 2d坐标系
				symbolSize: 0,
				showEffectOn: "render",
				rippleEffect: {
					brushType: "stroke"
				},
				hoverAnimation: true,
				itemStyle: {
					normal: {
						color: "red",
						shadowBlur: 10,
						shadowColor: "#333"
					}
				},
				zlevel: 1
			},
			{
				type: "lines",
				coordinateSystem: "cartesian2d",
				z: 1,
				zlevel: 2,
				animation: false,
				effect: {
					show: true,
					period: 5,
					trailLength: 0.01,
					symbolSize: 12,
					symbol: "arrow",
					loop: true,
					color: "rgba(55,155,255,0.5)"
				},
				lineStyle: {
					normal: {
						color: "#22AC38",
						width: 0,
						curveness: 0.2
					}
				},

				data: [
					{
						coords: [
							[100, 200],
							[200, 300]
						]
					},
					{
						coords: [
							[100, 500],
							[400, 400]
						]
					},
					{
						coords: [
							[400, 400],
							[700, 400]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 100]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 200]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 300]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 400]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 500]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 600]
						]
					},
					{
						coords: [
							[600, 600],
							[700, 400]
						]
					},
					{
						coords: [
							[700, 400],
							[300, 100]
						]
					}
				]
			},
			{
				type: "lines",
				coordinateSystem: "cartesian2d",
				z: 1,
				zlevel: 2,
				animation: false,
				effect: {
					show: true,
					period: 6,
					trailLength: 0.01,
					symbolSize: 12,
					symbol: "arrow",
					loop: true,

					// period: 2.5,
					// trailLength:0,
					// symbolSize: 12,
					// symbol: "circle",
					color: "rgba(55,155,255,0.5)"
				},
				lineStyle: {
					normal: {
						color: "#22AC38",
						width: 0,
						curveness: 0.2
					}
				},

				data: [
					{
						coords: [
							[100, 200],
							[400, 400]
						]
					},
					{
						coords: [
							[100, 500],
							[400, 400]
						]
					},
					{
						coords: [
							[400, 400],
							[700, 400]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 100]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 200]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 300]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 400]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 500]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 600]
						]
					},
					{
						coords: [
							[600, 600],
							[700, 400]
						]
					},
					{
						coords: [
							[700, 400],
							[300, 100]
						]
					}
				]
			},
			{
				type: "lines",
				coordinateSystem: "cartesian2d",
				z: 1,
				zlevel: 2,
				animation: false,

				effect: {
					show: true,
					period: 8,
					trailLength: 0.01,
					symbolSize: 12,
					symbol: "arrow",
					loop: true,

					// period: 2.5,
					// trailLength:0,
					// symbolSize: 12,
					// symbol: "circle",
					color: "rgba(55,155,255,0.5)"
				},
				lineStyle: {
					normal: {
						color: "#22AC38",
						width: 0,
						curveness: 0.2
					}
				},

				data: [
					{
						coords: [
							[100, 200],
							[400, 400]
						]
					},
					{
						coords: [
							[100, 500],
							[400, 400]
						]
					},
					{
						coords: [
							[400, 400],
							[700, 400]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 100]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 200]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 300]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 400]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 500]
						]
					},
					{
						coords: [
							[700, 400],
							[1000, 600]
						]
					},
					{
						coords: [
							[600, 600],
							[700, 400]
						]
					},
					{
						coords: [
							[700, 400],
							[300, 100]
						]
					}
				]
			}
		]
	};
	useEcharts(myChart, option);
});
</script>

<style scoped lang="scss"></style>
