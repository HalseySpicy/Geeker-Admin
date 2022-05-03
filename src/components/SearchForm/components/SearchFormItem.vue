<template>
	<template v-if="item.searchType == undefined || item.searchType == 'text'">
		<el-input
			v-model="searchParam[item.prop!]"
			placeholder="请输入"
			:clearable="item.initSearchParam == null || item.initSearchParam == undefined"
		></el-input>
	</template>
	<template v-if="item.searchType == 'select' || item.searchType == 'multipleSelect'">
		<el-select
			v-model="searchParam[item.prop!]"
			:multiple="item.searchType == 'multipleSelect'"
			placeholder="请选择"
			:clearable="item.initSearchParam == null || item.initSearchParam == undefined"
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
	<template v-if="item.searchType == 'treeSelect' || item.searchType == 'multipleTreeSelect'">
		<el-tree-select v-model="searchParam[item.prop!]" :multiple="item.searchType == 'multipleTreeSelect'" :data="item.enum" />
	</template>
	<template v-if="item.searchType == 'date'">
		<el-date-picker
			v-model="searchParam[item.prop!]"
			value-format="YYYY-MM-DD"
			type="date"
			placeholder="请选择日期"
			:clearable="item.initSearchParam == null || item.initSearchParam == undefined"
		/>
	</template>
	<template v-if="item.searchType == 'timerange'">
		<el-time-picker
			v-model="searchParam[item.prop!]"
			is-range
			value-format="YYYY-MM-DD HH:mm:ss"
			range-separator="至"
			start-placeholder="开始时间"
			end-placeholder="结束时间"
			:clearable="item.initSearchParam == null || item.initSearchParam == undefined"
		/>
	</template>
	<template v-if="item.searchType == 'datetimerange'">
		<el-date-picker
			v-model="searchParam[item.prop!]"
			type="datetimerange"
			value-format="YYYY-MM-DD HH:mm:ss"
			range-separator="至"
			start-placeholder="开始时间"
			end-placeholder="结束时间"
			:clearable="item.initSearchParam == null || item.initSearchParam == undefined"
		/>
	</template>
</template>

<script setup lang="ts" name="searchFormItem">
import { ColumnProps } from "@/components/ProTable/interface";

interface SearchFormItem {
	item: Partial<ColumnProps>; // 具体每一个搜索项的配置
	searchParam: any; // 搜索参数
}

defineProps<SearchFormItem>();
</script>
