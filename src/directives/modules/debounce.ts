/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  __handleClick__: () => any;
}
const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    console.log(binding.arg);
    if (typeof binding.value !== "function") {
      throw "callback must be a function";
    }
    const wait = binding.arg ? ~~binding.arg : 500;
    let timer: NodeJS.Timeout | null = null;
    el.__handleClick__ = function () {
      if (timer) {
        clearInterval(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, wait);
    };
    el.addEventListener("click", el.__handleClick__);
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  }
};

export default debounce;
