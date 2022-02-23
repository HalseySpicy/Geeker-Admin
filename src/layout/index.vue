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
							<keep-alive v-if="route.meta.keepAlive">
								<component :is="Component" :key="route.path"></component>
							</keep-alive>
							<component v-else :is="Component" :key="route.path"></component>
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
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
