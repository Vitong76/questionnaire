import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

/**
 * @description 常见的后端响应结构（可扩展）
 * @returns T - data 数据类型
 */
export interface ApiResponse<T = unknown> {
    code: number | string;
    message: string;
    data: T;
}

export type ApiCode = number | string;

export type ApiResult<T = unknown, Meta = unknown> =
    | {
          ok: true;
          code?: ApiCode;
          message?: string;
          data: T;
          meta?: Meta;
          raw: unknown;
      }
    | {
          ok: false;
          code?: ApiCode;
          message?: string;
          error: {
              type: 'business' | 'http' | 'network' | 'timeout' | 'unknown';
              status?: number;
              message: string;
              raw?: unknown;
          };
          meta?: Meta;
          raw?: unknown;
      };

/**
 * @description 将任意后端返回 "解析" 为统一结构的函数（可按项目/接口替换）
 */
export type UnwrapFn = <T = unknown, Meta = unknown>(payload: unknown) => ApiResult<T, Meta>;

export interface RequestOptions {
    unwrap?: UnwrapFn;
}

export class ApiRequestError extends Error {
    public readonly result: ApiResult<unknown>;

    constructor(result: ApiResult<unknown>) {
        super((!result.ok && result.error?.message) || 'Request failed');
        this.name = 'ApiRequestError';
        this.result = result;
    }
}

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const isApiResponse = (value: unknown): value is ApiResponse<unknown> => {
    if (!isObject(value)) return false;
    return 'code' in value && 'message' in value && 'data' in value;
};

const isSuccessCode = (code: ApiCode | undefined) => {
    if (code === undefined) return true;
    if (typeof code === 'number') return code === 0 || code === 200;
    const normalized = code.trim();
    return normalized === '0' || normalized === '200' || normalized.toLowerCase() === 'ok' || normalized.toLowerCase() === 'success';
};

const defaultUnwrap: UnwrapFn = <T = unknown, Meta = unknown>(payload: unknown) => {
    if (isApiResponse(payload)) {
        const { code, message, data, ...rest } = payload as ApiResponse<T> & Record<string, unknown>;
        const meta = (Object.keys(rest).length ? (rest as unknown as Meta) : undefined) as Meta | undefined;
        if (isSuccessCode(code)) {
            return { ok: true, code, message, data, meta, raw: payload };
        }
        return {
            ok: false,
            code,
            message,
            meta,
            raw: payload,
            error: {
                type: 'business',
                message: message || 'Business error',
                raw: payload
            }
        };
    }

    // 非标准结构：默认视为成功，原样作为 data
    return { ok: true, data: payload as T, raw: payload };
};

// --- 辅助函数：用于操作本地存储 ---
const getToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setToken = (token: string) => localStorage.setItem('accessToken', token);
const setRefreshToken = (token: string) => localStorage.setItem('refreshToken', token);
const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

// --- 刷新 Token 的逻辑 ---
// 标记是否正在刷新 Token
let isRefreshing = false;
// 存储因 Token 过期而失败的请求
let failedQueue: Array<{ resolve: (value: unknown) => void; reject: (error: Error | null) => void }> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// --- 创建 Axios 实例 ---
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // 你的 API 基础路径
    timeout: 10000 // 请求超时时间
});

