# 项目规范文档 📚

## 一、项目文件、组件命名规范

> **完全采用 Vue 官方推荐的风格指南，请务必查看 💢**
>
> **Link：** https://v3.cn.vuejs.org/style-guide



## 二、代码格式化工具（Prettier）

### 1、下载安装 prettier：

```text
npm install prettier
```

### 2、安装 Vscode 插件（Prettier）：

![prettier](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220510134626.png)

### 3、配置 Prettier：

```javascript
// https://www.prettier.cn
module.exports = {
	// 超过最大值换行
	printWidth: 130,
	// 缩进字节数
	tabWidth: 2,
	// 使用制表符而不是空格缩进行(true代表table，false代表space)
	useTabs: true,
	// 结尾不用分号(true有，false没有)
	semi: true,
	// 使用单引号(true单双引号，false双引号)
	singleQuote: false,
	// 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
	quoteProps: "as-needed",
	// 在对象，数组括号与文字之间加空格 "{ foo: bar }"
	bracketSpacing: true,
	// 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
	trailingComma: "none",
	// 在JSX中使用单引号而不是双引号
	jsxSingleQuote: false,
	//  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 ,always：不省略括号
	arrowParens: "avoid",
	// 如果文件顶部已经有一个 doclock，这个选项将新建一行注释，并打上@format标记。
	insertPragma: false,
	// 指定要使用的解析器，不需要写文件开头的 @prettier
	requirePragma: false,
	// 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
	proseWrap: "preserve",
	// 在html中空格是否是敏感的 "css" - 遵守CSS显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
	htmlWhitespaceSensitivity: "css",
	// 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
	endOfLine: "auto",
	// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
	rangeStart: 0,
	rangeEnd: Infinity,
	// Vue文件脚本和样式标签缩进
	vueIndentScriptAndStyle: false
};
```



## 三、代码规范工具（ESLint）

### 1、安装 ESLint 相关插件：

