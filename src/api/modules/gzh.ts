import { ResPage, User } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getUserList = (params: User.ReqUserParams) => {
	return http.post<ResPage<User.ResUserList>>(PORT1 + `/user/list`, params);
};

// * 获取树形用户列表
export const getUserTreeList = (params: User.ReqUserParams) => {
	return http.post<ResPage<User.ResUserList>>(PORT1 + `/user/tree/list`, params);
};

// * 新增用户
export const addUser = (params: { id: string }) => {
	return http.post(PORT1 + `/user/add`, params);
};

// * 批量添加用户
export const BatchAddUser = (params: FormData) => {
	return http.post(PORT1 + `/user/import`, params);
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
export const exportUserInfo = (params: User.ReqUserParams) => {
	return http.download(PORT1 + `/user/export`, params);
};

// * 获取用户状态
export const getUserStatus = () => {
	return http.get<User.ResStatus>(PORT1 + `/user/status`);
};

// * 钞票状态字典
export const paperMoney = () => {
	return {
		code: 200,
		data: [
			{ genderLabel: "全部", genderValue: 1 },
			{ genderLabel: "真", genderValue: 2 },
			{ genderLabel: "残", genderValue: 3 },
			{ genderLabel: "旧", genderValue: 4 },
			{ genderLabel: "可以币/假币", genderValue: 5 }
		],
		msg: "成功"
	};
};
// * 币种字典
export const coin = () => {
	return {
		code: 200,
		data: [
			{ genderLabel: "全部", genderValue: 1 },
			{ genderLabel: "新台湾元(TWD)", genderValue: 2 },
			{ genderLabel: "人民币(CNY)", genderValue: 3 },
			{ genderLabel: "英镑(GBP)", genderValue: 4 },
			{ genderLabel: "港元(HKD)", genderValue: 5 },
			{ genderLabel: "美元(USD)", genderValue: 6 },
			{ genderLabel: "瑞士法郎(CHF)", genderValue: 7 },
			{ genderLabel: "瑞典克朗(SEK)", genderValue: 8 },
			{ genderLabel: "丹麦克朗(DKK)", genderValue: 9 },
			{ genderLabel: "挪威克朗(NOK)", genderValue: 10 },
			{ genderLabel: "日元(JPY)", genderValue: 11 },
			{ genderLabel: "加元(CAD)", genderValue: 12 },
			{ genderLabel: "澳元(AUD)", genderValue: 13 },
			{ genderLabel: "新加坡元(SGD)", genderValue: 14 },
			{ genderLabel: "欧元(EUR)", genderValue: 15 },
			{ genderLabel: "澳门元(MOP)", genderValue: 16 },
			{ genderLabel: "泰国铢(THB)", genderValue: 17 },
			{ genderLabel: "新西兰元(NZD)", genderValue: 18 },
			{ genderLabel: "韩元(KRW)", genderValue: 19 }
		],
		msg: "成功"
	};
};
// * 渠道类型字典
export const channel = () => {
	return {
		code: 200,
		data: [
			{ genderLabel: "全部", genderValue: 1 },
			{ genderLabel: "柜台-清分机", genderValue: 2 },
			{ genderLabel: "柜台-A点", genderValue: 3 },
			{ genderLabel: "ATM和CRS(不记录冠字号)", genderValue: 4 },
			{ genderLabel: "人行", genderValue: 5 },
			{ genderLabel: "同业", genderValue: 6 },
			{ genderLabel: "系统内", genderValue: 7 },
			{ genderLabel: "其他", genderValue: 8 },
			{ genderLabel: "CRS", genderValue: 9 },
			{ genderLabel: "非打包模式", genderValue: 10 }
		],
		msg: "成功"
	};
};

// * 获取用户部门列表
export const getUserDepartment = () => {
	return http.get<User.ResDepartment>(PORT1 + `/user/department`);
};

// * 获取用户角色字典
export const getUserRole = () => {
	return http.get<User.ResRole>(PORT1 + `/user/role`);
};
