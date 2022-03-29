<template>
	<div class="content-box">
		<div class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</div>
		<div v-draggable class="drag-box flx-center">我可以拖拽哦~</div>
	</div>
</template>

<script setup lang="ts" name="dragDirect">
import { ref, reactive } from "vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
