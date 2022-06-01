<template>
	<div class="content-box">
		<span class="text">Icon 选择 🍓🍇🍈🍉</span>
		<SelectIcon v-model:iconValue="iconValue"></SelectIcon>
	</div>
</template>

<script setup lang="ts" name="selectIcon">
import { ref } from "vue";
import SelectIcon from "@/components/SelectIcon/index.vue";
const iconValue = ref("");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
