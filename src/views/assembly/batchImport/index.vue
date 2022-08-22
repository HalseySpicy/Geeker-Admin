<template>
	<div class="card content-box">
		<span class="text">批量添加数据 🍓🍇🍈🍉</span>
		<el-button type="primary" :icon="Upload" @click="batchAdd">批量添加数据</el-button>
		<ImportExcel ref="importRef" />
		<el-descriptions title="配置项 📚" :column="1" border>
			<el-descriptions-item label="title"> 组件显示标题，上传成功之后提示信息 </el-descriptions-item>
			<el-descriptions-item label="tempApi"> 下载模板的 Api </el-descriptions-item>
			<el-descriptions-item label="importApi"> 上传数据的 Api </el-descriptions-item>
			<el-descriptions-item label="getTableList"> 上传数据成功之后，刷新表格数据的 Api </el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script setup lang="ts" name="batchImport">
import { exportUserInfo, BatchAddUser } from "@/api/modules/user";
import ImportExcel from "@/components/ImportExcel/index.vue";
import { Upload } from "@element-plus/icons-vue";
import { ref } from "vue";

interface DialogExpose {
	acceptParams: (params: any) => void;
}
const importRef = ref<DialogExpose>();
const batchAdd = () => {
	let params = {
		title: "数据",
		tempApi: exportUserInfo,
		importApi: BatchAddUser
	};
	importRef.value!.acceptParams(params);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
