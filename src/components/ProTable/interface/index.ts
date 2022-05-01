export interface EnumProps {
	label: string;
	value: any;
}

export type SearchType = "text" | "select" | "multipleSelect" | "date" | "timerange" | "datetimerange";

export type TypeProp = "index" | "selection";

export type FixedProp = "left" | "right";

export interface ColumnProps {
	type: TypeProp; // index | selection（特殊类型）
	prop: string; // 单元格数据（非特殊类型必填）
	label: string; // 单元格标题（非特殊类型必填）
	width: number | string; // 列宽
	sortable: boolean; // 是否可排序（静态排序）
	fixed: FixedProp; // 固定列
	image: boolean; // 是否是图片展示
	search: boolean; // 是否为搜索项
	searchType: SearchType; // 搜索项类型
	initSearchParam: string | number | boolean | any[]; // 搜索项初始值
	enum: EnumProps[]; // 枚举类型（渲染值的字典）
}
