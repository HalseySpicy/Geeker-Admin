<template>
  <div class="lock-page">
    <div class="lock flx-center">
      <div>翻页时钟</div>
      <div class="unlock-btn flx-center" @click="handleLock">
        <el-icon><Lock /></el-icon>
        <p>点击屏幕解锁</p>
      </div>
    </div>
    <div v-show="!isLock" class="unlock flx-center" @click="isLock = true">
      <el-form :model="form" ref="formRef" :rules="rules" class="flx-center" @click.stop="">
        <el-avatar :size="64" :src="avatar" />
        <p>{{ username }}</p>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入锁屏密码或者用户密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" :loading="loading" @click="handleUnlock(formRef)">进入系统</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" link @click="isLock = true">返回</el-button>
          <el-button type="primary" link @click="handleLogin">重新登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { useLockStore } from "@/stores/modules/lock";
import defaultAvatar from "@/assets/images/avatar.gif";
import { logoutApi } from "@/api/modules/login";
import { LOGIN_URL } from "@/config";
import { ElMessageBox, ElMessage } from "element-plus";

const router = useRouter();
const userStore = useUserStore();
const lockStore = useLockStore();

const isLock = ref(true);

const avatar = computed(() => userStore.userInfo.avatar || defaultAvatar);
const username = computed(() => userStore.userInfo.name);

const formRef = ref<FormInstance>();
const form = reactive({
  password: ""
});
const rules = reactive<FormRules<RuleForm>>({
  password: [{ required: true, message: "请输入锁屏密码", trigger: "blur" }]
});

// 锁屏
const handleLock = () => {
  isLock.value = false;
  form.password = "";
  nextTick(() => {
    formRef.value?.clearValidate();
  });
};

// 解锁
const loading = ref(false);
const handleUnlock = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      await lockStore.unLock(form.password);
    } finally {
      loading.value = false;
    }
  });
};

// 重新登录
const handleLogin = () => {
  ElMessageBox.confirm("您是否确认重新登录?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    // 1.执行退出登录接口
    await logoutApi();

    // 2.清除 Token
    userStore.setToken("");

    // 清除锁屏
    lockStore.resetLock();

    // 3.重定向到登陆页
    router.replace(LOGIN_URL);
    ElMessage.success("退出登录成功，请重新登录！");
  });
};

onMounted(() => {
  // 监听 enter 事件（调用解锁）
  document.onkeydown = (e: KeyboardEvent) => {
    e = (window.event as KeyboardEvent) || e;
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      handleUnlock(formRef.value);
    }
  };
});
</script>

<style scoped lang="scss">
.lock-page {
  height: 100%;
  .lock {
    height: 100%;
    &:hover {
      .unlock-btn {
        cursor: pointer;
        opacity: 1;
      }
    }
    .unlock-btn {
      position: absolute;
      top: 0;
      left: 0;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background-color: rgb(0 0 0 / 50%);
      backdrop-filter: blur(8px);
      opacity: 0;
      .el-icon {
        font-size: 50px;
      }
    }
  }
  .unlock {
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(8px);
    .el-form {
      flex-direction: column;
      width: 300px;
      padding: 30px;
      background-color: var(--el-bg-color);
      border-radius: 10px;
      :deep(.el-form-item) {
        width: 100%;
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
