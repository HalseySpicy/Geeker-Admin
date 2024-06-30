<!-- 混合布局 -->
<template>
  <el-container class="layout">
    <el-aside>
      <div class="aside-box" :style="{ width: `${asideBoxWidth}px` }">
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <span v-show="!isCollapse" class="logo-text">{{ title }}</span>
        </div>
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="isCollapse"
            :unique-opened="accordion"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="subMenuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <el-menu mode="horizontal" :router="false" :default-active="activeHeaderMenu">
          <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path" @click="changeSubMenu(item)">
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
        </el-menu>
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layoutVertical">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import { useGlobalStore } from "@/stores/modules/global";
import Main from "@/layouts/components/Main/index.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";

const title = import.meta.env.VITE_GLOB_APP_TITLE;

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const accordion = computed(() => globalStore.accordion);
const isCollapse = computed(() => globalStore.isCollapse);
const asideBoxWidth = computed(() => {
  if (!subMenuList.value.length) return 0;
  return isCollapse.value ? 65 : 210;
});
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
const subMenuList = ref<Menu.MenuOptions[]>([]);
const activeHeaderMenu = ref("");
const getActiveHeaderMenu = () => {
  return authStore.authMenuList.find(menu => route.path.includes(menu.path))?.path || "";
};

watch(
  () => [menuList, route],
  () => {
    // 当前菜单没有数据直接 return
    if (!menuList.value.length) return;
    activeHeaderMenu.value = getActiveHeaderMenu();
    const menuItem = menuList.value.filter((item: Menu.MenuOptions) => {
      return route.path === item.path || `/${route.path.split("/")[1]}` === item.path;
    });
    if (menuItem[0].children?.length) return (subMenuList.value = menuItem[0].children);
    subMenuList.value = [];
  },
  {
    deep: true,
    immediate: true
  }
);

// change SubMenu
const changeSubMenu = (item: Menu.MenuOptions) => {
  if (item.children?.length) return (subMenuList.value = item.children);
  subMenuList.value = [];
  router.push(item.path);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
