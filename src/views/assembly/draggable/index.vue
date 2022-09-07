<template>
	<el-card>
		<div class="drag-container">
			<el-row :gutter="25">
				<el-col :xs="25" :sm="12" :md="12" :lg="12">
					<el-card>
						<template #header>
							<div class="card-header">
								<span>九宫格拖拽</span>
							</div>
						</template>
						<draggable
							v-model="gridLists"
							class="grid-container"
							item-key="id"
							animation="300"
							chosenClass="chosen"
							forceFallback="true"
						>
							<template #item="{ element }">
								<div :class="'item' + ' ' + 'item-' + element.num">
									{{ element.num }}
								</div>
							</template>
						</draggable>
					</el-card>
				</el-col>

				<el-col :xs="25" :sm="12" :md="12" :lg="12">
					<el-card>
						<template #header>
							<div class="card-header">
								<span>单列拖拽</span>
							</div>
						</template>
						<draggable v-model="lists" item-key="name" chosen-class="chosen" force-fallback="true" animation="300">
							<template #item="{ element, index }">
								<div class="item-single">{{ element.name }} {{ index }}</div>
							</template>
						</draggable>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</el-card>
</template>

<script setup lang="ts" name="Draggable">
import { ref } from "vue";
import draggable from "vuedraggable/src/vuedraggable";

let gridLists = ref<Array<Object>>([
	{ id: 1, num: 1 },
	{ id: 2, num: 2 },
	{ id: 3, num: 3 },
	{ id: 4, num: 4 },
	{ id: 5, num: 5 },
	{ id: 6, num: 6 },
	{ id: 7, num: 7 },
	{ id: 8, num: 8 },
	{ id: 9, num: 9 }
]);

let lists = ref<Array<Object>>([
	{ id: 1, name: "admin.spicyboy.cn" },
	{ id: 2, name: "hooks.spicyboy.cn" }
]);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
