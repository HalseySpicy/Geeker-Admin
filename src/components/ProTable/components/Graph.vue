<template>
  <div ref="page" class="graph" @click="isShowNodeMenuPanel = false">
    <div class="graph-box">
      <RelationGraph
        class="graph-box-main"
        ref="relationGraph$"
        :options="options"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
        :on-canvas-click="onCanvasClick"
        @before-create-line="beforeCreateLine"
      >
        <template #node="{ node }">
          <div class="line-text" @click="showNodeMenus(node, $event)" @contextmenu.prevent.stop="showNodeMenus(node, $event)">
            {{ node.text }}
          </div>
        </template>
        <template #graph-plug>
          <RGEditingConnectController />
          <RGEditingLineController />
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
        <slot name="preAction" :node-object="currentNode?.data"></slot>
        <el-button type="primary" :icon="View" @click.stop="doAction('查看')">查 看</el-button>
        <el-button type="primary" :icon="EditPen" @click.stop="doAction('编辑')">编 辑</el-button>
        <el-button type="primary" :icon="Delete" @click.stop="doAction('删除')">删 除</el-button>
        <slot name="action" :node-object="currentNode?.data"></slot>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, Ref, ref, watch } from "vue";
import RelationGraph, {
  RelationGraphComponent,
  RelationGraphInstance,
  RGLine,
  RGLink,
  RGNode,
  RGEditingConnectController,
  RGEditingLineController
} from "relation-graph-vue3";
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
    labelKey?: string;
    labelName: string;
    childrenName?: string;
    enableCrossParents?: boolean;
  }>(),
  {
    // eslint-disable-next-line vue/require-valid-default-prop
    treeData: null,
    labelKey: "id",
    labelName: "name",
    childrenName: "children",
    enableCrossParents: false
  }
);

const emit = defineEmits(["action"]);

const page = ref();
// 图谱实例
const relationGraph$ = ref<RelationGraphComponent>();
// 是否展示节点菜单
const isShowNodeMenuPanel = ref(false);
// 节点菜单定位
const nodeMenuPanelPosition = ref({ x: 0, y: 0 });
// 当前选择的节点
const currentNode: Ref<RGNode | null> = ref(null);
// 被操作的原节点
const originalLine = ref<RGLine>({
  from: "",
  to: ""
});

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
      force_node_repulsion: 0.3,
      force_line_elastic: 0.8
    }
  ]
});

// 图谱数据
const jsonData: Ref<JsonData> = ref({
  rootId: "graph",
  nodes: [],
  lines: []
});

const graphInstance = computed<RelationGraphInstance>(() => relationGraph$.value?.getInstance());

// 设置跟节点
const setRootNode = (data: any[] | null) => {
  jsonData.value.nodes.push({ id: "表格", text: "表格" });
  data?.map((item: any) => {
    jsonData.value.lines.push({
      from: "表格",
      to: props.labelName.split(".").reduce((acc: any, part: string) => acc && acc[part], item)
    });
  });
};

// 处理图谱数据
const processGraphData = (data: any[] | null) => {
  data?.map((item: any) => {
    // 节点数据
    jsonData.value.nodes.push({
      id: props.labelName.split(".").reduce((acc: any, part: string) => acc && acc[part], item),
      text: props.labelName.split(".").reduce((acc: any, part: string) => acc && acc[part], item),
      data: item
    });
    if (item?.[props.childrenName] && item?.[props.childrenName].length > 0) {
      item?.[props.childrenName].map((child: any[]) => {
        jsonData.value.lines.push({
          from: props.labelName.split(".").reduce((acc: any, part: string) => acc && acc[part], item),
          to: props.labelName.split(".").reduce((acc: any, part: string) => acc && acc[part], child)
        });
      });
      processGraphData(item?.[props.childrenName]);
    }
  });
};

// 监听外部数据变化，重新渲染图谱
watch(
  () => props.treeData,
  () => renderGraph(),
  { deep: true }
);

// 重置图谱位置
const resetPosition = () => {
  graphInstance.value.setJsonData(jsonData.value);
  setTimeout(async () => {
    graphInstance.value.setZoom(100);
    await graphInstance.value.moveToCenter();
    await graphInstance.value.zoomToFit();
  }, time.value);
};

