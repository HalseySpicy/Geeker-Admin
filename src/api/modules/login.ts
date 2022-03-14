import { Login } from "@/api/interface/index";
import { LoginFrom } from "@/views/login/interface";
import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: LoginFrom) => {
	return http.post<Login.ResLogin>(PORT1 + `/web/v1.0/user/login-by-name-passwd`, params);
};

// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get(PORT1 + `/web/v1.0/sys/user/auth-button-dic`);
};