// --- 请求拦截器 ---
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 扩展 AxiosRequestConfig 类型，允许我们传入自定义参数
        const customConfig = config as InternalAxiosRequestConfig & { requiresAuth?: boolean };

        // 默认所有请求都需要认证，除非显式设置为 false
        if (customConfig.requiresAuth !== false) {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// --- 响应拦截器 ---
api.interceptors.response.use(
    (response: AxiosResponse<unknown>) => response,
    async error => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean; requiresAuth?: boolean };

        // 检查是否是 401 错误，并且该请求需要认证
        if (error.response?.status === 401 && originalRequest.requiresAuth !== false) {
            if (isRefreshing) {
                // 如果正在刷新 Token，则将当前失败的请求加入队列
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return api(originalRequest); // 使用新 Token 重新发送请求
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true; // 标记为已重试
            isRefreshing = true;

            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                // 如果没有 refreshToken，直接跳转到登录页
                console.error('No refresh token available.');
                clearTokens();
                // window.location.href = '/login';
                isRefreshing = false;
                return Promise.reject(new Error('No refresh token, redirecting to login.'));
            }

            try {
                // 发送刷新 Token 的请求
                const { data: refreshData } = await axios.post('/api/refresh', { refreshToken });
                const refreshPayload = refreshData as { accessToken: string; refreshToken: string };
                const newAccessToken = refreshPayload.accessToken;
                const newRefreshToken = refreshPayload.refreshToken; // 假设后端会返回新的 refreshToken

                // 更新本地存储的 Token
                setToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                // 更新当前失败请求的 header
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // 处理并重新发送队列中的所有失败请求
                processQueue(null, newAccessToken);

                // 重新发送原始请求
                return api(originalRequest);
            } catch (refreshError) {
                // 如果刷新 Token 失败，则清空所有 Token 并跳转到登录页
                console.error('Unable to refresh token.', refreshError);
                processQueue(refreshError instanceof Error ? refreshError : new Error('Unable to refresh token.'), null);
                clearTokens();
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // 对于其他错误，直接拒绝
        return Promise.reject(error);
    }
);

// --- 统一结果封装（可插拔 unwrap） ---
let globalUnwrap: UnwrapFn = defaultUnwrap;

const toFailureResult = <T = unknown, Meta = unknown>(err: unknown): ApiResult<T, Meta> => {
    const axiosErr = err as AxiosError;

    if (axiosErr?.code === 'ECONNABORTED') {
        return {
            ok: false,
            error: { type: 'timeout', message: 'Request timeout', raw: err },
            raw: err
        };
    }

    if (axios.isAxiosError(axiosErr)) {
        if (axiosErr.response) {
            const status = axiosErr.response.status;
            const message = axiosErr.message || `HTTP ${status}`;
            return {
                ok: false,
                message,
                error: {
                    type: 'http',
                    status,
                    message,
                    raw: axiosErr.response.data
                },
                raw: axiosErr.response.data
            };
        }

        // 没有 response：通常是网络错误/跨域/断网
        return {
            ok: false,
            message: axiosErr.message || 'Network error',
            error: {
                type: 'network',
                message: axiosErr.message || 'Network error',
                raw: err
            },
            raw: err
        };
    }

    return {
        ok: false,
        message: err instanceof Error ? err.message : 'Unknown error',
        error: {
            type: 'unknown',
            message: err instanceof Error ? err.message : 'Unknown error',
            raw: err
        },
        raw: err
    };
};

export interface ApiClient extends AxiosInstance {
    setUnwrap: (fn: UnwrapFn) => void;
    requestResult: <T = unknown, Meta = unknown>(config: AxiosRequestConfig, options?: RequestOptions) => Promise<ApiResult<T, Meta>>;
    getResult: <T = unknown, Meta = unknown>(url: string, config?: AxiosRequestConfig, options?: RequestOptions) => Promise<ApiResult<T, Meta>>;
    postResult: <T = unknown, Meta = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig, options?: RequestOptions) => Promise<ApiResult<T, Meta>>;
    requestData: <T = unknown>(config: AxiosRequestConfig, options?: RequestOptions) => Promise<T>;
    getData: <T = unknown>(url: string, config?: AxiosRequestConfig, options?: RequestOptions) => Promise<T>;
    postData: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig, options?: RequestOptions) => Promise<T>;
}

const Api = api as ApiClient;

Api.setUnwrap = fn => {
    globalUnwrap = fn;
};

Api.requestResult = async <T = unknown, Meta = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<ApiResult<T, Meta>> => {
    try {
        const response = await api.request<unknown>(config);
        const unwrap = options?.unwrap ?? globalUnwrap;
        return unwrap<T, Meta>(response.data);
    } catch (err) {
        return toFailureResult<T, Meta>(err);
    }
};

Api.getResult = <T = unknown, Meta = unknown>(url: string, config?: AxiosRequestConfig, options?: RequestOptions) => Api.requestResult<T, Meta>({ ...(config || {}), url, method: 'GET' }, options);

Api.postResult = <T = unknown, Meta = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig, options?: RequestOptions) => Api.requestResult<T, Meta>({ ...(config || {}), url, data, method: 'POST' }, options);

Api.requestData = async <T = unknown>(config: AxiosRequestConfig, options?: RequestOptions) => {
    const result = await Api.requestResult<T>(config, options);
    if (result.ok) return result.data;
    throw new ApiRequestError(result);
};

Api.getData = (url: string, config?: AxiosRequestConfig, options?: RequestOptions) => Api.requestData({ ...(config || {}), url, method: 'GET' }, options);

Api.postData = (url: string, data?: unknown, config?: AxiosRequestConfig, options?: RequestOptions) => Api.requestData({ ...(config || {}), url, data, method: 'POST' }, options);

export default Api;
