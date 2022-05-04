<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
			<template #title>
				<el-icon>
					<component :is="subItem.icon"></component>
				</el-icon>
				<span>{{ subItem.title }}</span>
			</template>
			<SubItem :menuList="subItem.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="subItem.path">
			<el-icon>
				<component :is="subItem.icon"></component>
			</el-icon>
			<template v-if="!subItem.isLink" #title>
				<span>{{ subItem.title }}</span>
			</template>
			<template v-else #title>
				<a class="href" :href="subItem.isLink" target="_blank">{{ subItem.title }}</a>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts">
defineProps<{ menuList: Menu.MenuOptions[] }>();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
