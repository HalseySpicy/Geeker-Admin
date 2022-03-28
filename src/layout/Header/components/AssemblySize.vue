<template>
	<el-dropdown trigger="click">
		<el-tooltip effect="dark" :content="'组件大小'" placement="bottom">
			<i :class="'iconfont icon-contentright'" class="icon-style"></i>
		</el-tooltip>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="item in assemblySizeList"
					:key="item"
					:disabled="assemblySize === item"
					@click.native="setAssemblySize(item)"
				>
					{{ item }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { GlobalStore } from "@/store";

const globalStore = GlobalStore();
const assemblySize = computed((): string => globalStore.assemblySize);

const assemblySizeList = reactive<string[]>(["default", "large", "small"]);

const setAssemblySize = (item: string) => {
	if (assemblySize.value === item) return;
	globalStore.setAssemblySizeSize(item);
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
