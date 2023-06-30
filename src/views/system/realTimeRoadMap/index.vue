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
const center = reactive([116.322056, 39.89491]);
const marker = shallowRef<AMap.Marker | null>(null);

onMounted(async () => {
  // 实例化地图
  myMap.value = await useAmap("map", {
    zoom: 12,
    center: [center[0], center[1]]
  });
  console.log("地图已创建");
  console.log(myMap);
  addControl();
  getUserPosition();
});

/** 添加地图标记点 */
const addMarker = () => {
  marker.value = new AMap.Marker({
    position: [center[0], center[1]]
  });
  console.log(marker.value);
  (myMap.value as any)?.add(marker.value);
};

const addControl = () => {
  AMap.plugin("AMap.ToolBar", function () {
    //异步加载插件
    let toolbar = new (AMap as any).ToolBar(); // 插件对象
    (myMap as any).value.addControl(toolbar);
  });
};

/** 高德地图获取当前用户位置 */
const getUserPosition = () => {
  console.log("获取位置中...");
  AMap.plugin("AMap.Geolocation", function () {
    //异步加载插件
    const Geolocation = new (AMap as any).Geolocation({
      // 是否使用高精度定位，默认：true
      enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout: 6000,
      // 定位按钮的停靠位置的偏移量
      offset: [10, 20],
      //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      zoomToAccuracy: true,
      //  定位按钮的排放位置,  RB表示右下
      position: "RB"
    });
    Geolocation.getCurrentPosition((status: any, result: any) => {
      if (status == "complete") {
        onComplete(result);
      } else {
        onError(result);
      }
    });
    function onComplete(res: any) {
      console.log(`获取位置成功:`, res);
      let { position } = res;
      center[0] = position.lng;
      center[1] = position.lat;
      console.log(center, "center");
      (myMap as any).value.setCenter(center);
      (myMap as any).value.setZoom(15);
      addMarker();
      getAdd();
    }
    function onError(err: any) {
      console.log(`获取位置失败:`, err);
    }
  });
};

/** 地图加载完成后 （根据经纬度获取地址） */
const getAdd = () => {
  // const AMap = (window as any).AMap;
  const geocoder = new (AMap as any).Geocoder({
    radius: 1000,
    extensions: "all"
  });
  const [lng, lat] = center;
  geocoder.getAddress([lng, lat], function (status: any, result: any) {
    if (status === "complete" && result.info === "OK") {
      console.log(result, "result");
      if (result && result.regeocode) {
        console.log(`result.regeocode.formattedAddress:`, result.regeocode.formattedAddress);
      }
    }
  });
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
