<template>
	<div class="content-box">
		我是menu2-2-1 🍓🍇🍈🍉
		<el-input v-model="value" placeholder="测试缓存"></el-input>
	</div>
</template>

<script setup lang="ts" name="menu221">
import { ref, reactive } from "vue";
const value = ref<string>("");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