```text
npm install eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

|               依赖               |                               作用描述                               |
| :------------------------------: | :------------------------------------------------------------------: |
|              eslint              |                            ESLint 核心库                             |
|      eslint-config-prettier      |               关掉所有和 Prettier 冲突的 ESLint 的配置               |
|      eslint-plugin-prettier      |         将 Prettier 的 rules 以插件的形式加入到 ESLint 里面          |
|        eslint-plugin-vue         |                      为 Vue 使用 ESlint 的插件                       |
| @typescript-eslint/eslint-plugin |      ESLint 插件，包含了各类定义好的检测 TypeScript 代码的规范       |
|    @typescript-eslint/parser     | ESLint 的解析器，用于解析 TypeScript，从而检查和规范 TypeScript 代码 |

### 2、安装 Vscode 插件（ESLint、TSLint）：

- **ESLint：**

![eslint](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220510135758.png)

- **TSLint：**

![tslint](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220510140124.png)

### 3、配置 ESLint：

```javascript
module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	/* 指定如何解析语法 */
	parser: "vue-eslint-parser",
	/* 优先级低于 parse 的语法解析配置 */
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: 2020,
		sourceType: "module",
		jsxPragma: "React",
		ecmaFeatures: {
			jsx: true
		}
	},
	/* 继承某些已有的规则 */
	extends: ["plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended", "prettier", "plugin:prettier/recommended"],
	/*
	 * "off" 或 0    ==>  关闭规则
	 * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
	 * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
	 */
	rules: {
		// eslint (http://eslint.cn/docs/rules)
		"no-var": "error", // 要求使用 let 或 const 而不是 var
		"no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
		"no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
		"prefer-const": "off", // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
		"no-irregular-whitespace": "off", // 禁止不规则的空白

		// typeScript (https://typescript-eslint.io/rules)
		"@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
		"@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
		"@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
		"@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
		"@typescript-eslint/ban-ts-ignore": "off", // 禁止使用 @ts-ignore
		"@typescript-eslint/ban-types": "off", // 禁止使用特定类型
		"@typescript-eslint/explicit-function-return-type": "off", // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
		"@typescript-eslint/no-var-requires": "off", // 不允许在 import 语句中使用 require 语句
		"@typescript-eslint/no-empty-function": "off", // 禁止空函数
		"@typescript-eslint/no-use-before-define": "off", // 禁止在变量定义之前使用它们
		"@typescript-eslint/ban-ts-comment": "off", // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
		"@typescript-eslint/no-non-null-assertion": "off", // 不允许使用后缀运算符的非空断言(!)
		"@typescript-eslint/explicit-module-boundary-types": "off", // 要求导出函数和类的公共类方法的显式返回和参数类型

		// vue (https://eslint.vuejs.org/rules)
		"vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
		"vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
		"vue/no-mutating-props": "off", // 不允许组件 prop的改变（明天找原因）
		"vue/custom-event-name-casing": "off", // 为自定义事件名称强制使用特定大小写
		"vue/attributes-order": "off", // vue api使用顺序，强制执行属性顺序
		"vue/one-component-per-file": "off", // 强制每个组件都应该在自己的文件中
		"vue/html-closing-bracket-newline": "off", // 在标签的右括号之前要求或禁止换行
		"vue/max-attributes-per-line": "off", // 强制每行的最大属性数
		"vue/multiline-html-element-content-newline": "off", // 在多行元素的内容之前和之后需要换行符
		"vue/singleline-html-element-content-newline": "off", // 在单行元素的内容之前和之后需要换行符
		"vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
		"vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
		"vue/multi-word-component-names": "off" // 要求组件名称始终为 “-” 链接的单词
	}
};
```



## 四、样式规范工具（StyleLint）



## 五、EditorConfig 配置

### 1、简介

> **EditorConfig** 帮助开发人员在 **不同的编辑器** 和 **IDE** 之间定义和维护一致的编码样式。

### 2、安装 VsCode 插件（EditorConfig ）：

![editorConfig](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220510142005.png)

### 3、配置 EditorConfig：

```javascript
# http://editorconfig.org
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
end_of_line = lf # 控制换行类型(lf | cr | crlf)
insert_final_newline = true # 始终在文件末尾插入一个新行
indent_style = tab # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
max_line_length = 130 # 最大行长度

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off # 关闭最大行长度限制
trim_trailing_whitespace = false # 关闭末尾空格修剪
```



## 六、Git 流程规范配置

|              依赖               |                           作用描述                           |
| :-----------------------------: | :----------------------------------------------------------: |
|         @commitlint/cli         |               用来在命令行中提示用户提交信息的               |
| @commitlint/config-conventional |                    **Anglar** 的提交规范                     |
|           commitizen            |                                                              |
|           commitlint            |    校验 **git commit** 信息是否符合规范，不符合则提交不了    |
|             cz-git              |                                                              |
|              husky              |  操作 **git** 钩子的工具（在 **commit** 之前执行某些命令）   |
|           lint-staged           | 在提交之前使用 **prettier** 格式化本地暂存区的代码，并进行 **eslint** 校验 |



### 1、husky（操作 git 钩子的工具）：

> **安装：**

````text
npm install husky -D
````

> **使用（为了添加.husky文件夹）：**

````text
# 编辑 package.json > prepare 脚本并运行一次
npm set-script prepare "husky install"
npm run prepare
````

> **添加 ESlint Hook（在.husky 文件夹下添加 pre-commit 文件）：**
>
> **作用：通过钩子函数，判断提交的代码是否符合规范，其实就是执行 ESlint 校验**

````text
npx husky add .husky/pre-commit "npm run lint:eslint"
````



### 2、commitlint（commit 信息校验工具，不符合则报错）

> **安装：**

````text
# @commitlint/config-conventional 这是一个规范配置,标识采用什么规范来执行消息校验

npm i commitlint @commitlint/cli @commitlint/config-conventional -D
````

> **配置命令（在.husky 文件夹下添加 commit-msg 文件）：**

````text
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
````

> **添加 commitlint.config.js 文件：**

````javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', //  修复
        'docs', // 文档变更
        'style', // 代码格式（不影响代码运行的变动）
        'refactor', // 重构（既不是增加feature）,也不是修复bug
        'pref', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
````







### 3、commitizen（辅助 commit 信息，像 Angular 规范，必须安装才能执行 git-cz）

````text
npm install commitizen -g
````



### 4、cz-git（https://cz-git.qbenben.com/zh/）

> **指定提交文字规范，一款工程性更强，高度自定义，标准输出格式的 commitizen 适配器**

````text
npm install cz-git -D
````

> **配置 package.json：**

````text
"config": {
  "commitizen": {
    "path": "node_modules/cz-git"
  }
}
````

> **新建 .commitlintrc.js：**

````javascript
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: "Denote the SCOPE of this change (optional):",
      customScope: "Denote the SCOPE of this change:",
      subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking:
        'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixsSelect:
        "Select the ISSUES type of changeList by this change (optional):",
      customFooterPrefixs: "Input ISSUES prefix:",
      footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
      confirmCommit: "Are you sure you want to proceed with the commit above?",
    },
    types: [
      {
        value: "feat",
        name: "feat:     ✨  A new feature",
        emoji: ":sparkles:",
      },
      { value: "fix", name: "fix:      🐛  A bug fix", emoji: ":bug:" },
      {
        value: "docs",
        name: "docs:     📝  Documentation only changes",
        emoji: ":memo:",
      },
      {
        value: "style",
        name: "style:    💄  Changes that do not affect the meaning of the code",
        emoji: ":lipstick:",
      },
      {
        value: "refactor",
        name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature",
        emoji: ":recycle:",
      },
      {
        value: "perf",
        name: "perf:     ⚡️  A code change that improves performance",
        emoji: ":zap:",
      },
      {
        value: "test",
        name: "test:     ✅  Adding missing tests or correcting existing tests",
        emoji: ":white_check_mark:",
      },
      {
        value: "build",
        name: "build:    🏗️   Changes that affect the build system or external dependencies",
        emoji: ":building_construction:",
      },
      {
        value: "ci",
        name: "ci:       💚  Changes to our CI configuration files and scripts",
        emoji: ":green_heart:",
      },
      {
        value: "chore",
        name: "chore:    🔨  Other changes that don't modify src or test files",
        emoji: ":hammer:",
      },
      {
        value: "revert",
        name: "revert:   ⏪️  Reverts a previous commit",
        emoji: ":rewind:",
      },
    ],
    useEmoji: true,
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    allowBreakingChanges: ["feat", "fix"],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixs: [
      { value: "closed", name: "closed:   ISSUES has been processed" },
    ],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: "",
  },
};
````

### 5、暂时没用💢 lint-staged（本地暂存代码检查工具，应该暂时没有，因为上面有 ESlint 校验）

> **安装：**

````text
npm install lint-staged --save-dev
````

> **配置命令：**

````text
npx husky add .husky/pre-commit "npx lint-staged"
````

> **新增 .lintstagedrc.json 文件：**

````text
{
    "*.{js,jsx,ts,tsx}": ["prettier --write .", "eslint  --fix"],
    "*.md": ["prettier --write"]
}
````







































