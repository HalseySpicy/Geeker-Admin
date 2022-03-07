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
import { ref, onMounted } from "vue";
import { useDownload } from "@/hooks/useDownload";
import { useTime } from "@/hooks/useTime";
import { useOnline } from "@/hooks/useOnline";
import { downLoadSystemLog, getSystemLog } from "@/api/modules/system";

onMounted(() => {
	getTableList();
});

const getTableList = async () => {
	const res = await getSystemLog({});
	console.log(res);
	res.data.datalist.forEach(item => {
		console.log(item.bfData);
	});
};

const { online } = useOnline();
// console.log(online.value);

const downloadFile = () => {
	useDownload(downLoadSystemLog, "系统日志");
};

const { month, day, hour, minute, second, week } = useTime();
// console.log(month.value, day.value, hour.value, minute.value, second.value, week.value);

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
