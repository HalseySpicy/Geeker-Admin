import { AMAP_MAP_KEY } from "@/config/index";
import AMapLoader from "@amap/amap-jsapi-loader";

/**
 * @description 使用 高德地图 (只是为了添加图表响应式)
 * @param {Element} id 实例化dom元素的id (必传)
 * @param {Object} options 绘制map的参数 (必传)
 * */

interface AmapOption {
  zoom?: Number;
  center?: Array<number> | Object;
}

export const useAmap = (id: string, options: AmapOption) => {
  return new Promise((resolve, reject) => {
    const key = AMAP_MAP_KEY;
    AMapLoader.load({
      key: key, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: "1.1", // AMapUI 版本
        plugins: ["overlay/SimpleMarker"] // 需要加载的 AMapUI ui插件
      },
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: "" // Loca 版本
      }
    })
      .then(AMap => {
        const myAmap = new AMap.Map(id, options);
        resolve(myAmap);
      })
      .catch(e => {
        reject(e);
        console.error(e); //加载错误提示
      });
  });
};
