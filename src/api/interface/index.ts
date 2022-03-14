// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录
export namespace Login {
	export interface ResLogin {
		firstPasswordReset: boolean;
		tokenValue: string;
	}
}

// * 系统设置
export namespace System {
	export interface ReqGetAccountParams extends ReqPage {
		realName: string;
		spotIds: string;
		mobile: string;
		roleId: string;
		status: string;
	}
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
