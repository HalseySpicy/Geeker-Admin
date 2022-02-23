<template>
	<el-table :data="tableData" :border="true">
		<el-table-column prop="date" label="Date" />
		<el-table-column prop="name" label="Name" />
		<el-table-column prop="date" label="Date" />
		<el-table-column prop="name" label="Name" />
		<el-table-column prop="address" label="Address" />
	</el-table>
</template>
<script setup lang="ts">
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
