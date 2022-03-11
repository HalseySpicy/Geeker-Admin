<template>
	<div>
		<h1>2222</h1>
		<el-input v-model="value"></el-input>
	</div>
</template>

<script setup lang="ts" name="columnChart">
import { ref } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.matched);
const value = ref("");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
