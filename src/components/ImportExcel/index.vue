<template>
	<el-dialog v-model="dialogVisible" title="批量添加系统账号" width="580px">
		<el-form class="drawer-multiColumn-form" label-width="100px">
			<el-form-item label="模板下载 :">
				<el-button type="primary" :icon="Download">点击下载</el-button>
			</el-form-item>
			<el-form-item label="文件上传 :">
				<el-upload
					action="string"
					:drag="true"
					:limit="excelLimit"
					:multiple="true"
					:on-exceed="handleExceed"
					accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				>
					<el-icon class="el-icon--upload"><upload-filled /></el-icon>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<template #tip>
						<div class="el-upload__tip">请上传 .xls , .xlsx 标准格式文件</div>
					</template>
				</el-upload>
			</el-form-item>
			<el-form-item label="数据覆盖 :">
				<el-switch v-model="isCover"> </el-switch>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Download } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

// 是否覆盖数据
const isCover = ref(false);
// 最大文件上传数
const excelLimit = ref(1);
// dialog状态
const dialogVisible = ref(false);

// 接收参数
const acceptParams = (params?: any): void => {
	dialogVisible.value = true;
};

// 文件数超出提示
const handleExceed = (): void => {
	ElNotification({
		title: "温馨提示",
		message: "最多只能上传一个文件！",
		type: "warning"
	});
};
// 上传错误提示
const excelUploadError = (): void => {
	ElNotification({
		title: "温馨提示",
		message: "导入数据失败，请您稍后重试！",
		type: "error"
	});
};
// 上传成功提示
const excelUploadSuccess = (): void => {
	// this.$message.success("导入数据成功！");
};
defineExpose({
	acceptParams
});
</script>
