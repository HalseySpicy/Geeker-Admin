<template>
	<!-- 列设置 -->
	<el-drawer title="列设置" v-model="drawerVisible" size="450px">
		<div class="table-main">
			<el-table :data="colSetting" :border="true" row-key="prop" default-expand-all :tree-props="{ children: '_children' }">
				<el-table-column prop="label" align="center" label="列名" />
				<el-table-column prop="isShow" align="center" label="显示" v-slot="scope">
					<el-switch v-model="scope.row.isShow"></el-switch>
				</el-table-column>
				<el-table-column prop="sortable" align="center" label="排序" v-slot="scope">
					<el-switch v-model="scope.row.sortable"></el-switch>
				</el-table-column>
				<template #empty>
					<div class="table-empty">
						<img src="@/assets/images/notData.png" alt="notData" />
						<div>暂无可配置列</div>
					</div>
				</template>
			</el-table>
		</div>
	</el-drawer>
</template>

<script setup lang="ts" name="ColSetting">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";

defineProps<{ colSetting: ColumnProps[] }>();

const drawerVisible = ref<boolean>(false);
// 打开列设置
const openColSetting = () => {
	drawerVisible.value = true;
};

defineExpose({
	openColSetting
});
</script>

<style scoped lang="scss">
.cursor-move {
	cursor: move;
}
</style>
