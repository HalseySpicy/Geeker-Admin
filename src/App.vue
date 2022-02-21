<template>
  <el-config-provider :locale="zhCn" :button="config" size="large">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
// 配置element中英文
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { reactive } from "vue";
// 配置element按钮文字中间是否有空格
const config = reactive({
  autoInsertSpace: false
});
console.log(import.meta.env.VITE_BASE_API);
</script>

<style scoped lang="scss"></style>
