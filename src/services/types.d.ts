import { Method, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

export type resultType = {
  accessToken?: string
}

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export interface MineHttpError extends AxiosError {
  isCancelRequest?: boolean
}

export interface MineHttpResponse extends AxiosResponse {
  config: MineHttpRequestConfig
}

export interface BaseResponseType<T> {
  data: T
  status: number
  message: string
  timestamp: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestParamsType = { [string]: any }

export interface MineHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: MineHttpRequestConfig) => void
  beforeResponseCallback?: (response: MineHttpResponse) => void
}

export default class MineHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: MineHttpRequestConfig
  ): Promise<T>
  post<T, P>(url: string, params?: T, config?: MineHttpRequestConfig): Promise<P>
  get<T, P>(url: string, params?: T, config?: MineHttpRequestConfig): Promise<P>
}
