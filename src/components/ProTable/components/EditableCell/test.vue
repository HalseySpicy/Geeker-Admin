<template>
  <div>
    <ProTable
      ref="proTable"
      title="用户列表"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <template #tableHeader>
        <el-button type="primary" @click="logTableData">打印表格数据</el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps, ProTableInstance } from "@/components/ProTable/interface";

import { useEditableCell } from "@/components/ProTable/components/EditableCell/useEditableCell";
import { ElMessage } from "element-plus";

import { getUserList, getUserGender } from "@/api/modules/user";
import { User } from "@/api/interface";

const proTable = ref<ProTableInstance>();

const updateCol = (row: any, prop: string, oldValue: string, newValue: string, undo: () => void) => {
  // debugger;
  const flag = Math.random() > 0.5;
  if (!flag) {
    setTimeout(() => {
      undo();
      ElMessage.error("随机测试撤销修改");
    }, 1000);
  }
  // console.log(row, prop, oldValue, newValue);
  console.log(` 当前更改的属性值:${prop},oldValue:${oldValue},newValue:${newValue}`, JSON.parse(JSON.stringify(row)));
};

const { editColRender } = useEditableCell({ updateCol });
const initParam = reactive({ type: 1 });

// 表格配置项
const columns: ColumnProps<User.ResUserList>[] = [
  { type: "selection", fixed: "left", width: 80 },
  { type: "index", label: "#", width: 80 },
  { type: "expand", label: "Expand", width: 100 },
  {
    prop: "username",
    label: "用户姓名（可编辑）",
    search: { el: "input" },
    render: editColRender()
  },
  {
    prop: "gender",
    label: "性别",
    // 字典数据
    // enum: genderType,
    // 字典请求不带参数
    enum: getUserGender,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "genderLabel", value: "genderValue" }
  },
  {
    // 多级 prop
    prop: "user.detail.age",
    label: "年龄",
    render: editColRender(),
    search: {
      // 自定义 search 显示内容
      render: ({ searchParam }) => {
        return (
          <div class="flx-center">
            <el-input vModel_trim={searchParam.minAge} placeholder="最小年龄" />
            <span class="mr10 ml10">-</span>
            <el-input vModel_trim={searchParam.maxAge} placeholder="最大年龄" />
          </div>
        );
      }
    }
  },
  { prop: "idCard", label: "身份证号", render: editColRender(), search: { el: "input" } },
  { prop: "email", render: editColRender(), label: "邮箱" },
  { prop: "address", label: "居住地址", render: editColRender() },

  { prop: "operation", label: "操作", fixed: "right", width: 330 }
];

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  return getUserList(newParams);
};
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

const logTableData = () => {
  console.log(JSON.parse(JSON.stringify(proTable.value?.tableData)));
};
</script>

<style scoped></style>
