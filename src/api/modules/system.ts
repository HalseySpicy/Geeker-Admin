import { ContentTypeEnum } from "@/enums/httpEnum";
import http from "@/api";

// 后端微服务端口名
const PORT1 = "/tourmanager";

/**
 * @name 系统设置
 */
// * 获取系统日志列表
export const getSystemLog = (params?: any) => {
	return http.post(PORT1 + `/web/v1.0/sys/oplog/list`, params);
};

// * 导出系统日志
export const downLoadSystemLog = () => {
	return http.post(PORT1 + `/web/v1.0/sys/oplog/exportExcel`, {}, { responseType: "blob" });
};
