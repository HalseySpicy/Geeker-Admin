<template>
	<div class="card content-box">
		<span class="text"> 按钮权限（待完善） 🍓🍇🍈🍉</span>
	</div>
</template>

<script setup lang="ts" name="buttonList">
import { useAuthButtons } from "@/hooks/useAuthButtons";
const { BUTTONS } = useAuthButtons();
console.log(BUTTONS);
</script>
