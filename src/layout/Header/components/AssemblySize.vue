<template>
	<el-dropdown trigger="click">
		<el-tooltip effect="dark" :content="'组件大小'" placement="bottom">
			<i :class="'iconfont icon-contentright'" class="icon-style" @click=""></i>
		</el-tooltip>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="item in assemblySizeList"
					:key="item"
					:disabled="size === item"
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
const size = computed((): string => globalStore.size);

const assemblySizeList = reactive<string[]>(["default", "large", "small"]);

const setAssemblySize = (size: string) => {
	globalStore.setSize(size);
	window.location.reload();
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
