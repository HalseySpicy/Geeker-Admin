<template>
	<div class="table-box">
		<div class="table-search">
			<el-form ref="formRef" :model="searchForm" :inline="true" label-width="100px">
				<el-form-item label="管理员姓名 :">
					<el-input v-model="searchForm.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="管理员账号 :">
					<el-input v-model="searchForm.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="IP地址 :">
					<el-input v-model="searchForm.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="操作内容 :">
					<el-select v-model="searchForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai"></el-option>
						<el-option label="Zone two" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<div class="more-item" v-show="searchShow">
					<el-form-item label="IP地址 :">
						<el-input v-model="searchForm.name" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="创建时间 :">
						<el-date-picker
							v-model="searchForm.name"
							type="daterange"
							start-placeholder="Start Date"
							end-placeholder="End Date"
						/>
					</el-form-item>
				</div>
			</el-form>
			<div class="search-operation">
				<el-button type="primary" :icon="Search">搜索</el-button>
				<el-button :icon="Delete">重置</el-button>
				<el-button type="text" class="search-isOpen" @click="searchShow = !searchShow">
					{{ searchShow ? "合并" : "展开" }}
					<el-icon class="isOpen-icon" v-show="!searchShow"><arrow-down /></el-icon>
					<el-icon class="isOpen-icon" v-show="searchShow"><arrow-up /></el-icon>
				</el-button>
			</div>
		</div>
		<div class="table-header clearfix">
			<div class="header-button">
				<el-button type="primary" :icon="CirclePlus">新增用户</el-button>
				<el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
			</div>
			<el-tooltip effect="dark" content="刷新" placement="top">
				<el-button class="refresh" :icon="Refresh" circle @click="getTableList"></el-button>
			</el-tooltip>
		</div>
		<el-table height="575" :data="tableData" border>
			<el-table-column prop="opRealName" label="管理员姓名" show-overflow-tooltip> </el-table-column>
			<el-table-column prop="opUsername" label="管理员账号" show-overflow-tooltip></el-table-column>
			<el-table-column prop="opContent" label="操作内容" show-overflow-tooltip> </el-table-column>
			<el-table-column label="操作" width="400px">
				<template #default="scope">
					<el-button type="text" :icon="Edit">编辑</el-button>
					<el-button type="text" :icon="Delete">删除</el-button>
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
			v-model:currentPage="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[10, 25, 50, 100]"
			background
			layout="total, sizes, prev, pager, next, jumper"
			:total="100"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		>
		</el-pagination>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useDownload } from "@/hooks/useDownload";
import { downLoadSystemLog, getSystemLog } from "@/api/modules/system";
import { Refresh, CirclePlus, Delete, Search, Edit, Download } from "@element-plus/icons-vue";
import { useTable } from "@/hooks/useTable";
const searchForm = reactive({
	name: "",
	region: ""
});
let tableData = ref<any[]>([]);
const searchShow = ref<boolean>(false);

onMounted(() => {
	getTableList();
});

// 获取表格数据
const getTableList = async () => {
	const res = await getSystemLog({});
	tableData.value = res.data.datalist;
};

// 下载文件
const downloadFile = () => {
	useDownload(downLoadSystemLog, "用户信息");
};

const currentPage = ref(1);
const pageSize = ref(10);

const handleSizeChange = (val: number) => {
	console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
	console.log(`current page: ${val}`);
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
