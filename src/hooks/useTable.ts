import { Table } from "./interface";
import { reactive, computed, toRefs } from "vue";

/**
 * @description table 页面操作方法封装
 * @param apiUrl 获取表格数据 ApiUrl(必传)
 * @param initParam 获取数据初始化参数(不必传，默认为{})
 * @param isPageable 是否有分页(不必传，默认为true)
 * @param tableRef 当前表格的DOM(不必传，默认为“”)
 * */
export const useTable = (apiUrl: (params: any) => Promise<any>, initParam: any = {}, isPageable: boolean = true) => {
	const state = reactive<Table.TableStateProps>({
		// 表格数据
		tableData: [],
		// 是否展开更多搜索框
		searchShow: false,
		// 分页数据
		pageable: {
			// 当前页数
			pageNum: 1,
			// 每页显示条数
			pageSize: 10,
			// 总条数
			total: 0
		},
		// 查询参数(只包括查询)
		searchParam: {},
		// 初始化默认的查询参数
		initSearchParam: {},
		// 总参数(包含分页和查询参数)
		totalParam: {},
		// 是否点击过搜索(解决未点击搜索情况下，输入筛选条件然后点击下一页实际带筛选参数的问题)
		hasSearched: false
	});

	/**
	 * @description 分页查询数据(只包括分页和表格字段排序,其他排序方式可自行配置)
	 * */
	const pageParam = computed({
		get: () => {
			return {
				pageNum: state.pageable.pageNum,
				pageSize: state.pageable.pageSize
			};
		},
		set: (newVal: any) => {
			console.log("我是分页更新之后的值", newVal);
		}
	});

	/**
	 * @description 获取表格数据
	 * @return void
	 * */
	const getTableList = async () => {
		try {
			// 更新查询参数
			updatedTotalParam();
			Object.assign(state.totalParam, initParam);
			const { data } = await apiUrl(state.totalParam);
			state.tableData = isPageable ? data.datalist : data;
			// 解构后台返回的分页数据(如果有分页更新分页信息)
			const { pageNum, pageSize, total } = data;
			isPageable && updatePageable({ pageNum, pageSize, total });
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * @description 更新查询参数
	 * @return void
	 * */
	const updatedTotalParam = () => {
		state.totalParam = {};
		// 如果没有点击过搜索，那么就不带查询参数
		if (!state.hasSearched) return Object.assign(state.totalParam, pageParam.value);

		// 处理查询参数，可以给查询参数加前缀操作
		let nowSearchParam: { [propName: string]: any } = {};
		// 防止手动清空输入框携带参数（可以自定义查询参数前缀）
		for (let key in state.searchParam) {
			// * 某些情况下参数为 false/0 也应该携带参数
			if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
				nowSearchParam[key] = state.searchParam[key];
			}
		}
		Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {});
	};

	/**
	 * @description 更新分页信息
	 * @param resPageable 后台返回的分页数据
	 * @return void
	 * */
	const updatePageable = (resPageable: Table.Pageable) => {
		Object.assign(state.pageable, resPageable);
	};

	/**
	 * @description 表格数据查询
	 * @return void
	 * */
	const search = () => {
		state.pageable.pageNum = 1;
		state.hasSearched = true;
		getTableList();
	};

	/**
	 * @description 表格数据重置
	 * @return void
	 * */
	const reset = () => {
		state.pageable.pageNum = 1;
		state.hasSearched = false;
		state.searchParam = {};
		// 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
		Object.keys(state.initSearchParam).forEach(key => {
			state.searchParam[key] = state.initSearchParam[key];
		});
		getTableList();
	};

	/**
	 * @description 每页条数改变
	 * @param val 当前条数
	 * @return void
	 * */
	const handleSizeChange = (val: number) => {
		state.pageable.pageNum = 1;
		state.pageable.pageSize = val;
		getTableList();
	};

	/**
	 * @description 当前页改变
	 * @param val 当前页
	 * @return void
	 * */
	const handleCurrentChange = (val: number) => {
		state.pageable.pageNum = val;
		getTableList();
	};

	return {
		...toRefs(state),
		getTableList,
		search,
		reset,
		handleSizeChange,
		handleCurrentChange
	};
};
