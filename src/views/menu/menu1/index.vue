<template>
	<div>
		<div>我是menu1👩👵👶</div>
		<el-input v-model="value"></el-input>
	</div>
</template>

<script setup lang="ts" name="menu1">
import { ref, reactive } from "vue";
const value = ref("");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
