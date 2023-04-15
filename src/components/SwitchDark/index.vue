<template>
  <el-switch v-model="globalStore.isDark" @change="switchDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" />
</template>

<script setup lang="ts" name="SwitchDark">
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/stores/modules/global";
import { Sunny, Moon } from "@element-plus/icons-vue";

const { switchDark } = useTheme();
const globalStore = useGlobalStore();
</script>
