import EditableCell from "./index.vue";
export interface Options {
  /**
   *
   * @param row 当前行数据
   * @param prop  操作的属性
   * @param oldValue  更改之前的值
   * @param newValue  当前值
   * @param undo 撤销更改操作
   * @returns
   */
  updateCol: (row: any, prop: string, oldValue: string, newValue: string, undo: () => void) => void;
}

export const useEditableCell = (options: Options) => {
  //为单元格某列开启输入编辑
  const editColRender = () => {
    return (scope: any) => {
      return <EditableCell scope={scope} updateCol={options.updateCol} />;
    };
  };
  return {
    editColRender
  };
};
