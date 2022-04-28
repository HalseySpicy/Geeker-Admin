<template>
	<ProTable
		:tableData="tableData"
		:columns="tableColumns"
		:selectionChange="selectionChange"
		:getRowKeys="getRowKeys"
		:getTableList="getUserList"
		operationWidth="250"
	>
		<template #tableHeader>
			<el-button type="primary" :icon="icon.CirclePlus">新增用户</el-button>
			<el-button type="primary" :icon="icon.Upload" plain>批量添加用户</el-button>
			<el-button type="primary" :icon="icon.Download" plain>导出用户数据</el-button>
			<el-button type="danger" :icon="icon.Delete" plain :disabled="!isSelected"> 批量删除用户 </el-button>
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
			<el-button type="text" :icon="icon.View" @click="openDrawer(scope.row)">查看</el-button>
			<el-button type="text" :icon="icon.EditPen" @click="openDrawer(scope.row)">编辑</el-button>
			<el-button type="text" :icon="icon.Delete" @click="openDrawer(scope.row)">删除</el-button>
		</template>
	</ProTable>
</template>

<script setup lang="ts" name="dataVisualize">
import { onMounted } from "vue";
import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";
import { getUserList } from "@/api/modules/user";
import SearchForm from "@/components/SearchForm/index.vue";
import ProTable from "@/components/ProTable/index.vue";

const { tableData, pageable, icon, getTableList, handleSizeChange, handleCurrentChange } = useTable(getUserList);

const { selectionChange, getRowKeys, selectedListIds, isSelected } = useSelection();

onMounted(() => {
	getTableList();
});

const tableColumns = [
	{
		type: "selection",
		width: "100"
	},
	{
		type: "index",
		label: "#",
		width: "120"
	},
	{
		prop: "username",
		label: "用户姓名",
		width: "150"
	},
	{
		prop: "gender",
		label: "性别",
		enum: [
			{
				label: "男",
				value: 1
			},
			{
				label: "女",
				value: 2
			}
		]
	},
	{
		prop: "idCard",
		label: "身份证号"
	},
	{
		prop: "email",
		label: "邮箱"
	},
	{
		prop: "address",
		label: "居住地址"
	},
	{
		prop: "createTime",
		label: "创建时间",
		width: "200"
	},
	{
		prop: "avatar",
		label: "头像",
		image: true
	},
	{
		prop: "status",
		label: "用户状态"
	}
];

// 查看 / 编辑
const openDrawer = (row: any) => {
	console.log(row);
	console.log(selectedListIds.value);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
