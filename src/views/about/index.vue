<template>
  <div>
    <div class="card mb10">
      <h4 class="title">简介</h4>
      <span class="text">
        <el-link type="primary" href="https://docs.spicyboy.cn" target="_blank">Geeker-Admin</el-link>
        一款基于 Vue3.2、TypeScript、Vite4、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。项目提供强大的
        <el-link type="primary" href="https://juejin.cn/post/7166068828202336263" target="_blank">ProTable 组件</el-link>
        在一定程度上节省您的开发效率。另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。
      </span>
    </div>
    <div class="card mb10">
      <h4 class="title">项目信息</h4>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="版本号" label-align="left">
          <el-tag>{{ version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发布时间" label-align="left">
          <el-tag>{{ lastBuildTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Gitee" label-align="left">
          <el-link type="primary" href="https://gitee.com/HalseySpicy/Geeker-Admin" target="_blank">Gitee</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="Github" label-align="left">
          <el-link type="primary" href="https://github.com/HalseySpicy/Geeker-Admin" target="_blank">Github</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="文档地址" label-align="left">
          <el-link type="primary" href="https://docs.spicyboy.cn" target="_blank">文档地址</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="预览地址" label-align="left">
          <el-link type="primary" href="http://admin.spicyboy.cn" target="_blank">预览地址</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="card mb10">
      <h4 class="title">生产环境依赖</h4>
      <el-descriptions :column="3" border>
        <el-descriptions-item width="400px" :label="key" v-for="(value, key) in dependencies" :key="key">
          <el-tag type="info">{{ value }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="card">
      <h4 class="title">开发环境依赖</h4>
      <el-descriptions :column="3" border>
        <el-descriptions-item width="400px" :label="key" v-for="(value, key) in devDependencies" :key="key">
          <el-tag type="info">{{ value }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts" name="about">
const { pkg, lastBuildTime } = __APP_INFO__;
const { dependencies, devDependencies, version } = pkg;
</script>

<style lang="scss" scoped>
.card {
  .title {
    margin: 0 0 15px;
    font-size: 17px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
  .text {
    font-size: 15px;
    line-height: 25px;
    color: var(--el-text-color-regular);
    .el-link {
      font-size: 15px;
    }
  }
}
</style>
