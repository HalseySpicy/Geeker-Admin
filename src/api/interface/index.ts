// * 请求结果集
export interface Result {
	code: string;
	msg: string;
}

export interface ResultData<T = any> extends Result {
	data: T;
}

// * 分页
export interface Page<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

export namespace Login {
	export interface LoginAPI {
		firstPasswordReset: boolean;
		tokenValue: string;
	}
	export interface LoginParams {
		username: string;
		password: string;
	}
}

export interface SystemLogAPI {
	createTime: string;
	opUsername: string;
	opRealName: string;
	opTypeName: string;
	opType: string;
	ip: string;
	bfData: string;
	afData: string;
	opContent: string;
}
