<template>
	<el-container>
		<el-aside>
			<Menu></Menu>
		</el-aside>
		<el-container>
			<el-header>
				<Header></Header>
				<Tabs></Tabs>
			</el-header>
			<el-main>
				<section class="main-box">
					<router-view v-slot="{ Component, route }">
						<transition appear name="fade-transform" mode="out-in">
							<keep-alive :include="cacheRouter">
								<component :is="Component" :key="route.path"></component>
							</keep-alive>
						</transition>
					</router-view>
				</section>
			</el-main>
			<el-footer>
				<Footer></Footer>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import Menu from "./Menu/index.vue";
import Header from "./Header/index.vue";
import Tabs from "./Tabs/index.vue";
import Footer from "./Footer/index.vue";
import cacheRouter from "@/routers/cacheRouter";
import { onMounted } from "vue";
import { getAuthButtons } from "@/api/modules/login";
import { AuthStore } from "@/store/modules/auth";

const authStore = AuthStore();

onMounted(async () => {
	// 获取按钮权限列表
	const res = await getAuthButtons();
	res.data && authStore.setAuthButtons(res.data);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
