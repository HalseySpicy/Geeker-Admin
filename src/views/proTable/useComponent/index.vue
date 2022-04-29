<template>
	<ProTable ref="proTable" :requestApi="getUserList" :initParam="initParam" :columns="columns">
		<!-- 表格 header 按钮 -->
		<template #tableHeader="scope">
			<el-button type="primary" :icon="CirclePlus">新增用户</el-button>
			<el-button type="primary" :icon="Upload" plain>批量添加用户</el-button>
			<el-button type="primary" :icon="Download" plain>导出用户数据</el-button>
			<el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.ids)">
				批量删除用户
			</el-button>
		</template>
		<!-- 用户状态 slot -->
		<template #status="scope">
			<el-switch
				:value="scope.row.status"
				:active-text="scope.row.status === 1 ? '启用' : '禁用'"
				:active-value="1"
				:inactive-value="0"
			/>
		</template>
		<!-- 表格操作 -->
		<template #operation="scope">
			<el-button type="text" :icon="View" @click="openDrawer(scope.row)">查看</el-button>
			<el-button type="text" :icon="EditPen" @click="openDrawer(scope.row)">编辑</el-button>
			<el-button type="text" :icon="Delete" @click="openDrawer(scope.row)">删除</el-button>
		</template>
	</ProTable>
</template>

<script setup lang="ts" name="useComponent">
import { reactive, ref } from "vue";
import { getUserList } from "@/api/modules/user";
import { genderType } from "@/utils/serviceDict";
import { ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Download, Upload, View } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable/index.vue";

const columns: Partial<ColumnProps>[] = [
	{
		type: "selection",
		width: "80"
	},
	{
		type: "index",
		label: "#",
		width: "80"
	},
	{
		prop: "username",
		label: "用户姓名",
		search: true
	},
	{
		prop: "gender",
		label: "性别",
		width: "100",
		enum: genderType,
		search: true,
		searchType: "select"
	},
	{
		prop: "idCard",
		label: "身份证号",
		search: true
	},
	{
		prop: "email",
		label: "邮箱",
		search: true
	},
	{
		prop: "address",
		label: "居住地址"
	},
	{
		prop: "createTime",
		label: "创建时间",
		width: "200",
		search: true,
		searchType: "datetimerange"
	},
	{
		prop: "status",
		label: "用户状态"
	},
	{
		prop: "avatar",
		label: "头像",
		image: true
	}
];

const proTable = ref();

// 如果表格需要初始化参数,直接定义传给子组件
let initParam = reactive({
	type: 1
});

// 批量删除
const batchDelete = async (ids: number[]) => {
	console.log(ids);
	initParam.type = 2;
	proTable.value.refresh();
};

// 查看 / 编辑
const openDrawer = (row: any) => {
	console.log(row);
	console.log(proTable);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
