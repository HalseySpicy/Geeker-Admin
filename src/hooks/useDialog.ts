import { ElDialog } from "element-plus";
import type { ComponentInternalInstance, Ref } from "vue";
import { getCurrentInstance, h, isRef, onUnmounted, render } from "vue";
import { upperFirst } from "lodash";
import merge from "lodash/merge";
import type { JSX } from "vue/jsx-runtime";

type Content = Parameters<typeof h>[0] | string | Object | JSX.Element;
// 使用 InstanceType 获取 ElDialog 组件实例的类型
type ElDialogInstance = InstanceType<typeof ElDialog>;

// 从组件实例中提取 Props 类型
type DialogProps = ElDialogInstance["$props"] & {
  onBeforeOpen?: () => boolean | void; // 支持显示之前钩子
};

interface ElDialogSlots {
  header?: (...args: any[]) => Content;
  footer?: (...args: any[]) => Content;
}

interface Options<P> {
  dialogProps?: DialogProps;
  dialogSlots?: ElDialogSlots;
  contentProps?: P;
  callBack?: Function;
  closeEventName?: string;
}

// 定义工具函数，获取计算属性的option
function getOptions<P>(options?: Ref<Options<P>> | Options<P>) {
  if (!options) return {};
  return isRef(options) ? options.value : options;
}

export function useDialog<P = any>(content: Content, options?: Ref<Options<P>> | Options<P>) {
  let dialogInstance: ComponentInternalInstance | null = null;
  let fragment: Element | null = null;

  // 关闭并卸载组件
  const closeAfter = () => {
    if (fragment) {
      render(null, fragment as unknown as Element); // 卸载组件
      fragment.textContent = ""; // 清空文档片段
      fragment = null;
    }
    dialogInstance = null;
  };

  // 关闭对话框
  async function closeDialog() {
    if (dialogInstance) dialogInstance.props.modelValue = false;
  }

  // 获取当前组件实例，用于设置当前dialog的上下文，继承prototype
  const instance = getCurrentInstance();

  // 创建并挂载组件
  function openDialog(modifyOptions?: Partial<Options<P>>) {
    if (dialogInstance) {
      closeDialog();
      closeAfter();
    }
    const _options = getOptions(options);
    // 如果有修改，则合并options。替换之前的options变量为 _options
    if (modifyOptions) merge(_options, modifyOptions);
    const { dialogProps, contentProps } = _options;

    // 调用before钩子，如果为false则不打开
    if (dialogProps?.onBeforeOpen?.() === false) {
      return;
    }
    fragment = document.createDocumentFragment() as unknown as Element;

    // 转换closeEventName事件
    const closeEventName = `on${upperFirst(_options?.closeEventName || "closeDialog")}`;

    // 定义当前块关闭前钩子变量
    let onBeforeClose: (() => Promise<boolean | void> | boolean | void) | null;

    const vNode = h(
      ElDialog,
      {
        ...dialogProps,
        modelValue: true,
        beforeClose: async done => {
          // 配置`el-dialog`的关闭回调钩子函数
          const result = await onBeforeClose?.();
          if (result === false) {
            return;
          }
          done();
        },
        onClosed: () => {
          dialogProps?.onClosed?.();
          closeAfter();
          // 关闭后回收当前变量
          onBeforeClose = null;
        }
      },
      {
        default: () => [
          typeof content === "string"
            ? content
            : h(content as any, {
                ...contentProps,
                [closeEventName]: closeDialog, // 监听自定义关闭事件，并执行关闭
                // 监听自定义回调事件，并执行关闭
                callBack: (data: any) => {
                  if (_options.callBack) _options.callBack(data);
                  closeDialog();
                },
                beforeCloseDialog: (fn: () => boolean | void) => {
                  // 把`beforeCloseDialog`传递给`content`，当组件内部使用`props.beforeCloseDialog(fn)`时，会把fn传递给`onBeforeClose`
                  onBeforeClose = fn;
                }
              })
        ],
        ..._options.dialogSlots
      }
    );

    // 设置当前的上下文为使用者的上下文
    vNode.appContext = instance?.appContext || null;
    render(vNode, fragment);
    dialogInstance = vNode.component;
    document.body.appendChild(fragment);
  }

  onUnmounted(() => {
    closeDialog();
  });

  return { openDialog, closeDialog };
}
