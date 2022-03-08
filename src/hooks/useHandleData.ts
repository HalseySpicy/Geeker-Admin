import { ElMessageBox, ElMessage } from "element-plus";

interface Props {
	apiUrl: () => Promise<any>;
}

/**
 * 操作单条数据信息
 * @param {string} apiUrl 操作数据接口的apiUrl(必传)
 * @param {object} prams 携带的参数 {id,params}
 * @param {string} message 提示信息
 * @param {string} confirmType icon类型(不必传)
 * @param {string} isOperation 是否后续调用接口(不必传)
 * @return void
 */
export const useHandleData = (params?: Props) => {
	ElMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
		confirmButtonText: "OK",
		cancelButtonText: "Cancel",
		type: "warning"
	}).then(() => {
		ElMessage({
			type: "success",
			message: "Delete completed"
		});
	});
};
