// * 请求结果集
export interface Result {
	code: string;
	msg: string;
}

export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页
export interface Page<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 登录
export namespace Login {
	export interface LoginAPI {
		firstPasswordReset: boolean;
		tokenValue: string;
	}
}

// * 系统设置
export namespace System {
	export interface GetAccountList {
		id: string;
		username: string;
		realName: string;
		email: string;
		mobile: string;
		status: number;
		lastLoginTime: string;
		createId: string;
		createName: string;
		createTime: string;
		deptName?: any;
		roleIds: string[];
		roleNames: string[];
		firstPasswordReset: boolean;
		idCard: string;
		spotNames: string[];
		spotIds: string[];
	}
}
