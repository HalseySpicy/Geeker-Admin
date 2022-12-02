<template>
	<div class="card">
		<p>proTable detail</p>
		<p>params:{{ route.params }}</p>
		<p>query:{{ route.query }}</p>
	</div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped lang="scss"></style>
