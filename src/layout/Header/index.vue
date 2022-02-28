<template>
	<div class="header">
		<div class="header-lf flx-center">
			<el-icon class="collapse-icon" @click="menuStore.setCollapse()">
				<component :is="isCollapse ? 'expand' : 'fold'"></component>
			</el-icon>
			<el-breadcrumb :separator-icon="ArrowRight">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>超级表格</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="header-ri flx-center">
			<!-- Component size -->
			<el-tooltip effect="dark" :content="'组件大小'" placement="bottom">
				<i :class="'iconfont icon-contentright'" class="icon-style" @click=""></i>
			</el-tooltip>
			<!-- Full screen -->
			<el-tooltip effect="dark" :content="'全屏'" placement="bottom">
				<i :class="'iconfont icon-fangda1'" class="icon-style" @click=""></i>
			</el-tooltip>
			<!-- username -->
			<span class="username">Geeker</span>
			<!-- usercenter -->
			<el-dropdown trigger="click">
				<div class="avatar">
					<img src="@/assets/images/avatar.gif" alt="" />
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click.native="openDialog('infoRef')">个人资料</el-dropdown-item>
						<el-dropdown-item @click.native="openDialog('passwordRef')">修改密码</el-dropdown-item>
						<el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<!-- infoDialog -->
		<InfoDialog ref="infoRef"></InfoDialog>
		<!-- passwordDialog -->
		<PasswordDialog ref="passwordRef"></PasswordDialog>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { MenuStore } from "@/store/modules/menu";
import InfoDialog from "./components/infoDialog.vue";
import PasswordDialog from "./components/passwordDialog.vue";

const router = useRouter();
const menuStore = MenuStore();
const isCollapse = computed((): boolean => menuStore.isCollapse);
const route = useRoute();
console.log(route.matched);

// logout
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "OK",
		cancelButtonText: "Cancel",
		type: "warning"
	}).then(() => {
		router.push({ name: "login" });
		ElMessage({
			type: "success",
			message: "退出登录成功！"
		});
	});
};

interface DialogExpose {
	openDialog: () => void;
}

const infoRef = ref<null | DialogExpose>(null);

const passwordRef = ref<null | DialogExpose>(null);

// openDialog
const openDialog = (refName: string) => {
	if (refName == "infoRef") return infoRef.value?.openDialog();
	passwordRef.value?.openDialog();
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
