<template>
  <div class="lock-screen flx-align-center">
    <el-icon @click="openDialog"><Lock /></el-icon>
    <!-- 锁定屏幕弹窗 -->
    <LockDialog ref="lockDialogRef"></LockDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LockDialog from "./LockDialog.vue";

const lockDialogRef = ref<InstanceType<typeof LockDialog> | null>(null);
const openDialog = () => {
  lockDialogRef.value?.openDialog();
};
</script>

<style scoped lang="scss">
.lock-screen {
  .el-icon {
    font-size: 20px;
    color: var(--el-header-text-color);
    cursor: pointer;
  }
}
</style>
