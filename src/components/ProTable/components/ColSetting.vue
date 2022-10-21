<template>
	<!-- 列设置 -->
	<el-drawer title="列设置" v-model="drawerVisible" size="400px">
		<div class="table">
			<el-table :data="colSetting" :border="true">
				<!-- <el-table-column prop="name" align="center" label="排序">
					<el-tag style="cursor: move">
						<el-icon style="cursor: move"><DCaret /></el-icon>
					</el-tag>
				</el-table-column> -->
				<el-table-column prop="label" align="center" label="列名" />
				<el-table-column prop="name" align="center" label="显示" v-slot="scope">
					<el-switch v-model="scope.row.isShow"></el-switch>
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
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";

defineProps<{ colSetting: Partial<ColumnProps>[]; tableRef: any }>();

const drawerVisible = ref<boolean>(false);
// 打开列设置
const openColSetting = () => {
	drawerVisible.value = true;
};

defineExpose({
	openColSetting
});
</script>
