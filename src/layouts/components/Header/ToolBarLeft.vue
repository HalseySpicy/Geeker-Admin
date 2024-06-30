<template>
  <div class="tool-bar-lf">
    <CollapseIcon id="collapseIcon" />
    <Breadcrumb v-show="isShowBreadcrumb" id="breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
const globalStore = useGlobalStore();
const isShowBreadcrumb = computed(() => {
  return globalStore.breadcrumb && globalStore.layout !== "mixed";
});
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
