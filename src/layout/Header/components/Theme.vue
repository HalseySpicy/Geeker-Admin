<template>
	<div>
		<el-tooltip effect="dark" content="布局设置" placement="bottom">
			<i :class="'iconfont icon-zhuti'" class="icon-style" @click="openDrawer"></i>
		</el-tooltip>
		<el-drawer v-model="drawerVisible" title="布局设置" size="300px">
			<el-divider class="divider" content-position="center">
				<el-icon><ColdDrink /></el-icon>
				全局主题
			</el-divider>
			<div class="theme-item">
				<span>主题颜色</span>
				<el-color-picker v-model="themeConfig.primary" :predefine="colorList" @change="changePrimary" />
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
			<br />
			<el-divider class="divider" content-position="center">
				<el-icon><Setting /></el-icon>
				界面设置
			</el-divider>
			<div class="theme-item">
				<span>折叠菜单</span>
				<el-switch v-model="isCollapse" />
			</div>
			<div class="theme-item">
				<span>面包屑导航</span>
				<el-switch v-model="themeConfig.breadcrumb" />
			</div>
			<div class="theme-item">
				<span>标签栏</span>
				<el-switch v-model="themeConfig.tabs" />
			</div>
			<div class="theme-item">
				<span>页脚</span>
				<el-switch v-model="themeConfig.footer" />
			</div>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "@/hooks/useTheme";
import SwitchDark from "@/components/SwitchDark/index.vue";
import { MenuStore } from "@/store/modules/menu";
import { GlobalStore } from "@/store";
import { DEFAULT_PRIMARY } from "@/config/config";

// 预定义主题颜色
const colorList = [
	DEFAULT_PRIMARY,
	"#DAA96E",
	"#0C819F",
	"#409EFF",
	"#27ae60",
	"#ff5c93",
	"#e74c3c",
	"#fd726d",
	"#f39c12",
	"#9b59b6"
];

// 主题初始化
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const menuStore = MenuStore();
const isCollapse = computed({
	get() {
		return menuStore.isCollapse;
	},
	set() {
		menuStore.setCollapse();
	}
});

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
