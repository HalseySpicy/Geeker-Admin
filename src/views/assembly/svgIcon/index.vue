<template>
	<div>
		<el-alert
			title="SVG 图标目前使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：https://github.com/vbenjs/vite-plugin-svg-icons"
			type="warning"
			:closable="false"
		/>
		<div class="icon-list">
			<SvgIcon name="bullbasaur"></SvgIcon>
			<SvgIcon name="jigglypuff"></SvgIcon>
			<SvgIcon name="meowth"></SvgIcon>
			<SvgIcon name="pikachu"></SvgIcon>
			<SvgIcon name="psyduck"></SvgIcon>
			<SvgIcon name="rattata"></SvgIcon>
			<SvgIcon name="squirtle"></SvgIcon>
			<SvgIcon name="weedle"></SvgIcon>
			<SvgIcon name="zubat"></SvgIcon>
		</div>
	</div>
</template>

<script setup lang="ts" name="svgIcon">
import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
