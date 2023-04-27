import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3001', // 本地
  // baseURL: 'https://attendance.qingkong.xyz:3001', // 线上
  // baseURL: 'https://attendance.qingkong.xyz', // 线上不带端口（nginx配置proxy_pass）
  timeout: 10000 // 请求超时设置
})

// 请求拦截
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)
    // axios会包一层data, 把第一层data去掉
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status } = error.response
      // 如果401说明token无效或过期，重定向到登录页
      if (status === 401) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export interface ErrorInfo {
  errno: number
  message: string
}

export const get = <T>(
  url: string,
  config?: AxiosRequestConfig<any>
): Promise<T | ErrorInfo | undefined> => {
  return new Promise((resolve) => {
    instance
      .get(url, config)
      .then((res) => resolve(res?.data || res)) // 有data就返回data, 没有data就返回res
      .catch((err: Error | AxiosError) => {
        console.log('请求错误', err)
        resolve(undefined)
      })
  })
}

export const post = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
): Promise<T | ErrorInfo | undefined> => {
  return new Promise((resolve) => {
    instance
      .post(url, data, config)
      .then((res) => resolve(res?.data || res))
      .catch((err: Error | AxiosError) => {
        console.log('请求错误', err)
        resolve(undefined)
      })
  })
}
