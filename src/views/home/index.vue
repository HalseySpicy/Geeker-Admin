<template>
  <div class="home flx-center">
    <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" />
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/store";
const store = GlobalStore();
interface Props<T> {
  username: T;
}

const data: Props<string> = {
  username: "string"
};

console.log(store, data);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
