import { AuthButtonsStore } from "@/store/modules/authButtons";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

/**
 * @description 页面按钮权限
 * */
export const useAuthButtons = () => {
	// 当前页面关键字
	const nowKey = ref<string>("");
	const route = useRoute();
	nowKey.value = route.meta.key as string;

	const BUTTONS = computed(() => {
		const authButtonsStore = AuthButtonsStore();
		return authButtonsStore.authorButtonsObj[nowKey.value] || {};
	});

	return {
		nowKey,
		BUTTONS
	};
};
