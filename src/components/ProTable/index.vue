<template>
	<div class="table-box">
		<!-- 查询表单 -->
		<SearchForm
			:search="search"
			:reset="reset"
			:searchParam="searchParam"
			:columns="searchColumns"
			v-show="isShowSearch"
		></SearchForm>
		<!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader" :ids="selectedListIds" :isSelected="isSelected"></slot>
			</div>
			<div class="header-button-ri" v-if="toolButton">
				<el-tooltip effect="dark" content="刷新" placement="top">
					<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
				</el-tooltip>
				<el-tooltip effect="dark" content="列显隐" placement="top">
					<el-button :icon="Operation" circle> </el-button>
				</el-tooltip>
				<el-tooltip effect="dark" content="搜索显隐" placement="top">
					<el-button :icon="Search" circle @click="isShowSearch = !isShowSearch"> </el-button>
				</el-tooltip>
			</div>
		</div>
		<!-- 表格主体 -->
		<el-table
			height="575"
			:data="tableData"
			:border="border"
			@selection-change="selectionChange"
			:row-key="getRowKeys"
			:stripe="stripe"
		>
			<template v-for="item in columns">
				<!-- selection || index -->
				<el-table-column
					v-if="item.type == 'selection' || item.type == 'index'"
					:type="item.type"
					:reserve-selection="item.type == 'selection'"
					:label="item.label"
					:width="item.width"
					:fixed="item.fixed"
				>
				</el-table-column>
				<!-- expand（展开查看详情，请使用作用域插槽） -->
				<el-table-column
					v-if="item.type == 'expand'"
					:type="item.type"
					:label="item.label"
					:width="item.width"
					:fixed="item.fixed"
					#default="scope"
				>
					<slot :name="item.type" :row="scope.row"></slot>
				</el-table-column>
				<!-- other -->
				<el-table-column
					v-if="item.prop && !item.type"
					:prop="item.prop"
					:label="item.label"
					:width="item.width"
					:sortable="item.sortable"
					:show-overflow-tooltip="true"
					:resizable="true"
					:fixed="item.fixed"
					#default="scope"
				>
					<!-- 自定义配置每一列 slot（作用域插槽） -->
					<slot :name="item.prop" :row="scope.row">
						<!-- 图片(自带预览) -->
						<el-image
							v-if="item.image"
							:src="scope.row[item.prop!]"
							:preview-src-list="[scope.row[item.prop!]]"
							fit="cover"
							class="table-image"
							preview-teleported
						/>
						<!-- tag 标签（自带格式化） -->
						<el-tag v-else-if="item.tag" :type="filterEnum(scope.row[item.prop!],item.enum,'tag')">
							{{ item.enum?.length ? filterEnum(scope.row[item.prop!],item.enum): defaultFormat(0,0,scope.row[item.prop!]) }}
						</el-tag>
						<!-- 文字（自带格式化） -->
						<span v-else>
							{{ item.enum?.length ? filterEnum(scope.row[item.prop!],item.enum): defaultFormat(0,0,scope.row[item.prop!]) }}
						</span>
					</slot>
				</el-table-column>
			</template>
			<template #empty>
				<div class="table-empty">
					<img src="@/assets/images/notData.png" alt="notData" />
					<div>暂无数据</div>
				</div>
			</template>
		</el-table>
		<!-- 分页 -->
		<Pagination
			v-if="pagination"
			:pageable="pageable"
			:handleSizeChange="handleSizeChange"
			:handleCurrentChange="handleCurrentChange"
		></Pagination>
	</div>
</template>

<script setup lang="ts" name="proTable">
import { ref, onMounted } from "vue";
import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";
import { Refresh, Operation, Search } from "@element-plus/icons-vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { filterEnum, defaultFormat } from "@/utils/util";
import SearchForm from "@/components/SearchForm/index.vue";
import Pagination from "@/components/Pagination/index.vue";

// 是否显示搜索模块
const isShowSearch = ref<boolean>(true);

interface ProTableProps {
	columns: Partial<ColumnProps>[]; // 列配置项
	requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean; // 表格是否显示边框 ==> 非必传（默认为true）
	stripe?: boolean; // 是否带斑马纹表格 ==> 非必传（默认为false）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	childrenName?: string; // 当数据存在 children 时，指定 children key 名字 ==> 非必传（默认为"children"）
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	pagination: true,
	initParam: {},
	border: true,
	stripe: false,
	toolButton: true,
	childrenName: "children"
});

// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedListIds, isSelected } = useSelection();

// 表格操作 Hooks
const { tableData, pageable, searchParam, initSearchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(props.requestApi, props.initParam, props.pagination);

// 过滤需要搜索的配置项
const searchColumns = props.columns.filter(item => item.search);

// 设置搜索表单的默认值
searchColumns.forEach(column => {
	if (column.initSearchParam !== undefined && column.initSearchParam !== null) {
		initSearchParam.value[column.prop!] = column.initSearchParam;
		searchParam.value[column.prop!] = column.initSearchParam;
	}
});

// 获取表格数据
onMounted(() => {
	getTableList();
});

// 暴露给父组件的参数和方法
defineExpose({ searchParam, refresh: getTableList });
</script>
