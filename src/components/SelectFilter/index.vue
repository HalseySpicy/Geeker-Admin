<template>
	<div class="select-filter">
		<div v-for="item in data" :key="item.key" class="select-filter-item">
			<div class="select-filter-item-title">
				<span>{{ item.title }} ：</span>
			</div>
			<span v-if="!item.options.length" class="select-filter-notData">暂无数据 ~</span>
			<el-scrollbar>
				<ul class="select-filter-list">
					<li
						v-for="option in item.options"
						:key="option.value"
						:class="{
							active: selected[item.key] && selected[item.key].includes(option.value)
						}"
						@click="select(item, option)"
					>
						<el-icon v-if="option.icon"><component :is="option.icon" /></el-icon>
						<span>{{ option.label }}</span>
					</li>
				</ul>
			</el-scrollbar>
		</div>
	</div>
</template>

<script setup lang="ts" name="selectFilter">
import { ref, onBeforeMount } from "vue";
import { isType } from "@/utils/util";

interface optionsProps {
	value: string;
	label: string;
	icon?: string;
}

interface DataProps {
	title: string; // 列表标题
	key: string; // 当前筛选项 key 值
	multiple?: boolean; // 是否为多选
	options: optionsProps[]; // 筛选数据
}

interface FilterProps {
	data?: DataProps[]; // 选择的列表数据
	defaultValues?: any; // 默认值
}
const props = withDefaults(defineProps<FilterProps>(), {
	data: () => []
});

// 选中的值
type selectedProp = { [key: string]: string[] };
const selected = ref<selectedProp>({});

onBeforeMount(() => {
	props.data.forEach(item => {
		let transform = { ...props.defaultValues };
		// 如果默认选择的值字符串，转换为数组才好做高亮显示
		if (transform[item.key] && isType(transform[item.key]) == "string") transform[item.key] = [...props.defaultValues[item.key]];
		// 如果有默认值，就设置默认值，没有默认值就选中第一个（全部）
		selected.value[item.key] = transform[item.key] || [item.options[0]?.value];
	});
});

/**
 * @description 选择筛选项
 * @param {Object} item 选中的哪项列表
 * @param {Object} option 选中的值
 * @return void
 * */
const select = (item: DataProps, option: optionsProps) => {
	if (!item.multiple) {
		// 单选
		if (selected.value[item.key].includes(option.value)) return;
		selected.value[item.key] = [option.value];
	} else {
		// 如果选中的是第一个值，则直接设置
		if (item.options[0].value === option.value) selected.value[item.key] = [option.value];
		// 如果选择的值已经选中了，则删除选中的值
		if (selected.value[item.key].includes(option.value)) {
			// 查找当前点击元素索引
			let currentIndex = selected.value[item.key].findIndex(s => s === option.value);
			selected.value[item.key].splice(currentIndex, 1);
			// 当全部删光时，把第第一个值选中
			if (selected.value[item.key].length == 0) selected.value[item.key] = [item.options[0].value];
		} else {
			// 未选中点击值的时候，追加选中值
			selected.value[item.key].push(option.value);
			// 单选中全部并且点击到了未选中的值，把第一个值删除掉
			if (selected.value[item.key].includes(item.options[0].value)) {
				selected.value[item.key].splice(0, 1);
			}
		}
	}
	change();
};

// 触发父组件
interface FilterEmits {
	(e: "change", value: selectedProp): void;
}
const emit = defineEmits<FilterEmits>();
const change = () => {
	emit("change", { ...selected.value });
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
