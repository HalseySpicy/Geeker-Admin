<template>
	<div class="content-box">
		Icon 选择 🍓🍇🍈🍉
		<div class="select-icon"><SelectIcon></SelectIcon></div>
	</div>
</template>

<script setup lang="ts" name="selectIcon">
import SelectIcon from "@/components/SelectIcon/index.vue";
import { ref, reactive } from "vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
