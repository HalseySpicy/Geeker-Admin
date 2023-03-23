<!-- 📚📚📚 Pro-Table 文档: https://juejin.cn/post/7166068828202336263 -->

<template>
	<!-- 查询表单 card -->
	<SearchForm
		:search="search"
		:reset="reset"
		:searchParam="searchParam"
		:columns="searchColumns"
		:searchCol="searchCol"
		v-show="isShowSearch"
	/>

	<!-- 表格内容 card -->
	<div class="card table-main">
		<!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader" :selectedListIds="selectedListIds" :selectedList="selectedList" :isSelected="isSelected" />
			</div>
			<div class="header-button-ri">
				<slot name="toolButton">
					<el-button :icon="Refresh" circle @click="getTableList" />
					<el-button :icon="Printer" circle v-if="columns.length" @click="handlePrint" />
					<el-button :icon="Operation" circle v-if="columns.length" @click="openColSetting" />
					<el-button :icon="Search" circle v-if="searchColumns.length" @click="isShowSearch = !isShowSearch" />
				</slot>
			</div>
		</div>
		<!-- 表格主体 -->
		<el-table
			ref="tableRef"
			v-bind="$attrs"
			:data="tableData"
			:border="border"
			:row-key="rowKey"
			@selection-change="selectionChange"
		>
			<!-- 默认插槽 -->
			<slot></slot>
			<template v-for="item in tableColumns" :key="item">
				<!-- selection || index -->
				<el-table-column
					v-bind="item"
					:align="item.align ?? 'center'"
					:reserve-selection="item.type == 'selection'"
					v-if="item.type == 'selection' || item.type == 'index'"
				>
				</el-table-column>
				<!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
				<el-table-column v-bind="item" :align="item.align ?? 'center'" v-if="item.type == 'expand'" v-slot="scope">
					<component :is="item.render" :row="scope.row" v-if="item.render"> </component>
					<slot :name="item.type" :row="scope.row" v-else></slot>
				</el-table-column>
				<!-- other 循环递归 -->
				<TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
					<template v-for="slot in Object.keys($slots)" #[slot]="scope">
						<slot :name="slot" :row="scope.row"></slot>
					</template>
				</TableColumn>
			</template>
			<!-- 插入表格最后一行之后的插槽 -->
			<template #append>
				<slot name="append"> </slot>
			</template>
			<!-- 表格无数据情况 -->
			<template #empty>
				<div class="table-empty">
					<slot name="empty">
						<img src="@/assets/images/notData.png" alt="notData" />
						<div>暂无数据</div>
					</slot>
				</div>
			</template>
		</el-table>
		<!-- 分页组件 -->
		<slot name="pagination">
			<Pagination
				v-if="pagination"
				:pageable="pageable"
				:handleSizeChange="handleSizeChange"
				:handleCurrentChange="handleCurrentChange"
			/>
		</slot>
	</div>
	<!-- 列设置 -->
	<ColSetting v-if="toolButton" ref="colRef" v-model:colSetting="colSetting" />
</template>

<script setup lang="ts" name="ProTable">
import { ref, watch, computed, provide, onMounted } from "vue";
import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";
import { BreakPoint } from "@/components/Grid/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import { ElTable, TableProps } from "element-plus";
import { Refresh, Printer, Operation, Search } from "@element-plus/icons-vue";
import { filterEnum, formatValue, handleProp, handleRowAccordingToProp } from "@/utils/util";
import SearchForm from "@/components/SearchForm/index.vue";
import Pagination from "./components/Pagination.vue";
import ColSetting from "./components/ColSetting.vue";
import TableColumn from "./components/TableColumn.vue";
import printJS from "print-js";

interface ProTableProps extends Partial<Omit<TableProps<any>, "data">> {
	columns: ColumnProps[]; // 列配置项
	requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
	requestAuto?: boolean;
	dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
	title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
	searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	requestAuto: true,
	columns: () => [],
	pagination: true,
	initParam: {},
	border: true,
	toolButton: true,
	rowKey: "id",
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
});

