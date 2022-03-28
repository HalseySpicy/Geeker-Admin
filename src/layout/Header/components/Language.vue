<template>
	<el-dropdown trigger="click" @command="handleSetLanguage">
		<el-tooltip effect="dark" content="中英文" placement="bottom">
			<i :class="'iconfont icon-zhongyingwen'" class="icon-style"></i>
		</el-tooltip>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item :disabled="language && language === 'zh'" command="zh">简体中文</el-dropdown-item>
				<el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "@/store";

const i18n = useI18n();
const globalStore = GlobalStore();

const language = computed((): string => globalStore.language);

const handleSetLanguage = (lang: string) => {
	i18n.locale.value = lang;
	globalStore.updateLanguage(lang);
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
