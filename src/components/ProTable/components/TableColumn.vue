<template>
	<component :is="renderLoop(column)"></component>
</template>

<script lang="tsx" setup>
import { inject, ref, useSlots } from "vue";
import { ElTableColumn, ElTag } from "element-plus";
import { filterEnum, formatValue } from "@/utils/util";
import { ColumnProps } from "@/components/ProTable/interface";

const slots = useSlots();

defineProps<{ column: ColumnProps }>();

const enumMap = inject("enumMap", ref(new Map()));

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: any) => {
	return enumMap.value.get(item.prop) && item.isFilterEnum
		? filterEnum(scope.row[item.prop!], enumMap.value.get(item.prop)!, item.fieldNames)
		: formatValue(scope.row[item.prop!]);
};

// 获取 tag 类型
const getTagType = (item: ColumnProps, scope: any) => {
	return filterEnum(scope.row[item.prop!], enumMap.value.get(item.prop), item.fieldNames, "tag") as any;
};

const renderLoop = (item: ColumnProps) => {
	return (
		<>
			{item.isShow && (
				<ElTableColumn
					{...item}
					align={item.align ?? "center"}
					showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}
				>
					{{
						default: (scope: any) => {
							if (item._children) return item._children.map(child => renderLoop(child));
							if (item.render) return item.render(scope);
							if (slots[item.prop!]) return slots[item.prop!]!(scope);
							if (item.tag) return <ElTag type={getTagType(item, scope)}>{renderCellData(item, scope)}</ElTag>;
							return renderCellData(item, scope);
						},
						header: () => {
							if (item.headerRender) return item.headerRender(item);
							if (slots[`${item.prop}Header`]) return slots[`${item.prop}Header`]!({ row: item });
							return item.label;
						}
					}}
				</ElTableColumn>
			)}
		</>
	);
};
</script>
