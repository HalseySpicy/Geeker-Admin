<template>
  <div class="card content-box">
    <span class="text"> 按钮权限 🍓🍇🍈🍉</span>
    <el-alert
      class="mb20"
      :title="`当前用户按钮权限：${JSON.stringify(Object.keys(BUTTONS))}`"
      type="success"
      :closable="false"
    />
    <el-divider content-position="left"> 使用 Hooks 方式绑定权限 </el-divider>
    <el-row class="mb20">
      <el-button v-if="BUTTONS.add" type="primary" :icon="CirclePlus"> 新增 </el-button>
      <el-button v-if="BUTTONS.edit" type="warning" :icon="EditPen"> 编辑 </el-button>
      <el-button v-if="BUTTONS.delete" type="danger" plain :icon="Delete"> 删除 </el-button>
      <el-button v-if="BUTTONS.import" type="info" plain :icon="Upload"> 导入数据 </el-button>
      <el-button v-if="BUTTONS.export" type="info" plain :icon="Download"> 导出数据 </el-button>
    </el-row>
    <el-divider content-position="left"> 使用 v-auth 指令绑定单个权限 </el-divider>
    <el-row class="mb20">
      <el-button v-auth="'add'" type="primary" :icon="CirclePlus"> 新增 </el-button>
      <el-button v-auth="'edit'" type="warning" :icon="EditPen"> 编辑 </el-button>
      <el-button v-auth="'delete'" type="danger" plain :icon="Delete"> 删除 </el-button>
      <el-button v-auth="'import'" type="info" plain :icon="Upload"> 导入数据 </el-button>
      <el-button v-auth="'export'" type="info" plain :icon="Download"> 导出数据 </el-button>
    </el-row>
    <el-divider content-position="left"> 使用 v-auth 指令绑定多个权限 </el-divider>
    <el-row>
      <el-button v-auth="['add', 'edit', 'delete', 'import', 'export']" type="primary" :icon="CirclePlus"> 新增 </el-button>
      <el-button v-auth="['add', 'edit', 'delete', 'import', 'export']" type="warning" :icon="EditPen"> 编辑 </el-button>
      <el-button v-auth="['add', 'edit', 'delete', 'import', 'export']" type="danger" plain :icon="Delete"> 删除 </el-button>
      <el-button v-auth="['add', 'edit', 'delete', 'import', 'export']" type="info" plain :icon="Upload"> 导入数据 </el-button>
      <el-button v-auth="['add', 'edit', 'delete', 'import', 'export']" type="info" plain :icon="Download"> 导出数据 </el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="authButton">
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { CirclePlus, Delete, EditPen, Download, Upload } from "@element-plus/icons-vue";

const { BUTTONS } = useAuthButtons();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
