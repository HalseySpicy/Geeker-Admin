<template>
	<div class="table-box">
		<div class="table-search">
			<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
				<el-form-item label="管理员姓名 :">
					<el-input v-model="searchParam.opRealName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="管理员账号 :">
					<el-input v-model="searchParam.opUsername" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="IP地址 :">
					<el-input v-model="searchParam.ip" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="操作内容 :">
					<el-input v-model="searchParam.opContent" placeholder="请输入"></el-input>
				</el-form-item>
				<div class="more-item" v-show="searchShow">
					<el-form-item label="创建时间 :">
						<el-date-picker
							v-model="searchParam.daterange"
							type="datetimerange"
							value-format="YYYY-MM-DD HH:mm:ss"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
						/>
					</el-form-item>
				</div>
			</el-form>
			<div class="search-operation">
				<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
				<el-button :icon="Delete" @click="reset">重置</el-button>
				<el-button type="text" class="search-isOpen" @click="searchShow = !searchShow">
					{{ searchShow ? "合并" : "展开" }}
					<el-icon class="isOpen-icon" v-show="!searchShow">
						<arrow-down />
					</el-icon>
					<el-icon class="isOpen-icon" v-show="searchShow">
						<arrow-up />
					</el-icon>
				</el-button>
			</div>
		</div>
		<div class="table-header clearfix">
			<div class="header-button">
				<el-button type="primary" :icon="CirclePlus">新增用户</el-button>
				<el-button type="primary" :icon="Download" plain @click="downloadFile">导出系统日志</el-button>
			</div>
			<el-tooltip effect="dark" content="刷新" placement="top">
				<el-button class="refresh" :icon="Refresh" circle @click="getTableList"> </el-button>
			</el-tooltip>
		</div>
		<el-table height="575" :data="tableData" border>
			<el-table-column type="selection" width="100" />
			<el-table-column
				prop="opRealName"
				label="管理员姓名"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				prop="opUsername"
				label="管理员账号"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column prop="ip" label="IP地址" :formatter="defaultFormat" show-overflow-tooltip></el-table-column>
			<el-table-column
				prop="opContent"
				label="操作内容"
				:formatter="defaultFormat"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column label="操作" width="300px">
				<template #default="scope">
					<el-button type="text" :icon="View">编辑</el-button>
					<el-button type="text" :icon="Edit">编辑</el-button>
					<el-button type="text" :icon="Delete" @click="deleteSysLog()">删除</el-button>
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
	</div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { Refresh, CirclePlus, Delete, Search, Edit, Download, View } from "@element-plus/icons-vue";
import { downLoadSystemLog, getSystemLog } from "@/api/modules/system";
import { useDownload } from "@/hooks/useDownload";
import { useHandleData } from "@/hooks/useHandleData";
import { useTable } from "@/hooks/useTable";

const {
	tableData,
	searchShow,
	pageable,
	searchParam,
	getTableList,
	search,
	reset,
	handleSizeChange,
	handleCurrentChange,
	defaultFormat
} = useTable(getSystemLog);

onMounted(() => {
	// 获取表格数据
	getTableList();
});

// 删除日志
const deleteSysLog = () => {
	useHandleData();
};

// 导出系统日志
const downloadFile = () => {
	useDownload(downLoadSystemLog, "系统日志", searchParam.value);
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
