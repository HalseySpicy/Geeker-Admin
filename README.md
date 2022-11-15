# Vue 3.2 + TypeScript + Pinia + Vite3 + Element-Plus 管理系统（开源啦 🎉🎉）

![banner](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/banner.png)

### 前言 📖

Geeker Admin，基于 Vue3.2、TypeScript、Vite3、Pinia、Element-Plus 开源的一套后台管理模板，目前利用空余时间开发 🕒🕒。项目中很多样式都是借鉴其它的管理系统，但代码是完全自己编写的，整个项目还有很多地方不完善，后期会持续更新（项目文档），希望大家能多提意见。

### ？为什么开发这个管理系统 🤷‍♂️

- 主要是学习下 Vue3.2 + TypeScript
- 目前看了很多 Vue3 的开源后台管理系统，感觉都非常庞大，很多功能基本上也用不到，所以自己就尝试写了一下这个管理系统（适合自己的才是最好的 🤣）

### 项目相关文档 📚

- 项目更新日志：[CHANGELOG.md](./CHANGELOG.md)

- 代码规范文档：[STANDARD.md](./STANDARD.md)

### 一、在线预览 👀

- Link：https://admin.spicyboy.cn

### 二、Git 仓库地址 (欢迎 Star⭐)

- Gitee：https://gitee.com/laramie/Geeker-Admin
- GitHub：https://github.com/HalseySpicy/Geeker-Admin

### 三、🔥🔥🔥 React18 最新版本已完成 🎉 欢迎 Star

- Gitee：https://gitee.com/laramie/Hooks-Admin
- GitHub：https://github.com/HalseySpicy/Hooks-Admin

### 四、🔨🔨🔨 项目功能

- 🚀 使用 Vue3.2 开发，单文件组件 `＜script setup＞`
- 🚀 采用 Vite3 作为项目开发、打包工具（配置了 Gzip 打包、TSX 语法、跨域代理、打包预览工具……）
- 🚀 整个项目集成了 TypeScript （完全是为了想学习 🤣）
- 🚀 使用 Pinia🍍 替代 Vuex，轻量、简单、易用（香啊~🤤 集成了持久化插件）
- 🚀 使用 TypeScript 对 Axios 整个二次封装 （全局错误拦截、常用请求封装、全局请求 Loading、取消重复请求……）
- 🚀 对表格的所有操作基本都封装成了 Hooks （表格数据搜索、重置、查询、分页、多选、单条数据操作、文件上传、下载、格式化单元格内容……）
- 🚀 基于 Element 二次封装 [Pro-Table 组件](https://juejin.cn/post/7166068828202336263) ，表格页面全部传成配置项 Columns
- 🚀 支持 Element 组件大小切换、暗黑模式、i18n 国际化（i18n 暂时没配置所有文件，根据项目自行配置）
- 🚀 使用 vue-router 进行路由权限拦截（403 页面）、页面按钮权限配置、路由懒加载
- 🚀 使用 keep-alive 对整个页面进行缓存，支持多级嵌套页面（缓存路由里可配置、页面切换带动画）
- 🚀 常用自定义指令开发（复制、水印、拖拽、节流、防抖、长按……）
- 🚀 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（STANDARD.md 文件）
- 🚀 使用 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息（STANDARD.md 文件）

### 五、安装使用步骤 📔

- **Clone：**

```text
# Gitee
git clone https://gitee.com/laramie/Geeker-Admin.git
# GitHub
git clone https://github.com/HalseySpicy/Geeker-Admin.git
```

- **Install：**

```text
npm install
cnpm install

# npm install 安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org

# 这里只是为了指定依赖包版本，防止没有版本锁 lock 而安装最新依赖包，导致的项目报错
npm i @element-plus/icons-vue@1.1.4 @vueuse/core@8.0.1 @wangeditor/editor@5.1.12 axios@0.27.2 echarts@5.3.0 echarts-liquidfill@3.1.0 element-plus@2.2.17 js-md5@0.7.3 mitt@3.0.0 nprogress@0.2.0 pinia@2.0.12 pinia-plugin-persistedstate@1.6.1 qs@6.11.0 vue@3.2.37 vue-i18n@9.1.9 vue-router@4.0.12 vue3-seamless-scroll@1.2.0 vuedraggable@4.1.0 --save
```

- **Run：**

```text
npm run dev
npm run serve
```

- **Build：**

```text
# 开发环境
npm run build:dev

# 测试环境
npm run build:test

# 生产环境
npm run build:pro
```

- **Lint：**

```text
# eslint 检测代码
npm run lint:eslint

# prettier 格式化代码
npm run lint:prettier

# stylelint 格式化样式
lint:stylelint
```

- **commit：**

```text
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
npm run commit
```

### 六、项目截图 📷

#### 1、登录页：

![login-light](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220909224442.png)

![login-dark](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220909224447.png)

#### 2、首页：

![home_light](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220909224501.png)

![home-dark](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220909224505.png)

#### 3、表格页：

![table_light](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220909224703.png)

![table-dark](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220909224436.png)

#### 4、数据大屏：

![dataScreen02](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220909224444.png)

### 七、文件资源目录 📚

```text
Geeker-Admin
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ enums               # 项目枚举
│  ├─ hooks               # 常用 Hooks
│  ├─ languages            # 语言国际化
│  ├─ layouts              # 框架布局
│  ├─ routers             # 路由管理
│  ├─ stores               # pinia store
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 入口页面
│  ├─ env.d.ts            # ts 识别 vue 文件
│  └─ main.ts             # 入口文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config     # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ STANDARD.md            # 项目编码规范说明书
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```

### 八、浏览器支持

> 默认支持以下浏览器，vue3.2 不支持 IE 浏览器。更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)
>
> **💢 请不要使用 QQ && 360 浏览器开发，不识别 某些 ES6 以上语法**

| ![Edge](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Edge.png) | ![Firefox](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Firefox.png) | ![Chrome](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Chrome.png) | ![Safari](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Safari.png) |
| :-----------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
|                              last 2 versions                              |                                 last 2 versions                                 |                                last 2 versions                                |                                last 2 versions                                |

### 九、项目后台接口 🧩

> 项目后台接口完全采用 Mock 数据，感谢以下 Mock 平台支持

- FastMock： https://www.fastmock.site/
- EasyMock：https://mock.mengxuegu.com/

### 十、微信交流群

> 微信二群已超过 200 人，需要加我好友，拉大家进群 🤪

|                                           微信群二维码                                            |
| :-----------------------------------------------------------------------------------------------: |
| <img src="https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220914145852.png" width=170> |

### 十一、捐赠 🍵

> **如果你正在使用这个项目或者喜欢这个项目的，可以通过以下方式支持我**

- **Star、Fork、Watch** 一键三连 🚀🚀

- 通过 **微信、支付宝** 一次性捐款，够维护访问地址就行 🤣🤣

|                                                         微信                                                          |                                                        支付宝                                                         |
| :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| <img src="https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220610144145.png" alt="Wechat QRcode" width=170> | <img src="https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220610144200.png" alt="Alipay QRcode" width=170> |
