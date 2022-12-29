<template>
	<div class="main-box">
		<TreeFilter
			title="部门列表(多选)"
			multiple
			label="name"
			:requestApi="getUserDepartment"
			:defaultValue="treeFilterValues.departmentId"
			@change="changeTreeFilter"
		/>
		<div class="table-box">
			<div class="card mb10 pt0 pb0">
				<SelectFilter :data="selectFilterData" :defaultValues="selectFilterValues" @change="changeSelectFilter" />
			</div>
			<ProTable
				ref="proTable"
				title="用户列表"
				:columns="columns"
				:requestApi="getUserList"
				:initParam="Object.assign(treeFilterValues, selectFilterValues)"
			>
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
<script setup lang="ts" name="useSelectFilter">
import { ref, reactive, onMounted } from "vue";
import { User } from "@/api/interface";
import { ElMessage, ElMessageBox } from "element-plus";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import { genderType, userStatus } from "@/utils/serviceDict";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import SelectFilter from "@/components/SelectFilter/index.vue";
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";
import {
	getUserList,
	deleteUser,
	editUser,
	addUser,
	resetUserPassWord,
	exportUserInfo,
	BatchAddUser,
	getUserDepartment,
	getUserRole
} from "@/api/modules/user";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "index", label: "#", width: 80 },
	{ prop: "username", label: "用户姓名", width: 120 },
	{ prop: "gender", label: "性别", width: 120, sortable: true, enum: genderType },
	{ prop: "idCard", label: "身份证号" },
	{ prop: "email", label: "邮箱" },
	{ prop: "address", label: "居住地址" },
	{ prop: "status", label: "用户状态", width: 120, sortable: true, tag: true, enum: userStatus },
	{ prop: "createTime", label: "创建时间", width: 180, sortable: true },
	{ prop: "operation", label: "操作", width: 330, fixed: "right" }
];

// selectFilter 数据（用户角色为后台数据）
const selectFilterData = ref([
	{
		title: "用户状态(单)",
		key: "userStatus",
		options: [
			{
				label: "全部",
				value: ""
			},
			{
				label: "在职",
				value: "1",
				icon: "User"
			},
			{
				label: "待培训",
				value: "2",
				icon: "Bell"
			},
			{
				label: "待上岗",
				value: "3",
				icon: "Clock"
			},
			{
				label: "已离职",
				value: "4",
				icon: "CircleClose"
			},
			{
				label: "已退休",
				value: "5",
				icon: "CircleCheck"
			}
		]
	},
	{
		title: "用户角色(多)",
		key: "userRole",
		multiple: true,
		options: []
	}
]);

// 获取用户角色字典
onMounted(() => getUserRoleDict());
const getUserRoleDict = async () => {
	const { data } = await getUserRole();
	selectFilterData.value[1].options = data as any;
};

// 默认 selectFilter 参数
const selectFilterValues = ref({ userStatus: "2", userRole: ["1", "3"] });
const changeSelectFilter = (value: typeof selectFilterValues.value) => {
	ElMessage.success("请注意查看请求参数变化 🤔");
	proTable.value.pageable.pageNum = 1;
	selectFilterValues.value = value;
};

// 默认 treeFilter 参数
const treeFilterValues = reactive({ departmentId: ["11"] });
const changeTreeFilter = (val: string[]) => {
	ElMessage.success("请注意查看请求参数变化 🤔");
	proTable.value.pageable.pageNum = 1;
	treeFilterValues.departmentId = val;
};

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
	await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
	proTable.value.getTableList();
};

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
	await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
	proTable.value.getTableList();
};

// 导出用户列表
const downloadFile = async () => {
	ElMessageBox.confirm("确认导出用户数据?", "温馨提示", { type: "warning" }).then(() =>
		useDownload(exportUserInfo, "用户列表", proTable.value.searchParam)
	);
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
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = {}) => {
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
