<template>
	<div>
		<el-tooltip effect="dark" :content="$t('header.theme')" placement="bottom">
			<i :class="'iconfont icon-zhuti'" class="icon-style" @click="open"></i>
		</el-tooltip>
		<el-drawer v-model="drawerVisible" :title="$t('header.themeSetting')" size="300px">
			<el-divider content-position="center">{{ $t("header.theme") }}</el-divider>
			<div class="theme-item">
				<span>{{ $t("header.darkMode") }}</span>
				<UseDark ref="darkRef"></UseDark>
			</div>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import UseDark from "@/components/UseDark/index.vue";
import { ref } from "vue";
import { useDark } from "@/hooks/useDark";

useDark();

const drawerVisible = ref(false);
const open = () => {
	drawerVisible.value = true;
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
