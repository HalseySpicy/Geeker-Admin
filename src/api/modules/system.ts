import { ResPage, System } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 系统账号管理模块
 */
// * 获取系统账号列表
export const getSysAccountList = (params: System.ReqGetAccountParams) => {
	return http.get<ResPage<System.GetAccountList>>(PORT1 + `/web/v1.0/sys/user/list`, params);
};

// * 删除系统账号
export const deleteSysAccount = (params: { id: string }) => {
	return http.post(PORT1 + `/web/v1.0/sys/user/remove1`, params);
};

// * 导出系统日志
export const downLoadSystemLog = (params?: any) => {
	return http.post<BlobPart>(PORT1 + `/web/v1.0/sys/oplog/exportExcel`, params, { responseType: "blob" });
};
