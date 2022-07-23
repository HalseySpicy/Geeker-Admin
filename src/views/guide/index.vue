<template>
	<div>
		<el-alert title="引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js." type="info" />
		<br />
		<div id="Geeker"><el-button type="primary" @click.prevent.stop="guide">打开引导页</el-button></div>
	</div>
</template>

<script setup lang="ts" name="guide">
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css";
const steps = [
	{
		element: "#hamburger-collapse",
		popover: {
			title: "Hamburger",
			description: "Open && Close sidebar",
			position: "bottom"
		}
	},
	{
		element: "#breadcrumb-container",
		popover: {
			title: "Breadcrumb",
			description: "Indicate the current page location",
			position: "bottom"
		}
	},
	{
		element: "#size-select",
		popover: {
			title: "Switch Size",
			description: "Switch the system size",
			position: "left"
		}
	},
	{
		element: "#header-language",
		popover: {
			title: "Switch Language",
			description: "Switch the system language",
			position: "bottom",
			padding: 5
		}
	},
	{
		element: "#header-search",
		popover: {
			title: "Page Search",
			description: "Page search, quick navigation",
			position: "left",
			padding: 5
		}
	},
	{
		element: "#header-layout",
		popover: {
			title: "Setting Layout",
			description: "Customize settings layout",
			position: "left",
			padding: 5
		}
	}
]; // import driver.js css
function guide() {
	const driver = new Driver();
	driver.defineSteps(steps);
	driver.start();
}
</script>

<style scoped lang="scss"></style>
