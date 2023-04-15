<template>
  <el-dialog v-model="dialogVisible" :title="`批量添加${parameter.title}`" :destroy-on-close="true" width="580px" draggable>
    <el-form class="drawer-multiColumn-form" label-width="100px">
      <el-form-item label="模板下载 :">
        <el-button type="primary" :icon="Download" @click="downloadTemp">点击下载</el-button>
      </el-form-item>
      <el-form-item label="文件上传 :">
        <el-upload
          action="#"
          class="upload"
          :drag="true"
          :limit="excelLimit"
          :multiple="true"
          :show-file-list="true"
          :http-request="uploadExcel"
          :before-upload="beforeExcelUpload"
          :on-exceed="handleExceed"
          :on-success="excelUploadSuccess"
          :on-error="excelUploadError"
          :accept="parameter.fileType!.join(',')"
        >
          <slot name="empty">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </slot>
          <template #tip>
            <slot name="tip">
              <div class="el-upload__tip">请上传 .xls , .xlsx 标准格式文件，文件最大为 {{ parameter.fileSize }}M</div>
            </slot>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="数据覆盖 :">
        <el-switch v-model="isCover" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts" name="ImportExcel">
import { ref } from "vue";
import { useDownload } from "@/hooks/useDownload";
import { Download } from "@element-plus/icons-vue";
import { ElNotification, UploadRequestOptions, UploadRawFile } from "element-plus";

export interface ExcelParameterProps {
  title: string; // 标题
  fileSize?: number; // 上传文件的大小
  fileType?: File.ExcelMimeType[]; // 上传文件的类型
  tempApi?: (params: any) => Promise<any>; // 下载模板的Api
  importApi?: (params: any) => Promise<any>; // 批量导入的Api
  getTableList?: () => void; // 获取表格数据的Api
}

// 是否覆盖数据
const isCover = ref(false);
// 最大文件上传数
const excelLimit = ref(1);
// dialog状态
const dialogVisible = ref(false);
// 父组件传过来的参数
const parameter = ref<ExcelParameterProps>({
  title: "",
  fileSize: 5,
  fileType: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
});

// 接收父组件参数
const acceptParams = (params: ExcelParameterProps) => {
  parameter.value = { ...parameter.value, ...params };
  dialogVisible.value = true;
};

// Excel 导入模板下载
const downloadTemp = () => {
  if (!parameter.value.tempApi) return;
  useDownload(parameter.value.tempApi, `${parameter.value.title}模板`);
};

// 文件上传
const uploadExcel = async (param: UploadRequestOptions) => {
  let excelFormData = new FormData();
  excelFormData.append("file", param.file);
  excelFormData.append("isCover", isCover.value as unknown as Blob);
  await parameter.value.importApi!(excelFormData);
  parameter.value.getTableList && parameter.value.getTableList();
  dialogVisible.value = false;
};

/**
 * @description 文件上传之前判断
 * @param file 上传的文件
 * */
const beforeExcelUpload = (file: UploadRawFile) => {
  const isExcel = parameter.value.fileType!.includes(file.type as File.ExcelMimeType);
  const fileSize = file.size / 1024 / 1024 < parameter.value.fileSize!;
  if (!isExcel)
    ElNotification({
      title: "温馨提示",
      message: "上传文件只能是 xls / xlsx 格式！",
      type: "warning"
    });
  if (!fileSize)
    setTimeout(() => {
      ElNotification({
        title: "温馨提示",
        message: `上传文件大小不能超过 ${parameter.value.fileSize}MB！`,
        type: "warning"
      });
    }, 0);
  return isExcel && fileSize;
};

// 文件数超出提示
const handleExceed = () => {
  ElNotification({
    title: "温馨提示",
    message: "最多只能上传一个文件！",
    type: "warning"
  });
};

// 上传错误提示
const excelUploadError = () => {
  ElNotification({
    title: "温馨提示",
    message: `批量添加${parameter.value.title}失败，请您重新上传！`,
    type: "error"
  });
};

// 上传成功提示
const excelUploadSuccess = () => {
  ElNotification({
    title: "温馨提示",
    message: `批量添加${parameter.value.title}成功！`,
    type: "success"
  });
};

defineExpose({
  acceptParams
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
