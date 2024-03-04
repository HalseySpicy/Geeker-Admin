<template>
  <div class="table-edit-input" @mouseenter="evt => onMouseEnterHandler()" @mouseleave="evt => onMouseLeaveHandler()">
    <div v-show="!isEdit" class="unedit-con">
      <p>{{ props.scope.column.property ? handleRowAccordingToProp(props.scope.row, props.scope.column.property) : "" }}</p>
      <el-icon v-show="isShowEditIcon" class="edit-icon" @click="evt => onEnterEditHandler()"><Edit /></el-icon>
    </div>
    <Transition
      enter-active-class="animate__animated animate__fade-in-up animate__faster"
      :on-after-enter="
        () => {
          inputIns?.focus();
        }
      "
    >
      <el-input v-show="isEdit" ref="inputIns" v-model="inputValue" v-bind="$attrs">
        <template #suffix>
          <el-icon style="cursor: pointer" @click="evt => onSaveHandler()"><Select /></el-icon>
        </template>
      </el-input>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ElInput, InputProps, ElIcon, RenderRowData } from "element-plus";
import { Select, Edit } from "@element-plus/icons-vue";

import { ref, computed } from "vue";
import { handleRowAccordingToProp, sethandleRowAccordingToProp } from "@/utils";

interface Props extends Partial<InputProps> {
  scope: RenderRowData<any>;
  updateCol: (row: typeof props.scope.row, prop: string, oldValue: string, newValue: string, undo: () => void) => void;
}
defineOptions({ name: "EditableCell" });

const props = withDefaults(defineProps<Props>(), {});

const inputValue = ref("");
const inputIns = ref<InstanceType<typeof ElInput>>();

const isEdit = ref(false); //是否是编辑状态

const isMouseEnter = ref(false); //鼠标进入当前cell的标识

//是否显示进入编辑状态的图标
const isShowEditIcon = computed(() => {
  return !isEdit.value && isMouseEnter.value;
});

const onMouseEnterHandler = () => {
  isMouseEnter.value = true;
};

const onMouseLeaveHandler = () => {
  isMouseEnter.value = false;
};

/**
 * 进入编辑状态
 */
const onEnterEditHandler = () => {
  inputValue.value = handleRowAccordingToProp(props.scope.row, props.scope.column.property);
  isEdit.value = true;
};

/**
 * 本次的编辑保存处理
 * @param evt
 */
const onSaveHandler = () => {
  const prop = props.scope.column.property;
  const oldValue = handleRowAccordingToProp(props.scope.row, prop);
  const undo = () => {
    sethandleRowAccordingToProp(props.scope.row, prop, oldValue);
  };
  //emits("unactiveEdit", getTableCellFlag(props.scope), props.scope);
  isEdit.value = false;
  sethandleRowAccordingToProp(props.scope.row, prop, inputValue.value);

  props.updateCol(props.scope.row, prop, oldValue, inputValue.value, undo);
};
</script>

<style lang="scss"></style>

<style scoped lang="scss">
$default-min-height: 28px;
$animate-duration: 1s;
.table-edit-input {
  width: 100%;
  min-height: $default-min-height;
  .unedit-con {
    position: relative;
    width: 100%;
    min-height: $default-min-height;
    .edit-icon {
      position: absolute;
      top: 0;
      right: 5px;
      bottom: 0;
      margin: auto 0;
      cursor: pointer;
    }
  }
  .animate__animated {
    animation-duration: 1s;
    animation-duration: $animate-duration;
    animation-fill-mode: both;
  }
  .animate__animated.animate__faster {
    animation-duration: calc(1s / 2);
    animation-duration: calc($animate-duration / 2);
  }
  .animate__fade-in-up {
    animation-name: fade-in-up;
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
