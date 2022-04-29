<template>
	<div class="table-box">
		<ProTable ref="proTable" :requestApi="getUserList" :initParam="initParam" :columns="columns" :operationWidth="330">
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
				<el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
				<el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
				<el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.ids)">批量删除用户</el-button>
			</template>
			<!-- 用户状态 slot -->
			<template #status="item">
				<el-table-column label="用户状态" width="170" #default="scope">
					<el-switch
						:value="scope.row.status"
						:active-text="scope.row.status === 1 ? '启用' : '禁用'"
						:active-value="1"
						:inactive-value="0"
						@change="changeStatus($event, scope.row)"
					/>
				</el-table-column>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="text" :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="text" :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="text" :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
				<el-button type="text" :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<UserDrawer ref="drawerRef"></UserDrawer>
		<ImportExcel ref="dialogRef"></ImportExcel>
	</div>
</template>

<script setup lang="ts" name="useComponent">
import { ref, reactive } from "vue";
import { genderType } from "@/utils/serviceDict";
import { User } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";
import { getUserList, deleteUser, editUser, addUser, resetUserPassWord, exportUserInfo, BatchAddUser, changeUserStatus } from "@/api/modules/user";

const proTable = ref();

// 如果表格需要初始化参数,直接定义传给 ProTable(之后每次请求都会带上该参数)
const initParam = reactive({
	type: 1
});

// 配置项
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

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
	await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
	proTable.value.refresh();
};

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
	await useHandleData(deleteUser, { id }, "删除所选用户信息");
	proTable.value.refresh();
};

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
	await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
	proTable.value.refresh();
};

// 切换用户状态
const changeStatus = async (val: number, params: User.ResUserList) => {
	await useHandleData(changeUserStatus, { id: params.id, status: val }, `切换【${params.username}】用户状态`);
	params.status = params.status == 1 ? 0 : 1;
};

// 导出用户列表
const downloadFile = async () => {
	useDownload(exportUserInfo, "用户列表", proTable.value.searchParam);
};

// 批量添加用户
interface DialogExpose {
	acceptParams: (params: any) => void;
}
const dialogRef = ref<DialogExpose>();
const batchAdd = () => {
	let params = {
		title: "用户",
		tempUrl: exportUserInfo,
		importUrl: BatchAddUser,
		getTableList: proTable.value.refresh
	};
	dialogRef.value!.acceptParams(params);
};

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
	acceptParams: (params: any) => void;
}
const drawerRef = ref<DrawerExpose>();
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = {}) => {
	console.log(rowData);
	let params = {
		title: title,
		rowData: { ...rowData },
		isView: title === "查看" ? true : false,
		apiUrl: title === "新增" ? addUser : title === "编辑" ? editUser : "",
		getTableList: proTable.value.refresh
	};
	drawerRef.value!.acceptParams(params);
};
</script>
