<template>
	<el-input v-model="input2" placeholder="Please input">
		<template #append>
			<el-button>
				<el-icon class="el-icon--right"><Search /></el-icon></el-button
		></template>
	</el-input>
</template>

<script setup lang="ts" name="SelectIcon">
import { Search } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
const input2 = ref("");
</script>
