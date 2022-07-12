<template>
	<div class="header">
		<div class="header-lf flx-center">
			<CollapseIcon></CollapseIcon>
			<Breadcrumb v-if="themeConfig.breadcrumb"></Breadcrumb>
		</div>
		<div class="header-ri flx-center">
			<!-- Assembly size -->
			<AssemblySize></AssemblySize>
			<!-- Language -->
			<Language></Language>
			<!-- SearchMenu -->
			<SearchMenu></SearchMenu>
			<!-- Theme -->
			<Theme></Theme>
			<!-- Full screen -->
			<Fullscreen></Fullscreen>
			<!-- User name -->
			<span class="username">Geeker</span>
			<!-- Avatar -->
			<Avatar></Avatar>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import SearchMenu from "./components/SearchMenu.vue";
import Fullscreen from "./components/Fullscreen.vue";
import Language from "./components/Language.vue";
import AssemblySize from "./components/AssemblySize.vue";
import Theme from "./components/Theme.vue";
import Avatar from "./components/Avatar.vue";
import { GlobalStore } from "@/store";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
