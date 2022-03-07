import { ref, reactive, computed } from "vue";

interface Pageable {
	pageNum: number;
	pageSize: number;
	total: number;
}
/**
 * @description table 页面操作方法封装
 * @param {string} url 导出表格的api地址(必传)
 * @return void
 * */
export const useTable = (apiUrl?: any) => {
	// 表格数据
	const tableData = ref([]);
	// 请求地址
	// const apiUrl = ref(null);
	// 是否有分页
	const isPageable = ref(true);
	// 是否点击过查询
	const hasSearched = ref<boolean>(false);
	// 分页数据
	const pageable = reactive<Pageable>({
		// 当前页数
		pageNum: 1,
		// 每页显示条数
		pageSize: 10,
		// 总条数
		total: 0
	});

	/**
	 * 获取表格数据
	 * @param params 初始条件参数
	 * @return void
	 */
	const getTableList = async (params: any = {}) => {
		try {
			const res = await apiUrl(params);
		} catch (error) {
			console.log(error);
		}
	};
};
