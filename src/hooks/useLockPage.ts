import { computed, onUnmounted, unref, watchEffect } from "vue"; // 导入Vue的响应式函数和侦听函数
import { useThrottleFn } from "@vueuse/core"; // 导入节流函数

import { useGlobalStore } from "@/stores/modules/global"; // 导入应用设置相关的store
import { useUserStore } from "@/stores/modules/user"; // 导入用户信息相关的store
import { useLockStore } from "@/stores/modules/lock"; // 导入锁定状态相关的store

export const useLockPage = () => {
  const lockStore = useLockStore(); // 使用锁定状态的store
  const userStore = useUserStore(); // 使用用户信息的store
  const GlobalState = useGlobalStore(); // 使用应用设置的store

  let timeId: any; // 定义一个用于存储定时器id的变量

  function clear(): void {
    // 定义一个清除定时器的函数
    window.clearTimeout(timeId); // 清除定时器
  }

  function resetCalcLockTimeout(): void {
    // 重新计算锁定超时时间的函数
    // 如果用户未登录，则清除定时器并返回
    if (!userStore.token) {
      clear();
      return;
    }
    // 获取应用设置中的锁定时间
    const lockTime = GlobalState.lockTime;
    // 如果锁定时间未设置或小于1分钟，则清除定时器并返回
    if (!lockTime || lockTime < 1) {
      clear();
      return;
    }
    // 清除定时器
    clear();
    // 设置新的定时器，当超时时执行锁定页面操作
    timeId = setTimeout(
      () => {
        lockStore.setLock();
      },
      lockTime * 60 * 1000
    ); // 将锁定时间转换为毫秒
  }

  // 通过watchEffect侦听登录状态的变化，触发重新计算锁定超时时间
  watchEffect(onClean => {
    if (userStore.token) {
      resetCalcLockTimeout(); // 如果用户已登录，则重新计算锁定超时时间
    } else {
      clear(); // 如果用户未登录，则清除定时器
    }
    onClean(() => {
      clear(); // 组件卸载时清除定时器
    });
  });

  // 组件卸载时清除定时器
  onUnmounted(() => {
    clear();
  });

  // 使用节流函数对重新计算锁定超时时间的函数进行节流处理
  const keyupFn = useThrottleFn(resetCalcLockTimeout, 2000); // 在2000ms内只允许执行一次

  return computed(() => {
    const lockTime = GlobalState.lockTime; // 获取应用设置中的锁定时间
    if (unref(lockTime)) {
      return { onKeyup: keyupFn, onMousemove: keyupFn }; // 如果锁定时间存在，则返回对应的事件处理函数
    } else {
      clear(); // 如果锁定时间不存在，则清除定时器
      return {}; // 返回空对象
    }
  });
};
