/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
interface ElType extends HTMLElement {
	copyData: string | number;
	__handleClick__: any;
}
const copy: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
		el.addEventListener("click", handleClick);
	},
	updated(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el.__handleClick__);
	}
};
function normalCopy(copyData: string) {
	const input = document.createElement("input");
	input.value = copyData;
	document.body.appendChild(input);
	input.select();
	document.execCommand("Copy");
	document.body.removeChild(input);
	copySuccess();
}
function copySuccess() {
	ElMessage({
		type: "success",
		message: "复制成功"
	});
}
function handleClick(this: any) {
	const copyData = this.copyData.toLocaleString();
	if (window.navigator.clipboard) {
		window.navigator.clipboard
			.writeText(copyData)
			.then(copySuccess)
			.catch(() => {
				normalCopy(copyData);
			});
	} else {
		normalCopy(copyData);
	}
}

export default copy;
