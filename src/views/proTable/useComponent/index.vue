<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="用户列表"
			:columns="columns"
			:requestApi="getUserList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')" v-if="BUTTONS.add">新增用户</el-button>
				<el-button type="primary" :icon="Upload" plain @click="batchAdd" v-if="BUTTONS.batchAdd">批量添加用户</el-button>
				<el-button type="primary" :icon="Download" plain @click="downloadFile" v-if="BUTTONS.export">导出用户数据</el-button>
				<el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">
					批量删除用户
				</el-button>
			</template>
			<!-- Expand -->
			<template #expand="scope">
				{{ scope.row }}
			</template>
			<!-- usernameHeader -->
			<template #usernameHeader="scope">
				<el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
					{{ scope.row.label }}
				</el-button>
			</template>
			<!-- createTime -->
			<template #createTime="scope">
				<el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
					{{ scope.row.createTime }}
				</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<UserDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="useComponent">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { User } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";
import {
	getUserList,
	deleteUser,
	editUser,
	addUser,
	changeUserStatus,
	resetUserPassWord,
	exportUserInfo,
	BatchAddUser,
	getUserStatus,
	getUserGender
} from "@/api/modules/user";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	type: 1
});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
	return {
		datalist: data.datalist,
		total: data.total,
		pageNum: data.pageNum,
		pageSize: data.pageSize
	};
};

// 页面按钮权限
const { BUTTONS } = useAuthButtons();

// 自定义渲染表头（使用tsx语法）
const headerRender = (row: ColumnProps) => {
	return (
		<el-button
			type="primary"
			onClick={() => {
				ElMessage.success("我是通过 tsx 语法渲染的表头");
			}}
		>
			{row.label}
		</el-button>
	);
};

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "selection", fixed: "left", width: 80 },
	{ type: "index", label: "#", width: 80 },
	{ type: "expand", label: "Expand", width: 100 },
	{
		prop: "username",
		label: "用户姓名",
		search: { el: "input" },
		render: scope => {
			return (
				<el-button type="primary" link onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
					{scope.row.username}
				</el-button>
			);
		}
	},
	{
		prop: "gender",
		label: "性别",
		enum: getUserGender,
		fieldNames: { label: "genderLabel", value: "genderValue" },
		search: { el: "select" }
	},
	{ prop: "idCard", label: "身份证号", search: { el: "input" } },
	{ prop: "email", label: "邮箱", search: { el: "input" } },
	{ prop: "address", label: "居住地址" },
	{
		prop: "status",
		label: "用户状态",
		enum: getUserStatus,
		fieldNames: { label: "userLabel", value: "userStatus" },
		search: {
			el: "tree-select",
			props: { props: { label: "userLabel" }, nodeKey: "userStatus" }
		},
		render: (scope: { row: User.ResUserList }) => {
			return (
				<>
					{BUTTONS.value.status ? (
						<el-switch
							model-value={scope.row.status}
							active-text={scope.row.status ? "启用" : "禁用"}
							active-value={1}
							inactive-value={0}
							onClick={() => changeStatus(scope.row)}
						/>
					) : (
						<el-tag type={scope.row.status ? "success" : "danger"}>{scope.row.status ? "启用" : "禁用"}</el-tag>
					)}
				</>
			);
		}
	},
	{
		prop: "createTime",
		label: "创建时间",
		headerRender,
		width: 200,
		search: {
			el: "date-picker",
			span: 2,
			defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
			props: { type: "datetimerange" }
		}
	},
	{ prop: "operation", label: "操作", fixed: "right", width: 330 }
];

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

// 切换用户状态
const changeStatus = async (row: User.ResUserList) => {
	await useHandleData(changeUserStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】用户状态`);
	proTable.value.getTableList();
};

// 导出用户列表
const downloadFile = async () => {
	useDownload(exportUserInfo, "用户列表", proTable.value.searchParam);
};

// 批量添加用户
const dialogRef = ref();
const batchAdd = () => {
	let params = {
		title: "用户",
		tempApi: exportUserInfo,
		importApi: BatchAddUser,
		getTableList: proTable.value.getTableList
	};
	dialogRef.value.acceptParams(params);
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = { avatar: "" }) => {
	let params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addUser : title === "编辑" ? editUser : "",
		getTableList: proTable.value.getTableList
	};
	drawerRef.value.acceptParams(params);
};
</script>
