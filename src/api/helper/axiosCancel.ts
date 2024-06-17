import { CustomAxiosRequestConfig } from "../index";
import qs from "qs";

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, AbortController>();

// 序列化参数
export const getPendingUrl = (config: CustomAxiosRequestConfig) => {
  let data = config.data;
  if (typeof data === "string") data = JSON.parse(data);
  return [config.method, config.url, qs.stringify(data), qs.stringify(config.params)].join("&");
};

export class AxiosCanceler {
  /**
   * @description: 添加请求
   * @param {Object} config
   * @return void
   */
  addPending(config: CustomAxiosRequestConfig) {
    // 在请求开始前，对之前的请求做检查取消操作
    this.removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    config.signal = controller.signal;
    pendingMap.set(url, controller);
  }

  /**
   * @description: 移除请求
   * @param {Object} config
   */
  removePending(config: CustomAxiosRequestConfig) {
    const url = getPendingUrl(config);
    // 如果在 pending 中存在当前请求标识，需要取消当前请求
    const controller = pendingMap.get(url);
    controller && controller.abort();
  }

  /**
   * @description: 清空所有pending
   */
  removeAllPending() {
    pendingMap.forEach(controller => {
      controller && controller.abort();
    });
    pendingMap.clear();
  }
}
