<template>
  <div ref="page" class="graph" @click="isShowNodeMenuPanel = false">
    <div class="graph-box">
      <RelationGraph
        class="graph-box-main"
        ref="relationGraph$"
        :options="options"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      >
        <template #node="{ node }">
          <div class="line-text" @click="showNodeMenus(node, $event)" @contextmenu.prevent.stop="showNodeMenus(node, $event)">
            {{ node.text }}
          </div>
        </template>
      </RelationGraph>
    </div>

    <!-- 右键菜单 -->
    <div
      v-show="isShowNodeMenuPanel"
      class="rc-menu"
      :style="{
        left: nodeMenuPanelPosition.x + 'px',
        top: nodeMenuPanelPosition.y + 'px'
      }"
    >
      <el-space :direction="'vertical'">
        <el-button type="primary" :icon="View" @click.stop="doAction('detail')">查 看</el-button>
        <el-button type="primary" :icon="EditPen" @click.stop="doAction('update')">编 辑</el-button>
        <el-button type="primary" :icon="Delete" @click.stop="doAction('delete')">删 除</el-button>
        <slot name="action" :node-object="currentNode?.data"></slot>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, Ref, ref, watch } from "vue";
import RelationGraph, { RGNode } from "relation-graph-vue3";
import { Delete, EditPen, View } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

interface NodesType {
  id: string;
  text: string;
  color?: string;
  data?: any;
}
interface LinesType {
  from: string;
  to: string;
}
interface JsonData {
  rootId: string;
  nodes: NodesType[];
  lines: LinesType[];
}

const props = withDefaults(
  defineProps<{
    treeData: any[] | null;
    labelKey: string;
    labelName?: string;
    childrenName?: string;
  }>(),
  {
    // eslint-disable-next-line vue/require-valid-default-prop
    treeData: null,
    labelKey: "id",
    labelName: "name",
    childrenName: "children"
  }
);

const emit = defineEmits(["updateAction", "detailAction", "deleteAction"]);

const page = ref();
// 图谱实例
const relationGraph$ = ref("relationGraph$");
// 是否展示节点菜单
const isShowNodeMenuPanel = ref(false);
// 节点菜单定位
const nodeMenuPanelPosition = ref({ x: 0, y: 0 });
// 当前选择的节点
const currentNode: Ref<RGNode | null> = ref(null);

const options = ref({
  defaultExpandHolderPosition: "right",
  allowSwitchLineShape: true, //    是否在工具栏中显示切换线条形状的按钮
  allowSwitchJunctionPoint: true, // 是否在工具栏中显示切换连接点位置的按钮
  defaultJunctionPoint: "border", // 默认的连线与节点接触的方式（border:边缘/ltrb:上下左右/tb:上下/lr:左右）当布局为树状布局时应使用tb或者lr，这样才会好看
  defaultLineShape: 6, //           默认的线条样式 int：1-6
  defaultLineWidth: 3, //           默认的线条粗细（像素）
  allowShowMiniToolBar: true, //    是否展示右侧工具栏
  maxLayoutTimes: 20,
  moveToCenterWhenRefresh: false,
  zoomToFitWhenRefresh: true,
  useAnimationWhenRefresh: true,
  hideNodeContentByZoom: false,
  defaultLineColor: "#b28a60",
  layouts: [
    {
      label: "Center",
      layoutName: "force",
      maxLayoutTimes: 300,
      defaultNodeWidth: 300,
      defaultNodeHeight: 300,
      allowSwitchLineShape: true,
      zoomToFitWhenRefresh: true,
      checkedLineColor: "#ff0000",
      force_node_repulsion: 0.2,
      force_line_elastic: 0.2
    }
  ]
});

// 图谱数据
const jsonData: Ref<JsonData> = ref({
  rootId: "graph",
  nodes: [],
  lines: []
});

// 设置跟节点
const setRootNode = (data: any[] | null) => {
  jsonData.value.nodes.push({ id: "表格", text: "表格" });
  data?.map((item: any) => {
    jsonData.value.lines.push({ from: "表格", to: item[props.labelKey] });
  });
};

// 处理图谱数据
const processGraphData = (data: any[] | null) => {
  data?.map((item: any) => {
    // 节点数据
    jsonData.value.nodes.push({
      id: item[props.labelKey],
      text: item[props.labelName],
      data: item
    });
    if (item?.[props.childrenName] && item?.[props.childrenName].length > 0) {
      item[props.childrenName].map((child: any[]) => {
        jsonData.value.lines.push({ from: item[props.labelKey], to: child[props.labelKey] });
      });
      processGraphData(item[props.childrenName]);
    }
  });
};

