import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:5000',
  timeout: 10000 // 请求超时设置
})

// axios会包一层data, 把第一层data去掉
instance.interceptors.response.use((res) => {
  return res.data
})

export const get = <T>(
  url: string,
  config?: AxiosRequestConfig<any>
): Promise<T | undefined> => {
  return new Promise((resolve) => {
    instance
      .get(url, config)
      .then((res) => resolve(res?.data || res))
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
): Promise<T | undefined> => {
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
