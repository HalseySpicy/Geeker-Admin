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
function F1() {
	let a = 100;
	return function () {
		console.log(a);
	};
}
var f1 = F1();
var a = 200;
f1(); //100

// const number = () => {
// 	let a = 1;
// 	return function (number: any) {
// 		console.log(a + number);
// 	};
// };

// let aa = number();
// aa(1111);

// console.log(store, data);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
