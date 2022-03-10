<template>
	<el-drawer
		v-model="drawer"
		:destroy-on-close="true"
		@close="resetForm()"
		size="800px"
		:title="`${drawerData.title}系统账号`"
	>
		<el-form
			ref="ruleFormRef"
			class="drawer-multiColumn-form"
			:disabled="drawerData.isView"
			:model="form"
			label-width="120px"
		>
			<el-form-item label="Activity name :" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="Activity name :" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="Activity name :" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawer = false">取消</el-button>
			<el-button type="primary" v-show="!drawerData.isView">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ruleFormRef = ref();
const resetForm = () => {
	ruleFormRef.value!.resetFields();
};

const form = ref({ name: "" });
const drawer = ref(false);
const drawerData = ref({
	isView: false,
	title: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: any): void => {
	console.log(params);
	drawerData.value = params;
	drawer.value = true;
};

defineExpose({
	acceptParams
});
</script>
