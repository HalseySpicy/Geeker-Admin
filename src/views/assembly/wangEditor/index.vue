<template>
	<div class="content-box">
		<span class="text">富文本编辑器 🍓🍇🍈🍉</span>
		<WangEditor v-model:value="content"></WangEditor>
		<el-button type="primary" @click="dialogVisible = true">内容预览</el-button>
		<el-dialog v-model="dialogVisible" title="富文本内容预览" width="1300px" top="50px">
			<div class="view" v-html="content"></div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="wangEditor">
import { ref } from "vue";
import WangEditor from "@/components/WangEditor/index.vue";

const content = ref("");

const dialogVisible = ref(false);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
