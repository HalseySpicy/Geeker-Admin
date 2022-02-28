<template>
	<el-dialog v-model="dialogVisible" title="修改密码" width="30%">
		<span>This is a message</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
const dialogVisible = ref(false);

// openDialog
const openDialog = () => {
	dialogVisible.value = true;
};

defineExpose({
	openDialog
});
</script>

<style scoped lang="scss"></style>
