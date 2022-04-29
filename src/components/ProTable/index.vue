<template>
	<div class="table-box">
		<SearchForm :search="search" :reset="reset" :searchParam="searchParam" :columns="searchColumns"></SearchForm>
		<div class="table-header">
			<div class="header-button">
				<slot name="tableHeader" :ids="selectedListIds" :isSelected="isSelected"></slot>
			</div>
			<el-tooltip effect="dark" content="刷新" placement="top">
				<el-button class="refresh" :icon="Refresh" circle @click="getTableList"> </el-button>
			</el-tooltip>
		</div>
		<el-table height="575" :data="tableData" :border="true" @selection-change="selectionChange" :row-key="getRowKeys">
			<template v-for="item in columns">
				<el-table-column
					v-if="item.type == 'selection'"
					:type="item.type"
					reserve-selection
					:width="item.width"
				></el-table-column>
				<el-table-column
					v-if="item.type == 'index'"
					:type="item.type"
					:label="item.label"
					:width="item.width"
				></el-table-column>
				<el-table-column
					v-if="item.prop && !item.type"
					:prop="item.prop"
					:label="item.label"
					:width="item.width"
					:show-overflow-tooltip="true"
					:resizable="true"
					#default="scope"
				>
					<!-- 自定义配置每一列 slot -->
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
						<!-- 文字(自带格式化) -->
						<span v-else>
							{{ item.enum?.length ? filterEnum(scope.row[item.prop!],item.enum): scope.row[item.prop!] }}
						</span>
					</slot>
				</el-table-column>
			</template>
			<!-- 操作 slot -->
			<el-table-column fixed="right" label="操作" #default="scope" :width="operationWidth">
				<slot name="operation" :row="scope.row"></slot>
			</el-table-column>
			<template #empty>
				<div class="table-empty">
					<img src="@/assets/images/notData.png" alt="notData" />
					<div>暂无数据</div>
				</div>
			</template>
		</el-table>
		<Pagination
			v-if="pagination"
			:pageable="pageable"
			:handleSizeChange="handleSizeChange"
			:handleCurrentChange="handleCurrentChange"
		></Pagination>
	</div>
</template>

<script setup lang="ts" name="proTable">
import { onMounted } from "vue";
import { Refresh } from "@element-plus/icons-vue";
import { filterEnum } from "@/utils/util";
import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";
import { ColumnProps } from "@/components/ProTable/interface";
import SearchForm from "@/components/SearchForm/index.vue";
import Pagination from "@/components/Pagination/index.vue";

interface ProTableProps {
	columns: Partial<ColumnProps>[]; // 列配置项
	requestApi: (params: any) => Promise<any>; // 请求表格数据的api
	pagination?: boolean; // 是否需要分页组件
	initParam?: any; // 初始化请求参数
	operationWidth?: string; // 操作列宽
}

const props = withDefaults(defineProps<ProTableProps>(), {
	tableData: () => [],
	columns: () => [],
	pagination: true,
	initParam: {},
	operationWidth: "250"
});

const { selectionChange, getRowKeys, selectedListIds, isSelected } = useSelection();

const { tableData, pageable, searchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(props.requestApi, props.initParam, props.pagination);

// 过滤需要搜索的字段
const searchColumns = props.columns.filter(item => item.search);

onMounted(() => {
	getTableList();
});

// 暴露刷新方法给父组件
defineExpose({ refresh: getTableList });
</script>
