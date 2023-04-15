<template>
  <div class="card content-box">
    <span class="text"> 我是 TreeFilter 详情页，和 TreeFilter 是同一级路由 🍓🍇🍈🍉</span>
    <span class="text">params:{{ route.params }}</span>
    <span class="text">query:{{ route.query }}</span>
  </div>
</template>

<script setup lang="ts" name="useTreeFilter">
import { useRoute } from "vue-router";
const route = useRoute();
</script>
