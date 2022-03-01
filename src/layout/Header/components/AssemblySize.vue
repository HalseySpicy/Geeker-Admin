<template>
	<el-dropdown trigger="click">
		<el-tooltip effect="dark" :content="'组件大小'" placement="bottom">
			<i :class="'iconfont icon-contentright'" class="icon-style" @click=""></i>
		</el-tooltip>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item>Default</el-dropdown-item>
				<el-dropdown-item>Large</el-dropdown-item>
				<el-dropdown-item>Small</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
