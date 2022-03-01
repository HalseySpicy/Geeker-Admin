<template>
	<div class="header">
		<div class="header-lf flx-center">
			<el-icon class="collapse-icon" @click="menuStore.setCollapse()">
				<component :is="isCollapse ? 'expand' : 'fold'"></component>
			</el-icon>
			<Breadcrumb></Breadcrumb>
		</div>
		<div class="header-ri flx-center">
			<!-- Component size -->
			<AssemblySize></AssemblySize>
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
import { MenuStore } from "@/store/modules/menu";
import Breadcrumb from "./components/Breadcrumb.vue";
import Fullscreen from "./components/Fullscreen.vue";
import AssemblySize from "./components/AssemblySize.vue";
import Avatar from "./components/Avatar.vue";

const menuStore = MenuStore();
const isCollapse = computed((): boolean => menuStore.isCollapse);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
