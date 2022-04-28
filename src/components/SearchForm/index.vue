<template>
	<div class="table-search" v-if="columns.length">
		<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
			<template v-for="item in columns.slice(0, 4)">
				<el-form-item :label="`${item.label} :`">
					<el-input v-model="searchParam[item.prop]" placeholder="请输入" clearable></el-input>
				</el-form-item>
			</template>
			<div class="more-item" v-show="searchShow" v-if="columns.length > 4">
				<template v-for="item in columns.slice(4)">
					<el-form-item :label="`${item.label} :`">
						<el-input v-model="searchParam[item.prop]" placeholder="请输入" clearable></el-input>
					</el-form-item>
				</template>
			</div>
		</el-form>
		<div class="search-operation">
			<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
			<el-button :icon="Delete" @click="reset">重置</el-button>
			<el-button type="text" class="search-isOpen" @click="searchShow = !searchShow" v-if="columns.length > 4">
				{{ searchShow ? "合并" : "展开" }}
				<el-icon class="el-icon--right">
					<component :is="searchShow ? ArrowUp : ArrowDown"></component>
				</el-icon>
			</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="searchForm">
import { ref } from "vue";
import { Delete, Search, ArrowDown, ArrowUp } from "@element-plus/icons-vue";

const searchShow = ref(false);

interface ProTableProps {
	columns: any[];
	searchParam: any; // 搜索参数
	search(): void; // 搜索
	reset(): void; // 重置
}

const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	searchParam: {}
});

console.log(props.columns);
</script>
