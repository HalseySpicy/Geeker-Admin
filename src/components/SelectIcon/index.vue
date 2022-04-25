<template>
	<el-input ref="inputRef" placeholder="Please input" @focus="selectIcon">
		<template #append>
			<el-button>
				<el-icon class="el-icon--right"><Search /></el-icon></el-button
		></template>
	</el-input>
	<el-dialog v-model="dialogVisible" title="选择图标" width="75%" :before-close="handleClose">
		<span>This is a message</span>
	</el-dialog>
</template>

<script setup lang="ts" name="SelectIcon">
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";

const selectIcon = () => {
	dialogVisible.value = true;
};
const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
	done();
	console.log(522);
};
</script>
