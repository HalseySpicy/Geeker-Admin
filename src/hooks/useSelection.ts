import { ref, computed } from "vue";

/**
 * @description 表格多选数据操作
 * @param {String} selectId 当表格可以多选时，所指定的 id
 * */
export const useSelection = (selectId: string = "id") => {
	// 是否选中数据
	const isSelected = ref<boolean>(false);
	// 选中的数据列表
	const selectedList = ref([]);

	// 当前选中的所有ids(数组)，可根据项目自行配置id字段
	const selectedListIds = computed((): string[] => {
		let ids: string[] = [];
		selectedList.value.forEach(item => {
			ids.push(item[selectId]);
		});
		return ids;
	});

	// 获取行数据的 Key,用来优化 Table 的渲染;在使用跨页多选时,该属性是必填的
	const getRowKeys = (row: any) => {
		return row[selectId];
	};

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
		selectionChange,
		getRowKeys
	};
};
