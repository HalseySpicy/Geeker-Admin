module.exports = {
  // 超过最大值换行
  printWidth: 120,
  // 缩进字节数
  tabWidth: 2,
  // 缩进不使用tab，使用空格，默认false(false为空2，true为空4)
  useTabs: false,
  // 结尾不用分号(true有，false没有)
  semi: true,
  // 使用单引号(true单双引号，false双引号)
  singleQuote: false,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  quoteProps: "as-needed",
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  // 行尾逗号,默认none,可选 none|es5|all
  // es5 包括es5中的数组、对象
  // all 包括函数对象等所有可选
  trailingComma: "none", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  // 在jsx中把'>' 单独放一行
  jsxBracketSameLine: false,
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 ,always：不省略括号
  arrowParens: "avoid",
  // 如果文件顶部已经有一个doclock，这个选项将新建一行注释，并打上@format标记。
  insertPragma: false,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  proseWrap: "preserve",
  // 在html中空格是否是敏感的 "css" - 遵守CSS显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
  htmlWhitespaceSensitivity: "strict",
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: "auto",
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不格式化vue文件，vue文件的格式化单独设置
  disableLanguages: ["vue"]
  // Vue文件脚本和样式标签缩进
  // vueIndentScriptAndStyle: false,
};