// 渲染图谱
const renderGraph = () => {
  jsonData.value.nodes = [];
  jsonData.value.lines = [];
  console.log({ props });
  setRootNode(props?.treeData);
  processGraphData(props?.treeData);
  resetPosition();
};

// 组件高度变化时重新定位图谱位置
// const resizeObserver = new ResizeObserver(() => {
//   resetPosition();
// });

onMounted(() => {
  renderGraph();
  // if (page.value) resizeObserver.observe(page.value);
});

onBeforeUnmount(() => {
  // if (page.value) resizeObserver.unobserve(page.value);
});

// 根据节点数量计算定位时间
const time = computed(() => {
  return Math.ceil(jsonData.value?.lines?.length / 20) * 1000;
});

// 显示 / 隐藏节点菜单
const showNodeMenus = (nodeObject: RGNode, $event: MouseEvent) => {
  console.log({ nodeObject });
  currentNode.value = nodeObject;
  nodeMenuPanelPosition.value.x = $event.clientX;
  nodeMenuPanelPosition.value.y = $event.clientY;
  isShowNodeMenuPanel.value = true;
};

// 节点菜单操作
const doAction = (actionName: string) => {
  emit("action", actionName, currentNode.value?.data);
  isShowNodeMenuPanel.value = false;
};

// 节点点击事件
const onNodeClick = (nodeObject: RGNode) => {
  currentNode.value = nodeObject;
  const clickedNodeChildrenLines = graphInstance.value.getLinks();
  clickedNodeChildrenLines.forEach(link => {
    link.relations.forEach(line => {
      line.color = "#b28a60";
      line.fontColor = "#b28a60";
      line.lineWidth = line.data!.originLineWidth;
    });
  });
  // 让与{nodeObject}相关的所有连线高亮
  clickedNodeChildrenLines
    .filter(link => link.fromNode === nodeObject || link.toNode === nodeObject)
    .forEach(link => {
      link.relations.forEach(line => {
        line.data!.orignColor = line.color;
        line.data!.orignFontColor = line.fontColor || line.color;
        line.data!.orignLineWidth = 3;
        line.color = "#ff0000";
        line.fontColor = "#ff0000";
        line.lineWidth = 3;
      });
    });
};
/** TODO 连线点击事件 */
const onLineClick = (lineObject: RGLine, linkObject: RGLink) => {
  console.log({ lineObject, linkObject });
  originalLine.value = {
    from: lineObject.from,
    to: lineObject.to
  };
  graphInstance.value.setEditingLine(lineObject, linkObject);
};

const onCanvasClick = () => {
  const clickedNodeChildrenLines = graphInstance.value.getLinks();
  clickedNodeChildrenLines.forEach(link => {
    link.relations.forEach(line => {
      line.color = "#b28a60";
      line.fontColor = "#b28a60";
      line.lineWidth = line.data!.originLineWidth;
    });
  });
};

// 恢复线条
const replyLine = () => {
  graphInstance.value.addLines([originalLine.value]);
};

const beforeCreateLine = (rgActionParams: any, setEventReturnValue: (customReturnValue: any) => void) => {
  const fromNode = rgActionParams.fromNode;
  const toNode = rgActionParams.toNode;

  if (!props.enableCrossParents) {
    if (fromNode.text != originalLine.value.from) {
      setEventReturnValue(true);
      replyLine();
      ElNotification({
        title: "警告",
        message: "禁止跨父节点连线",
        type: "warning"
      });
      return;
    }
  }

  jsonData.value.lines.map((item: any, index: number) => {
    if (item?.to == fromNode?.text) {
      delete jsonData.value.lines[index];
      jsonData.value.lines.unshift({
        from: toNode.text,
        to: fromNode.text
      });
      return;
    }
    if (item[props.childrenName] && item[props.childrenName].length > 0) {
      beforeCreateLine(rgActionParams);
    }
  });
};

const focusOnNode = (node: any) => {
  graphInstance.value.focusNodeById(node);
};

defineExpose({
  jsonData: jsonData.value,
  focusOnNode
});
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
  line-height: 24px;
}
</style>
