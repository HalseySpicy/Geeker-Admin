<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="用户列表"
			highlight-current-row
			:columns="columns"
			:requestApi="getUserList"
			:span-method="objectSpanMethod"
			:show-summary="true"
			:summary-method="getSummaries"
			@row-click="rowClick"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus" @click="proTable.element.toggleAllSelection()">全选 / 全不选</el-button>
				<el-button type="primary" :icon="Pointer" plain @click="setCurrent">选中第三行</el-button>
				<el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">
					批量删除用户
				</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<UserDrawer ref="drawerRef" />
	</div>
</template>

<script setup lang="ts" name="complexProTable">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { User } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { CirclePlus, Pointer, Delete, Refresh } from "@element-plus/icons-vue";
import { getUserList, deleteUser, resetUserPassWord, getUserStatus, getUserGender } from "@/api/modules/user";

// 获取 ProTable DOM
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "selection", fixed: "left", width: 80 },
	{ type: "index", label: "#", width: 80 },
	{
		prop: "base",
		label: "基本信息",
		_children: [
			{ prop: "username", label: "用户姓名" },
			{ prop: "user.detail.age", label: "年龄", width: 100 },
			{
				prop: "gender",
				label: "性别",
				width: 100,
				enum: getUserGender,
				fieldNames: { label: "genderLabel", value: "genderValue" }
			},
			{
				prop: "details",
				label: "详细资料",
				_children: [
					{ prop: "idCard", label: "身份证号" },
					{ prop: "email", label: "邮箱" },
					{ prop: "address", label: "居住地址" }
				]
			}
		]
	},
	{
		prop: "status",
		label: "用户状态",
		tag: true,
		enum: getUserStatus,
		fieldNames: { label: "userLabel", value: "userStatus" }
	},
	{ prop: "createTime", label: "创建时间", width: 200 },
	{ prop: "operation", label: "操作", fixed: "right", width: 230 }
];

// 选择行
const setCurrent = () => {
	proTable.value.element.setCurrentRow(proTable.value.tableData[2]);
};

// 表尾合计行（自行根据条件计算）
interface SummaryMethodProps<T = User.ResUserList> {
	columns: TableColumnCtx<T>[];
	data: T[];
}
const getSummaries = (param: SummaryMethodProps) => {
	const { columns } = param;
	const sums: string[] = [];
	columns.forEach((column, index) => {
		if (index === 0) return (sums[index] = "合计");
		else sums[index] = "N/A";
	});
	return sums;
};

// 列合并
interface SpanMethodProps {
	row: User.ResUserList;
	column: TableColumnCtx<User.ResUserList>;
	rowIndex: number;
	columnIndex: number;
}
const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
	if (columnIndex === 3) {
		if (rowIndex % 2 === 0) return { rowspan: 2, colspan: 1 };
		else return { rowspan: 0, colspan: 0 };
	}
};

// 单击行
const rowClick = (row: User.ResUserList, column: TableColumnCtx<User.ResUserList>) => {
	console.log(row);
	if (column.property == "operation") return;
	ElMessage.success("当前行被点击了！");
};

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
	await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
	proTable.value.getTableList();
};

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
	await useHandleData(deleteUser, { id }, "删除所选用户信息");
	proTable.value.clearSelection();
	proTable.value.getTableList();
};

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
	await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
	proTable.value.getTableList();
};
</script>
