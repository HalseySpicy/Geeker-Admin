<template>
  <!-- 中国地图 -->
  <div class="map-ball"></div>
  <div id="mapChart" class="echarts">
    <ECharts :option="option" :resize="false" />
  </div>
</template>

<script setup lang="ts">
import echarts, { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";
import mapJson from "../assets/china.json";

echarts.registerMap("china", mapJson as Parameters<typeof echarts.registerMap>[1]);

const planePath: string =
  "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

const data = [
  {
    fromName: "北京",
    toName: "上海",
    coords: [
      [116.4551, 40.2539],
      [121.4648, 31.2891]
    ]
  },
  {
    fromName: "上海",
    toName: "北京",
    coords: [
      [121.4648, 31.2891],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: "北京",
    toName: "广州",
    coords: [
      [116.4551, 40.2539],
      [113.5107, 23.2196]
    ]
  },
  {
    fromName: "广州",
    toName: "北京",
    coords: [
      [113.5107, 23.2196],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: "北京",
    toName: "成都",
    coords: [
      [116.4551, 40.2539],
      [103.9526, 30.7617]
    ]
  },
  {
    fromName: "成都",
    toName: "北京",
    coords: [
      [103.9526, 30.7617],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: "成都",
    toName: "新疆维吾尔自治区",
    coords: [
      [103.9526, 30.7617],
      [85.294711, 41.371801]
    ]
  },
  {
    fromName: " 新疆维吾尔自治区",
    toName: "成都",
    coords: [
      [85.294711, 41.371801],
      [103.9526, 30.7617]
    ]
  }
];

const option: ECOption = {
  tooltip: {
    trigger: "item"
  },
  grid: {
    left: "0px",
    right: "80px",
    top: "10px",
    bottom: "10px"
  },
  geo: {
    map: "china",
    zoom: 1.5,
    center: [102.848234, 32.82333],
    scaleLimit: {
      min: 0.8
    },
    label: {
      color: "#fff",
      show: true
    },
    emphasis: {
      label: {
        color: "#fff",
        show: true
      },
      itemStyle: {
        areaColor: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#073684" },
            { offset: 1, color: "#2B91B7" }
          ]
        }
      }
    },
    roam: false,
    itemStyle: {
      areaColor: {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: "#073684" },
          { offset: 1, color: "#061E3D" }
        ]
      },
      borderColor: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          { offset: 0, color: "#00F6FF" },
          { offset: 1, color: "#87ADCB" }
        ],
        false
      ),
      shadowColor: "rgba(10,76,139,1)",
      shadowOffsetY: 0,
      shadowBlur: 60,
      borderWidth: 1
    },
    tooltip: {
      show: false
    }
  },
  series: [
    {
      name: "",
      type: "lines",
      coordinateSystem: "geo",
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: "red",
        symbolSize: 3
      },
      lineStyle: {
        color: "#fff",
        width: 0,
        curveness: 0.2
      },
      data
    },
    {
      name: "",
      type: "lines",
      coordinateSystem: "geo",
      zlevel: 2,
      symbol: ["none", "arrow"],
      symbolSize: 10,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: planePath,
        symbolSize: 15
      },
      lineStyle: {
        color: "#fff",
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      data
    }
  ]
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.map-ball {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 900px;
  height: 900px;
  transform: translate(-50%, -50%);
  img {
    width: 500px;
    height: 500px;
  }
}
</style>
