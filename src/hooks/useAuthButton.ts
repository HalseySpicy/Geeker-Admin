import { ref, computed } from "vue";
import { useRoute } from "vue-router";

/**
 * @description 页面按钮权限
 * */
export const useAuthButton = () => {
	// 当前页面关键字
	const key = ref<string>("");

	const route = useRoute();
	key.value = route.meta.key as string;

	const BUTTONS = computed(() => {});

	return {
		key
	};
};
