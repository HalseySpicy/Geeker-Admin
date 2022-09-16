<template>
	<div>
		<el-tooltip effect="dark" content="布局设置" placement="bottom" :show-after="200">
			<i :class="'iconfont icon-zhuti'" class="icon-style" @click="openDrawer"></i>
		</el-tooltip>
		<el-drawer v-model="drawerVisible" title="布局设置" size="300px">
			<el-divider class="divider" content-position="center">
				<el-icon><Notification /></el-icon>
				布局切换
			</el-divider>
			<div class="layout-box">
				<el-tooltip effect="dark" content="默认" placement="top" :show-after="300">
					<div
						:class="['layout-item layout-default', themeConfig.layout == 'default' ? 'is-active' : '']"
						@click="changeLayout('default')"
					>
						<div class="layout-dark"></div>
						<div class="layout-container">
							<div class="layout-light"></div>
							<div class="layout-content"></div>
						</div>
						<el-icon v-if="themeConfig.layout == 'default'"><CircleCheckFilled /></el-icon>
					</div>
				</el-tooltip>
				<el-tooltip effect="dark" content="混合" placement="top" :show-after="300">
					<div
						:class="['layout-item layout-blend', themeConfig.layout == 'blend' ? 'is-active' : '']"
						@click="changeLayout('blend')"
					>
						<div class="layout-dark"></div>
						<div class="layout-container">
							<div class="layout-light"></div>
							<div class="layout-content"></div>
						</div>
						<el-icon v-if="themeConfig.layout == 'blend'"><CircleCheckFilled /></el-icon>
					</div>
				</el-tooltip>
				<el-tooltip effect="dark" content="横向" placement="top" :show-after="300">
					<div
						:class="['layout-item layout-transverse', themeConfig.layout == 'transverse' ? 'is-active' : '']"
						@click="changeLayout('transverse')"
					>
						<div class="layout-dark"></div>
						<div class="layout-content"></div>
						<el-icon v-if="themeConfig.layout == 'transverse'"><CircleCheckFilled /></el-icon>
					</div>
				</el-tooltip>
				<el-tooltip effect="dark" content="分栏" placement="top" :show-after="300">
					<div
						:class="['layout-item layout-columns', themeConfig.layout == 'columns' ? 'is-active' : '']"
						@click="changeLayout('columns')"
					>
						<div class="layout-dark"></div>
						<div class="layout-light"></div>
						<div class="layout-content"></div>
						<el-icon v-if="themeConfig.layout == 'columns'"><CircleCheckFilled /></el-icon>
					</div>
				</el-tooltip>
			</div>
			<br />
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
import { MenuStore } from "@/store/modules/menu";
import { GlobalStore } from "@/store";
import { DEFAULT_PRIMARY } from "@/config/config";
import SwitchDark from "@/components/SwitchDark/index.vue";

const { changePrimary, changeGreyOrWeak } = useTheme();

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

// 侧边栏折叠
const menuStore = MenuStore();
const isCollapse = computed({
	get() {
		return menuStore.isCollapse;
	},
	set() {
		menuStore.setCollapse();
	}
});

// 切换布局方式
const changeLayout = (val: string) => {
	globalStore.setThemeConfig({ ...themeConfig.value, layout: val });
};

// 打开主题设置
const drawerVisible = ref(false);
const openDrawer = () => {
	drawerVisible.value = true;
};
</script>

<style scoped lang="scss">
@import "../index.scss";
.divider {
	margin-top: 15px;
	.el-icon {
		position: relative;
		top: 2px;
		right: 5px;
		font-size: 15px;
	}
}
.theme-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 15px 0;
	span {
		font-size: 14px;
	}
}
.layout-box {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	padding: 12px 0 0;
	.layout-item {
		position: relative;
		box-sizing: border-box;
		width: 95px;
		height: 67px;
		padding: 6px;
		margin-bottom: 20px;
		cursor: pointer;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
		transition: all 0.2s;
		.layout-dark {
			background-color: var(--el-color-primary);
			border-radius: 3px;
		}
		.layout-light {
			background-color: var(--el-color-primary-light-5);
			border-radius: 3px;
		}
		.layout-content {
			background-color: var(--el-color-primary-light-8);
			border: 1px dashed var(--el-color-primary);
			border-radius: 3px;
		}
		.el-icon {
			position: absolute;
			right: 10px;
			bottom: 10px;
			color: var(--el-color-primary);
			transition: all 0.2s;
		}
		&:hover {
			box-shadow: 0 0 5px 1px var(--el-border-color-darker);
		}
	}
	.is-active {
		box-shadow: 0 0 0 2px var(--el-color-primary) !important;
	}
	.layout-default {
		display: flex;
		justify-content: space-between;
		.layout-dark {
			width: 20%;
		}
		.layout-container {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 72%;
			.layout-light {
				height: 20%;
			}
			.layout-content {
				height: 67%;
			}
		}
	}
	.layout-blend {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.layout-dark {
			height: 22%;
		}
		.layout-container {
			display: flex;
			justify-content: space-between;
			height: 70%;
			.layout-light {
				width: 20%;
			}
			.layout-content {
				width: 70%;
			}
		}
	}
	.layout-transverse {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.layout-dark {
			height: 20%;
		}
		.layout-content {
			height: 67%;
		}
	}
	.layout-columns {
		display: flex;
		justify-content: space-between;
		.layout-dark {
			width: 14%;
		}
		.layout-light {
			width: 17%;
		}
		.layout-content {
			width: 55%;
		}
	}
}
</style>
