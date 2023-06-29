<template>
  <div class="card content-box">
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts" name="realTimeRoadMap">
import { onMounted, onBeforeUnmount, shallowRef, reactive } from "vue";
import { useAmap } from "@/hooks/useAmap";

/** 地图实例    （shallowRef：如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换） */
const myMap = shallowRef<AMap.Map | null>(null);
const center = reactive([114.304569, 30.593354]);
const marker = shallowRef<AMap.Marker | null>(null);

onMounted(async () => {
  // 实例化地图
  myMap.value = await useAmap("map", {
    zoom: 12,
    center: [center[0], center[1]]
  });
  console.log("地图已创建");
  console.log(myMap);
  addMarker();
});

/** 添加地图标记点 */
const addMarker = () => {
  marker.value = new AMap.Marker({
    position: [center[0], center[1]]
  });
  console.log(marker.value);
  (myMap.value as any)?.add(marker.value);
};

const destroyMap = () => {
  myMap.value && myMap.value.destroy();
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
