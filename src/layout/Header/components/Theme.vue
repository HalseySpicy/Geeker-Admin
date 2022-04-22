<template>
	<div>
		<el-tooltip effect="dark" :content="'主题'" placement="bottom">
			<i :class="'iconfont icon-zhuti'" class="icon-style" @click="open"></i>
		</el-tooltip>
		<el-drawer v-model="drawerVisible" title="主题设置" size="300px">
			<el-divider content-position="center">主题</el-divider>
			<el-switch class="theme-switch" v-model="value1" active-text="深色模式" inactive-text="浅色模式" />
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const value1 = ref(false);
const drawerVisible = ref(false);
const open = () => {
	drawerVisible.value = true;
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
