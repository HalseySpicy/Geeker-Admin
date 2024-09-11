<template>
  <div class="card content-box">
    <span class="text"> useDialog hooks 操作弹框🍓🍇🍈🍉</span>

    <el-button type="primary" @click="openDialog">打开弹框</el-button>

    <test />

    <div>
      <span class="title">useDialog hooks介绍 📚</span>
      <p>
        在 Vue 中，Hook 允许在函数式组件或者 API 中「钩入」Vue 特性。它们通常在组合式 API（Composition API）中使用，这是 Vue
        提供的一套响应式和可复用逻辑功能的集合。 本文提到的 useDialog Hook 就是一个封装了 el-dialog 组件基本功能的自定义
        Hook，它还可以提供附加特性以便在项目中管理和展示弹窗。
      </p>
      <span class="title">主要实现功能📚</span>
      <ul>
        <li>满足基础用法，传入 el-dialog 的基础属性以及默认slot显示的内容，导出 openDialog 和 closeDialog 函数；</li>
        <li>支持 el-dialog 的事件配置；</li>
        <li>支持默认 slot 组件的属性配置；</li>
        <li>支持 el-dialog 其他 slot 配置，例如 header 和 footer 等；</li>
        <li>在内容组件中抛出特定事件支持关闭 dialog；</li>
        <li>支持显示内容为 jsx、普通文本、Vue Component；</li>
        <li>支持在显示内容中控制是否可以关闭的回调函数，例如 beforeClose；</li>
        <li>支持显示之前钩子，例如 onBeforeOpen；</li>
        <li>支持定义和弹出时修改配置属性；</li>
        <li>支持继承 root vue 的 prototype，可以使用如 vue-i18n 的 $t 函数；</li>
        <li>支持 ts 参数提示；</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" name="useDialog" setup>
import { defineAsyncComponent } from "vue";
import { useDialog } from "@/hooks/useDialog";

const test = defineAsyncComponent(() => import("./test.vue"));

const { openDialog } = useDialog(test, {
  dialogProps: {
    title: "测试弹窗",
    width: "800px"
  },
  contentProps: {
    from: "测试弹窗"
  },
  callBack: (data: any) => {
    // ElMessage.success("回调事件", data.from.value);
    console.log(data, "data");
  }
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
}
</style>
