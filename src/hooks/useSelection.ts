import { ref, computed } from "vue";

/**
 * @description 表格多选数据操作
 * @param {String} rowKey 当表格可以多选时，所指定的 id
 * */
export const useSelection = (rowKey: string = "id") => {
	// 是否选中数据
	const isSelected = ref<boolean>(false);
	// 选中的数据列表
	const selectedList = ref([]);

	// 当前选中的所有ids(数组)，可根据项目自行配置id字段
	const selectedListIds = computed((): string[] => {
		let ids: string[] = [];
		selectedList.value.forEach(item => ids.push(item[rowKey]));
		return ids;
	});

	/**
	 * @description 多选操作
	 * @param {Array} rowArr 当前选择的所有数据
	 * @return void
	 */
	const selectionChange = (rowArr: any) => {
		rowArr.length === 0 ? (isSelected.value = false) : (isSelected.value = true);
		selectedList.value = rowArr;
	};

	return {
		isSelected,
		selectedList,
		selectedListIds,
		selectionChange
	};
};
