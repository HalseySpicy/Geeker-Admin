<template>
  <div class="logo flx-center" :style="{ width: isCollapse ? '65px' : '250px' }">
    <img src="@/assets/images/logo.svg" alt="logo" />
    <span v-show="!isCollapse">Geeker Admin</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
</script>

<style scoped lang="scss">
.logo {
  transition: width 0.3s ease;
  height: 55px;
  box-sizing: border-box;
  border-bottom: 2px solid #1d1e26;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  span {
    font-size: 22px;
    font-weight: bold;
    color: #dadada;
    white-space: nowrap;
  }
  img {
    width: 30px;
    object-fit: contain;
    margin-right: 8px;
  }
}
</style>
