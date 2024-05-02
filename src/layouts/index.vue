<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="renderComponent" />
  <ThemeDrawer v-if="!isLockGet" />
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from "vue";
import { LayoutType } from "@/stores/interface";
import { useGlobalStore } from "@/stores/modules/global";
import { useLockStore } from "@/stores/modules/lock";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
import LayoutVertical from "./LayoutVertical/index.vue";
import LayoutClassic from "./LayoutClassic/index.vue";
import LayoutTransverse from "./LayoutTransverse/index.vue";
import LayoutColumns from "./LayoutColumns/index.vue";
import LockPage from "./components/LockScreen/LockPage.vue";

const LayoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns
};

const globalStore = useGlobalStore();
const lockStore = useLockStore();

const layout = computed(() => globalStore.layout);
const isLockGet = computed(() => lockStore.isLockGet);

const renderComponent = computed(() => {
  if (isLockGet.value) {
    return LockPage;
  } else {
    return LayoutComponents[layout.value];
  }
});
</script>

<style scoped lang="scss">
.layout {
  min-width: 600px;
}
</style>
