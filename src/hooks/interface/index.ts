declare namespace Table {
	type State = {
		// 表格数据
		tableData: any[];
		// 更多搜索
		searchShow: boolean;
		// 页面组件大小
		tableButtonSize: "small" | "medium" | "large";
		// 是否查看
		isView: boolean;
		// 是否有分页
		isPageable: boolean;
		// 分页器
		pageable: Pageable;
		// 总参数
		totalParam: {
			[key: string]: any;
		};
		// 查询参数
		searchParam: {
			[key: string]: any;
		};
		// 是否点击了搜索
		hasSearched: boolean;
	};
	type Pageable = {
		// 当前页
		pageNum?: number;
		// 每页条数
		pageSize?: number;
		// 总条数
		total?: number;
	};

	interface TableRequest {
		(params: any): any;
	}
}

declare namespace API {
	interface BaseResult<T = any> {
		code: number;
		msg: string;
		data: T;
	}
}

declare type Params<T> = {
	[K in keyof T]: T[K];
};

type ResultRes = Params<{ a: string; b: number }>;
