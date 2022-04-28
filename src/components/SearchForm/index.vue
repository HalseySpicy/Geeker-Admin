<template>
	<div class="table-search">
		<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
			<el-form-item label="用户姓名 :">
				<el-input v-model="searchParam.username" placeholder="请输入" clearable></el-input>
			</el-form-item>
			<!-- <el-form-item label="性别 :">
				<el-select v-model="searchParam.gender" placeholder="请选择" clearable>
					<el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item> -->
			<el-form-item label="身份证号 :">
				<el-input v-model="searchParam.idCard" placeholder="请输入" clearable></el-input>
			</el-form-item>
			<el-form-item label="身份证号 :">
				<el-input v-model="searchParam.idCard" placeholder="请输入" clearable></el-input>
			</el-form-item>
			<el-form-item label="邮箱 :">
				<el-input v-model="searchParam.email" placeholder="请输入" clearable></el-input>
			</el-form-item>
			<!-- <div class="more-item" v-show="searchShow">
				<el-form-item label="创建时间 :">
					<el-date-picker
						v-model="searchParam.createTime"
						type="datetimerange"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						value-format="YYYY-MM-DD HH:mm:ss"
					/>
				</el-form-item>
			</div> -->
		</el-form>
		<div class="search-operation">
			<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
			<el-button :icon="Delete" @click="reset">重置</el-button>
			<el-button type="text" class="search-isOpen" @click="switchSearchShow" v-if="columns.length > 4">
				{{ searchShow ? "合并" : "展开" }}
				<el-icon class="el-icon--right">
					<component :is="searchShow ? ArrowUp : ArrowDown"></component>
				</el-icon>
			</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="searchForm">
import { Delete, Search, ArrowDown, ArrowUp } from "@element-plus/icons-vue";

interface ProTableProps {
	columns: any[];
	searchParam: any; // 搜索参数
	searchShow: boolean; // 搜索框是否展开
	search(): void; // 搜索
	reset(): void; // 重置
	switchSearchShow(): void; // 展开/合并搜索框
}

withDefaults(defineProps<ProTableProps>(), {
	columns: () => []
});
</script>
