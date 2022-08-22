<template>
	<div class="main-box">
		<TreeFilter :requestApi="getUserDepartment" @change="changeInitParam" label="name"></TreeFilter>
		<div class="table-box">
			<ProTable ref="proTable" :columns="columns" :requestApi="getUserList" :initParam="initParam">
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
					<el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
					<el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
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
	</div>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive } from "vue";
import { User } from "@/api/interface";
import { ElMessage } from "element-plus";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";
import {
	getUserList,
	deleteUser,
	editUser,
	addUser,
	resetUserPassWord,
	exportUserInfo,
	BatchAddUser,
	getUserStatus,
	getUserGender,
	getUserDepartment
} from "@/api/modules/user";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	id: ""
});

// 树形筛选切换
const changeInitParam = (val: string) => {
	ElMessage.success("请注意查看请求参数变化 🤔");
	initParam.id = val;
};

// 表格配置项
const columns: Partial<ColumnProps>[] = [
	{ type: "index", label: "#", width: 80 },
	{ prop: "username", label: "用户姓名", width: 120, search: true },
	{
		prop: "gender",
		label: "性别",
		width: 120,
		sortable: true,
		search: true,
		searchType: "select",
		enum: getUserGender,
		searchProps: { label: "genderLabel", value: "genderValue" }
	},
	{ prop: "idCard", label: "身份证号" },
	{ prop: "email", label: "邮箱" },
	{ prop: "address", label: "居住地址" },
	{
		prop: "status",
		label: "用户状态",
		width: 120,
		sortable: true,
		search: true,
		tag: true,
		searchType: "select",
		enum: getUserStatus,
		searchProps: { label: "userLabel", value: "userStatus" }
	},
	{
		prop: "createTime",
		label: "创建时间",
		width: 180,
		sortable: true,
		search: true,
		searchType: "datetimerange",
		searchInitParam: ["2022-08-30 00:00:00", "2022-08-20 23:59:59"]
	},
	{ prop: "operation", label: "操作", width: 330, fixed: "right" }
];

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
	await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
	proTable.value.refresh();
};

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
	await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
	proTable.value.refresh();
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
		tempApi: exportUserInfo,
		importApi: BatchAddUser,
		getTableList: proTable.value.refresh
	};
	dialogRef.value!.acceptParams(params);
};

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
	acceptParams: (params: any) => void;
}
const drawerRef = ref<DrawerExpose>();
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = { avatar: "" }) => {
	let params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		apiUrl: title === "新增" ? addUser : title === "编辑" ? editUser : "",
		getTableList: proTable.value.refresh
	};
	drawerRef.value!.acceptParams(params);
};
</script>
