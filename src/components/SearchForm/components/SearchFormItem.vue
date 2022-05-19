<template>
	<!-- 文本框 -->
	<template v-if="item.searchType == undefined || item.searchType == 'text'">
		<el-input v-model="searchParam[item.prop!]" placeholder="请输入" :clearable="clearable(item)"></el-input>
	</template>
	<!-- 下拉选择框 -->
	<template v-if="item.searchType == 'select' || item.searchType == 'multipleSelect'">
		<el-select
			v-model="searchParam[item.prop!]"
			:multiple="item.searchType == 'multipleSelect'"
			placeholder="请选择"
			:clearable="clearable(item)"
		>
			<el-option
				v-for="itemValue in item.enum"
				:key="itemValue.value"
				:label="itemValue.label"
				:value="itemValue.value"
				:disabled="itemValue.disabled"
			/>
		</el-select>
	</template>
	<!-- 下拉树形选择框 -->
	<template v-if="item.searchType == 'treeSelect' || item.searchType == 'multipleTreeSelect'">
		<el-tree-select v-model="searchParam[item.prop!]" :multiple="item.searchType == 'multipleTreeSelect'" :data="item.enum" />
	</template>
	<!-- 日期选择 -->
	<template v-if="item.searchType == 'date'">
		<el-date-picker
			v-model="searchParam[item.prop!]"
			value-format="YYYY-MM-DD"
			type="date"
			placeholder="请选择日期"
			:clearable="clearable(item)"
		/>
	</template>
	<!-- 时间范围选择 -->
	<template v-if="item.searchType == 'timerange'">
		<el-time-picker
			v-model="searchParam[item.prop!]"
			is-range
			value-format="HH:mm:ss"
			range-separator="至"
			start-placeholder="开始时间"
			end-placeholder="结束时间"
			:clearable="clearable(item)"
		/>
	</template>
	<!-- 日期范围选择 -->
	<template v-if="item.searchType == 'daterange'">
		<el-date-picker
			v-model="searchParam[item.prop!]"
			type="daterange"
			value-format="YYYY-MM-DD"
			range-separator="至"
			start-placeholder="开始时间"
			end-placeholder="结束时间"
			:clearable="clearable(item)"
		/>
	</template>
	<!-- 日期时间范围选择 -->
	<template v-if="item.searchType == 'datetimerange'">
		<el-date-picker
			v-model="searchParam[item.prop!]"
			type="datetimerange"
			value-format="YYYY-MM-DD HH:mm:ss"
			range-separator="至"
			start-placeholder="开始时间"
			end-placeholder="结束时间"
			:clearable="clearable(item)"
		/>
	</template>
</template>

<script setup lang="ts" name="searchFormItem">
import { ColumnProps } from "@/components/ProTable/interface";

interface SearchFormItem {
	item: Partial<ColumnProps>; // 具体每一个搜索项的配置
	searchParam: any; // 搜索参数
}

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = (item: Partial<ColumnProps>) => {
	return item.initSearchParam == null || item.initSearchParam == undefined;
};

defineProps<SearchFormItem>();
</script>
