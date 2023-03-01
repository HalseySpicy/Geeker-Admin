<template>
	<el-dropdown trigger="click" @command="setAssemblySize">
		<i :class="'iconfont icon-contentright'" class="toolBar-icon"></i>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="item in assemblySizeList" :key="item" :disabled="assemblySize === item" :command="item">
					{{ assemblySizeListCh[item] }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { GlobalStore } from "@/stores";
import { AssemblySizeType } from "@/stores/interface";

const globalStore = GlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);

const assemblySizeList: AssemblySizeType[] = ["default", "large", "small"];
const assemblySizeListCh = reactive<{ [key: string]: string }>({
	default: "默认",
	large: "大型",
	small: "小型"
});

const setAssemblySize = (item: AssemblySizeType) => {
	if (assemblySize.value === item) return;
	globalStore.setAssemblySizeSize(item);
};
</script>
