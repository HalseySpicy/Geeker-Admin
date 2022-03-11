<template>
	<div class="home flx-center">
		<img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" />
	</div>
</template>

<script setup lang="ts" name="home">
import { ResultEnum } from "@/enums/httpEnum";

interface Props<T> {
	username: T;
}

const data: Props<string> = {
	username: "string"
};

interface PropsSay {
	say<T>(value: T): T;
}

interface PropsNumber<T, U> {
	(a: T, b: U): number;
}

// console.log(store, data);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
