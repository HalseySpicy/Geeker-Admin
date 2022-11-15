<template>
	<el-breadcrumb :separator-icon="ArrowRight">
		<transition-group name="breadcrumb" mode="out-in">
			<!-- 首页面包屑不要可以直接删除 🙅‍♀️ -->
			<el-breadcrumb-item :to="{ path: HOME_URL }" :key="HOME_URL" v-if="breadcrumbList[0].meta.title !== '首页'">
				<div class="breadcrumb-item">
					<el-icon class="breadcrumb-icon" v-if="themeConfig.breadcrumbIcon">
						<HomeFilled />
					</el-icon>
					<span class="breadcrumb-title">首页</span>
				</div>
			</el-breadcrumb-item>
			<el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path: item.path }">
				<div class="breadcrumb-item">
					<el-icon class="breadcrumb-icon" v-if="item.meta.icon && themeConfig.breadcrumbIcon">
						<component :is="item.meta.icon"></component>
					</el-icon>
					<span class="breadcrumb-title">{{ item.meta.title }}</span>
				</div>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";
import { ArrowRight } from "@element-plus/icons-vue";
import { HOME_URL } from "@/config/config";

const route = useRoute();
const authStore = AuthStore();
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const breadcrumbList = computed(() => authStore.breadcrumbListGet[route.path]);
</script>

<style scoped lang="scss">
@media screen and (max-width: 900px) {
	.el-breadcrumb {
		display: none;
	}
}
.breadcrumb-item {
	display: flex;
	align-items: center;
	.breadcrumb-icon {
		margin-right: 6px;
		font-size: 16px;
	}
}
</style>
