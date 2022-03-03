<template>
	<div class="home flx-center">
		<img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" />
	</div>
</template>

<script setup lang="ts">
import { ResultEnum } from "@/enums/httpEnum";

interface Props<T> {
	username: T;
}

console.log(ResultEnum[10000]);

const data: Props<string> = {
	username: "string"
};

// console.log(store, data);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
