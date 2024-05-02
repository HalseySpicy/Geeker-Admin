<template>
  <el-dialog v-model="dialogVisible" title="锁定屏幕" width="500px" draggable>
    <el-form :model="form" ref="formRef" :rules="rules" label-width="auto">
      <el-form-item label="锁屏密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入锁屏密码" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleLock(formRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useLockStore } from "@/stores/modules/lock";

const lockStore = useLockStore();

const dialogVisible = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({
  password: ""
});
const rules = reactive<FormRules<RuleForm>>({
  password: [{ required: true, message: "请输入锁屏密码", trigger: "blur" }]
});

const openDialog = () => {
  form.password = "";
  dialogVisible.value = true;
  nextTick(() => {
    formRef.value?.clearValidate();
  });
};

const loading = ref(false);
const handleLock = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      await lockStore.setLock(form.password);
      dialogVisible.value = false;
    } finally {
      loading.value = false;
    }
  });
};

defineExpose({ openDialog });
</script>
