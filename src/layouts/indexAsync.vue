<!-- 💥 这里是异步加载 LayoutComponents -->
<template>
  <div v-bind="lockEvents" style="width: 100%; height: 100%">
    <suspense>
      <template #default>
        <component :is="renderComponent" />
      </template>
      <template #fallback>
        <Loading />
      </template>
    </suspense>
    <ThemeDrawer v-if="!isLockGet" />
  </div>
</template>

<script setup lang="ts" name="layoutAsync">
import { computed, defineAsyncComponent, type Component } from "vue";
import { LayoutType } from "@/stores/interface";
import { useGlobalStore } from "@/stores/modules/global";
import { useLockStore } from "@/stores/modules/lock";
import { useLockPage } from "@/hooks/useLockPage";
import Loading from "@/components/Loading/index.vue";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
import LockPage from "./components/LockScreen/LockPage.vue";

const LayoutComponents: Record<LayoutType, Component> = {
  vertical: defineAsyncComponent(() => import("./LayoutVertical/index.vue")),
  classic: defineAsyncComponent(() => import("./LayoutClassic/index.vue")),
  transverse: defineAsyncComponent(() => import("./LayoutTransverse/index.vue")),
  columns: defineAsyncComponent(() => import("./LayoutColumns/index.vue"))
};

const globalStore = useGlobalStore();
const lockStore = useLockStore();
const lockEvents = useLockPage();

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
