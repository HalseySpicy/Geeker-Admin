<template>
	<div class="content-box">
		<div class="top-box">
			<div class="title">数据可视化</div>
			<div class="top-item">
				<el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
				</el-tabs>
			</div>
			<div class="bottom-item">
				<div class="item-left">
					<span>访问总数</span>
					<div>
						<img src="./images/book-sum.png" alt="" />
					</div>
					<span>{{ data.bookSum }}</span>
				</div>
				<div class="item-center">
					<div>
						<div>
							<img src="./images/add_person.png" alt="" />
						</div>
						<span class="item-value">43458</span>
						<span>个人预约量</span>
					</div>
					<div>
						<div>
							<img src="./images/add_team.png" alt="" />
						</div>
						<span class="item-value">43458</span>
						<span>团队预约量</span>
					</div>
					<div>
						<div>
							<img src="./images/today.png" alt="" />
						</div>
						<span class="item-value">43458</span>
						<span>今日预约量</span>
					</div>
					<div>
						<div>
							<img src="./images/book_sum.png" alt="" />
						</div>
						<span class="item-value">43458</span>
						<span>昨日预约量</span>
					</div>
				</div>
				<div class="item-right">
					<div>个人/团队预约占比</div>
					<div class="book-echarts">
						<Pie ref="pie" />
					</div>
				</div>
			</div>
		</div>
		<div class="bottom-box">
			<div class="top-item">
				<el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
				</el-tabs>
			</div>
			<div class="curve-echarts">
				<Curve ref="curve" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="dataVisualize">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import Pie from "./components/pie.vue";
import Curve from "./components/curve.vue";
import { ECharts } from "echarts";
/* 声明echarts实例 */
interface ChartProps {
	[key: string]: ECharts | null;
}
/* 获取子组件的ref */
interface ChartExpose {
	initChart: (params: any) => ECharts;
}
const pie = ref<ChartExpose>();
const curve = ref<ChartExpose>();
const data = reactive({
	activeName: 1,
	bookSum: "999.999"
});
const dataScreen: ChartProps = reactive({
	chart1: null,
	chart2: null
});
const handleClick = (): void => {
	console.log(111);
};

let tab = [
	{ label: "未来7日", name: 1 },
	{ label: "近七日", name: 2 },
	{ label: "近一月", name: 3 },
	{ label: "近三月", name: 4 },
	{ label: "近半年", name: 5 },
	{ label: "近一年", name: 6 }
];
// 模拟数据
let pieData = [
	{ value: 10, name: "个人用户订单" },
	{ value: 90, name: "团体用户订单" }
];
let curveData = [
	{ value: 30, spotName: "茶卡盐湖" },
	{ value: 90, spotName: "东大街" },
	{ value: 10, spotName: "茶卡盐湖" },
	{ value: 70, spotName: "东大街" },
	{ value: 20, spotName: "茶卡盐湖" },
	{ value: 60, spotName: "东大街" },
	{ value: 55, spotName: "东大街" },
	{ value: 80, spotName: "东大街" },
	{ value: 50, spotName: "东大街" }
];

/* 初始化 echarts */
const initCharts = (): void => {
	dataScreen.chart1 = pie.value?.initChart(pieData) as ECharts;
	dataScreen.chart2 = curve.value?.initChart(curveData) as ECharts;
};

onMounted(() => {
	/* 初始化echarts */
	initCharts();
	// 为浏览器绑定事件
	window.addEventListener("resize", resize);
});

/* 浏览器监听 resize 事件 */
const resize = () => {
	// 使用了 scale 的echarts其实不需要需要重新计算缩放比例
	Object.values(dataScreen).forEach(chart => {
		chart && chart.resize();
	});
};

/* 销毁时触发 */
onBeforeUnmount(() => {
	window.removeEventListener("resize", resize);
	// clearInterval(timer);
	// 每次离开页面时，清空echarts实例，不然会出现无法显示的问题
	Object.values(dataScreen).forEach(val => {
		val?.dispose();
	});
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
