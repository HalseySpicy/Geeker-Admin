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

	// 当前页按钮权限列表
	const BUTTONS = computed(() => {
		const authButtonsStore = AuthButtonsStore();
		// 未获取接口数据前，设为空对象，否则报错
		return authButtonsStore.authorButtonsObj[nowKey.value] || {};
	});

	return {
		nowKey,
		BUTTONS
	};
};