// 监听外部数据变化，重新渲染图谱
watch(
  () => props.treeData,
  () => {
    renderGraph();
  },
  { deep: true }
);

// 重置图谱位置
const resetPosition = () => {
  const graphInstance = relationGraph$.value.getInstance();
  graphInstance.setJsonData(jsonData.value);
  setTimeout(async () => {
    await graphInstance.setZoom(100);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  }, time.value);
};

// 渲染图谱
const renderGraph = () => {
  jsonData.value.nodes = [];
  jsonData.value.lines = [];
  console.log("renderGraph:", props.treeData);
  setRootNode(props?.treeData);
  processGraphData(props?.treeData);
  resetPosition();
};

// 组件高度变化时重新定位图谱位置
const resizeObserver = new ResizeObserver(() => {
  resetPosition();
});

onMounted(() => {
  renderGraph();
  if (page.value) resizeObserver.observe(page.value);
});

onBeforeUnmount(() => {
  if (page.value) resizeObserver.unobserve(page.value);
});

// 根据节点数量计算定位时间
const time = computed(() => {
  return Math.ceil(jsonData.value?.lines?.length / 20) * 1000;
});

// 显示 / 隐藏节点菜单
const showNodeMenus = (nodeObject: RGNode, $event: MouseEvent) => {
  console.log({ nodeObject });
  currentNode.value = nodeObject;
  const _base_position = page.value.getBoundingClientRect();
  console.log("showNodeMenus:", $event.clientX, $event.clientY, _base_position);
  nodeMenuPanelPosition.value.x = $event.clientX;
  nodeMenuPanelPosition.value.y = $event.clientY;
  isShowNodeMenuPanel.value = true;
};

// 节点菜单操作
const doAction = (actionName: string) => {
  ElNotification({
    title: "Tip",
    message: "您点击了" + actionName + " 操作: " + currentNode.value?.text,
    type: "success"
  });
  switch (actionName) {
    case "update":
      emit("updateAction", currentNode.value?.data);
      break;
    case "detail":
      emit("detailAction", currentNode.value?.data);
      break;
    default:
      emit("deleteAction", currentNode.value?.data);
  }
  isShowNodeMenuPanel.value = false;
};

// 节点点击事件
const onNodeClick = (nodeObject: RGNode) => {
  currentNode.value = nodeObject;
  const clickedNodeChildrenLines = relationGraph$.value.getLinks();
  clickedNodeChildrenLines.forEach(link => {
    link.relations.forEach(line => {
      line.color = "#b28a60";
      line.fontColor = "#b28a60";
      line.lineWidth = line.data.originLineWidth;
    });
  });
  // 让与{nodeObject}相关的所有连线高亮
  clickedNodeChildrenLines
    .filter(link => link.fromNode === nodeObject || link.toNode === nodeObject)
    .forEach(link => {
      link.relations.forEach(line => {
        line.data.orignColor = line.color;
        line.data.orignFontColor = line.fontColor || line.color;
        line.data.orignLineWidth = 3;
        line.color = "#ff0000";
        line.fontColor = "#ff0000";
        line.lineWidth = 3;
      });
    });
};
/** TODO 连线点击事件 */
const onLineClick = (lineObject, linkObject, $event) => {
  console.log("======= lineObject ( index.vue ) =======\n", lineObject);
  console.log("======= linkObject ( index.vue ) =======\n", linkObject);
  console.log("======= $event ( index.vue ) =======\n", $event);
};
</script>

<style lang="scss" scoped>
::v-deep(.graph-box-main) {
  .rel-map {
    background-color: var(--el-bg-color);
  }
}
.graph {
  width: 100%;
  height: 100%;
  &-box {
    width: 100%;
    height: 100%;
    border: var(--el-border-color) solid 1px;
  }
  .rc-menu {
    position: absolute;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    border: #eeeeee solid 1px;
    border-radius: 10px;
    box-shadow: 0 0 8px #cccccc;
    .node-menu-item {
      padding: 0 10px;
      font-size: 14px;
      line-height: 30px;
      color: #444444;
      cursor: pointer;
      border-top: #efefef solid 1px;
    }
    .node-menu-item:hover {
      background-color: rgb(66 187 66 / 20%);
    }
  }
}
.line-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 23px;
  font-weight: bold;
}
</style>
