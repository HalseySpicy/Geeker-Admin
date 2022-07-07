<template>
	<div>
		<el-tooltip effect="dark" content="布局设置" placement="bottom">
			<i :class="'iconfont icon-zhuti'" class="icon-style" @click="openDrawer"></i>
		</el-tooltip>
		<el-drawer v-model="drawerVisible" title="布局设置" size="300px">
			<el-divider class="divider">
				<el-icon><ColdDrink /></el-icon>
				全局主题
			</el-divider>
			<div class="theme-item">
				<span>primary</span>
				<el-color-picker v-model="themeConfig.primary" :predefine="colorList" @change="changePrimary"> </el-color-picker>
			</div>
			<div class="theme-item">
				<span>暗黑模式</span>
				<SwitchDark></SwitchDark>
			</div>
			<div class="theme-item">
				<span>灰色模式</span>
				<el-switch v-model="themeConfig.isGrey" @change="changeGreyOrWeak($event, 'grey')" />
			</div>
			<div class="theme-item">
				<span>色弱模式</span>
				<el-switch v-model="themeConfig.isWeak" @change="changeGreyOrWeak($event, 'weak')" />
			</div>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "@/hooks/useTheme";
import SwitchDark from "@/components/SwitchDark/index.vue";
import { GlobalStore } from "@/store";
// 预定义主题颜色
const colorList = ["#409EFF", "#DAA96E", "#0C819F", "#009688", "#27ae60", "#ff5c93", "#e74c3c", "#fd726d", "#f39c12", "#9b59b6"];
// 主题初始化
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const { changePrimary, changeGreyOrWeak } = useTheme();

// 打开主题设置
const drawerVisible = ref(false);
const openDrawer = () => {
	drawerVisible.value = true;
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
