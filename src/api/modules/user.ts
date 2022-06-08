import { ResPage, User } from "@/api/interface/index";
import { ContentTypeEnum } from "@/enums/httpEnum";
import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getUserList = (params: User.ReqGetUserParams) => {
	return http.post<ResPage<User.ResUserList>>(PORT1 + `/user/list`, params);
};

// * 新增用户
export const addUser = (params: { id: string }) => {
	return http.post(PORT1 + `/user/add`, params);
};

// * 批量添加用户
export const BatchAddUser = (params: any) => {
	// 其实 headers 中的 Content-Type 可以不写，请求可以自动判断，这里为了演示，写了一下
	return http.post(PORT1 + `/user/import`, params, { headers: { "Content-Type": ContentTypeEnum.FORM_DATA } });
};

// * 编辑用户
export const editUser = (params: { id: string }) => {
	return http.post(PORT1 + `/user/edit`, params);
};

// * 删除用户
export const deleteUser = (params: { id: string[] }) => {
	return http.post(PORT1 + `/user/delete`, params);
};

// * 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
	return http.post(PORT1 + `/user/change`, params);
};

// * 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
	return http.post(PORT1 + `/user/rest_password`, params);
};

// * 导出用户数据
export const exportUserInfo = (params: User.ReqGetUserParams) => {
	return http.post<BlobPart>(PORT1 + `/user/export`, params, { responseType: "blob" });
};
