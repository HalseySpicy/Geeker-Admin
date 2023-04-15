<template>
  <div class="select-filter">
    <div v-for="item in data" :key="item.key" class="select-filter-item">
      <div class="select-filter-item-title">
        <span>{{ item.title }} ：</span>
      </div>
      <span v-if="!item.options.length" class="select-filter-notData">暂无数据 ~</span>
      <el-scrollbar>
        <ul class="select-filter-list">
          <li
            v-for="option in item.options"
            :key="option.value"
            :class="{
              active:
                option.value === selected[item.key] ||
                (Array.isArray(selected[item.key]) && selected[item.key].includes(option.value))
            }"
            @click="select(item, option)"
          >
            <slot :row="option">
              <el-icon v-if="option.icon"><component :is="option.icon" /></el-icon>
              <span>{{ option.label }}</span>
            </slot>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts" name="selectFilter">
import { ref, watch } from "vue";

interface OptionsProps {
  value: string | number;
  label: string;
  icon?: string;
}

interface SelectDataProps {
  title: string; // 列表标题
  key: string; // 当前筛选项 key 值
  multiple?: boolean; // 是否为多选
  options: OptionsProps[]; // 筛选数据
}

interface SelectFilterProps {
  data?: SelectDataProps[]; // 选择的列表数据
  defaultValues?: { [key: string]: any }; // 默认值
}

const props = withDefaults(defineProps<SelectFilterProps>(), {
  data: () => [],
  defaultValues: () => ({})
});

// 重新接收默认值
const selected = ref<{ [key: string]: any }>({});
watch(
  () => props.defaultValues,
  () => {
    props.data.forEach(item => {
      if (item.multiple) selected.value[item.key] = props.defaultValues[item.key] ?? [""];
      else selected.value[item.key] = props.defaultValues[item.key] ?? "";
    });
  },
  { deep: true, immediate: true }
);

interface FilterEmits {
  (e: "change", value: any): void;
}
const emit = defineEmits<FilterEmits>();

/**
 * @description 选择筛选项
 * @param {Object} item 选中的哪项列表
 * @param {Object} option 选中的值
 * @return void
 * */
const select = (item: SelectDataProps, option: OptionsProps) => {
  if (!item.multiple) {
    // * 单选
    if (selected.value[item.key] !== option.value) selected.value[item.key] = option.value;
  } else {
    // * 多选
    // 如果选中的是第一个值，则直接设置
    if (item.options[0].value === option.value) selected.value[item.key] = [option.value];
    // 如果选择的值已经选中了，则删除选中的值
    if (selected.value[item.key].includes(option.value)) {
      let currentIndex = selected.value[item.key].findIndex((s: any) => s === option.value);
      selected.value[item.key].splice(currentIndex, 1);
      // 当全部删光时，把第第一个值选中
      if (selected.value[item.key].length == 0) selected.value[item.key] = [item.options[0].value];
    } else {
      // 未选中点击值的时候，追加选中值
      selected.value[item.key].push(option.value);
      // 单选中全部并且点击到了未选中的值，把第一个值删除掉
      if (selected.value[item.key].includes(item.options[0].value)) selected.value[item.key].splice(0, 1);
    }
  }
  emit("change", selected.value);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
