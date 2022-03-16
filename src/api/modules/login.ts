import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT1 + `/login`, params);
};

// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get<Login.ResButtons>(PORT1 + `/auth/buttons`);
};
