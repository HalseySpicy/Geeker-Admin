import { ref, onMounted, onUnmounted } from "vue";

/**
 * @description 获取本地时间
 */
export function useTime() {
	let timer: any; // 定时器
	const year = ref(0); // 年份
	const month = ref(0); // 月份
	const week = ref(""); // 星期几
	const day = ref(0); // 天数
	const hour = ref<number | string>(0); // 小时
	const minute = ref<number | string>(0); // 分钟
	const second = ref(0); // 秒

	// 更新时间
	const updateTime = () => {
		const date = new Date();
		year.value = date.getFullYear();
		month.value = date.getMonth() + 1;
		week.value = "日一二三四五六".charAt(date.getDay());
		day.value = date.getDate();
		hour.value =
			(date.getHours() + "")?.padStart(2, "0") ||
			new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getHours());
		minute.value =
			(date.getMinutes() + "")?.padStart(2, "0") ||
			new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getMinutes());
		second.value = date.getSeconds();
	};

	// 原生时间格式化
	// new Intl.DateTimeFormat('zh', {
	//     year: 'numeric',
	//     month: '2-digit',
	//     day: '2-digit',
	//     hour: '2-digit',
	//     minute: '2-digit',
	//     second: '2-digit',
	//     hour12: false
	// }).format(new Date())

	updateTime();

	onMounted(() => {
		clearInterval(timer);
		timer = setInterval(() => updateTime(), 1000);
	});

	onUnmounted(() => {
		clearInterval(timer);
	});

	return { month, day, hour, minute, second, week };
}
