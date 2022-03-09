import { Page, System } from "./../interface/index";
import http from "@/api";

// 后端微服务端口名
const PORT1 = "/tourmanager";

/**
 * @name 系统账号管理模块
 */
// * 获取系统账号列表
export const getAccountList = (params?: any) => {
	return http.get<Page<System.GetAccountList>>(PORT1 + `/web/v1.0/sys/user/list`, params);
};

// * 删除系统账号
export const deleteAccount = (params: { id: string }) => {
	return http.post(PORT1 + `/web/v1.0/sys/user/remove`, params);
};

// * 导出系统日志
export const downLoadSystemLog = (params?: any) => {
	return http.post<BlobPart>(PORT1 + `/web/v1.0/sys/oplog/exportExcel`, params, { responseType: "blob" });
};
