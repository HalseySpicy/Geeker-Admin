<template>
	<div class="table-box">
		<div class="table-search">
			<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
				<el-form-item label="用户姓名 :">
					<el-input v-model="searchParam.username" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="用户性别 :">
					<el-select v-model="searchParam.gender" placeholder="请选择">
						<el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号 :">
					<el-input v-model="searchParam.idCard" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="用户邮箱 :">
					<el-input v-model="searchParam.email" placeholder="请输入"></el-input>
				</el-form-item>
				<div class="more-item" v-show="searchShow">
					<el-form-item label="创建时间 :">
						<el-date-picker
							v-model="searchParam.createTime"
							type="datetimerange"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							value-format="YYYY-MM-DD HH:mm:ss"
						/>
					</el-form-item>
				</div>
			</el-form>
			<div class="search-operation">
				<el-button type="primary" :icon="icon.Search" @click="search">搜索</el-button>
				<el-button :icon="icon.Delete" @click="reset">重置</el-button>
				<el-button type="text" class="search-isOpen" @click="searchShow = !searchShow">
					{{ searchShow ? "合并" : "展开" }}
					<el-icon class="el-icon--right">
						<component :is="searchShow ? icon.ArrowUp : icon.ArrowDown"></component>
					</el-icon>
				</el-button>
			</div>
		</div>
		<div class="table-header">
			<div class="header-button">
				<el-button type="primary" :icon="icon.CirclePlus" @click="openDrawer('新增')"> 新增用户 </el-button>
				<el-button type="primary" :icon="icon.Upload" plain @click="batchAdd">批量添加用户</el-button>
				<el-button type="primary" :icon="icon.Download" plain @click="downloadFile">导出用户数据</el-button>
				<el-button type="danger" :icon="icon.Delete" plain :disabled="!isSelected" @click="batchDelete">
					批量删除用户
				</el-button>
			</div>
			<el-tooltip effect="dark" content="刷新" placement="top">
				<el-button class="refresh" :icon="icon.Refresh" circle @click="getTableList"> </el-button>
			</el-tooltip>
		</div>
		<el-table
			ref="tableRef"
			height="575"
			:data="tableData"
			:border="true"
			@selection-change="selectionChange"
			:row-key="getRowKeys"
		>
			<el-table-column type="selection" reserve-selection width="80" />
			<el-table-column
				prop="username"
				label="用户姓名"
				:formatter="defaultFormat"
				show-overflow-tooltip
				width="130"
			></el-table-column>
			<el-table-column
				prop="gender"
				label="用户性别"
				:formatter="defaultFormat"
				show-overflow-tooltip
				width="110"
			></el-table-column>
			<el-table-column
				prop="idCard"
				label="身份证号"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				prop="email"
				label="用户邮箱"
				:formatter="defaultFormat"
				show-overflow-tooltip
				width="250"
			></el-table-column>
			<el-table-column
				prop="address"
				label="居住地址"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				prop="createTime"
				label="创建时间"
				:formatter="defaultFormat"
				show-overflow-tooltip
				width="220"
			></el-table-column>
			<el-table-column label="操作" fixed="right" width="350px">
				<template #default="scope">
					<el-button type="text" :icon="icon.View" @click="openDrawer('查看', scope.row)">查看</el-button>
					<el-button type="text" :icon="icon.EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="text" :icon="icon.Refresh" @click="resetPass(scope.row)">重置密码</el-button>
					<el-button type="text" :icon="icon.Delete" @click="deleteAccount(scope.row)">删除</el-button>
				</template>
			</el-table-column>
			<template #empty>
				<div class="table-empty">
					<img src="@/assets/images/notData.png" alt="notData" />
					<div>暂无数据</div>
				</div>
			</template>
		</el-table>
		<el-pagination
			v-model:currentPage="pageable.pageNum"
			v-model:page-size="pageable.pageSize"
			:page-sizes="[10, 25, 50, 100]"
			background
			layout="total, sizes, prev, pager, next, jumper"
			:total="pageable.total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		></el-pagination>
		<Drawer ref="drawerRef"></Drawer>
		<ImportExcel ref="dialogRef"></ImportExcel>
	</div>
</template>
<script setup lang="ts" name="proTable">
import { ref, onMounted } from "vue";
import { genderType } from "@/utils/serviceDict";
import { getUserList, deleteUser, resetUserPassWord, exportUserInfo } from "@/api/modules/user";
import { User } from "@/api/interface";
import { useDownload } from "@/hooks/useDownload";
import { useHandleData } from "@/hooks/useHandleData";
import { useSelection } from "@/hooks/useSelection";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { useTable } from "@/hooks/useTable";
import Drawer from "./components/Drawer.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";

// 获取当前页面表格元素
const tableRef = ref();
const {
	tableData,
	searchShow,
	pageable,
	searchParam,
	icon,
	getTableList,
	search,
	reset,
	handleSizeChange,
	handleCurrentChange,
	defaultFormat
} = useTable(getUserList, tableRef);

const { isSelected, selectedListIds, selectionChange, getRowKeys } = useSelection();
// 用户按钮权限
const { nowKey, BUTTONS } = useAuthButtons();
console.log(nowKey.value);
console.log(BUTTONS.value);

onMounted(() => {
	// 获取表格数据
	getTableList();
});

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
	await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
	getTableList();
};

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
	await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
	getTableList();
};

// 批量删除用户信息
const batchDelete = async () => {
	await useHandleData(deleteUser, { id: selectedListIds.value }, "删除所选用户信息");
	getTableList();
};

// 导出用户列表
const downloadFile = async () => {
	useDownload(exportUserInfo, "用户列表", searchParam.value);
};

// 批量添加用户
interface DialogExpose {
	acceptParams: (params: any) => void;
}
const dialogRef = ref<DialogExpose>();
const batchAdd = () => {
	let params = {
		tempUrl: exportUserInfo,
		tempName: "用户模板",
		importUrl: deleteUser
	};
	dialogRef.value!.acceptParams(params);
};

// 打开 drawer(编辑/查看/删除)
interface DrawerExpose {
	acceptParams: (params: any) => void;
}
const drawerRef = ref<DrawerExpose>();
const openDrawer = (title: string, rowData?: User.ResUserList) => {
	let params = {
		title: title,
		rowData: rowData,
		isView: title === "查看" ? true : false,
		apiUrl: deleteUser
	};
	drawerRef.value!.acceptParams(params);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
