import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import * as parserVue from "vue-eslint-parser";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineFlatConfig } from "eslint-define-config";
import * as parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";

export default defineFlatConfig([
  {
    ...js.configs.recommended,
    ignores: ["**/.*", "dist/*", "*.d.ts", "public/*", "src/assets/**", "src/**/iconfont/**"],
    languageOptions: {
      globals: {
        // index.d.ts
        RefType: "readonly",
        EmitType: "readonly",
        TargetContext: "readonly",
        ComponentRef: "readonly",
        ElRef: "readonly",
        ForDataType: "readonly",
        AnyFunction: "readonly",
        PropType: "readonly",
        Writable: "readonly",
        Nullable: "readonly",
        NonNullable: "readonly",
        Recordable: "readonly",
        ReadonlyRecordable: "readonly",
        Indexable: "readonly",
        DeepPartial: "readonly",
        Without: "readonly",
        Exclusive: "readonly",
        TimeoutHandle: "readonly",
        IntervalHandle: "readonly",
        Effect: "readonly",
        ChangeEvent: "readonly",
        WheelEvent: "readonly",
        ImportMetaEnv: "readonly",
        Fn: "readonly",
        PromiseFn: "readonly",
        ComponentElRef: "readonly",
        parseInt: "readonly",
        parseFloat: "readonly"
      }
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "no-var": "error", // 要求使用 let 或 const 而不是 var
      "no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
      "prefer-const": "off", // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
      "no-use-before-define": "off" // 禁止在 函数/类/变量 定义之前使用它们
      // "no-debugger": "off",
      // "no-unused-vars": [
      //   "error",
      //   {
      //     argsIgnorePattern: "^_",
      //     varsIgnorePattern: "^_"
      //   }
      // ],
      // "prettier/prettier": [
      //   "error",
      //   {
      //     endOfLine: "auto"
      //   }
      // ]
    }
  },
  {
    files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules,
      "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
      "@typescript-eslint/no-empty-function": "error", // 禁止空函数
      "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
      "@typescript-eslint/ban-ts-comment": "error", // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
      "@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
      "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间
      "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
      "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
      "@typescript-eslint/no-var-requires": "off", // 允许使用 require() 函数导入模块
      "@typescript-eslint/no-non-null-assertion": "off" // 不允许使用后缀运算符的非空断言(!)
      // "@typescript-eslint/ban-types": "off",
      // "@typescript-eslint/no-redeclare": "error",
      // "@typescript-eslint/ban-ts-comment": "off",
      // "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/prefer-as-const": "warn",
      // "@typescript-eslint/no-empty-function": "off",
      // "@typescript-eslint/no-non-null-assertion": "off",
      // "@typescript-eslint/no-import-type-side-effects": "error",
      // "@typescript-eslint/explicit-module-boundary-types": "off",
      // "@typescript-eslint/no-namespace": "off",
      // "@typescript-eslint/consistent-type-imports": [
      //   "error",
      //   { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" }
      // ],
      // "@typescript-eslint/prefer-literal-enum-member": ["error", { allowBitwiseExpressions: true }],
      // "@typescript-eslint/no-unused-vars": [
      //   "error",
      //   {
      //     argsIgnorePattern: "^_",
      //     varsIgnorePattern: "^_"
      //   }
      // ]
    }
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "unused-imports/no-unused-vars": "off"
    }
  },
  // {
  //   files: ["**/*.?([cm])js"],
  //   rules: {
  //     "@typescript-eslint/no-require-imports": "off",
  //     "@typescript-eslint/no-var-requires": "off"
  //   }
  // },
  {
    files: ["**/*.vue"],
    languageOptions: {
      globals: {
        $: "readonly",
        $$: "readonly",
        $computed: "readonly",
        $customRef: "readonly",
        $ref: "readonly",
        $shallowRef: "readonly",
        $toRef: "readonly"
      },
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        sourceType: "module"
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["vue3-essential"].rules,
      ...pluginVue.configs["vue3-recommended"].rules,
      // vue (https://eslint.vuejs.org/rules)
      "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该 no-unused-vars 规则时有效
      "vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
      "vue/no-mutating-props": "error", // 不允许改变组件 prop
      "vue/custom-event-name-casing": "error", // 为自定义事件名称强制使用特定大小写
      "vue/singleline-html-element-content-newline": "off", // 在单行元素的内容前后需要换行符
      "vue/attributes-order": "off", // 强制执行属性顺序
      "vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
      "vue/html-closing-bracket-newline": [
        "off",
        {
          singleline: "never",
          multiline: "always"
        }
      ], // 在标签的右括号之前要求或禁止换行
      "vue/attribute-hyphenation": "error", // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
      "vue/attributes-order": "off", // vue api使用顺序，强制执行属性顺序
      "vue/no-v-html": "off", // 禁止使用 v-html
      "vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
      "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
      "vue/no-setup-props-destructure": "off" // 禁止解构 props 传递给 setup
      // "no-undef": "off",
      // "no-unused-vars": "off",
      // "vue/no-v-html": "off",
      // "vue/require-default-prop": "off",
      // "vue/require-explicit-emits": "off",
      // "vue/multi-word-component-names": "off",
      // "vue/no-setup-props-reactivity-loss": "off",
      // "vue/html-self-closing": [
      //   "error",
      //   {
      //     html: {
      //       void: "always",
      //       normal: "always",
      //       component: "always"
      //     },
      //     svg: "always",
      //     math: "always"
      //   }
      // ]
    }
  }
]);
