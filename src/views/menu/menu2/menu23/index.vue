<template>
	<div class="content-box">
		我是menu2-3 🍓🍇🍈🍉
		<el-input v-model="value" placeholder="测试缓存"></el-input>
	</div>
</template>

<script setup lang="ts" name="menu23">
import { ref, reactive } from "vue";
const value = ref("");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
