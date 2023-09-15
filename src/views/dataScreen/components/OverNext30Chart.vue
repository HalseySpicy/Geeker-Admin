<template>
  <!-- 未来30天访问量趋势预测图 -->
  <div class="echarts">
    <ECharts :option="option" :resize="false" />
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import ECharts from "@/components/ECharts/index.vue";
import { ECOption } from "@/components/ECharts/config";
import { randomNum } from "@/utils";

const initDate = (): string[] => {
  const dateList: string[] = [];
  let startDate = dayjs();
  const endDate = startDate.add(30, "day");
  while (startDate.isBefore(endDate)) {
    const month = startDate.format("MM");
    const day = startDate.format("DD");
    dateList.push(`${month}/${day}`);
    startDate = startDate.add(1, "day");
  }
  return dateList;
};

const data = {
  unit: ["访问量"],
  data: new Array(31).fill("").map(val => {
    val = randomNum(1, 200000);
    return val;
  })
};

const option: ECOption = {
  tooltip: {
    trigger: "axis",
    confine: true,
    formatter: params => {
      let tipData = (params as { name: string; value: string }[])[0];
      let html = `<div class="line-chart-bg">
                        <span style="">${tipData.name} <i >${tipData.value}</i> 人次访问</span>
                    </div>`;
      return html;
    },
    backgroundColor: "transparent",
    borderColor: "transparent",
    axisPointer: { lineStyle: { type: "dashed" }, snap: true },
    extraCssText: "box-shadow: none;padding:0"
  },
  grid: {
    top: "15%",
    left: "5%",
    right: "5%",
    bottom: "15%"
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLine: {
        show: true,
        symbol: ["none", "arrow"],
        symbolOffset: [0, 30],
        lineStyle: {
          color: "#233653",
          shadowOffsetX: 20,
          shadowColor: "#233653"
        }
      },
      axisLabel: {
        color: "#7ec7ff",
        padding: 0,
        fontSize: 12,
        formatter: function (data) {
          return data;
        }
      },
      splitLine: { show: false, lineStyle: { color: "#192a44" } },
      axisTick: { show: false },
      data: initDate()
    }
  ],
  yAxis: data.unit.map((_val: string, index: number) => {
    return {
      name: "(访问量)",
      nameTextStyle: {
        color: "#7ec7ff",
        fontSize: 12,
        padding: [0, 30, -4, 0]
      },
      minInterval: 1,
      splitLine: {
        show: false,
        lineStyle: {
          color: "#192a44"
        }
      },
      axisLine: {
        show: index === 0 ? true : false,
        lineStyle: {
          color: "#233653"
        }
      },
      axisLabel: {
        show: true,
        color: "#7ec7ff",
        padding: 0,
        formatter: function (value: string) {
          if (Number(value) >= 10000) {
            value = Number(value) / 10000 + "w";
          }
          return value;
        }
      },
      axisTick: {
        show: false
      }
    };
  }),
  series: data.data.map(() => {
    return {
      name: "",
      type: "line",
      symbol: "circle",
      showSymbol: false,
      smooth: true,
      lineStyle: {
        width: 1,
        color: "#707070",
        borderColor: "#707070"
      },
      itemStyle: {
        color: "#F5B348",
        shadowColor: "rgba(245, 179, 72, 0.3)",
        shadowBlur: 3
      },
      emphasis: {
        scale: true
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#846B38" },
            { offset: 0.5, color: "#403E47" },
            { offset: 1, color: "#11144E" }
          ],
          global: false
        },
        shadowColor: "rgba(255, 199, 37, 0)",
        shadowBlur: 20
      },
      data: data.data
    };
  })
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  :deep(.line-chart-bg) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 180px;
    height: 60px;
    padding-left: 20px;
    background: url("../images/line-bg.png") no-repeat;
    background-size: 100% 100%;
    span {
      font-size: 12px;
      color: rgb(255 255 255 / 80%);
      i {
        font-style: normal;
        color: #f5b348;
      }
    }
  }
}
</style>
