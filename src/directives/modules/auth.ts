/**
 * v-auth
 * 按钮权限指令
 */
import { AuthStore } from "@/stores/modules/auth";
import type { Directive, DirectiveBinding } from "vue";

const auth: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding;
		const authStore = AuthStore();
		const currentPageRoles = authStore.authButtonListGet[authStore.routeName] ?? {};
		if (value && value instanceof Array && value.length) {
			const hasPermission = value.every(item => {
				return Object.keys(currentPageRoles).includes(item);
			});
			if (!hasPermission) el.remove();
		}
	}
};

export default auth;
