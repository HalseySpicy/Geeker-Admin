# Vue 3.2 + TypeScript + Pinia + Vite2 + Element-Plus 管理系统（开源啦 🎉🎉）

![banner](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/banner.png)

# Geeker-Admin 后台管理系统 🍇🍈🍉

## 前言 📖

> Geeker Admin，是基于 Vue3.2、TypeScript、Vite2、Pinia、Element-Plus 开发的一套后台管理模板，目前利用空余时间开发了一个月左右 🕒🕒。项目中很多功能都是借鉴别的管理系统，整个项目还有很多地方不完善，后期会持续更新。项目中有很多地方写得不是很好，希望大家能多提意见。

## ？？？为什么开发这个管理系统 🤷‍♂️🤷

> 1、主要是学习下 Vue3 + TypeScript  
> 2、目前看了很多 Vue3 的开源后台管理系统，感觉都非常庞大，很多功能基本上也用不到，所以自己就尝试写了一下这个管理系统（适合自己的才是最好的 🤣）

## 一、在线预览 👀

### Link：http://admin.spicyboy.cn ✨

## 二、Git 仓库地址 (欢迎 Star⭐⭐⭐)

### Gitee：https://gitee.com/laramie/Geeker-Admin ✨

### GitHub：https://github.com/HalseySpicy/Geeker-Admin ✨

## 三、🔨🔨🔨 项目功能

- 🍓 使用 Vue3.2 开发（单文件组件 `＜script setup＞`）
- 🍇 采用 vite2 作为项目开发工具（配置了 Gzip 打包、图片压缩、跨域代理、打包文件预览工具……）
- 🍉 整个项目集成了 TypeScript （完全是为了想学习 🤣）
- 🍍 使用 pinia 替代 Vuex，轻量、简单、易用（香啊~🤤）
- 🍎 使用 TypeScript 对 Axios 整个二次封装 （全局错误拦截、常用请求封装、重复请求取消……）
- 🍌 对表格的所有操作基本都封装成了 Hooks （表格搜索、重置、查询、分页、多选、单条数据操作、文件上传、下载、格式化单元格）
- 🍐 基于 Element 二次封装 ProTable 组件，表格页面全部传成配置项 Columns
- 🍊 支持 Element 组件大小切换，i18n 国际化（暂时没配置所有文件，根据项目自行配置）
- 🍉 使用 prettier 统一格式化代码，集成 Eslint 代码校验规范
- 🥭 使用 vue-router 进行路由权限拦截、按钮权限设置
- 🍈 使用 keep-alive 对整个页面进行缓存，支持多级嵌套页面（路由里可配置）
- 🥥 常用自定义指令开发（复制、水印、拖拽、节流、防抖、长按……）

## 四、安装使用步骤

- **Clone**

```text
git clone https://gitee.com/laramie/Geeker-Admin.git
git clone https://github.com/HalseySpicy/Geeker-Admin.git
```

- **Install**

```text
npm install
cnpn install
```

- **Run**

```text
npm run dev
```

- **Build**

```text
npm run build:dev
npm run build:pro
```

## 五、项目截图

### 登录页：

![login](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/login.png)

### 首页：

![home](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/home.png)

### 表格页：

![table1](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/table1.png)

### 数据大屏：

![dataScreen](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/dataScreen.png)

## 六、文件资源目录 📚

```text
Geeker-Admin
├─ .vscode
├─ public
├─ src
│  ├─ api
│  ├─ assets
│  ├─ components
│  ├─ config
│  ├─ directives
│  ├─ enums
│  ├─ hooks
│  ├─ language
│  ├─ layout
│  ├─ routers
│  ├─ store
│  ├─ styles
│  ├─ typings
│  ├─ utils
│  ├─ views
│  ├─ App.vue
│  ├─ env.d.ts
│  └─ main.ts
├─ .editorconfig
├─ .env
├─ .env.development
├─ .env.production
├─ .env.test
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ index.html
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
├─ tsconfig.json
└─ vite.config.ts
```

## 七、项目后台接口 🧩

> 项目后台接口完全采用 Mock 数据  
> 推荐一个在线 Mock 平台： https://www.fastmock.site/
