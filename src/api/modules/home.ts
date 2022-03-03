import { LoginAPI, LoginParams } from "@/api/interface/index";
import http from "@/api";

// 后端微服务端口名
const PORT1 = "/stationmanager";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: LoginParams) => {
	return http.get<LoginAPI>(PORT1 + `/web/v1.0/user/login-by-name-passwd`, params);
};
