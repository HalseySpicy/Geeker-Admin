export namespace Table {
	export interface Pageable {
		pageNum: number;
		pageSize: number;
		total: number;
	}
	export interface TableStateProps {
		tableData: any[];
		searchShow: boolean;
		pageable: Pageable;
		searchParam: {
			[key: string]: any;
		};
		initSearchParam: {
			[key: string]: any;
		};
		totalParam: {
			[key: string]: any;
		};
		icon?: {
			[key: string]: any;
		};
		hasSearched: boolean;
	}
}

export namespace HandleData {
	export type MessageType = "" | "success" | "warning" | "info" | "error";
}
