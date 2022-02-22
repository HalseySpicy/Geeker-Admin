<template>
  <div class="menu" :style="{ width: isCollapse ? '65px' : '250px' }">
    <Logo :isCollapse="isCollapse"></Logo>
    <el-menu
      :default-active="activeMenu"
      :router="false"
      :collapse="isCollapse"
      :collapse-transition="false"
      :unique-opened="true"
      background-color="#20222a"
      text-color="#bdbdc0"
      active-text-color="#fff"
    >
      <SubItem :menuList="menuList"></SubItem>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { MenuStore } from "@/store/modules/menu";
import Logo from "./components/Logo.vue";
import SubItem from "./components/SubItem.vue";
import { useRoute } from "vue-router";
import menuListJson from "./json/menu.json";
const menuList = reactive<Menu.MenuOptions[]>(menuListJson);
const route = useRoute();
const menuStore = MenuStore();
const activeMenu = computed((): string => route.path);
const isCollapse = computed((): boolean => menuStore.isCollapse);

onMounted(() => {
  listeningWindow();
});

const screenWidth = ref<number>(0);
const screenHeight = ref<number>(0);
//监听窗口大小，改变Aside
const listeningWindow = () => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth;
      screenHeight.value = document.body.clientHeight;
      if (isCollapse.value === false && screenWidth.value < 1200) menuStore.setCollapse();
      if (isCollapse.value === true && screenWidth.value > 1200) menuStore.setCollapse();
    })();
  };
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
