export interface Result {
	code: string;
	msg: string;
}

export interface ResultData<T = any> extends Result {
	data: T;
}

export interface LoginAPI {
	firstPasswordReset: boolean;
	tokenValue: string;
}

export interface LoginParams {
	username: string;
	password: string;
}
