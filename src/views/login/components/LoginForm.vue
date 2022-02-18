<template>
  <el-form ref="formRef" size="big" label-width="80px">
    <el-form-item label="用户名 ：">
      <el-input v-model="data[0].username">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="密码 ：">
      <el-input type="password" show-password v-model="data[0].password">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <el-button @click="clickParent">我是子组件方法</el-button>
</template>

<script setup lang="ts">
import { ref, Ref, toRefs, toRef } from "vue";
interface LoginFrom {
  username: string;
  password: string;
}
// 采用ts专有声明，有默认默认值
withDefaults(
  defineProps<{
    data: LoginFrom[];
  }>(),
  {
    data: () => [{ username: "admin", password: "123456" }]
  }
);
// 子组件向父组件传输数据
const emit = defineEmits<{
  (e: "clickParent", num: number): void;
}>();

const clickParent = () => {
  emit("clickParent", 2);
};
const count = ref<number>(2111);
const consoleNumber = (): void => {
  console.log(55555);
};
defineExpose({
  count,
  consoleNumber
});
</script>

<style scoped lang="scss"></style>
