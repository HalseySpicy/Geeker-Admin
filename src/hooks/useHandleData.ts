import { ElMessageBox, ElMessage } from "element-plus";
import { HandleData } from "./interface";

/**
 * @description 操作单条数据信息(二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} apiUrl 操作数据接口的apiUrl(必传)
 * @param {object} prams 携带的参数 {id,params}(必传)
 * @param {string} message 提示信息(必传)
 * @param {string} confirmType icon类型(不必传,默认为 warning)
 */
export const useHandleData = (
	apiUrl: (params: any) => Promise<any>,
	params: any,
	message: string,
	confirmType: HandleData.MessageType = "warning"
) => {
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(`是否${message}?`, "温馨提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: confirmType,
			draggable: true
		}).then(async () => {
			const res = await apiUrl(params);
			if (!res) return reject(false);
			ElMessage({
				type: "success",
				message: `${message}成功!`
			});
			resolve(true);
		});
	});
};
