/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosInstance, AxiosRequestConfig, CustomParamsSerializer } from 'axios'
import {
  BaseResponseType,
  MineHttpError,
  MineHttpRequestConfig,
  MineHttpResponse,
  RequestMethods
} from './types.d'

import { message } from 'antd'
import { stringify } from 'qs'
import { setLoading } from '@/store/modules/app/appSlice'
import { store } from '@/store/store'

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api',
  // 请求超时时间 60秒
  timeout: 60 * 1000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
}

/**
 * 状态码说明:
 * 502: TOKEN过期
 * 504: 没有token
 * 508: token不合法
 * 509: 身份验证异常
 */
const STATUS_CODE = [401, 403, 405, 502, 504, 508, 509]

class MineHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** 初始化配置对象 */
  private static initConfig: MineHttpRequestConfig = {}

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 移除字符串前后空格 */
  private removeBlank(data: Record<string, any>) {
    if (typeof data === 'object') {
      for (const key in data) {
        if (typeof data[key] === 'string') {
          data[key] = data[key].trim()
        }
      }
    }
    return data
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    MineHttp.axiosInstance.interceptors.request.use(
      async (config: MineHttpRequestConfig): Promise<any> => {
        // 是否开启请求进度
        if (!config.headers!.hideProgress) {
          // 开启请求进度
        }
        store.dispatch(setLoading(true))
        this.removeBlank(config.data) // 移除字符前后空格
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config)
          return config
        }
        if (MineHttp.initConfig.beforeRequestCallback) {
          MineHttp.initConfig.beforeRequestCallback(config)
          return config
        }
        /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
        const whiteList = ['/login']
        return whiteList.some(v => config.url!.indexOf(v) > -1)
          ? config
          : new Promise(resolve => {
              resolve(config)
            })
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = MineHttp.axiosInstance
    instance.interceptors.response.use(
      (response: MineHttpResponse) => {
        const $config = response.config
        const data = response.data
        // 关闭请求进度
        store.dispatch(setLoading(false))
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
        }
        if (MineHttp.initConfig.beforeResponseCallback) {
          MineHttp.initConfig.beforeResponseCallback(response)
        }

        // ================ 状态码判断 start ================
        if (data.status === 200) {
          return data
        } else if (response.status === 200 && !data.status) {
          // 处理Excel数据导出没有包装响应格式
          return data
        }

        if (STATUS_CODE.includes(data.status)) {
          // TODO: 调用store里面的全局退出登录
          message.error(data.message)
        } else if (data.status === 403) {
          message.error('请求未授权')
        } else {
          message.error(data.message || '服务错误, 错误代码:' + data.status)
        }
        return Promise.reject(data)
        // ================ 状态码判断 end ================
      },
      (error: MineHttpError) => {
        console.log('http_error:', error)
        store.dispatch(setLoading(false))
        const data = error.response?.data as any
        const status = error.response?.status as any

        if (!data) {
          message.error(data.message)
        } else if (STATUS_CODE.includes(data.status)) {
          message.error(data.error)
        } else if (STATUS_CODE.includes(status)) {
          message.error(data.error || error.message)
        }

        if (error?.isCancelRequest) {
          error.isCancelRequest = Axios.isCancel(error)
        }
        // 关闭请求进度
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject(error)
      }
    )
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: MineHttpRequestConfig
  ): Promise<BaseResponseType<T>> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as MineHttpRequestConfig

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      MineHttp.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: MineHttpRequestConfig
  ): Promise<BaseResponseType<P>> {
    return this.request<P>('post', url, params, config)
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: MineHttpRequestConfig
  ): Promise<BaseResponseType<P>> {
    return this.request<P>('get', url, params, config)
  }
}

export const http = new MineHttp()
