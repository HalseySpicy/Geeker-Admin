<template>
	<div class="card content-box">
		<span class="text">图片上传组件 🍓🍇🍈🍉</span>
		<div class="upload-list">
			<UploadImg id="avatar1" v-model:imageUrl="avatar1">
				<template #tip> 上传成功返回图片是模拟固定的 </template>
			</UploadImg>
			<UploadImg id="avatar2" v-model:imageUrl="avatar2" :uploadStyle="uploadStyle">
				<template #tip> 圆形组件 </template>
			</UploadImg>
			<UploadImg id="avatar3" v-model:imageUrl="avatar3" :disabled="true">
				<template #tip> 禁用上传、删除功能 </template>
			</UploadImg>
		</div>
		<el-descriptions title="配置项 📚" :column="1" border>
			<el-descriptions-item label="imageUrl"> 双向绑定的 imageUrl 值，使用示例： v-model:imageUrl="avatar" </el-descriptions-item>
			<el-descriptions-item label="id"> 组件 id 值，当页面同时存在多个上传组件时，该属性是必传的 </el-descriptions-item>
			<el-descriptions-item label="drag"> 是否支持拖拽上传图片，默认为 true </el-descriptions-item>
			<el-descriptions-item label="disabled"> 是否禁用 上传、删除 功能，可查看图片 </el-descriptions-item>
			<el-descriptions-item label="fileSize"> 单个图片文件大小限制，默认为 5M </el-descriptions-item>
			<el-descriptions-item label="uploadStyle">
				上传组件样式，默认样式为 { width: "175px", height: "175px" }
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script setup lang="ts" name="uploadImg">
import { ref } from "vue";
import UploadImg from "@/components/UploadImg/index.vue";

const avatar1 = ref("");
const avatar2 = ref("");
const avatar3 = ref("https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110015.jpg");
const uploadStyle = { width: "175px", height: "175px", borderRadius: "50%" };
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
