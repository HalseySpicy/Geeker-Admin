import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ResultData } from "@/api/interface";
import { checkStatus } from "./util/checkStatus";
import { ElMessage } from "element-plus";
import { GlobalStore } from "@/store";
import { useRouter } from "vue-router";
const globalStore = GlobalStore();
const router = useRouter();

const config = {
	// 默认地址
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）ResultData
	timeout: 10000,
	// 跨域时候允许携带凭证
	withCredentials: true
};

class RequestHttp {
	service: AxiosInstance;
	constructor(public config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		/**
     * @description：请求拦截器
       客户端发送请求 -> [请求拦截器] -> 服务器
      token校验(JWT) : 接受服务器返回的token,存储到vuex/本地储存当中
    * */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const token: string = globalStore.token;
				return { ...config, headers: { "access-token": token } };
			},
			(error: AxiosError) => {
				Promise.reject(error);
			}
		);

		/**
      * @description：响应拦截器
      服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
    * */
		// serves.defaults.validateStatus = status => {
		// 自定义响应成功的HTTP状态码
		//     return /^(2|3)\d{2}$/.test(status);
		// }
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				if (data.code === 200) {
					return data;
				} else {
					ElMessage.error(data.msg);
					return Promise.reject(response);
				}
			},
			async (error: AxiosError) => {
				const { response } = error;
				if (response) {
					checkStatus(response.status, "");
				} else {
					// 服务器结果都没有返回(可能服务器错误可能客户端断网)
					// 无网络时error无response
					ElMessage.error("请求超时！");
					if (!window.navigator.onLine) {
						// 断网处理:可以跳转到断网页面
						router.push({
							path: "/500"
						});
						return;
					}
					return Promise.reject(error);
				}
			}
		);
	}

	// * 常用请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
}

export default new RequestHttp(config);
