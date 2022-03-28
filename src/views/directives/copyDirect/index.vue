<template>
	<div class="content-box">
		<div class="text">复制指令 🍇🍇🍇🍓🍓🍓</div>
		<div class="box-content">
			<el-input placeholder="请输入内容" v-model="data" style="width: 500px">
				<template #append>
					<el-button v-copy="data">复制</el-button>
				</template>
			</el-input>
		</div>
	</div>
</template>

<script setup lang="ts" name="copyDirect">
import { ref, reactive } from "vue";

const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
