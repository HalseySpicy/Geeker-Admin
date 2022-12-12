<template>
	<div class="card content-box">
		<span class="text"> 按钮权限 🍓🍇🍈🍉</span>
		<el-alert :title="`当前用户按钮权限：${JSON.stringify(Object.keys(BUTTONS))}`" type="success" :closable="false" />
		<br />
		<el-divider content-position="left">使用 Hooks 方式绑定权限</el-divider>
		<el-row class="mb-4">
			<el-button type="primary" v-if="BUTTONS.add">新增</el-button>
			<el-button type="success" v-if="BUTTONS.edit">编辑</el-button>
			<el-button type="danger" v-if="BUTTONS.delete">删除</el-button>
			<el-button type="info" v-if="BUTTONS.import">导入数据</el-button>
			<el-button type="warning" v-if="BUTTONS.export">导出数据</el-button>
		</el-row>
		<br />
		<el-divider content-position="left">使用 v-auth 指令绑定单个权限</el-divider>
		<el-row class="mb-4">
			<el-button type="primary" v-auth="'add'">新增</el-button>
			<el-button type="success" v-auth="'edit'">编辑</el-button>
			<el-button type="danger" v-auth="'delete'">删除</el-button>
			<el-button type="info" v-auth="'import'">导入数据</el-button>
			<el-button type="warning" v-auth="'export'">导出数据</el-button>
		</el-row>
		<br />
		<el-divider content-position="left">使用 v-auth 指令绑定多个权限</el-divider>
		<el-row class="mb-4">
			<el-button type="primary" v-auth="['add', 'edit', 'delete', 'import', 'export']">新增</el-button>
			<el-button type="success" v-auth="['add', 'edit', 'delete', 'import', 'export']">编辑</el-button>
			<el-button type="danger" v-auth="['add', 'edit', 'delete', 'import', 'export']">删除</el-button>
			<el-button type="info" v-auth="['add', 'edit', 'delete', 'import', 'export']">导入数据</el-button>
			<el-button type="warning" v-auth="['add', 'edit', 'delete', 'import', 'export']">导出数据</el-button>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="authButton">
import { useAuthButtons } from "@/hooks/useAuthButtons";
const { BUTTONS } = useAuthButtons();
</script>

<style scoped lang="scss">
.content-box {
	align-items: flex-start;
	span {
		width: 100%;
		text-align: center;
	}
}
</style>
