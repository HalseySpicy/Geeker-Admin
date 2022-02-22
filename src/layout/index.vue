<template>
  <el-container>
    <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition appear name="fade-transform" mode="out-in">
            <section class="main-box">
              <keep-alive v-if="route.meta.keepAlive">
                <component :is="Component" :key="route.path"></component>
              </keep-alive>
              <component v-else :is="Component" :key="route.path"></component>
            </section>
          </transition>
        </router-view>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from "./Menu/index.vue";
import Header from "./Header/index.vue";
import Footer from "./Footer/index.vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.meta.keepAlive);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
