<template>
	<div class="card filter">
		<h4 class="title sle">服务状态：</h4>
		<div class="text">数据上传服务[正常]</div>
		<el-button>检测</el-button>
		<div class="text">金融机构编码：</div>
		<div class="text">xxxxxxxxxxxxx</div>
		<div class="text">网点编码：</div>
		<div class="text">设备状态：</div>
		<div class="box-card">
			<div v-for="o in 4" :key="o" class="text item">{{ "10.202.25.202 " + o }}</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="asideBar">
import { ref, watch, onBeforeMount, nextTick } from "vue";
import { ElTree } from "element-plus";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
	requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
	data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
	title?: string; // treeFilter 标题 ==> 非必传
	id?: string; // 选择的id ==> 非必传，默认为 “id”
	label?: string; // 显示的label ==> 非必传，默认为 “label”
	multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
	defaultValue?: any; // 默认选中的值 ==> 非必传
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
	id: "id",
	label: "label",
	multiple: false
});

const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

const selected = ref();
const setSelected = () => {
	if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
	else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
};

onBeforeMount(async () => {
	setSelected();
	if (props.requestApi) {
		const { data } = await props.requestApi!();
		treeData.value = data;
		treeAllData.value = [{ id: "", [props.label]: "全部" }, ...data];
	}
});

// 使用 nextTick 防止打包后赋值不生效
watch(
	() => props.defaultValue,
	() => nextTick(() => setSelected()),
	{ deep: true, immediate: true }
);

watch(
	() => props.data,
	() => {
		if (props.data?.length) {
			treeData.value = props.data;
			treeAllData.value = [{ id: "", [props.label]: "全部" }, ...props.data];
		}
	},
	{ deep: true, immediate: true }
);

const filterText = ref("");
watch(filterText, val => {
	treeRef.value!.filter(val);
});

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef });
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
