<!-- Pro-Table 文档: https://juejin.cn/post/7094890833064755208 -->
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
				<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
				<el-button :icon="Operation" circle @click="openColSetting"> </el-button>
				<el-button :icon="Search" circle v-if="searchColumns.length" @click="isShowSearch = !isShowSearch"> </el-button>
			</div>
		</div>
		<!-- 表格主体 -->
		<el-table
			height="575"
			ref="tableRef"
			:data="tableData"
			:border="border"
			@selection-change="selectionChange"
			:row-key="getRowKeys"
			:stripe="stripe"
			:tree-props="{ children: childrenName }"
		>
			<template v-for="item in tableColumns" :key="item">
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
					v-slot="scope"
				>
					<slot :name="item.type" :row="scope.row"></slot>
				</el-table-column>
				<!-- other -->
				<el-table-column
					v-if="!item.type && item.prop && item.isShow"
					:prop="item.prop"
					:label="item.label"
					:width="item.width"
					:sortable="item.sortable"
					:show-overflow-tooltip="item.prop !== 'operation'"
					:resizable="true"
					:fixed="item.fixed"
				>
					<!-- 自定义 header (使用组件渲染 tsx 语法) -->
					<template #header v-if="item.renderHeader">
						<component :is="item.renderHeader" :row="item"> </component>
					</template>

					<!-- 自定义配置每一列 slot（使用作用域插槽） -->
					<template #default="scope">
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
							<!-- tag 标签（自带格式化内容） -->
							<el-tag v-else-if="item.tag" :type="filterEnum(scope.row[item.prop!],item.enum,'tag')">
								{{ item.enum?.length ? filterEnum(scope.row[item.prop!],item.enum): defaultFormat(0,0,scope.row[item.prop!]) }}
							</el-tag>
							<!-- 文字（自带格式化内容） -->
							<span v-else>
								{{ item.enum?.length ? filterEnum(scope.row[item.prop!],item.enum): defaultFormat(0,0,scope.row[item.prop!]) }}
							</span>
						</slot>
					</template>
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
		<!-- 列设置 -->
		<ColSetting v-if="toolButton" ref="colRef" :tableRef="tableRef" :colSetting="colSetting"></ColSetting>
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
import ColSetting from "./components/ColSetting.vue";

// 表格 DOM 元素
const tableRef = ref();

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

// 表格列配置项处理（添加 isShow 属性，控制显示/隐藏）
const tableColumns = ref<Partial<ColumnProps>[]>();
tableColumns.value = props.columns.map(item => {
	return {
		...item,
		isShow: true
	};
});

// 过滤需要搜索的配置项
const searchColumns = props.columns.filter(item => item.search);

// 设置搜索表单的默认值
searchColumns.forEach(column => {
	if (column.initSearchParam !== undefined && column.initSearchParam !== null) {
		initSearchParam.value[column.prop!] = column.initSearchParam;
		searchParam.value[column.prop!] = column.initSearchParam;
	}
});

// * 列设置
const colRef = ref();
// 过滤掉不需要设置显隐的列
const colSetting = tableColumns.value.filter((item: Partial<ColumnProps>) => {
	return item.type !== "selection" && item.type !== "index" && item.type !== "expand" && item.prop !== "operation";
});
const openColSetting = () => {
	colRef.value.openColSetting();
};

// 获取表格数据
onMounted(() => {
	getTableList();
});

// 暴露给父组件的参数和方法
defineExpose({ searchParam, refresh: getTableList });
</script>
