<template>
  <div class="maximize" @click="exitMaximize">
    <i :class="'iconfont icon-tuichu'"></i>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
const exitMaximize = () => {
  globalStore.setGlobalState("maximize", false);
};
</script>

<style scoped lang="scss">
.maximize {
  position: fixed;
  top: -25px;
  right: -25px;
  z-index: 999;
  width: 55px;
  height: 55px;
  cursor: pointer;
  background-color: var(--el-color-info);
  border-radius: 50%;
  opacity: 0.9;
  &:hover {
    background-color: var(--el-color-info-dark-2);
  }
  .iconfont {
    position: relative;
    top: 46%;
    left: 19%;
    font-size: 14px;
    color: #ffffff;
  }
}
</style>
