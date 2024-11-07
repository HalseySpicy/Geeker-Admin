<template>
  <component
    :is="column.search?.render ?? `el-${column.search?.el}`"
    v-bind="{ ...handleSearchProps, ...placeholder, searchParam: _searchParam, clearable }"
    v-model.trim="_searchParam[itemSearchKey]"
    :data="column.search?.el === 'tree-select' ? columnEnum : []"
    :options="['cascader', 'select-v2'].includes(column.search?.el!) ? columnEnum : []"
  >
    <template v-if="isPrependSelectInput" #prepend>
      <el-select v-model="prependSelectType" placeholder="Select" style="width: 115px">
        <el-option
          v-for="(item, index) in column.search!.prependSelectOptions"
          :key="index"
          :label="item.label!"
          :value="item.value!"
        />
      </el-select>
    </template>

    <template v-if="column.search?.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column.search?.el === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></component>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts" name="SearchFormItem">
import { computed, inject, ref, watch } from "vue";
import { handleProp } from "@/utils";
import { ColumnProps, EnumProps } from "@/components/ProTable/interface";

interface SearchFormItem {
  column: ColumnProps;
  searchParam: { [key: string]: any };
}
const props = defineProps<SearchFormItem>();

// Re receive SearchParam
const _searchParam = computed(() => props.searchParam);

const itemSearchKey = computed(() => {
  // 如果 Input 搜索项带有前置选择框，则 _searchParam 对象加上前置搜索框选择的 option 的 value 作为 键值
  if (isPrependSelectInput.value) {
    return prependSelectType.value;
  }

  return props.column.search?.key ?? handleProp(props.column.prop!);
});

// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? "label",
    value: props.column.fieldNames?.value ?? "value",
    children: props.column.fieldNames?.children ?? "children"
  };
});

// 接收 enumMap (el 为 select-v2 需单独处理 enumData)
const enumMap = inject("enumMap", ref(new Map()));
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.prop);
  if (!enumData) return [];
  if (props.column.search?.el === "select-v2" && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return { ...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value] };
    });
  }
  return enumData;
});

// 处理透传的 searchProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleSearchProps = computed(() => {
  const label = fieldNames.value.label;
  const value = fieldNames.value.value;
  const children = fieldNames.value.children;
  const searchEl = props.column.search?.el;
  let searchProps = props.column.search?.props ?? {};
  if (searchEl === "tree-select") {
    searchProps = { ...searchProps, props: { ...searchProps, label, children }, nodeKey: value };
  }
  if (searchEl === "cascader") {
    searchProps = { ...searchProps, props: { ...searchProps, label, value, children } };
  }
  return searchProps;
});

// 处理默认 placeholder
const placeholder = computed(() => {
  const search = props.column.search;
  if (["datetimerange", "daterange", "monthrange"].includes(search?.props?.type) || search?.props?.isRange) {
    return {
      rangeSeparator: search?.props?.rangeSeparator ?? "至",
      startPlaceholder: search?.props?.startPlaceholder ?? "开始时间",
      endPlaceholder: search?.props?.endPlaceholder ?? "结束时间"
    };
  }
  const placeholder = search?.props?.placeholder ?? (search?.el?.includes("input") ? "请输入" : "请选择");
  return { placeholder };
});

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const search = props.column.search;
  return search?.props?.clearable ?? (search?.defaultValue == null || search?.defaultValue == undefined);
});

// Input 搜索项是否带有前置选择框
const isPrependSelectInput = computed(() => props.column.search?.el === "input" && props.column.search.prependSelect);

const prependSelectType = ref((props.column.search!.prependSelectOptions?.[0].value as string) ?? "");

if (isPrependSelectInput.value) {
  watch(
    () => prependSelectType.value,
    () => {
      // 前置搜索框选择后，清除掉挂在 _searchParam 的残留值
      props.column.search!.prependSelectOptions!.forEach(({ value }: EnumProps) => {
        delete _searchParam.value[value as string];
      });

      // 同步情况输入框内容
      _searchParam.value[itemSearchKey.value] = "";
    }
  );

  watch(
    () => _searchParam.value[itemSearchKey.value],
    () => {
      // 输入框值变化时，将下拉框和输入框的值作为 _searchParam 的键值对
      _searchParam.value[prependSelectType.value] = _searchParam.value[itemSearchKey.value];
    }
  );
}
</script>
