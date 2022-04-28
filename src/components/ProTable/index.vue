<template>
	<div class="table-box">
		<div class="table-header">
			<div class="header-button">
				<slot name="tableHeader"></slot>
			</div>
			<el-tooltip effect="dark" content="刷新" placement="top">
				<el-button class="refresh" :icon="Refresh" circle> </el-button>
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
						<!-- 图片 -->
						<el-image
							v-if="item.image"
							:src="scope.row[item.prop!]"
							:preview-src-list="[scope.row[item.prop!]]"
							fit="cover"
							class="table-image"
							preview-teleported
						/>
						<!-- 文字格式化 -->
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
			:pageable="pageable"
			:handleSizeChange="handleSizeChange"
			:handleCurrentChange="handleCurrentChange"
		></Pagination>
	</div>
</template>

<script setup lang="ts" name="proTable">
import { filterEnum } from "@/utils/util";
import { Refresh } from "@element-plus/icons-vue";
import Pagination from "@/components/Pagination/index.vue";
import { onMounted } from "vue";
import { useTable } from "@/hooks/useTable";

const { tableData, pageable, getTableList, handleSizeChange, handleCurrentChange } = useTable(getUserList);

onMounted(() => {
	getTableList();
});

interface EnumProps {
	label: string;
	value: any;
}

interface ColumnProps {
	type: string; // index | selection
	prop: string; // 单元格数据（非特殊类型必填）
	label: string; // 单元格标题（非特殊类型必填）
	width: string; // 列宽
	image: boolean; // 是否展示图片
	enum: EnumProps[]; // 枚举类型（渲染值的字典）
}

interface ProTableProps {
	tableData: any[]; // 表格数据
	columns: Partial<ColumnProps>[]; // 列配置
	operationWidth?: string; // 操作列宽
	selectionChange?: (rowArr: any) => void; // 选择框变化时的回调
	getRowKeys?: (row: { id: string }) => string; // 获取行的唯一标识
}

withDefaults(defineProps<ProTableProps>(), {
	tableData: () => [],
	columns: () => [],
	operationWidth: "250"
});
</script>
