export interface EnumProps {
	label: string;
	value: any;
}

export type SearchType = "text" | "select" | "multipleSelect" | "date" | "datetimerange";

export interface ColumnProps {
	type: string; // index | selection
	prop: string; // 单元格数据（非特殊类型必填）
	label: string; // 单元格标题（非特殊类型必填）
	width: string; // 列宽
	image: boolean; // 是否是图片展示
	search: boolean; // 是否为搜索项
	searchType: SearchType; // 搜索项类型
	initParam: string | number | any[]; // 搜索项初始值
	enum: EnumProps[]; // 枚举类型（渲染值的字典）
}
