<template>
	<div class="card content-box">
		<span class="text">proTable detail 🍓🍇🍈🍉</span>
		<span class="text">params:{{ route.params }}</span>
		<span class="text">query:{{ route.query }}</span>
	</div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped lang="scss"></style>
