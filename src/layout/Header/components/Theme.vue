<template>
	<div>
		<el-tooltip effect="dark" :content="$t('header.theme')" placement="bottom">
			<i :class="'iconfont icon-zhuti'" class="icon-style" @click="open"></i>
		</el-tooltip>
		<el-drawer v-model="drawerVisible" :title="$t('header.themeSetting') + '（暂时未做）'" size="300px">
			<el-divider content-position="center">{{ $t("header.theme") }}</el-divider>
			<el-switch
				class="theme-switch"
				v-model="value1"
				:active-text="$t('header.darkMode')"
				:inactive-text="$t('header.lightMode')"
			/>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const value1 = ref(false);
const drawerVisible = ref(false);
const open = () => {
	drawerVisible.value = true;
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
