<template>
	<!-- 列显隐设置 -->
	<el-drawer title="列设置" v-model="drawerVisible" size="400">
		<div class="table-box">
			<el-table :data="colSetting" :border="true">
				<el-table-column prop="label" label="列名" width="180" />
				<el-table-column prop="name" label="显示" width="180" v-slot="scope">
					<el-switch v-model="scope.row.isShow" @change="switchShow"></el-switch>
				</el-table-column>
				<template #empty>
					<div class="table-empty">
						<img src="@/assets/images/notData.png" alt="notData" />
						<div>暂无数据</div>
					</div>
				</template>
			</el-table>
		</div>
	</el-drawer>
</template>

<script setup lang="ts" name="colSetting">
import { ref, nextTick } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";

const props = defineProps<{ colSetting: Partial<ColumnProps>[]; tableRef: any }>();

const drawerVisible = ref<boolean>(false);
// 打开列设置
const openColSetting = (): void => {
	drawerVisible.value = true;
};

// 列显隐时重新布局 table
const switchShow = () => {
	nextTick(() => {
		props.tableRef.doLayout();
	});
};

defineExpose({
	openColSetting
});
</script>
