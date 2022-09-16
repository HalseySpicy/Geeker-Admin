<template>
	<div class="table-box">
		<div class="card table-search" v-show="isShowSearch">
			<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
				<el-form-item label="用户姓名 :">
					<el-input v-model="searchParam.username" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="性别 :">
					<el-select v-model="searchParam.gender" placeholder="请选择" clearable>
						<el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号 :">
					<el-input v-model="searchParam.idCard" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="邮箱 :">
					<el-input v-model="searchParam.email" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<div style="display: inline" v-show="searchShow">
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
				<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
				<el-button :icon="Delete" @click="reset">重置</el-button>
				<el-button type="primary" link class="search-isOpen" @click="searchShow = !searchShow">
					{{ searchShow ? "合并" : "展开" }}
					<el-icon class="el-icon--right">
						<component :is="searchShow ? ArrowUp : ArrowDown"></component>
					</el-icon>
				</el-button>
			</div>
		</div>
		<div class="card table-box">
			<div class="table-header">
				<div class="header-button-lf">
					<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')" v-if="BUTTONS.add">新增用户</el-button>
					<el-button type="primary" :icon="Upload" plain @click="batchAdd" v-if="BUTTONS.batchAdd">批量添加用户</el-button>
					<el-button type="primary" :icon="Download" plain @click="downloadFile" v-if="BUTTONS.export">导出用户数据</el-button>
					<el-button type="danger" :icon="Delete" plain :disabled="!isSelected" @click="batchDelete" v-if="BUTTONS.batchDelete">
						批量删除用户
					</el-button>
				</div>
				<div class="header-button-ri">
					<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
					<el-button :icon="Printer" circle @click="printData"> </el-button>
					<el-button :icon="Search" circle @click="isShowSearch = !isShowSearch"> </el-button>
				</div>
			</div>
			<el-table height="575" :data="tableData" :border="true" @selection-change="selectionChange" :row-key="getRowKeys">
				<el-table-column type="selection" reserve-selection width="80" />
				<el-table-column
					prop="username"
					label="用户姓名"
					:formatter="defaultFormat"
					show-overflow-tooltip
					width="140"
				></el-table-column>
				<el-table-column prop="gender" label="性别" show-overflow-tooltip width="140" v-slot="scope">
					{{ scope.row.gender == 1 ? "男" : "女" }}
				</el-table-column>
				<el-table-column prop="idCard" label="身份证号" :formatter="defaultFormat" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" :formatter="defaultFormat" show-overflow-tooltip width="240"></el-table-column>
				<el-table-column prop="address" label="居住地址" :formatter="defaultFormat" show-overflow-tooltip></el-table-column>
				<el-table-column
					prop="createTime"
					label="创建时间"
					:formatter="defaultFormat"
					show-overflow-tooltip
					width="200"
				></el-table-column>
				<el-table-column prop="status" label="用户状态" width="180" v-slot="scope">
					<el-switch
						:value="scope.row.status"
						:active-text="scope.row.status === 1 ? '启用' : '禁用'"
						:active-value="1"
						:inactive-value="0"
						@change="changeStatus($event, scope.row)"
						v-if="BUTTONS.status"
					/>
					<el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" v-else>
						{{ scope.row.status === 1 ? "启用" : "禁用" }}
					</el-tag>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="330" v-slot="scope">
					<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)" v-if="BUTTONS.view">查看</el-button>
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)" v-if="BUTTONS.edit"
						>编辑</el-button
					>
					<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)" v-if="BUTTONS.reset">重置密码</el-button>
					<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)" v-if="BUTTONS.delete">删除</el-button>
					<span v-if="!BUTTONS.view && !BUTTONS.edit && !BUTTONS.reset && !BUTTONS.delete">--</span>
				</el-table-column>
				<template #empty>
					<div class="table-empty">
						<img src="@/assets/images/notData.png" alt="notData" />
						<div>暂无数据</div>
					</div>
				</template>
			</el-table>
			<el-pagination
				:currentPage="pageable.pageNum"
				:page-size="pageable.pageSize"
				:page-sizes="[10, 25, 50, 100]"
				background
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageable.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>
		<UserDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="ts" name="useHooks">
import { ref, reactive } from "vue";
import { genderType } from "@/utils/serviceDict";
import { defaultFormat } from "@/utils/util";
import { User } from "@/api/interface";
import { useDownload } from "@/hooks/useDownload";
import { useHandleData } from "@/hooks/useHandleData";
import { useSelection } from "@/hooks/useSelection";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { useTable } from "@/hooks/useTable";
import { ElMessage } from "element-plus";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import {
	Refresh,
	CirclePlus,
	Delete,
	Search,
	Printer,
	EditPen,
	Download,
	Upload,
	View,
	ArrowDown,
	ArrowUp
} from "@element-plus/icons-vue";
import {
	getUserList,
	addUser,
	BatchAddUser,
	editUser,
	deleteUser,
	changeUserStatus,
	resetUserPassWord,
	exportUserInfo
} from "@/api/modules/user";

// 是否展示搜索模块
const isShowSearch = ref(true);

// 是否展示更多搜索内容
const searchShow = ref(false);

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	type: 1
});

// 表格 hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(getUserList, initParam);

// 数据多选 hooks
const { isSelected, selectedListIds, selectionChange, getRowKeys } = useSelection();

// 页面按钮权限
const { BUTTONS } = useAuthButtons();

// 设置搜索表单默认参数
searchInitParam.value = { createTime: ["2022-04-05 00:00:00", "2022-05-10 23:59:59"] };

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

// 切换用户状态
const changeStatus = async (val: number, params: User.ResUserList) => {
	await useHandleData(changeUserStatus, { id: params.id, status: val }, `切换【${params.username}】用户状态`);
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

// 打印表格数据
const printData = () => {
	ElMessage.success("打印表格数据 🌈");
};

// 批量添加用户
const dialogRef = ref();
const batchAdd = () => {
	let params = {
		title: "用户",
		tempApi: exportUserInfo,
		importApi: BatchAddUser,
		getTableList
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
		apiUrl: title === "新增" ? addUser : title === "编辑" ? editUser : "",
		getTableList
	};
	drawerRef.value.acceptParams(params);
};
</script>
