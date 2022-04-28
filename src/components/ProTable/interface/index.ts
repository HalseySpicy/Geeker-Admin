export interface EnumProps {
	label: string;
	value: any;
}

export interface ColumnProps {
	type: string; // index | selection
	prop: string; // 单元格数据（非特殊类型必填）
	label: string; // 单元格标题（非特殊类型必填）
	width: string; // 列宽
	image: boolean; // 是否是图片展示
	search: boolean; // 是否为搜索项
	searchType: string; // 搜索项类型
	enum: EnumProps[]; // 枚举类型（渲染值的字典）
}