// 是否显示搜索模块
const isShowSearch = ref(true);

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();

// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);

// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback);

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();

// 初始化请求
onMounted(() => props.requestAuto && getTableList());

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true });

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns);

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
provide("enumMap", enumMap);
const setEnumMap = async (col: ColumnProps) => {
	if (!col.enum) return;
	// 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
	if (typeof col.enum !== "function") return enumMap.value.set(col.prop!, col.enum!);
	const { data } = await col.enum();
	enumMap.value.set(col.prop!, data);
};

// 扁平化 columns
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
	columns.forEach(async col => {
		if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
		flatArr.push(col);

		// 给每一项 column 添加 isShow && isFilterEnum 默认属性
		col.isShow = col.isShow ?? true;
		col.isFilterEnum = col.isFilterEnum ?? true;

		// 设置 enumMap
		setEnumMap(col);
	});
	return flatArr.filter(item => !item._children?.length);
};

// flatColumns
const flatColumns = ref<ColumnProps[]>();
flatColumns.value = flatColumnsFunc(tableColumns.value);

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter(item => item.search?.el);

// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
searchColumns.forEach((column, index) => {
	column.search!.order = column.search!.order ?? index + 2;
	if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
		searchInitParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue;
		searchParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue;
	}
});

// 排序搜索表单项
searchColumns.sort((a, b) => a.search!.order! - b.search!.order!);

// 列设置 ==> 过滤掉不需要设置显隐的列
const colRef = ref();
const colSetting = tableColumns.value!.filter(
	item => !["selection", "index", "expand"].includes(item.type!) && item.prop !== "operation"
);
const openColSetting = () => colRef.value.openColSetting();

// 🙅‍♀️ 不需要打印可以把以下方法删除（目前数据处理比较复杂 209-246）
// 处理打印数据（把后台返回的值根据 enum 做转换）
const printData = computed(() => {
	const printDataList = JSON.parse(JSON.stringify(selectedList.value.length ? selectedList.value : tableData.value));
	// 找出需要转换数据的列（有 enum || 多级 prop && 需要根据 enum 格式化）
	const needTransformCol = flatColumns.value!.filter(
		item => (item.enum || (item.prop && item.prop.split(".").length > 1)) && item.isFilterEnum
	);
	needTransformCol.forEach(colItem => {
		printDataList.forEach((tableItem: { [key: string]: any }) => {
			tableItem[handleProp(colItem.prop!)] =
				colItem.prop!.split(".").length > 1 && !colItem.enum
					? formatValue(handleRowAccordingToProp(tableItem, colItem.prop!))
					: filterEnum(handleRowAccordingToProp(tableItem, colItem.prop!), enumMap.value.get(colItem.prop!), colItem.fieldNames);
			for (const key in tableItem) {
				if (tableItem[key] === null) tableItem[key] = formatValue(tableItem[key]);
			}
		});
	});
	return printDataList;
});

// 打印表格数据（💥 多级表头数据打印时，只能扁平化成一维数组，printJs 不支持多级表头打印）
const handlePrint = () => {
	const header = `<div style="text-align: center"><h2>${props.title}</h2></div>`;
	const gridHeaderStyle = "border: 1px solid #ebeef5;height: 45px;color: #232425;text-align: center;background-color: #fafafa;";
	const gridStyle = "border: 1px solid #ebeef5;height: 40px;color: #494b4e;text-align: center";
	printJS({
		printable: printData.value,
		header: props.title && header,
		properties: flatColumns
			.value!.filter(item => !["selection", "index", "expand"].includes(item.type!) && item.isShow && item.prop !== "operation")
			.map((item: ColumnProps) => ({ field: handleProp(item.prop!), displayName: item.label })),
		type: "json",
		gridHeaderStyle,
		gridStyle
	});
};

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
	element: tableRef,
	tableData,
	searchParam,
	pageable,
	getTableList,
	reset,
	clearSelection,
	enumMap,
	isSelected,
	selectedList,
	selectedListIds
});
</script>
