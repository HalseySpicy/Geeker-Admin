<template>
	<div class="card filter">
		<el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
		<el-scrollbar>
			<el-tree
				ref="treeRef"
				default-expand-all
				:node-key="id"
				:data="treeData"
				:current-node-key="''"
				:highlight-current="true"
				:expand-on-click-node="false"
				:props="defaultProps"
				:filter-node-method="filterNode"
				@node-click="handleNodeClick"
			/>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="treeFilter">
import { ref, watch, onBeforeMount } from "vue";
import { ElTree } from "element-plus";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
	requestApi: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 必传
	id?: string; // 选择的id ==> 非必传，默认为 “id”
	label?: string; // 显示的label ==> 非必传，默认为 “label”
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
	id: "id",
	label: "label"
});

const defaultProps = {
	children: "children",
	label: props.label
};

const filterText = ref<string>("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);

onBeforeMount(async () => {
	const { data } = await props.requestApi();
	treeData.value = [{ id: "", [props.label]: "全部" }, ...data];
});

watch(filterText, val => {
	treeRef.value!.filter(val);
});

const filterNode = (value: string, data: { [key: string]: any }) => {
	if (!value) return true;
	return data[props.label].includes(value);
};

interface FilterEmits {
	(e: "change", value: string): void;
}
const emit = defineEmits<FilterEmits>();
const handleNodeClick = (data: { [key: string]: any }) => {
	emit("change", data[props.id]);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
