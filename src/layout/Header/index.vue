<template>
	<div class="header">
		<div class="header-lf flx-center">
			<el-icon class="collapse-icon" @click="menuStore.setCollapse()">
				<component :is="isCollapse ? 'expand' : 'fold'"></component>
			</el-icon>
			<Breadcrumb></Breadcrumb>
		</div>
		<div class="header-ri flx-center">
			<!-- Component size -->
			<AssemblySize></AssemblySize>
			<!-- Full screen -->
			<Fullscreen></Fullscreen>
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
import { useRouter } from "vue-router";
import { MenuStore } from "@/store/modules/menu";
import InfoDialog from "./components/InfoDialog.vue";
import PasswordDialog from "./components/PasswordDialog.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import Fullscreen from "./components/Fullscreen.vue";
import AssemblySize from "./components/AssemblySize.vue";

const router = useRouter();
const menuStore = MenuStore();
const isCollapse = computed((): boolean => menuStore.isCollapse);

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
