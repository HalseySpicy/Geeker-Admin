<template>
	<div class="content-box">
		<span class="text">富文本编辑器 🍓🍇🍈🍉</span>
		<WangEditor v-model:value="text"></WangEditor>
	</div>
</template>

<script setup lang="ts" name="wangEditor">
import { ref } from "vue";
import WangEditor from "@/components/WangEditor/index.vue";

const text = ref("");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
