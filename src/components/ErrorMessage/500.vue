<template>
	<div class="not-container">
		<img src="@/assets/images/500.png" class="not-img" alt="500" />
		<div class="not-detail">
			<h2>500</h2>
			<h4>抱歉，服务器出错了</h4>
			<el-button type="primary" @click="tabStore.goHome()">返回首页</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TabsStore } from "@/store/modules/tabs";
const tabStore = TabsStore();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
