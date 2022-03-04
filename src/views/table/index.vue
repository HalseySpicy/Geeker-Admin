<template>
	<div>
		<el-table :data="tableData" :border="true">
			<el-table-column prop="date" label="Date" />
			<el-table-column prop="name" label="Name" />
			<el-table-column prop="date" label="Date" />
			<el-table-column prop="name" label="Name" />
			<el-table-column prop="address" label="Address" />
		</el-table>
		<el-input v-model="value"></el-input>
		<el-button @click="downloadFile" type="primary">文件下载</el-button>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useDownload } from "@/hooks/useDownload";
import { downLoadFile } from "@/api/modules/login";

const downloadFile = () => {
	useDownload(downLoadFile, "系统日志");
};

const value = ref<string>("");
const tableData = [
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-02",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-04",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	}
];
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
