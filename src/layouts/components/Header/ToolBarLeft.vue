<template>
  <div class="tool-bar-lf">
    <CollapseIcon id="collapseIcon" />
    <Breadcrumb id="breadcrumb" v-if="globalStore.breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
const globalStore = useGlobalStore();
</script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
