<template>
	<div class="icon-box">
		<el-input
			ref="inputRef"
			v-model="iconValue"
			v-bind="$attrs"
			:placeholder="placeholder"
			:clearable="clearable"
			@focus="openDialog"
		>
			<template #append>
				<el-button :icon="customIcons[iconValue]" />
			</template>
		</el-input>
		<el-dialog v-model="dialogVisible" :title="placeholder" top="50px" width="66%">
			<el-input v-model="inputValue" placeholder="搜索图标" size="large" :prefix-icon="Icons.Search" />
			<el-scrollbar v-if="Object.keys(iconsList).length">
				<div class="icon-list">
					<div v-for="item in iconsList" :key="item" class="icon-item" @click="selectIcon(item)">
						<component :is="item"></component>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</el-scrollbar>
			<el-empty description="未搜索到您要找的图标~" v-else />
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="SelectIcon">
import { ref, computed } from "vue";
import * as Icons from "@element-plus/icons-vue";

interface SelectIconProps {
	iconValue: string;
	title?: string;
	clearable?: boolean;
	placeholder?: string;
}

withDefaults(defineProps<SelectIconProps>(), {
	title: "请选择图标",
	clearable: true,
	placeholder: "请选择图标"
});

const customIcons: { [key: string]: any } = Icons;

// 打开 dialog
const dialogVisible = ref(false);
const openDialog = (e: any) => {
	e.srcElement.blur();
	dialogVisible.value = true;
};

const emit = defineEmits(["update:iconValue"]);

// 选择图标(触发更新父组件数据)
const selectIcon = (item: any) => {
	dialogVisible.value = false;
	emit("update:iconValue", item.name);
};

// 监听搜索框值
const inputValue = ref("");
const iconsList = computed((): { [key: string]: any } => {
	if (!inputValue.value) return Icons;
	let result: { [key: string]: any } = {};
	for (const key in customIcons) {
		if (key.toLowerCase().indexOf(inputValue.value.toLowerCase()) > -1) result[key] = customIcons[key];
	}
	return result;
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
