export namespace Table {
	export interface Pageable {
		pageNum: number;
		pageSize: number;
		total: number;
	}
	export interface TableStateProps {
		tableData: any[];
		searchShow: boolean;
		hasSearched: boolean;
		pageable: Pageable;
		searchParam: {
			[key: string]: any;
		};
		totalParam: {
			[key: string]: any;
		};
	}
}
