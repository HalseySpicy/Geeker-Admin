<template>
	<div class="table-box">
		<div class="table-search">
			<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
				<el-form-item label="账号名称 :">
					<el-input v-model="searchParam.realName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="绑定景区 :">
					<el-input v-model="searchParam.spotIds" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="手机号 :">
					<el-input v-model="searchParam.mobile" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="账号角色 :">
					<el-input v-model="searchParam.roleId" placeholder="请输入"></el-input>
				</el-form-item>
				<div class="more-item" v-show="searchShow">
					<el-form-item label="帐号状态 :">
						<el-input v-model="searchParam.status" placeholder="请输入"></el-input>
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
				<el-button type="primary" :icon="icon.CirclePlus" @click="openDrawer('新增')" v-if="BUTTONS.add">
					新增系统账号
				</el-button>
				<el-button type="primary" :icon="icon.Upload" plain @click="batchAdd">批量添加系统账号</el-button>
				<el-button type="primary" :icon="icon.Download" plain @click="downloadFile">导出系统账号列表</el-button>
				<el-button type="danger" :icon="icon.Delete" plain :disabled="!isSelected" @click="batchDelete">
					批量删除
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
				prop="realName"
				label="账号名称"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				prop="spotNames"
				label="绑定景区"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				prop="roleNames"
				label="账号角色"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				prop="mobile"
				label="手机号码"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				prop="createName"
				label="创建人"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				prop="createTime"
				label="创建时间"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column label="操作" fixed="right" width="350px">
				<template #default="scope">
					<el-button type="text" :icon="icon.View" @click="openDrawer('查看', scope.row)">查看</el-button>
					<el-button type="text" :icon="icon.EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="text" :icon="icon.Refresh" @click="resetPass(scope.row.id)">重置密码</el-button>
					<el-button type="text" :icon="icon.Delete" @click="deleteAccount(scope.row.id)">删除</el-button>
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
import { downLoadSystemLog, getSysAccountList, deleteSysAccount } from "@/api/modules/system";
import { System } from "@/api/interface";
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
} = useTable(getSysAccountList, tableRef);

const { isSelected, selectedListIds, selectionChange, getRowKeys } = useSelection();

const { nowKey, BUTTONS } = useAuthButtons();
console.log(nowKey.value);
console.log(BUTTONS.value);

onMounted(() => {
	// 获取表格数据
	getTableList();
});

// 删除系统账号
const deleteAccount = async (id: string) => {
	await useHandleData(deleteSysAccount, { id }, "删除该系统账号");
	getTableList();
};

// 重置密码
const resetPass = async (id: string) => {
	await useHandleData(deleteSysAccount, { id }, "重置该系统账号密码");
	getTableList();
};

// 批量删除系统账号
const batchDelete = async () => {
	console.log(selectedListIds.value);
	await useHandleData(deleteSysAccount, { ids: selectedListIds.value }, "删除所选系统账号");
	getTableList();
};

interface DialogExpose {
	acceptParams: (params: any) => void;
}
const dialogRef = ref<DialogExpose>();
// 批量添加系统账号
const batchAdd = () => {
	let params = {
		tempUrl: downLoadSystemLog,
		tempName: "用户模板",
		importUrl: deleteSysAccount
	};
	dialogRef.value!.acceptParams(params);
};

// 导出系统日志
const downloadFile = async () => {
	useDownload(downLoadSystemLog, "系统日志", searchParam.value);
};

interface DrawerExpose {
	acceptParams: (params: any) => void;
}
const drawerRef = ref<DrawerExpose>();
// 打开 drawer
const openDrawer = (title: string, rowData?: System.GetAccountList) => {
	let params = {
		title: title,
		rowData: rowData,
		isView: title === "查看" ? true : false,
		apiUrl: deleteSysAccount
	};
	drawerRef.value!.acceptParams(params);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
