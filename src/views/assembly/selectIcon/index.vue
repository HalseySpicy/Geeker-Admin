<template>
	<div class="content-box">
		<span class="text">Icon 选择 🍓🍇🍈🍉</span>
		<SelectIcon v-model:iconValue="iconValue"></SelectIcon>
		<el-descriptions title="配置项 📚" :column="1" border>
			<el-descriptions-item label="iconValue"> 双向绑定的icon值，使用示例：v-model:iconValue="iconValue" </el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script setup lang="ts" name="selectIcon">
import { ref } from "vue";
import SelectIcon from "@/components/SelectIcon/index.vue";
const iconValue = ref("");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
