<template>
  <div class="card content-box">
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts" name="realTimeRoadMap">
import { onMounted, onBeforeUnmount, reactive } from "vue";
import { useAmap } from "@/hooks/useAmap";

const current: any = reactive({
  map: Object
});

onMounted(async () => {
  // 实例化地图
  current.map = await useAmap("map", {
    zoom: 12,
    center: [114.304569, 30.593354]
  });
  console.log("地图已创建");
  console.log(current.map);
});

const destroyMap = () => {
  current.map && current.map.destroy();
  console.log("地图已销毁");
};

onBeforeUnmount(() => {
  destroyMap();
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
